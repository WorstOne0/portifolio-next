// Next
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
// Components
import Providers from "./providers";
// Styles
import "@/styles/index.css";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

const DESCRIPTION = "Projetos, experiência e contato de Lucca Gabriel, desenvolvedor full-stack.";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.kuuhaku.dev"),
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
    <html lang="pt-BR" className={nunito.variable}>
      <body className="h-full w-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
