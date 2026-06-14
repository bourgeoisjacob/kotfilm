import Anthropic from "@anthropic-ai/sdk";

// Produces SHORT, ORIGINAL summary / context / interpretation in our own words.
//
// Copyright rule (CLAUDE.md): never copy or closely paraphrase. The Wikipedia
// extract is passed only as background for understanding; the model is
// instructed to write fresh prose. If no ANTHROPIC_API_KEY is configured, we
// return null and the orchestrator stores a clearly-marked DRAFT instead — so
// unverified or copied text is never published.

const MODEL = "claude-opus-4-8";

export type GeneratedText = {
  summary: string;
  context: string;
  interpretation: string;
};

const SYSTEM = `You write very short, ORIGINAL blurbs for a curated guide to Soviet cinema.
Rules:
- Write entirely in your own words. Never copy or closely paraphrase the background text or any source.
- "summary": 1-2 sentences on the premise; no heavy spoilers.
- "context": one sentence of historical or production context.
- "interpretation": one sentence on artistic significance or style.
- Keep each field under ~40 words. Plain text, no markdown, no quotes.
Respond with ONLY a JSON object of the form {"summary": "...", "context": "...", "interpretation": "..."} and nothing else.`;

export async function generateOriginalText(input: {
  title: string;
  year?: number;
  director?: string;
  background: string;
}): Promise<GeneratedText | null> {
  if (!process.env.ANTHROPIC_API_KEY) return null;

  const client = new Anthropic();
  const userMsg =
    `Film: ${input.title}${input.year ? ` (${input.year})` : ""}` +
    `${input.director ? `, directed by ${input.director}` : ""}.\n\n` +
    `Background for understanding only — DO NOT reuse its wording:\n"""\n${input.background}\n"""\n\n` +
    `Write the original summary, context, and interpretation as JSON.`;

  try {
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM,
      messages: [{ role: "user", content: userMsg }],
    });
    const textBlock = res.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") return null;

    const match = textBlock.text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    const parsed = JSON.parse(match[0]) as Partial<GeneratedText>;
    if (!parsed.summary || !parsed.context || !parsed.interpretation) return null;

    return {
      summary: parsed.summary.trim(),
      context: parsed.context.trim(),
      interpretation: parsed.interpretation.trim(),
    };
  } catch (err) {
    console.warn(
      `  ! Original-text generation failed (${(err as Error).message}); storing a draft instead.`,
    );
    return null;
  }
}
