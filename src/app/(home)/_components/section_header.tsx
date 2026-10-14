"use client";

// Next
import { motion } from "framer-motion";

export default function SectionHeader({ index, label, title, subtitle, count }: { index: number; label: string; title: string; subtitle?: string; count?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-wrap items-end justify-between gap-[2.4rem]">
      <div className="flex flex-col gap-[1.6rem]">
        <span className="flex items-center gap-[1.2rem] font-mono text-[1.2rem] leading-none tracking-[0.14em] text-lavender uppercase">
          <span className="text-ink/35">{String(index).padStart(2, "0")}</span>
          <span className="h-px w-[2.8rem] bg-lavender/50" />
          {label}
        </span>
        <h2 className="font-display text-[4.8rem] leading-[1.05] font-semibold tracking-[-0.035em] text-ink">{title}</h2>
      </div>

      {subtitle && (
        <p className="mb-[0.6rem] text-[1.6rem] text-meta">
          {subtitle}
          {count !== undefined && <span className="font-mono text-ink/75">{` · ${String(count).padStart(2, "0")}`}</span>}
        </p>
      )}
    </motion.div>
  );
}
