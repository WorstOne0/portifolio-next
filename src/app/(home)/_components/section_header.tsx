"use client";

// Next
import { motion } from "framer-motion";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function SectionHeader({ index, label, title, subtitle, count }: { index: number; label: string; title: string; subtitle?: string; count?: number }) {
  return (
    <motion.div initial="hidden" whileInView="shown" viewport={{ once: true }} className="flex flex-wrap items-end justify-between gap-[2.4rem]">
      <div className="flex flex-col gap-[1.6rem]">
        <motion.span
          variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-[1.2rem] font-mono text-[1.2rem] leading-none tracking-[0.14em] text-lavender uppercase"
        >
          <span className="text-ink/35">{String(index).padStart(2, "0")}</span>
          <motion.span
            variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
            className="h-px w-[2.8rem] origin-left bg-lavender/50"
          />
          {label}
        </motion.span>

        {/* The bottom padding keeps descenders (the j in Projetos) inside the mask */}
        <div className="overflow-hidden pb-[0.6rem]">
          <motion.h2
            variants={{ hidden: { y: "100%" }, shown: { y: 0 } }}
            transition={{ duration: 0.9, delay: 0.05, ease: EASE_OUT }}
            className="font-display text-[4.8rem] leading-[1.05] font-semibold tracking-[-0.035em] text-ink"
          >
            {title}
          </motion.h2>
        </div>
      </div>

      {subtitle && (
        <motion.p variants={{ hidden: { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0 } }} transition={{ duration: 0.7, delay: 0.25, ease: EASE_OUT }} className="mb-[0.6rem] text-[1.6rem] text-meta">
          {subtitle}
          {count !== undefined && <span className="font-mono text-ink/75">{` · ${String(count).padStart(2, "0")}`}</span>}
        </motion.p>
      )}
    </motion.div>
  );
}
