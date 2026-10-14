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

// Every logo in its brand colour; each category carries its own accent and its width in the 12-column grid
export const SKILL_CATEGORIES = [
  {
    key: "frontend",
    color: "#3b82f6",
    span: "col-span-7",
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
    span: "col-span-5",
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
    span: "col-span-5",
    Icon: MdOutlinePhoneIphone,
    skills: [
      { name: "Flutter", Icon: SiFlutter, color: "#54C5F8" },
      { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
    ],
  },
  {
    key: "tools",
    color: "#8b5cf6",
    span: "col-span-7",
    Icon: MdOutlineBuild,
    skills: [
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
      { name: "Git", Icon: FaGitAlt, color: "#F05032" },
      { name: "Docker", Icon: FaDocker, color: "#2496ED" },
      { name: "Google Maps", Icon: SiGooglemaps, color: "#4285F4" },
    ],
  },
] as const;

export const SKILL_COUNT = SKILL_CATEGORIES.reduce((count, category) => count + category.skills.length, 0);
