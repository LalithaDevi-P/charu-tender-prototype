import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router";
import { motion } from "framer-motion";
import {
  Bike,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  CreditCard,
  Home,
  PackageCheck,
  RefreshCw,
  ShoppingBag,
  Store,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ProductArt } from "@/components/art/ProductArt";
import {
  useShop,
  orderDate,
  orderTime,
  PAYMENT_LABEL,
  type OrderStatus,
} from "@/store/shop";
import { inr, productById } from "@/lib/catalog";

const STEPS: { key: OrderStatus; label: string; desc: string }[] = [
  { key: "new", label: "Order Received", desc: "We have your order" },
  { key: "preparing", label: "Preparing", desc: "Being made fresh now" },
  { key: "ready", label: "Ready", desc: "Packed for pickup or on the way" },
  { key: "completed", label: "Completed", desc: "Enjoyed — thank you!" },
];

const NEXT: Record<OrderStatus, OrderStatus | null> = {
  new: "preparing",
  preparing: "ready",
  ready: "completed",
  completed: null,
  rejected: null,
};

export default function OrderStatus() {
  const { id = "" } = useParams();
  const { orders, setOrderStatus } = useShop();
  const order = useMemo(() => orders.find((o) => o.id === id), [orders, id]);

  useEffect(() => {
    if (!order) return;
    const timer = window.setInterval(() => {
      const current = orders.find((o) => o.id === id);
      if (!current) return;
      const next = NEXT[current.status];
      if (next) setOrderStatus(current.id, next);
    }, 12000);
    return () => window.clearInterval(timer);
  }, [order, orders, id, setOrderStatus]);

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-mist text-brand">
          <ShoppingBag className="h-9 w-9" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-ink">Order not found</h1>
        <p className="mt-3 text-muted-foreground">
          We couldn&apos;t find order {id} in this demo session.
        </p>
        <Button asChild className="mt-7 rounded-full px-7 font-semibold">
          <Link to="/menu">Start a new order</Link>
        </Button>
      </div>
    );
  }

  const stepIndex = STEPS.findIndex((s) => s.key === order.status);
  const rejected = order.status === "rejected";
  const next = NEXT[order.status];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
      {/* confirmation header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-[2rem] border border-line bg-white p-7 text-center shadow-[0_30px_60px_-44px_rgba(22,53,45,0.7)] sm:p-10"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fresh/30 blur-2xl" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 h-52 w-52 rounded-full bg-mist blur-2xl" />

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
          className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white"
        >
          <CheckCircle2 className="h-9 w-9" />
        </motion.div>

        <h1 className="relative mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {rejected ? "Order could not be accepted" : "Order Confirmed! 🎉"}
        </h1>
        <p className="relative mx-auto mt-2 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
          {rejected
            ? "The shop was unable to accept this demo order. Please try again."
            : "Thank you — the shop has been notified and will start preparing your order right away."}
        </p>

        <div className="relative mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              navigator.clipboard?.writeText(order.id);
              toast.success("Order number copied");
            }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-mist px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:border-brand"
          >
            {order.id}
            <Copy className="h-3.5 w-3.5 text-brand" />
          </button>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm text-ink/75">
            <Clock className="h-3.5 w-3.5 text-brand" />
            {orderDate(order.createdAt)} · {orderTime(order.createdAt)}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm text-ink/75">
            {order.type === "delivery" ? (
              <Bike className="h-3.5 w-3.5 text-brand" />
            ) : (
              <Store className="h-3.5 w-3.5 text-brand" />
            )}
            {order.type === "delivery" ? "Delivery" : "Pickup"}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm text-ink/75">
            <CreditCard className="h-3.5 w-3.5 text-brand" />
            {PAYMENT_LABEL[order.payment]}
          </span>
        </div>
      </motion.div>

      {/* progress */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.45 }}
        className="mt-7 rounded-[2rem] border border-line bg-white p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-extrabold tracking-tight text-ink">
            Order status
          </h2>
          <span className="rounded-full bg-mist px-3 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-brand">
            {rejected ? "Rejected" : STEPS[Math.max(stepIndex, 0)].label}
          </span>
        </div>

        <ol className="mt-7 grid gap-4 sm:grid-cols-4 sm:gap-0">
          {STEPS.map((s, i) => {
            const done = !rejected && i <= stepIndex;
            const active = !rejected && i === stepIndex;
            return (
              <li key={s.key} className="relative flex gap-4 sm:block sm:text-center">
                {i < STEPS.length - 1 && (
                  <span
                    className={`absolute left-[19px] top-10 h-[calc(100%-14px)] w-0.5 sm:left-1/2 sm:top-9 sm:h-0.5 sm:w-full sm:-translate-x-1/2 ${
                      !rejected && i < stepIndex ? "bg-brand" : "bg-line"
                    }`}
                  />
                )}
                <motion.span
                  animate={
                    active
                      ? { scale: [1, 1.08, 1] }
                      : {}
                  }
                  transition={{ duration: 1.6, repeat: active ? Infinity : 0 }}
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    done
                      ? "border-brand bg-brand text-white"
                      : "border-line bg-white text-muted-foreground"
                  }`}
                >
                  {done ? <Check className="h-5 w-5" /> : i + 1}
                </motion.span>
                <div className="sm:mt-3 sm:px-2">
                  <p
                    className={`text-[15px] font-bold ${
                      done ? "text-ink" : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </p>
                  <p className="mt-0.5 text-[13px] leading-snug text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-mist p-4">
          <p className="text-[13px] leading-relaxed text-ink/70">
            Prototype note: this status updates live and also simulates itself
            every 12 seconds. Open{" "}
            <span className="font-semibold text-ink">Staff → Online orders</span>{" "}
            to drive it manually.
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!next}
              onClick={() => next && setOrderStatus(order.id, next)}
              className="rounded-full border-line bg-white font-semibold text-ink hover:border-brand hover:text-brand"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Advance status
            </Button>
            <Button
              asChild
              size="sm"
              className="rounded-full font-semibold"
            >
              <Link to="/staff/orders">Open staff view</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* items */}
      <section className="mt-7 rounded-[2rem] border border-line bg-white p-6 sm:p-8">
        <h2 className="text-lg font-extrabold tracking-tight text-ink">Order summary</h2>

        <ul className="mt-5 space-y-3">
          {order.items.map((it) => {
            const product = productById(it.id);
            return (
              <li
                key={it.id}
                className="flex items-center gap-4 rounded-2xl border border-line bg-mist/60 p-3"
              >
                <span className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-line bg-white">
                  {product && (
                    <ProductArt
                      variant={product.art}
                      tone={product.tone}
                      className="h-full w-full"
                    />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-bold text-ink">
                    {it.name}
                  </span>
                  <span className="text-[13px] text-muted-foreground">
                    {inr(it.price)} × {it.qty}
                  </span>
                </span>
                <span className="font-extrabold text-ink">{inr(it.price * it.qty)}</span>
              </li>
            );
          })}
        </ul>

        <dl className="mt-5 space-y-2.5 border-t border-line pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="font-semibold text-ink">{inr(order.subtotal)}</dd>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Discount</dt>
              <dd className="font-semibold text-brand">− {inr(order.discount)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Delivery</dt>
            <dd className="font-semibold text-ink">
              {order.deliveryFee ? inr(order.deliveryFee) : "Free"}
            </dd>
          </div>
          <div className="flex justify-between border-t border-line pt-3">
            <dt className="text-[15px] font-bold text-ink">Total</dt>
            <dd className="text-xl font-extrabold text-brand">{inr(order.total)}</dd>
          </div>
        </dl>

        {order.address && (
          <p className="mt-4 flex items-start gap-2 rounded-2xl bg-mist p-3.5 text-[13px] leading-relaxed text-ink/70">
            <PackageCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <span>
              Delivering to <span className="font-semibold text-ink">{order.address}</span>
              {order.landmark && <> · {order.landmark}</>}
            </span>
          </p>
        )}
      </section>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg" className="rounded-full px-7 font-semibold">
          <Link to="/menu">Order again</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-full border-line bg-white px-7 font-semibold text-ink hover:border-brand hover:text-brand"
        >
          <Link to="/">
            <Home className="h-4 w-4" />
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  );
}
