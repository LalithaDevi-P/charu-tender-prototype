import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Award,
  CalendarHeart,
  Clock,
  Droplet,
  Leaf,
  PackageCheck,
  PartyPopper,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Scene } from "@/components/art/scenes";
import { BIZ } from "@/lib/demo";

const PILLARS = [
  {
    icon: Leaf,
    title: "Fresh & Natural",
    text: "No syrups, no concentrates, no stored batches. Fruit is bought in the morning and everything is prepared through the day.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    text: "Tender coconut is procured directly from plantations and trimmed at the counter — never pre-cut and left waiting.",
  },
  {
    icon: PackageCheck,
    title: "Event Supply",
    text: "Trimmed tender coconut supplied in quantity for weddings, corporate events, birthdays and auspicious occasions.",
  },
  {
    icon: Sparkles,
    title: "Made Fresh",
    text: "Sugarcane is pressed and juices are blended the moment you order, so the glass in your hand is seconds old.",
  },
];

const BENEFITS = [
  {
    icon: Droplet,
    title: "Naturally hydrating",
    text: "A light, natural way to replace the fluids you lose through the day.",
  },
  {
    icon: Leaf,
    title: "Source of electrolytes",
    text: "Replenishes lost nutrients without any added colours or flavourings.",
  },
  {
    icon: Clock,
    title: "Light and easy",
    text: "Gentle on the stomach — a popular choice after a long, hot afternoon.",
  },
  {
    icon: Sparkles,
    title: "A smarter swap",
    text: "A low-calorie, fat-free alternative to sugary soft drinks.",
  },
];

const OCCASIONS = [
  { icon: CalendarHeart, label: "Weddings" },
  { icon: PartyPopper, label: "Corporate events" },
  { icon: Sparkles, label: "Birthdays" },
  { icon: Leaf, label: "Auspicious occasions" },
];

export default function About() {
  return (
    <div>
      {/* hero */}
      <section className="border-b border-line bg-mist">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <nav className="flex items-center gap-2 text-[13px] text-muted-foreground">
              <Link to="/" className="hover:text-brand">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-ink">About</span>
            </nav>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-brand">
              About Charu Tender
            </p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Freshness You Can See
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink/75">
              Charu Tender is one of the leading tender coconut suppliers in
              Karnataka. We supply tender coconut for corporate events, weddings,
              birthdays and all auspicious occasions — and every day we press
              fresh sugarcane juice and cut fresh fruit right here at Sangam
              Circle.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-7 font-semibold">
                <Link to="/menu">Order now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-line bg-white px-7 font-semibold text-ink hover:border-brand hover:text-brand"
              >
                <a href={BIZ.phoneHref}>Talk to us</a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="overflow-hidden rounded-[2rem] border border-line shadow-[0_36px_60px_-40px_rgba(22,53,45,0.6)]"
          >
            <Scene name="shop-exterior" className="aspect-[4/3] w-full" />
          </motion.div>
        </div>
      </section>

      {/* pillars */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
            What we stand for
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            Four things we never compromise on
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="rounded-3xl border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_40px_-30px_rgba(8,127,91,0.6)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-brand">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* benefit wall */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1fr] lg:py-24">
          <div className="overflow-hidden rounded-[2rem] border border-line shadow-[0_36px_60px_-44px_rgba(22,53,45,0.6)]">
            <Scene name="benefit-wall" className="aspect-[3/4] w-full" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
              Why tender coconut
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              Simple, honest, good for you
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink/75">
              Tender coconut is simply one of the most natural refreshments
              there is — water, pulp, nothing else. Here is why our customers
              keep coming back for it.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {BENEFITS.map((b) => (
                <div key={b.title} className="rounded-2xl border border-line bg-mist p-4">
                  <p className="flex items-center gap-2 text-[15px] font-bold text-ink">
                    <b.icon className="h-4 w-4 text-brand" />
                    {b.title}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                    {b.text}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-[13px] leading-relaxed text-muted-foreground">
              Charu Tender procures fresh and premium quality tender coconut
              directly from plantations and provides top quality trimmed tender
              coconut in large quantity.
            </p>
          </div>
        </div>
      </section>

      {/* event supply */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
              Event supply
            </p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              Trimmed tender coconut, delivered in quantity
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink/75">
              Planning something special? We supply fresh, premium quality
              trimmed tender coconut in large quantities — packed, labelled and
              delivered ready to serve.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {OCCASIONS.map((o) => (
                <div
                  key={o.label}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mist text-brand">
                    <o.icon className="h-4 w-4" />
                  </span>
                  <span className="text-[14px] font-semibold text-ink">{o.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-7 font-semibold">
                <a href={BIZ.phoneHref}>Request a quote</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-line bg-white px-7 font-semibold text-ink hover:border-brand hover:text-brand"
              >
                <Link to="/contact">Visit the shop</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-3xl border border-line">
              <Scene name="counter" className="aspect-[4/5] w-full" />
            </div>
            <div className="mt-8 space-y-4">
              <div className="overflow-hidden rounded-3xl border border-line">
                <Scene name="shake-table" className="aspect-square w-full" />
              </div>
              <div className="rounded-3xl border border-line bg-brand p-5 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-fresh">
                  Since day one
                </p>
                <p className="mt-2 text-2xl font-extrabold leading-tight">
                  Fresh • Natural • Healthy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
