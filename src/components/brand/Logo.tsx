import { useId } from "react";
import { BIZ } from "@/lib/demo";

/**
 * Charu Tender brand mark — a palm island inside a green ring,
 * drawn to match the signboard / logo used on the real shop boards.
 */

function Palm({
  x,
  y,
  s = 1,
  flip = false,
}: {
  x: number;
  y: number;
  s?: number;
  flip?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path
        d="M0 0 C -1.5 9 -3 17 -2 27"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M0 0 C -7 -7 -16 -9 -23 -5 C -15 -4 -7 -1 0 0 Z"
        fill="currentColor"
      />
      <path
        d="M0 0 C -5 -10 -12 -16 -20 -17 C -13 -12 -6 -5 0 0 Z"
        fill="currentColor"
      />
      <path
        d="M0 0 C -2 -11 0 -19 5 -24 C 3 -16 2 -7 0 0 Z"
        fill="currentColor"
      />
      <path
        d="M0 0 C 6 -9 14 -14 22 -14 C 14 -10 6 -4 0 0 Z"
        fill="currentColor"
      />
      <path
        d="M0 0 C 8 -5 17 -5 24 0 C 16 -2 7 -1 0 0 Z"
        fill="currentColor"
      />
      <circle cx="-3.5" cy="4" r="2.4" fill="currentColor" />
      <circle cx="3.5" cy="5" r="2.4" fill="currentColor" />
    </g>
  );
}

export function LogoMark({
  size = 40,
  ring = "#087F5B",
  sky = "#FFFFFF",
  ground = "#087F5B",
  className = "",
}: {
  size?: number;
  ring?: string;
  sky?: string;
  ground?: string;
  className?: string;
}) {
  const id = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Charu Tender"
    >
      <defs>
        <clipPath id={`${id}-clip`}>
          <circle cx="32" cy="32" r="28" />
        </clipPath>
      </defs>
      <circle cx="32" cy="32" r="28" fill={sky} />
      <g clipPath={`url(#${id}-clip)`}>
        <ellipse cx="32" cy="55" rx="27" ry="12" fill={ground} />
        <ellipse cx="32" cy="51" rx="20" ry="6" fill={ground} opacity="0.55" />
        <g color={ground}>
          <Palm x={27} y={19} s={1} />
          <Palm x={41} y={27} s={0.72} flip />
        </g>
      </g>
      <circle
        cx="32"
        cy="32"
        r="28"
        fill="none"
        stroke={ring}
        strokeWidth="4.5"
      />
    </svg>
  );
}

export function Wordmark({
  tone = "dark",
  compact = false,
}: {
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  const primary = tone === "dark" ? "text-ink" : "text-white";
  const secondary = tone === "dark" ? "text-brand/70" : "text-fresh";
  return (
    <span className="flex flex-col justify-center leading-none">
      <span
        className={`font-extrabold tracking-[0.14em] ${primary} ${
          compact ? "text-[13px]" : "text-[15px] sm:text-base"
        }`}
      >
        CHARU TENDER
      </span>
      <span
        className={`font-kannada font-semibold mt-1 ${secondary} ${
          compact ? "text-[11px]" : "text-[12px] sm:text-[13px]"
        }`}
      >
        {BIZ.kannada}
      </span>
    </span>
  );
}

export function BrandLockup({
  tone = "dark",
  size = 40,
  compact = false,
  className = "",
}: {
  tone?: "dark" | "light";
  size?: number;
  compact?: boolean;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark
        size={size}
        sky={tone === "light" ? "#056044" : "#FFFFFF"}
        ring={tone === "light" ? "#B7D96A" : "#087F5B"}
        ground={tone === "light" ? "#B7D96A" : "#087F5B"}
      />
      <Wordmark tone={tone} compact={compact} />
    </span>
  );
}
