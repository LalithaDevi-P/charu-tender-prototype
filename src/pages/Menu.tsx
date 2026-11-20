import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, Search, ShieldQuestion, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/shop/ProductCard";
import { MenuBoard } from "@/components/art/scenes";
import { CATEGORIES, searchProducts, type CategoryId } from "@/lib/catalog";

function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white">
      <Skeleton className="aspect-[4/3] w-full rounded-none bg-mist" />
      <div className="space-y-2.5 p-4">
        <Skeleton className="h-4 w-3/4 bg-mist" />
        <Skeleton className="h-3 w-full bg-mist" />
        <Skeleton className="h-3 w-2/3 bg-mist" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-5 w-16 bg-mist" />
          <Skeleton className="h-8 w-20 rounded-full bg-mist" />
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  const [params, setParams] = useSearchParams();
  const rawCat = (params.get("cat") ?? "all") as CategoryId;
  const category: CategoryId = CATEGORIES.some((c) => c.id === rawCat) ? rawCat : "all";
  const query = params.get("q") ?? "";

  const [localQuery, setLocalQuery] = useState(query);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 420);
    return () => window.clearTimeout(t);
  }, []);

  const setCat = (id: CategoryId) => {
    const next = new URLSearchParams(params);
    if (id === "all") next.delete("cat");
    else next.set("cat", id);
    setParams(next, { replace: true });
  };

  const runSearch = (value: string) => {
    setLocalQuery(value);
    const next = new URLSearchParams(params);
    if (value) next.set("q", value);
    else next.delete("q");
    setParams(next, { replace: true });
  };

  const results = useMemo(
    () => searchProducts(localQuery, category),
    [localQuery, category],
  );

  return (
    <div>
      {/* header */}
      <section className="border-b border-line bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <nav className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <Link to="/" className="hover:text-brand">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-ink">Menu</span>
          </nav>

          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
                The full menu
              </p>
              <h1 className="mt-3 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
                Everything on our board
              </h1>
              <p className="mt-4 flex flex-wrap items-center gap-2 text-[15px] text-ink/70">
                <span>Prices read from the Charu Tender menu board.</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-honey/25 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-ink/70">
                  <ShieldQuestion className="h-3 w-3" />
                  demo badge = prototype price
                </span>
              </p>
            </div>

            <div className="relative w-full lg:max-w-sm">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand" />
              <Input
                value={localQuery}
                onChange={(e) => runSearch(e.target.value)}
                placeholder="Search tender, cane, juice, papaya…"
                className="h-12 rounded-full border-line bg-white pl-11 pr-11 text-[15px] shadow-sm focus-visible:ring-brand"
              />
              {localQuery && (
                <button
                  onClick={() => runSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-mist text-ink/60 hover:text-brand"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* category chips */}
          <div className="mt-8 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 no-scrollbar">
            {CATEGORIES.map((c) => {
              const active = c.id === category;
              return (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  className={`relative shrink-0 rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition-colors ${
                    active
                      ? "border-brand text-white"
                      : "border-line bg-white text-ink/70 hover:border-brand/40 hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="cat-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-brand"
                    />
                  )}
                  <span className="relative z-10">{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* results */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {loading ? (
              "Loading products…"
            ) : (
              <>
                <span className="font-bold text-ink">{results.length}</span>{" "}
                {results.length === 1 ? "item" : "items"}
                {category !== "all" &&
                  ` in ${CATEGORIES.find((c) => c.id === category)?.label}`}
                {localQuery && ` for “${localQuery}”`}
              </>
            )}
          </p>
          {results.length > 0 && (
            <Link
              to="/menu"
              onClick={() => runSearch("")}
              className="hidden items-center gap-1.5 text-sm font-semibold text-brand hover:underline sm:flex"
            >
              <LayoutGrid className="h-4 w-4" />
              Reset filters
            </Link>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : results.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-dashed border-line bg-white px-6 py-16 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mist text-brand">
              <Search className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-ink">
              Nothing matched that search
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              We couldn&apos;t find anything for{" "}
              <span className="font-semibold text-ink">“{localQuery}”</span> in
              this category. Try a different word, or browse the whole menu.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => {
                  runSearch("");
                  setCat("all");
                }}
                className="rounded-full px-6 font-semibold"
              >
                Show everything
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-line bg-white px-6 font-semibold text-ink"
              >
                <Link to="/contact">Ask the shop</Link>
              </Button>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`${category}-${localQuery}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
            >
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      {/* menu board showcase */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:py-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
              Source of truth
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              The board above our counter
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink/75">
              Every price in this menu comes from the green Charu Tender board
              mounted in the shop. A handful of parcels and combos had prices we
              couldn&apos;t read clearly in the photograph — those are marked
              with a <span className="font-semibold text-ink">demo</span> badge
              so we can confirm them with you.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-line bg-mist p-4">
                <p className="text-2xl font-extrabold text-brand">20</p>
                <p className="text-[13px] font-medium text-ink/70">Sugarcane medium</p>
              </div>
              <div className="rounded-2xl border border-line bg-mist p-4">
                <p className="text-2xl font-extrabold text-brand">50</p>
                <p className="text-[13px] font-medium text-ink/70">Tender coconut round</p>
              </div>
              <div className="rounded-2xl border border-line bg-mist p-4">
                <p className="text-2xl font-extrabold text-brand">70</p>
                <p className="text-[13px] font-medium text-ink/70">Coconut shake 250ml</p>
              </div>
            </div>

            <Button asChild className="mt-8 rounded-full px-7 font-semibold">
              <Link to="/cart">Review your cart</Link>
            </Button>
          </div>

          <div className="mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-3xl border border-line shadow-[0_36px_60px_-40px_rgba(22,53,45,0.6)]">
              <MenuBoard className="w-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
