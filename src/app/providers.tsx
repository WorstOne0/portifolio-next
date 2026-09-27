"use client";

// Next
import { useEffect } from "react";
// Controllers
import { useLanguageController } from "@/core/controllers";

export default function Providers({ children }: { children: React.ReactNode }) {
  const lang = useLanguageController((state) => state.lang);

  useEffect(() => {
    useLanguageController.persist.rehydrate();
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  return children;
}
