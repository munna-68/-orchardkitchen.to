'use client';

import React, { useRef, useState } from 'react';
import { gsap, useGSAP, PRELOADER_DONE, preloaderWillRun } from '@/lib/gsap';

const WORD = 'UNPROCESSED';
const DIVE_CHAR = 3; // the "P" — dive through its stem

/**
 * Preloader that becomes the hero: a dark cover with the word cut out of it.
 * The real hero photo sits behind, so letters fill with the photo bottom-up while
 * a counter runs 000→100; then the camera dives through the stem of the "P" and
 * the photo fills the screen as the hero. Plays once per session.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const [dims, setDims] = useState({ w: 1440, h: 900 });
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      if (!preloaderWillRun()) {
        setDone(true);
        return;
      }
      const html = document.documentElement;
      const finish = () => {
        try {
          sessionStorage.setItem('ok-preloaded', '1');
        } catch {}
        html.classList.add('preloaded');
        html.style.overflow = '';
        setDone(true);
      };

      window.scrollTo(0, 0);
      html.style.overflow = 'hidden';
      const w = window.innerWidth;
      const h = window.innerHeight;
      setDims({ w, h });

      let tl: gsap.core.Timeline | undefined;
      let cancelled = false;

      // wait for fonts + one frame after the resize so SVG text metrics are honest
      document.fonts.ready.then(() =>
        requestAnimationFrame(() => {
          if (cancelled || !svg.current) return;
          const q = gsap.utils.selector(svg.current);
          const outline = q('[data-outline]')[0] as unknown as SVGTextElement;
          const texts = q('[data-word]') as unknown as SVGTextElement[];

          // fit the word to ~88% of the viewport width
          const base = 200;
          texts.forEach((t) => t.setAttribute('font-size', String(base)));
          const len = outline.getComputedTextLength() || base * 5;
          const size = Math.min((w * 0.88 * base) / len, h * 0.55);
          texts.forEach((t) => t.setAttribute('font-size', size.toFixed(1)));

          requestAnimationFrame(() => {
            if (cancelled) return;
            let ox = w / 2;
            let oy = h / 2;
            try {
              const r = outline.getExtentOfChar(DIVE_CHAR);
              ox = r.x + r.width * 0.2;
              oy = r.y + r.height * 0.58;
            } catch {
              ox = w / 2 - size * 0.9;
            }

            const counter = { v: 0 };
            const counterEl = root.current?.querySelector('[data-counter]');
            const photo = document.querySelector<HTMLElement>('[data-hero-photo]');

            tl = gsap.timeline({ onComplete: finish });
            if (photo) tl.fromTo(photo, { scale: 1.35 }, { scale: 1, duration: 3.1, ease: 'power2.inOut' }, 0);
            tl.fromTo(
              outline,
              { strokeDashoffset: 900 },
              { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' },
              0,
            )
              .to(q('[data-stop]'), { attr: { offset: 1 }, duration: 1.6, ease: 'power2.inOut' }, 0.15)
              .to(
                counter,
                {
                  v: 100,
                  duration: 1.6,
                  ease: 'power2.inOut',
                  onUpdate: () => {
                    if (counterEl) counterEl.textContent = String(Math.round(counter.v)).padStart(3, '0');
                  },
                },
                0.15,
              )
              .to(outline, { opacity: 0, duration: 0.25 }, 1.8)
              .to(root.current!.querySelectorAll('[data-corner]'), { autoAlpha: 0, duration: 0.3 }, 1.8)
              .to(
                q('[data-dive]'),
                { scale: 70, svgOrigin: `${ox} ${oy}`, duration: 0.9, ease: 'expo.in' },
                1.95,
              )
              .to(q('[data-cover]'), { opacity: 0, duration: 0.4, ease: 'power1.in' }, 2.45)
              .call(() => window.dispatchEvent(new Event(PRELOADER_DONE)), [], 2.25);
          });
        }),
      );

      return () => {
        cancelled = true;
        tl?.kill();
        html.style.overflow = '';
      };
    },
    { scope: root },
  );

  if (done) return null;
  const { w, h } = dims;

  return (
    <div ref={root} className="preloader fixed inset-0 z-[100] text-cream" aria-hidden>
      <svg
        ref={svg}
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="pl-fill" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#000" />
            <stop data-stop offset="0" stopColor="#000" />
            <stop data-stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
          <mask id="pl-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
            <rect width={w} height={h} fill="#fff" />
            <g data-dive>
              <text
                data-word
                x={w / 2}
                y={h / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fill="url(#pl-fill)"
                className="wide"
                fontSize="160"
              >
                {WORD}
              </text>
            </g>
          </mask>
        </defs>
        <rect data-cover width={w} height={h} fill="#D94F3A" mask="url(#pl-mask)" />
        <text
          data-word
          data-outline
          x={w / 2}
          y={h / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill="none"
          stroke="#FFD66B"
          strokeWidth="1.4"
          strokeDasharray="900"
          className="wide"
          fontSize="160"
        >
          {WORD}
        </text>
      </svg>

      {/* corner labels are visible from first paint, so the screen is never empty */}
      <div data-corner className="absolute top-5 left-5 sm:top-7 sm:left-8 wide-medium text-xl leading-[0.85]">
        Orchard
        <br />
        Kitchen
      </div>
      <div data-corner className="absolute top-6 right-5 sm:top-8 sm:right-8 text-xs font-semibold text-cream/70 text-right">
        700 King St. W<br />
        Toronto
      </div>
      <div data-corner className="absolute bottom-5 left-5 sm:bottom-7 sm:left-8">
        <span data-counter className="wide text-6xl sm:text-7xl text-lime tabular-nums">
          000
        </span>
      </div>
      <div
        data-corner
        className="absolute bottom-6 right-5 sm:bottom-8 sm:right-8 font-script text-2xl sm:text-3xl text-lime"
      >
        cooked from scratch
      </div>
    </div>
  );
}
