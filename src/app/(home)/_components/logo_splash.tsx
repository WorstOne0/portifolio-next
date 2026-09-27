"use client";

// Next
import Image from "next/image";
import { motion } from "framer-motion";

export default function LogoSplash() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-[1rem] bg-background">
      <motion.div className="relative mb-[1.8rem] flex items-center justify-center" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.8, delay: 1.6 }}>
        <Image src="/logo/logo.png" alt="Logo" width={200} height={200} priority />
      </motion.div>

      <motion.span className="mt-[1rem] text-[2.2rem] font-light italic tracking-[0.15rem] text-ink/90" animate={{ opacity: 0 }} transition={{ duration: 1, delay: 1.2 }}>
        Lucca Gabriel
      </motion.span>

      <motion.span className="text-[1.4rem] font-bold tracking-[0.35rem] text-ink/75" animate={{ opacity: 0 }} transition={{ duration: 0.8, delay: 1.6 }}>
        PORTIFOLIO
      </motion.span>
    </div>
  );
}
