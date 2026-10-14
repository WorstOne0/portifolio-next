"use client";

// Next
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
// Components
import About from "./_components/about";
import Contact from "./_components/contact";
import FloatingAstronaut from "./_components/floating_astronaut";
import Hero from "./_components/hero";
import LogoSplash from "./_components/logo_splash";
import NavBar from "./_components/nav_bar";
import Projects from "./_components/projects";
import Skills from "./_components/skills";
import StarsBackground from "./_components/stars_background";

const SPLASH = 2000;

export default function HomePage() {
  const [isShowingLogo, setIsShowingLogo] = useState(true);
  // The page scrolls inside <main>, not the window: the nav, the hero's buttons, the footer, the astronaut and the stars all follow it
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setIsShowingLogo(false), SPLASH);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="h-full w-full flex">
        <StarsBackground scrollRef={scrollRef} />
        <AnimatePresence>{isShowingLogo && <LogoSplash key="splash" />}</AnimatePresence>

        {!isShowingLogo && (
          <>
            <NavBar scrollRef={scrollRef} />
            <main ref={scrollRef} className="scrollbar-space relative z-10 grow overflow-y-scroll">
              <Hero scrollRef={scrollRef} />
              <About />
              <Skills />
              <Projects />
              <Contact scrollRef={scrollRef} />
            </main>
            <FloatingAstronaut scrollRef={scrollRef} />
          </>
        )}
      </div>
    </MotionConfig>
  );
}
