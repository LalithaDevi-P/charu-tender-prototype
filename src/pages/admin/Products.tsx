import { useMemo, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Package, Search, ShieldQuestion, Store } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductArt } from "@/components/art/ProductArt";
import { CATEGORIES, inr, PRODUCTS, type CategoryId } from "@/lib/catalog";

export default function AdminProducts() {
  const [category, setCategory] = useState<CategoryId>("all");
  const [query, setQuery] = useState("");
  const [disabled, setDisabled] = useState<Set<string>>(new Set());

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => (category === "all" ? true : p.category === category))
      .filter((p) => (q ? p.name.toLowerCase().includes(q) : true))
      .sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  }, [category, query]);

  const toggle = (id: string, name: string) => {
    setDisabled((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.success(`${name} is back on the menu`);
      } else {
        next.add(id);
        toast(`${name} marked unavailable`, { duration: 2000 });
      }
      return next;
    });
  };

  const demoCount = PRODUCTS.filter((p) => !p.verified).length;

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:py-8">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
        Owner dashboard
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Products</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {PRODUCTS.length} items on the menu · {demoCount} prices still to be confirmed
        with the shop.
      </p>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 no-scrollbar lg:mx-0 lg:flex-wrap lg:px-0">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition-colors ${
                category === c.id
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-white text-ink/70 hover:border-brand/40 hover:text-ink"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:max-w-xs">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="h-11 rounded-full border-line bg-white pl-11 pr-4 text-[14px] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
          />
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-line bg-white px-6 py-16 text-center">
          <Package className="mx-auto h-8 w-8 text-brand" />
          <h2 className="mt-4 text-xl font-extrabold text-ink">No products found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Nothing matches “{query}”.
          </p>
          <Button
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="mt-6 rounded-full px-6 font-semibold"
          >
            Reset
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((p, i) => {
            const off = disabled.has(p.id);
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i, 8) * 0.03 }}
                className={`flex gap-4 rounded-3xl border bg-white p-4 transition-colors ${
                  off ? "border-line opacity-60" : "border-line hover:border-brand/40"
                }`}
              >
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-line bg-mist">
                  <ProductArt variant={p.art} tone={p.tone} className="h-full w-full" />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      to={`/product/${p.id}`}
                      className="truncate text-[15px] font-bold text-ink hover:text-brand"
                    >
                      {p.name}
                    </Link>
                    <span className="shrink-0 text-[15px] font-extrabold text-brand">
                      {inr(p.price)}
                    </span>
                  </div>

                  <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
                    <span className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand">
                      {CATEGORIES.find((c) => c.id === p.category)?.label}
                    </span>
                    {!p.verified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-honey/25 px-2 py-1 text-[10.5px] font-bold uppercase tracking-wider text-ink/70">
                        <ShieldQuestion className="h-3 w-3" />
                        demo price
                      </span>
                    )}

                    <button
                      onClick={() => toggle(p.id, p.name)}
                      className={`ml-auto flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] font-bold transition-colors ${
                        off
                          ? "border-line bg-white text-muted-foreground"
                          : "border-brand/30 bg-mist text-brand"
                      }`}
                    >
                      <Store className="h-3.5 w-3.5" />
                      {off ? "Unavailable" : "Available"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
