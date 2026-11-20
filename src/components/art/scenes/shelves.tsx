import { useId } from "react";

/**
 * Scene: the orange fruit racks inside Charu Tender loaded with papaya and
 * banana, handwritten organic signs, and the sugarcane menu board alongside.
 */
export function FruitShelves({ className = "" }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");

  const papayaRow = [96, 178, 262, 346, 430];

  return (
    <svg
      viewBox="0 0 760 950"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Fresh fruit on the Charu Tender shelves"
    >
      <defs>
        <linearGradient id={`${id}papaya`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8CBF52" />
          <stop offset="50%" stopColor="#EFA23C" />
          <stop offset="100%" stopColor="#DE7A2A" />
        </linearGradient>
        <linearGradient id={`${id}shelf`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E49440" />
          <stop offset="100%" stopColor="#C87C2C" />
        </linearGradient>
        <clipPath id={`${id}frame`}>
          <rect width="760" height="950" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}frame)`}>
        <rect width="760" height="950" fill="#EFEDE4" />

        {/* ceiling light */}
        <rect x="0" y="0" width="760" height="70" fill="#F7F7F2" />
        <rect x="240" y="24" width="330" height="16" rx="8" fill="#FFFFFF" />
        <rect x="240" y="24" width="330" height="16" rx="8" fill="#FFF9DE" />

        {/* top label */}
        <rect x="200" y="76" width="330" height="34" rx="6" fill="#0B7A57" />
        <text
          x="365"
          y="101"
          textAnchor="middle"
          fill="#B7D96A"
          fontFamily="Inter, sans-serif"
          fontSize="19"
          fontWeight="800"
          letterSpacing="3"
        >
          UNFORGETTABLE TASTE
        </text>

        {/* ── rack ── */}
        <rect x="40" y="120" width="560" height="800" fill="#1F1B16" />

        {/* uprights */}
        <g fill={`url(#${id}shelf)`}>
          <rect x="40" y="120" width="34" height="800" />
          <rect x="286" y="120" width="30" height="800" />
          <rect x="566" y="120" width="34" height="800" />
        </g>

        {/* shelves */}
        <g fill={`url(#${id}shelf)`}>
          <rect x="40" y="120" width="560" height="26" />
          <rect x="40" y="316" width="560" height="26" />
          <rect x="40" y="512" width="560" height="26" />
          <rect x="40" y="708" width="560" height="26" />
          <rect x="40" y="900" width="560" height="30" />
        </g>
        <g fill="#8E5417" opacity="0.55">
          <rect x="40" y="142" width="560" height="8" />
          <rect x="40" y="338" width="560" height="8" />
          <rect x="40" y="534" width="560" height="8" />
          <rect x="40" y="730" width="560" height="8" />
        </g>

        {/* shelf 1 — bananas + greens */}
        <g>
          <g fill="none" strokeLinecap="round">
            <path d="M74 200 C 88 250 140 274 194 258" stroke="#EFD163" strokeWidth="26" />
            <path d="M86 186 C 100 236 148 258 202 244" stroke="#F5DE7C" strokeWidth="24" />
            <path d="M206 200 C 220 250 272 274 326 258" stroke="#EFD163" strokeWidth="26" />
          </g>
          <g fill="#8A9B3F">
            <circle cx="194" cy="258" r="7" />
            <circle cx="202" cy="244" r="7" />
            <circle cx="326" cy="258" r="7" />
          </g>
          <g fill="#4E8F45">
            <ellipse cx="380" cy="228" rx="46" ry="26" />
            <ellipse cx="452" cy="240" rx="42" ry="22" />
            <ellipse cx="520" cy="226" rx="44" ry="25" />
          </g>
        </g>

        {/* handwritten signs */}
        <g transform="rotate(-2 178 400)">
          <rect x="88" y="356" width="196" height="94" rx="4" fill="#F7F4E7" />
          <rect x="88" y="356" width="196" height="94" rx="4" fill="none" stroke="#C9C2A6" strokeWidth="3" />
          <text
            x="186"
            y="392"
            textAnchor="middle"
            fill="#3C4A3E"
            fontFamily="Noto Sans Kannada, sans-serif"
            fontSize="19"
            fontWeight="600"
          >
            ಸೊಂಪಾಗೊಬ್ಬು ತರಕಾರಿ
          </text>
          <text
            x="186"
            y="424"
            textAnchor="middle"
            fill="#0B7A57"
            fontFamily="Inter, sans-serif"
            fontSize="21"
            fontWeight="800"
          >
            (organic)
          </text>
        </g>
        <g transform="rotate(3 386 400)">
          <rect x="316" y="360" width="150" height="86" rx="4" fill="#F7F4E7" />
          <rect x="316" y="360" width="150" height="86" rx="4" fill="none" stroke="#C9C2A6" strokeWidth="3" />
          <text
            x="391"
            y="396"
            textAnchor="middle"
            fill="#3C4A3E"
            fontFamily="Noto Sans Kannada, sans-serif"
            fontSize="18"
            fontWeight="600"
          >
            ಸಮ್ಮ, ಪೇರಲ
          </text>
          <text
            x="391"
            y="426"
            textAnchor="middle"
            fill="#3C4A3E"
            fontFamily="Noto Sans Kannada, sans-serif"
            fontSize="18"
            fontWeight="600"
          >
            ತರಕಾರಿ
          </text>
        </g>

        {/* shelf 2 — papaya row */}
        <g>
          {papayaRow.map((x, i) => (
            <g key={x}>
              <ellipse
                cx={x + 34}
                cy="470"
                rx="46"
                ry="34"
                transform={`rotate(${-14 + i * 6} ${x + 34} 470)`}
                fill={`url(#${id}papaya)`}
              />
              <path
                d={`M${x - 4} 486 C ${x + 6} 482 ${x + 16} 486 ${x + 20} 494`}
                stroke="#7C6A3A"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          ))}
        </g>

        {/* shelf 3 — papaya row 2 */}
        <g>
          {papayaRow.map((x, i) => (
            <g key={`b-${x}`}>
              <ellipse
                cx={x + 38}
                cy="664"
                rx="48"
                ry="35"
                transform={`rotate(${10 - i * 5} ${x + 38} 664)`}
                fill={`url(#${id}papaya)`}
              />
            </g>
          ))}
        </g>

        {/* shelf 4 — bananas + bottles */}
        <g>
          <g fill="none" strokeLinecap="round">
            <path d="M76 838 C 90 888 142 912 196 896" stroke="#EFD163" strokeWidth="26" />
            <path d="M90 824 C 104 874 152 896 206 882" stroke="#F5DE7C" strokeWidth="24" />
            <path d="M214 838 C 228 888 280 912 334 896" stroke="#EFD163" strokeWidth="26" />
          </g>
          <g fill="#8A9B3F">
            <circle cx="196" cy="896" r="7" />
            <circle cx="206" cy="882" r="7" />
            <circle cx="334" cy="896" r="7" />
          </g>
          <g>
            <rect x="404" y="778" width="46" height="122" rx="14" fill="#DCE8E4" />
            <rect x="404" y="778" width="46" height="122" rx="14" fill="#8FD3B8" opacity="0.45" />
            <rect x="416" y="766" width="22" height="16" rx="4" fill="#087F5B" />
            <rect x="470" y="778" width="46" height="122" rx="14" fill="#DCE8E4" />
            <rect x="470" y="778" width="46" height="122" rx="14" fill="#C9DC7E" opacity="0.5" />
            <rect x="482" y="766" width="22" height="16" rx="4" fill="#087F5B" />
            <rect x="536" y="778" width="46" height="122" rx="14" fill="#DCE8E4" />
            <rect x="536" y="778" width="46" height="122" rx="14" fill="#E7C97E" opacity="0.5" />
            <rect x="548" y="766" width="22" height="16" rx="4" fill="#087F5B" />
          </g>
        </g>

        {/* ── sugarcane menu board on the right ── */}
        <rect x="618" y="120" width="142" height="640" rx="8" fill="#0B7A57" />
        <rect x="630" y="132" width="118" height="34" rx="5" fill="#DCE9BE" />
        <text
          x="689"
          y="156"
          textAnchor="middle"
          fill="#14433A"
          fontFamily="Inter, sans-serif"
          fontSize="15"
          fontWeight="800"
        >
          SUGAR CANE
        </text>
        <g fontFamily="Inter, sans-serif" fontSize="13" fill="#F5FAF3" fontWeight="600">
          <text x="634" y="196">1. MEDIUM</text>
          <text x="634" y="222">2. LARGE</text>
          <text x="634" y="262">Parcel ½ liter</text>
          <text x="634" y="286">Parcel 1 liter</text>
        </g>
        <g fontFamily="Inter, sans-serif" fontSize="14" fill="#B7D96A" fontWeight="800">
          <text x="742" y="196" textAnchor="end">₹20</text>
          <text x="742" y="222" textAnchor="end">₹35</text>
        </g>
        <rect x="630" y="312" width="118" height="26" rx="5" fill="#DCE9BE" />
        <text
          x="689"
          y="331"
          textAnchor="middle"
          fill="#14433A"
          fontFamily="Inter, sans-serif"
          fontSize="13"
          fontWeight="800"
        >
          Combo with Cane
        </text>
        <g fontFamily="Inter, sans-serif" fontSize="13" fill="#F5FAF3" fontWeight="600">
          <text x="634" y="368">Beetroot</text>
          <text x="634" y="394">Carrot</text>
          <text x="634" y="420">Amla</text>
          <text x="634" y="446">Knol Khol</text>
          <text x="634" y="472">Mirchi</text>
          <text x="634" y="498">Mint leaves</text>
          <text x="634" y="524">Pineapple</text>
          <text x="634" y="550">B C A K M</text>
        </g>
        <g fontFamily="Inter, sans-serif" fontSize="13" fill="#B7D96A" fontWeight="800">
          <text x="742" y="368" textAnchor="end">₹35</text>
          <text x="742" y="394" textAnchor="end">₹35</text>
          <text x="742" y="420" textAnchor="end">₹35</text>
          <text x="742" y="446" textAnchor="end">₹35</text>
          <text x="742" y="472" textAnchor="end">₹35</text>
          <text x="742" y="498" textAnchor="end">₹35</text>
          <text x="742" y="524" textAnchor="end">₹35</text>
          <text x="742" y="550" textAnchor="end">₹40</text>
        </g>
        <rect x="630" y="580" width="118" height="70" rx="6" fill="#FFFFFF" />
        <g fontFamily="Inter, sans-serif" fontSize="12" fill="#14433A" fontWeight="600">
          <text x="640" y="606">Parcel ½ liter</text>
          <text x="640" y="634">Parcel 1 liter</text>
        </g>
        <g fontFamily="Inter, sans-serif" fontSize="13" fill="#0B7A57" fontWeight="800">
          <text x="740" y="606" textAnchor="end">₹115</text>
          <text x="740" y="634" textAnchor="end">₹130</text>
        </g>

        {/* person browsing */}
        <g opacity="0.95">
          <path d="M214 950 C 214 866 240 826 288 826 C 336 826 362 866 362 950 Z" fill="#2F3A44" />
          <circle cx="288" cy="798" r="42" fill="#C79B76" />
          <path d="M246 796 C 246 762 266 746 288 746 C 310 746 330 762 330 796 Z" fill="#2B2320" />
          <path d="M250 838 C 268 826 308 826 326 838 L 326 872 L 250 872 Z" fill="#3A4652" />
        </g>

        <rect width="760" height="950" fill="#FFF3D6" opacity="0.05" />
      </g>
    </svg>
  );
}
