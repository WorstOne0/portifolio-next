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
const HEADING = "pb-[1rem] flex items-center gap-[1rem] border-b border-ink/[0.09] text-[1.8rem] font-bold text-ink/90";
const DOT = "relative z-[1] mt-[0.4rem] h-[12px] w-[12px] shrink-0 rounded-full border-2 border-highlight bg-action";

export default function About() {
  const lang = useLanguageController((state) => state.lang);

  const t = TRANSLATIONS[lang];

  const buildPlace = (location: string) => (
    <div className="flex items-center gap-[0.5rem] text-[1.3rem] text-meta opacity-75">
      <MdOutlinePlace className="text-[1.3rem]" />
      <span>{location}</span>
    </div>
  );

  const buildColumn = (Icon: IconType, title: string, delay: number, children: React.ReactNode) => (
    <motion.div {...FADE_UP} transition={{ duration: 0.6, delay }} className="flex flex-col gap-[2rem]">
      <h3 className={HEADING}>
        <Icon className="text-[1.8rem] text-highlight" />
        {title}
      </h3>
      <div className="flex flex-col">{children}</div>
    </motion.div>
  );

  return (
    <section id="about" className="min-h-screen w-full px-[8rem] py-[8rem] flex items-start justify-center bg-section">
      <div className="w-full max-w-[1200px] flex flex-col gap-[3.2rem]">
        <SectionHeader title={t.about.title} />

        <motion.p {...FADE_UP} transition={{ duration: 0.6, delay: 0.1 }} className="max-w-[780px] text-[1.65rem] leading-[1.75] text-meta">
          {t.about.bio}
        </motion.p>

        <div className="grid grid-cols-2 items-start gap-[4rem]">
          {buildColumn(
            MdOutlineWorkOutline,
            t.about.experience,
            0.2,
            t.about.experiences.map((experience, index) => (
              <div key={experience.company} className="relative pb-[2.8rem] flex gap-[1.6rem]">
                <div className={DOT} />
                {index < t.about.experiences.length - 1 && <div className="absolute top-[14px] bottom-0 left-[5px] w-[2px] bg-linear-to-b from-action to-transparent" />}
                <div className="flex-1 flex flex-col gap-[0.4rem]">
                  <span className="text-[1.6rem] font-bold text-ink">{experience.role}</span>
                  <span className="text-[1.45rem] font-semibold text-highlight">{experience.company}</span>
                  <div className="flex items-center gap-[0.5rem] text-[1.3rem] text-meta">
                    <span>{experience.period}</span>
                    <span className="opacity-50">·</span>
                    <span>{experience.duration}</span>
                  </div>
                  {buildPlace(experience.location)}
                  <p className="mt-[0.4rem] text-[1.45rem] leading-[1.65] text-meta">{experience.description}</p>
                </div>
              </div>
            ))
          )}

          {buildColumn(
            MdOutlineSchool,
            t.about.education,
            0.3,
            t.about.educations.map((education) => (
              <div key={education.institution} className="relative pb-[2.8rem] flex gap-[1.6rem]">
                <div className={DOT} />
                <div className="flex-1 flex flex-col gap-[0.4rem]">
                  <span className="text-[1.6rem] font-bold text-ink">{education.degree}</span>
                  <span className="text-[1.45rem] font-semibold text-highlight">{education.institution}</span>
                  <span className="text-[1.3rem] text-meta">{education.period}</span>
                  {buildPlace(education.location)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
