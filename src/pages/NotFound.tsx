import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLockup } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="border-b border-line bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
          <Link to="/">
            <BrandLockup size={38} compact />
          </Link>
        </div>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex flex-1 items-center justify-center px-4 py-16"
      >
        <div className="max-w-lg text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-mist text-brand">
            <Search className="h-9 w-9" />
          </div>

          <p className="mt-7 text-xs font-bold uppercase tracking-[0.28em] text-brand">
            Error 404
          </p>
          <h1 className="mt-3 text-balance text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            This page isn&apos;t on the menu
          </h1>
          <p className="mt-3 text-[15.5px] leading-relaxed text-muted-foreground">
            The link you followed doesn&apos;t exist on the Charu Tender
            prototype. Let&apos;s get you back to something refreshing.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-7 font-semibold">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-line bg-white px-7 font-semibold text-ink hover:border-brand hover:text-brand"
            >
              <Link to="/menu">Browse the menu</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4 text-[13px]">
            <Link to="/staff" className="font-semibold text-brand hover:underline">
              Staff POS →
            </Link>
            <Link to="/admin" className="font-semibold text-brand hover:underline">
              Owner dashboard →
            </Link>
            <Link to="/contact" className="font-semibold text-brand hover:underline">
              Contact →
            </Link>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
