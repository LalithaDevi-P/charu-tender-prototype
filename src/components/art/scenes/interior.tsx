import { useId } from "react";

/**
 * Scene: inside the Charu Tender shop — glass front with green branded side
 * banners, wooden tables and chairs, red carpet and the counter beyond.
 */
export function ShopInterior({ className = "" }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <svg
      viewBox="0 0 760 950"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Inside the Charu Tender shop"
    >
      <defs>
        <linearGradient id={`${id}ceil`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F4F5F1" />
          <stop offset="100%" stopColor="#E4E7E0" />
        </linearGradient>
        <linearGradient id={`${id}floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E7E4DA" />
          <stop offset="100%" stopColor="#D3CFC3" />
        </linearGradient>
        <linearGradient id={`${id}wood`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C89A5B" />
          <stop offset="100%" stopColor="#A5793F" />
        </linearGradient>
        <clipPath id={`${id}frame`}>
          <rect width="760" height="950" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}frame)`}>
        <rect width="760" height="950" fill={`url(#${id}ceil)`} />

        {/* ceiling + recessed orange panel */}
        <path d="M0 0 L760 0 L760 150 L0 210 Z" fill={`url(#${id}ceil)`} />
        <path d="M226 40 L560 40 L560 128 L226 148 Z" fill="#E8912D" />
        <path d="M248 58 L540 58 L540 112 L248 128 Z" fill="#F5F6F2" />
        <g fill="#FFFFFF" opacity="0.9">
          <circle cx="120" cy="70" r="13" />
          <circle cx="646" cy="62" r="13" />
          <circle cx="86" cy="150" r="11" />
          <circle cx="686" cy="144" r="11" />
        </g>

        {/* ── left green banner ── */}
        <rect x="0" y="130" width="176" height="640" fill="#0A8C66" />
        <rect x="14" y="150" width="148" height="600" rx="8" fill="#0B9169" />
        <text
          x="88"
          y="200"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Noto Sans Kannada, sans-serif"
          fontSize="24"
          fontWeight="600"
        >
          ಚಾರು ಎಳನೀರು
        </text>
        <text
          x="88"
          y="232"
          textAnchor="middle"
          fill="#CFF3E5"
          fontFamily="Inter, sans-serif"
          fontSize="19"
          fontWeight="800"
          letterSpacing="1.6"
        >
          CHARU TENDER
        </text>
        <g>
          <circle cx="88" cy="304" r="46" fill="#FFFFFF" />
          <circle cx="88" cy="304" r="37" fill="#A9D9C6" />
          <path d="M66 328 C 62 300 74 282 88 282 C 102 282 114 300 110 328 Z" fill="#8CA65C" />
          <ellipse cx="88" cy="284" rx="20" ry="7" fill="#B48C56" />

          <circle cx="88" cy="410" r="46" fill="#FFFFFF" />
          <circle cx="88" cy="410" r="37" fill="#F5E6BE" />
          <path d="M70 434 L76 388 Q88 383 100 388 L106 434 Z" fill="#D7DE86" />
        </g>
        <rect x="34" y="474" width="108" height="34" rx="17" fill="#FFFFFF" />
        <text
          x="88"
          y="497"
          textAnchor="middle"
          fill="#0A8C66"
          fontFamily="Inter, sans-serif"
          fontSize="16"
          fontWeight="800"
          letterSpacing="1"
        >
          WELCOME
        </text>
        <g fill="#CFF3E5" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="500">
          <text x="26" y="546">FRESH TENDER COCONUT</text>
          <text x="26" y="572">NATURAL SUGARCANE JUICE</text>
          <text x="26" y="598">FRESH FRUITS &amp; JUICES</text>
        </g>
        <rect x="26" y="628" width="124" height="46" rx="8" fill="#F4C95D" />
        <text
          x="88"
          y="658"
          textAnchor="middle"
          fill="#16352D"
          fontFamily="Inter, sans-serif"
          fontSize="17"
          fontWeight="800"
        >
          TODAY OFFER
        </text>

        {/* ── right green banner ── */}
        <rect x="584" y="130" width="176" height="640" fill="#0A8C66" />
        <rect x="598" y="150" width="148" height="600" rx="8" fill="#0B9169" />
        <text
          x="672"
          y="202"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Noto Sans Kannada, sans-serif"
          fontSize="22"
          fontWeight="600"
        >
          ಇಂದಿನ ದರ
        </text>
        <rect x="622" y="220" width="100" height="72" rx="8" fill="#FFFFFF" />
        <text
          x="672"
          y="252"
          textAnchor="middle"
          fill="#0A8C66"
          fontFamily="Inter, sans-serif"
          fontSize="17"
          fontWeight="700"
        >
          TODAY
        </text>
        <text
          x="672"
          y="282"
          textAnchor="middle"
          fill="#16352D"
          fontFamily="Inter, sans-serif"
          fontSize="26"
          fontWeight="800"
        >
          ₹5
        </text>
        <g>
          <circle cx="672" cy="368" r="46" fill="#FFFFFF" />
          <circle cx="672" cy="368" r="37" fill="#EAF5E6" />
          <path d="M648 394 C 644 364 658 344 672 344 C 686 344 700 364 696 394 Z" fill="#8CA65C" />

          <circle cx="672" cy="474" r="46" fill="#FFFFFF" />
          <circle cx="672" cy="474" r="37" fill="#F1F6DF" />
          <g fill="#C7CD8B">
            <rect x="650" y="440" width="13" height="70" rx="6.5" />
            <rect x="668" y="436" width="14" height="76" rx="7" />
            <rect x="688" y="442" width="13" height="68" rx="6.5" />
          </g>
        </g>
        <text
          x="672"
          y="556"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Inter, sans-serif"
          fontSize="15"
          fontWeight="700"
          letterSpacing="1"
        >
          7026117709
        </text>
        <rect x="616" y="590" width="112" height="42" rx="8" fill="#F4C95D" />
        <text
          x="672"
          y="618"
          textAnchor="middle"
          fill="#16352D"
          fontFamily="Inter, sans-serif"
          fontSize="15"
          fontWeight="800"
        >
          BE FRESH
        </text>

        {/* ── glass door + counter beyond ── */}
        <rect x="176" y="150" width="408" height="620" fill="#E9F1EE" />
        <rect x="176" y="150" width="408" height="620" fill="#BFD3CD" opacity="0.6" />

        <g opacity="0.92">
          {/* back counter */}
          <rect x="236" y="452" width="290" height="120" rx="6" fill="#0A8C66" />
          <rect x="236" y="452" width="290" height="34" fill="#0B9169" />
          <rect x="256" y="500" width="120" height="60" rx="6" fill="#087F5B" />
          <text
            x="316"
            y="538"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="Inter, sans-serif"
            fontSize="18"
            fontWeight="800"
            letterSpacing="1"
          >
            CHARU
          </text>
          {/* menu strip on the wall */}
          <rect x="286" y="256" width="220" height="176" rx="6" fill="#0B9169" />
          <g fill="#CFF3E5">
            <rect x="306" y="278" width="180" height="10" rx="5" />
            <rect x="306" y="300" width="140" height="8" rx="4" />
            <rect x="306" y="322" width="160" height="8" rx="4" />
            <rect x="306" y="344" width="120" height="8" rx="4" />
            <rect x="306" y="366" width="170" height="8" rx="4" />
            <rect x="306" y="388" width="130" height="8" rx="4" />
            <rect x="306" y="410" width="150" height="8" rx="4" />
          </g>
          {/* person at the counter */}
          <g>
            <rect x="446" y="392" width="74" height="150" rx="26" fill="#7E8C74" />
            <circle cx="483" cy="368" r="30" fill="#C79B76" />
            <path d="M453 402 C 470 392 496 392 513 402 L 513 448 L 453 448 Z" fill="#6E7C66" />
          </g>
          {/* rack on the left wall */}
          <rect x="196" y="330" width="70" height="300" fill="#D98A34" />
          <g fill="#B9722A">
            <rect x="196" y="392" width="70" height="10" />
            <rect x="196" y="456" width="70" height="10" />
            <rect x="196" y="520" width="70" height="10" />
          </g>
        </g>

        {/* glass reflection */}
        <path d="M196 160 L318 160 L214 760 L176 760 Z" fill="#FFFFFF" opacity="0.28" />
        <rect x="176" y="150" width="408" height="620" fill="none" stroke="#FFFFFF" strokeWidth="8" />
        <rect x="540" y="440" width="10" height="90" rx="5" fill="#9AA5A2" />

        {/* ── red carpet ── */}
        <path d="M0 770 L760 770 L760 950 L0 950 Z" fill={`url(#${id}floor)`} />
        <path d="M214 770 L548 770 L614 950 L150 950 Z" fill="#A93E3A" />
        <path d="M214 770 L548 770 L556 792 L206 792 Z" fill="#C05049" />

        {/* ── tables & chairs ── */}
        <g>
          {/* back-left table */}
          <rect x="42" y="620" width="180" height="26" rx="8" fill={`url(#${id}wood)`} />
          <rect x="60" y="646" width="16" height="120" fill="#8A6231" />
          <rect x="190" y="646" width="16" height="120" fill="#8A6231" />
          <rect x="18" y="646" width="66" height="90" rx="8" fill="#C08A4E" />
          <rect x="18" y="646" width="66" height="18" rx="6" fill="#A8763F" />

          {/* chair silhouette right of it */}
          <path d="M228 596 L286 596 L286 760 L228 760 Z" fill="#B7834A" />
          <path d="M236 606 L278 606 L278 700 L236 700 Z" fill="#9E6C37" />

          {/* front table */}
          <rect x="440" y="668" width="250" height="34" rx="10" fill={`url(#${id}wood)`} />
          <rect x="464" y="702" width="20" height="150" fill="#8A6231" />
          <rect x="646" y="702" width="20" height="150" fill="#8A6231" />
          <rect x="700" y="640" width="60" height="140" rx="10" fill="#C08A4E" />
          <path d="M700 640 L760 640 L760 668 L700 668 Z" fill="#A8763F" />

          {/* chair under front table */}
          <rect x="486" y="702" width="120" height="24" rx="8" fill="#C08A4E" />
          <rect x="496" y="726" width="16" height="120" fill="#8A6231" />
          <rect x="582" y="726" width="16" height="120" fill="#8A6231" />
        </g>

        <rect width="760" height="950" fill="#FFF6DE" opacity="0.05" />
      </g>
    </svg>
  );
}
