"use client";

// Next
import Image from "next/image";
import { motion } from "framer-motion";
// Controllers
import { useLanguageController } from "@/core/controllers";
// Models
import { PROJECTS, TRANSLATIONS } from "@/core/models";
// Utils
import { SKILL_COUNT } from "../_utils/skills";
// Icons
import { FaDocker, FaGitAlt, FaNodeJs, FaPython, FaReact, FaVuejs } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown, MdOutlineRocketLaunch } from "react-icons/md";
import { SiFirebase, SiFlutter, SiMongodb, SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";

// From the centre out: mobile, front-end, back-end and tools; size is the ring's share of the orbit, in %. Each logo
// sits at an angle in degrees and counter-spins at its ring's speed, so it stays upright while the ring turns.
const ORBITS = [
  {
    size: 39,
    ring: "border-highlight/30 animate-orbit-40",
    counter: "animate-orbit-40-reverse",
    logos: [
      { Icon: SiFlutter, name: "Flutter", color: "#54C5F8", angle: -30 },
      { Icon: SiFirebase, name: "Firebase", color: "#FFCA28", angle: 150 },
    ],
  },
  {
    size: 64,
    ring: "border-dashed border-lavender/25 animate-orbit-70-reverse",
    counter: "animate-orbit-70",
    logos: [
      { Icon: FaReact, name: "React", color: "#61DAFB", angle: -75 },
      { Icon: SiTypescript, name: "TypeScript", color: "#3178C6", angle: -3 },
      { Icon: SiTailwindcss, name: "Tailwind", color: "#38BDF8", angle: 69 },
      { Icon: FaVuejs, name: "Vue.js", color: "#4FC08D", angle: 141 },
      { Icon: SiNextdotjs, name: "Next.js", color: "#ffffff", angle: 213 },
    ],
  },
  {
    size: 89,
    ring: "border-ink/7 animate-orbit-100",
    counter: "animate-orbit-100-reverse",
    logos: [
      { Icon: FaNodeJs, name: "Node.js", color: "#68A063", angle: -160 },
      { Icon: SiMongodb, name: "MongoDB", color: "#47A248", angle: -88 },
      { Icon: FaDocker, name: "Docker", color: "#2496ED", angle: -16 },
      { Icon: FaPython, name: "Python", color: "#FFD43B", angle: 56 },
      { Icon: FaGitAlt, name: "Git", color: "#F05032", angle: 128 },
    ],
  },
];

export default function Hero({ scrollRef }: { scrollRef: React.RefObject<HTMLElement | null> }) {
  const lang = useLanguageController((state) => state.lang);

  const t = TRANSLATIONS[lang];
  const stats = [
    { value: "3+", label: t.hero.stats.years },
    { value: String(PROJECTS.length).padStart(2, "0"), label: t.hero.stats.projects },
    { value: String(SKILL_COUNT), label: t.hero.stats.skills },
  ];

  const scrollTo = (id: string) => scrollRef.current?.scrollTo({ top: document.getElementById(id)?.offsetTop, behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen w-full px-[9.6rem] flex items-center">
      <div className="mx-auto w-full max-w-[1180px] grid grid-cols-[minmax(0,1fr)_auto] items-center gap-[4rem]">
        <div className="min-w-0 flex flex-col items-start">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="h-[3.2rem] pr-[1.4rem] pl-[1.1rem] inline-flex items-center gap-[0.9rem] rounded-full border border-lavender/28 bg-accent-deep/12 font-mono text-[1.2rem] leading-none tracking-[0.08em] text-lavender uppercase"
          >
            <MdOutlineRocketLaunch className="text-[1.5rem]" />
            {t.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-[2.8rem] font-display text-[clamp(7.2rem,8.6vw,12.4rem)] leading-[0.9] font-bold tracking-[-0.05em] text-ink"
          >
            {t.hero.name.split(" ").map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-[3rem] font-display text-[2.2rem] leading-[1.4] font-medium tracking-[-0.01em] text-ink/88"
          >
            {t.hero.title}
            <span className="block text-lavender">{t.hero.role}</span>
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.36 }} className="mt-[1.8rem] max-w-[52rem] text-[1.7rem] leading-[1.7] text-ink/60">
            {t.hero.subtitle}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="mt-[3.6rem] flex flex-wrap gap-[1.2rem]">
            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="h-[5.2rem] pr-[2.2rem] pl-[1.9rem] inline-flex items-center gap-[1rem] rounded-[10px] bg-action text-[1.5rem] font-bold text-ink shadow-button transition-[background,translate] duration-200 hover:-translate-y-[2px] hover:bg-action-hover"
            >
              <MdOutlineRocketLaunch className="text-[1.8rem]" />
              {t.hero.cta}
            </button>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="h-[5.2rem] px-[2.2rem] inline-flex items-center rounded-[10px] border border-ink/14 bg-ink/3 text-[1.5rem] font-semibold text-ink/88 transition-[background,border-color] duration-200 hover:border-ink/24 hover:bg-ink/8"
            >
              {t.hero.contact}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-[5.6rem] pt-[2.4rem] w-full max-w-[52rem] grid grid-cols-3 gap-[2.4rem] border-t border-ink/8"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <span className="block font-display text-[3rem] leading-none font-semibold tracking-[-0.02em] tabular-nums text-ink">{stat.value}</span>
                <span className="mt-[0.8rem] block text-[1.3rem] text-ink/50">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative aspect-square w-[clamp(40rem,38vw,56rem)]"
        >
          <div className="orb-glow absolute inset-[9%] rounded-full animate-orb-pulse" />

          {ORBITS.map((orbit) => (
            <div key={orbit.size} className={`absolute rounded-full border motion-reduce:animate-none ${orbit.ring}`} style={{ inset: `${(100 - orbit.size) / 2}%` }}>
              {orbit.logos.map(({ Icon, name, color, angle }) => (
                <span
                  key={name}
                  className="absolute size-[4.8rem] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-ink/10 bg-section shadow-[0_0_0_0.5rem_var(--background)]"
                  style={{ left: `${50 + 50 * Math.cos((angle * Math.PI) / 180)}%`, top: `${50 + 50 * Math.sin((angle * Math.PI) / 180)}%` }}
                >
                  <span className={`flex text-[2.2rem] motion-reduce:animate-none ${orbit.counter}`} style={{ color }}>
                    <Icon />
                  </span>
                </span>
              ))}
            </div>
          ))}

          <div className="orb-core absolute inset-[38%] flex items-center justify-center rounded-full">
            <div className="relative size-[68%]">
              <Image src="/logo/logo.png" alt="" fill sizes="92px" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-[2.8rem] left-1/2 -translate-x-1/2 p-[0.4rem] flex flex-col items-center gap-[0.4rem] font-mono text-[1rem] tracking-[0.18em] text-ink/40 uppercase transition-colors duration-200 hover:text-ink/75"
      >
        {t.hero.scroll}
        <MdOutlineKeyboardArrowDown className="animate-scroll-bounce text-[1.8rem]" />
      </motion.button>
    </section>
  );
}
