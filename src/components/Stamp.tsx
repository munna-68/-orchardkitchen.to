'use client';

import React, { useId, useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';

/**
 * Scalloped seal with text running round a circle. Rotates with scroll.
 */
export default function Stamp({
  text,
  center,
  className = '',
  tone = 'orange',
  size = 132,
}: {
  text: string;
  center: React.ReactNode;
  className?: string;
  tone?: 'orange' | 'lime';
  size?: number;
}) {
  const id = useId().replace(/:/g, '');
  const ring = useRef<SVGGElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.to(ring.current, {
          rotation: 360,
          svgOrigin: '100 100',
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        });
      });
    },
    { scope: root },
  );

  const bg = tone === 'orange' ? '#EE8A2B' : '#FFD66B';
  const fg = tone === 'orange' ? '#FFFBEF' : '#D94F3A';
  // scalloped edge: 24 bumps
  const bumps = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    return { x: 100 + Math.cos(a) * 88, y: 100 + Math.sin(a) * 88 };
  });

  return (
    <div
      ref={root}
      className={`${/\b(absolute|fixed)\b/.test(className) ? "" : "relative "}${className}`} style={{ width: size, height: size }} aria-hidden>
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_6px_10px_rgba(42, 26, 20,0.35)]">
        <g fill={bg}>
          <circle cx="100" cy="100" r="88" />
          {bumps.map((b, i) => (
            <circle key={i} cx={b.x} cy={b.y} r="12" />
          ))}
        </g>
        <circle cx="100" cy="100" r="78" fill="none" stroke={fg} strokeWidth="1.5" strokeDasharray="3 4" />
        <circle cx="100" cy="100" r="46" fill="none" stroke={fg} strokeWidth="1.5" />
        <defs>
          <path id={`ring-${id}`} d="M100,100 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" />
        </defs>
        <g ref={ring}>
          <text fill={fg} fontSize="15" fontWeight="800" style={{ fontVariationSettings: '"wdth" 80' }}>
            <textPath href={`#ring-${id}`} textLength="386" lengthAdjust="spacing">
              {text}
            </textPath>
          </text>
        </g>
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center text-center leading-none"
        style={{ color: fg }}
      >
        {center}
      </div>
    </div>
  );
}
