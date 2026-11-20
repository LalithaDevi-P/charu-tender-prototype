import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Phone,
  Search,
  ShoppingBag,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLockup, LogoMark } from "@/components/brand/Logo";
import { useShop } from "@/store/shop";
import { PRODUCTS, inr } from "@/lib/catalog";
import { BIZ } from "@/lib/demo";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.desc.toLowerCase().includes(term) ||
        p.category.includes(term),
    ).slice(0, 6);
  }, [q]);

  const go = (id: string) => {
    onClose();
    navigate(`/product/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      className="absolute inset-x-0 top-full border-b border-line bg-white shadow-[0_18px_40px_-24px_rgba(22,53,45,0.35)]"
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3 rounded-2xl border border-line bg-mist px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-brand" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && results[0]) go(results[0].id);
              if (e.key === "Escape") onClose();
            }}
            placeholder="Search tender coconut, sugarcane, amla, papaya…"
            className="w-full bg-transparent text-[15px] text-ink placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="rounded-full p-1.5 text-muted-foreground hover:bg-white hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {q.trim() && (
          <div className="mt-3">
            {results.length === 0 ? (
              <p className="px-1 py-3 text-sm text-muted-foreground">
                No matches for “{q}”. Try{" "}
                <span className="font-semibold text-brand">tender</span>,{" "}
                <span className="font-semibold text-brand">cane</span> or{" "}
                <span className="font-semibold text-brand">juice</span>.
              </p>
            ) : (
              <ul className="grid gap-1 sm:grid-cols-2">
                {results.map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => go(p.id)}
                      className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-mist"
                    >
                      <span className="text-sm font-medium text-ink">{p.name}</span>
                      <span className="text-sm font-bold text-brand">{inr(p.price)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Nav() {
  const { cartCount } = useShop();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Close overlays when the route changes (state adjusted during render,
  // the React-recommended alternative to resetting state in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (searchOpen) setSearchOpen(false);
    if (menuOpen) setMenuOpen(false);
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${
      isActive ? "text-brand" : "text-ink/70 hover:text-ink"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6">
        <Link to="/" aria-label="Charu Tender home" className="shrink-0">
          <BrandLockup size={40} compact />
        </Link>

        <nav className="hidden items-center lg:flex">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"}>
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search menu"
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              searchOpen ? "bg-brand text-white" : "text-ink/70 hover:bg-mist hover:text-brand"
            }`}
          >
            <Search className="h-[18px] w-[18px]" />
          </button>

          <Link
            to="/cart"
            aria-label={`Cart, ${cartCount} items`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-mist hover:text-brand"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 24 }}
                  className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-honey px-1 text-[11px] font-bold text-ink"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <Button asChild className="hidden rounded-full px-5 font-semibold sm:inline-flex">
            <Link to="/menu">Order Now</Link>
          </Button>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && <SearchPanel onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>

      {/* mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-cream shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <BrandLockup size={38} compact />
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-mist text-ink"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5">
                <ul className="space-y-1">
                  {LINKS.map((l, i) => (
                    <li key={l.to}>
                      <NavLink
                        to={l.to}
                        end={l.to === "/"}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between rounded-2xl px-4 py-3.5 text-[17px] font-semibold transition-colors ${
                            isActive ? "bg-brand text-white" : "text-ink hover:bg-mist"
                          }`
                        }
                      >
                        {l.label}
                        <span className="text-xs opacity-60">0{i + 1}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-2xl border border-line bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                    Visit us
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75">
                    {BIZ.addressSingle}
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-ink">
                    <Phone className="h-4 w-4 text-brand" />
                    {BIZ.phoneDisplay}
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Link
                    to="/staff"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl border border-line bg-white px-4 py-3 text-center text-sm font-semibold text-ink hover:border-brand hover:text-brand"
                  >
                    Staff POS
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl border border-line bg-white px-4 py-3 text-center text-sm font-semibold text-ink hover:border-brand hover:text-brand"
                  >
                    Owner
                  </Link>
                </div>
              </div>

              <div className="border-t border-line p-5">
                <Button asChild size="lg" className="w-full rounded-full font-semibold">
                  <Link to="/menu" onClick={() => setMenuOpen(false)}>
                    Order Now
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function FloatingCart() {
  const { cartCount, cartSubtotal } = useShop();
  const { pathname } = useLocation();
  const hidden = ["/cart", "/checkout"].some((p) => pathname.startsWith(p));

  return (
    <AnimatePresence>
      {cartCount > 0 && !hidden && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 30 }}
          className="no-print fixed bottom-4 left-4 right-4 z-40 sm:left-auto sm:right-6 sm:w-auto"
        >
          <Link
            to="/cart"
            className="flex items-center justify-between gap-4 rounded-full bg-brand px-5 py-3.5 text-white shadow-[0_18px_36px_-16px_rgba(8,127,91,0.85)] transition-transform hover:scale-[1.02] sm:min-w-[260px]"
          >
            <span className="flex items-center gap-2.5 text-sm font-semibold">
              <ShoppingBag className="h-4 w-4" />
              {cartCount} {cartCount === 1 ? "item" : "items"} in cart
            </span>
            <span className="flex items-center gap-1.5 text-sm font-bold">
              {inr(cartSubtotal)}
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] uppercase tracking-wider">
                View
              </span>
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="no-print border-t border-line bg-mist">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <BrandLockup size={46} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/70">
              Fresh tender coconut, natural sugarcane juice, healthy fruit juices
              and fresh fruits — served at Sangam Circle, Vijayanagar.
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 w-fit border border-line">
              <Star className="h-4 w-4 fill-honey text-honey" />
              <span className="text-sm font-bold text-ink">{BIZ.rating}</span>
              <span className="text-xs text-ink/60">{BIZ.reviews} Google reviews</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-ink/70 transition-colors hover:text-brand"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/cart"
                  className="text-sm text-ink/70 transition-colors hover:text-brand"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              For our team
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link to="/staff" className="text-sm text-ink/70 transition-colors hover:text-brand">
                  Staff login
                </Link>
              </li>
              <li>
                <Link to="/staff/pos" className="text-sm text-ink/70 transition-colors hover:text-brand">
                  Counter POS
                </Link>
              </li>
              <li>
                <Link to="/staff/orders" className="text-sm text-ink/70 transition-colors hover:text-brand">
                  Online orders
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-sm text-ink/70 transition-colors hover:text-brand">
                  Owner dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Visit
            </p>
            <ul className="mt-4 space-y-3 text-sm text-ink/70">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{BIZ.addressSingle}</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <a href={BIZ.phoneHref} className="hover:text-brand">
                  {BIZ.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{BIZ.hours}</span>
              </li>
              <li className="flex gap-2.5">
                <Instagram className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>@charutender</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-xs text-ink/55">
            © {new Date().getFullYear()} Charu Tender · ಚಾರು ಎಳನೀರು. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-xs text-ink/55">
            <LogoMark size={18} />
            Interactive prototype — demo data only, no real payments are processed.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function CustomerLayout() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <ScrollToTop />
      <Nav />
      <main className="flex-1">
        <Outlet key={pathname} />
      </main>
      <Footer />
      <FloatingCart />
    </div>
  );
}
