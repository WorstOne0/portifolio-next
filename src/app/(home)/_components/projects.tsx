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

const CARD = "overflow-hidden rounded-[22px] border border-ink/9 bg-ink/3 transition-[border-color] duration-200 hover:border-ink/16";
const PRIMARY =
  "h-[4.4rem] px-[1.8rem] inline-flex items-center gap-[0.8rem] rounded-[9px] bg-action text-[1.4rem] font-bold text-ink transition-[background,translate] duration-200 hover:-translate-y-[1px] hover:bg-action-hover";
const GHOST =
  "h-[4.4rem] px-[1.4rem] inline-flex items-center gap-[0.8rem] rounded-[9px] border border-ink/14 text-[1.35rem] font-semibold text-ink/82 transition-[background,border-color] duration-[180ms] hover:border-ink/24 hover:bg-ink/8";
// The map drawn for a project without a screenshot, in a 520×325 box: streets, two avenues, the route and the vehicles on it
const STREETS =
  "M-140 -20H660M-140 18H660M-140 56H660M-140 94H660M-140 132H660M-140 208H660M-140 246H660M-140 284H660M-140 322H660M-60 -140V470M-12 -140V470M36 -140V470M84 -140V470M132 -140V470M180 -140V470M276 -140V470M324 -140V470M372 -140V470M420 -140V470M468 -140V470M516 -140V470";
const AVENUES = "M-140 170H660M228 -140V470";
const ROUTE = "M36 284H132V208H228V94H372V56H468";
const VEHICLES = [
  [228, 150],
  [468, 56],
  [420, 246],
];

