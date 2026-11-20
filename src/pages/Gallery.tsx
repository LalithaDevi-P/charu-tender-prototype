import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Scene } from "@/components/art/scenes";
import { GALLERY } from "@/lib/demo";

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % GALLERY.length)),
    [],
  );
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length)),
    [],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, next, prev]);

  const current = index === null ? null : GALLERY[index];

  return (
    <div>
      <section className="border-b border-line bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <nav className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <Link to="/" className="hover:text-brand">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-ink">Gallery</span>
          </nav>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-brand">
            Gallery
          </p>
          <h1 className="mt-3 max-w-2xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            The real Charu Tender shop
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink/75">
            The frontage, the counter, the board and the fruit — tap any image to
            see it full screen.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {GALLERY.map((item, i) => (
            <motion.button
              key={item.src}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              onClick={() => setIndex(i)}
              className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-3xl border border-line bg-mist text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_28px_46px_-30px_rgba(8,127,91,0.55)]"
            >
              <Scene
                name={item.src}
                className={`w-full ${i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-[4/3]" : "aspect-square"}`}
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/35 to-transparent p-4 pt-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="block text-[15px] font-bold text-white">
                  {item.title}
                </span>
                <span className="mt-0.5 block text-[12.5px] leading-snug text-white/80">
                  {item.caption}
                </span>
              </span>
              <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Expand className="h-4 w-4" />
              </span>
            </motion.button>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-dashed border-line bg-white px-6 py-10 text-center">
          <h2 className="text-xl font-extrabold text-ink">Want to see it in person?</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
            The shop is open daily at Sangam Circle, Vijayanagar. Fresh coconut,
            cold juice and a seat if you want to stay.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-full px-6 font-semibold">
              <Link to="/contact">Get directions</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-line bg-white px-6 font-semibold text-ink hover:border-brand hover:text-brand"
            >
              <Link to="/menu">See the menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 sm:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 sm:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.figure
              key={current.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              <div className="overflow-hidden rounded-3xl border border-white/15 bg-ink">
                <Scene name={current.src} className="max-h-[72vh] w-full" />
              </div>
              <figcaption className="mt-4 text-center">
                <p className="text-lg font-bold text-white">{current.title}</p>
                <p className="mt-1 text-sm text-white/70">{current.caption}</p>
                <p className="mt-2 text-[12px] uppercase tracking-[0.2em] text-white/45">
                  {(index ?? 0) + 1} / {GALLERY.length}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
