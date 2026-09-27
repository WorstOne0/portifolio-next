"use client";

// Next
import Image from "next/image";
import { motion } from "framer-motion";
// Controllers
import { useLanguageController } from "@/core/controllers";
// Models
import { PROJECTS, TRANSLATIONS, type Project } from "@/core/models";
// Components
import SectionHeader from "./section_header";
// Icons
import { FaGithub } from "react-icons/fa";
import { MdOutlineLock, MdOutlineOpenInNew } from "react-icons/md";

const CODE_LINK =
  "h-[4.4rem] px-[1.6rem] inline-flex items-center gap-[0.7rem] rounded-[8px] border border-ink/15 text-[1.35rem] font-semibold text-ink/80 transition-[background,border-color] duration-[180ms] hover:border-ink/30 hover:bg-ink/10";

export default function Projects() {
  const lang = useLanguageController((state) => state.lang);

  const t = TRANSLATIONS[lang];

  // A browser window around the live site: its address bar names the domain, and the whole frame is the link
  const buildWindow = (project: Project, host: string) => (
    <a
      href={project.site}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.projects.visitSite}: ${host}`}
      className="group block w-full overflow-hidden rounded-[1.2rem] border border-ink/[0.12] bg-background shadow-card transition-[scale,box-shadow] duration-300 hover:scale-[1.02] hover:shadow-card-hover"
    >
      <div className="h-[3.4rem] px-[1.2rem] flex items-center gap-[0.6rem] border-b border-ink/[0.08] bg-ink/[0.04]">
        <span className="h-[0.9rem] w-[0.9rem] rounded-full bg-ink/20" />
        <span className="h-[0.9rem] w-[0.9rem] rounded-full bg-ink/20" />
        <span className="h-[0.9rem] w-[0.9rem] rounded-full bg-ink/20" />
        <span className="ml-[0.8rem] min-w-0 flex-1 truncate rounded-[0.6rem] bg-ink/[0.06] px-[1rem] py-[0.3rem] text-[1.2rem] text-ink/60">{host}</span>
        <MdOutlineOpenInNew className="shrink-0 text-[1.5rem] text-ink/40 transition-colors group-hover:text-ink/85" />
      </div>
      {project.image ? (
        <Image src={project.image} alt={`${project.name} — ${host}`} width={1440} height={900} sizes="(min-width: 1280px) 560px, 45vw" className="block h-auto w-full" />
      ) : (
        <div className="relative aspect-[16/10] flex flex-col items-center justify-center gap-[1.2rem]" style={{ background: `radial-gradient(circle at 30% 20%, ${project.accent}40, transparent 65%)` }}>
          <div className="bg-grid pointer-events-none absolute inset-0" />
          <span className="relative text-[3.6rem] leading-none font-extrabold text-ink">{project.name}</span>
          <span className="relative flex items-center gap-[0.6rem] text-[1.3rem] font-semibold tracking-[0.08em] text-ink/55 uppercase">
            <MdOutlineLock />
            {t.projects.inHouse}
          </span>
        </div>
      )}
    </a>
  );

  return (
    <section id="projects" className="min-h-screen w-full px-[8rem] py-[8rem] flex items-start justify-center bg-section">
      <div className="w-full max-w-[1100px] flex flex-col gap-[4rem]">
        <SectionHeader title={t.projects.title} subtitle={t.projects.subtitle} />

        <div className="flex flex-col gap-[2.8rem]">
          {PROJECTS.map((project, index) => {
            const isFlipped = index % 2 === 1;
            const host = new URL(project.site).host;

            return (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: index * 0.1 }}
                className={`grid overflow-hidden rounded-[20px] border border-ink/[0.09] bg-ink/[0.03] shadow-card ${isFlipped ? "grid-cols-[1fr_52%]" : "grid-cols-[52%_1fr]"}`}
              >
                <div
                  className={`p-[3.2rem] flex items-center ${isFlipped ? "order-2" : "order-1"}`}
                  style={{ background: `linear-gradient(135deg, ${project.accent}2e, transparent 75%)` }}
                >
                  {buildWindow(project, host)}
                </div>

                <div className={`px-[3.6rem] py-[3.6rem] flex flex-col justify-center gap-[2rem] ${isFlipped ? "order-1" : "order-2"}`}>
                  <div className="flex items-center gap-[1.2rem]">
                    <span className="font-mono text-[1.2rem] font-semibold tracking-[0.12em] text-ink/55 uppercase">
                      {t.projects.project} {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="px-[1rem] py-[0.3rem] inline-flex items-center gap-[0.6rem] rounded-full border border-live/30 bg-live/10 text-[1.1rem] font-bold tracking-[0.08em] text-live uppercase">
                      <span className="h-[0.7rem] w-[0.7rem] rounded-full bg-live animate-pulse" />
                      {t.projects.live}
                    </span>
                  </div>

                  <h3 className="text-[clamp(2.6rem,2.8vw,3.4rem)] leading-[1.1] font-extrabold text-ink">{project.name}</h3>
                  <p className="text-[1.5rem] leading-[1.8] text-meta">{project.description[lang]}</p>

                  <div className="flex flex-col gap-[1rem]">
                    <span className="text-[1.1rem] font-bold tracking-[0.1em] text-ink/25 uppercase">Stack</span>
                    <div className="flex flex-wrap gap-[0.7rem]">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-[1.1rem] py-[0.4rem] rounded-[6px] border text-[1.2rem] font-medium whitespace-nowrap"
                          style={{ borderColor: `${project.accent}35`, color: project.accent, background: `${project.accent}0d` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-[1rem]">
                    <a
                      href={project.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-[4.4rem] px-[1.8rem] inline-flex items-center gap-[0.8rem] rounded-[8px] bg-action text-[1.4rem] font-bold text-ink transition-[background,translate] duration-200 hover:-translate-y-[1px] hover:bg-action-hover"
                    >
                      {t.projects.visitSite}
                      <MdOutlineOpenInNew className="text-[1.6rem]" />
                    </a>
                    {project.code.map((code) => (
                      <a key={code.href} href={code.href} target="_blank" rel="noopener noreferrer" className={CODE_LINK}>
                        <FaGithub className="text-[1.5rem]" />
                        {code.label}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
