const en = {
  nav: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
  },
  hero: {
    name: "Lucca Gabriel",
    title: "Computer Engineer",
    role: "Full-Stack Developer",
    subtitle: "Building from front-end to back-end — and everything in between.",
    badge: "Full-Stack Developer · In orbit since 2022",
    cta: "Launch Mission",
  },
  about: {
    title: "About Me",
    bio: "Computer Engineer graduated from UTFPR – Federal University of Technology of Paraná, working as a Full-Stack Developer. Experienced in building web applications with ReactJS and back-end systems with Node.js, as well as developing and publishing mobile apps with Flutter on both Google Play and the Apple App Store. I also have strong Python skills and experience with complementary technologies for delivering complete software solutions.",
    experience: "Experience",
    education: "Education",
    experiences: [
      {
        role: "Full-Stack Developer",
        company: "Wikidados – Solutions & Development",
        period: "Nov 2022 – Present",
        duration: "3+ years",
        location: "Cascavel, Paraná, Brazil · On-site",
        description:
          "Worked as the exclusive Flutter developer for the company's mobile app, responsible for its conception, development and maintenance for iOS and Android — available on both the App Store and Play Store. Also built Node.js back-end servers integrating GPS tracking devices and external APIs, and contributed to Vue.js web interfaces for the admin panel.",
      },
      {
        role: "IT Systems Intern",
        company: "State University of Western Paraná (UNIOESTE)",
        period: "Mar 2020 – Feb 2022",
        duration: "2 years",
        location: "Cascavel, Paraná, Brazil",
        description:
          "Installation and configuration of Windows and Linux operating systems, software and applications. User support for the academic community and administration of institutional systems and e-mail.",
      },
    ],
    educations: [
      {
        degree: "B.Eng. in Computer Engineering",
        institution: "UTFPR – Federal University of Technology of Paraná",
        period: "2018 – 2023",
        location: "Cascavel, Paraná, Brazil",
      },
    ],
  },
  skills: {
    title: "Skills",
    subtitle: "Technologies I work with",
    categories: {
      frontend: "Frontend",
      backend: "Backend",
      mobile: "Mobile",
      tools: "Database & Tools",
    },
    categoryDesc: {
      frontend: "Interfaces, frameworks & styling",
      backend: "Servers, APIs & messaging",
      mobile: "Cross-platform mobile apps",
      tools: "Databases, DevOps & integrations",
    },
  },
  projects: {
    title: "Projects",
    subtitle: "Some of my recent work",
    project: "Project",
    live: "Live",
    visitSite: "Visit site",
    inHouse: "In-house platform",
  },
  contact: {
    title: "Contact",
    subtitle: "Let's build something together",
    description: "I'm always open to new opportunities and collaborations. Feel free to reach out!",
    sendEmail: "Send an Email",
    seeGithub: "GitHub",
    linkedin: "LinkedIn",
  },
  language: {
    flag: "🇺🇸",
    label: "EN-US",
    switchTo: "Mudar para Português",
  },
};

const pt: typeof en = {
  nav: {
    home: "Início",
    about: "Sobre",
    skills: "Skills",
    projects: "Projetos",
    contact: "Contato",
  },
  hero: {
    name: "Lucca Gabriel",
    title: "Engenheiro de Computação",
    role: "Desenvolvedor Full-Stack",
    subtitle: "Construindo do front-end ao back-end — e tudo no meio.",
    badge: "Desenvolvedor Full-Stack · Em órbita desde 2022",
    cta: "Iniciar Missão",
  },
  about: {
    title: "Sobre Mim",
    bio: "Engenheiro de Computação pela UTFPR – Universidade Tecnológica Federal do Paraná, atuando como Desenvolvedor Full-Stack. Experiência em desenvolvimento de aplicações web com ReactJS e back-end em Node.js, além de desenvolvimento e publicação de aplicativos mobile com Flutter nas lojas Google Play e Apple App Store. Também possuo domínio em Python e experiência em tecnologias complementares para entrega de soluções completas de software.",
    experience: "Experiência",
    education: "Formação",
    experiences: [
      {
        role: "Desenvolvedor Full-Stack",
        company: "Wikidados – Soluções e Desenvolvimentos",
        period: "nov 2022 – Presente",
        duration: "3+ anos",
        location: "Cascavel, Paraná, Brasil · Presencial",
        description:
          "Atuei como desenvolvedor Flutter exclusivo do aplicativo da empresa, sendo responsável por sua concepção, desenvolvimento e manutenção para iOS e Android — disponível na App Store e Play Store. Também fui responsável pela criação de servidores back-end em Node.js, realizando integrações com dispositivos GPS e APIs externas, e colaborei no desenvolvimento de interfaces web com Vue.js para o painel administrativo.",
      },
      {
        role: "Estagiário de Sistemas da Informação",
        company: "Universidade Estadual do Oeste do Paraná (UNIOESTE)",
        period: "mar 2020 – fev 2022",
        duration: "2 anos",
        location: "Cascavel, Paraná, Brasil",
        description:
          "Instalação e configuração de Sistemas Operacionais Windows e Linux; instalação e configuração de softwares e aplicativos; suporte a usuários da comunidade acadêmica da UNIOESTE; acesso aos sistemas administrativos e de e-mail da instituição.",
      },
    ],
    educations: [
      {
        degree: "Bacharelado em Engenharia de Computação",
        institution: "UTFPR – Universidade Tecnológica Federal do Paraná",
        period: "2018 – 2023",
        location: "Cascavel, Paraná, Brasil",
      },
    ],
  },
  skills: {
    title: "Habilidades",
    subtitle: "Tecnologias com as quais trabalho",
    categories: {
      frontend: "Frontend",
      backend: "Backend",
      mobile: "Mobile",
      tools: "Banco de Dados & Ferramentas",
    },
    categoryDesc: {
      frontend: "Interfaces, frameworks e estilização",
      backend: "Servidores, APIs e mensageria",
      mobile: "Apps mobile multiplataforma",
      tools: "Bancos de dados, DevOps e integrações",
    },
  },
  projects: {
    title: "Projetos",
    subtitle: "Alguns dos meus trabalhos recentes",
    project: "Projeto",
    live: "No ar",
    visitSite: "Visitar site",
    inHouse: "Plataforma interna",
  },
  contact: {
    title: "Contato",
    subtitle: "Vamos construir algo juntos",
    description: "Estou sempre aberto a novas oportunidades e colaborações. Sinta-se à vontade para entrar em contato!",
    sendEmail: "Enviar E-mail",
    seeGithub: "GitHub",
    linkedin: "LinkedIn",
  },
  language: {
    flag: "🇧🇷",
    label: "PT-BR",
    switchTo: "Switch to English",
  },
};

export const TRANSLATIONS = { en, pt };

export type Lang = keyof typeof TRANSLATIONS;
