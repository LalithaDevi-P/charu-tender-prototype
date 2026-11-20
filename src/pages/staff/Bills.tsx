import { useMemo, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Receipt, Search, Store, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReceiptModal } from "@/components/staff/ReceiptModal";
import { useShop, orderDate, orderTime, PAYMENT_LABEL, type Order } from "@/store/shop";
import { inr } from "@/lib/catalog";

type Scope = "all" | "counter" | "online";

const SCOPES: { id: Scope; label: string }[] = [
  { id: "all", label: "All bills" },
  { id: "counter", label: "Counter" },
  { id: "online", label: "Online" },
];

export default function Bills() {
  const { orders } = useShop();
  const [scope, setScope] = useState<Scope>("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Order | null>(null);

  const bills = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders
      .filter((o) => (scope === "all" ? true : o.channel === scope))
      .filter((o) =>
        q
          ? o.id.toLowerCase().includes(q) ||
            o.customer.name.toLowerCase().includes(q) ||
            o.items.some((i) => i.name.toLowerCase().includes(q))
          : true,
      )
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [orders, scope, query]);

  const totalCollected = bills.reduce((s, b) => s + b.total, 0);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">Bills</h1>
          <p className="mt-1 text-[13.5px] text-muted-foreground">
            Every bill generated at the counter or from an online order.
          </p>
        </div>
        <div className="rounded-2xl bg-brand px-5 py-3 text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fresh">
            {bills.length} bills
          </p>
          <p className="text-xl font-extrabold leading-tight">{inr(totalCollected)}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
          {SCOPES.map((s) => (
            <button
              key={s.id}
              onClick={() => setScope(s.id)}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition-colors ${
                scope === s.id
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-white text-ink/70 hover:border-brand/40 hover:text-ink"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bill no, name, item…"
            className="h-11 rounded-full border-line bg-white pl-11 pr-4 text-[14px] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
          />
        </div>
      </div>

      {bills.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-line bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mist text-brand">
            <Receipt className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-xl font-extrabold text-ink">No bills found</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            {query
              ? `Nothing matches “${query}”.`
              : "Generate a bill from the POS and it will appear here."}
            <br />
            Try a different filter, or head to the POS.
          </p>
          <Button asChild className="mt-6 rounded-full px-6 font-semibold">
            <Link to="/staff/pos">Open the POS</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-3xl border border-line bg-white">
          <div className="hidden border-b border-line bg-mist px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground md:grid md:grid-cols-[1.1fr_1.3fr_1.6fr_1fr_0.8fr_0.9fr] md:gap-4">
            <span>Bill no</span>
            <span>Customer</span>
            <span>Items</span>
            <span>Date</span>
            <span>Payment</span>
            <span className="text-right">Total</span>
          </div>

          <ul className="divide-y divide-line">
            <AnimatePresence initial={false}>
              {bills.map((b) => (
                <motion.li
                  key={b.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <button
                    onClick={() => setOpen(b)}
                    className="grid w-full grid-cols-2 gap-x-4 gap-y-1 px-5 py-4 text-left transition-colors hover:bg-mist/70 md:grid-cols-[1.1fr_1.3fr_1.6fr_1fr_0.8fr_0.9fr] md:items-center"
                  >
                    <span className="flex items-center gap-2 text-[14px] font-extrabold text-ink">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${
                          b.channel === "counter" ? "bg-brand text-white" : "bg-honey text-ink"
                        }`}
                      >
                        {b.channel === "counter" ? (
                          <Store className="h-3.5 w-3.5" />
                        ) : (
                          <ShoppingBasket className="h-3.5 w-3.5" />
                        )}
                      </span>
                      {b.id}
                    </span>

                    <span className="truncate text-[14px] text-ink/75">
                      {b.customer.name}
                    </span>

                    <span className="col-span-2 truncate text-[13px] text-muted-foreground md:col-span-1">
                      {b.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}
                    </span>

                    <span className="text-[13px] text-muted-foreground">
                      {orderDate(b.createdAt)} · {orderTime(b.createdAt)}
                    </span>

                    <span className="text-[12px] font-bold uppercase text-brand">
                      {PAYMENT_LABEL[b.payment]}
                    </span>

                    <span className="text-right text-[15px] font-extrabold text-ink">
                      {inr(b.total)}
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      )}

      <AnimatePresence>
        {open && <ReceiptModal order={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  );
}
