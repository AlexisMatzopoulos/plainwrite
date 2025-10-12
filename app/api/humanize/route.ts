import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { countWords } from "@/lib/wordCounter";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

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
    const { text, style } = body;

    if (!text || typeof text !== "string") {
      return new Response(
        JSON.stringify({ error: "Text is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. Get user and profile
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true },
    });

    if (!user || !user.profile) {
      return new Response(
        JSON.stringify({ error: "User profile not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4. Count words in input text
    const wordsProcessed = countWords(text);

    if (wordsProcessed === 0) {
      return new Response(
        JSON.stringify({ error: "Text must contain at least one word" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 5. Check words_per_request limit
    if (wordsProcessed > user.profile.words_per_request) {
      return new Response(
        JSON.stringify({
          error: `Text exceeds your limit of ${user.profile.words_per_request} words per request. Your text has ${wordsProcessed} words.`,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 6. Check sufficient balance
    const totalBalance =
      user.profile.words_balance + user.profile.extra_words_balance;

    if (totalBalance < wordsProcessed) {
      return new Response(
        JSON.stringify({
          error: `Insufficient word balance. You need ${wordsProcessed} words but only have ${totalBalance} words available.`,
          wordsNeeded: wordsProcessed,
          wordsAvailable: totalBalance,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 7. Deduct words from balance immediately
    let remainingWords = wordsProcessed;
    let newWordsBalance = user.profile.words_balance;
    let newExtraWordsBalance = user.profile.extra_words_balance;

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

    // 8. Prepare AI prompt - Each request is a fresh conversation
    const styleInstruction = style ? ` in a ${style} style` : "";
    const systemPrompt = `Paraphrase the following text${styleInstruction}. Maintain the original meaning while using different words and sentence structures.`;

    // 9. Stream the response from OpenAI (fresh conversation each time)
    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
      ],
      temperature: 0.7,
    });

    // Buffer the complete response for history
    let fullText = "";

    // Create a transform stream to capture the complete text
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    // Process the stream in the background
    (async () => {
      try {
        for await (const chunk of result.textStream) {
          fullText += chunk;
          await writer.write(encoder.encode(chunk));
        }

        // Save to history after streaming completes
        await prisma.history.create({
          data: {
            user_id: user.id,
            original_text: text,
            humanized_text: fullText,
            words_count: wordsProcessed,
            style_used: style || user.profile.userStyle,
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
