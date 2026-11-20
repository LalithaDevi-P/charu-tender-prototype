import "@vly-ai/integrations";
import { Toaster } from "@/components/ui/sonner";
import { VlyToolbar } from "../vly-toolbar-readonly.tsx";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";
import "./index.css";
import { ShopProvider } from "@/store/shop";
import CustomerLayout from "@/components/shop/CustomerLayout";
import StaffLayout from "@/components/staff/StaffLayout";
import AdminLayout from "@/components/admin/AdminLayout";

// ── Customer ────────────────────────────────────────────────
const Home = lazy(() => import("./pages/Home.tsx"));
const Menu = lazy(() => import("./pages/Menu.tsx"));
const Product = lazy(() => import("./pages/Product.tsx"));
const Cart = lazy(() => import("./pages/Cart.tsx"));
const Checkout = lazy(() => import("./pages/Checkout.tsx"));
const OrderStatus = lazy(() => import("./pages/OrderStatus.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Gallery = lazy(() => import("./pages/Gallery.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));

// ── Staff ───────────────────────────────────────────────────
const StaffLogin = lazy(() => import("./pages/staff/StaffLogin.tsx"));
const POS = lazy(() => import("./pages/staff/POS.tsx"));
const OnlineOrders = lazy(() => import("./pages/staff/OnlineOrders.tsx"));
const Bills = lazy(() => import("./pages/staff/Bills.tsx"));

// ── Owner ───────────────────────────────────────────────────
const AdminEntry = lazy(() => import("./pages/admin/AdminEntry.tsx"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard.tsx"));
const AdminOrders = lazy(() => import("./pages/admin/Orders.tsx"));
const AdminProducts = lazy(() => import("./pages/admin/Products.tsx"));
const AdminPosPage = lazy(() => import("./pages/admin/PosPage.tsx"));
const AdminSales = lazy(() => import("./pages/admin/Sales.tsx"));
const AdminReviews = lazy(() => import("./pages/admin/Reviews.tsx"));
const AdminSettings = lazy(() => import("./pages/admin/Settings.tsx"));

// ── Template ────────────────────────────────────────────────
const AuthPage = lazy(() => import("./pages/Auth.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="flex flex-col items-center gap-4">
        <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-line border-t-brand" />
        <p className="text-sm font-medium text-muted-foreground">Loading…</p>
      </div>
    </div>
  );
}

/** Silent error boundary — if VlyToolbar crashes it renders nothing instead of
 *  crashing the whole app (e.g. hook errors in the browser runtime). */
class ToolbarErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: Error) {
    console.warn("[VlyToolbar] Caught error, toolbar disabled:", err.message);
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

/** Hard guard so runtime errors never leave the preview as a blank page. */
class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string; stack: string }
> {
  state = { hasError: false, message: "", stack: "" };
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      message: error.message || "Unknown runtime error",
      stack: error.stack || "",
    };
  }
  componentDidCatch(error: Error) {
    console.error("[Preview] Root crash:", error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
          <div className="max-w-lg text-center">
            <p className="text-sm font-semibold">Preview runtime error</p>
            <p className="mt-2 text-xs text-muted-foreground break-words">
              {this.state.message}
            </p>
            {this.state.stack && (
              <pre className="mt-3 text-left text-[10px] leading-4 text-muted-foreground/80 max-h-40 overflow-auto rounded border border-border/60 p-2">
                {this.state.stack}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * Convex only powers the template's `/auth` page. The three Charu Tender demo
 * experiences (customer, staff POS, owner dashboard) run entirely on local
 * state, so a missing or invalid VITE_CONVEX_URL must never blank the app on a
 * fresh checkout — we fall back to local demo mode and simply omit /auth.
 */
function createConvexClient(): ConvexReactClient | null {
  const url = import.meta.env.VITE_CONVEX_URL as string | undefined;
  if (!url) {
    console.warn(
      "[Charu Tender] VITE_CONVEX_URL is not set — running in local demo mode (email sign-in disabled).",
    );
    return null;
  }
  try {
    return new ConvexReactClient(url);
  } catch (error) {
    console.warn(
      "[Charu Tender] Convex client could not be created — running in local demo mode.",
      error,
    );
    return null;
  }
}

const convex = createConvexClient();

function withConvex(children: React.ReactNode) {
  if (!convex) return <>{children}</>;
  return <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>;
}

function RouteSyncer() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: pathname },
      "*",
    );
  }, [pathname]);

  React.useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <ToolbarErrorBoundary>
        <VlyToolbar />
      </ToolbarErrorBoundary>
      {withConvex(
        <ShopProvider>
          <BrowserRouter>
            <RouteSyncer />
            <Suspense fallback={<RouteLoading />}>
              <Routes>
                {/* ── SIDE 1 · CUSTOMER ── */}
                <Route element={<CustomerLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order/:id" element={<OrderStatus />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                </Route>

                {/* ── SIDE 2 · STAFF / POS ── */}
                <Route path="/staff" element={<StaffLogin />} />
                <Route element={<StaffLayout />}>
                  <Route path="/staff/pos" element={<POS />} />
                  <Route path="/staff/orders" element={<OnlineOrders />} />
                  <Route path="/staff/bills" element={<Bills />} />
                </Route>

                {/* ── SIDE 3 · OWNER ── */}
                <Route path="/admin" element={<AdminEntry />} />
                <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/orders" element={<AdminOrders />} />
                  <Route path="/admin/products" element={<AdminProducts />} />
                  <Route path="/admin/pos" element={<AdminPosPage />} />
                  <Route path="/admin/sales" element={<AdminSales />} />
                  <Route path="/admin/reviews" element={<AdminReviews />} />
                  <Route path="/admin/settings" element={<AdminSettings />} />
                </Route>

                {/* template routes */}
                {convex && (
                  <Route
                    path="/auth"
                    element={<AuthPage redirectAfterAuth="/admin/dashboard" />}
                  />
                )}
                <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  borderRadius: "16px",
                  border: "1px solid #DCEAE3",
                  background: "#FFFFFF",
                  color: "#16352D",
                  fontFamily: "Inter, sans-serif",
                  boxShadow: "0 18px 40px -24px rgba(22,53,45,0.5)",
                },
              }}
            />
          </BrowserRouter>
        </ShopProvider>
      )}
    </RootErrorBoundary>
  </React.StrictMode>,
);
