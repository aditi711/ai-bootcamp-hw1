import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "system",
          content:
            "You are a creative poet. Write beautiful, original poems about nature, life, love, dreams, or any inspiring topic. Make them thoughtful, meaningful, and emotionally resonant. Each poem should be unique and capture the essence of human experience.",
        },
        ...messages,
      ],
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error generating poem:", error);
    return Response.json({ error: "Failed to generate poem" }, { status: 500 });
  }
} 