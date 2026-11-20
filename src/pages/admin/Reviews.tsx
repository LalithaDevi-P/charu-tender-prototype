import { motion } from "framer-motion";
import { Star, ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { REVIEWS, BIZ } from "@/lib/demo";

const DISTRIBUTION = [
  { stars: 5, pct: 84 },
  { stars: 4, pct: 11 },
  { stars: 3, pct: 3 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

export default function AdminReviews() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:py-8">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
        Owner dashboard
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Reviews</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        What customers are saying about Charu Tender on Google.
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-[320px_1fr]">
        {/* summary */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-fit rounded-3xl border border-line bg-white p-6 text-center"
        >
          <p className="text-[64px] font-extrabold leading-none tracking-tight text-ink">
            {BIZ.rating}
          </p>
          <div className="mt-3 flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(BIZ.rating)
                    ? "fill-honey text-honey"
                    : "text-line"
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-[13.5px] text-muted-foreground">
            Based on {BIZ.reviews} Google reviews
          </p>

          <ul className="mt-6 space-y-2 text-left">
            {DISTRIBUTION.map((d) => (
              <li key={d.stars} className="flex items-center gap-3 text-[12.5px]">
                <span className="w-6 font-bold text-ink">{d.stars}★</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-mist">
                  <span
                    className="block h-full rounded-full bg-brand"
                    style={{ width: `${d.pct}%` }}
                  />
                </span>
                <span className="w-9 text-right text-muted-foreground">{d.pct}%</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={() =>
              toast.success("Reply drafted", {
                description: "Prototype only — no reply is actually posted.",
              })
            }
            variant="outline"
            className="mt-6 w-full rounded-full border-line bg-white font-semibold text-ink hover:border-brand hover:text-brand"
          >
            <ThumbsUp className="h-4 w-4" />
            Reply to all
          </Button>
        </motion.section>

        {/* list */}
        <div className="space-y-4">
          {REVIEWS.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="rounded-3xl border border-line bg-white p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-[14px] font-extrabold text-white">
                    {r.initials}
                  </span>
                  <div>
                    <p className="text-[15px] font-bold text-ink">{r.name}</p>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star
                            key={s}
                            className={`h-3.5 w-3.5 ${
                              s < r.rating ? "fill-honey text-honey" : "text-line"
                            }`}
                          />
                        ))}
                      </span>
                      <span className="text-[12px] text-muted-foreground">{r.when}</span>
                    </div>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    toast.success(`Reply opened for ${r.name}`, {
                      description: "Prototype only.",
                    })
                  }
                  className="rounded-full border-line font-semibold text-ink hover:border-brand hover:text-brand"
                >
                  Reply
                </Button>
              </div>

              <p className="mt-4 text-[14.5px] leading-relaxed text-ink/75">“{r.text}”</p>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
