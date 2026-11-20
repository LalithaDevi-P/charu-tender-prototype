import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Clock,
  HeartPulse,
  Leaf,
  MapPin,
  PackageCheck,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductArt } from "@/components/art/ProductArt";
import { HeroCoconut, Scene } from "@/components/art/scenes";
import { ProductCard } from "@/components/shop/ProductCard";
import { PRODUCTS, byCategory, inr } from "@/lib/catalog";
import { BIZ } from "@/lib/demo";

const CATEGORIES = [
  { label: "Tender Coconut", cat: "tender-coconut", art: "coconut-open" as const, tone: undefined, emoji: "🥥" },
  { label: "Sugarcane", cat: "sugarcane", art: "cane-glass" as const, tone: undefined, emoji: "🎋" },
  { label: "Amla", cat: "amla", art: "juice" as const, tone: "#9CC64B", emoji: "🍈" },
  { label: "Fresh Juices", cat: "juices", art: "juice" as const, tone: "#E4761B", emoji: "🍹" },
  { label: "Fresh Fruits", cat: "fruits", art: "fruit-bowl" as const, tone: undefined, emoji: "🍌" },
];

const TRUST = [
  { icon: Leaf, label: "Fresh & Natural" },
  { icon: Clock, label: "Freshly Prepared" },
  { icon: Award, label: "Premium Quality" },
  { icon: HeartPulse, label: "Healthy Refreshments" },
];

const WHY = [
  {
    icon: Leaf,
    title: "Fresh & Natural",
    text: "No syrups, no concentrates. Everything is pressed, trimmed and served the moment you order.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    text: "Tender coconut procured directly from plantations and trimmed to order at the counter.",
  },
  {
    icon: Clock,
    title: "Freshly Prepared",
    text: "Juices are made in small batches through the day so every glass tastes like the first.",
  },
  {
    icon: PackageCheck,
    title: "Event Supply",
    text: "Trimmed tender coconut supplied for weddings, corporate events, birthdays and auspicious occasions.",
  },
];

const FRESHNESS = [
  { title: "Fresh & Natural", text: "Nothing artificial ever touches the counter." },
  { title: "Premium Quality", text: "Hand-picked fruit, selected every morning." },
  { title: "Event Supply", text: "Bulk trimmed coconut delivered for functions." },
  { title: "Made Fresh", text: "Prepared in front of you, never pre-packed." },
];

const PREVIEW_GALLERY = ["shop-exterior", "counter", "shake-table", "fruit-shelves"];

const POPULAR_IDS = [
  "tc-round",
  "cane-medium",
  "tc-shake-icecream",
  "combo-cane-beetroot",
  "tc-large",
  "fruit-papaya",
  "tc-pulp",
  "juice-pineapple",
];

const popular = POPULAR_IDS.map((id) => PRODUCTS.find((p) => p.id === id)!).filter(Boolean);
const tenderCount = byCategory("tender-coconut").length;

