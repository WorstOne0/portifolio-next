"use client";

// Next
import { motion } from "framer-motion";
// Controllers
import { useLanguageController } from "@/core/controllers";
// Models
import { TRANSLATIONS } from "@/core/models";
// Components
import SectionHeader from "./section_header";
// Icons
import { FaDocker, FaGitAlt, FaNodeJs, FaPython, FaReact, FaVuejs } from "react-icons/fa";
import { MdOutlineApi, MdOutlineBuild, MdOutlineDashboard, MdOutlineDns, MdOutlinePhoneIphone } from "react-icons/md";
import {
  SiCplusplus,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiGooglemaps,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiQuasar,
  SiRabbitmq,
  SiShadcnui,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

// Every logo in its brand colour; each category carries its own accent
const CATEGORIES = [
  {
    key: "frontend",
    color: "#3b82f6",
    Icon: MdOutlineDashboard,
    skills: [
      { name: "React", Icon: FaReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
      { name: "Vue.js", Icon: FaVuejs, color: "#4FC08D" },
      { name: "Quasar", Icon: SiQuasar, color: "#1976D2" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
      { name: "ShadCN", Icon: SiShadcnui, color: "#ffffff" },
    ],
  },
  {
    key: "backend",
    color: "#10b981",
    Icon: MdOutlineDns,
    skills: [
      { name: "Node.js", Icon: FaNodeJs, color: "#68A063" },
      { name: "Express", Icon: SiExpress, color: "#ffffff" },
      { name: "Python", Icon: FaPython, color: "#FFD43B" },
      { name: "C/C++", Icon: SiCplusplus, color: "#00599C" },
      { name: "RabbitMQ", Icon: SiRabbitmq, color: "#FF6600" },
      { name: "Socket.IO", Icon: SiSocketdotio, color: "#ffffff" },
      { name: "REST API", Icon: MdOutlineApi, color: "#a78bfa" },
    ],
  },
  {
    key: "mobile",
    color: "#f59e0b",
    Icon: MdOutlinePhoneIphone,
    skills: [
      { name: "Flutter", Icon: SiFlutter, color: "#54C5F8" },
      { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
    ],
  },
  {
    key: "tools",
    color: "#8b5cf6",
    Icon: MdOutlineBuild,
    skills: [
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
      { name: "Git", Icon: FaGitAlt, color: "#F05032" },
      { name: "Docker", Icon: FaDocker, color: "#2496ED" },
      { name: "Google Maps", Icon: SiGooglemaps, color: "#4285F4" },
    ],
  },
] as const;

export default function Skills() {
  const lang = useLanguageController((state) => state.lang);

  const t = TRANSLATIONS[lang];

  return (
    <section id="skills" className="min-h-screen w-full px-[8rem] py-[8rem] flex items-start justify-center">
      <div className="w-full max-w-[1200px] flex flex-col gap-[4rem]">
        <SectionHeader title={t.skills.title} subtitle={t.skills.subtitle} />

        <div className="grid grid-cols-2 gap-[2.4rem]">
          {CATEGORIES.map((category, categoryIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="p-[2.8rem] flex flex-col rounded-[18px] border border-ink/[0.09] border-t-[3px] border-t-(--category) bg-ink/5 transition-[border-color,box-shadow] duration-200 hover:border-(--category) hover:shadow-lift"
              style={{ "--category": category.color } as React.CSSProperties}
            >
              <div className="mb-[1.6rem] flex items-center gap-[1.2rem]">
                <span className="shrink-0 flex items-center text-[2.8rem]" style={{ color: category.color }}>
                  <category.Icon />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[1.6rem] leading-[1.2] font-bold tracking-[0.04em] uppercase" style={{ color: category.color }}>
                    {t.skills.categories[category.key]}
                  </h3>
                  <p className="mt-[0.25rem] text-[1.25rem] leading-[1.3] text-meta">{t.skills.categoryDesc[category.key]}</p>
                </div>
                <span className="shrink-0 font-mono text-[2.6rem] leading-none font-extrabold text-ink/6">{category.skills.length}</span>
              </div>

              <div className="mb-[2rem] h-px w-full rounded-[1px]" style={{ background: `${category.color}28` }} />

              <div className="flex flex-wrap gap-[0.9rem]">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.08 + index * 0.04 }}
                    className="px-[1.3rem] py-[0.65rem] inline-flex items-center gap-[0.65rem] rounded-[8px] border border-ink/[0.09] bg-ink/[0.04] transition-[background,border-color,translate] duration-[180ms] hover:-translate-y-[2px] hover:border-ink/20 hover:bg-ink/[0.09]"
                  >
                    <span className="flex items-center text-[1.7rem]" style={{ color: skill.color }}>
                      <skill.Icon />
                    </span>
                    <span className="text-[1.35rem] whitespace-nowrap text-ink/80">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
