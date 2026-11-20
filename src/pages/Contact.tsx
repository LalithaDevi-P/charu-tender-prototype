import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Clock, MapPin, MessageSquare, Navigation, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BrandLockup } from "@/components/brand/Logo";
import { BIZ } from "@/lib/demo";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2 || message.trim().length < 5) {
      toast.error("Please add your name and a short message");
      return;
    }
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setName("");
      setPhone("");
      setMessage("");
      toast.success("Enquiry sent", {
        description: "This is a demo — the shop would reply on WhatsApp.",
        duration: 3000,
      });
    }, 700);
  };

  return (
    <div>
      <section className="border-b border-line bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <nav className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <Link to="/" className="hover:text-brand">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-ink">Contact</span>
          </nav>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-brand">
            Contact &amp; location
          </p>
          <h1 className="mt-3 max-w-2xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Come say hello
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink/75">
            We&apos;re right by Sangam Circle in Vijayanagar — walk in for a
            fresh coconut, or call us for event supply.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-7 font-semibold">
              <a href={BIZ.phoneHref}>
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-line bg-white px-7 font-semibold text-ink hover:border-brand hover:text-brand"
            >
              <a href={BIZ.mapsUrl} target="_blank" rel="noreferrer">
                <Navigation className="h-4 w-4" />
                Get Directions
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: MapPin,
              title: "Address",
              lines: BIZ.addressLines,
              action: {
                href: BIZ.mapsUrl,
                label: "Open in Google Maps",
              },
            },
            {
              icon: Phone,
              title: "Phone",
              lines: [BIZ.phoneDisplay, "Call for orders & event supply"],
              action: { href: BIZ.phoneHref, label: "Call the shop" },
            },
            {
              icon: Clock,
              title: "Opening hours",
              lines: ["Open daily", "8:00 AM – 10:00 PM", "Closed on public holidays"],
              action: null,
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              className="flex flex-col rounded-3xl border border-line bg-white p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-brand">
                <card.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-lg font-bold text-ink">{card.title}</h2>
              <div className="mt-2 flex-1 space-y-1 text-[14.5px] leading-relaxed text-ink/70">
                {card.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              {card.action && (
                <a
                  href={card.action.href}
                  target={card.action.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
                >
                  {card.action.label} →
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* map + form */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl border border-line bg-mist"
          >
            <div className="relative">
              <div className="grain absolute inset-0 opacity-70" />
              <svg viewBox="0 0 760 460" className="relative h-full w-full">
                <rect width="760" height="460" fill="#F3F8F4" />
                <g stroke="#DCEAE3" strokeWidth="20" fill="none">
                  <path d="M-30 150 L790 110" />
                  <path d="M-30 330 L790 370" />
                  <path d="M180 -30 L140 490" />
                  <path d="M540 -30 L580 490" />
                </g>
                <g stroke="#E7F2EB" strokeWidth="8" fill="none">
                  <path d="M-30 240 L790 224" />
                  <path d="M360 -30 L348 490" />
                  <path d="M660 -30 L680 490" />
                </g>
                <g fill="#E4F0E8">
                  <rect x="210" y="160" width="120" height="66" rx="10" />
                  <rect x="386" y="248" width="140" height="70" rx="10" />
                  <rect x="590" y="150" width="110" height="64" rx="10" />
                  <rect x="40" y="262" width="88" height="58" rx="10" />
                  <rect x="210" y="342" width="120" height="56" rx="10" />
                  <rect x="592" y="300" width="106" height="60" rx="10" />
                </g>
                <g fill="#DCEAE3">
                  <path d="M690 40 L760 40 L760 110 L690 110 Z" />
                  <path d="M30 40 L110 40 L110 100 L30 100 Z" />
                </g>

                {/* marker */}
                <g transform="translate(340 190)">
                  <ellipse cx="26" cy="72" rx="26" ry="8" fill="#16352D" opacity="0.18" />
                  <path
                    d="M26 0 C 11 0 0 11 0 26 C 0 46 26 74 26 74 C 26 74 52 46 52 26 C 52 11 41 0 26 0 Z"
                    fill="#087F5B"
                  />
                  <circle cx="26" cy="26" r="10" fill="#FFFDF5" />
                </g>
                <rect x="404" y="206" width="176" height="52" rx="12" fill="#FFFFFF" />
                <rect x="404" y="206" width="176" height="52" rx="12" fill="none" stroke="#DCEAE3" strokeWidth="3" />
                <text
                  x="422"
                  y="228"
                  fill="#16352D"
                  fontFamily="Inter, sans-serif"
                  fontSize="17"
                  fontWeight="800"
                >
                  CHARU TENDER
                </text>
                <text
                  x="422"
                  y="248"
                  fill="#5A7A6F"
                  fontFamily="Inter, sans-serif"
                  fontSize="14"
                  fontWeight="500"
                >
                  Sangam Circle, Vijayanagar
                </text>

                <text
                  x="60"
                  y="96"
                  fill="#9BB3A8"
                  fontFamily="Inter, sans-serif"
                  fontSize="17"
                  fontWeight="700"
                  letterSpacing="2"
                >
                  3RD STAGE
                </text>
                <text
                  x="600"
                  y="430"
                  fill="#9BB3A8"
                  fontFamily="Inter, sans-serif"
                  fontSize="17"
                  fontWeight="700"
                  letterSpacing="2"
                >
                  HUTAGALLI
                </text>
                <text
                  x="196"
                  y="140"
                  fill="#9BB3A8"
                  fontFamily="Inter, sans-serif"
                  fontSize="15"
                  fontWeight="700"
                  letterSpacing="2"
                >
                  SANGAM CIRCLE RD
                </text>
              </svg>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-white px-5 py-4">
              <div className="flex items-center gap-3">
                <BrandLockup size={34} compact />
                <p className="text-[13px] leading-snug text-muted-foreground">
                  {BIZ.addressSingle}
                </p>
              </div>
              <a
                href={BIZ.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
              >
                Directions
              </a>
            </div>
          </motion.div>

          {/* enquiry */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-line bg-white p-6 sm:p-7"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-brand">
              <MessageSquare className="h-5 w-5" />
            </span>
            <h2 className="mt-5 text-xl font-extrabold tracking-tight text-ink">
              Send an enquiry
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Bulk coconut for an event, a catering question, or just to check
              today&apos;s stock.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <Label htmlFor="c-name" className="text-[13px] font-semibold text-ink/80">
                  Name
                </Label>
                <Input
                  id="c-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="mt-2 h-12 rounded-2xl border border-line bg-mist px-4 text-[15px] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                />
              </div>
              <div>
                <Label htmlFor="c-phone" className="text-[13px] font-semibold text-ink/80">
                  Phone
                </Label>
                <Input
                  id="c-phone"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98450 12345"
                  className="mt-2 h-12 rounded-2xl border border-line bg-mist px-4 text-[15px] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                />
              </div>
              <div>
                <Label htmlFor="c-msg" className="text-[13px] font-semibold text-ink/80">
                  Message
                </Label>
                <Textarea
                  id="c-msg"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="We need 200 trimmed tender coconuts for a wedding on Sunday…"
                  className="mt-2 min-h-[110px] resize-none rounded-2xl border border-line bg-mist px-4 py-3 text-[15px] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={sending}
              className="mt-5 w-full rounded-full text-[15px] font-semibold"
            >
              {sending ? "Sending…" : "Send enquiry"}
              {!sending && <Send className="h-4 w-4" />}
            </Button>

            <p className="mt-3 text-center text-[12px] text-muted-foreground">
              Demo form — nothing is actually sent.
            </p>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
