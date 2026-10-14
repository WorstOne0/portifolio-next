"use client";

// Next
import { useState } from "react";
import { motion } from "framer-motion";
// Controllers
import { useLanguageController } from "@/core/controllers";
// Models
import { CONTACT, TRANSLATIONS } from "@/core/models";
// Icons
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdOutlineArrowForward, MdOutlineArrowUpward, MdOutlineContentCopy, MdOutlineEmail } from "react-icons/md";

const YEAR = new Date().getFullYear();

export default function Contact({ scrollRef }: { scrollRef: React.RefObject<HTMLElement | null> }) {
  const lang = useLanguageController((state) => state.lang);

  const [isCopied, setIsCopied] = useState(false);

  const t = TRANSLATIONS[lang];
  const words = t.contact.subtitle.split(" ");
  const links = [
    { label: t.contact.email, detail: CONTACT.email, Icon: MdOutlineEmail, href: `mailto:${CONTACT.email}`, color: "#3b82f6" },
    { label: t.contact.seeGithub, detail: CONTACT.github.replace("https://", ""), Icon: FaGithub, href: CONTACT.github, color: "#a78bfa" },
    { label: t.contact.linkedin, detail: "lucca-gabriel-410040154", Icon: FaLinkedin, href: CONTACT.linkedin, color: "#0ea5e9" },
  ];

  const copyEmail = async () => {
    await navigator.clipboard.writeText(CONTACT.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="contact" className="min-h-screen w-full px-[9.6rem] pt-[12rem] pb-[5.6rem] flex flex-col">
      <div className="mx-auto w-full max-w-[1180px] flex-1 flex flex-col">
        <div className="my-auto grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center gap-[7.2rem]">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="flex items-center gap-[1.2rem] font-mono text-[1.2rem] leading-none tracking-[0.14em] text-lavender uppercase">
              <span className="text-ink/35">05</span>
              <span className="h-px w-[2.8rem] bg-lavender/50" />
              {t.nav.contact}
            </span>
            <h2 className="mt-[1.8rem] font-display text-[6rem] leading-[1.04] font-semibold tracking-[-0.04em] text-ink">
              {words.slice(0, -1).join(" ")} <span className="text-lavender">{words.at(-1)}</span>.
            </h2>
            <p className="mt-[2.2rem] max-w-[46rem] text-[1.7rem] leading-[1.7] text-ink/60">{t.contact.description}</p>

            <div className="mt-[3.6rem] flex flex-wrap gap-[1.2rem]">
              <a
                href={`mailto:${CONTACT.email}`}
                className="h-[5.2rem] pr-[2.2rem] pl-[1.9rem] inline-flex items-center gap-[1rem] rounded-[10px] bg-action text-[1.5rem] font-bold text-ink shadow-button transition-[background,translate] duration-200 hover:-translate-y-[2px] hover:bg-action-hover"
              >
                <MdOutlineEmail className="text-[1.8rem]" />
                {t.contact.sendEmail}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="h-[5.2rem] px-[2rem] inline-flex items-center gap-[1rem] rounded-[10px] border border-ink/14 bg-ink/3 text-[1.5rem] font-semibold text-ink/88 transition-[background,border-color] duration-200 hover:border-ink/24 hover:bg-ink/8"
              >
                <MdOutlineContentCopy className="text-[1.7rem]" />
                {isCopied ? t.contact.copied : t.contact.copyEmail}
              </button>
            </div>
          </motion.div>

          <div className="flex flex-col gap-[1.2rem]">
            {links.map(({ label, detail, Icon, href, color }, index) => (
              <motion.a
                key={href}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                className="group px-[2rem] py-[1.8rem] flex items-center gap-[1.6rem] rounded-[16px] border border-ink/8 bg-ink/3 transition-[background,border-color,translate] duration-200 hover:translate-x-[4px] hover:border-(--row) hover:bg-ink/5"
                style={{ "--row": color } as React.CSSProperties}
              >
                <span className="size-[4.6rem] shrink-0 flex items-center justify-center rounded-[12px] text-[2.2rem]" style={{ color, background: `${color}1f` }}>
                  <Icon />
                </span>
                <span className="min-w-0 flex-1 flex flex-col gap-[0.3rem]">
                  <span className="text-[1.6rem] font-semibold text-ink/92">{label}</span>
                  <span className="truncate text-[1.35rem] text-ink/50">{detail}</span>
                </span>
                <MdOutlineArrowForward className="shrink-0 text-[1.8rem] text-ink/30 transition-colors duration-200 group-hover:text-(--row)" />
              </motion.a>
            ))}
          </div>
        </div>

        <footer className="mt-[12.8rem] pt-[2.4rem] flex flex-wrap items-center justify-between gap-[1.6rem] border-t border-ink/7 font-mono text-[1.2rem] tracking-[0.04em] text-ink/35">
          <span>© {YEAR} Lucca Gabriel · Cascavel, PR</span>
          <span>Next.js · Tailwind · Framer Motion</span>
          <button
            type="button"
            onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-[0.6rem] text-ink/55 transition-colors duration-200 hover:text-ink/85"
          >
            {t.contact.backToTop}
            <MdOutlineArrowUpward className="text-[1.4rem]" />
          </button>
        </footer>
      </div>
    </section>
  );
}
