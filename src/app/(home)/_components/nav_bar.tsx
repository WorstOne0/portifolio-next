"use client";

// Next
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
// Controllers
import { useLanguageController } from "@/core/controllers";
// Models
import { CONTACT, TRANSLATIONS, type Lang } from "@/core/models";
// Icons
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdOutlineHome, MdOutlinePersonOutline, MdOutlinePsychology, MdOutlineSend, MdOutlineWorkOutline } from "react-icons/md";

const SECTIONS = [
  { id: "home", Icon: MdOutlineHome },
  { id: "about", Icon: MdOutlinePersonOutline },
  { id: "skills", Icon: MdOutlinePsychology },
  { id: "projects", Icon: MdOutlineWorkOutline },
  { id: "contact", Icon: MdOutlineSend },
] as const;
const SOCIALS = [
  { label: "GitHub", href: CONTACT.github, Icon: FaGithub },
  { label: "LinkedIn", href: CONTACT.linkedin, Icon: FaLinkedin },
];
const LANGS: Lang[] = ["pt", "en"];

type Section = (typeof SECTIONS)[number]["id"];

export default function NavBar({ scrollRef }: { scrollRef: React.RefObject<HTMLElement | null> }) {
  const lang = useLanguageController((state) => state.lang);
  const setLang = useLanguageController((state) => state.setLang);

  const [activeSection, setActiveSection] = useState<Section>("home");
  const [progress, setProgress] = useState(0);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const maxScroll = scrollHeight - clientHeight;

      setProgress(maxScroll > 0 ? Math.min(1, scrollTop / maxScroll) : 0);
      // The last section whose top is within 140px of the top of the view
      setActiveSection(SECTIONS.filter(({ id }) => scrollTop >= (document.getElementById(id)?.offsetTop ?? Infinity) - 140).at(-1)?.id ?? "home");
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [scrollRef]);

  const scrollTo = (id: Section) => scrollRef.current?.scrollTo({ top: document.getElementById(id)?.offsetTop, behavior: "smooth" });

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-20 h-screen w-[8.8rem] shrink-0 pt-[2.2rem] pb-[1.8rem] flex flex-col items-center border-r border-ink/6 bg-background/80 backdrop-blur-[14px]"
    >
      <div
        className="absolute top-0 -right-px w-[2px] rounded-b-[2px] bg-linear-to-b from-highlight to-accent shadow-glow transition-[height] duration-[120ms] ease-linear"
        style={{ height: `${progress * 100}%` }}
      />

      <button type="button" aria-label={t.nav.home} onClick={() => scrollTo("home")} className="relative mb-[2.4rem] h-[5rem] w-[5rem] shrink-0">
        <Image src="/logo/logo.png" alt="Logo" fill sizes="50px" />
      </button>

      <nav className="min-h-0 w-full flex-1 px-[1rem] flex flex-col justify-center gap-[0.6rem]">
        {SECTIONS.map(({ id, Icon }) => {
          const isActive = id === activeSection;

          return (
            <button
              key={id}
              type="button"
              aria-current={isActive ? "true" : undefined}
              onClick={() => scrollTo(id)}
              className={`relative h-[6.2rem] flex flex-col items-center justify-center gap-[0.6rem] rounded-[10px] transition-[background,color] duration-[180ms] hover:bg-ink/6 ${isActive ? "bg-ink/6 text-ink" : "text-ink/45 hover:text-ink/88"}`}
            >
              {isActive && <span className="absolute top-1/2 -left-[1rem] h-[2.4rem] w-[3px] -translate-y-1/2 rounded-r-[3px] bg-highlight shadow-glow" />}
              <Icon className={`text-[2.2rem] ${isActive ? "glow-icon" : ""}`} />
              <span className="text-[1.1rem] leading-none font-semibold">{t.nav[id]}</span>
            </button>
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-[0.4rem]">
        {SOCIALS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="h-[4.4rem] w-[4.4rem] flex items-center justify-center rounded-[10px] text-[1.9rem] text-ink/45 transition-[background,color] duration-[180ms] hover:bg-ink/6 hover:text-ink/88"
          >
            <Icon />
          </a>
        ))}

        <span className="my-[1rem] h-px w-[3.2rem] bg-ink/8" />

        <div role="group" aria-label={t.language.label} className="p-[3px] flex flex-col gap-[2px] rounded-[10px] border border-ink/8">
          {LANGS.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={option === lang}
              onClick={() => setLang(option)}
              className={`h-[3.2rem] w-[5.2rem] rounded-[7px] font-mono text-[1.1rem] font-semibold tracking-[0.08em] uppercase transition-[background,color] duration-[180ms] ${option === lang ? "bg-ink/10 text-ink" : "text-ink/40 hover:text-ink/80"}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
