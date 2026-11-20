import { useId, type ReactNode } from "react";
import type { ArtVariant } from "@/lib/catalog";

/**
 * Illustrated product artwork for Charu Tender.
 * Every product card renders one of these scenes so the menu stays visually
 * consistent and fully self-contained (no external image dependencies).
 */

interface Props {
  variant: ArtVariant;
  tone?: string;
  className?: string;
}

const SKY_TOP = "#FFFFFF";
const SKY_BOTTOM = "#EFF8F3";

export function ProductArt({ variant, tone, className = "" }: Props) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const liquid = tone ?? "#EDE3C8";

  const bg = (
    <>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={SKY_TOP} />
          <stop offset="100%" stopColor={SKY_BOTTOM} />
        </linearGradient>
        <linearGradient id={`${id}husk`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDF8EC" />
          <stop offset="55%" stopColor="#F3E9D2" />
          <stop offset="100%" stopColor="#E1D0AE" />
        </linearGradient>
        <linearGradient id={`${id}shell`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A8BE72" />
          <stop offset="60%" stopColor="#8CA65C" />
          <stop offset="100%" stopColor="#6E8747" />
        </linearGradient>
        <clipPath id={`${id}clip`}>
          <rect width="400" height="300" />
        </clipPath>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}bg)`} />
      <circle cx="330" cy="58" r="96" fill="#B7D96A" opacity="0.16" />
      <circle cx="64" cy="252" r="74" fill="#087F5B" opacity="0.07" />
      <ellipse cx="200" cy="258" rx="92" ry="14" fill="#16352D" opacity="0.10" />
    </>
  );

  const husk = `url(#${id}husk)`;
  const shell = `url(#${id}shell)`;

  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-label="Charu Tender product illustration"
      preserveAspectRatio="xMidYMid slice"
    >
      {bg}
      <g clipPath={`url(#${id}clip)`}>{renderSubject(variant, liquid, husk, shell, id)}</g>
    </svg>
  );
}

