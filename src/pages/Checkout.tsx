import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Banknote, Bike, Check, CreditCard, QrCode, Store } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useShop, DELIVERY_FEE, type PaymentMethod, type OrderType } from "@/store/shop";
import { inr } from "@/lib/catalog";

const PAYMENTS: { id: PaymentMethod; label: string; hint: string; icon: typeof Banknote }[] = [
  { id: "cash", label: "Cash", hint: "Pay at pickup or on delivery", icon: Banknote },
  { id: "upi", label: "UPI", hint: "PhonePe, GPay, Paytm", icon: QrCode },
  { id: "card", label: "Card", hint: "Debit or credit card", icon: CreditCard },
];

const TYPES: { id: OrderType; label: string; hint: string; icon: typeof Store }[] = [
  { id: "pickup", label: "Pickup", hint: "Collect at the shop · free", icon: Store },
  { id: "delivery", label: "Delivery", hint: "Brought to your door · ₹20", icon: Bike },
];

export default function Checkout() {
  const { detailedLines, cartSubtotal, cartCount, placeOrder } = useShop();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState<OrderType>("pickup");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("upi");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const deliveryFee = type === "delivery" ? DELIVERY_FEE : 0;
  const total = useMemo(() => cartSubtotal + deliveryFee, [cartSubtotal, deliveryFee]);

  if (cartCount === 0) {
    return <Navigate to="/cart" replace />;
  }

  const validate = () => {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Please enter your name";
    if (!/^[0-9+\-\s]{10,15}$/.test(phone.trim()))
      next.phone = "Enter a valid phone number";
    if (type === "delivery" && address.trim().length < 8)
      next.address = "Please enter your delivery address";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please check the highlighted fields");
      return;
    }
    setSubmitting(true);

    const items = detailedLines.map((l) => ({
      id: l.id,
      name: l.name,
      price: l.price,
      qty: l.qty,
    }));

    const order = placeOrder({
      customer: { name: name.trim(), phone: phone.trim() },
      type,
      address: type === "delivery" ? address.trim() : undefined,
      landmark: type === "delivery" && landmark.trim() ? landmark.trim() : undefined,
      payment,
      items,
      subtotal: cartSubtotal,
      discount: 0,
      deliveryFee,
      total,
      channel: "online",
      note: note.trim() || undefined,
    });

    window.setTimeout(() => {
      toast.success("Order placed!", {
        description: `${order.id} · ${inr(order.total)}`,
        duration: 3000,
      });
      navigate(`/order/${order.id}`, { replace: true });
    }, 350);
  };

  const fieldClass = (key: string) =>
    `h-12 rounded-2xl border bg-white px-4 text-[15px] text-ink placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none ${
      errors[key] ? "border-destructive" : "border-line"
    }`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
      <nav className="flex items-center gap-2 text-[13px] text-muted-foreground">
        <Link to="/" className="hover:text-brand">
          Home
        </Link>
        <span>/</span>
        <Link to="/cart" className="hover:text-brand">
          Cart
        </Link>
        <span>/</span>
        <span className="font-semibold text-ink">Checkout</span>
      </nav>

      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink">Checkout</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        A demo checkout — no real payment is processed.
      </p>

      <form
        onSubmit={submit}
        className="mt-8 grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-10"
      >
        <div className="space-y-7">
          {/* customer */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-line bg-white p-5 sm:p-6"
          >
            <h2 className="text-lg font-extrabold tracking-tight text-ink">
              Your details
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name" className="text-[13px] font-semibold text-ink/80">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul"
                  className={`mt-2 ${fieldClass("name")}`}
                />
                {errors.name && (
                  <p className="mt-1.5 text-[12.5px] font-medium text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-[13px] font-semibold text-ink/80">
                  Phone
                </Label>
                <Input
                  id="phone"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98450 12345"
                  className={`mt-2 ${fieldClass("phone")}`}
                />
                {errors.phone && (
                  <p className="mt-1.5 text-[12.5px] font-medium text-destructive">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </motion.section>

          {/* order type */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-3xl border border-line bg-white p-5 sm:p-6"
          >
            <h2 className="text-lg font-extrabold tracking-tight text-ink">Order type</h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {TYPES.map((t) => {
                const active = type === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setType(t.id)}
                    className={`relative flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                      active
                        ? "border-brand bg-mist shadow-[0_10px_26px_-18px_rgba(8,127,91,0.9)]"
                        : "border-line bg-white hover:border-brand/40"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        active ? "bg-brand text-white" : "bg-mist text-brand"
                      }`}
                    >
                      <t.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 text-[15px] font-bold text-ink">
                        {t.label}
                        {active && <Check className="h-4 w-4 text-brand" />}
                      </span>
                      <span className="mt-0.5 block text-[13px] text-muted-foreground">
                        {t.hint}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {type === "delivery" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="overflow-hidden"
              >
                <div className="mt-5 grid gap-4">
                  <div>
                    <Label htmlFor="address" className="text-[13px] font-semibold text-ink/80">
                      Delivery address
                    </Label>
                    <Textarea
                      id="address"
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="No. 12, 4th Cross, Vijayanagar 3rd Stage"
                      className={`mt-2 min-h-[76px] resize-none rounded-2xl border bg-white px-4 py-3 text-[15px] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none ${
                        errors.address ? "border-destructive" : "border-line"
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1.5 text-[12.5px] font-medium text-destructive">
                        {errors.address}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="landmark" className="text-[13px] font-semibold text-ink/80">
                      Landmark <span className="font-normal text-muted-foreground">(optional)</span>
                    </Label>
                    <Input
                      id="landmark"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="Opposite the temple"
                      className="mt-2 h-12 rounded-2xl border border-line bg-white px-4 text-[15px] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </motion.section>

          {/* payment */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-line bg-white p-5 sm:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-extrabold tracking-tight text-ink">
                Payment method
              </h2>
              <span className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand">
                demo selection
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {PAYMENTS.map((m) => {
                const active = payment === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPayment(m.id)}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      active
                        ? "border-brand bg-mist"
                        : "border-line bg-white hover:border-brand/40"
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <m.icon
                        className={`h-5 w-5 ${active ? "text-brand" : "text-ink/55"}`}
                      />
                      {active && <Check className="h-4 w-4 text-brand" />}
                    </span>
                    <span className="mt-3 block text-[15px] font-bold text-ink">
                      {m.label}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] text-muted-foreground">
                      {m.hint}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5">
              <Label htmlFor="note" className="text-[13px] font-semibold text-ink/80">
                Note for the shop <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Extra pepper, less ice…"
                className="mt-2 h-12 rounded-2xl border border-line bg-white px-4 text-[15px] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
              />
            </div>
          </motion.section>
        </div>

        {/* summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-line bg-white p-6">
            <h2 className="text-lg font-extrabold tracking-tight text-ink">
              Your order
            </h2>

            <ul className="mt-5 max-h-64 space-y-3 overflow-y-auto pr-1 thin-scrollbar">
              {detailedLines.map((l) => (
                <li key={l.id} className="flex items-start justify-between gap-3 text-sm">
                  <span className="text-ink/80">
                    <span className="font-bold text-ink">{l.qty}×</span> {l.name}
                  </span>
                  <span className="shrink-0 font-semibold text-ink">{inr(l.total)}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-5 space-y-3 border-t border-line pt-4 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-bold text-ink">{inr(cartSubtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">
                  {type === "delivery" ? "Demo delivery fee" : "Delivery fee (pickup)"}
                </dt>
                <dd className="font-bold text-ink">
                  {deliveryFee === 0 ? "Free" : inr(deliveryFee)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-line pt-3">
                <dt className="text-[15px] font-bold text-ink">Total</dt>
                <dd className="text-xl font-extrabold text-brand">{inr(total)}</dd>
              </div>
            </dl>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="mt-5 w-full rounded-full text-[15px] font-semibold"
            >
              {submitting ? "Placing order…" : `Place Order · ${inr(total)}`}
            </Button>

            <p className="mt-3 text-center text-[12px] leading-relaxed text-muted-foreground">
              By placing this order you agree this is a prototype demo using
              mock data.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
