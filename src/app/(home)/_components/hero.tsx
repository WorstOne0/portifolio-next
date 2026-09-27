"use client";

// Next
import { motion } from "framer-motion";
// Controllers
import { useLanguageController } from "@/core/controllers";
// Models
import { TRANSLATIONS } from "@/core/models";
// Icons
import { FaDocker, FaGitAlt, FaNodeJs, FaPython, FaReact, FaVuejs } from "react-icons/fa";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { SiFirebase, SiFlutter, SiMongodb, SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";

// Each logo in its brand colour, scattered over the 46rem field
const TECH_ICONS = [
  { Icon: FaReact, name: "React", color: "#61DAFB", top: "5%", left: "14%" },
  { Icon: SiNextdotjs, name: "Next.js", color: "#ffffff", top: "4%", left: "58%" },
  { Icon: FaDocker, name: "Docker", color: "#2496ED", top: "7%", left: "86%" },
  { Icon: SiMongodb, name: "MongoDB", color: "#47A248", top: "28%", left: "3%" },
  { Icon: SiTypescript, name: "TypeScript", color: "#3178C6", top: "30%", left: "36%" },
  { Icon: SiFlutter, name: "Flutter", color: "#54C5F8", top: "26%", left: "80%" },
  { Icon: FaVuejs, name: "Vue.js", color: "#4FC08D", top: "57%", left: "14%" },
  { Icon: FaNodeJs, name: "Node.js", color: "#68A063", top: "55%", left: "58%" },
  { Icon: SiTailwindcss, name: "Tailwind", color: "#38BDF8", top: "55%", left: "92%" },
  { Icon: SiFirebase, name: "Firebase", color: "#FFCA28", top: "82%", left: "4%" },
  { Icon: FaPython, name: "Python", color: "#FFD43B", top: "84%", left: "42%" },
  { Icon: FaGitAlt, name: "Git", color: "#F05032", top: "82%", left: "78%" },
];

export default function Hero({ scrollRef }: { scrollRef: React.RefObject<HTMLElement | null> }) {
  const lang = useLanguageController((state) => state.lang);

  const t = TRANSLATIONS[lang];

  const scrollToAbout = () => scrollRef.current?.scrollTo({ top: document.getElementById("about")?.offsetTop, behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen w-full px-[6rem] py-[6rem] flex flex-col items-center justify-center">
      <div className="w-full max-w-[1200px] flex items-center justify-center gap-[4rem]">
        <div className="min-w-0 flex-1 flex flex-col items-start gap-[1.2rem]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-[0.4rem] px-[1.4rem] py-[0.5rem] inline-flex items-center gap-[0.7rem] rounded-full border border-accent-deep/50 bg-accent-deep/10 text-[1.25rem] tracking-[0.04em] text-lavender"
          >
            <span>🚀</span>
            <span>{t.hero.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="bg-linear-to-r from-highlight to-lavender bg-clip-text text-[clamp(4.2rem,7vw,8.4rem)] leading-none font-extrabold text-transparent"
          >
            {t.hero.name}
          </motion.h1>

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.22 }} className="flex flex-wrap items-baseline gap-[0.8rem]">
            <h2 className="text-[clamp(2rem,2.8vw,3.2rem)] leading-[1.1] font-bold whitespace-nowrap text-ink/88">{t.hero.title}</h2>
            <span className="text-[clamp(1.8rem,2.4vw,2.8rem)] font-light text-ink/25">/</span>
            <span className="text-[clamp(1.6rem,2.2vw,2.6rem)] font-medium whitespace-nowrap text-accent">{t.hero.role}</span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.36 }} className="text-[1.6rem] leading-[1.6] tracking-[0.01em] text-meta">
            {t.hero.subtitle}
          </motion.p>

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.52 }}
            onClick={scrollToAbout}
            className="mt-[1.4rem] px-[3rem] py-[1.2rem] inline-flex items-center gap-[0.8rem] rounded-[8px] bg-action text-[1.6rem] font-semibold text-ink transition-[background,translate] duration-200 hover:-translate-y-[2px] hover:bg-action-hover"
          >
            <MdOutlineRocketLaunch className="text-[1.6rem]" />
            {t.hero.cta}
          </motion.button>
        </div>

        <motion.div className="relative h-[46rem] w-[46rem] shrink-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
          {TECH_ICONS.map(({ Icon, name, color, top, left }, index) => (
            <motion.div
              key={name}
              style={{ top, left }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.07 }}
              className="absolute min-w-[7rem] -translate-x-1/2 -translate-y-1/2 px-[0.9rem] py-[1.1rem] flex flex-col items-center justify-center gap-[0.5rem] rounded-[12px] border border-ink/[0.09] bg-ink/5 backdrop-blur-[4px] transition-[background,border-color,translate] duration-200 hover:-translate-y-[calc(50%_+_5px)] hover:border-ink/18 hover:bg-ink/8"
            >
              <span className="flex items-center justify-center text-[2.8rem]" style={{ color }}>
                <Icon />
              </span>
              <span className="text-[1.05rem] whitespace-nowrap text-ink/60">{name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.button
        type="button"
        aria-label="scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        onClick={scrollToAbout}
        className="absolute bottom-[2.4rem] left-1/2 -translate-x-1/2 p-[0.4rem] flex flex-col items-center gap-[0.4rem] text-ink/40 transition-colors duration-200 hover:text-ink/75"
      >
        <div className="animate-rocket-bounce">
          <MdOutlineRocketLaunch className="mb-[10px] block rotate-135 text-[1.8rem]" />
        </div>
        <span className="mt-[10px] text-[1rem] font-semibold tracking-[0.12em] uppercase">Scroll Down</span>
      </motion.button>
    </section>
  );
}
