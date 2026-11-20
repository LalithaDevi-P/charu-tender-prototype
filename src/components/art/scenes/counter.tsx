import { useId } from "react";

/**
 * Scene: the Charu Tender billing counter — black counter top with straws and
 * sample cups, a PhonePe QR stand, the green branded counter board with the
 * Kannada name and phone number, and sugarcane stacked at the side.
 */
export function Counter({ className = "" }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <svg
      viewBox="0 0 1200 720"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Charu Tender billing counter"
    >
      <defs>
        <linearGradient id={`${id}wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1F3F52" />
          <stop offset="100%" stopColor="#17313F" />
        </linearGradient>
        <linearGradient id={`${id}top`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2B2F31" />
          <stop offset="100%" stopColor="#1A1D1E" />
        </linearGradient>
        <linearGradient id={`${id}panel`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B9169" />
          <stop offset="100%" stopColor="#077152" />
        </linearGradient>
        <clipPath id={`${id}frame`}>
          <rect width="1200" height="720" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}frame)`}>
        <rect width="1200" height="720" fill={`url(#${id}wall)`} />

        {/* back wall mural + dispensers */}
        <rect x="0" y="0" width="1200" height="230" fill="#25505F" />
        <g opacity="0.55">
          <path d="M0 150 C 160 90 300 190 460 130 C 600 80 720 170 880 120 L 880 230 L 0 230 Z" fill="#2E7A63" />
          <path d="M600 120 C 700 60 820 130 960 80 L 1200 120 L 1200 230 L 600 230 Z" fill="#3B8F6E" />
        </g>
        <rect x="300" y="34" width="150" height="180" rx="10" fill="#D9DEE0" />
        <rect x="318" y="54" width="114" height="66" rx="6" fill="#8FA5AC" />
        <g fill="#5E6E73">
          <circle cx="344" cy="150" r="13" />
          <circle cx="384" cy="150" r="13" />
          <circle cx="424" cy="150" r="13" />
        </g>
        <rect x="470" y="60" width="120" height="154" rx="8" fill="#C9D1D4" />
        <rect x="486" y="78" width="88" height="52" rx="5" fill="#7E939A" />
        <rect x="620" y="44" width="176" height="170" rx="10" fill="#0E2B36" />
        <rect x="640" y="64" width="136" height="112" rx="8" fill="#1D5C6B" />
        <text
          x="708"
          y="132"
          textAnchor="middle"
          fill="#8FE3C6"
          fontFamily="Inter, sans-serif"
          fontSize="26"
          fontWeight="800"
          letterSpacing="3"
        >
          CHARU
        </text>

        {/* orange shelving on the far left */}
        <rect x="0" y="150" width="86" height="470" fill="#D98A34" />
        <g fill="#B9722A">
          <rect x="0" y="248" width="86" height="12" />
          <rect x="0" y="348" width="86" height="12" />
          <rect x="0" y="448" width="86" height="12" />
        </g>

        {/* ── counter top ── */}
        <path d="M0 300 L1160 268 L1200 330 L0 372 Z" fill={`url(#${id}top)`} />
        <path d="M0 300 L1160 268 L1164 286 L0 318 Z" fill="#41474A" />

        {/* straws in a steel tumbler */}
        <g>
          <g stroke="#E9E2CE" strokeWidth="7" strokeLinecap="round">
            <path d="M148 306 L142 216" />
            <path d="M160 306 L162 208" />
            <path d="M172 306 L182 214" />
            <path d="M184 306 L200 220" />
            <path d="M136 306 L124 224" />
          </g>
          <path d="M124 300 L204 300 L196 358 L132 358 Z" fill="#B9C1C4" />
          <path d="M132 314 L196 314 L192 344 L136 344 Z" fill="#8F989B" />
        </g>

        {/* sample cups */}
        <g>
          <rect x="330" y="284" width="42" height="34" rx="5" fill="#E7E3D6" />
          <rect x="334" y="290" width="34" height="12" rx="3" fill="#C9B98F" />
          <rect x="384" y="278" width="42" height="34" rx="5" fill="#E7E3D6" />
          <rect x="388" y="284" width="34" height="12" rx="3" fill="#8ED9BC" />
          <rect x="438" y="272" width="42" height="34" rx="5" fill="#E7E3D6" />
          <rect x="442" y="278" width="34" height="12" rx="3" fill="#D8B25E" />
          <rect x="492" y="266" width="42" height="34" rx="5" fill="#E7E3D6" />
          <rect x="496" y="272" width="34" height="12" rx="3" fill="#B98F6A" />
        </g>

        {/* PhonePe QR stand */}
        <g transform="translate(880 172)">
          <path d="M0 96 L112 96 L104 140 L8 140 Z" fill="#5A2A8C" />
          <rect x="14" y="0" width="86" height="98" rx="8" fill="#FFFFFF" />
          <rect x="14" y="0" width="86" height="24" rx="8" fill="#5A2A8C" />
          <text
            x="57"
            y="17"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="Inter, sans-serif"
            fontSize="13"
            fontWeight="800"
          >
            PhonePe
          </text>
          <g fill="#2B2B2B">
            <rect x="24" y="32" width="20" height="20" />
            <rect x="70" y="32" width="20" height="20" />
            <rect x="24" y="66" width="20" height="20" />
            <rect x="52" y="34" width="8" height="8" />
            <rect x="64" y="60" width="8" height="8" />
            <rect x="78" y="66" width="10" height="10" />
            <rect x="52" y="76" width="8" height="8" />
          </g>
        </g>

        {/* ── green counter board ── */}
        <rect x="60" y="372" width="1010" height="304" rx="12" fill={`url(#${id}panel)`} />
        <rect x="60" y="372" width="1010" height="304" rx="12" fill="none" stroke="#F2E7C8" strokeWidth="6" />

        <text
          x="104"
          y="440"
          fill="#FFFFFF"
          fontFamily="Noto Sans Kannada, sans-serif"
          fontSize="46"
          fontWeight="700"
        >
          ಚಾರು ಎಳನೀರು
        </text>
        <circle cx="546" cy="422" r="34" fill="#FFFFFF" />
        <circle cx="546" cy="422" r="27" fill="#0B9169" />
        <g fill="#FFFFFF">
          <ellipse cx="546" cy="436" rx="15" ry="7" />
          <path d="M540 434 C 536 418 534 406 530 396" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M534 402 C 524 396 516 396 508 402 C 516 404 526 406 534 410 Z" />
          <path d="M534 402 C 540 392 548 386 558 386 C 550 394 542 400 536 408 Z" />
          <path d="M546 406 C 556 400 566 400 574 406 C 566 408 554 410 546 414 Z" />
        </g>
        <text
          x="600"
          y="440"
          fill="#FFFFFF"
          fontFamily="Inter, sans-serif"
          fontSize="50"
          fontWeight="800"
          letterSpacing="3"
        >
          CHARU TENDER
        </text>

        <g transform="translate(104 458)">
          <path d="M4 6 C 0 14 0 24 6 32" stroke="#CFF3E5" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M12 2 C 22 8 24 24 14 34" stroke="#CFF3E5" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
        <text
          x="150"
          y="490"
          fill="#FFFFFF"
          fontFamily="Inter, sans-serif"
          fontSize="34"
          fontWeight="800"
          letterSpacing="1"
        >
          7026117709
        </text>

        <g fill="#DFF6EC" fontFamily="Noto Sans Kannada, sans-serif" fontSize="19" fontWeight="500">
          <text x="104" y="530">ಹಬ್ಬ, ಮದುವೆ, ಶುಭ ಸಮಾರಂಭಗಳಿಗೆ ತಾಜಾ ಎಳನೀರು</text>
          <text x="104" y="558">ಮತ್ತು ಹಣ್ಣಿನ ರಸಗಳ ಪೂರೈಕೆ.</text>
        </g>
        <g fill="#CFF3E5" fontFamily="Inter, sans-serif" fontSize="17" fontWeight="500">
          <text x="104" y="596">WE PROVIDE TENDER COCONUT FOR WEDDING,</text>
          <text x="104" y="620">BIRTHDAY AND FOR ALL AUSPICIOUS OCCASIONS.</text>
          <text x="104" y="644">FRESH AND PREMIUM QUALITY TRIMMED COCONUT.</text>
        </g>

        {/* four product circles */}
        <g>
          <circle cx="700" cy="520" r="76" fill="#FFFFFF" />
          <circle cx="700" cy="520" r="66" fill="#DDEFE6" />
          <path d="M672 546 C 668 512 682 486 700 486 C 718 486 732 512 728 546 Z" fill="#8CA65C" />
          <ellipse cx="700" cy="486" rx="24" ry="8" fill="#B48C56" />
          <rect x="712" y="446" width="8" height="44" rx="4" fill="#E9E2CE" transform="rotate(14 716 468)" />

          <circle cx="700" cy="644" r="60" fill="#FFFFFF" />
          <circle cx="700" cy="644" r="51" fill="#E7F4EC" />
          <path d="M676 674 L684 612 Q700 606 716 612 L724 674 Z" fill="#D7DE86" />
          <ellipse cx="700" cy="612" rx="17" ry="6" fill="#EFF3CB" />

          <circle cx="906" cy="520" r="76" fill="#FFFFFF" />
          <circle cx="906" cy="520" r="66" fill="#EAF5E6" />
          <path d="M866 552 C 862 520 880 496 906 496 C 932 496 950 520 946 552 Z" fill="#8CA65C" />
          <ellipse cx="906" cy="498" rx="26" ry="9" fill="#B48C56" />

          <circle cx="906" cy="644" r="60" fill="#FFFFFF" />
          <circle cx="906" cy="644" r="51" fill="#F1F6DF" />
          <g fill="#C7CD8B">
            <rect x="874" y="596" width="16" height="96" rx="8" />
            <rect x="898" y="590" width="17" height="102" rx="8.5" />
            <rect x="923" y="598" width="16" height="94" rx="8" />
          </g>
        </g>

        <text
          x="700"
          y="604"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Inter, sans-serif"
          fontSize="17"
          fontWeight="800"
          letterSpacing="1"
        >
          BE NATURAL BE FRESH
        </text>
        <text
          x="906"
          y="604"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Inter, sans-serif"
          fontSize="17"
          fontWeight="800"
          letterSpacing="1"
        >
          DRINK SMART BE SMART
        </text>

        {/* ── sugarcane stacked on the right ── */}
        <g>
          <g transform="rotate(4 1130 500)">
            <rect x="1074" y="240" width="34" height="470" rx="17" fill="#C7CD8B" />
            <rect x="1112" y="256" width="34" height="454" rx="17" fill="#D3D89A" />
            <rect x="1150" y="236" width="34" height="474" rx="17" fill="#B9C079" />
          </g>
          <g fill="#A5A96B">
            <rect x="1068" y="336" width="46" height="10" rx="5" />
            <rect x="1068" y="452" width="46" height="10" rx="5" />
            <rect x="1068" y="568" width="46" height="10" rx="5" />
            <rect x="1106" y="360" width="46" height="10" rx="5" />
            <rect x="1106" y="480" width="46" height="10" rx="5" />
            <rect x="1106" y="596" width="46" height="10" rx="5" />
            <rect x="1144" y="330" width="46" height="10" rx="5" />
            <rect x="1144" y="450" width="46" height="10" rx="5" />
            <rect x="1144" y="570" width="46" height="10" rx="5" />
          </g>
        </g>

        {/* red carpet strip */}
        <path d="M0 676 L1070 676 L1070 720 L0 720 Z" fill="#A93E3A" />
        <path d="M0 676 L1070 676 L1070 690 L0 690 Z" fill="#C05049" />

        <rect width="1200" height="720" fill="#0B2B3A" opacity="0.12" />
      </g>
    </svg>
  );
}
