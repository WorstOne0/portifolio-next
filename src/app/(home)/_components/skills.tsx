"use client";

// Next
import { motion } from "framer-motion";
// Controllers
import { useLanguageController } from "@/core/controllers";
// Models
import { TRANSLATIONS } from "@/core/models";
// Components
import SectionHeader from "./section_header";
// Utils
import { SKILL_CATEGORIES, SKILL_COUNT } from "../_utils/skills";
// Icons
import { SiAppstore, SiGoogleplay } from "react-icons/si";

export default function Skills() {
  const lang = useLanguageController((state) => state.lang);

  const t = TRANSLATIONS[lang];

  return (
    <section id="skills" className="w-full px-[9.6rem] py-[12.8rem]">
      <div className="mx-auto w-full max-w-[1180px] flex flex-col gap-[4.8rem]">
        <SectionHeader index={3} label={t.nav.skills} title={t.skills.title} subtitle={t.skills.subtitle} count={SKILL_COUNT} />

        <div className="grid grid-cols-12 gap-[1.6rem]">
          {SKILL_CATEGORIES.map((category, categoryIndex) => (
            <motion.article
              key={category.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className={`${category.span} px-[2.8rem] pt-[2.6rem] pb-[2.8rem] rounded-[18px] border border-ink/8 bg-ink/3 transition-[border-color] duration-200 hover:border-ink/16`}
            >
              <header className="flex items-center gap-[1.4rem]">
                <span className="size-[4.2rem] shrink-0 flex items-center justify-center rounded-[11px] text-[2.1rem]" style={{ color: category.color, background: `${category.color}1f` }}>
                  <category.Icon />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[1.8rem] leading-[1.2] font-semibold text-ink">{t.skills.categories[category.key]}</h3>
                  <p className="mt-[0.4rem] text-[1.3rem] text-ink/45">{t.skills.categoryDesc[category.key]}</p>
                </div>
                <span className="font-mono text-[1.3rem] tabular-nums text-ink/30">{String(category.skills.length).padStart(2, "0")}</span>
              </header>

              <div className="my-[2.2rem] h-px bg-ink/7" />

              <ul className="flex flex-wrap gap-[0.8rem]">
                {category.skills.map((skill, index) => (
                  <motion.li
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.08 + index * 0.04 }}
                    className="h-[4rem] pr-[1.4rem] pl-[1.2rem] inline-flex items-center gap-[0.9rem] rounded-[10px] border border-ink/8 bg-ink/4 text-[1.4rem] font-medium text-ink/86 transition-[background,border-color,translate] duration-[180ms] hover:-translate-y-[2px] hover:border-ink/20 hover:bg-ink/7"
                  >
                    <span className="flex text-[1.8rem]" style={{ color: skill.color }}>
                      <skill.Icon />
                    </span>
                    {skill.name}
                  </motion.li>
                ))}
              </ul>

              {category.key === "mobile" && (
                <p className="mt-[2.2rem] pt-[1.8rem] flex items-center gap-[1rem] border-t border-dashed border-ink/10 text-[1.3rem] text-ink/55">
                  <SiAppstore className="text-[1.6rem] text-ink/70" />
                  <SiGoogleplay className="text-[1.5rem] text-ink/70" />
                  {t.skills.mobileNote}
                </p>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
