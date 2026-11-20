import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Banknote,
  CreditCard,
  Minus,
  Plus,
  QrCode,
  Search,
  ShoppingBasket,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductArt } from "@/components/art/ProductArt";
import { ReceiptModal } from "@/components/staff/ReceiptModal";
import { useShop, type Order, type PaymentMethod } from "@/store/shop";
import { CATEGORIES, inr, productById, searchProducts, type CategoryId } from "@/lib/catalog";

interface Line {
  id: string;
  qty: number;
}

const PAYMENTS: { id: PaymentMethod; label: string; icon: typeof Banknote }[] = [
  { id: "cash", label: "CASH", icon: Banknote },
  { id: "upi", label: "UPI", icon: QrCode },
  { id: "card", label: "CARD", icon: CreditCard },
];

const DISCOUNT_CHIPS = [0, 10, 20, 50];

export default function POS() {
  const { placeOrder, setOrderStatus, nextBillNumber, orders } = useShop();

  const [category, setCategory] = useState<CategoryId>("all");
  const [query, setQuery] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const [discount, setDiscount] = useState(0);
  const [payment, setPayment] = useState<PaymentMethod>("cash");
  const [customer, setCustomer] = useState("Counter Walk-in");
  const [receipt, setReceipt] = useState<Order | null>(null);

  const products = useMemo(
    () => searchProducts(query, category),
    [query, category],
  );

  const detailed = useMemo(
    () =>
      lines.flatMap((l) => {
        const p = productById(l.id);
        return p ? [{ ...l, name: p.name, price: p.price, total: p.price * l.qty }] : [];
      }),
    [lines],
  );

  const subtotal = detailed.reduce((s, l) => s + l.total, 0);
  const appliedDiscount = Math.min(discount, subtotal);
  const total = subtotal - appliedDiscount;
  const itemCount = lines.reduce((s, l) => s + l.qty, 0);

  const counterToday = orders.filter((o) => o.channel === "counter").length;

  const add = (id: string) => {
    setLines((ls) => {
      const found = ls.find((l) => l.id === id);
      return found
        ? ls.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
        : [...ls, { id, qty: 1 }];
    });
  };

  const bump = (id: string, delta: number) =>
    setLines((ls) =>
      ls
        .map((l) => (l.id === id ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    );

  const remove = (id: string) => setLines((ls) => ls.filter((l) => l.id !== id));

  const reset = () => {
    setLines([]);
    setDiscount(0);
    setPayment("cash");
    setCustomer("Counter Walk-in");
  };

  const generateBill = () => {
    if (lines.length === 0) {
      toast.error("Add at least one item to the bill");
      return;
    }

    const order = placeOrder({
      customer: { name: customer.trim() || "Counter Walk-in", phone: "—" },
      type: "pickup",
      payment,
      items: detailed.map((l) => ({
        id: l.id,
        name: l.name,
        price: l.price,
        qty: l.qty,
      })),
      subtotal,
      discount: appliedDiscount,
      deliveryFee: 0,
      total,
      channel: "counter",
    });
    setOrderStatus(order.id, "completed");

    toast.success("Bill generated", {
      description: `${order.id} · ${inr(total)} · ${payment.toUpperCase()}`,
      duration: 2600,
    });
    setReceipt(order);
  };

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6">
      <div className="grid gap-5 lg:grid-cols-[1fr_390px] xl:gap-6">
        {/* ── LEFT: catalogue ── */}
        <section>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-ink">
                Counter POS
              </h1>
              <p className="mt-1 text-[13.5px] text-muted-foreground">
                Tap an item to add it to the current bill ·{" "}
                <span className="font-semibold text-ink">{nextBillNumber}</span> is
                the next bill number
              </p>
            </div>
            <span className="rounded-full bg-mist px-3 py-1.5 text-[12px] font-bold text-brand">
              {counterToday} counter bills today
            </span>
          </div>

          <div className="relative mt-4">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Quick search — tender, cane, shake, papaya…"
              className="h-12 rounded-full border-line bg-white pl-11 pr-4 text-[15px] shadow-sm focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
            />
          </div>

          <div className="mt-4 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 no-scrollbar">
            {CATEGORIES.map((c) => {
              const active = c.id === category;
              return (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`relative shrink-0 rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition-colors ${
                    active
                      ? "border-brand text-white"
                      : "border-line bg-white text-ink/70 hover:border-brand/40 hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="pos-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-brand"
                    />
                  )}
                  <span className="relative z-10">{c.label}</span>
                </button>
              );
            })}
          </div>

          {products.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-line bg-white px-6 py-14 text-center">
              <Search className="mx-auto h-8 w-8 text-brand" />
              <p className="mt-4 text-lg font-bold text-ink">No products found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Nothing matches “{query}” in this category.
              </p>
              <Button
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
                className="mt-5 rounded-full px-6 font-semibold"
              >
                Reset filters
              </Button>
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {products.map((p) => {
                const inBill = lines.find((l) => l.id === p.id)?.qty ?? 0;
                return (
                  <motion.button
                    key={p.id}
                    onClick={() => add(p.id)}
                    whileTap={{ scale: 0.97 }}
                    className={`relative overflow-hidden rounded-2xl border bg-white text-left transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_28px_-20px_rgba(8,127,91,0.7)] ${
                      inBill > 0
                        ? "border-brand shadow-[0_0_0_3px_rgba(8,127,91,0.12)]"
                        : "border-line hover:border-brand/40"
                    }`}
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-mist">
                      <ProductArt
                        variant={p.art}
                        tone={p.tone}
                        className="h-full w-full"
                      />
                    </div>
                    <div className="p-3">
                      <p className="line-clamp-2 min-h-[34px] text-[13.5px] font-bold leading-snug text-ink">
                        {p.name}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[15px] font-extrabold text-brand">
                          {inr(p.price)}
                        </span>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mist text-brand">
                          <Plus className="h-4 w-4" />
                        </span>
                      </div>
                    </div>

                    {inBill > 0 && (
                      <span className="absolute right-2 top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-brand px-1.5 text-[11px] font-extrabold text-white">
                        {inBill}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          )}
        </section>

        {/* ── RIGHT: current bill ── */}
        <aside className="lg:sticky lg:top-[84px] lg:self-start">
          <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_2px_18px_-12px_rgba(22,53,45,0.4)]">
            {/* head */}
            <div className="flex items-center justify-between gap-3 bg-brand px-5 py-4 text-white">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-fresh">
                  Current bill
                </p>
                <p className="mt-0.5 text-lg font-extrabold tracking-tight">
                  {nextBillNumber}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-honey" />
                <span className="text-sm font-bold">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
              </div>
            </div>

            <div className="border-b border-line px-5 py-3">
              <div className="flex items-center gap-2 rounded-full bg-mist px-3">
                <User className="h-4 w-4 shrink-0 text-brand" />
                <input
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="Customer name"
                  className="h-10 w-full bg-transparent text-[14px] text-ink placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </div>

            {/* lines */}
            <div className="max-h-[38vh] min-h-[150px] overflow-y-auto px-5 py-3 thin-scrollbar">
              {detailed.length === 0 ? (
                <div className="flex h-full min-h-[150px] flex-col items-center justify-center py-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-mist text-brand">
                    <ShoppingBasket className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-[15px] font-bold text-ink">Bill is empty</p>
                  <p className="mt-1 max-w-[220px] text-[13px] leading-relaxed text-muted-foreground">
                    Tap any product on the left to start a new counter bill.
                  </p>
                </div>
              ) : (
                <ul className="space-y-2.5">
                  <AnimatePresence initial={false}>
                    {detailed.map((l) => (
                      <motion.li
                        key={l.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-2xl border border-line bg-mist/60 p-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="min-w-0 flex-1 text-[13.5px] font-bold leading-snug text-ink">
                            {l.name}
                          </p>
                          <p className="shrink-0 text-[14px] font-extrabold text-ink">
                            {inr(l.total)}
                          </p>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-full border border-line bg-white p-1">
                            <button
                              onClick={() => bump(l.id, -1)}
                              aria-label={`Decrease ${l.name}`}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-ink transition-colors hover:bg-mist hover:text-brand"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-6 text-center text-[13px] font-extrabold text-ink">
                              {l.qty}
                            </span>
                            <button
                              onClick={() => bump(l.id, 1)}
                              aria-label={`Increase ${l.name}`}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-ink transition-colors hover:bg-mist hover:text-brand"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-[12px] text-muted-foreground">
                              {inr(l.price)} each
                            </span>
                            <button
                              onClick={() => remove(l.id)}
                              aria-label={`Remove ${l.name}`}
                              className="text-muted-foreground transition-colors hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* totals */}
            <div className="border-t border-line px-5 py-4">
              <div className="mb-3">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Discount
                </p>
                <div className="flex gap-2">
                  {DISCOUNT_CHIPS.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDiscount(d)}
                      className={`flex-1 rounded-xl border py-2 text-[13px] font-bold transition-colors ${
                        discount === d
                          ? "border-brand bg-brand text-white"
                          : "border-line bg-white text-ink/70 hover:border-brand/40"
                      }`}
                    >
                      {d === 0 ? "None" : `₹${d}`}
                    </button>
                  ))}
                </div>
              </div>

              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-bold text-ink">{inr(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Discount</dt>
                  <dd className="font-bold text-ink">− {inr(appliedDiscount)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-line pt-2.5">
                  <dt className="text-[15px] font-extrabold text-ink">TOTAL</dt>
                  <dd className="text-2xl font-extrabold text-brand">{inr(total)}</dd>
                </div>
              </dl>

              {/* payment */}
              <p className="mb-2 mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Payment method
              </p>
              <div className="grid grid-cols-3 gap-2">
                {PAYMENTS.map((m) => {
                  const active = payment === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setPayment(m.id)}
                      className={`flex flex-col items-center gap-1.5 rounded-2xl border py-3 text-[12.5px] font-extrabold tracking-wide transition-all ${
                        active
                          ? "border-brand bg-mist text-brand"
                          : "border-line bg-white text-ink/60 hover:border-brand/40"
                      }`}
                    >
                      <m.icon className="h-5 w-5" />
                      {m.label}
                    </button>
                  );
                })}
              </div>

              <Button
                onClick={generateBill}
                size="lg"
                disabled={lines.length === 0}
                className="mt-4 w-full rounded-full text-[15px] font-extrabold tracking-wide disabled:opacity-45"
              >
                GENERATE BILL
              </Button>

              {lines.length > 0 && (
                <button
                  onClick={reset}
                  className="mt-2.5 w-full text-center text-[13px] font-semibold text-muted-foreground transition-colors hover:text-destructive"
                >
                  Discard bill
                </button>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* receipt */}
      <AnimatePresence>
        {receipt && (
          <ReceiptModal
            order={receipt}
            onClose={() => setReceipt(null)}
            onNewBill={reset}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
