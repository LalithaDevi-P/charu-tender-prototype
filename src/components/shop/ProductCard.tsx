import { Link } from "react-router";
import { motion } from "framer-motion";
import { Plus, ShieldQuestion } from "lucide-react";
import { toast } from "sonner";
import { ProductArt } from "@/components/art/ProductArt";
import { useShop } from "@/store/shop";
import { inr, type Product } from "@/lib/catalog";

export function PriceTag({ product }: { product: Product }) {
  if (product.verified) {
    return <span className="text-lg font-extrabold text-ink">{inr(product.price)}</span>;
  }
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="text-lg font-extrabold text-ink">{inr(product.price)}</span>
      <span
        className="inline-flex items-center gap-1 rounded-full bg-honey/25 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink/70"
        title="Price not legible on the menu board — prototype value"
      >
        <ShieldQuestion className="h-3 w-3" />
        demo
      </span>
    </span>
  );
}

export function AddButton({
  product,
  className = "",
  label = "Add",
}: {
  product: Product;
  className?: string;
  label?: string;
}) {
  const { addToCart } = useShop();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product.id, 1);
        toast.success("Added to your cart", {
          description: `${product.name} · ${inr(product.price)}`,
          duration: 2200,
        });
      }}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-deep active:scale-95 ${className}`}
      aria-label={`Add ${product.name} to cart`}
    >
      <Plus className="h-4 w-4" />
      {label}
    </button>
  );
}

const TAG_STYLES: Record<string, string> = {
  bestseller: "bg-brand text-white",
  offer: "bg-honey text-ink",
  new: "bg-fresh text-ink",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_2px_10px_-6px_rgba(22,53,45,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-[0_26px_44px_-26px_rgba(8,127,91,0.45)]"
    >
      <Link to={`/product/${product.id}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-mist">
          <ProductArt
            variant={product.art}
            tone={product.tone}
            className="h-full w-full transition-transform duration-500 group-hover:scale-[1.06]"
          />
          {product.tag && (
            <span
              className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
                TAG_STYLES[product.tag] ?? "bg-brand text-white"
              }`}
            >
              {product.tag === "offer" ? "Today's offer" : product.tag}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4 pb-2">
          <h3 className="text-[15px] font-bold leading-snug text-ink">
            {product.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
            {product.desc}
          </p>
        </div>
      </Link>

      <div className="flex items-center justify-between gap-3 px-4 pb-4 pt-1">
        <PriceTag product={product} />
        <AddButton product={product} />
      </div>
    </motion.div>
  );
}