export default function Projects() {
  const lang = useLanguageController((state) => state.lang);

  const t = TRANSLATIONS[lang];
  const [featured, ...others] = PROJECTS;

  const buildMap = (project: Project) => (
    <div className="relative aspect-[16/10] overflow-hidden bg-background">
      <svg aria-hidden="true" viewBox="0 0 520 325" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <g transform="rotate(-14 260 162)" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={STREETS} className="stroke-ink/6" strokeWidth={1} />
          <path d={AVENUES} className="stroke-ink/12" strokeWidth={4} />
          <path d={ROUTE} stroke={project.accent} strokeOpacity={0.25} strokeWidth={10} />
          <path d={ROUTE} stroke={project.accent} strokeWidth={2.5} />
          <circle cx={36} cy={284} r={5} className="fill-background" stroke={project.accent} strokeWidth={2} />
          {VEHICLES.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={7} fill={project.accent} className="stroke-ink" strokeWidth={2} />
          ))}
        </g>
      </svg>
      <span className="absolute top-[1.4rem] left-[1.6rem] h-[2.6rem] px-[1rem] inline-flex items-center gap-[0.6rem] rounded-full border border-ink/12 bg-background/72 text-[1.1rem] font-bold tracking-[0.08em] text-ink/78 uppercase">
        <MdOutlineLock className="text-[1.2rem]" />
        {t.projects.inHouse}
      </span>
    </div>
  );

  // A browser window around the live site: its address bar names the domain, and the whole frame is the link
  const buildWindow = (project: Project) => {
    const host = new URL(project.site).host;

    return (
      <a
        href={project.site}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t.projects.visitSite}: ${host}`}
        className="group block w-full overflow-hidden rounded-[12px] border border-ink/12 bg-background shadow-float transition-[translate] duration-300 hover:-translate-y-[4px]"
      >
        <div className="h-[3.6rem] px-[1.2rem] flex items-center gap-[0.7rem] border-b border-ink/7 bg-ink/4">
          <span className="size-[0.9rem] rounded-full bg-ink/18" />
          <span className="size-[0.9rem] rounded-full bg-ink/18" />
          <span className="size-[0.9rem] rounded-full bg-ink/18" />
          <span className="ml-[1rem] h-[2.2rem] min-w-0 flex-1 px-[1rem] flex items-center gap-[0.6rem] rounded-[6px] bg-ink/5 font-mono text-[1.15rem] text-ink/58">
            <MdOutlineLock className="shrink-0 text-[1.1rem] text-live/85" />
            <span className="truncate">{host}</span>
          </span>
          <MdOutlineOpenInNew className="shrink-0 text-[1.5rem] text-ink/40 transition-colors group-hover:text-ink/85" />
        </div>
        {project.image ? (
          <Image src={project.image} alt={`${project.name} — ${host}`} width={1440} height={900} sizes="(min-width: 1280px) 600px, 50vw" className="block h-auto w-full" />
        ) : (
          buildMap(project)
        )}
      </a>
    );
  };

  const buildBody = (project: Project, index: number, isFeatured: boolean) => (
    <>
      <div className="flex items-center justify-between gap-[1.2rem]">
        <span className="font-mono text-[1.2rem] tracking-[0.14em] text-ink/40 uppercase">
          {t.projects.project} {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-[2.4rem] px-[1rem] inline-flex items-center gap-[0.7rem] rounded-full border border-live/28 bg-live/8 text-[1.05rem] font-bold tracking-[0.1em] text-live uppercase">
          <span className="size-[0.6rem] rounded-full bg-live shadow-[0_0_0.8rem_var(--live)]" />
          {t.projects.live}
        </span>
      </div>

      <h3 className={`font-display leading-[1.1] font-bold text-ink ${isFeatured ? "mt-[1.8rem] text-[3.4rem] tracking-[-0.03em]" : "mt-[1.4rem] text-[2.6rem] tracking-[-0.025em]"}`}>{project.name}</h3>
      <p className={`leading-[1.75] text-ink/62 ${isFeatured ? "mt-[1.6rem] text-[1.55rem]" : "mt-[1.2rem] text-[1.45rem]"}`}>{project.description[lang]}</p>

      <ul className="mt-[2rem] flex flex-wrap gap-[0.6rem]">
        {project.tech.map((tech) => (
          <li key={tech} className="h-[2.8rem] px-[1rem] inline-flex items-center rounded-[7px] border border-ink/7 bg-ink/5 text-[1.25rem] font-medium whitespace-nowrap text-ink/78">
            {tech}
          </li>
        ))}
      </ul>

      <div className={`flex flex-wrap gap-[0.8rem] ${isFeatured ? "mt-[2.8rem]" : "mt-auto pt-[2.8rem]"}`}>
        <a href={project.site} target="_blank" rel="noopener noreferrer" className={PRIMARY}>
          {t.projects.visitSite}
          <MdOutlineOpenInNew className="text-[1.6rem]" />
        </a>
        {project.code.map((code) => (
          <a key={code.href} href={code.href} target="_blank" rel="noopener noreferrer" className={GHOST}>
            <FaGithub className="text-[1.5rem]" />
            {code.label}
          </a>
        ))}
      </div>
    </>
  );

  return (
    <section id="projects" className="bg-band w-full px-[9.6rem] py-[12.8rem]">
      <div className="mx-auto w-full max-w-[1180px] flex flex-col gap-[4.8rem]">
        <SectionHeader index={4} label={t.nav.projects} title={t.projects.title} subtitle={t.projects.subtitle} count={PROJECTS.length} />

        <div className="flex flex-col gap-[2rem]">
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className={`grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] ${CARD}`}
          >
            <div className="p-[3.6rem] flex items-center" style={{ background: `radial-gradient(120% 120% at 0% 0%, ${featured.accent}3d, transparent 62%)` }}>
              {buildWindow(featured)}
            </div>
            <div className="py-[4rem] pr-[4rem] pl-[3.6rem] flex flex-col justify-center">{buildBody(featured, 0, true)}</div>
          </motion.article>

          <div className="grid grid-cols-2 gap-[2rem]">
            {others.map((project, index) => (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: (index % 2) * 0.1 }}
                className={`flex flex-col ${CARD}`}
              >
                <div className="h-[30rem] px-[2.8rem] pt-[2.8rem] overflow-hidden" style={{ background: `radial-gradient(120% 120% at 0% 0%, ${project.accent}3d, transparent 62%)` }}>
                  {buildWindow(project)}
                </div>
                <div className="flex-1 px-[3rem] pt-[2.8rem] pb-[3rem] flex flex-col border-t border-ink/7">{buildBody(project, index + 1, false)}</div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
