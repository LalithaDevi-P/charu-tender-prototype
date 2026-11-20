import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardList,
  IndianRupee,
  Package,
  ShoppingBasket,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShop, orderTime, PAYMENT_LABEL } from "@/store/shop";
import { useDashboardStats, statusTone } from "@/lib/stats";
import { CATEGORY_SALES, REVIEWS, SALES_SERIES, BIZ } from "@/lib/demo";
import { inr } from "@/lib/catalog";

const PIE_COLORS = ["#087F5B", "#B7D96A"];

function KpiCard({
  icon: Icon,
  label,
  value,
  sub,
  delay,
  tone = "bg-mist text-brand",
}: {
  icon: typeof Package;
  label: string;
  value: string;
  sub: string;
  delay: number;
  tone?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="rounded-3xl border border-line bg-white p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tone}`}>
          <Icon className="h-5 w-5" />
        </span>
        <span className="flex items-center gap-1 rounded-full bg-fresh/30 px-2 py-1 text-[11px] font-bold text-brand">
          <ArrowUpRight className="h-3 w-3" />
          live
        </span>
      </div>
      <p className="mt-4 text-[26px] font-extrabold leading-none tracking-tight text-ink">
        {value}
      </p>
      <p className="mt-2 text-[13.5px] font-semibold text-ink/70">{label}</p>
      <p className="mt-0.5 text-[12px] text-muted-foreground">{sub}</p>
    </motion.div>
  );
}

