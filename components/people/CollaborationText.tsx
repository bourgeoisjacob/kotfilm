import Link from "next/link";

// Renders curated collaboration prose: paragraphs split on blank lines, with
// inline `[label](/path)` links rendered as internal Next links.
function renderInline(text: string): React.ReactNode[] {
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const label = m[1];
    const href = m[2];
    nodes.push(
      <Link
        key={key++}
        href={href}
        className="text-kot-red underline-offset-4 hover:underline"
      >
        {label}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function CollaborationText({ text }: { text: string }) {
  const paragraphs = text.trim().split(/\n\n+/);
  return (
    <div className="flex max-w-3xl flex-col gap-3 leading-relaxed text-kot-ink">
      {paragraphs.map((para, i) => (
        <p key={i}>{renderInline(para)}</p>
      ))}
    </div>
  );
}
