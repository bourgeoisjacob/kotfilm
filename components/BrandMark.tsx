// Kotfilm brand mark: a circular medallion — diagonally split red / charcoal,
// a red star, a cat looking up, and a gold film reel. A simplified, scalable
// vector echo of public/kotfilm-icon.png, drawn entirely in the brand palette.

type BrandMarkProps = {
  /** Rendered width & height in pixels. */
  size?: number;
  className?: string;
  /** Accessible label. Pass an empty string to render the mark as decorative. */
  title?: string;
};

const palette = {
  red: "#9e2b25",
  cream: "#efe4cd",
  tan: "#c9ab7e",
  gold: "#bd9a55",
  ink: "#211d18",
  char: "#2c2722",
};

export default function BrandMark({
  size = 40,
  className,
  title = "Kotfilm",
}: BrandMarkProps) {
  const decorative = title.trim() === "";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title}
      xmlns="http://www.w3.org/2000/svg"
    >
      {!decorative && <title>{title}</title>}
      <defs>
        <clipPath id="kot-disc">
          <circle cx="32" cy="32" r="30" />
        </clipPath>
      </defs>

      {/* Medallion field: diagonally split red (upper-left) / charcoal */}
      <g clipPath="url(#kot-disc)">
        <rect x="0" y="0" width="64" height="64" fill={palette.char} />
        <polygon points="-2,-2 52,-2 -2,54" fill={palette.red} />
      </g>

      {/* Red star, upper-right on the charcoal field */}
      <path
        d="M44,9 L45.9,14.4 L51.6,14.5 L47,18 L48.7,23.5 L44,20.2 L39.3,23.5 L41,18 L36.4,14.5 L42.1,14.4 Z"
        fill={palette.red}
      />

      {/* Film reel, lower-right */}
      <g>
        <circle
          cx="46"
          cy="44"
          r="11"
          fill={palette.gold}
          stroke={palette.char}
          strokeWidth="1.5"
        />
        <circle cx="46" cy="44" r="2.3" fill={palette.char} />
        <circle cx="46" cy="37.5" r="2.6" fill={palette.char} />
        <circle cx="52.5" cy="44" r="2.6" fill={palette.char} />
        <circle cx="46" cy="50.5" r="2.6" fill={palette.char} />
        <circle cx="39.5" cy="44" r="2.6" fill={palette.char} />
      </g>

      {/* Cat, centre-left, looking up */}
      <g>
        {/* ears */}
        <polygon points="15,29 19,16 25,28" fill={palette.cream} />
        <polygon points="28,28 33,16 37,30" fill={palette.cream} />
        <polygon points="17.5,27 20,19 23,27" fill={palette.tan} />
        <polygon points="29.5,27 32,19 34.5,28" fill={palette.tan} />
        {/* head */}
        <ellipse cx="26" cy="37" rx="12" ry="12.5" fill={palette.cream} />
        {/* eyes, glancing up */}
        <ellipse cx="21.5" cy="33.5" rx="1.7" ry="2.2" fill={palette.ink} />
        <ellipse cx="30.5" cy="33.5" rx="1.7" ry="2.2" fill={palette.ink} />
        {/* nose */}
        <path d="M26,39 l2.2,2 -2.2,1.4 -2.2,-1.4 Z" fill={palette.red} />
        {/* whiskers */}
        <g
          stroke={palette.ink}
          strokeWidth="0.7"
          strokeLinecap="round"
          opacity="0.7"
        >
          <line x1="24" y1="41.5" x2="14" y2="40" />
          <line x1="24" y1="43" x2="14.5" y2="44.5" />
          <line x1="28" y1="41.5" x2="37" y2="40.5" />
          <line x1="28" y1="43" x2="36.5" y2="44.5" />
        </g>
      </g>

      {/* Gold ring border */}
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke={palette.gold}
        strokeWidth="2.5"
      />
      <circle
        cx="32"
        cy="32"
        r="31.2"
        fill="none"
        stroke={palette.char}
        strokeWidth="1"
      />
    </svg>
  );
}
