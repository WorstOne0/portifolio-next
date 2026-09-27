"use client";

// Next
import { motion } from "framer-motion";

export default function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col gap-[0.8rem]">
      <span className="font-mono text-[1.3rem] tracking-[0.06em] text-accent">{`// ${title.toLowerCase()}`}</span>
      <h2 className="text-[clamp(2.8rem,4vw,4.2rem)] leading-[1.1] font-extrabold text-ink">{title}</h2>
      {subtitle && <p className="text-[1.6rem] text-meta">{subtitle}</p>}
    </motion.div>
  );
}
