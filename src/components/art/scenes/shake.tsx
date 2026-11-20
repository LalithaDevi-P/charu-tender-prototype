import { useId } from "react";

/**
 * Scene: a glass of fresh juice beside a green tender coconut opened and
 * topped with ice cream, on the shop's tiled table.
 */
export function ShakeTable({ className = "" }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <svg
      viewBox="0 0 640 800"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Tender coconut with ice cream and fresh juice"
    >
      <defs>
        <linearGradient id={`${id}wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFEFE7" />
          <stop offset="100%" stopColor="#DCDED3" />
        </linearGradient>
        <linearGradient id={`${id}tile`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D9C3A2" />
          <stop offset="100%" stopColor="#B99B76" />
        </linearGradient>
        <linearGradient id={`${id}green`} x1="0.2" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#A9BE72" />
          <stop offset="55%" stopColor="#8AA65B" />
          <stop offset="100%" stopColor="#6B8547" />
        </linearGradient>
        <filter id={`${id}blur`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <clipPath id={`${id}frame`}>
          <rect width="640" height="800" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}frame)`}>
        <rect width="640" height="800" fill={`url(#${id}wall)`} />

        {/* blurred café background */}
        <g filter={`url(#${id}blur)`} opacity="0.9">
          <rect x="0" y="60" width="640" height="220" fill="#E4E2D6" />
          <rect x="40" y="120" width="170" height="140" rx="16" fill="#C08A4E" />
          <rect x="430" y="100" width="200" height="170" rx="18" fill="#B8804A" />
          <ellipse cx="330" cy="230" rx="120" ry="70" fill="#8E6A44" />
          <rect x="250" y="150" width="180" height="110" rx="20" fill="#D8CDBB" />
          <circle cx="120" cy="90" r="42" fill="#CFE0C4" />
          <circle cx="540" cy="70" r="52" fill="#C7DABD" />
          {/* red floor runner */}
          <path d="M180 300 L470 300 L510 366 L140 366 Z" fill="#B3453F" />
        </g>

        {/* window light band */}
        <rect x="0" y="286" width="640" height="16" fill="#3A3F3C" opacity="0.35" />

        {/* ── tiled table ── */}
        <path d="M0 360 L640 344 L640 800 L0 800 Z" fill={`url(#${id}tile)`} />
        <g stroke="#9E8060" strokeWidth="3" opacity="0.55">
          <path d="M0 440 L640 424" />
          <path d="M0 546 L640 532" />
          <path d="M0 668 L640 656" />
          <path d="M140 356 L120 800" />
          <path d="M330 352 L336 800" />
          <path d="M520 348 L552 800" />
        </g>
        <path d="M0 360 L640 344 L640 362 L0 378 Z" fill="#E7D3B4" opacity="0.6" />

        {/* ── tall glass of juice ── */}
        <g>
          <ellipse cx="176" cy="700" rx="86" ry="22" fill="#6E5233" opacity="0.42" />
          <path
            d="M120 380 L132 668 Q176 686 220 668 L232 380 Z"
            fill="#FFFFFF"
            opacity="0.5"
          />
          <path
            d="M128 418 L138 664 Q176 678 214 664 L224 418 Z"
            fill="#DCE48A"
          />
          <path d="M128 418 C142 392 210 392 224 418 Z" fill="#EEF2C8" />
          <g fill="#FBFDF0">
            <circle cx="146" cy="408" r="16" />
            <circle cx="176" cy="400" r="19" />
            <circle cx="206" cy="410" r="15" />
          </g>
          <path
            d="M120 380 L132 668 Q176 686 220 668 L232 380 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="5"
            opacity="0.9"
          />
          <ellipse cx="176" cy="380" rx="56" ry="17" fill="#FFFFFF" opacity="0.85" />
          <ellipse cx="176" cy="380" rx="56" ry="17" fill="none" stroke="#FFFFFF" strokeWidth="5" />
          <path
            d="M142 450 L148 640"
            stroke="#FFFFFF"
            strokeOpacity="0.8"
            strokeWidth="16"
            strokeLinecap="round"
          />
        </g>

        {/* ── green coconut with ice cream ── */}
        <g>
          <ellipse cx="432" cy="716" rx="164" ry="34" fill="#6E5233" opacity="0.45" />
          <path
            d="M276 704 C266 594 322 512 434 512 C546 512 602 594 592 704 Z"
            fill={`url(#${id}green)`}
          />
          <path
            d="M286 660 C356 646 512 646 582 660 L592 704 C512 726 356 726 276 704 Z"
            fill="#5F7A41"
            opacity="0.5"
          />
          <path
            d="M322 574 C306 626 306 674 316 700"
            stroke="#FFFFFF"
            strokeOpacity="0.35"
            strokeWidth="26"
            strokeLinecap="round"
            fill="none"
          />
          {/* cut rim */}
          <ellipse cx="434" cy="516" rx="158" ry="52" fill="#B48C56" />
          <ellipse cx="434" cy="518" rx="140" ry="43" fill="#8C6A3D" />
          <ellipse cx="434" cy="524" rx="128" ry="37" fill="#F7F1E2" />
          {/* pulp */}
          <g fill="#FFFDF4">
            <ellipse cx="376" cy="524" rx="40" ry="20" />
            <ellipse cx="492" cy="530" rx="44" ry="21" />
            <ellipse cx="434" cy="546" rx="52" ry="20" />
          </g>
          {/* ice cream scoop */}
          <circle cx="434" cy="470" r="80" fill="#FFF9E9" />
          <circle cx="410" cy="442" r="26" fill="#FFFFFF" opacity="0.85" />
          <circle cx="470" cy="500" r="12" fill="#EDE0C2" opacity="0.7" />
          <circle cx="446" cy="424" r="9" fill="#FFFFFF" opacity="0.9" />
        </g>

        <rect width="640" height="800" fill="#FFE9BE" opacity="0.06" />
      </g>
    </svg>
  );
}
