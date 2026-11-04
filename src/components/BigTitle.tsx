'use client';

import React, { useRef } from 'react';
import { gsap, SplitText, useGSAP, MOTION_OK, MOTION_REDUCED } from '@/lib/gsap';

type Tone = 'forest' | 'cream';

/**
 * Giant condensed word with a brush-script signature overlapping its foot.
 * The word and script live in one heading so screen readers get the full title.
 */
export default function BigTitle({
  as: Tag = 'h2',
  lines,
  script,
  align = 'center',
  size = 'section',
  tone = 'forest',
  scriptTone,
  trigger = 'scroll',
  className = '',
  scriptClassName = '',
}: {
  as?: 'h1' | 'h2';
  lines: string[];
  script?: string;
  align?: 'center' | 'left';
  size?: 'section' | 'page';
  tone?: Tone;
  scriptTone?: 'orange' | 'lime';
  trigger?: 'scroll' | 'load';
  className?: string;
  scriptClassName?: string;
}) {
  const root = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const words = el.querySelectorAll<HTMLElement>('[data-split]');
      const scr = el.querySelector<HTMLElement>('[data-script]');
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.set(el, { autoAlpha: 1 });
        const st =
          trigger === 'scroll' ? { trigger: el, start: 'top 85%', once: true } : undefined;

        SplitText.create(words, {
          type: 'chars',
          mask: 'chars',
          aria: 'none',
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.chars, {
              yPercent: 105,
              duration: 1.1,
              ease: 'expo.out',
              stagger: 0.04,
              delay: trigger === 'load' ? 0.15 : 0,
              scrollTrigger: st,
            });
          },
        });

        if (scr) {
          gsap.fromTo(
            scr,
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: 1.1,
              ease: 'power3.inOut',
              delay: trigger === 'load' ? 0.65 : 0.45,
              scrollTrigger: st,
            },
          );
        }
      });

      mm.add(MOTION_REDUCED, () => {
        gsap.set(el, { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  const sizeCls =
    size === 'page'
      ? 'text-[23vw] sm:text-[17vw] lg:text-[13.5vw] xl:text-[12.5rem]'
      : 'text-[19vw] sm:text-[13vw] lg:text-[8.6rem]';
  const scriptSize =
    size === 'page'
      ? 'text-[11vw] sm:text-[7.5vw] lg:text-[5.4vw] xl:text-[5rem]'
      : 'text-[10vw] sm:text-[6.4vw] lg:text-[4.3rem]';
  const color = tone === 'forest' ? 'text-forest' : 'text-cream';
  const sTone = (scriptTone ?? (tone === 'forest' ? 'orange' : 'lime')) === 'orange' ? 'text-orange' : 'text-lime';
  const label = `${lines.join(' ')}${script ? ` — ${script}` : ''}`;

  return (
    <Tag
      ref={root}
      aria-label={label}
      className={`${trigger === 'load' ? 'hero-hide' : ''} relative min-w-0 ${
        align === 'center' ? 'text-center' : 'text-left'
      } ${className}`}
    >
      <span aria-hidden className={`wide block ${sizeCls} ${color}`}>
        {lines.map((l) => (
          <span key={l} data-split className="block">
            {l}
          </span>
        ))}
      </span>
      {script && (
        <span
          aria-hidden
          data-script
          className={`font-script relative z-10 block -mt-[0.42em] ${scriptSize} ${sTone} ${align === 'center' ? '' : 'ml-[0.35em]'} ${tone === 'forest' ? 'script-outline' : 'script-outline-dark'} ${scriptClassName}`}
          style={{ transform: 'rotate(-5deg)' }}
        >
          {script}
        </span>
      )}
    </Tag>
  );
}
