import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Eye, EyeOff, KeyRound, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandLockup } from "@/components/brand/Logo";
import { Scene } from "@/components/art/scenes";
import { useShop } from "@/store/shop";
import { DEMO_CREDENTIALS } from "@/lib/demo";

export default function AdminEntry() {
  const { auth, signIn } = useShop();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  if (auth.owner) return <Navigate to="/admin/dashboard" replace />;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = signIn("owner", email, password);
    if (!ok) {
      setError("Those demo credentials don't match. Use the values shown below.");
      toast.error("Login failed");
      return;
    }
    toast.success("Welcome back, owner", {
      description: "Dashboard is ready.",
    });
    navigate("/admin/dashboard", { replace: true });
  };

  const fill = () => {
    setEmail(DEMO_CREDENTIALS.owner.email);
    setPassword(DEMO_CREDENTIALS.owner.password);
    setError("");
  };

  return (
    <div className="grid min-h-screen bg-cream lg:grid-cols-2">
      {/* brand panel */}
      <div className="relative hidden overflow-hidden bg-brand-deep lg:block">
        <Scene name="shop-exterior" className="absolute inset-0 h-full w-full opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-deep via-brand-deep/90 to-ink/75" />

        <div className="relative flex h-full flex-col justify-between p-10">
          <BrandLockup tone="light" size={52} />

          <div className="max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-fresh">
              Owner dashboard
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-white">
              Your shop,
              <br />
              at a glance.
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-white/70">
              Today&apos;s sales, online orders, counter bills, top selling
              products and the full sales overview — in one clean view.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-white">
            {[
              { k: "Today", v: "₹8,450" },
              { k: "Orders", v: "42" },
              { k: "Products", v: "126" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl bg-white/10 p-4">
                <p className="text-xl font-extrabold leading-none">{s.v}</p>
                <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/60">
                  {s.k}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* form */}
      <div className="flex items-center justify-center px-5 py-12 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden">
            <BrandLockup size={46} />
          </div>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.24em] text-brand lg:mt-0">
            Charu Tender
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">
            Owner Login
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to open your business dashboard.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <div>
              <Label htmlFor="o-email" className="text-[13px] font-semibold text-ink/80">
                Email
              </Label>
              <div className="relative mt-2">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand" />
                <Input
                  id="o-email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="owner@charutender.in"
                  className="h-12 rounded-2xl border border-line bg-white pl-11 pr-4 text-[15px] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="o-password" className="text-[13px] font-semibold text-ink/80">
                Password
              </Label>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand" />
                <Input
                  id="o-password"
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="••••••••"
                  className="h-12 rounded-2xl border border-line bg-white pl-11 pr-12 text-[15px] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-ink/50 hover:text-brand"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-[13px] font-medium text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full rounded-full text-[15px] font-semibold">
              Login
            </Button>
          </form>

          <button
            onClick={fill}
            className="mt-6 flex w-full items-start gap-3 rounded-2xl border border-dashed border-brand/40 bg-mist p-4 text-left transition-colors hover:border-brand"
          >
            <KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <span className="text-[13px] leading-relaxed text-ink/75">
              <span className="font-bold text-ink">Demo credentials —</span> tap to
              fill.
              <br />
              Email <span className="font-semibold text-brand">{DEMO_CREDENTIALS.owner.email}</span>
              <br />
              Password <span className="font-semibold text-brand">{DEMO_CREDENTIALS.owner.password}</span>
            </span>
          </button>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 text-[13px]">
            <Link to="/" className="text-muted-foreground hover:text-brand">
              ← Back to website
            </Link>
            <Link to="/staff" className="font-semibold text-brand hover:underline">
              Staff POS login →
            </Link>
          </div>

          <p className="mt-6 rounded-2xl border border-line bg-white p-3.5 text-center text-[12px] leading-relaxed text-muted-foreground">
            Prototype login only — no real authentication is performed.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
