import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Leaf, Minus, Plus, ShieldQuestion, Snowflake, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ProductArt } from "@/components/art/ProductArt";
import { ProductCard, PriceTag } from "@/components/shop/ProductCard";
import { categoryLabel, inr, PRODUCTS, productById } from "@/lib/catalog";
import { useShop } from "@/store/shop";

export default function Product() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const product = productById(id);
  const { addToCart } = useShop();
  const [qty, setQty] = useState(1);

  const related = useMemo(
    () =>
      product
        ? PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
        : [],
    [product],
  );

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-mist text-brand">
          <Leaf className="h-9 w-9" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-ink">Item not on the menu</h1>
        <p className="mt-3 text-muted-foreground">
          This product may have been removed from the demo menu.
        </p>
        <Button asChild className="mt-7 rounded-full px-7 font-semibold">
          <Link to="/menu">Back to menu</Link>
        </Button>
      </div>
    );
  }

  const add = () => {
    addToCart(product.id, qty);
    toast.success("Added to your cart", {
      description: `${qty} × ${product.name} · ${inr(product.price * qty)}`,
      duration: 2400,
    });
    setQty(1);
  };

  return (
    <div>
      <div className="border-b border-line bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70 transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
        <div className="grid gap-9 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-[2rem] border border-line shadow-[0_36px_60px_-44px_rgba(22,53,45,0.65)]"
          >
            <ProductArt variant={product.art} tone={product.tone} className="aspect-[4/3] w-full" />
            {product.tag && (
              <span className="absolute left-5 top-5 rounded-full bg-brand px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                {product.tag === "offer" ? "Today's offer" : product.tag}
              </span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <Link
                to={`/menu?cat=${product.category}`}
                className="rounded-full border border-line bg-white px-3 py-1 text-[12px] font-semibold text-brand transition-colors hover:border-brand"
              >
                {categoryLabel(product.category)}
              </Link>
              {!product.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-honey/25 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink/70">
                  <ShieldQuestion className="h-3 w-3" />
                  demo price
                </span>
              )}
            </div>

            <h1 className="mt-4 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4">
              <PriceTag product={product} />
            </div>

            <p className="mt-5 text-[16.5px] leading-relaxed text-ink/75">{product.desc}</p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {[
                { icon: Leaf, text: "Fresh & natural" },
                { icon: Snowflake, text: "Served chilled" },
                { icon: Truck, text: "Pickup or delivery" },
                { icon: ShieldQuestion, text: "No preservatives" },
              ].map((f) => (
                <li
                  key={f.text}
                  className="flex items-center gap-2.5 rounded-2xl border border-line bg-white px-3.5 py-2.5 text-[13.5px] font-medium text-ink/75"
                >
                  <f.icon className="h-4 w-4 shrink-0 text-brand" />
                  {f.text}
                </li>
              ))}
            </ul>

            {/* quantity + add */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center justify-between gap-1 rounded-full border border-line bg-white p-1.5 sm:justify-start">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-mist disabled:opacity-35"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-10 text-center text-[17px] font-extrabold text-ink">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  aria-label="Increase quantity"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-mist"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                onClick={add}
                size="lg"
                className="flex-1 rounded-full px-8 text-[15px] font-semibold"
              >
                <Plus className="h-4 w-4" />
                Add to Cart · {inr(product.price * qty)}
              </Button>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-[13px] text-muted-foreground">
              <span>
                Subtotal for {qty} {qty === 1 ? "item" : "items"}:{" "}
                <span className="font-bold text-ink">{inr(product.price * qty)}</span>
              </span>
              <span className="hidden h-3 w-px bg-line sm:block" />
              <span>Free in-store · ₹20 delivery</span>
            </div>

            <div className="mt-7 rounded-2xl border border-line bg-mist p-4">
              <p className="text-[13px] leading-relaxed text-ink/70">
                Ordering for an event? Charu Tender supplies trimmed tender
                coconut for weddings, corporate events and birthdays.{" "}
                <Link to="/contact" className="font-semibold text-brand hover:underline">
                  Talk to us
                </Link>
                .
              </p>
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-line pt-12">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
                  You may also like
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  More from {categoryLabel(product.category)}
                </h2>
              </div>
              <Link
                to={`/menu?cat=${product.category}`}
                className="hidden text-sm font-semibold text-brand hover:underline sm:block"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
