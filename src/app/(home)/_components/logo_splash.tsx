"use client";

// Next
import Image from "next/image";
import { motion } from "framer-motion";
// Controllers
import { useLanguageController } from "@/core/controllers";
// Models
import { TRANSLATIONS } from "@/core/models";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function LogoSplash() {
  const lang = useLanguageController((state) => state.lang);

  const t = TRANSLATIONS[lang];

  return (
    <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="fixed inset-0 z-30 flex flex-col items-center justify-center">
      {/* Shares layoutId "logo" with the hero's orbit: when the splash leaves, the logo flies into it */}
      <motion.div layoutId="logo" className="relative h-[16rem] w-[16rem]">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: EASE_OUT }} className="relative h-full w-full">
          <Image src="/logo/logo.png" alt="Logo" fill sizes="160px" priority />
        </motion.div>
      </motion.div>

      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: EASE_OUT }}
        className="mt-[3.2rem] font-display text-[2.4rem] font-semibold tracking-[-0.02em] text-ink/92"
      >
        Lucca Gabriel
      </motion.span>

      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: EASE_OUT }}
        className="mt-[0.8rem] pl-[0.35em] font-mono text-[1.2rem] tracking-[0.35em] text-lavender/80 uppercase"
      >
        {t.splash.label}
      </motion.span>

      <span className="mt-[1.8rem] h-[2px] w-[14rem] overflow-hidden rounded-full bg-ink/10">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
          className="block h-full origin-left bg-linear-to-r from-highlight to-lavender"
        />
      </span>
    </motion.div>
  );
}
