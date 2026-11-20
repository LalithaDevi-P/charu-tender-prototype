import { useId } from "react";

/**
 * Scene: the green information wall inside the shop describing how Charu
 * Tender sources and supplies tender coconut, with circular product photos.
 */
export function BenefitWall({ className = "" }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <svg
      viewBox="0 0 720 950"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="About Charu Tender information wall"
    >
      <defs>
        <linearGradient id={`${id}wall`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#0E9169" />
          <stop offset="55%" stopColor="#0A7C5A" />
          <stop offset="100%" stopColor="#066247" />
        </linearGradient>
        <clipPath id={`${id}frame`}>
          <rect width="720" height="950" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}frame)`}>
        <rect width="720" height="950" fill={`url(#${id}wall)`} />

        {/* tiled skirting at the bottom */}
        <rect x="0" y="878" width="720" height="72" fill="#E7E4DA" />
        <g stroke="#CFCBBF" strokeWidth="3">
          <path d="M0 914 L720 914" />
          <path d="M90 878 L90 950" />
          <path d="M230 878 L230 950" />
          <path d="M370 878 L370 950" />
          <path d="M510 878 L510 950" />
          <path d="M650 878 L650 950" />
        </g>

        {/* header */}
        <text
          x="60"
          y="96"
          fill="#FFFFFF"
          fontFamily="Noto Sans Kannada, sans-serif"
          fontSize="46"
          fontWeight="700"
        >
          ಚಾರು ಎಳನೀರು
        </text>

        {/* phone */}
        <g transform="translate(470 62)">
          <path d="M6 4 C 0 14 2 30 12 38 C 22 46 36 44 42 34" stroke="#FFFFFF" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M14 12 C 12 20 16 30 26 34" stroke="#FFFFFF" strokeWidth="6" fill="none" strokeLinecap="round" />
        </g>
        <text
          x="532"
          y="96"
          fill="#FFFFFF"
          fontFamily="Inter, sans-serif"
          fontSize="44"
          fontWeight="800"
          letterSpacing="1"
        >
          7026117709
        </text>

        {/* main text panel */}
        <rect x="52" y="140" width="380" height="556" rx="30" fill="none" stroke="#CFF3E5" strokeWidth="3" />

        <g fill="#FFFFFF" fontFamily="Inter, sans-serif" fontSize="15.5" fontWeight="700">
          <text x="80" y="188">CHARU TENDER IS ONE OF THE</text>
          <text x="80" y="212">LEADING TENDER COCONUT</text>
          <text x="80" y="236">SUPPLIERS IN KARNATAKA.</text>
          <text x="80" y="268">WE SUPPLY TENDER COCONUT FOR</text>
          <text x="80" y="292">CORPORATE EVENTS, WEDDING,</text>
          <text x="80" y="316">BIRTHDAYS AND FOR ALL</text>
          <text x="80" y="340">AUSPICIOUS OCCASIONS.</text>
        </g>

        <g fill="#DFF6EC" fontFamily="Inter, sans-serif" fontSize="15.5" fontWeight="500">
          <text x="80" y="392">CHARU TENDER PROCURES FRESH</text>
          <text x="80" y="416">AND PREMIUM QUALITY TENDER</text>
          <text x="80" y="440">COCONUT DIRECTLY FROM</text>
          <text x="80" y="464">PLANTATION.</text>

          <text x="80" y="508">CHARU TENDER PROVIDES TOP</text>
          <text x="80" y="532">QUALITY TRIMMED TENDER</text>
          <text x="80" y="556">COCONUT IN LARGE QUANTITY.</text>
        </g>

        <text
          x="80"
          y="600"
          fill="#B7D96A"
          fontFamily="Inter, sans-serif"
          fontSize="15"
          fontWeight="800"
          letterSpacing="0.5"
        >
          BENEFITS OF DRINKING TENDER COCONUT:
        </text>
        <g fill="#DFF6EC" fontFamily="Inter, sans-serif" fontSize="13.5" fontWeight="500">
          <text x="80" y="628">Natural hydration and a rich source of</text>
          <text x="80" y="650">electrolytes to replenish lost nutrients,</text>
          <text x="80" y="672">digestive support with bioactive enzymes,</text>
        </g>

        {/* green bullet dots */}
        <g fill="#B7D96A">
          <circle cx="66" cy="183" r="6" />
          <circle cx="66" cy="387" r="6" />
          <circle cx="66" cy="503" r="6" />
        </g>

        {/* circular product photos */}
        <g>
          <circle cx="576" cy="248" r="112" fill="#FFFFFF" />
          <circle cx="576" cy="248" r="100" fill="#F3EAD4" />
          <path d="M536 296 L548 200 Q576 190 604 200 L616 296 Z" fill="#E4E88E" />
          <path d="M536 244 C 552 226 600 226 616 244 Z" fill="#F6F8DC" />
          <g fill="#FBFDF0">
            <circle cx="556" cy="238" r="15" />
            <circle cx="578" cy="232" r="17" />
            <circle cx="600" cy="240" r="14" />
          </g>

          <circle cx="576" cy="486" r="104" fill="#FFFFFF" />
          <circle cx="576" cy="486" r="92" fill="#F6E7C8" />
          <g transform="rotate(-8 576 486)">
            <rect x="518" y="398" width="26" height="176" rx="13" fill="#C7CD8B" />
            <rect x="554" y="392" width="27" height="184" rx="13.5" fill="#D3D89A" />
            <rect x="590" y="400" width="26" height="172" rx="13" fill="#B9C079" />
          </g>
          <g fill="#A5A96B">
            <rect x="512" y="440" width="38" height="9" rx="4.5" />
            <rect x="548" y="474" width="40" height="9" rx="4.5" />
            <rect x="584" y="436" width="38" height="9" rx="4.5" />
            <rect x="512" y="516" width="38" height="9" rx="4.5" />
            <rect x="584" y="520" width="38" height="9" rx="4.5" />
          </g>

          <circle cx="576" cy="700" r="88" fill="#FFFFFF" />
          <circle cx="576" cy="700" r="77" fill="#EAF5E6" />
          <path d="M544 744 C 538 700 556 670 576 670 C 596 670 614 700 608 744 Z" fill="#8CA65C" />
          <ellipse cx="576" cy="672" rx="30" ry="11" fill="#B48C56" />
          <path d="M576 672 L596 606" stroke="#EDE7D4" strokeWidth="12" strokeLinecap="round" />
        </g>

        {/* slogan plate */}
        <rect x="452" y="810" width="248" height="52" rx="26" fill="#FFFFFF" />
        <text
          x="576"
          y="844"
          textAnchor="middle"
          fill="#0A7C5A"
          fontFamily="Inter, sans-serif"
          fontSize="19"
          fontWeight="800"
          letterSpacing="1"
        >
          BE NATURAL BE FRESH
        </text>

        <rect width="720" height="950" fill="#053E2D" opacity="0.08" />
      </g>
    </svg>
  );
}
