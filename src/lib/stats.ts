import { useMemo } from "react";
import { useShop, type Order } from "@/store/shop";
import { BASE_STATS, SEED_ORDERS, TOP_PRODUCTS } from "@/lib/demo";

const SEED_IDS = new Set(SEED_ORDERS.map((o) => o.id));

export function isLiveOrder(order: Order): boolean {
  return !SEED_IDS.has(order.id);
}

export interface DashboardStats {
  sales: number;
  orders: number;
  online: number;
  counter: number;
  productsSold: number;
  onlineSales: number;
  counterSales: number;
  liveOrders: Order[];
  liveSales: number;
  liveCount: number;
  avgTicket: number;
  topProducts: { name: string; units: number; revenue: number }[];
}

export function useDashboardStats(): DashboardStats {
  const { orders } = useShop();

  return useMemo(() => {
    const live = orders.filter(isLiveOrder);
    const liveSales = live.reduce((s, o) => s + o.total, 0);
    const liveUnits = live.reduce(
      (s, o) => s + o.items.reduce((n, i) => n + i.qty, 0),
      0,
    );
    const liveOnline = live.filter((o) => o.channel === "online");
    const liveCounter = live.filter((o) => o.channel === "counter");

    const unitsByName = new Map<string, { units: number; revenue: number }>();
    for (const o of live) {
      for (const item of o.items) {
        const prev = unitsByName.get(item.name) ?? { units: 0, revenue: 0 };
        prev.units += item.qty;
        prev.revenue += item.qty * item.price;
        unitsByName.set(item.name, prev);
      }
    }

    const topProducts = [
      ...TOP_PRODUCTS.map((t) => {
        const extra = unitsByName.get(t.name);
        return {
          name: t.name,
          units: t.units + (extra?.units ?? 0),
          revenue: t.revenue + (extra?.revenue ?? 0),
        };
      }),
      ...[...unitsByName.entries()]
        .filter(([name]) => !TOP_PRODUCTS.some((t) => t.name === name))
        .map(([name, v]) => ({ name, units: v.units, revenue: v.revenue })),
    ]
      .sort((a, b) => b.units - a.units)
      .slice(0, 6);

    const sales = BASE_STATS.sales + liveSales;

    return {
      sales,
      orders: BASE_STATS.orders + live.length,
      online: BASE_STATS.online + liveOnline.length,
      counter: BASE_STATS.counter + liveCounter.length,
      productsSold: BASE_STATS.productsSold + liveUnits,
      onlineSales: BASE_STATS.onlineSales + liveOnline.reduce((s, o) => s + o.total, 0),
      counterSales: BASE_STATS.counterSales + liveCounter.reduce((s, o) => s + o.total, 0),
      liveOrders: live,
      liveSales,
      liveCount: live.length,
      avgTicket: Math.round(sales / (BASE_STATS.orders + live.length)),
      topProducts,
    };
  }, [orders]);
}

export function statusTone(status: string): string {
  switch (status) {
    case "new":
      return "bg-honey text-ink";
    case "preparing":
      return "bg-brand text-white";
    case "ready":
      return "bg-fresh text-ink";
    case "completed":
      return "bg-mist text-brand";
    default:
      return "bg-destructive/15 text-destructive";
  }
}
