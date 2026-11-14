import React from 'react';

type CornerVariant = 'tl' | 'tr' | 'bl' | 'br';

const CORNER_PATHS: Record<CornerVariant, string> = {
  tl: 'M0 11.5V0.5H11.5',
  tr: 'M0.5 0.5H11.5V11.5',
  bl: 'M0 0.5V11.5H11.5',
  br: 'M0.5 11.5H11.5V0.5',
};

interface CornerBracketProps {
  variant: CornerVariant;
  className?: string;
}

export const CornerBracket: React.FC<CornerBracketProps> = ({
  variant,
  className = '',
}) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
    className={`text-gold ${className}`}
    style={{ width: 'var(--corner)', height: 'var(--corner)' }}
  >
    <path d={CORNER_PATHS[variant]} />
  </svg>
);

export const Checkerboard: React.FC = () => {
  const rows = [0, 1, 2, 3];
  const rowPitch = 4.5;
  const colPitch = 4.5;

  const rects: { x: number; y: number; key: string }[] = [];
  for (const row of rows) {
    const isEvenRow = row % 2 === 1;
    const shift = isEvenRow ? 2.25 : 0;
    const cols = isEvenRow ? 7 : 8;
    for (let col = 0; col < cols; col++) {
      rects.push({
        x: col * colPitch + shift,
        y: row * rowPitch,
        key: `${row}-${col}`,
      });
    }
  }

  return (
    <svg
      viewBox="0 0 36 18"
      fill="currentColor"
      aria-hidden="true"
      className="inline-block shrink-0 text-gold translate-y-[-0.12em]"
      style={{ width: 'var(--checker-w)', height: 'var(--checker-h)' }}
    >
      {rects.map((rect) => (
        <rect
          key={rect.key}
          x={rect.x}
          y={rect.y}
          width={3.8}
          height={3.8}
        />
      ))}
    </svg>
  );
};

export const WireframeGlobe: React.FC = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.2}
    aria-hidden="true"
    className="text-gold"
    style={{ width: 'var(--globe)', height: 'var(--globe)' }}
  >
    <circle cx="32" cy="32" r="28" />
    <line x1="4" y1="32" x2="60" y2="32" />
    <ellipse cx="32" cy="32" rx="28" ry="10" />
    <ellipse cx="32" cy="32" rx="28" ry="20" />
    <line x1="32" y1="4" x2="32" y2="60" />
    <ellipse cx="32" cy="32" rx="10" ry="28" />
    <ellipse cx="32" cy="32" rx="20" ry="28" />
  </svg>
);
