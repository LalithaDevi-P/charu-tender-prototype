import { useId, type ReactNode } from "react";

/**
 * Faithful recreation of the Charu Tender menu board photographed at the shop.
 * Column contents and prices mirror the board exactly; items whose price was
 * not legible are marked "demo" on the board itself.
 */

type Row = [num: string, name: string, price: string, sub?: string];

const CANE_TOP: Row[] = [
  ["1", "MEDIUM", "20"],
  ["2", "LARGE", "35"],
];

const CANE_COMBO: Row[] = [
  ["3", "Beetroot", "35"],
  ["4", "Carrot", "35"],
  ["5", "Amla", "35"],
  ["6", "Knol Khol", "35"],
  ["7", "Mirchi", "35"],
  ["8", "Mint leaves", "35"],
  ["9", "Sugarcane pepper", "35"],
  ["10", "Sugarcane tender coconut mix", "40"],
  ["11", "Pineapple", "35"],
  ["12", "B C A K M", "40"],
];

const TC_TOP: Row[] = [
  ["1.", "TENDER COCONUT ROUND", "50"],
  ["2.", "STANDARD", "50"],
  ["3.", "LARGE", "100"],
  [
    "4.",
    "TENDER COCONUT SHAKE (250ml)",
    "70",
    "(COCONUT PULP, KALLU SAKKARE, CASHEW)",
  ],
  ["5.", "BY TO SHAKE", "100"],
  [
    "6.",
    "TENDER COCONUT SHAKE WITH ICECREAM",
    "100",
    "(COCONUT PULP, KALLU SAKKARE, CASHEW, ICE CREAM)",
  ],
  ["7.", "SHAKE WITH ICECREAM MIX, DRY FRUITS", "130"],
  ["8.", "TENDER COCONUT PULP", "40"],
  ["9.", "2 SCOOP ICECREAM", "60"],
];

const TC_COMBO: Row[] = [
  ["10", "Beetroot", "60"],
  ["11", "Carrot", "60"],
  ["12", "Amla", "60"],
  ["13", "Knol Khol", "60"],
  ["14", "Mirchi", "60"],
  ["15", "Mint leaves", "60"],
  ["16", "Pineapple", "60"],
  ["17", "B C K M", "65"],
  ["18", "TENDER COCONUT PEPPER", "65*"],
];

