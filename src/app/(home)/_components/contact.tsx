"use client";

// Next
import { motion } from "framer-motion";
// Controllers
import { useLanguageController } from "@/core/controllers";
// Models
import { TRANSLATIONS } from "@/core/models";
// Icons
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdOutlineArrowForward, MdOutlineEmail } from "react-icons/md";

const YEAR = new Date().getFullYear();

export default function Contact() {
  const lang = useLanguageController((state) => state.lang);

  const t = TRANSLATIONS[lang];

  const links = [
    { label: t.contact.sendEmail, detail: "luccagabriel12@hotmail.com", Icon: MdOutlineEmail, href: "mailto:luccagabriel12@hotmail.com", color: "#3b82f6" },
    { label: t.contact.seeGithub, detail: "github.com/WorstOne0", Icon: FaGithub, href: "https://github.com/WorstOne0", color: "#a78bfa" },
    { label: t.contact.linkedin, detail: "lucca-gabriel-410040154", Icon: FaLinkedin, href: "https://www.linkedin.com/in/lucca-gabriel-410040154/", color: "#0ea5e9" },
  ];

  return (
    <section id="contact" className="min-h-screen w-full px-[6rem] py-[8rem] flex items-center justify-center">
      <div className="w-full max-w-[1100px] flex items-center gap-[5rem]">
        <div className="min-w-0 flex-1 flex flex-col items-start gap-[2.8rem]">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col items-start gap-[1rem]">
            <span className="font-mono text-[1.3rem] tracking-[0.06em] text-accent">{`// ${t.contact.title.toLowerCase()}`}</span>
            <h2 className="text-[clamp(3rem,5vw,5.2rem)] leading-[1.05] font-extrabold text-ink">{t.contact.title}</h2>
            <p className="bg-linear-to-r from-highlight to-lavender bg-clip-text text-[1.9rem] font-semibold text-transparent">{t.contact.subtitle}</p>
            <p className="max-w-[460px] text-[1.5rem] leading-[1.7] text-meta">{t.contact.description}</p>
          </motion.div>

          <div className="w-full flex flex-col gap-[1.2rem]">
            {links.map(({ label, detail, Icon, href, color }, index) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                className="group px-[2rem] py-[1.6rem] flex items-center gap-[1.6rem] rounded-[14px] border border-ink/[0.09] bg-ink/5 transition-[background,border-color,translate] duration-200 hover:translate-x-[5px] hover:border-(--row) hover:bg-ink/[0.07]"
                style={{ "--row": color } as React.CSSProperties}
              >
                <span className="h-[4.2rem] w-[4.2rem] shrink-0 flex items-center justify-center rounded-[10px] bg-ink/5 text-[2.2rem]" style={{ color }}>
                  <Icon />
                </span>
                <div className="min-w-0 flex-1 flex flex-col gap-[0.2rem]">
                  <span className="text-[1.5rem] font-semibold text-ink/90">{label}</span>
                  <span className="truncate text-[1.25rem] text-meta">{detail}</span>
                </div>
                <MdOutlineArrowForward className="shrink-0 text-[1.6rem] text-ink/28 transition-[color,translate] duration-200 group-hover:translate-x-[3px] group-hover:text-(--row)" />
              </motion.a>
            ))}
          </div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }} className="text-[1.2rem] tracking-[0.04em] text-ink/20">
            Lucca Gabriel · {YEAR}
          </motion.p>
        </div>

        <motion.div className="shrink-0 flex items-center justify-center" initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="relative h-[42rem] w-[42rem] flex items-center justify-center">
            <div className="orb-glow absolute h-[50rem] w-[50rem] rounded-full animate-orb-pulse" />
            <div className="orbit-dot-outer absolute h-[40rem] w-[40rem] rounded-full border border-ink/[0.07] animate-orbit-22" />
            <div className="orbit-dot-middle absolute h-[30rem] w-[30rem] rounded-full border border-accent-deep/22 animate-orbit-13-reverse" />
            <div className="orbit-dot-inner absolute h-[20rem] w-[20rem] rounded-full border border-highlight/30 animate-orbit-7" />
            <div className="orb-core absolute z-[5] h-[11rem] w-[11rem] flex items-center justify-center rounded-full">
              <MdOutlineEmail className="text-[4.2rem] text-ink/88" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
