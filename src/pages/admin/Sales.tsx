import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart3, IndianRupee, TrendingUp } from "lucide-react";
import { useShop } from "@/store/shop";
import { useDashboardStats } from "@/lib/stats";
import { CATEGORY_SALES, SALES_SERIES } from "@/lib/demo";
import { inr } from "@/lib/catalog";

const RANGE = ["7d", "30d"] as const;
type Range = (typeof RANGE)[number];

const MULTI_30 = [
  { day: "W1", sales: 42100, online: 17800, counter: 24300 },
  { day: "W2", sales: 46800, online: 20100, counter: 26700 },
  { day: "W3", sales: 51200, online: 23400, counter: 27800 },
  { day: "W4", sales: 48950, online: 21600, counter: 27350 },
];

const PAYMENT_SPLIT = [
  { name: "UPI", value: 4620 },
  { name: "Cash", value: 2890 },
  { name: "Card", value: 940 },
];

const PAY_COLORS = ["#087F5B", "#B7D96A", "#F4C95D"];

function Panel({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-line bg-white p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-[17px] font-extrabold tracking-tight text-ink">{title}</h2>
        {hint && (
          <span className="rounded-full bg-mist px-3 py-1 text-[12px] font-bold text-brand">
            {hint}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

export default function AdminSales() {
  const { orders } = useShop();
  const stats = useDashboardStats();
  const [range, setRange] = useState<Range>("7d");

  const data = useMemo(
    () =>
      range === "7d"
        ? SALES_SERIES.map((d, i) =>
            i === SALES_SERIES.length - 1
              ? {
                  ...d,
                  sales: stats.sales,
                  online: stats.onlineSales,
                  counter: stats.counterSales,
                }
              : d,
          )
        : MULTI_30,
    [range, stats],
  );

  const best = data.reduce((a, b) => (b.sales > a.sales ? b : a), data[0]);
  const growth = Math.round(
    ((data[data.length - 1].sales - data[data.length - 2].sales) /
      data[data.length - 2].sales) *
      100,
  );
  const payTotal = PAYMENT_SPLIT.reduce((s, p) => s + p.value, 0);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
            Owner dashboard
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Sales</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            How the counter and the website are performing.
          </p>
        </div>

        <div className="flex rounded-full border border-line bg-white p-1">
          {RANGE.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`rounded-full px-5 py-2 text-[13.5px] font-bold transition-colors ${
                range === r ? "bg-brand text-white" : "text-ink/60 hover:text-ink"
              }`}
            >
              {r === "7d" ? "7 days" : "30 days"}
            </button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { icon: IndianRupee, label: "Revenue", value: inr(stats.sales), sub: `${range === "7d" ? "Today" : "This month"}` },
          { icon: TrendingUp, label: "Change vs previous", value: `${growth >= 0 ? "+" : ""}${growth}%`, sub: "Day over day" },
          { icon: BarChart3, label: "Best performing day", value: best.day, sub: inr(best.sales) },
          { icon: IndianRupee, label: "Average bill", value: inr(stats.avgTicket), sub: `${stats.orders} bills` },
        ].map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="rounded-3xl border border-line bg-white p-5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mist text-brand">
              <k.icon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-[24px] font-extrabold leading-none tracking-tight text-ink">
              {k.value}
            </p>
            <p className="mt-2 text-[13.5px] font-semibold text-ink/70">{k.label}</p>
            <p className="mt-0.5 text-[12px] text-muted-foreground">{k.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <Panel title="Sales trend" hint={range === "7d" ? "Last 7 days" : "Last 30 days"}>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 6, right: 8, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="gTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#087F5B" stopOpacity={0.32} />
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
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid #DCEAE3",
                    background: "#fff",
                    fontSize: 13,
                  }}
                  formatter={(value: number | string, name: string) => [
                    inr(Number(value)),
                    name,
                  ]}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: 13, fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  name="Total"
                  stroke="#087F5B"
                  strokeWidth={3}
                  fill="url(#gTotal)"
                />
                <Area
                  type="monotone"
                  dataKey="counter"
                  name="Counter"
                  stroke="#F4C95D"
                  strokeWidth={2}
                  fill="none"
                />
                <Area
                  type="monotone"
                  dataKey="online"
                  name="Online"
                  stroke="#B7D96A"
                  strokeWidth={2}
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Payment method split" hint="Today">
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PAYMENT_SPLIT}
                  dataKey="value"
                  innerRadius={52}
                  outerRadius={82}
                  paddingAngle={3}
                  stroke="none"
                >
                  {PAYMENT_SPLIT.map((_, i) => (
                    <Cell key={i} fill={PAY_COLORS[i]} />
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
          <ul className="mt-2 space-y-2">
            {PAYMENT_SPLIT.map((p, i) => (
              <li key={p.name} className="flex items-center justify-between text-[13.5px]">
                <span className="flex items-center gap-2 font-semibold text-ink">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: PAY_COLORS[i] }}
                  />
                  {p.name}
                </span>
                <span className="text-muted-foreground">
                  {Math.round((p.value / payTotal) * 100)}% · {inr(p.value)}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <Panel title="Sales by category" hint="Today">
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_SALES} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid stroke="#DCEAE3" strokeDasharray="4 6" vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  tick={{ fill: "#5A7A6F", fontSize: 11.5, fontWeight: 600 }}
                  angle={-14}
                  height={54}
                  textAnchor="end"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#5A7A6F", fontSize: 12 }}
                  tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
                />
                <Tooltip
                  cursor={{ fill: "#EFF8F3" }}
                  contentStyle={{
                    borderRadius: 14,
                    border: "1px solid #DCEAE3",
                    background: "#fff",
                    fontSize: 13,
                  }}
                  formatter={(value: number | string) => [inr(Number(value)), "Sales"]}
                />
                <Bar dataKey="value" radius={[10, 10, 4, 4]} fill="#087F5B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Top products by revenue">
          <ul className="space-y-3">
            {stats.topProducts.map((p, i) => (
              <li
                key={p.name}
                className="flex items-center justify-between gap-3 rounded-2xl bg-mist px-4 py-3"
              >
                <span className="min-w-0">
                  <span className="block truncate text-[13.5px] font-bold text-ink">
                    {i + 1}. {p.name}
                  </span>
                  <span className="text-[12px] text-muted-foreground">
                    {p.units} units sold
                  </span>
                </span>
                <span className="shrink-0 text-[14.5px] font-extrabold text-brand">
                  {inr(p.revenue)}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-4 rounded-2xl border border-dashed border-line px-4 py-3 text-[12.5px] leading-relaxed text-muted-foreground">
            {orders.filter((o) => o.channel === "counter").length} counter bills and{" "}
            {orders.filter((o) => o.channel === "online").length} online orders are
            loaded in this demo session.
          </p>
        </Panel>
      </div>
    </div>
  );
}