function Panel({
  title,
  action,
  children,
  className = "",
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-3xl border border-line bg-white p-5 sm:p-6 ${className}`}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-[17px] font-extrabold tracking-tight text-ink">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export default function AdminDashboard() {
  const { orders } = useShop();
  const stats = useDashboardStats();

  const series = SALES_SERIES.map((d, i) =>
    i === SALES_SERIES.length - 1
      ? { ...d, sales: stats.sales, online: stats.onlineSales, counter: stats.counterSales }
      : d,
  );

  const split = [
    { name: "Counter", value: stats.counterSales },
    { name: "Online", value: stats.onlineSales },
  ];
  const splitTotal = stats.counterSales + stats.onlineSales || 1;

  const recent = [...orders]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 7);

  const maxTop = stats.topProducts[0]?.units ?? 1;

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:py-8">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
            Owner dashboard
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Good to see you
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            · {BIZ.name}
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Button asChild variant="outline" className="rounded-full border-line bg-white font-semibold text-ink hover:border-brand hover:text-brand">
            <Link to="/admin/orders">
              <ClipboardList className="h-4 w-4" />
              All orders
            </Link>
          </Button>
          <Button asChild className="rounded-full font-semibold">
            <Link to="/admin/pos">
              <Store className="h-4 w-4" />
              Open POS
            </Link>
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-5">
        <KpiCard
          icon={IndianRupee}
          label="Today's Sales"
          value={inr(stats.sales)}
          sub={`Avg. bill ${inr(stats.avgTicket)}`}
          delay={0}
          tone="bg-brand text-white"
        />
        <KpiCard icon={ClipboardList} label="Total Orders" value={String(stats.orders)} sub="Counter + online" delay={0.05} />
        <KpiCard icon={ShoppingBasket} label="Online Orders" value={String(stats.online)} sub={inr(stats.onlineSales)} delay={0.1} />
        <KpiCard icon={Store} label="Counter Bills" value={String(stats.counter)} sub={inr(stats.counterSales)} delay={0.15} />
        <KpiCard icon={Package} label="Products Sold" value={String(stats.productsSold)} sub="Units today" delay={0.2} />
      </div>

      {/* charts */}
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.7fr_1fr]">
        <Panel
          title="Sales Overview"
          action={
            <span className="rounded-full bg-mist px-3 py-1 text-[12px] font-bold text-brand">
              Last 7 days
            </span>
          }
        >
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series} margin={{ top: 6, right: 8, left: -14, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#087F5B" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#087F5B" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#DCEAE3" strokeDasharray="4 6" vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#5A7A6F", fontSize: 12, fontWeight: 600 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#5A7A6F", fontSize: 12 }}
                  tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
                />
                <Tooltip
                  cursor={{ stroke: "#087F5B", strokeDasharray: "4 4" }}
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid #DCEAE3",
                    background: "#fff",
                    fontSize: 13,
                    boxShadow: "0 12px 30px -18px rgba(22,53,45,0.6)",
                  }}
                  formatter={(value: number | string, name: string) => [
                    inr(Number(value)),
                    name === "sales" ? "Total sales" : name,
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#087F5B"
                  strokeWidth={3}
                  fill="url(#salesFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4">
            {[
              { label: "Mon–Thu avg", value: Math.round((6120 + 7240 + 6880 + 8010) / 4) },
              { label: "Weekend peak", value: 11250 },
              { label: "Today", value: stats.sales },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-mist px-3 py-2.5">
                <p className="text-[11px] font-semibold text-muted-foreground">{s.label}</p>
                <p className="mt-0.5 text-[15px] font-extrabold text-ink">{inr(s.value)}</p>
              </div>
            ))}
          </div>
        </Panel>

        <div className="grid gap-5">
          <Panel title="Online vs Counter">
            <div className="flex items-center gap-4">
              <div className="h-[150px] w-[150px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={split}
                      dataKey="value"
                      innerRadius={44}
                      outerRadius={70}
                      paddingAngle={3}
                      stroke="none"
                    >
                      {split.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: 14,
                        border: "1px solid #DCEAE3",
                        background: "#fff",
                        fontSize: 13,
                      }}
                      formatter={(value: number | string, name: string) => [
                        inr(Number(value)),
                        name,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <ul className="flex-1 space-y-3">
                {split.map((s, i) => (
                  <li key={s.name}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-[14px] font-bold text-ink">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ background: PIE_COLORS[i] }}
                        />
                        {s.name}
                      </span>
                      <span className="text-[13.5px] font-extrabold text-ink">
                        {Math.round((s.value / splitTotal) * 100)}%
                      </span>
                    </div>
                    <p className="mt-0.5 text-[13px] text-muted-foreground">{inr(s.value)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Panel>

          <Panel
            title="Top Selling Products"
            action={
              <Link
                to="/admin/products"
                className="text-[13px] font-semibold text-brand hover:underline"
              >
                View products →
              </Link>
            }
          >
            <ul className="space-y-3.5">
              {stats.topProducts.slice(0, 5).map((p, i) => (
                <li key={p.name}>
                  <div className="flex items-center justify-between gap-3 text-[13.5px]">
                    <span className="truncate font-semibold text-ink">
                      <span className="mr-2 text-muted-foreground">{i + 1}.</span>
                      {p.name}
                    </span>
                    <span className="shrink-0 font-extrabold text-brand">
                      {p.units} sold
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-mist">
                    <div
                      className="h-full rounded-full bg-brand transition-all duration-700"
                      style={{ width: `${(p.units / maxTop) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>

      {/* recent + category */}
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.7fr_1fr]">
        <Panel
          title="Recent Orders"
          action={
            <Link
              to="/admin/orders"
              className="inline-flex items-center gap-1 text-[13px] font-semibold text-brand hover:underline"
            >
              See all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          <div className="-mx-2 overflow-x-auto">
            <table className="w-full min-w-[560px] border-separate border-spacing-0 text-left">
              <thead>
                <tr className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  <th className="px-2 pb-3 font-bold">Order</th>
                  <th className="px-2 pb-3 font-bold">Customer</th>
                  <th className="px-2 pb-3 font-bold">Channel</th>
                  <th className="px-2 pb-3 font-bold">Payment</th>
                  <th className="px-2 pb-3 font-bold">Time</th>
                  <th className="px-2 pb-3 text-right font-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => (
                  <tr key={o.id} className="border-t border-line">
                    <td className="px-2 py-3 text-[13.5px] font-extrabold text-ink">
                      {o.id}
                      <span
                        className={`ml-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${statusTone(o.status)}`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="max-w-[160px] truncate px-2 py-3 text-[13.5px] text-ink/75">
                      {o.customer.name}
                    </td>
                    <td className="px-2 py-3 text-[13px]">
                      <span className="rounded-full bg-mist px-2.5 py-1 text-[11.5px] font-bold uppercase text-brand">
                        {o.channel}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-[13px] font-semibold text-ink/70">
                      {PAYMENT_LABEL[o.payment]}
                    </td>
                    <td className="px-2 py-3 text-[13px] text-muted-foreground">
                      {orderTime(o.createdAt)}
                    </td>
                    <td className="px-2 py-3 text-right text-[14px] font-extrabold text-ink">
                      {inr(o.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="grid gap-5">
          <Panel title="Sales by Category">
            <ul className="space-y-3.5">
              {CATEGORY_SALES.map((c, i) => {
                const max = CATEGORY_SALES[0].value;
                return (
                  <li key={c.name}>
                    <div className="flex items-center justify-between text-[13.5px]">
                      <span className="font-semibold text-ink">{c.name}</span>
                      <span className="font-extrabold text-ink">{inr(c.value)}</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-mist">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(c.value / max) * 100}%`,
                          background: PIE_COLORS[i % 2] ?? "#087F5B",
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel
            title="Latest review"
            action={
              <Link
                to="/admin/reviews"
                className="text-[13px] font-semibold text-brand hover:underline"
              >
                All reviews →
              </Link>
            }
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-[14px] font-extrabold text-white">
                {REVIEWS[0].initials}
              </span>
              <div>
                <p className="text-[14.5px] font-bold text-ink">{REVIEWS[0].name}</p>
                <p className="text-[12px] text-muted-foreground">{REVIEWS[0].when}</p>
              </div>
              <span className="ml-auto rounded-full bg-fresh/40 px-2.5 py-1 text-[13px] font-extrabold text-ink">
                {BIZ.rating} ★
              </span>
            </div>
            <p className="mt-3 line-clamp-3 text-[13.5px] leading-relaxed text-ink/70">
              “{REVIEWS[0].text}”
            </p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
