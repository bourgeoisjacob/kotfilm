import Anthropic from "@anthropic-ai/sdk";

// Produces ORIGINAL summary / context / impact in our own words.
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
  impact: string; // may be "" when the film had no discernible cinematic impact
};

const SYSTEM = `You write ORIGINAL blurbs for a curated guide to Soviet cinema.
Rules:
- Write entirely in your own words. Never copy or closely paraphrase the background text or any source.
- "summary": a short paragraph (2-4 sentences) on the plot/premise; no heavy spoilers.
- "context": a short paragraph (2-4 sentences) on where/when it was made, its place in Soviet history and filmmaking, the director's approach, and any source material.
- "impact": one or two sentences on the film's influence on cinema (innovation, influence on later filmmakers) — ONLY if there is a well-known impact. If the film had no discernible impact on film history, use an empty string "".
- Plain text, no markdown, no quotes.
Respond with ONLY a JSON object of the form {"summary": "...", "context": "...", "impact": "..."} and nothing else.`;

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
    `Write the original summary, context, and impact as JSON.`;

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
    if (!parsed.summary || !parsed.context) return null;

    return {
      summary: parsed.summary.trim(),
      context: parsed.context.trim(),
      impact: (parsed.impact ?? "").trim(),
    };
  } catch (err) {
    console.warn(
      `  ! Original-text generation failed (${(err as Error).message}); storing a draft instead.`,
    );
    return null;
  }
}
