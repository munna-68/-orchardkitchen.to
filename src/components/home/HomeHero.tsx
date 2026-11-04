'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { MENU_ITEMS, SITE_PHOTOS, STORE_INFO } from '@/data/mockData';
import Img from '@/components/Img';
import Stamp from '@/components/Stamp';
import {
  gsap,
  SplitText,
  useGSAP,
  MOTION_OK,
  MOTION_REDUCED,
  PRELOADER_DONE,
  preloaderWillRun,
} from '@/lib/gsap';

const thumbs = MENU_ITEMS.filter((i) => i.isSignature || i.isSeasonal).slice(0, 3);

export default function HomeHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        gsap.set(q('.hero-hide'), { autoAlpha: 1 });

        const tl = gsap.timeline({ paused: true });
        const splits: SplitText[] = [];
        q('[data-hero-word]').forEach((el) => {
          splits.push(SplitText.create(el, { type: 'chars', mask: 'chars', aria: 'none' }));
        });
        tl.from(
          splits.flatMap((s) => s.chars),
          { yPercent: 105, duration: 1.2, ease: 'expo.out', stagger: 0.045 },
          0,
        )
          .fromTo(
            q('[data-hero-script]'),
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.inOut' },
            0.45,
          )
          .from(q('[data-hero-stamp]'), { scale: 0, rotation: -90, duration: 0.9, ease: 'back.out(1.7)' }, 0.7)
          .from(
            q('[data-hero-fade]'),
            { autoAlpha: 0, y: 18, duration: 0.8, ease: 'power3.out', stagger: 0.08 },
            0.5,
          )
          .from(q('[data-hero-strip]'), { yPercent: 100, duration: 0.7, ease: 'power3.out' }, 0.6);

        let started = false;
        const start = () => {
          if (started) return;
          started = true;
          tl.play();
        };
        let fallback: number | undefined;
        if (preloaderWillRun()) {
          window.addEventListener(PRELOADER_DONE, start, { once: true });
          fallback = window.setTimeout(start, 5000);
        } else {
          start();
        }

        // scroll: photo pushes in, title drifts up, side copy fades
        const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
        gsap.to(q('[data-hero-zoom]'), { scale: 1.14, ease: 'none', scrollTrigger: st });
        gsap.to(q('[data-hero-title]'), { yPercent: -28, ease: 'none', scrollTrigger: st });
        gsap.to(q('[data-hero-side]'), {
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: { ...st, end: '45% top' },
        });

        return () => {
          window.removeEventListener(PRELOADER_DONE, start);
          window.clearTimeout(fallback);
          splits.forEach((s) => s.revert());
        };
      });

      mm.add(MOTION_REDUCED, () => {
        gsap.set(root.current!.querySelectorAll('.hero-hide'), { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative min-h-[100dvh] flex flex-col bg-forest-deep text-cream overflow-hidden">
      {/* photo: outer layer for the preloader push, inner for scroll zoom */}
      <div data-hero-photo className="absolute inset-0">
        <div data-hero-zoom className="absolute inset-0">
          <Img
            src={SITE_PHOTOS.hero}
            w={2000}
            priority
            alt="Herb-roasted chicken, citrus and greens packed for pickup"
            className="w-full h-full object-cover object-[50%_40%]"
          />
        </div>
      </div>
      {/* the forest field fades into the photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/45 to-black/35" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-forest-deep/90 to-transparent" />

      <div className="relative flex-1 flex flex-col max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 pb-6">
        {/* corner notes */}
        <div data-hero-side className="flex items-start justify-between gap-6">
          <div data-hero-fade className="hero-hide inline-flex items-center gap-3 rounded-full bg-forest-deep/55 backdrop-blur-sm border border-cream/20 pl-1.5 pr-4 py-1.5">
            <div className="flex -space-x-2.5">
              {thumbs.map((t) => (
                <Img
                  key={t.id}
                  src={t.visual.imageSrc!}
                  w={80}
                  h={80}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-forest-deep"
                />
              ))}
            </div>
            <div className="leading-tight">
              <div className="text-sm font-extrabold">{MENU_ITEMS.length} dishes</div>
              <div className="text-[11px] text-cream/70">all cooked here today</div>
            </div>
          </div>

          <div data-hero-fade className="hero-hide hidden md:block max-w-[19rem] text-right">
            <p className="text-sm leading-relaxed text-cream/85">
              Whole-ingredient plates, bowls, soups and cold-pressed shots. No seed oils, no refined
              sugar, no additives — cooked from scratch at {STORE_INFO.neighborhood}.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Link href="/menu" className="btn btn-ghost-light btn-sm">
                <span className="roll">
                  <span>See the menu</span>
                  <span>See the menu</span>
                </span>
              </Link>
              <Link href="/order" className="btn btn-lime btn-sm">
                <span className="roll">
                  <span>Order pickup</span>
                  <span>Order pickup</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* giant word + script, bottom-anchored like a poster */}
        <div className="mt-auto relative">
          <div data-hero-stamp className="hero-hide absolute right-[2%] -top-[36vw] sm:-top-[22vw] md:top-[-4.5vw] z-20">
            <Stamp
              text="NO SEED OILS • SCRATCH MADE • KING WEST • "
              size={124}
              className="scale-[0.8] sm:scale-100"
              center={
                <span className="wide text-[1.35rem] leading-[0.82]">
                  100%
                  <br />
                  real
                </span>
              }
            />
          </div>

          <h1 data-hero-title aria-label="Orchard Kitchen — Unprocessed" className="relative min-w-0">
            <span
              aria-hidden
              data-hero-script
              className="hero-hide font-script script-outline-deep block text-lime text-[12.5vw] md:text-[6.4vw] leading-none relative z-10 mb-[-0.42em] ml-[0.1em]"
              style={{ transform: 'rotate(-6deg)' }}
            >
              Orchard Kitchen
            </span>
            {/* phone: two stacked lines */}
            <span aria-hidden className="hero-hide md:hidden wide block text-[28.5vw] text-cream">
              <span data-hero-word className="block">Unpro-</span>
              <span data-hero-word className="block">cessed</span>
            </span>
            {/* desktop: one line across the frame */}
            <span aria-hidden className="hero-hide hidden md:block wide text-[18.4vw] 2xl:text-[18rem] text-cream whitespace-nowrap">
              <span data-hero-word className="block">Unprocessed</span>
            </span>
          </h1>

          {/* phone copy + CTA */}
          <div data-hero-fade className="hero-hide md:hidden mt-5 space-y-4">
            <p className="text-sm text-cream/85 max-w-sm leading-relaxed">
              Whole-ingredient comfort food made from scratch every morning. Zero seed oils, zero
              refined sugar.
            </p>
            <Link href="/order" className="btn btn-lime w-full">
              Order pickup ahead
            </Link>
          </div>
        </div>
      </div>

      {/* lime promo strip */}
      <div data-hero-strip className="hero-hide relative bg-lime text-forest-ink">
        <p className="max-w-7xl mx-auto px-4 py-2.5 text-center text-xs sm:text-[13px] font-bold">
          Order ahead for a 15-minute pickup slot at 700 King St. W — open 8am to 8pm, every day.
        </p>
      </div>
    </section>
  );
}
