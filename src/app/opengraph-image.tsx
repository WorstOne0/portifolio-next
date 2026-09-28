import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Lucca Gabriel · Desenvolvedor Full-Stack";

// x, y, diameter in px
const STARS = [
  [96, 64, 3],
  [412, 38, 2],
  [610, 96, 3],
  [1130, 70, 2],
  [880, 40, 3],
  [60, 560, 2],
  [520, 590, 3],
  [700, 540, 2],
  [1150, 580, 3],
  [760, 300, 2],
];

export default async function OpengraphImage() {
  // Read from disk rather than fetching a URL: this runs at build time, when the site is not yet serving.
  const logo = await fs.readFile(path.join(process.cwd(), "public/logo/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px",
          background: "radial-gradient(circle at 80% 50%, #5b21b6 0%, #1a1440 38%, #090b14 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {STARS.map(([x, y, d]) => (
          <div
            key={`${x}-${y}`}
            style={{ position: "absolute", left: x, top: y, width: d, height: d, borderRadius: d, background: "white", opacity: 0.7 }}
          />
        ))}

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <span style={{ fontSize: 30, color: "#a78bfa" }}>portfolio.kuuhaku.dev</span>
          <span style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.05, marginTop: 18 }}>Lucca Gabriel</span>
          <span style={{ fontSize: 42, fontWeight: 600, marginTop: 36 }}>Desenvolvedor Full-Stack</span>
          <span style={{ fontSize: 28, color: "#8892a4", marginTop: 20 }}>Flutter, React, Next.js e Node.js</span>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={340} height={340} alt="" />
      </div>
    ),
    size
  );
}
