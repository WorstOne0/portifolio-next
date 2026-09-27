"use client";

// Next
import { useEffect, useState } from "react";
import Image from "next/image";
// Controllers
import { useLanguageController } from "@/core/controllers";
// Models
import { TRANSLATIONS } from "@/core/models";
// Icons
import { MdOutlineHome, MdOutlinePersonOutline, MdOutlinePsychology, MdOutlineSend, MdOutlineWorkOutline } from "react-icons/md";

const SECTIONS = [
  { id: "home", Icon: MdOutlineHome },
  { id: "about", Icon: MdOutlinePersonOutline },
  { id: "skills", Icon: MdOutlinePsychology },
  { id: "projects", Icon: MdOutlineWorkOutline },
  { id: "contact", Icon: MdOutlineSend },
] as const;
const DECORATIONS = ["{...}", "</>", ">>>", "~/"];

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
    <div className="relative z-20 h-screen w-[9.5rem] shrink-0 py-[2rem] flex flex-col items-center border-r border-ink/[0.055] bg-background/88 backdrop-blur-[14px]">
      <div className="relative mb-[2rem] h-[6.5rem] w-[6.5rem] shrink-0">
        <Image src="/logo/logo.png" alt="Logo" fill sizes="65px" priority />
      </div>

      <div className="min-h-0 w-full flex-1 pl-[0.8rem] pr-[0.6rem] flex items-stretch">
        <div className="relative mr-[0.4rem] w-[3px] shrink-0 self-stretch overflow-hidden rounded-[3px] bg-ink/8">
          <div
            className="absolute top-0 left-0 w-full rounded-[3px] bg-linear-to-b from-highlight to-accent-deep shadow-glow transition-[height] duration-[120ms] ease-linear"
            style={{ height: `${progress * 100}%` }}
          />
        </div>

        <nav className="min-h-0 flex-1 flex flex-col justify-center">
          {SECTIONS.map(({ id, Icon }, index) => (
            <div key={id} className="flex flex-col items-center">
              <button
                type="button"
                title={t.nav[id]}
                onClick={() => scrollTo(id)}
                className={`w-full px-[0.4rem] py-[0.75rem] flex flex-col items-center justify-center gap-[0.3rem] rounded-[8px] transition-[background,color] duration-[180ms] hover:bg-ink/[0.055] ${id === activeSection ? "text-ink" : "text-ink/32 hover:text-ink/78"}`}
              >
                <Icon className={`text-[2rem] transition-[filter] duration-[180ms] ${id === activeSection ? "glow-icon" : ""}`} />
                <span className="text-[0.9rem] leading-none font-medium tracking-[0.02em]">{t.nav[id]}</span>
              </button>
              {index < SECTIONS.length - 1 && <span className="py-[0.35rem] font-mono text-[0.78rem] leading-none tracking-[0.02em] text-ink/13 select-none">{DECORATIONS[index]}</span>}
            </div>
          ))}
        </nav>
      </div>

      <button
        type="button"
        title={t.language.switchTo}
        onClick={() => setLang(lang === "pt" ? "en" : "pt")}
        className="mt-[1.2rem] w-[calc(100%_-_1.2rem)] shrink-0 px-[0.6rem] py-[0.9rem] flex flex-col items-center gap-[0.3rem] rounded-[8px] text-ink/45 transition-[background,color] duration-[180ms] hover:bg-ink/[0.055] hover:text-ink/85"
      >
        <span className="text-[1.9rem] leading-none">{t.language.flag}</span>
        <span className="text-[0.82rem] font-bold tracking-[0.08em]">{t.language.label}</span>
      </button>
    </div>
  );
}
