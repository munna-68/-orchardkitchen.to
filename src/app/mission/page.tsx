'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { MISSION_PRINCIPLES, COMPARISON_MATRIX, STORE_INFO, SITE_PHOTOS } from '@/data/mockData';
import PageHeader from '@/components/PageHeader';
import BigTitle from '@/components/BigTitle';
import Img from '@/components/Img';
import Stamp from '@/components/Stamp';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import { MapPin, Clock, TramFront, Check, X } from 'lucide-react';

const CARD_STYLES = [
  { bg: 'bg-forest', text: 'text-cream', body: 'text-cream/80', script: 'text-lime', photo: SITE_PHOTOS.topBowl },
  { bg: 'bg-lime', text: 'text-forest-ink', body: 'text-forest-ink/80', script: 'text-orange-deep', photo: SITE_PHOTOS.plating },
  { bg: 'bg-paper', text: 'text-forest', body: 'text-forest-ink/75', script: 'text-orange', photo: SITE_PHOTOS.squashSoup },
  { bg: 'bg-forest-deep', text: 'text-cream', body: 'text-cream/80', script: 'text-lime', photo: SITE_PHOTOS.kitchen },
];

export default function MissionPage() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // stacking cards: as the next card arrives the previous one sinks back
        const cards = gsap.utils.toArray<HTMLElement>('[data-stack]');
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          const tl = gsap.timeline({
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
          });
          tl.to(card.querySelector('[data-stack-inner]'), { scale: 0.92, ease: 'none' }, 0).to(
            card.querySelector('[data-stack-shade]'),
            { opacity: 0.45, ease: 'none' },
            0,
          );
        });

        gsap.from('[data-row]', {
          x: -30,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '[data-rows]', start: 'top 80%', once: true },
        });

        gsap.fromTo(
          '[data-visit-window]',
          { clipPath: 'inset(14% 10% 14% 10% round 28px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 28px)',
            ease: 'none',
            scrollTrigger: { trigger: '[data-visit-window]', start: 'top 90%', end: 'center 50%', scrub: true },
          },
        );
        gsap.fromTo(
          '[data-visit-img]',
          { scale: 1.3 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: '[data-visit-window]', start: 'top 90%', end: 'center 50%', scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <PageHeader
        lines={['Our', 'mission']}
        script="health, flavour & value"
        intro={
          <>
            We want to eliminate ultra-processed food on King Street West — by cooking food that is
            healthier, tastes better and still costs what lunch should.
          </>
        }
        fact={{ value: '0', label: 'grams of seed oil in anything we cook' }}
      />

      {/* four principles as stacking cards */}
      <section className="paper-grid py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BigTitle lines={['Four rules']} script="we cook by every morning" />
          <div className="mt-14 space-y-6">
            {MISSION_PRINCIPLES.map((p, i) => {
              const s = CARD_STYLES[i % CARD_STYLES.length];
              return (
                <div key={p.num} data-stack className="sticky" style={{ top: `${96 + i * 22}px` }}>
                  <div
                    data-stack-inner
                    className={`relative overflow-hidden rounded-[28px] border border-forest/10 ${s.bg} ${s.text} origin-top shadow-[0_-8px_30px_-12px_rgba(42, 26, 20,0.35)]`}
                  >
                    <div className="grid md:grid-cols-[1.2fr_1fr] min-h-[360px]">
                      <div className="p-7 sm:p-10 flex flex-col">
                        <span className="wide text-7xl sm:text-8xl opacity-90">{p.num}</span>
                        <p className={`font-script text-2xl sm:text-3xl mt-4 ${s.script}`}>{p.tagline}</p>
                        <h3 className="wide-medium text-4xl sm:text-5xl mt-2">{p.title}</h3>
                        <p className={`mt-4 text-sm sm:text-[15px] leading-relaxed max-w-lg ${s.body}`}>{p.desc}</p>
                      </div>
                      <div className="relative min-h-[220px] md:min-h-0">
                        <Img src={s.photo} w={900} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                    </div>
                    <div data-stack-shade className="absolute inset-0 bg-black opacity-0 pointer-events-none" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* comparison */}
      <section className="bg-forest text-cream py-20 sm:py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BigTitle lines={['How we compare']} script="the scratch standard" tone="cream" />
          <p className="text-center text-sm text-cream/70 max-w-xl mx-auto mt-6">
            An illustrative look at common fast-casual shortcuts next to how we cook at 700 King West.
          </p>

          <div data-rows className="mt-12 space-y-3">
            <div className="hidden md:grid grid-cols-[1fr_1.4fr_1.4fr] gap-3 px-5 text-xs font-bold text-cream/60">
              <span>What&apos;s in it</span>
              <span>Typical fast-casual</span>
              <span className="text-lime">Orchard Kitchen</span>
            </div>
            {COMPARISON_MATRIX.map((row) => (
              <div
                key={row.category}
                data-row
                className="grid md:grid-cols-[1fr_1.4fr_1.4fr] gap-3 md:gap-3 items-stretch"
              >
                <div className="wide-medium text-2xl md:text-[1.7rem] text-cream px-1 md:px-5 md:py-5 md:self-center">
                  {row.category}
                </div>
                <div className="rounded-2xl border-[1.5px] border-dashed border-cream/25 p-4 sm:p-5 flex gap-3 text-[13px] text-cream/70 leading-relaxed">
                  <X className="w-4 h-4 shrink-0 mt-0.5 text-orange" strokeWidth={3} />
                  <span>{row.standardFastCasual}</span>
                </div>
                <div className="rounded-2xl bg-cream text-forest-ink p-4 sm:p-5 flex gap-3 text-[13px] leading-relaxed font-medium">
                  <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-forest text-paper flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
                  </span>
                  <span>{row.orchardKitchen}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* visit */}
      <section className="paper-grid py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-6 min-w-0">
            <BigTitle lines={['Come by']} script="King & Bathurst" align="left" />
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3 items-start rounded-2xl bg-paper border border-line p-4">
                <MapPin className="w-5 h-5 text-orange shrink-0" />
                <div>
                  <div className="font-bold text-forest">{STORE_INFO.address}</div>
                  <div className="text-xs text-forest-ink/60">Corner of King St. W and Bathurst St.</div>
                </div>
              </li>
              <li className="flex gap-3 items-start rounded-2xl bg-paper border border-line p-4">
                <Clock className="w-5 h-5 text-orange shrink-0" />
                <div>
                  <div className="font-bold text-forest">{STORE_INFO.hours}</div>
                  <div className="text-xs text-forest-ink/60">Dine in or pick up, seven days a week</div>
                </div>
              </li>
              <li className="flex gap-3 items-start rounded-2xl bg-paper border border-line p-4">
                <TramFront className="w-5 h-5 text-orange shrink-0" />
                <div>
                  <div className="font-bold text-forest">504 King streetcar</div>
                  <div className="text-xs text-forest-ink/60">The Bathurst stop is right outside the door</div>
                </div>
              </li>
            </ul>
            <Link href="/order" className="btn btn-lime">
              <span className="roll">
                <span>Order ahead for pickup</span>
                <span>Order ahead for pickup</span>
              </span>
            </Link>
          </div>

          <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[520px]">
            <div data-visit-window className="absolute inset-0 overflow-hidden rounded-[28px]">
              <Img
                data-visit-img
                src={SITE_PHOTOS.kitchen}
                w={1300}
                alt="Two cooks preparing food in an open kitchen"
                className="w-full h-full object-cover"
              />
            </div>
            <Stamp
              text="700 KING ST W • TORONTO • SINCE DAY ONE • "
              tone="lime"
              size={128}
              className="absolute -top-8 -left-4 sm:-left-8"
              center={<span className="wide text-2xl leading-[0.85]">King<br />West</span>}
            />
            <div className="absolute bottom-5 left-5 right-5 sm:right-auto rounded-2xl bg-cream/95 backdrop-blur-sm p-4 flex items-center gap-4">
              <div>
                <div className="wide-medium text-2xl text-forest">700 King St. W</div>
                <div className="text-xs text-forest-ink/60">30 seconds from the streetcar stop</div>
              </div>
              <a
                href="https://maps.google.com/?q=700+King+St+W+Toronto"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-forest btn-sm ml-auto"
              >
                Directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
