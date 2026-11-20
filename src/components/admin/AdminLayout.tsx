import { useState } from "react";
import { Navigate, NavLink, Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Receipt,
  Settings,
  Star,
  Store,
  X,
} from "lucide-react";
import { BrandLockup } from "@/components/brand/Logo";
import { useShop } from "@/store/shop";

const NAV = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/orders", label: "Orders", icon: ClipboardList },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/pos", label: "POS / Billing", icon: Store },
  { to: "/admin/sales", label: "Sales", icon: BarChart3 },
  { to: "/admin/reviews", label: "Reviews", icon: Star },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { signOut } = useShop();

  return (
    <div className="flex h-full flex-col">
      <div className="px-5 py-6">
        <BrandLockup tone="light" size={44} />
        <p className="mt-4 rounded-xl bg-white/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-fresh">
          Owner Dashboard
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-3.5 py-3 text-[14.5px] font-semibold transition-colors ${
                isActive
                  ? "bg-white text-brand-deep shadow-[0_10px_24px_-18px_rgba(0,0,0,0.9)]"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <n.icon className="h-[18px] w-[18px] shrink-0" />
            {n.label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-2 border-t border-white/10 p-3">
        <NavLink
          to="/"
          className="flex items-center gap-3 rounded-2xl px-3.5 py-3 text-[14.5px] font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Receipt className="h-[18px] w-[18px]" />
          View website
        </NavLink>
        <button
          onClick={() => signOut("owner")}
          className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-[14.5px] font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-[18px] w-[18px]" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const { auth } = useShop();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  if (!auth.owner) {
    return <Navigate to="/admin" replace state={{ from: location.pathname }} />;
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-brand-deep lg:block">
        <SidebarContent />
      </aside>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink/50"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              className="absolute inset-y-0 left-0 w-72 bg-brand-deep"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="absolute right-3 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <SidebarContent onNavigate={() => setOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="lg:pl-64">
        {/* mobile top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-line bg-cream/95 px-4 backdrop-blur lg:hidden">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white"
          >
            <Menu className="h-5 w-5" />
          </button>
          <BrandLockup size={34} compact />
          <NavLink
            to="/staff/pos"
            className="rounded-full border border-line bg-white px-3.5 py-2 text-[13px] font-semibold text-ink/75"
          >
            POS
          </NavLink>
        </header>

        <Outlet />
      </div>
    </div>
  );
}
