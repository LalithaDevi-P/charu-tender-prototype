import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { KeyRound, RotateCcw, Save, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useShop } from "@/store/shop";
import { BIZ, DEMO_CREDENTIALS } from "@/lib/demo";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-line bg-white p-5 sm:p-6"
    >
      <h2 className="text-[17px] font-extrabold tracking-tight text-ink">{title}</h2>
      {description && (
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      <div className="mt-5">{children}</div>
    </motion.section>
  );
}

export default function AdminSettings() {
  const { resetDemo, signOut } = useShop();
  const [name, setName] = useState(BIZ.name);
  const [kannada, setKannada] = useState(BIZ.kannada);
  const [phone, setPhone] = useState(BIZ.phone);
  const [address, setAddress] = useState(BIZ.addressSingle);
  const [hours, setHours] = useState(BIZ.hours);

  const field =
    "mt-2 h-12 rounded-2xl border border-line bg-mist px-4 text-[15px] text-ink focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none";

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-6 sm:px-6 lg:py-8">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
        Owner dashboard
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Settings</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Business details shown across the website, POS and receipts.
      </p>

      <div className="mt-6 grid gap-5">
        <Section
          title="Business profile"
          description="These details appear on the customer website, the counter receipt and the contact page."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-[13px] font-semibold text-ink/80">Business name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className={field} />
            </div>
            <div>
              <Label className="text-[13px] font-semibold text-ink/80">
                Kannada name
              </Label>
              <Input
                value={kannada}
                onChange={(e) => setKannada(e.target.value)}
                className={`${field} font-kannada`}
              />
            </div>
            <div>
              <Label className="text-[13px] font-semibold text-ink/80">Phone</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} className={field} />
            </div>
            <div>
              <Label className="text-[13px] font-semibold text-ink/80">Opening hours</Label>
              <Input value={hours} onChange={(e) => setHours(e.target.value)} className={field} />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-[13px] font-semibold text-ink/80">Address</Label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} className={field} />
            </div>
          </div>

          <Button
            onClick={() =>
              toast.success("Settings saved", {
                description: "Prototype only — values are not persisted to a server.",
              })
            }
            className="mt-5 rounded-full px-6 font-semibold"
          >
            <Save className="h-4 w-4" />
            Save changes
          </Button>
        </Section>

        <Section
          title="Prototype access"
          description="Both experiences use a prototype login so the demo stays simple. Nothing here is real authentication."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-dashed border-brand/40 bg-mist p-4">
              <p className="flex items-center gap-2 text-[13.5px] font-extrabold text-ink">
                <KeyRound className="h-4 w-4 text-brand" />
                Staff POS
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink/70">
                Email{" "}
                <span className="font-semibold text-brand">
                  {DEMO_CREDENTIALS.staff.email}
                </span>
                <br />
                Password{" "}
                <span className="font-semibold text-brand">
                  {DEMO_CREDENTIALS.staff.password}
                </span>
              </p>
              <Link
                to="/staff"
                className="mt-3 inline-block text-[13px] font-semibold text-brand hover:underline"
              >
                Open staff login →
              </Link>
            </div>

            <div className="rounded-2xl border border-dashed border-brand/40 bg-mist p-4">
              <p className="flex items-center gap-2 text-[13.5px] font-extrabold text-ink">
                <ShieldCheck className="h-4 w-4 text-brand" />
                Owner dashboard
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink/70">
                Email{" "}
                <span className="font-semibold text-brand">
                  {DEMO_CREDENTIALS.owner.email}
                </span>
                <br />
                Password{" "}
                <span className="font-semibold text-brand">
                  {DEMO_CREDENTIALS.owner.password}
                </span>
              </p>
              <button
                onClick={() => {
                  signOut("owner");
                  toast("Signed out of the dashboard");
                }}
                className="mt-3 inline-block text-[13px] font-semibold text-brand hover:underline"
              >
                Sign out →
              </button>
            </div>
          </div>
        </Section>

        <Section
          title="Demo data"
          description="Orders, bills and cart contents live in this browser only. Resetting restores the original demo session."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => {
                resetDemo();
                toast.success("Demo data reset", {
                  description: "Seeded orders and an empty cart restored.",
                });
              }}
              variant="outline"
              className="rounded-full border-line bg-white font-semibold text-ink hover:border-brand hover:text-brand"
            >
              <RotateCcw className="h-4 w-4" />
              Reset demo data
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-full border-line bg-white font-semibold text-ink hover:border-brand hover:text-brand"
            >
              <Link to="/">View website</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-full border-line bg-white font-semibold text-ink hover:border-brand hover:text-brand"
            >
              <Link to="/staff/pos">Open counter POS</Link>
            </Button>
          </div>

          <ul className="mt-5 grid gap-2 text-[13px] leading-relaxed text-muted-foreground sm:grid-cols-2">
            <li className="rounded-xl bg-mist px-3.5 py-2.5">
              ✅ Cart, checkout, order status and receipt printing are interactive.
            </li>
            <li className="rounded-xl bg-mist px-3.5 py-2.5">
              ✅ Staff can accept, prepare, ready and complete online orders.
            </li>
            <li className="rounded-xl bg-mist px-3.5 py-2.5">
              ⏸ Payments, SMS, WhatsApp and printer hardware are mocked.
            </li>
            <li className="rounded-xl bg-mist px-3.5 py-2.5">
              ⏸ No production database, auth or GST compliance in this prototype.
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
