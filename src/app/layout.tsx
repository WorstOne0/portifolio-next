// Next
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
// Components
import Providers from "./providers";
// Styles
import "@/styles/index.css";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: "Lucca Gabriel | Portfolio",
  description: "Full-stack developer portfolio by Lucca Gabriel.",
  icons: { icon: "/logo/logo.png" },
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
