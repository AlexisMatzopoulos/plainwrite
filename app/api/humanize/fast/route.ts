import { getAuthenticatedUser } from "@/lib/supabase/auth-helpers";
import { prisma } from "@/lib/prisma";
import { countWords } from "@/lib/wordCounter";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // 1. Verify authentication
    const { user: authUser, dbUser, error } = await getAuthenticatedUser();

    if (error || !authUser || !dbUser) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Parse request body
    const body = await req.json();
    const { text, style } = body;

    if (!text || typeof text !== "string") {
      return new Response(
        JSON.stringify({ error: "Text is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. Check user profile
    if (!dbUser.profile) {
      return new Response(
        JSON.stringify({ error: "User profile not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if user has unlimited access (ADMIN or TESTER role)
    const hasUnlimitedAccess = dbUser.role === 'ADMIN' || dbUser.role === 'TESTER';

    console.log('User email:', authUser.email);
    console.log('User role:', dbUser.role);
    console.log('Has unlimited access:', hasUnlimitedAccess);

    // 4. Count words in input text
    const wordsProcessed = countWords(text);

    if (wordsProcessed === 0) {
      return new Response(
        JSON.stringify({ error: "Text must contain at least one word" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 5. Check words_per_request limit (skip for ADMIN/TESTER users)
    if (!hasUnlimitedAccess && wordsProcessed > dbUser.profile.words_per_request) {
      return new Response(
        JSON.stringify({
          error: `Text exceeds your limit of ${dbUser.profile.words_per_request} words per request. Your text has ${wordsProcessed} words.`,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 6. Check sufficient balance (skip for ADMIN/TESTER users)
    const totalBalance =
      dbUser.profile.words_balance + dbUser.profile.extra_words_balance;

    if (!hasUnlimitedAccess && totalBalance < wordsProcessed) {
      return new Response(
        JSON.stringify({
          error: `Insufficient word balance. You need ${wordsProcessed} words but only have ${totalBalance} words available.`,
          wordsNeeded: wordsProcessed,
          wordsAvailable: totalBalance,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 7. Deduct words from balance immediately (skip for ADMIN/TESTER users)
    let newWordsBalance = dbUser.profile.words_balance;
    let newExtraWordsBalance = dbUser.profile.extra_words_balance;

    if (!hasUnlimitedAccess) {
      let remainingWords = wordsProcessed;

      if (dbUser.profile.words_balance >= remainingWords) {
        newWordsBalance = dbUser.profile.words_balance - remainingWords;
      } else {
        const fromMainBalance = dbUser.profile.words_balance;
        remainingWords -= fromMainBalance;
        newWordsBalance = 0;
        newExtraWordsBalance = dbUser.profile.extra_words_balance - remainingWords;
      }

      // Update balance in database
      await prisma.profile.update({
        where: { user_id: dbUser.id },
        data: {
          words_balance: newWordsBalance,
          extra_words_balance: newExtraWordsBalance,
        },
      });
    }

    // 8. Prepare custom prompt
    const writingStyle = style ? style.toLowerCase() : 'original';

    const prompt = `<goal> To change the style and tone of writing to match the user's requested output style </goal>
Rewrite the user's essay, changing the writing style to: ${writingStyle}.
OUTPUT only the rewritten essay.

<text>
${text}
</text>`

    // 9. Stream response from Gemini Flash
    const result = await ai.models.generateContentStream({
      model: 'gemini-flash-latest',
      contents: prompt,
      config: {
        temperature: 1,
      },
    });

    // Buffer the complete response for history
    let fullText = "";

    // Create a transform stream to capture and forward the text
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    // Process the stream in the background
    (async () => {
      try {
        for await (const chunk of result) {
          const chunkText = chunk.text;
          fullText += chunkText;
          await writer.write(encoder.encode(chunkText));
        }

        // Save to history after streaming completes
        await prisma.history.create({
          data: {
            user_id: dbUser.id,
            original_text: text,
            humanized_text: fullText,
            words_count: wordsProcessed,
            style_used: style || dbUser.profile?.userStyle || "default",
          },
        });

        await writer.close();
      } catch (error) {
        console.error("Error during streaming:", error);
        await writer.abort(error);
      }
    })();

    // 10. Return the stream
    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-Words-Processed": wordsProcessed.toString(),
        "X-Remaining-Balance": (newWordsBalance + newExtraWordsBalance).toString(),
      },
    });
  } catch (error) {
    console.error("Error in /api/humanize/fast:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
