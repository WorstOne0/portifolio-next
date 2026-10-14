// Next
import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Sora } from "next/font/google";
// Components
import Providers from "./providers";
// Styles
import "@/styles/index.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

const DESCRIPTION = "Projetos, experiência e contato de Lucca Gabriel, desenvolvedor full-stack.";

export const metadata: Metadata = {
  metadataBase: new URL("https://luccagabriel.dev"),
  title: "Lucca Gabriel | Portfolio",
  description: DESCRIPTION,
  icons: { icon: "/logo/logo.png" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Lucca Gabriel",
    title: "Lucca Gabriel · Desenvolvedor Full-Stack",
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${sora.variable} ${jetbrainsMono.variable}`}>
      <body className="h-full w-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
