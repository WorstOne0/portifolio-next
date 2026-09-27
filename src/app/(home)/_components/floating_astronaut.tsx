"use client";

// Next
import { motion, useScroll, useTransform } from "framer-motion";
// Icons, Font Awesome on purpose: Material has no astronaut
import { FaUserAstronaut } from "react-icons/fa";

export default function FloatingAstronaut({ scrollRef }: { scrollRef: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const y = useTransform(scrollYProgress, [0, 1], ["10vh", "75vh"]);

  return (
    <motion.div aria-hidden="true" style={{ y }} className="pointer-events-none fixed top-0 right-[2.4rem] z-[15] flex flex-col items-center select-none">
      <div className="h-[6rem] w-px bg-linear-to-b from-transparent to-ink/15" />

      <motion.div
        className="relative flex items-center justify-center"
        animate={{ rotate: [0, 8, -6, 4, -8, 0], y: [0, -8, 4, -4, 6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaUserAstronaut className="glow-astronaut text-[3.2rem] text-ink/60" />
        <div className="halo pointer-events-none absolute h-[6rem] w-[6rem] rounded-full" />
      </motion.div>

      <div className="h-[4rem] w-px bg-linear-to-b from-ink/10 to-transparent" />
    </motion.div>
  );
}
