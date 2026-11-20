import { Navigate, NavLink, Outlet, useLocation } from "react-router";
import { LogOut, Receipt, ShoppingBasket, ClipboardList, Store } from "lucide-react";
import { BrandLockup } from "@/components/brand/Logo";
import { useShop } from "@/store/shop";

const TABS = [
  { to: "/staff/pos", label: "POS", icon: Store, end: true },
  { to: "/staff/orders", label: "Online Orders", icon: ShoppingBasket, end: false },
  { to: "/staff/bills", label: "Bills", icon: Receipt, end: false },
];

export default function StaffLayout() {
  const { auth, signOut, orders } = useShop();
  const location = useLocation();

  if (!auth.staff) {
    return <Navigate to="/staff" replace state={{ from: location.pathname }} />;
  }

  const pending = orders.filter((o) => o.channel === "online" && o.status === "new").length;

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <NavLink to="/staff/pos" className="shrink-0">
              <BrandLockup size={36} compact />
            </NavLink>
            <span className="hidden rounded-full bg-mist px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand sm:inline">
              Staff POS
            </span>
          </div>

          <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {TABS.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.end}
                className={({ isActive }) =>
                  `relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
                    isActive
                      ? "bg-brand text-white"
                      : "text-ink/65 hover:bg-mist hover:text-ink"
                  }`
                }
              >
                <t.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{t.label}</span>
                {t.to === "/staff/orders" && pending > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-honey px-1.5 text-[11px] font-extrabold text-ink">
                    {pending}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <NavLink
              to="/admin"
              className="hidden items-center gap-2 rounded-full border border-line px-4 py-2 text-[13.5px] font-semibold text-ink/70 transition-colors hover:border-brand hover:text-brand md:flex"
            >
              <ClipboardList className="h-4 w-4" />
              Owner
            </NavLink>
            <button
              onClick={() => signOut("staff")}
              className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[13.5px] font-semibold text-ink/70 transition-colors hover:border-destructive hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
