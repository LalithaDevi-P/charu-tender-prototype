import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ClipboardList, Search, ShoppingBasket, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useShop, orderDate, orderTime, PAYMENT_LABEL, type OrderStatus } from "@/store/shop";
import { statusTone } from "@/lib/stats";
import { inr } from "@/lib/catalog";

type ChannelFilter = "all" | "online" | "counter";
type StatusFilter = "all" | OrderStatus;

const CHANNELS: { id: ChannelFilter; label: string }[] = [
  { id: "all", label: "All channels" },
  { id: "online", label: "Online orders" },
  { id: "counter", label: "Counter bills" },
];

const STATUSES: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "Any status" },
  { id: "new", label: "New" },
  { id: "preparing", label: "Preparing" },
  { id: "ready", label: "Ready" },
  { id: "completed", label: "Completed" },
  { id: "rejected", label: "Rejected" },
];

export default function AdminOrders() {
  const { orders, setOrderStatus } = useShop();
  const [channel, setChannel] = useState<ChannelFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders
      .filter((o) => (channel === "all" ? true : o.channel === channel))
      .filter((o) => (status === "all" ? true : o.status === status))
      .filter((o) =>
        q
          ? o.id.toLowerCase().includes(q) ||
            o.customer.name.toLowerCase().includes(q) ||
            o.items.some((i) => i.name.toLowerCase().includes(q))
          : true,
      )
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [orders, channel, status, query]);

  const revenue = filtered.reduce((s, o) => s + o.total, 0);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:py-8">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
        Owner dashboard
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Orders</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Every online order and counter bill, in one place.
      </p>

      {/* filters */}
      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {CHANNELS.map((c) => (
            <button
              key={c.id}
              onClick={() => setChannel(c.id)}
              className={`rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition-colors ${
                channel === c.id
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-white text-ink/70 hover:border-brand/40 hover:text-ink"
              }`}
            >
              {c.label}
            </button>
          ))}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusFilter)}
            className="rounded-full border border-line bg-white px-4 py-2.5 text-[13.5px] font-semibold text-ink/80 focus:outline-none"
          >
            {STATUSES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-full lg:max-w-xs">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order, customer, item…"
            className="h-11 rounded-full border-line bg-white pl-11 pr-4 text-[14px] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <span className="rounded-2xl bg-brand px-4 py-2.5 text-[13px] font-semibold text-white">
          {filtered.length} orders
        </span>
        <span className="rounded-2xl border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink">
          Value {inr(revenue)}
        </span>
      </div>

      {/* list */}
      {filtered.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-line bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mist text-brand">
            <ClipboardList className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-xl font-extrabold text-ink">No matching orders</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Try clearing the filters or search term.
          </p>
          <Button
            onClick={() => {
              setChannel("all");
              setStatus("all");
              setQuery("");
            }}
            className="mt-6 rounded-full px-6 font-semibold"
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          <AnimatePresence initial={false}>
            {filtered.map((o) => (
              <motion.article
                key={o.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-3xl border border-line bg-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[16px] font-extrabold text-ink">{o.id}</span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.1em] ${statusTone(o.status)}`}
                      >
                        {o.status}
                      </span>
                      <span
                        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${
                          o.channel === "counter"
                            ? "bg-mist text-brand"
                            : "bg-honey/30 text-ink/75"
                        }`}
                      >
                        {o.channel === "counter" ? (
                          <Store className="h-3 w-3" />
                        ) : (
                          <ShoppingBasket className="h-3 w-3" />
                        )}
                        {o.channel}
                      </span>
                    </div>

                    <p className="mt-1.5 text-[13.5px] text-muted-foreground">
                      <span className="font-semibold text-ink">{o.customer.name}</span>
                      {o.customer.phone !== "—" && ` · ${o.customer.phone}`}
                      <span className="mx-1.5">·</span>
                      {orderDate(o.createdAt)} {orderTime(o.createdAt)}
                    </p>

                    <ul className="mt-3 flex flex-wrap gap-2">
                      {o.items.map((i) => (
                        <li
                          key={i.id}
                          className="rounded-full bg-mist px-3 py-1.5 text-[12.5px] font-medium text-ink/75"
                        >
                          <span className="font-extrabold text-ink">{i.qty}×</span>{" "}
                          {i.name}
                        </li>
                      ))}
                    </ul>

                    {o.address && (
                      <p className="mt-2.5 text-[12.5px] text-muted-foreground">
                        <span className="font-semibold text-ink/70">Deliver to:</span>{" "}
                        {o.address}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <p className="text-[22px] font-extrabold leading-none text-brand">
                        {inr(o.total)}
                      </p>
                      <p className="mt-1 text-[12px] font-semibold uppercase text-muted-foreground">
                        {PAYMENT_LABEL[o.payment]}
                      </p>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2">
                      {o.status === "new" && (
                        <Button
                          size="sm"
                          onClick={() => setOrderStatus(o.id, "preparing")}
                          className="rounded-full font-semibold"
                        >
                          Accept
                        </Button>
                      )}
                      {o.status === "preparing" && (
                        <Button
                          size="sm"
                          onClick={() => setOrderStatus(o.id, "ready")}
                          className="rounded-full font-semibold"
                        >
                          Mark ready
                        </Button>
                      )}
                      {o.status === "ready" && (
                        <Button
                          size="sm"
                          onClick={() => setOrderStatus(o.id, "completed")}
                          className="rounded-full font-semibold"
                        >
                          Complete
                        </Button>
                      )}
                      {o.status === "completed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setOrderStatus(o.id, "preparing")}
                          className="rounded-full border-line font-semibold text-ink hover:border-brand hover:text-brand"
                        >
                          Reopen
                        </Button>
                      )}
                      {o.status === "rejected" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setOrderStatus(o.id, "new")}
                          className="rounded-full border-line font-semibold text-ink"
                        >
                          Restore
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
