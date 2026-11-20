import { useMemo, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bike,
  CheckCircle2,
  ChefHat,
  Clock,
  PackageCheck,
  Phone,
  ShoppingBasket,
  Store,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useShop, orderTime, PAYMENT_LABEL, type OrderStatus } from "@/store/shop";
import { inr } from "@/lib/catalog";

type Filter = "active" | "new" | "preparing" | "ready" | "completed" | "all";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "active", label: "Active" },
  { id: "new", label: "New" },
  { id: "preparing", label: "Preparing" },
  { id: "ready", label: "Ready" },
  { id: "completed", label: "Completed" },
  { id: "all", label: "All" },
];

const STATUS_STYLE: Record<OrderStatus, string> = {
  new: "bg-honey text-ink",
  preparing: "bg-brand text-white",
  ready: "bg-fresh text-ink",
  completed: "bg-mist text-brand",
  rejected: "bg-destructive/15 text-destructive",
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  new: "NEW",
  preparing: "PREPARING",
  ready: "READY",
  completed: "COMPLETED",
  rejected: "REJECTED",
};

export default function OnlineOrders() {
  const { orders, setOrderStatus } = useShop();
  const [filter, setFilter] = useState<Filter>("active");

  const online = useMemo(
    () =>
      orders
        .filter((o) => o.channel === "online")
        .sort((a, b) => b.createdAt - a.createdAt),
    [orders],
  );

  const counts = useMemo(
    () => ({
      new: online.filter((o) => o.status === "new").length,
      preparing: online.filter((o) => o.status === "preparing").length,
      ready: online.filter((o) => o.status === "ready").length,
    }),
    [online],
  );

  const visible = useMemo(() => {
    if (filter === "all") return online;
    if (filter === "active")
      return online.filter((o) => ["new", "preparing", "ready"].includes(o.status));
    return online.filter((o) => o.status === filter);
  }, [online, filter]);

  const advance = (id: string, status: OrderStatus, label: string) => {
    setOrderStatus(id, status);
    toast.success(label, { duration: 2000 });
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">
            Online Orders
          </h1>
          <p className="mt-1 text-[13.5px] text-muted-foreground">
            Orders placed from the customer website land here in real time.
          </p>
        </div>

        <div className="flex gap-2">
          {[
            { label: "New", value: counts.new, tone: "bg-honey text-ink" },
            { label: "Preparing", value: counts.preparing, tone: "bg-brand text-white" },
            { label: "Ready", value: counts.ready, tone: "bg-fresh text-ink" },
          ].map((s) => (
            <div
              key={s.label}
              className={`rounded-2xl px-4 py-2.5 text-center ${s.tone}`}
            >
              <p className="text-xl font-extrabold leading-none">{s.value}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* filters */}
      <div className="mt-5 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 no-scrollbar">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition-colors ${
                active
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-white text-ink/70 hover:border-brand/40 hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* board */}
      {visible.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-3xl border border-dashed border-line bg-white px-6 py-16 text-center"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mist text-brand">
            <ShoppingBasket className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-xl font-extrabold text-ink">No orders here</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            {filter === "active"
              ? "All active orders have been handled. New orders from the website will appear here instantly."
              : `There are no orders with the “${FILTERS.find((f) => f.id === filter)?.label}” status right now.`}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-full px-6 font-semibold">
              <Link to="/menu">Place a demo order</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-line bg-white px-6 font-semibold text-ink hover:border-brand hover:text-brand"
            >
              <Link to="/staff/pos">Open the POS</Link>
            </Button>
          </div>
        </motion.div>
      ) : (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <AnimatePresence initial={false}>
            {visible.map((o) => (
              <motion.article
                key={o.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.24 }}
                className="flex flex-col rounded-3xl border border-line bg-white p-5 shadow-[0_2px_14px_-12px_rgba(22,53,45,0.4)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-extrabold tracking-tight text-ink">
                        #{o.id}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10.5px] font-extrabold tracking-[0.1em] ${STATUS_STYLE[o.status]}`}
                      >
                        {STATUS_LABEL[o.status]}
                      </span>
                    </div>
                    <p className="mt-1.5 flex items-center gap-2 text-[13.5px] text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 text-brand" />
                      {orderTime(o.createdAt)}
                      <span className="h-3 w-px bg-line" />
                      <span className="font-semibold text-ink">{o.customer.name}</span>
                    </p>
                  </div>

                  <span className="flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5 text-[12px] font-bold text-brand">
                    {o.type === "delivery" ? (
                      <>
                        <Bike className="h-3.5 w-3.5" />
                        Delivery
                      </>
                    ) : (
                      <>
                        <Store className="h-3.5 w-3.5" />
                        Pickup
                      </>
                    )}
                  </span>
                </div>

                <ul className="mt-4 space-y-1.5 border-t border-line pt-3.5">
                  {o.items.map((i) => (
                    <li
                      key={i.id}
                      className="flex items-center justify-between gap-3 text-[14px]"
                    >
                      <span className="text-ink/80">
                        <span className="font-extrabold text-ink">{i.qty} ×</span>{" "}
                        {i.name}
                      </span>
                      <span className="shrink-0 font-semibold text-ink/70">
                        {inr(i.price * i.qty)}
                      </span>
                    </li>
                  ))}
                </ul>

                {o.note && (
                  <p className="mt-3 rounded-xl bg-honey/20 px-3 py-2 text-[12.5px] font-medium text-ink/75">
                    📝 {o.note}
                  </p>
                )}

                {o.address && (
                  <p className="mt-3 text-[12.5px] leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-ink/70">Deliver to:</span>{" "}
                    {o.address}
                    {o.landmark && ` · ${o.landmark}`}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3.5">
                  <div className="flex items-center gap-3 text-[13px] text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-brand" />
                      {o.customer.phone}
                    </span>
                    <span className="rounded-full bg-mist px-2 py-0.5 text-[11px] font-bold uppercase text-brand">
                      {PAYMENT_LABEL[o.payment]}
                    </span>
                  </div>
                  <span className="text-lg font-extrabold text-brand">
                    {inr(o.total)}
                  </span>
                </div>

                {/* actions */}
                <div className="mt-4">
                  {o.status === "new" && (
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => advance(o.id, "preparing", `Order #${o.id} accepted`)}
                        className="rounded-full font-semibold"
                      >
                        Accept Order
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => advance(o.id, "rejected", `Order #${o.id} rejected`)}
                        className="rounded-full border-line font-semibold text-destructive hover:border-destructive hover:text-destructive"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  )}

                  {o.status === "preparing" && (
                    <Button
                      onClick={() => advance(o.id, "ready", `Order #${o.id} is ready`)}
                      className="w-full rounded-full font-semibold"
                    >
                      <ChefHat className="h-4 w-4" />
                      Mark as Ready
                    </Button>
                  )}

                  {o.status === "ready" && (
                    <Button
                      onClick={() => advance(o.id, "completed", `Order #${o.id} completed`)}
                      className="w-full rounded-full font-semibold"
                    >
                      <PackageCheck className="h-4 w-4" />
                      Mark as Completed
                    </Button>
                  )}

                  {(o.status === "completed" || o.status === "rejected") && (
                    <div className="flex items-center justify-between rounded-2xl bg-mist px-4 py-3">
                      <span className="flex items-center gap-2 text-[13.5px] font-semibold text-brand">
                        {o.status === "completed" ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            Completed
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-destructive" />
                            Rejected
                          </>
                        )}
                      </span>
                      <Link
                        to="/staff/bills"
                        className="text-[13px] font-semibold text-brand hover:underline"
                      >
                        View bill →
                      </Link>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
