"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  text: string;
  fontSize?: string; // ex: "text-4xl"
  duration?: number; // en ms
  direction?: "left" | "right";
  className?: string;
  delay?: number;
}

export default function AutoTorchRevealText({
  text,
  fontSize = "text-4xl",
  duration = 2000,
  direction = "left",
  className = "",
  delay = 0,
}: Props) {
  const maskRef = useRef<HTMLCanvasElement>(null);
  const lightRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const revealedZones = useRef<Set<number>>(new Set());
  const [showTorch, setShowTorch] = useState(true);

  useEffect(() => {
    const maskCanvas = maskRef.current;
    const lightCanvas = lightRef.current;
    const container = containerRef.current;
    if (!maskCanvas || !lightCanvas || !container) return;

    const maskCtx = maskCanvas.getContext("2d");
    const lightCtx = lightCanvas.getContext("2d");
    if (!maskCtx || !lightCtx) return;

    const { offsetWidth: width, offsetHeight: height } = container;
    maskCanvas.width = width;
    maskCanvas.height = height;
    lightCanvas.width = width;
    lightCanvas.height = height;

    // ✅ Masque noir initial dès le début
    maskCtx.fillStyle = "rgba(0, 0, 0, 0.98)";
    maskCtx.fillRect(0, 0, width, height);

    const step = 4;
    const totalSteps = Math.ceil(width / step);
    let progress = 0;

    const animate = () => {
      const currentIndex =
        direction === "left" ? progress : totalSteps - progress;

      for (let i = 0; i < totalSteps; i++) {
        if (!revealedZones.current.has(i)) {
          const shouldReveal =
            direction === "left" ? i <= currentIndex : i >= currentIndex;
          if (shouldReveal) revealedZones.current.add(i);
        }
      }

      maskCtx.clearRect(0, 0, width, height);
      maskCtx.fillStyle = "rgba(0, 0, 0, 0.98)";
      for (let i = 0; i < totalSteps; i++) {
        if (!revealedZones.current.has(i)) {
          maskCtx.fillRect(i * step, 0, step, height);
        }
      }

      lightCtx.clearRect(0, 0, width, height);
      if (progress <= totalSteps) {
        const torchX =
          direction === "left"
            ? currentIndex * step
            : (totalSteps - currentIndex) * step;

        const grad = lightCtx.createRadialGradient(
          torchX,
          height / 2,
          0,
          torchX,
          height / 2,
          120
        );
        grad.addColorStop(0, "rgba(255,255,200,0.3)");
        grad.addColorStop(1, "rgba(255,255,200,0)");
        lightCtx.fillStyle = grad;
        lightCtx.beginPath();
        lightCtx.arc(torchX, height / 2, 120, 0, Math.PI * 2);
        lightCtx.fill();
      }

      progress++;
      if (progress <= totalSteps) {
        requestAnimationFrame(animate);
      } else {
        setShowTorch(false);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [duration, direction, delay]);
  return (
    <div
      className={`relative block ${fontSize} font-bold ${className}`}
      ref={containerRef}
    >
      {/* Texte en dessous — forcé blanc mais masqué par calque */}
      <div className="relative z-10 text-white whitespace-pre-wrap opacity-100">
        {text}
      </div>
      {/* Masques visibles uniquement pendant l'animation */}
      {showTorch && (
        <>
          <canvas
            ref={lightRef}
            className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
          />
          <canvas
            ref={maskRef}
            className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none"
          />
        </>
      )}
    </div>
  );
}