function renderSubject(
  variant: ArtVariant,
  liquid: string,
  husk: string,
  shell: string,
  id: string,
) {
  switch (variant) {
    /* ───────────────────────── tender coconut ───────────────────────── */
    case "coconut-open":
      return (
        <>
          <path
            d="M212 178 L252 62"
            stroke="#EFE8D6"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M212 178 L252 62"
            stroke="#16352D"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.05"
          />
          <path
            d="M147 254 C144 198 157 156 200 152 C243 156 256 198 253 254 Z"
            fill={husk}
          />
          <path
            d="M148 236 C176 230 224 230 252 236 L253 254 C224 260 176 260 147 254 Z"
            fill="#C6D69E"
            opacity="0.75"
          />
          <g stroke="#16352D" strokeOpacity="0.08" strokeWidth="1.6" fill="none">
            <path d="M166 172 C162 200 161 228 163 252" />
            <path d="M186 160 C184 200 183 228 184 254" />
            <path d="M216 160 C218 200 219 228 218 254" />
            <path d="M237 172 C241 200 242 228 240 252" />
          </g>
          <path
            d="M172 172 C167 202 167 230 172 250"
            stroke="#FFFFFF"
            strokeOpacity="0.7"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx="200" cy="155" rx="44" ry="14" fill="#E6D6B4" />
          <ellipse cx="200" cy="156" rx="33" ry="10" fill="#FBF5E6" />
          <ellipse cx="200" cy="157" rx="19" ry="6" fill="#D6C49C" />
        </>
      );

    case "coconut-tall":
      return (
        <>
          <path
            d="M210 152 L246 56"
            stroke="#EFE8D6"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <path
            d="M156 254 C153 190 165 136 200 132 C235 136 247 190 244 254 Z"
            fill={husk}
          />
          <path
            d="M157 236 C180 231 220 231 243 236 L244 254 C220 259 180 259 156 254 Z"
            fill="#C6D69E"
            opacity="0.75"
          />
          <g stroke="#16352D" strokeOpacity="0.08" strokeWidth="1.6" fill="none">
            <path d="M172 152 C169 190 168 224 169 253" />
            <path d="M200 142 C199 190 199 224 199 254" />
            <path d="M228 152 C231 190 232 224 231 253" />
          </g>
          <path
            d="M176 152 C172 190 172 224 176 250"
            stroke="#FFFFFF"
            strokeOpacity="0.7"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx="200" cy="135" rx="40" ry="13" fill="#E6D6B4" />
          <ellipse cx="200" cy="136" rx="30" ry="9" fill="#FBF5E6" />
          <ellipse cx="200" cy="137" rx="17" ry="5.5" fill="#D6C49C" />
        </>
      );

    case "pulp":
      return (
        <>
          <path
            d="M146 196 C146 236 170 254 200 254 C230 254 254 236 254 196 Z"
            fill={husk}
          />
          <path
            d="M150 232 C172 244 228 244 250 232 L254 196 L146 196 Z"
            fill="#C6D69E"
            opacity="0.5"
          />
          <ellipse cx="200" cy="196" rx="56" ry="17" fill="#D8C69F" />
          <ellipse cx="200" cy="197" rx="48" ry="13" fill="#FCF7EA" />
          <g fill="#FFFDF6">
            <ellipse cx="180" cy="196" rx="14" ry="8" />
            <ellipse cx="206" cy="200" rx="16" ry="9" />
            <ellipse cx="224" cy="193" rx="11" ry="6" />
            <ellipse cx="196" cy="189" rx="10" ry="5.5" />
          </g>
          <path
            d="M160 208 C166 228 182 242 200 246"
            stroke="#FFFFFF"
            strokeOpacity="0.55"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
        </>
      );

    /* ───────────────────────── shakes ───────────────────────── */
    case "shake-glass":
      return (
        <>
          <Glass>
            <path
              d="M174 112 L180 236 Q200 245 220 236 L226 112 Z"
              fill={liquid}
            />
            <path
              d="M174 112 C182 98 218 98 226 112 Z"
              fill="#FFFCF2"
            />
            <g fill="#FFFCF2">
              <circle cx="184" cy="107" r="8" />
              <circle cx="200" cy="103" r="10" />
              <circle cx="216" cy="108" r="8" />
            </g>
          </Glass>
          <path
            d="M208 106 L240 46"
            stroke="#F1EADA"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <path
            d="M208 106 L240 46"
            stroke="#087F5B"
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray="7 13"
            opacity="0.45"
          />
          <path
            d="M182 132 L186 224"
            stroke="#FFFFFF"
            strokeOpacity="0.75"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </>
      );

    case "shake-coconut":
      return (
        <>
          <path
            d="M147 256 C143 200 165 162 200 162 C235 162 257 200 253 256 Z"
            fill={shell}
          />
          <path
            d="M152 236 C176 230 224 230 248 236 L253 256 C224 262 176 262 147 256 Z"
            fill="#5E7540"
            opacity="0.55"
          />
          <path
            d="M164 180 C160 210 160 236 165 254"
            stroke="#FFFFFF"
            strokeOpacity="0.35"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx="200" cy="164" rx="53" ry="16" fill="#B48C56" />
          <ellipse cx="200" cy="165" rx="45" ry="12" fill="#8C6A3D" />
          <ellipse cx="200" cy="167" rx="40" ry="10" fill="#F7F1E2" />
          <g fill="#FFFDF4">
            <ellipse cx="183" cy="166" rx="12" ry="7" />
            <ellipse cx="212" cy="168" rx="13" ry="7.5" />
          </g>
          <circle cx="200" cy="144" r="27" fill="#FFF8E6" />
          <circle cx="190" cy="135" r="9" fill="#FFFFFF" opacity="0.75" />
          <circle cx="210" cy="152" r="4" fill="#EADDC0" opacity="0.8" />
        </>
      );

    case "icecream":
      return (
        <>
          <path
            d="M168 182 L176 246 Q200 255 224 246 L232 182 Z"
            fill="#FFFFFF"
          />
          <path
            d="M172 200 L178 244 Q200 252 222 244 L228 200 Z"
            fill="#F5F8F5"
          />
          <circle cx="184" cy="156" r="25" fill="#FFF7E6" />
          <circle cx="216" cy="152" r="23" fill="#F7E9CB" />
          <circle cx="200" cy="174" r="22" fill="#FFFFFF" />
          <circle cx="177" cy="148" r="7" fill="#FFFFFF" opacity="0.8" />
          <rect
            x="163"
            y="176"
            width="74"
            height="15"
            rx="7.5"
            fill="#087F5B"
          />
          <rect
            x="163"
            y="176"
            width="74"
            height="6"
            rx="3"
            fill="#0E9D74"
            opacity="0.7"
          />
        </>
      );

    case "bottle":
      return <Bottle id={id} liquid={liquid} />;

    /* ───────────────────────── sugarcane ───────────────────────── */
    case "cane-glass":
      return (
        <>
          <Glass>
            <path
              d="M174 116 L180 236 Q200 245 220 236 L226 116 Z"
              fill="#D7DE86"
            />
            <path d="M174 116 C182 100 218 100 226 116 Z" fill="#EFF3CB" />
            <g fill="#FBFDF0">
              <circle cx="185" cy="110" r="9" />
              <circle cx="201" cy="106" r="11" />
              <circle cx="217" cy="111" r="8" />
            </g>
          </Glass>
          <path
            d="M182 134 L186 224"
            stroke="#FFFFFF"
            strokeOpacity="0.8"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </>
      );

    case "cane-stalks":
      return (
        <>
          <Stalk x={158} y={72} h={182} w={24} rot={-7} fill="#C7CD8B" />
          <Stalk x={196} y={58} h={198} w={26} rot={0} fill="#D3D89A" />
          <Stalk x={236} y={78} h={176} w={23} rot={7} fill="#BCC283" />
        </>
      );

    case "combo-cane":
      return (
        <>
          <Stalk x={148} y={60} h={188} w={26} rot={-10} fill="#C7CD8B" />
          <Stalk x={252} y={68} h={180} w={24} rot={11} fill="#D3D89A" />
          <Glass>
            <path
              d="M176 124 L182 236 Q200 244 218 236 L224 124 Z"
              fill={liquid}
            />
            <path d="M176 124 C184 110 216 110 224 124 Z" fill="#F6F9E4" />
          </Glass>
          <path
            d="M184 142 L187 222"
            stroke="#FFFFFF"
            strokeOpacity="0.75"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </>
      );

    case "combo-coconut":
      return (
        <>
          <path
            d="M124 258 C120 214 140 184 172 184 C204 184 224 214 220 258 Z"
            fill={shell}
          />
          <ellipse cx="172" cy="186" rx="46" ry="14" fill="#B48C56" />
          <ellipse cx="172" cy="187" rx="38" ry="10" fill="#F7F1E2" />
          <Glass xShift={56}>
            <path
              d="M176 124 L182 236 Q200 244 218 236 L224 124 Z"
              fill={liquid}
            />
            <path d="M176 124 C184 110 216 110 224 124 Z" fill="#F6F9E4" />
          </Glass>
          <path
            d="M240 142 L243 222"
            stroke="#FFFFFF"
            strokeOpacity="0.75"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </>
      );

    case "juice":
      return (
        <>
          <Glass>
            <path
              d="M174 114 L180 236 Q200 245 220 236 L226 114 Z"
              fill={liquid}
            />
            <path d="M174 114 C182 100 218 100 226 114 Z" fill="#FFFFFF" opacity="0.55" />
          </Glass>
          <circle cx="234" cy="112" r="18" fill="#F4C95D" />
          <circle cx="234" cy="112" r="13" fill="#FBE6AE" />
          <g stroke="#E9AE34" strokeWidth="1.6">
            <path d="M234 99 L234 125" />
            <path d="M221 112 L247 112" />
          </g>
          <path
            d="M182 134 L186 224"
            stroke="#FFFFFF"
            strokeOpacity="0.7"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </>
      );

    /* ───────────────────────── fruits ───────────────────────── */
    case "papaya":
      return (
        <>
          <ellipse
            cx="158"
            cy="212"
            rx="76"
            ry="46"
            transform="rotate(-14 158 212)"
            fill={`url(#${id}papaya)`}
          />
          <defs>
            <linearGradient id={`${id}papaya`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8CBF52" />
              <stop offset="55%" stopColor="#EFA23C" />
              <stop offset="100%" stopColor="#E2812C" />
            </linearGradient>
          </defs>
          <path
            d="M88 236 C96 232 104 234 110 240"
            stroke="#7C6A3A"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <g transform="rotate(-14 268 214)">
            <ellipse cx="268" cy="214" rx="58" ry="40" fill="#EFA23C" />
            <ellipse cx="268" cy="214" rx="47" ry="31" fill="#F7BC66" />
            <g fill="#2C2A20">
              <circle cx="252" cy="208" r="4.5" />
              <circle cx="266" cy="203" r="4.5" />
              <circle cx="280" cy="209" r="4.5" />
              <circle cx="258" cy="221" r="4.5" />
              <circle cx="273" cy="222" r="4.5" />
              <circle cx="287" cy="217" r="4.5" />
              <circle cx="245" cy="219" r="4" />
            </g>
          </g>
        </>
      );

    case "banana":
      return (
        <>
          <g fill="none" strokeLinecap="round">
            <path
              d="M132 122 C 146 200 208 242 282 214"
              stroke="#E6BE3E"
              strokeWidth="34"
            />
            <path
              d="M146 112 C 160 190 218 230 292 200"
              stroke="#F2D45F"
              strokeWidth="32"
            />
            <path
              d="M162 106 C 176 180 230 216 298 186"
              stroke="#EACB51"
              strokeWidth="30"
            />
          </g>
          <g fill="#8A9B3F">
            <circle cx="282" cy="214" r="8" />
            <circle cx="292" cy="200" r="7.5" />
            <circle cx="298" cy="186" r="7" />
          </g>
          <path
            d="M132 122 L150 96"
            stroke="#9AA653"
            strokeWidth="16"
            strokeLinecap="round"
          />
        </>
      );

    case "pineapple":
      return (
        <>
          <g fill="#3E8C55">
            <path d="M200 132 C188 96 188 66 200 42 C212 66 212 96 200 132 Z" />
            <path
              d="M200 132 C176 108 164 84 164 60 C186 78 198 104 200 132 Z"
              opacity="0.92"
            />
            <path
              d="M200 132 C224 108 236 84 236 60 C214 78 202 104 200 132 Z"
              opacity="0.92"
            />
            <path
              d="M200 132 C170 122 150 106 144 84 C172 94 192 112 200 132 Z"
              opacity="0.8"
            />
            <path
              d="M200 132 C230 122 250 106 256 84 C228 94 208 112 200 132 Z"
              opacity="0.8"
            />
          </g>
          <ellipse cx="200" cy="196" rx="54" ry="68" fill="#E3B03A" />
          <clipPath id={`${id}pine`}>
            <ellipse cx="200" cy="196" rx="54" ry="68" />
          </clipPath>
          <g clipPath={`url(#${id}pine)`} stroke="#B5841F" strokeWidth="2.6" opacity="0.85">
            <path d="M130 140 L270 260" />
            <path d="M130 180 L270 300" />
            <path d="M130 220 L260 330" />
            <path d="M130 100 L250 210" />
            <path d="M270 140 L130 260" />
            <path d="M270 180 L130 300" />
            <path d="M270 220 L140 330" />
            <path d="M270 100 L150 210" />
          </g>
          <ellipse
            cx="176"
            cy="172"
            rx="14"
            ry="30"
            fill="#FFFFFF"
            opacity="0.22"
            transform="rotate(-16 176 172)"
          />
        </>
      );

    case "watermelon":
      return (
        <>
          <ellipse cx="152" cy="196" rx="80" ry="64" fill="#2F7A43" />
          <clipPath id={`${id}wm`}>
            <ellipse cx="152" cy="196" rx="80" ry="64" />
          </clipPath>
          <g
            clipPath={`url(#${id}wm)`}
            stroke="#1D5A30"
            strokeWidth="9"
            fill="none"
            opacity="0.85"
          >
            <path d="M96 130 C 88 170 88 224 98 262" />
            <path d="M136 126 C 126 168 126 226 138 266" />
            <path d="M176 130 C 168 170 168 224 178 262" />
            <path d="M212 142 C 208 176 208 218 216 250" />
          </g>
          <ellipse
            cx="122"
            cy="168"
            rx="22"
            ry="14"
            fill="#FFFFFF"
            opacity="0.16"
            transform="rotate(-24 122 168)"
          />
          <path
            d="M244 178 L346 178 A 51 51 0 0 1 244 178 Z"
            fill="#2F7A43"
          />
          <path
            d="M250 182 L340 182 A 45 45 0 0 1 250 182 Z"
            fill="#E9F2E4"
          />
          <path
            d="M254 186 L336 186 A 41 41 0 0 1 254 186 Z"
            fill="#E5484D"
          />
          <g fill="#241E1C">
            <ellipse cx="276" cy="204" rx="4" ry="6" />
            <ellipse cx="296" cy="216" rx="4" ry="6" />
            <ellipse cx="314" cy="200" rx="4" ry="6" />
            <ellipse cx="294" cy="196" rx="3.5" ry="5" />
          </g>
        </>
      );

    case "pomegranate":
      return (
        <>
          <circle cx="164" cy="204" r="58" fill="#B3244B" />
          <path
            d="M156 148 L162 128 L170 142 L180 126 L184 148 Z"
            fill="#8E1B39"
          />
          <ellipse
            cx="142"
            cy="182"
            rx="18"
            ry="12"
            fill="#FFFFFF"
            opacity="0.2"
            transform="rotate(-30 142 182)"
          />
          <circle cx="262" cy="220" r="48" fill="#C7304F" />
          <path
            d="M254 174 L259 158 L266 170 L274 156 L278 174 Z"
            fill="#9C2140"
          />
          <circle cx="262" cy="222" r="38" fill="#F5E2D6" />
          <g fill="#C7304F">
            <circle cx="248" cy="210" r="7" />
            <circle cx="266" cy="206" r="7" />
            <circle cx="282" cy="216" r="7" />
            <circle cx="252" cy="230" r="7" />
            <circle cx="270" cy="230" r="7" />
            <circle cx="240" cy="224" r="6" />
            <circle cx="286" cy="232" r="6" />
            <circle cx="262" cy="244" r="6" />
          </g>
        </>
      );

    case "fruit-bowl":
      return (
        <>
          <path
            d="M132 200 C132 242 166 258 200 258 C234 258 268 242 268 200 Z"
            fill="#FFFFFF"
          />
          <path
            d="M142 216 C158 240 244 240 258 216 C250 244 234 254 200 254 C166 254 150 244 142 216 Z"
            fill="#EFF8F3"
          />
          <circle cx="172" cy="168" r="36" fill="#E5484D" />
          <circle cx="230" cy="164" r="32" fill="#F2C744" />
          <path
            d="M150 140 C 158 118 186 108 214 116"
            stroke="#EACB51"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M172 138 C 170 122 176 108 190 100"
            stroke="#3E8C55"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse
            cx="200"
            cy="200"
            rx="68"
            ry="17"
            fill="#FFFFFF"
          />
          <path
            d="M136 200 A 64 17 0 0 0 264 200"
            fill="none"
            stroke="#DCEAE3"
            strokeWidth="3"
          />
        </>
      );

    default:
      return null;
  }
}

/* ── reusable pieces ─────────────────────────────────────────── */

function Glass({
  children,
  xShift = 0,
}: {
  children: ReactNode;
  xShift?: number;
}) {
  return (
    <g transform={`translate(${xShift} 0)`}>
      <path
        d="M170 94 L177 240 Q200 251 223 240 L230 94 Z"
        fill="#FFFFFF"
        opacity="0.55"
      />
      <path
        d="M170 94 L177 240 Q200 251 223 240 L230 94 Z"
        fill="none"
        stroke="#DCEAE3"
        strokeWidth="3"
      />
      <ellipse cx="200" cy="94" rx="30" ry="9" fill="#FFFFFF" opacity="0.85" />
      <ellipse cx="200" cy="94" rx="30" ry="9" fill="none" stroke="#DCEAE3" strokeWidth="3" />
      {children}
      <ellipse cx="200" cy="245" rx="26" ry="7" fill="#16352D" opacity="0.10" />
    </g>
  );
}

function Stalk({
  x,
  y,
  h,
  w,
  rot,
  fill,
}: {
  x: number;
  y: number;
  h: number;
  w: number;
  rot: number;
  fill: string;
}) {
  const nodes = [0.22, 0.44, 0.66, 0.86];
  return (
    <g transform={`rotate(${rot} ${x + w / 2} ${y + h})`}>
      <rect x={x} y={y} width={w} height={h} rx={w / 2} fill={fill} />
      <rect
        x={x}
        y={y}
        width={w * 0.34}
        height={h}
        fill="#FFFFFF"
        opacity="0.35"
      />
      {nodes.map((f) => (
        <g key={f}>
          <rect
            x={x - 3}
            y={y + h * f}
            width={w + 6}
            height={6}
            rx={3}
            fill="#A5A96B"
          />
        </g>
      ))}
      <rect
        x={x}
        y={y}
        width={w}
        height={16}
        rx={w / 2}
        fill="#8E9B55"
      />
    </g>
  );
}

function Bottle({ id, liquid }: { id: string; liquid: string }) {
  const outline =
    "M192 72 L208 72 L208 90 C208 98 230 106 230 134 L230 236 C230 246 224 252 214 252 L186 252 C176 252 170 246 170 236 L170 134 C170 106 192 98 192 90 Z";
  return (
    <>
      <defs>
        <clipPath id={`${id}bottle`}>
          <path d={outline} />
        </clipPath>
      </defs>
      <rect x="187" y="56" width="26" height="18" rx="5" fill="#087F5B" />
      <rect x="187" y="56" width="26" height="7" rx="3.5" fill="#0E9D74" />
      <path d={outline} fill="#FFFFFF" opacity="0.75" />
      <g clipPath={`url(#${id}bottle)`}>
        <rect x="160" y="118" width="80" height="150" fill={liquid} />
        <rect x="160" y="118" width="80" height="9" fill="#FFFFFF" opacity="0.55" />
        <rect x="176" y="130" width="9" height="110" fill="#FFFFFF" opacity="0.5" />
      </g>
      <path
        d={outline}
        fill="none"
        stroke="#C9DCD3"
        strokeWidth="2.5"
      />
      <rect x="174" y="172" width="52" height="52" rx="9" fill="#087F5B" />
      <g fill="#FFFFFF" textAnchor="middle" fontFamily="Inter, sans-serif">
        <text x="200" y="194" fontSize="9" fontWeight="800" letterSpacing="1">
          CHARU
        </text>
        <text x="200" y="207" fontSize="9" fontWeight="800" letterSpacing="1">
          TENDER
        </text>
        <text x="200" y="218" fontSize="6" opacity="0.8" letterSpacing="0.6">
          FRESH
        </text>
      </g>
    </>
  );
}
