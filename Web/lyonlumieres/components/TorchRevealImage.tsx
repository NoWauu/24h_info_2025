"use client";

import { useRef, useEffect, useState } from "react";

interface Props {
  src: string;
  width?: number;
  height?: number;
  onRevealChange?: (ratio: number) => void;
  grayscale?: number;
}

export default function TorchRevealImage({
  src,
  width = 400,
  height = 400,
  onRevealChange,
  grayscale = 0,
}: Props) {
  const lightCanvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null
  );
  const revealedZones = useRef<Set<string>>(new Set());
  const revealedRatio = useRef(0); // 👉 pour cacher le halo si 100%
  const radius = 100;
  const gridSize = 10;
  const totalZones = Math.ceil(width / gridSize) * Math.ceil(height / gridSize);

  useEffect(() => {
    const maskCanvas = maskCanvasRef.current;
    const lightCanvas = lightCanvasRef.current;
    const maskCtx = maskCanvas?.getContext("2d");
    const lightCtx = lightCanvas?.getContext("2d");

    if (!maskCanvas || !maskCtx || !lightCtx) return;

    const draw = () => {
      maskCtx.clearRect(0, 0, width, height);
      maskCtx.fillStyle = "rgba(0, 0, 0, 1)";
      maskCtx.fillRect(0, 0, width, height);

      lightCtx.clearRect(0, 0, width, height);

      if (mousePos && revealedRatio.current < 1) {
        // 🌕 halo
        const grad = lightCtx.createRadialGradient(
          mousePos.x,
          mousePos.y,
          0,
          mousePos.x,
          mousePos.y,
          radius * 1.5
        );
        grad.addColorStop(0, "rgba(255,255,200,0.3)");
        grad.addColorStop(1, "rgba(255,255,200,0)");
        lightCtx.fillStyle = grad;
        lightCtx.beginPath();
        lightCtx.arc(mousePos.x, mousePos.y, radius * 1.5, 0, Math.PI * 2);
        lightCtx.fill();

        // Zones révélées
        const startX = Math.floor((mousePos.x - radius) / gridSize);
        const endX = Math.ceil((mousePos.x + radius) / gridSize);
        const startY = Math.floor((mousePos.y - radius) / gridSize);
        const endY = Math.ceil((mousePos.y + radius) / gridSize);

        let updated = false;

        for (let gx = startX; gx <= endX; gx++) {
          for (let gy = startY; gy <= endY; gy++) {
            if (gx < 0 || gy < 0) continue;
            const cx = gx * gridSize + gridSize / 2;
            const cy = gy * gridSize + gridSize / 2;
            const dx = cx - mousePos.x;
            const dy = cy - mousePos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist <= radius) {
              const key = `${gx}-${gy}`;
              if (!revealedZones.current.has(key)) {
                revealedZones.current.add(key);
                updated = true;
              }
            }
          }
        }

        if (updated && onRevealChange) {
          const ratio = revealedZones.current.size / totalZones;
          revealedRatio.current = ratio;
          onRevealChange(Math.min(1, ratio));
        }
      }

      // 🕳️ Masque avec trous
      revealedZones.current.forEach((pos) => {
        const [x, y] = pos.split("-").map(Number);
        const cx = x * gridSize + gridSize / 2;
        const cy = y * gridSize + gridSize / 2;
        const grad = maskCtx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(1, "rgba(0,0,0,1)");
        maskCtx.globalCompositeOperation = "destination-out";
        maskCtx.fillStyle = grad;
        maskCtx.beginPath();
        maskCtx.arc(cx, cy, radius, 0, 2 * Math.PI);
        maskCtx.fill();
        maskCtx.globalCompositeOperation = "source-over";
      });

      requestAnimationFrame(draw);
    };

    draw();
  }, [mousePos, onRevealChange]);

  return (
    <div
      className="relative"
      style={{ width, height }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
      onMouseLeave={() => {
        setMousePos(null);
      }}
    >
      {/* Image */}
      <img
        ref={imageRef}
        src={src}
        alt="Torch image"
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ filter: `grayscale(${grayscale})`, transition: "filter 0.4s" }}
      />

      {/* Halo */}
      <canvas
        ref={lightCanvasRef}
        width={width}
        height={height}
        className="absolute top-0 left-0 pointer-events-none z-10"
      />

      {/* Masque noir */}
      <canvas
        ref={maskCanvasRef}
        width={width}
        height={height}
        className="absolute top-0 left-0 pointer-events-none z-20"
      />
    </div>
  );
}
