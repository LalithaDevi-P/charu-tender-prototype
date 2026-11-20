import { useId } from "react";

/**
 * Hero scene: a trimmed tender coconut with a paper straw on a warm wooden
 * table, with the blurred street outside the Charu Tender shop behind it.
 */
export function HeroCoconut({ className = "" }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <svg
      viewBox="0 0 800 600"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Fresh trimmed tender coconut at Charu Tender"
    >
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9D6C4" />
          <stop offset="100%" stopColor="#AEBBA8" />
        </linearGradient>
        <linearGradient id={`${id}table`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B07E45" />
          <stop offset="45%" stopColor="#9C6C39" />
          <stop offset="100%" stopColor="#7C5228" />
        </linearGradient>
        <linearGradient id={`${id}husk`} x1="0.15" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#FBF3DF" />
          <stop offset="45%" stopColor="#EFE2C4" />
          <stop offset="100%" stopColor="#D9C69E" />
        </linearGradient>
        <filter id={`${id}blur`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id={`${id}soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <clipPath id={`${id}frame`}>
          <rect width="800" height="600" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}frame)`}>
        <rect width="800" height="600" fill={`url(#${id}sky)`} />

        {/* ── blurred street beyond the window ── */}
        <g filter={`url(#${id}blur)`}>
          {/* tree canopy */}
          <g fill="#5E7E4E">
            <ellipse cx="140" cy="40" rx="180" ry="110" />
            <ellipse cx="430" cy="10" rx="230" ry="120" />
            <ellipse cx="700" cy="60" rx="200" ry="120" />
          </g>
          <g fill="#7B9B66" opacity="0.85">
            <ellipse cx="250" cy="90" rx="140" ry="80" />
            <ellipse cx="600" cy="110" rx="160" ry="80" />
          </g>

          {/* red-roofed building on the left */}
          <path d="M-20 130 L250 96 L250 250 L-20 250 Z" fill="#B4544C" />
          <path d="M-20 130 L250 96 L250 122 L-20 156 Z" fill="#8E3E38" />

          {/* blue awning / shutters */}
          <rect x="255" y="150" width="230" height="86" rx="6" fill="#3E6FA8" />
          <rect x="500" y="164" width="180" height="72" rx="6" fill="#4E7EB4" />

          {/* road + kerb */}
          <rect x="0" y="238" width="800" height="110" fill="#9BA3A0" />
          <rect x="0" y="238" width="800" height="16" fill="#C4C9C4" />

          {/* parked vehicles */}
          <rect x="60" y="196" width="150" height="58" rx="20" fill="#E7E9E6" />
          <rect x="88" y="168" width="86" height="44" rx="18" fill="#EFF1EE" />
          <rect x="330" y="204" width="120" height="50" rx="18" fill="#5D6A72" />
          <rect x="560" y="192" width="170" height="62" rx="22" fill="#F1F2EF" />
          <circle cx="110" cy="256" r="20" fill="#3A4147" />
          <circle cx="196" cy="256" r="20" fill="#3A4147" />
          <circle cx="610" cy="258" r="22" fill="#3A4147" />
          <circle cx="690" cy="258" r="22" fill="#3A4147" />
        </g>

        {/* window frame band */}
        <rect x="0" y="264" width="800" height="30" fill="#22282A" />
        <rect x="0" y="252" width="800" height="14" fill="#2C3335" opacity="0.75" />
        <rect x="0" y="292" width="800" height="10" fill="#1B2022" opacity="0.6" />

        {/* warm bokeh */}
        <g filter={`url(#${id}soft)`} opacity="0.5">
          <circle cx="180" cy="90" r="34" fill="#F6E9B8" />
          <circle cx="540" cy="60" r="40" fill="#EFF6D6" />
          <circle cx="690" cy="150" r="30" fill="#F8EFC9" />
        </g>

        {/* ── wooden table ── */}
        <path d="M0 320 L800 300 L800 600 L0 600 Z" fill={`url(#${id}table)`} />
        <g stroke="#6E4722" strokeWidth="3" opacity="0.5">
          <path d="M0 372 L800 352" />
          <path d="M0 452 L800 434" />
          <path d="M0 540 L800 524" />
        </g>
        <path d="M0 320 L800 300 L800 316 L0 336 Z" fill="#C99A5E" opacity="0.7" />
        <ellipse cx="400" cy="560" rx="330" ry="70" fill="#5E3D1D" opacity="0.35" />

        {/* ── tender coconut ── */}
        <g>
          <ellipse cx="400" cy="536" rx="176" ry="34" fill="#4E3317" opacity="0.42" />

          {/* straw */}
          <path
            d="M430 372 L516 148"
            stroke="#EDE5D0"
            strokeWidth="26"
            strokeLinecap="round"
          />
          <path
            d="M430 372 L516 148"
            stroke="#16352D"
            strokeWidth="26"
            strokeLinecap="round"
            opacity="0.06"
          />
          <path
            d="M470 244 L486 202"
            stroke="#CFC6AE"
            strokeWidth="26"
            opacity="0.7"
          />

          {/* body */}
          <path
            d="M243 528 C236 430 262 356 400 348 C538 356 564 430 557 528 Z"
            fill={`url(#${id}husk)`}
          />
          {/* green base */}
          <path
            d="M247 496 C320 484 480 484 553 496 L557 528 C480 546 320 546 243 528 Z"
            fill="#BFCF94"
            opacity="0.72"
          />
          {/* fibres */}
          <g stroke="#16352D" strokeOpacity="0.10" strokeWidth="3" fill="none">
            <path d="M285 384 C272 434 266 480 270 524" />
            <path d="M330 362 C322 430 318 480 320 530" />
            <path d="M400 352 C398 430 398 480 398 534" />
            <path d="M470 362 C478 430 482 480 480 530" />
            <path d="M518 384 C530 434 536 480 532 524" />
          </g>
          {/* highlight */}
          <path
            d="M300 392 C288 442 286 490 294 522"
            stroke="#FFFFFF"
            strokeOpacity="0.65"
            strokeWidth="26"
            strokeLinecap="round"
            fill="none"
          />

          {/* cut opening */}
          <ellipse cx="400" cy="354" rx="132" ry="42" fill="#E3D2AC" />
          <ellipse cx="400" cy="357" rx="102" ry="32" fill="#FBF5E6" />
          <ellipse cx="400" cy="360" rx="62" ry="20" fill="#CDB98F" />
          <ellipse cx="400" cy="361" rx="54" ry="16" fill="#B7A47B" />
          {/* pulp rim highlights */}
          <g fill="#FFFDF4" opacity="0.9">
            <ellipse cx="330" cy="352" rx="26" ry="11" />
            <ellipse cx="472" cy="356" rx="24" ry="10" />
            <ellipse cx="400" cy="338" rx="34" ry="10" />
          </g>
        </g>

        {/* warm light wash */}
        <rect width="800" height="600" fill="#FFF3D0" opacity="0.07" />
      </g>
    </svg>
  );
}