export function MenuBoard({ className = "" }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");

  const drawRows = (rows: Row[], x0: number, x1: number, y0: number) =>
    rows.reduce<{ nodes: ReactNode[]; y: number }>(
      (acc, [num, name, price, sub]) => {
        const nodes = [
          ...acc.nodes,
          <g key={`${num}-${name}`}>
            <text
              x={x0}
              y={acc.y}
              fill="#14433A"
              fontFamily="Inter, sans-serif"
              fontSize="16"
              fontWeight="700"
            >
              {num}
            </text>
            <text
              x={x0 + 30}
              y={acc.y}
              fill="#14433A"
              fontFamily="Inter, sans-serif"
              fontSize="16"
              fontWeight="600"
            >
              {name}
            </text>
            <text
              x={x1}
              y={acc.y}
              textAnchor="end"
              fill="#0B7A57"
              fontFamily="Inter, sans-serif"
              fontSize="17"
              fontWeight="800"
            >
              ₹{price}
            </text>
          </g>,
        ];
        let next = acc.y + 28;
        if (sub) {
          nodes.push(
            <text
              key={`${num}-sub`}
              x={x0 + 30}
              y={acc.y + 17}
              fill="#5A7A6F"
              fontFamily="Inter, sans-serif"
              fontSize="11"
              fontWeight="500"
            >
              {sub}
            </text>,
          );
          next = acc.y + 48;
        }
        return { nodes, y: next };
      },
      { nodes: [], y: y0 },
    ).nodes;

  const caneTop = drawRows(CANE_TOP, 44, 300, 178);
  const caneCombo = drawRows(CANE_COMBO, 44, 300, 358);
  const tcTop = drawRows(TC_TOP, 368, 626, 178);
  const tcCombo = drawRows(TC_COMBO, 368, 626, 630);

  return (
    <svg
      viewBox="0 0 660 900"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Charu Tender menu board"
    >
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#0C8A63" />
          <stop offset="100%" stopColor="#076749" />
        </linearGradient>
        <clipPath id={`${id}frame`}>
          <rect width="660" height="900" rx="18" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}frame)`}>
        <rect width="660" height="900" fill={`url(#${id}bg)`} />

        {/* header plate */}
        <rect x="18" y="16" width="624" height="76" rx="38" fill="#F6FBF6" />
        <text
          x="46"
          y="66"
          fill="#0B7A57"
          fontFamily="Noto Sans Kannada, sans-serif"
          fontSize="30"
          fontWeight="700"
        >
          ಚಾರು ಎಳನೀರು
        </text>
        <circle cx="330" cy="54" r="27" fill="#FFFFFF" stroke="#0B7A57" strokeWidth="4" />
        <ellipse cx="330" cy="64" rx="14" ry="6" fill="#0B7A57" />
        <path
          d="M328 62 C 326 52 324 46 321 40"
          stroke="#0B7A57"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <g fill="#0B7A57">
          <path d="M321 40 C 315 36 309 36 304 40 C 310 41 316 43 321 46 Z" />
          <path d="M321 40 C 323 33 328 28 335 26 C 330 32 326 37 324 44 Z" />
          <path d="M327 44 C 333 40 340 40 345 44 C 339 45 332 46 327 48 Z" />
        </g>
        <text
          x="374"
          y="66"
          fill="#0B7A57"
          fontFamily="Inter, sans-serif"
          fontSize="32"
          fontWeight="800"
          letterSpacing="2"
        >
          CHARU TENDER
        </text>

        {/* ── left column: SUGAR CANE ── */}
        <rect x="18" y="110" width="304" height="720" rx="10" fill="#F5FAF3" />
        <rect x="30" y="122" width="280" height="40" rx="6" fill="#DCE9BE" />
        <text
          x="170"
          y="150"
          textAnchor="middle"
          fill="#14433A"
          fontFamily="Inter, sans-serif"
          fontSize="23"
          fontWeight="800"
          letterSpacing="1.5"
        >
          SUGAR CANE
        </text>

        {caneTop}

        {/* parcel box */}
        <rect x="120" y="234" width="180" height="72" rx="8" fill="#FFFFFF" stroke="#0B7A57" strokeWidth="2.5" />
        <g fontFamily="Inter, sans-serif" fontSize="14" fontWeight="600" fill="#14433A">
          <text x="134" y="260">Parcel ½ liter</text>
          <text x="288" y="260" textAnchor="end" fontWeight="800" fill="#0B7A57">
            ₹140
          </text>
          <text x="134" y="290">Parcel 1 liter</text>
          <text x="288" y="290" textAnchor="end" fontWeight="800" fill="#0B7A57">
            ₹155
          </text>
        </g>

        <rect x="30" y="320" width="280" height="30" rx="6" fill="#DCE9BE" />
        <text
          x="170"
          y="342"
          textAnchor="middle"
          fill="#14433A"
          fontFamily="Inter, sans-serif"
          fontSize="17"
          fontWeight="800"
        >
          Combo with Cane
        </text>

        {caneCombo}

        <rect x="120" y="648" width="180" height="72" rx="8" fill="#FFFFFF" stroke="#0B7A57" strokeWidth="2.5" />
        <g fontFamily="Inter, sans-serif" fontSize="14" fontWeight="600" fill="#14433A">
          <text x="134" y="674">Parcel ½ liter</text>
          <text x="288" y="674" textAnchor="end" fontWeight="800" fill="#0B7A57">
            ₹115
          </text>
          <text x="134" y="704">Parcel 1 liter</text>
          <text x="288" y="704" textAnchor="end" fontWeight="800" fill="#0B7A57">
            ₹130
          </text>
        </g>

        <g transform="translate(30 744)">
          <rect width="280" height="72" rx="8" fill="#EAF3E2" />
          <text x="140" y="28" textAnchor="middle" fill="#14433A" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="700">
            SUGARCANE JUICE
          </text>
          <text x="140" y="54" textAnchor="middle" fill="#0B7A57" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="800">
            DRINK SMART BE SMART
          </text>
        </g>

        {/* ── right column: TENDER COCONUT ── */}
        <rect x="338" y="110" width="304" height="764" rx="10" fill="#F5FAF3" />
        <rect x="350" y="122" width="280" height="40" rx="6" fill="#DCE9BE" />
        <text
          x="490"
          y="150"
          textAnchor="middle"
          fill="#14433A"
          fontFamily="Inter, sans-serif"
          fontSize="21"
          fontWeight="800"
          letterSpacing="1"
        >
          TENDER COCONUT
        </text>

        {tcTop}

        {/* coconut water parcel */}
        <rect x="440" y="500" width="180" height="76" rx="8" fill="#FFFFFF" stroke="#0B7A57" strokeWidth="2.5" />
        <g fontFamily="Inter, sans-serif" fontSize="14" fontWeight="600" fill="#14433A">
          <text x="454" y="526">Parcel ½ liter</text>
          <text x="608" y="526" textAnchor="end" fontWeight="800" fill="#0B7A57">
            ₹195
          </text>
          <text x="454" y="556">Parcel 1 liter</text>
          <text x="608" y="556" textAnchor="end" fontWeight="800" fill="#0B7A57">
            ₹205
          </text>
        </g>
        <text
          x="432"
          y="592"
          fill="#14433A"
          fontFamily="Inter, sans-serif"
          fontSize="15"
          fontWeight="800"
          letterSpacing="1"
        >
          COCONUT WATER
        </text>

        <rect x="350" y="598" width="280" height="30" rx="6" fill="#DCE9BE" />
        <text
          x="490"
          y="620"
          textAnchor="middle"
          fill="#14433A"
          fontFamily="Inter, sans-serif"
          fontSize="17"
          fontWeight="800"
        >
          Combo with coconut
        </text>

        {tcCombo}

        <text
          x="368"
          y="856"
          fill="#5A7A6F"
          fontFamily="Inter, sans-serif"
          fontSize="13"
          fontWeight="600"
        >
          * demo price — not legible on the board
        </text>

        <rect width="660" height="900" fill="#FFFFFF" opacity="0.04" />
      </g>
      <rect
        x="1"
        y="1"
        width="658"
        height="898"
        rx="18"
        fill="none"
        stroke="#054D38"
        strokeWidth="3"
      />
    </svg>
  );
}
