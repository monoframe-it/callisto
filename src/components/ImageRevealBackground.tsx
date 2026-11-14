import React, { useEffect, useId, useRef, useState } from 'react';
import { BG_IMAGE_1, BG_IMAGE_2 } from '../data/catalog';

function computeCellSize(): number {
  if (typeof window === 'undefined') return 48;
  return Math.round(Math.min(64, Math.max(36, window.innerWidth * 0.028)));
}

export const ImageRevealBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const revealLayerRef = useRef<HTMLDivElement | null>(null);
  const patternRef = useRef<SVGPatternElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const smoothRef = useRef({ x: -1000, y: -1000 });
  const gridOffsetRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  const [cellSize, setCellSize] = useState<number>(computeCellSize);
  const patternId = useId();

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const getDimensions = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      return {
        w: Math.max(1, Math.round(rect?.width ?? window.innerWidth)),
        h: Math.max(1, Math.round(rect?.height ?? window.innerHeight)),
        left: rect?.left ?? 0,
        top: rect?.top ?? 0,
      };
    };

    const syncDimensions = () => {
      const { w, h } = getDimensions();
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      setCellSize(computeCellSize());

      if (!hasMovedRef.current && revealLayerRef.current) {
        ctx.clearRect(0, 0, w, h);
        const emptyMask = canvas.toDataURL();
        revealLayerRef.current.style.maskImage = `url(${emptyMask})`;
        revealLayerRef.current.style.webkitMaskImage = `url(${emptyMask})`;
      }
    };

    syncDimensions();

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top } = getDimensions();
      const relX = e.clientX - left;
      const relY = e.clientY - top;
      mouseRef.current.x = relX;
      mouseRef.current.y = relY;
      if (!hasMovedRef.current) {
        smoothRef.current.x = relX;
        smoothRef.current.y = relY;
        hasMovedRef.current = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', syncDimensions);

    let rafId = 0;

    const renderFrame = () => {
      const { w, h } = getDimensions();

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      const mouse = mouseRef.current;
      const smooth = smoothRef.current;

      if (hasMovedRef.current) {
        smooth.x += (mouse.x - smooth.x) * 0.1;
        smooth.y += (mouse.y - smooth.y) * 0.1;

        const radius = Math.round(
          Math.min(420, Math.max(160, window.innerWidth * 0.16))
        );

        ctx.clearRect(0, 0, w, h);
        const gradient = ctx.createRadialGradient(
          smooth.x,
          smooth.y,
          0,
          smooth.x,
          smooth.y,
          radius
        );
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.4, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.6, 'rgba(255,255,255,0.75)');
        gradient.addColorStop(0.75, 'rgba(255,255,255,0.4)');
        gradient.addColorStop(0.88, 'rgba(255,255,255,0.12)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(smooth.x, smooth.y, radius, 0, Math.PI * 2);
        ctx.fill();

        if (revealLayerRef.current) {
          const dataUrl = canvas.toDataURL();
          revealLayerRef.current.style.maskImage = `url(${dataUrl})`;
          revealLayerRef.current.style.webkitMaskImage = `url(${dataUrl})`;
        }

        const cx = w > 0 ? smooth.x / w - 0.5 : 0;
        const cy = h > 0 ? smooth.y / h - 0.5 : 0;
        const targetOffsetX = cx * 16;
        const targetOffsetY = cy * 16;

        gridOffsetRef.current.x +=
          (targetOffsetX - gridOffsetRef.current.x) * 0.06;
        gridOffsetRef.current.y +=
          (targetOffsetY - gridOffsetRef.current.y) * 0.06;

        if (patternRef.current) {
          patternRef.current.setAttribute(
            'x',
            gridOffsetRef.current.x.toFixed(2)
          );
          patternRef.current.setAttribute(
            'y',
            gridOffsetRef.current.y.toFixed(2)
          );
        }
      }

      rafId = window.requestAnimationFrame(renderFrame);
    };

    rafId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', syncDimensions);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex-1 min-h-[540px] overflow-hidden"
      style={{ position: 'relative', zIndex: 1 }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${BG_IMAGE_1}")` }}
      />
      <div
        ref={revealLayerRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${BG_IMAGE_2}")`,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(11,10,9,0.88) 0%, rgba(11,10,9,0.62) 32%, rgba(11,10,9,0.18) 58%, rgba(11,10,9,0.42) 100%), linear-gradient(180deg, rgba(11,10,9,0.35) 0%, rgba(11,10,9,0) 22%, rgba(11,10,9,0.55) 100%)',
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.08 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            ref={patternRef}
            id={patternId}
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
            x={0}
            y={0}
          >
            <path
              d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
              fill="none"
              stroke="#c6a15b"
              strokeWidth={0.6}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
};
