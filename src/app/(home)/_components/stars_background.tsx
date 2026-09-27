"use client";

// Next
import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; opacity: number; speed: number; pulse: number };
type TrailParticle = { x: number; y: number; opacity: number; size: number };
type Comet = { x: number; y: number; vx: number; vy: number; trail: TrailParticle[]; color: [number, number, number] };

// Canvas takes concrete colours: the palette's violet-800 and blue-600 at a low alpha, plus a teal.
const NEBULAS = [
  { cx: 0.74, cy: 0.2, r: 0.44, color: "rgba(91, 33, 182, 0.13)" },
  { cx: 0.14, cy: 0.78, r: 0.36, color: "rgba(11, 94, 205, 0.12)" },
  { cx: 0.5, cy: 0.48, r: 0.28, color: "rgba(14, 90, 110, 0.07)" },
  { cx: 0.88, cy: 0.65, r: 0.22, color: "rgba(91, 33, 182, 0.06)" },
];
// Frames between two comets on each of the four paths, at about 60 fps
const COMET_INTERVALS = [660, 720, 780, 840];

// The four paths: left to right rising, right to left falling, a top-right diagonal, a steep climb from the left
const makeComet = (canvas: HTMLCanvasElement, path: number): Comet => {
  const speed = 3.2 + Math.random() * 2.6;
  const paths: Omit<Comet, "trail">[] = [
    { x: -70, y: canvas.height * (0.15 + Math.random() * 0.4), vx: speed, vy: -speed * 0.07, color: [130, 190, 255] },
    { x: canvas.width + 70, y: canvas.height * (0.4 + Math.random() * 0.35), vx: -speed, vy: speed * 0.08, color: [180, 140, 255] },
    { x: canvas.width * (0.55 + Math.random() * 0.35), y: -70, vx: -speed * 0.65, vy: speed * 0.75, color: [120, 210, 200] },
    { x: -70, y: canvas.height * (0.55 + Math.random() * 0.3), vx: speed * 0.9, vy: -speed * 0.44, color: [255, 200, 120] },
  ];

  return { ...paths[path], trail: [] };
};

export default function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let frame: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars: Star[] = Array.from({ length: 300 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.2,
      opacity: Math.random() * 0.65 + 0.15,
      speed: Math.random() * 0.15 + 0.02,
      pulse: Math.random() * Math.PI * 2,
    }));
    const comets: (Comet | null)[] = [null, null, null, null];
    // Staggered first appearances
    const cometTimers = [180, 420, 660, 900];

    const isOffScreen = (comet: Comet) => comet.x < -150 || comet.x > canvas.width + 150 || comet.y < -150 || comet.y > canvas.height + 150;

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      NEBULAS.forEach(({ cx, cy, r, color }) => {
        const gradient = context.createRadialGradient(canvas.width * cx, canvas.height * cy, 0, canvas.width * cx, canvas.height * cy, canvas.width * r);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
      });

      stars.forEach((star) => {
        star.pulse += 0.004;
        context.beginPath();
        context.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        context.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, star.opacity + Math.sin(star.pulse) * 0.2))})`;
        context.fill();
        star.y += star.speed * 0.055;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      comets.forEach((current, path) => {
        if (!current) {
          cometTimers[path]++;
          if (cometTimers[path] < COMET_INTERVALS[path]) return;

          cometTimers[path] = 0;
          comets[path] = makeComet(canvas, path);
          return;
        }

        const comet = current;
        const [red, green, blue] = comet.color;

        comet.trail.push({ x: comet.x, y: comet.y, opacity: 0.9, size: 2.6 + Math.random() });
        comet.x += comet.vx;
        comet.y += comet.vy;
        comet.trail = comet.trail.filter((particle) => particle.opacity > 0.012);
        comet.trail.forEach((particle) => {
          particle.opacity *= 0.86;
          particle.size *= 0.92;

          const glow = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3.2);
          glow.addColorStop(0, `rgba(${red},${green},${blue},${particle.opacity})`);
          glow.addColorStop(0.4, `rgba(${red},${green},${blue},${particle.opacity * 0.45})`);
          glow.addColorStop(1, "rgba(0,0,0,0)");
          context.fillStyle = glow;
          context.beginPath();
          context.arc(particle.x, particle.y, particle.size * 3.2, 0, Math.PI * 2);
          context.fill();
        });

        const head = context.createRadialGradient(comet.x, comet.y, 0, comet.x, comet.y, 8);
        head.addColorStop(0, "rgba(255,255,255,1)");
        head.addColorStop(0.3, `rgba(${red},${green},${blue},0.85)`);
        head.addColorStop(0.7, `rgba(${red},${green},${blue},0.3)`);
        head.addColorStop(1, "rgba(0,0,0,0)");
        context.fillStyle = head;
        context.beginPath();
        context.arc(comet.x, comet.y, 8, 0, Math.PI * 2);
        context.fill();

        if (isOffScreen(comet)) comets[path] = null;
      });

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
