"use client";

// Next
import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; opacity: number; speed: number; pulse: number; depth: number };
// A star of the arrival's 3D field: at z = 1 its x spans the screen's width, and it travels towards the camera
type WarpStar = { x: number; y: number; z: number; depth: number; opacity: number; pulse: number; bornAt: number };
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
// On load the camera comes out of hyperspace: the stars stream past it and slow to a stop as the splash ends, in ms
const ARRIVAL = 2200;
// Depth the camera crosses per second as the arrival starts, easing to nothing by its end
const WARP_SPEED = 0.9;
// The closest a star gets before it passes the camera and goes back to depth 1
const NEAR = 0.05;
// Pixels a star moves per pixel scrolled at depth 1; nearer stars are also bigger and drift faster
const PARALLAX = 0.12;

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

export default function StarsBackground({ scrollRef }: { scrollRef: React.RefObject<HTMLElement | null> }) {
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

    const start = performance.now();
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const makeWarpStar = (z: number, bornAt: number): WarpStar => ({
      x: Math.random() * 2 - 1,
      y: (Math.random() * 2 - 1) * (canvas.height / canvas.width),
      z,
      depth: 0,
      opacity: Math.random() * 0.65 + 0.15,
      pulse: Math.random() * Math.PI * 2,
      bornAt,
    });
    // Spread evenly through the volume, so the screen is full from the first frame; about a third of them are on it
    let warp: WarpStar[] | null = isReduced ? null : Array.from({ length: 900 }, () => makeWarpStar(NEAR + Math.random() * (1 - NEAR), -Infinity));
    const stars: Star[] = isReduced
      ? Array.from({ length: 300 }, () => {
          const depth = 0.2 + Math.random() * 0.8;

          return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: 0.2 + depth * 1.4,
            opacity: Math.random() * 0.65 + 0.15,
            speed: 0.02 + depth * 0.13,
            pulse: Math.random() * Math.PI * 2,
            depth,
          };
        })
      : [];
    const comets: (Comet | null)[] = [null, null, null, null];
    // Staggered first appearances, counted from the end of the arrival so none crosses the splash
    const cometTimers = [120, 300, 480, 660];
    let last = start;

    const isOffScreen = (comet: Comet) => comet.x < -150 || comet.x > canvas.width + 150 || comet.y < -150 || comet.y > canvas.height + 150;

    const animate = (now: number) => {
      const scrollTop = scrollRef.current?.scrollTop ?? 0;
      const elapsed = now - start;
      // Capped, so the first frame after a hidden tab does not throw the field forward
      const seconds = Math.min(now - last, 50) / 1000;
      last = now;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.globalAlpha = isReduced ? 1 : Math.min(1, elapsed / 400);

      NEBULAS.forEach(({ cx, cy, r, color }, index) => {
        const x = canvas.width * (cx + Math.sin(now / 24000 + index * 1.7) * 0.02);
        const y = canvas.height * (cy + Math.cos(now / 30000 + index * 2.3) * 0.02) - scrollTop * PARALLAX * 0.15;
        const gradient = context.createRadialGradient(x, y, 0, x, y, canvas.width * r);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
      });

      if (warp) {
        const progress = Math.min(1, elapsed / ARRIVAL);
        const speed = WARP_SPEED * (1 - progress) ** 2;
        const half = canvas.width / 2;

        warp.forEach((star) => {
          star.z -= speed * seconds;
          star.pulse += 0.004;
          if (star.z <= NEAR) Object.assign(star, makeWarpStar(1, now));

          // On screen, z is spread as z², so this mapping leaves the depths even once the field stops
          star.depth = 0.2 + 0.8 * (1 - star.z ** 3);
          const x = centerX + (star.x / star.z) * half;
          const y = centerY + (star.y / star.z) * half;
          if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) return;

          const r = 0.2 + star.depth * 1.4;
          const alpha = Math.max(0, Math.min(1, star.opacity + Math.sin(star.pulse) * 0.2)) * Math.min(1, (now - star.bornAt) / 300);
          // The streak runs back to where the star was 60ms of travel ago
          const tailZ = star.z + speed * 0.06;

          context.beginPath();
          context.moveTo(centerX + (star.x / tailZ) * half, centerY + (star.y / tailZ) * half);
          context.lineTo(x, y);
          context.strokeStyle = `rgba(255,255,255,${alpha * 0.6})`;
          context.lineWidth = r;
          context.stroke();

          context.beginPath();
          context.arc(x, y, r, 0, Math.PI * 2);
          context.fillStyle = `rgba(255,255,255,${alpha})`;
          context.fill();

          if (progress === 1 && now - star.bornAt > 300) stars.push({ x, y, r, opacity: star.opacity, speed: 0.02 + star.depth * 0.13, pulse: star.pulse, depth: star.depth });
        });

        if (progress === 1) warp = null;
      } else {
        stars.forEach((star) => {
          star.pulse += 0.004;
          star.y += star.speed * 0.055;
          if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
          }

          const y = (((star.y - scrollTop * PARALLAX * star.depth) % canvas.height) + canvas.height) % canvas.height;

          context.beginPath();
          context.arc(star.x, y, star.r, 0, Math.PI * 2);
          context.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, star.opacity + Math.sin(star.pulse) * 0.2))})`;
          context.fill();
        });
      }

      context.globalAlpha = 1;

      comets.forEach((current, path) => {
        if (warp) return;

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

    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, [scrollRef]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
