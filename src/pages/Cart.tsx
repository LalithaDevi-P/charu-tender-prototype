import { Link, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, Store, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ProductArt } from "@/components/art/ProductArt";
import { useShop, DELIVERY_FEE } from "@/store/shop";
import { inr, productById } from "@/lib/catalog";

export default function Cart() {
  const {
    detailedLines,
    cartSubtotal,
    cartCount,
    setQty,
    removeFromCart,
    clearCart,
  } = useShop();
  const navigate = useNavigate();

  const deliveryFee = DELIVERY_FEE;
  const total = cartSubtotal + deliveryFee;

  if (detailedLines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-dashed border-line bg-white px-6 py-16"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-mist text-brand">
            <ShoppingBag className="h-9 w-9" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink">
            Your cart is empty
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Add a tender coconut or a glass of fresh sugarcane juice and it will
            show up right here.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-7 font-semibold">
              <Link to="/menu">Browse the menu</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-line bg-white px-7 font-semibold text-ink hover:border-brand hover:text-brand"
            >
              <Link to="/">Back to home</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <Link to="/" className="hover:text-brand">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-ink">Cart</span>
          </nav>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink">Your cart</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {cartCount} {cartCount === 1 ? "item" : "items"} ready to order
          </p>
        </div>

        <button
          onClick={() => {
            clearCart();
            toast("Cart cleared", { duration: 1800 });
          }}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink/70 transition-colors hover:border-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {detailedLines.map((line) => {
              const product = productById(line.id);
              return (
                <motion.div
                  key={line.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-4 overflow-hidden rounded-3xl border border-line bg-white p-3 sm:gap-5 sm:p-4"
                >
                  <Link
                    to={`/product/${line.id}`}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-line bg-mist sm:h-24 sm:w-24"
                  >
                    {product && (
                      <ProductArt
                        variant={product.art}
                        tone={product.tone}
                        className="h-full w-full"
                      />
                    )}
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/product/${line.id}`}
                      className="block truncate text-[15px] font-bold text-ink hover:text-brand sm:text-base"
                    >
                      {line.name}
                    </Link>
                    <p className="mt-0.5 text-[13px] text-muted-foreground">
                      {inr(line.price)} each
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center gap-1 rounded-full border border-line bg-mist p-1">
                        <button
                          onClick={() => setQty(line.id, line.qty - 1)}
                          aria-label={`Decrease ${line.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink transition-colors hover:text-brand"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-7 text-center text-sm font-extrabold text-ink">
                          {line.qty}
                        </span>
                        <button
                          onClick={() => setQty(line.id, line.qty + 1)}
                          aria-label={`Increase ${line.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink transition-colors hover:text-brand"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(line.id)}
                        className="text-[13px] font-semibold text-muted-foreground transition-colors hover:text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className="shrink-0 text-lg font-extrabold text-ink">
                    {inr(line.total)}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-brand hover:underline"
          >
            ← Add more items
          </Link>
        </div>

        {/* summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-line bg-white p-6 shadow-[0_2px_16px_-10px_rgba(22,53,45,0.3)]">
            <h2 className="text-lg font-extrabold tracking-tight text-ink">Order summary</h2>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-bold text-ink">{inr(cartSubtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">
                  Demo delivery fee
                  <span className="ml-1 rounded-full bg-mist px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">
                    demo
                  </span>
                </dt>
                <dd className="font-bold text-ink">{inr(deliveryFee)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-line pt-3">
                <dt className="text-[15px] font-bold text-ink">Total</dt>
                <dd className="text-xl font-extrabold text-brand">{inr(total)}</dd>
              </div>
            </dl>

            <p className="mt-3 flex items-start gap-2 rounded-2xl bg-mist p-3 text-[12.5px] leading-relaxed text-ink/70">
              <Store className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              Choose <span className="font-semibold">Pickup</span> at checkout and
              the delivery fee is waived.
            </p>

            <Button
              onClick={() => navigate("/checkout")}
              size="lg"
              className="mt-5 w-full rounded-full text-[15px] font-semibold"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </Button>

            <p className="mt-3 text-center text-[12px] text-muted-foreground">
              Prototype checkout — no real payment is processed.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
