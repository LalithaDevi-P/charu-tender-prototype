import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { productById, DELIVERY_FEE } from "@/lib/catalog";
import { SEED_ORDERS, DEMO_CREDENTIALS } from "@/lib/demo";

export type OrderStatus = "new" | "preparing" | "ready" | "completed" | "rejected";
export type OrderChannel = "online" | "counter";
export type PaymentMethod = "cash" | "upi" | "card";
export type OrderType = "pickup" | "delivery";
export type Role = "staff" | "owner";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  customer: { name: string; phone: string };
  type: OrderType;
  address?: string;
  landmark?: string;
  payment: PaymentMethod;
  channel: OrderChannel;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  createdAt: number;
  note?: string;
}

export interface CartLine {
  id: string;
  qty: number;
}

export interface DetailedLine extends CartLine {
  name: string;
  price: number;
  art: string;
  total: number;
}

export interface PlaceOrderInput {
  customer: { name: string; phone: string };
  type: OrderType;
  address?: string;
  landmark?: string;
  payment: PaymentMethod;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  channel: OrderChannel;
  note?: string;
}

interface ShopState {
  /* cart */
  lines: CartLine[];
  detailedLines: DetailedLine[];
  cartCount: number;
  cartSubtotal: number;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;

  /* orders */
  orders: Order[];
  placeOrder: (input: PlaceOrderInput) => Order;
  setOrderStatus: (id: string, status: OrderStatus) => void;
  nextBillNumber: string;
  resetDemo: () => void;

  /* prototype auth */
  auth: Record<Role, boolean>;
  signIn: (role: Role, email: string, password: string) => boolean;
  signOut: (role: Role) => void;
}

const ShopContext = createContext<ShopState | null>(null);

const STORAGE_KEY = "charu-tender-prototype-v1";
const AUTH_KEY = "charu-tender-prototype-auth-v1";

interface Persisted {
  cart: CartLine[];
  orders: Order[];
  nextId: number;
}

function loadState(): Persisted {
  if (typeof window === "undefined") {
    return { cart: [], orders: SEED_ORDERS, nextId: 1026 };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { cart: [], orders: SEED_ORDERS, nextId: 1026 };
    const parsed = JSON.parse(raw) as Persisted;
    if (!Array.isArray(parsed.orders)) throw new Error("bad");
    return {
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      orders: parsed.orders,
      nextId: typeof parsed.nextId === "number" ? parsed.nextId : 1026,
    };
  } catch {
    return { cart: [], orders: SEED_ORDERS, nextId: 1026 };
  }
}

function loadAuth(): Record<Role, boolean> {
  if (typeof window === "undefined") return { staff: false, owner: false };
  try {
    const raw = window.sessionStorage.getItem(AUTH_KEY);
    if (!raw) return { staff: false, owner: false };
    const parsed = JSON.parse(raw) as Record<Role, boolean>;
    return { staff: !!parsed.staff, owner: !!parsed.owner };
  } catch {
    return { staff: false, owner: false };
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(() => loadState());
  const [auth, setAuth] = useState<Record<Role, boolean>>(() => loadAuth());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable — prototype still works in-memory */
    }
  }, [state]);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(AUTH_KEY, JSON.stringify(auth));
    } catch {
      /* ignore */
    }
  }, [auth]);

  const addToCart = useCallback((id: string, qty = 1) => {
    setState((s) => {
      const existing = s.cart.find((l) => l.id === id);
      const cart = existing
        ? s.cart.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l))
        : [...s.cart, { id, qty }];
      return { ...s, cart };
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setState((s) => ({
      ...s,
      cart:
        qty <= 0
          ? s.cart.filter((l) => l.id !== id)
          : s.cart.map((l) => (l.id === id ? { ...l, qty } : l)),
    }));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setState((s) => ({ ...s, cart: s.cart.filter((l) => l.id !== id) }));
  }, []);

  const clearCart = useCallback(() => {
    setState((s) => ({ ...s, cart: [] }));
  }, []);

  const placeOrder = useCallback(
    (input: PlaceOrderInput): Order => {
      const order: Order = {
        ...input,
        id: `CT-${state.nextId}`,
        status: "new",
        createdAt: Date.now(),
      };
      setState((s) => ({
        ...s,
        cart: [],
        orders: [order, ...s.orders],
        nextId: s.nextId + 1,
      }));
      return order;
    },
    [state.nextId],
  );

  const setOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setState((s) => ({
      ...s,
      orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    }));
  }, []);

  const resetDemo = useCallback(() => {
    setState({ cart: [], orders: SEED_ORDERS, nextId: 1026 });
  }, []);

  const signIn = useCallback((role: Role, email: string, password: string) => {
    const ok =
      email.trim().toLowerCase() === DEMO_CREDENTIALS[role].email &&
      password === DEMO_CREDENTIALS[role].password;
    if (ok) setAuth((a) => ({ ...a, [role]: true }));
    return ok;
  }, []);

  const signOut = useCallback((role: Role) => {
    setAuth((a) => ({ ...a, [role]: false }));
  }, []);

  const detailedLines = useMemo<DetailedLine[]>(
    () =>
      state.cart.flatMap((l) => {
        const product = productById(l.id);
        if (!product) return [];
        return [
          {
            ...l,
            name: product.name,
            price: product.price,
            art: product.art,
            total: product.price * l.qty,
          },
        ];
      }),
    [state.cart],
  );

  const cartSubtotal = useMemo(
    () => detailedLines.reduce((sum, l) => sum + l.total, 0),
    [detailedLines],
  );

  const cartCount = useMemo(
    () => state.cart.reduce((sum, l) => sum + l.qty, 0),
    [state.cart],
  );

  const nextBillNumber = `CT-${state.nextId}`;

  const value: ShopState = {
    lines: state.cart,
    detailedLines,
    cartCount,
    cartSubtotal,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    orders: state.orders,
    placeOrder,
    setOrderStatus,
    nextBillNumber,
    resetDemo,
    auth,
    signIn,
    signOut,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopState {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside <ShopProvider>");
  return ctx;
}

export { DELIVERY_FEE };

export const STATUS_LABEL: Record<OrderStatus, string> = {
  new: "New",
  preparing: "Preparing",
  ready: "Ready",
  completed: "Completed",
  rejected: "Rejected",
};

export const PAYMENT_LABEL: Record<PaymentMethod, string> = {
  cash: "Cash",
  upi: "UPI",
  card: "Card",
};

export function orderTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function orderDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
