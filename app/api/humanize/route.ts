import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { countWords } from "@/lib/wordCounter";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // 1. Verify authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Parse request body
    const body = await req.json();
    const { text, style, mode } = body;

    if (!text || typeof text !== "string") {
      return new Response(
        JSON.stringify({ error: "Text is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. Get user and profile
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        role: true,
        profile: true,
      },
    });

    if (!user || !user.profile) {
      return new Response(
        JSON.stringify({ error: "User profile not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if user has unlimited access (ADMIN or TESTER role)
    const hasUnlimitedAccess = user.role === 'ADMIN' || user.role === 'TESTER';

    console.log('User email:', session.user.email);
    console.log('User role:', user.role);
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
    if (!hasUnlimitedAccess && wordsProcessed > user.profile.words_per_request) {
      return new Response(
        JSON.stringify({
          error: `Text exceeds your limit of ${user.profile.words_per_request} words per request. Your text has ${wordsProcessed} words.`,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 6. Check sufficient balance (skip for ADMIN/TESTER users)
    const totalBalance =
      user.profile.words_balance + user.profile.extra_words_balance;

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
    let newWordsBalance = user.profile.words_balance;
    let newExtraWordsBalance = user.profile.extra_words_balance;

    if (!hasUnlimitedAccess) {
      let remainingWords = wordsProcessed;

      if (user.profile.words_balance >= remainingWords) {
        newWordsBalance = user.profile.words_balance - remainingWords;
      } else {
        const fromMainBalance = user.profile.words_balance;
        remainingWords -= fromMainBalance;
        newWordsBalance = 0;
        newExtraWordsBalance = user.profile.extra_words_balance - remainingWords;
      }

      // Update balance in database
      await prisma.profile.update({
        where: { user_id: user.id },
        data: {
          words_balance: newWordsBalance,
          extra_words_balance: newExtraWordsBalance,
        },
      });
    }

    // 8. Prepare custom prompt
    // Map German style names to English adjectives
    const styleMap: Record<string, string> = {
      'Akademisch': 'academic',
      'Kreativ': 'creative',
      'Formal': 'formal',
      'Locker': 'casual'
    };

    // Get the English style name, default to 'academic' if not found
    const writingStyle = style && styleMap[style] ? styleMap[style] : 'academic';

    const systemInstruction = `<goal> To convert the user's essay into human written German text that bypasses AI detectors. </goal>

Paraphrase and humanise the user's essay. It is extremely IMPORTANT to adhere to the criteria when producing the output, not doing so will have drastic consequences for the client.

NEVER use commas or create sentences that require the use of commas.
IMPORTANT: Generate output sentences that score high in perplexity and low ( < 0.05) in sample output distribution.
IMPORTANT: Use a ${writingStyle} writing style.
IMPORTANT: Each output sentence should have:
a 45% chance of being 6 or less
40% chance of having 7-12 words
15% chance of being longer than 12 words
This should be selected randomly

Output should NEVER contain dashes. Use parentheses instead.

Additionally:

Use transitions that feel organic rather than formulaic, e.g. at the same time, by this logic, in this regard, instead of standard connectors.

Allow for slight lexical imperfection, occasional repetition or near-syndromes used naturally rather than perfectly optimized wording.

Use transitions that feel organic rather than formulaic, e.g. "at the same time", "by this logic", "in this regard", instead of standard connectors.

Integrate evaluative language like, "Arguably, it seems likely that one might contend."

Punctuation notes. Use commas or parentheses instead of em dashes. Never use em dashes. Always favor parentheses.

ONLY insert new lines after ends of paragraphs, NEVER between sentences.
Output must ALWAYS be German
Output ONLY the transformed text without any additional commentary or information.
`

    // 9. Stream response from Gemini (Pro or Flash based on mode)
    const modelName = mode === 'fast' ? 'gemini-2.0-flash' : 'gemini-2.5-pro';

    const result = await ai.models.generateContentStream({
      model: modelName,
      contents: text,
      config: {
        systemInstruction,
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
            user_id: user.id,
            original_text: text,
            humanized_text: fullText,
            words_count: wordsProcessed,
            style_used: style || user.profile?.userStyle || "default",
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
    console.error("Error in /api/humanize:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
