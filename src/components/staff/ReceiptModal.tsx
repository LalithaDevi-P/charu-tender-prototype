import { Download, Printer, RefreshCw, X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/Logo";
import { orderDate, orderTime, PAYMENT_LABEL, type Order } from "@/store/shop";
import { inr } from "@/lib/catalog";
import { BIZ } from "@/lib/demo";

interface Props {
  order: Order;
  onClose: () => void;
  onNewBill?: () => void;
}

function receiptText(order: Order): string {
  const line = "-".repeat(34);
  const rows = order.items.map(
    (i) =>
      `${i.name.slice(0, 22).padEnd(22)} ${String(i.price).padStart(5)} x ${i.qty}`,
  );
  return [
    BIZ.name,
    BIZ.kannada,
    BIZ.tagline,
    line,
    `Bill No: ${order.id}`,
    `Date:   ${orderDate(order.createdAt)}`,
    `Time:   ${orderTime(order.createdAt)}`,
    line,
    ...rows,
    line,
    `Subtotal   ${inr(order.subtotal)}`,
    `Discount   ${inr(order.discount)}`,
    `TOTAL      ${inr(order.total)}`,
    `Payment    ${PAYMENT_LABEL[order.payment]}`,
    line,
    "Thank You!",
    "Visit Again <3",
    line,
    BIZ.addressSingle,
    BIZ.phone,
  ].join("\n");
}

export function ReceiptModal({ order, onClose, onNewBill }: Props) {
  const print = () => window.print();

  const download = () => {
    const blob = new Blob([receiptText(order)], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${order.id}-charu-tender.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Receipt downloaded");
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-ink/60 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-sm"
      >
        {/* ── receipt ── */}
        <div className="print-area relative overflow-hidden rounded-3xl bg-white px-6 pb-7 pt-6 shadow-2xl">
          <button
            onClick={onClose}
            aria-label="Close receipt"
            className="no-print absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-mist text-ink/60 transition-colors hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="text-center">
            <div className="mx-auto w-fit">
              <LogoMark size={54} />
            </div>
            <p className="mt-3 text-xl font-extrabold tracking-[0.16em] text-ink">
              CHARU TENDER
            </p>
            <p className="font-kannada mt-1 text-[15px] font-semibold text-brand">
              {BIZ.kannada}
            </p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              {BIZ.tagline}
            </p>
          </div>

          <div className="my-4 border-t border-dashed border-line" />

          <div className="space-y-1 font-mono text-[12px] text-ink/80">
            <div className="flex justify-between">
              <span>Bill No</span>
              <span className="font-bold text-ink">{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Date</span>
              <span>{orderDate(order.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span>Time</span>
              <span>{orderTime(order.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span>Bill type</span>
              <span className="uppercase">{order.channel}</span>
            </div>
          </div>

          <div className="my-4 border-t border-dashed border-line" />

          <ul className="space-y-2.5">
            {order.items.map((i) => (
              <li key={i.id} className="font-mono text-[12.5px] text-ink">
                <div className="flex items-start justify-between gap-3">
                  <span className="min-w-0 flex-1 leading-snug">{i.name}</span>
                  <span className="shrink-0 font-bold">{inr(i.price * i.qty)}</span>
                </div>
                <span className="text-[11.5px] text-muted-foreground">
                  {inr(i.price)} × {i.qty}
                </span>
              </li>
            ))}
          </ul>

          <div className="my-4 border-t border-dashed border-line" />

          <dl className="space-y-1.5 font-mono text-[12.5px]">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="text-ink">{inr(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Discount</dt>
              <dd className="text-ink">{inr(order.discount)}</dd>
            </div>
            {order.deliveryFee > 0 && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd className="text-ink">{inr(order.deliveryFee)}</dd>
              </div>
            )}
            <div className="flex items-center justify-between border-t border-line pt-2 text-base font-extrabold text-ink">
              <dt>TOTAL</dt>
              <dd className="text-brand">{inr(order.total)}</dd>
            </div>
            <div className="flex justify-between pt-1">
              <dt className="text-muted-foreground">Payment</dt>
              <dd className="font-bold uppercase text-ink">
                {PAYMENT_LABEL[order.payment]}
              </dd>
            </div>
          </dl>

          <div className="my-4 border-t border-dashed border-line" />

          <div className="text-center">
            <p className="text-[15px] font-extrabold text-ink">Thank You!</p>
            <p className="mt-0.5 text-[13px] font-semibold text-brand">
              Visit Again ❤️
            </p>
            <p className="mt-3 font-mono text-[10.5px] leading-relaxed text-muted-foreground">
              {BIZ.addressSingle}
              <br />
              {BIZ.phone}
            </p>
          </div>

          {/* zigzag edge */}
          <div
            className="absolute inset-x-0 -bottom-px h-3 bg-white"
            style={{
              maskImage:
                "linear-gradient(45deg, transparent 50%, black 50%), linear-gradient(-45deg, transparent 50%, black 50%)",
              maskSize: "12px 100%",
              maskRepeat: "repeat-x",
            }}
          />
        </div>

        {/* ── actions ── */}
        <div className="no-print mt-4 grid grid-cols-3 gap-2">
          <Button
            onClick={print}
            variant="outline"
            className="rounded-full border-white/25 bg-white/10 font-semibold text-white hover:border-white hover:text-white"
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button
            onClick={download}
            variant="outline"
            className="rounded-full border-white/25 bg-white/10 font-semibold text-white hover:border-white hover:text-white"
          >
            <Download className="h-4 w-4" />
            Save
          </Button>
          <Button
            onClick={() => {
              onClose();
              onNewBill?.();
            }}
            className="rounded-full font-semibold"
          >
            <RefreshCw className="h-4 w-4" />
            New Bill
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
