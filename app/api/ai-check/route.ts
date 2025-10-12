import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// AI Detection Service Integration
// This is a placeholder implementation
// You can integrate with actual AI detection services like:
// - GPTZero API
// - Originality.ai API
// - Copyleaks API
// - Winston AI API

async function detectAIContent(text: string): Promise<{
  aiScore: number;
  isLikelyAI: boolean;
  detectors: {
    turnitin: number;
    copyleaks: number;
    gptzero: number;
  };
}> {
  // TODO: Replace with actual AI detection API integration

  // Placeholder implementation - simulates AI detection
  // Remove this and add real AI detection API call

  // Example integration with GPTZero:
  /*
  const response = await fetch("https://api.gptzero.me/v2/predict/text", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.GPTZERO_API_KEY || ""
    },
    body: JSON.stringify({
      document: text
    })
  });

  const data = await response.json();

  return {
    aiScore: Math.round(data.documents[0].average_generated_prob * 100),
    isLikelyAI: data.documents[0].average_generated_prob > 0.5,
    detectors: {
      turnitin: Math.round(data.documents[0].average_generated_prob * 100),
      copyleaks: Math.round(data.documents[0].average_generated_prob * 95),
      gptzero: Math.round(data.documents[0].average_generated_prob * 100)
    }
  };
  */

  // Placeholder response for development
  // Simulates varying AI detection scores
  const baseScore = Math.floor(Math.random() * 40) + 10; // 10-50% for humanized text

  return {
    aiScore: baseScore,
    isLikelyAI: baseScore > 50,
    detectors: {
      turnitin: baseScore + Math.floor(Math.random() * 10),
      copyleaks: baseScore - Math.floor(Math.random() * 10),
      gptzero: baseScore + Math.floor(Math.random() * 5),
    },
  };
}

export async function POST(req: Request) {
  try {
    // 1. Verify authentication (optional - you may want to allow unauthenticated checks)
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to use AI detection." },
        { status: 401 }
      );
    }

    // 2. Parse request body
    const body = await req.json();
    const { text } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    if (text.trim().length === 0) {
      return NextResponse.json(
        { error: "Text cannot be empty" },
        { status: 400 }
      );
    }

    // Limit text length for AI detection (most services have limits)
    if (text.length > 50000) {
      return NextResponse.json(
        { error: "Text is too long. Maximum 50,000 characters." },
        { status: 400 }
      );
    }

    // 3. Run AI detection
    const result = await detectAIContent(text);

    // 4. Return response
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in /api/ai-check:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
