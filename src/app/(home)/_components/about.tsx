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
import { MdOutlinePlace, MdOutlineSchool, MdOutlineWorkOutline } from "react-icons/md";
import type { IconType } from "react-icons";

const FADE_UP = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };
const CARD = "px-[2.6rem] py-[2.2rem] rounded-[14px] border border-ink/8 bg-ink/3 transition-[border-color] duration-200 hover:border-ink/16";
const CARD_HEAD = "flex items-baseline justify-between gap-[1.6rem]";
const ROLE = "font-display text-[1.9rem] leading-[1.3] font-semibold tracking-[-0.01em] text-ink";
const PERIOD = "shrink-0 font-mono text-[1.2rem] tabular-nums text-ink/50";
const CHIP = "h-[2.2rem] px-[0.8rem] inline-flex items-center gap-[0.6rem] rounded-full";

export default function About() {
  const lang = useLanguageController((state) => state.lang);

  const t = TRANSLATIONS[lang];

  const buildPlace = (location: string) => (
    <div className="mt-[0.8rem] flex items-center gap-[0.6rem] text-[1.3rem] text-ink/45">
      <MdOutlinePlace className="text-[1.4rem]" />
      {location}
    </div>
  );

  // A stop on the timeline: its dot, the line down to the next dot, and its card
  const buildStop = (key: string, dot: string, hasNext: boolean, card: React.ReactNode) => (
    <div key={key} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-[1.8rem]">
      <div className="relative flex justify-center">
        <span className={`relative z-[1] mt-[2.7rem] size-[1.2rem] rounded-full border-2 ${dot}`} />
        {hasNext && <span className="absolute top-[4.2rem] -bottom-[4.1rem] left-1/2 w-[2px] -translate-x-1/2 bg-linear-to-b from-highlight/60 to-highlight/5" />}
      </div>
      {card}
    </div>
  );

  const buildColumn = (Icon: IconType, title: string, count: number, delay: number, children: React.ReactNode) => (
    <motion.div {...FADE_UP} transition={{ duration: 0.6, delay }}>
      <h3 className="mb-[2rem] pb-[1.4rem] flex items-center gap-[1rem] border-b border-ink/8 font-display text-[1.7rem] font-semibold text-ink/92">
        <Icon className="text-[1.8rem] text-highlight" />
        {title}
        <span className="ml-auto font-mono text-[1.2rem] font-normal text-ink/35">{String(count).padStart(2, "0")}</span>
      </h3>
      <div className="flex flex-col gap-[1.4rem]">{children}</div>
    </motion.div>
  );

  return (
    <section id="about" className="bg-band w-full px-[9.6rem] py-[12.8rem]">
      <div className="mx-auto w-full max-w-[1180px] flex flex-col gap-[4.8rem]">
        <SectionHeader index={2} label={t.nav.about} title={t.about.title} />

        <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-start gap-[6.4rem]">
          <motion.div {...FADE_UP} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="text-[1.7rem] leading-[1.8] text-ink/68">{t.about.bio}</p>

            <dl className="mt-[3.6rem] border-t border-ink/8">
              {t.about.facts.map((fact) => (
                <div key={fact.label} className="py-[1.6rem] flex items-baseline justify-between gap-[1.6rem] border-b border-ink/8">
                  <dt className="font-mono text-[1.1rem] tracking-[0.12em] text-ink/40 uppercase">{fact.label}</dt>
                  <dd className="text-right text-[1.5rem] text-ink/88">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <div className="flex flex-col gap-[4.4rem]">
            {buildColumn(
              MdOutlineWorkOutline,
              t.about.experience,
              t.about.experiences.length,
              0.2,
              t.about.experiences.map((experience, index) =>
                buildStop(
                  experience.company,
                  "border-highlight bg-action shadow-glow",
                  index < t.about.experiences.length - 1,
                  <article className={CARD}>
                    <div className={CARD_HEAD}>
                      <h4 className={ROLE}>{experience.role}</h4>
                      <span className={PERIOD}>{experience.period}</span>
                    </div>
                    <div className="mt-[0.8rem] flex flex-wrap items-center gap-x-[1rem] gap-y-[0.8rem]">
                      <span className="text-[1.5rem] font-semibold text-highlight">{experience.company}</span>
                      {experience.isCurrent && (
                        <span className={`${CHIP} bg-live/10 text-[1rem] font-bold tracking-[0.1em] text-live uppercase`}>
                          <span className="size-[0.5rem] rounded-full bg-live" />
                          {t.about.current}
                        </span>
                      )}
                      <span className={`${CHIP} bg-lavender/12 font-mono text-[1.1rem] text-lavender`}>{experience.duration}</span>
                    </div>
                    {buildPlace(experience.location)}
                    <p className="mt-[1.4rem] text-[1.5rem] leading-[1.7] text-ink/62">{experience.description}</p>
                  </article>
                )
              )
            )}

            {buildColumn(
              MdOutlineSchool,
              t.about.education,
              t.about.educations.length,
              0.3,
              t.about.educations.map((education, index) =>
                buildStop(
                  education.institution,
                  "border-lavender bg-accent-deep",
                  index < t.about.educations.length - 1,
                  <article className={CARD}>
                    <div className={CARD_HEAD}>
                      <h4 className={ROLE}>{education.degree}</h4>
                      <span className={PERIOD}>{education.period}</span>
                    </div>
                    <span className="mt-[0.8rem] block text-[1.5rem] font-semibold text-lavender">{education.institution}</span>
                    {buildPlace(education.location)}
                  </article>
                )
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