function SectionHeading({
  eyebrow,
  title,
  sub,
  action,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  action?: { to: string; label: string };
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">{eyebrow}</p>
        <h2 className="mt-3 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        {sub && <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{sub}</p>}
      </div>
      {action && (
        <Link
          to={action.to}
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
        >
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-fresh/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 top-40 h-[380px] w-[380px] rounded-full bg-mist blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-24 lg:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink shadow-sm">
              <Star className="h-3.5 w-3.5 fill-honey text-honey" />
              {BIZ.rating}
              <span className="font-normal text-muted-foreground">
                · {BIZ.reviews} reviews
              </span>
              <span className="h-3 w-px bg-line" />
              <span className="font-normal text-muted-foreground">Vijayanagar</span>
            </span>

            <h1 className="mt-6 text-balance text-[2.7rem] font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.2rem]">
              Freshness in
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">Every Sip</span>
                <span className="absolute inset-x-0 bottom-1.5 z-0 h-3.5 rounded-full bg-fresh/70 sm:h-5" />
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-balance text-[17px] leading-relaxed text-ink/75 sm:text-lg">
              Fresh tender coconut, natural sugarcane juice, healthy fruit juices
              and fresh fruits at Charu Tender.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8 text-[15px] font-semibold">
                <Link to="/menu">
                  Order Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-line bg-white px-8 text-[15px] font-semibold text-ink hover:border-brand hover:text-brand"
              >
                <Link to="/menu?cat=all">Explore Menu</Link>
              </Button>
            </div>

            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {TRUST.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-2 rounded-2xl border border-line bg-white/70 px-3 py-2.5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mist text-brand">
                    <t.icon className="h-4 w-4" />
                  </span>
                  <span className="text-[12.5px] font-semibold leading-tight text-ink">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-line shadow-[0_40px_70px_-40px_rgba(22,53,45,0.55)] sm:rounded-[2.5rem]">
              <HeroCoconut className="aspect-[4/3] w-full sm:aspect-[5/4]" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/45 to-transparent" />
              <p className="absolute bottom-4 left-5 text-[13px] font-semibold text-white/95">
                Trimmed fresh at Sangam Circle
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="absolute -left-2 bottom-6 rounded-2xl border border-line bg-white px-4 py-3 shadow-xl sm:-left-6"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                Today&apos;s offer
              </p>
              <p className="mt-1 text-sm font-bold text-ink">Papaya · 1 kg</p>
              <p className="text-lg font-extrabold leading-tight text-brand">
                {inr(30)}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -right-1 top-6 rounded-2xl border border-line bg-white px-4 py-3 shadow-xl sm:-right-4"
            >
              <p className="flex items-center gap-2 text-sm font-bold text-ink">
                <Sparkles className="h-4 w-4 text-honey" />
                {tenderCount} coconut choices
              </p>
              <p className="text-xs text-muted-foreground">on the menu board</p>
            </motion.div>
          </motion.div>
        </div>

        {/* visual story strip */}
        <div className="border-y border-line bg-mist">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-7 gap-y-2 px-4 py-3.5 text-[13px] font-semibold text-ink/75 sm:px-6">
            <span>🥥 Tender Coconut</span>
            <span className="hidden h-1 w-1 rounded-full bg-brand/40 sm:block" />
            <span>🎋 Sugarcane</span>
            <span className="hidden h-1 w-1 rounded-full bg-brand/40 sm:block" />
            <span>🍈 Amla</span>
            <span className="hidden h-1 w-1 rounded-full bg-brand/40 sm:block" />
            <span>🍹 Fresh Juices</span>
            <span className="hidden h-1 w-1 rounded-full bg-brand/40 sm:block" />
            <span>🍌 Fresh Fruits</span>
            <span className="hidden h-1 w-1 rounded-full bg-brand/40 sm:block" />
            <span>🌿 Natural Freshness</span>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <SectionHeading
          eyebrow="Popular categories"
          title="What are you craving today?"
          sub="Every category is trimmed, pressed or cut fresh when you order."
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.cat}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Link
                to={`/menu?cat=${c.cat}`}
                className="group block overflow-hidden rounded-3xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_26px_44px_-28px_rgba(8,127,91,0.5)]"
              >
                <div className="aspect-[5/4] overflow-hidden bg-mist">
                  <ProductArt
                    variant={c.art}
                    tone={c.tone}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 px-4 py-3.5">
                  <span className="text-[14px] font-bold text-ink">{c.label}</span>
                  <span className="text-lg">{c.emoji}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── POPULAR PRODUCTS ─────────────────────────────── */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            eyebrow="Popular right now"
            title="Loved at the counter every day"
            sub="The items our regulars order on repeat — all straight from the Charu Tender menu board."
            action={{ to: "/menu", label: "See full menu" }}
          />
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {popular.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHARU TENDER ─────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <SectionHeading
          eyebrow="Why Charu Tender"
          title="A habit worth keeping"
          sub="Four reasons Vijayanagar keeps coming back to our counter."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="rounded-3xl border border-line bg-white p-6 transition-colors hover:border-brand/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-brand">
                <w.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────── */}
      <section className="border-y border-line bg-mist">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[2rem] border border-line shadow-[0_36px_60px_-40px_rgba(22,53,45,0.6)]">
              <Scene name="shop-exterior" className="aspect-[4/3] w-full" />
            </div>
            <div className="absolute -bottom-6 right-4 hidden rounded-2xl border border-line bg-white px-5 py-4 shadow-xl sm:block">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                Since day one
              </p>
              <p className="text-sm font-semibold text-ink">One shop. One promise.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
              About Charu Tender
            </p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl">
              Freshness You Can See
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink/75">
              Charu Tender is one of the leading tender coconut suppliers in
              Karnataka. We supply tender coconut for corporate events, weddings,
              birthdays and all auspicious occasions — and press fresh sugarcane
              juice at the counter every single day.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {FRESHNESS.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-line bg-white p-4 transition-colors hover:border-brand/40"
                >
                  <p className="flex items-center gap-2 text-[15px] font-bold text-ink">
                    <Leaf className="h-4 w-4 text-brand" />
                    {f.title}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                    {f.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-6 font-semibold">
                <Link to="/about">Our story</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-line bg-white px-6 font-semibold text-ink hover:border-brand hover:text-brand"
              >
                <Link to="/gallery">See the shop</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ──────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <SectionHeading
          eyebrow="Gallery"
          title="Straight from our shop floor"
          action={{ to: "/gallery", label: "Open gallery" }}
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {PREVIEW_GALLERY.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                to="/gallery"
                className="group block overflow-hidden rounded-3xl border border-line bg-mist"
              >
                <Scene
                  name={name}
                  className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── LOCATION ─────────────────────────────────────── */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
              Find us
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              Near Sangam Circle,
              <br />
              Vijayanagar
            </h2>

            <ul className="mt-6 space-y-4 text-[15px] text-ink/75">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <span className="leading-relaxed">{BIZ.addressSingle}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <a href={BIZ.phoneHref} className="font-semibold text-ink hover:text-brand">
                  {BIZ.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <span>{BIZ.hours}</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-6 font-semibold">
                <a href={BIZ.phoneHref}>Call Now</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-line bg-white px-6 font-semibold text-ink hover:border-brand hover:text-brand"
              >
                <a href={BIZ.mapsUrl} target="_blank" rel="noreferrer">
                  Get Directions
                </a>
              </Button>
            </div>
          </div>

          <Link
            to="/contact"
            className="group relative block overflow-hidden rounded-[2rem] border border-line"
          >
            <div className="absolute inset-0 bg-mist" />
            <div className="grain absolute inset-0 opacity-70" />
            <svg viewBox="0 0 600 380" className="relative h-full w-full">
              <rect width="600" height="380" fill="none" />
              <g stroke="#DCEAE3" strokeWidth="14" fill="none">
                <path d="M-20 120 L620 90" />
                <path d="M-20 268 L620 300" />
                <path d="M140 -20 L110 400" />
                <path d="M420 -20 L450 400" />
              </g>
              <g stroke="#EFF8F3" strokeWidth="6" fill="none">
                <path d="M-20 190 L620 176" />
                <path d="M280 -20 L268 400" />
              </g>
              <g fill="#E7F1EA">
                <rect x="160" y="120" width="90" height="52" rx="8" />
                <rect x="300" y="196" width="110" height="60" rx="8" />
                <rect x="470" y="110" width="86" height="56" rx="8" />
                <rect x="30" y="210" width="70" height="46" rx="8" />
              </g>
              <g transform="translate(268 150)">
                <path
                  d="M22 0 C 10 0 0 10 0 22 C 0 38 22 62 22 62 C 22 62 44 38 44 22 C 44 10 34 0 22 0 Z"
                  fill="#087F5B"
                />
                <circle cx="22" cy="22" r="8" fill="#FFFDF5" />
              </g>
              <text
                x="316"
                y="176"
                fill="#16352D"
                fontFamily="Inter, sans-serif"
                fontSize="17"
                fontWeight="800"
              >
                Charu Tender
              </text>
            </svg>
            <span className="absolute bottom-4 right-4 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-transform group-hover:scale-105">
              View on map
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
