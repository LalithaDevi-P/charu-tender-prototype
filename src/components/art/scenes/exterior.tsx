import { useId } from "react";
import { LogoMark } from "@/components/brand/Logo";

/**
 * Scene: the Charu Tender shop frontage — dark signboard with the Kannada
 * and English name, green product panels, welcome board and crates of
 * tender coconut on the steps.
 */
export function ShopExterior({ className = "" }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <svg
      viewBox="0 0 1200 780"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Charu Tender shop exterior"
    >
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DCE6E4" />
          <stop offset="100%" stopColor="#C6D2D0" />
        </linearGradient>
        <linearGradient id={`${id}board`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A5150" />
          <stop offset="100%" stopColor="#343A39" />
        </linearGradient>
        <linearGradient id={`${id}step`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6E7472" />
          <stop offset="100%" stopColor="#4C514F" />
        </linearGradient>
        <clipPath id={`${id}frame`}>
          <rect width="1200" height="780" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}frame)`}>
        <rect width="1200" height="780" fill={`url(#${id}sky)`} />

        {/* neighbouring building */}
        <rect x="0" y="0" width="1200" height="70" fill="#CFD7D3" />
        <rect x="0" y="52" width="1200" height="18" fill="#B7C1BD" />
        <rect x="0" y="0" width="86" height="420" fill="#C4CCC8" />
        <rect x="1116" y="0" width="84" height="430" fill="#BFC7C3" />

        {/* ── signboard ── */}
        <rect x="70" y="86" width="1060" height="150" rx="8" fill={`url(#${id}board)`} />
        <rect x="70" y="86" width="1060" height="150" rx="8" fill="none" stroke="#2A2F2E" strokeWidth="4" />

        <text
          x="330"
          y="176"
          textAnchor="end"
          fill="#7FE0B4"
          fontFamily="Noto Sans Kannada, sans-serif"
          fontSize="66"
          fontWeight="700"
        >
          ಚಾರು ಎಳನೀರು
        </text>

        <g transform="translate(368 108)">
          <LogoMark size={106} sky="#FFFFFF" ring="#7FE0B4" ground="#3FBF8E" />
        </g>

        <text
          x="510"
          y="178"
          fill="#7FE0B4"
          fontFamily="Inter, sans-serif"
          fontSize="70"
          fontWeight="800"
          letterSpacing="3"
        >
          CHARU TENDER
        </text>

        {/* ── awning ── */}
        <path d="M46 236 L1154 236 L1174 340 L26 340 Z" fill="#3B403F" />
        <path d="M46 236 L1154 236 L1158 258 L42 258 Z" fill="#2C3130" />
        <rect x="26" y="332" width="1148" height="16" rx="6" fill="#2A2F2E" />

        {/* ── shopfront glass ── */}
        <rect x="130" y="348" width="940" height="330" fill="#D7E4E0" />
        <rect x="130" y="348" width="940" height="330" fill="#9FB9B2" opacity="0.55" />

        {/* interior hints seen through glass */}
        <g opacity="0.75">
          <rect x="430" y="392" width="340" height="240" rx="6" fill="#E6EDE6" />
          <rect x="452" y="416" width="120" height="120" rx="8" fill="#087F5B" opacity="0.25" />
          <rect x="640" y="416" width="106" height="70" rx="8" fill="#087F5B" opacity="0.3" />
          <rect x="470" y="560" width="300" height="74" rx="8" fill="#B98A50" />
          <circle cx="700" cy="470" r="30" fill="#F4C95D" opacity="0.55" />
        </g>

        {/* left green panel */}
        <rect x="140" y="358" width="196" height="310" rx="10" fill="#0A8C66" />
        <text
          x="238"
          y="404"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Inter, sans-serif"
          fontSize="30"
          fontWeight="800"
          letterSpacing="2"
        >
          WELCOME
        </text>
        <g fill="#FFFFFF" opacity="0.95">
          <circle cx="196" cy="472" r="34" />
          <circle cx="284" cy="472" r="34" />
          <circle cx="196" cy="566" r="34" />
          <circle cx="284" cy="566" r="34" />
        </g>
        <g fill="#8ED9BC">
          <circle cx="196" cy="472" r="26" />
          <circle cx="284" cy="472" r="26" />
          <circle cx="196" cy="566" r="26" />
          <circle cx="284" cy="566" r="26" />
        </g>
        <g fill="#0A8C66">
          <ellipse cx="196" cy="480" rx="15" ry="11" />
          <ellipse cx="284" cy="480" rx="13" ry="12" />
          <ellipse cx="196" cy="574" rx="14" ry="12" />
          <ellipse cx="284" cy="574" rx="15" ry="10" />
        </g>

        {/* right green panel */}
        <rect x="866" y="358" width="196" height="310" rx="10" fill="#0A8C66" />
        <text
          x="964"
          y="402"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Noto Sans Kannada, sans-serif"
          fontSize="21"
          fontWeight="600"
        >
          ಚಾರು ಎಳನೀರು
        </text>
        <text
          x="964"
          y="430"
          textAnchor="middle"
          fill="#CFF3E5"
          fontFamily="Inter, sans-serif"
          fontSize="20"
          fontWeight="800"
          letterSpacing="1.5"
        >
          CHARU TENDER
        </text>
        <g>
          <circle cx="928" cy="492" r="32" fill="#FFFFFF" />
          <circle cx="928" cy="492" r="24" fill="#A9D9C6" />
          <circle cx="1004" cy="492" r="32" fill="#FFFFFF" />
          <circle cx="1004" cy="492" r="24" fill="#F4C95D" />
          <circle cx="928" cy="576" r="32" fill="#FFFFFF" />
          <circle cx="928" cy="576" r="24" fill="#B7D96A" />
          <circle cx="1004" cy="576" r="32" fill="#FFFFFF" />
          <circle cx="1004" cy="576" r="24" fill="#C9CE8B" />
        </g>
        <text
          x="964"
          y="644"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Inter, sans-serif"
          fontSize="17"
          fontWeight="700"
          letterSpacing="1"
        >
          7026117709
        </text>

        {/* glass door */}
        <rect x="470" y="360" width="260" height="318" rx="4" fill="#E8F1EE" opacity="0.85" />
        <rect x="470" y="360" width="260" height="318" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="6" />
        <rect x="700" y="470" width="10" height="80" rx="5" fill="#9AA5A2" />

        {/* ── steps + railing ── */}
        <rect x="150" y="676" width="900" height="30" fill={`url(#${id}step)`} />
        <rect x="176" y="706" width="848" height="30" fill="#5E6462" />
        <rect x="206" y="736" width="788" height="44" fill="#4A4F4D" />
        <g stroke="#8E9492" strokeWidth="8" strokeLinecap="round">
          <path d="M160 676 L150 780" />
          <path d="M1040 676 L1052 780" />
          <path d="M150 706 L1052 706" />
        </g>

        {/* green welcome mat */}
        <rect x="474" y="666" width="252" height="16" rx="4" fill="#1D8F63" />

        {/* ── crates of tender coconut ── */}
        <g>
          <rect x="854" y="588" width="236" height="92" rx="8" fill="#2F6FB8" />
          <g stroke="#255C9B" strokeWidth="5">
            <path d="M854 620 L1090 620" />
            <path d="M854 650 L1090 650" />
            <path d="M932 588 L932 680" />
            <path d="M1012 588 L1012 680" />
          </g>
          <g fill="#C8CE7E">
            <ellipse cx="890" cy="578" rx="34" ry="30" />
            <ellipse cx="958" cy="572" rx="36" ry="32" />
            <ellipse cx="1030" cy="576" rx="35" ry="31" />
            <ellipse cx="920" cy="546" rx="33" ry="29" />
            <ellipse cx="996" cy="544" rx="34" ry="30" />
          </g>
          <g fill="#A9B45F" opacity="0.7">
            <ellipse cx="890" cy="590" rx="20" ry="10" />
            <ellipse cx="958" cy="584" rx="20" ry="10" />
            <ellipse cx="1030" cy="588" rx="20" ry="10" />
          </g>
        </g>

        {/* small price board on crate */}
        <rect x="884" y="520" width="176" height="56" rx="6" fill="#0A8C66" />
        <text
          x="972"
          y="544"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Noto Sans Kannada, sans-serif"
          fontSize="17"
          fontWeight="600"
        >
          ಇಂದಿನ ದರ
        </text>
        <text
          x="972"
          y="567"
          textAnchor="middle"
          fill="#F4C95D"
          fontFamily="Inter, sans-serif"
          fontSize="21"
          fontWeight="800"
        >
          Today Price
        </text>

        {/* left info board */}
        <rect x="176" y="500" width="272" height="150" rx="8" fill="#0A8C66" />
        <g transform="translate(196 516)">
          <LogoMark size={44} sky="#FFFFFF" ring="#FFFFFF" ground="#FFFFFF" />
        </g>
        <text
          x="252"
          y="546"
          fill="#FFFFFF"
          fontFamily="Inter, sans-serif"
          fontSize="22"
          fontWeight="800"
          letterSpacing="1.4"
        >
          CHARU TENDER
        </text>
        <g fill="#CFF3E5" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="500">
          <text x="196" y="584">Premium quality tender coconut</text>
          <text x="196" y="604">procured direct from plantations.</text>
          <text x="196" y="624">Fresh sugarcane &amp; natural juices.</text>
        </g>
        <text
          x="196"
          y="644"
          fill="#F4C95D"
          fontFamily="Inter, sans-serif"
          fontSize="16"
          fontWeight="700"
        >
          7026117709
        </text>

        <rect width="1200" height="780" fill="#FFF6DE" opacity="0.05" />
      </g>
    </svg>
  );
}
