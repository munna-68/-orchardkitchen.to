'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import {
  Check,
  Droplets,
  ChefHat,
  Sprout,
  ScanSearch,
  Timer,
  BadgeDollarSign,
  Leaf,
} from 'lucide-react';
import { MENU_ITEMS, SITE_PHOTOS, STORE_INFO } from '@/data/mockData';
import BigTitle from '@/components/BigTitle';
import Img from '@/components/Img';
import { InstagramIcon } from '@/components/Icons';
import { gsap, SplitText, useGSAP, MOTION_OK } from '@/lib/gsap';

/* ------------------------------------------------------------------ */
/* Claims marquee — the forest band under the menu                     */
/* ------------------------------------------------------------------ */
const CLAIMS = [
  'Zero seed oils',
  'Zero refined sugar',
  '14-hour bone broth',
  'Made in-house daily',
  'Ontario-grown produce',
  'Every ingredient listed',
  'No artificial additives',
];

export function ClaimsMarquee() {
  const row = [...CLAIMS, ...CLAIMS];
  return (
    <div className="bg-forest text-cream overflow-hidden py-4 sm:py-5 border-y-4 border-forest-deep" aria-label={CLAIMS.join(', ')}>
      <div className="flex w-max animate-marquee" aria-hidden>
        {row.map((c, i) => (
          <span key={i} className="flex items-center gap-6 pr-6 wide-medium text-3xl sm:text-[2.6rem] whitespace-nowrap">
            {c}
            <Leaf className="w-5 h-5 text-lime" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* How it works — three dog-eared steps + a photo window               */
/* ------------------------------------------------------------------ */
export function HowItWorks() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from('[data-step]', {
          y: 60,
          rotation: (i) => [-3, 2, -2][i] ?? 0,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '[data-steps]', start: 'top 80%', once: true },
        });
        // photo window opens as it scrolls through
        gsap.fromTo(
          '[data-window]',
          { clipPath: 'inset(14% 10% 14% 10% round 28px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 28px)',
            ease: 'none',
            scrollTrigger: { trigger: '[data-window]', start: 'top 90%', end: 'center 45%', scrub: true },
          },
        );
        gsap.fromTo(
          '[data-window-img]',
          { scale: 1.3 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: '[data-window]', start: 'top 90%', end: 'center 45%', scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="paper-grid py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BigTitle lines={['How it works?']} script="Three simple steps" />

        <div data-steps className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* step 1 — tall, with a photo cut-in */}
            <div
              data-step
              className="dogear sm:row-span-2 bg-forest text-cream rounded-[22px] p-6 sm:p-7 flex flex-col overflow-hidden"
              style={{ ['--flap' as string]: '#2A1A14' }}
            >
              <p className="font-script text-[2rem] text-lime leading-none">1. pick your plate</p>
              <p className="mt-3 text-sm text-cream/80 leading-relaxed max-w-[16rem]">
                Browse {MENU_ITEMS.length} dishes, each with its full ingredient list. Plates, bowls, soups and
                cold-pressed shots.
              </p>
              <Link href="/menu" className="btn btn-lime btn-sm mt-5 self-start">
                <span className="roll">
                  <span>See the menu</span>
                  <span>See the menu</span>
                </span>
              </Link>
              <div className="relative mt-6 -mx-6 sm:-mx-7 -mb-6 sm:-mb-7 flex-1 min-h-[180px]">
                <Img
                  src={MENU_ITEMS[0].visual.imageSrc!}
                  w={700}
                  alt="Lomo saltado over rice"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span
                  className="sticker absolute top-4 right-5 bg-cream text-forest"
                  style={{ transform: 'rotate(6deg)' }}
                >
                  Our best seller
                </span>
              </div>
            </div>

            <div data-step className="dogear bg-forest text-cream rounded-[22px] p-6 sm:p-7" style={{ ['--flap' as string]: '#2A1A14' }}>
              <p className="font-script text-[2rem] text-lime leading-none">2. pick a time</p>
              <p className="mt-3 text-sm text-cream/80 leading-relaxed">
                Choose a 15-minute pickup slot between 8am and 8pm. We start cooking so it&apos;s hot
                when you walk in.
              </p>
            </div>

            <div data-step className="relative dogear bg-forest text-cream rounded-[22px] p-6 sm:p-7" style={{ ['--flap' as string]: '#2A1A14' }}>
              <PaperClip className="absolute -top-3 right-8 w-6 h-14 text-orange" />
              <p className="font-script text-[2rem] text-lime leading-none">3. grab &amp; go</p>
              <p className="mt-3 text-sm text-cream/80 leading-relaxed">
                Walk into 700 King St. W, head to the pickup counter and give your name. No app fee,
                no delivery markup.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[360px] sm:min-h-[460px]">
            <div data-window className="absolute inset-0 overflow-hidden rounded-[28px]">
              <Img
                data-window-img
                src={SITE_PHOTOS.prepTrays}
                w={1100}
                alt="Lunch trays with greens, eggs and roasted vegetables"
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className="sticker absolute bottom-6 right-5 bg-lime text-forest-ink text-sm px-4 py-2"
              style={{ transform: 'rotate(-7deg)' }}
            >
              Ready in about 15 min
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PaperClip(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 56" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" {...props}>
      <path d="M8 18v24a4 4 0 0 0 8 0V12a7 7 0 0 0-14 0v32a10 10 0 0 0 20 0V20" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Choose your plate — ticket cards on forest                          */
/* ------------------------------------------------------------------ */
const GROUPS = [
  { key: 'plates', title: 'Plates', note: 'Protein, grains, roasted veg', cats: ['plates'] },
  { key: 'bowls', title: 'Bowls', note: 'Warm, plant-forward, filling', cats: ['bowls', 'soups-salads'] },
  { key: 'shots', title: 'Shots & sides', note: 'Cold-pressed and baked daily', cats: ['juices-shots', 'sides'] },
] as const;

export function ChoosePlate() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from('[data-ticket]', {
          yPercent: 18,
          autoAlpha: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '[data-tickets]', start: 'top 80%', once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-forest text-cream py-20 sm:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <h2 aria-label="Choose the plate that fits you" className="text-center">
            <span aria-hidden className="font-script block text-lime text-[10vw] sm:text-[3.6rem] leading-none" style={{ transform: 'rotate(-4deg)' }}>
              Choose the plate
            </span>
            <span aria-hidden className="wide block text-[17vw] sm:text-[8rem] text-cream -mt-1">
              That fits you
            </span>
          </h2>
          <span
            className="hidden sm:inline-flex sticker absolute right-0 top-2 bg-orange text-paper"
            style={{ transform: 'rotate(10deg)' }}
          >
            Prices before HST
          </span>
        </div>

        <div data-tickets className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 items-stretch">
          {GROUPS.map((g, gi) => {
            const items = MENU_ITEMS.filter((i) => (g.cats as readonly string[]).includes(i.category));
            const from = Math.min(...items.map((i) => i.price));
            const featured = gi === 1;
            return (
              <div
                key={g.key}
                data-ticket
                className={`ticket rounded-[22px] p-6 sm:p-7 flex flex-col ${
                  featured
                    ? 'bg-cream text-forest md:-my-4 md:py-10'
                    : 'bg-forest-deep/50 text-cream border-[1.5px] border-dashed border-cream/25'
                }`}
              >
                <h3 className="wide-medium text-[2.6rem] text-center">{g.title}</h3>
                <p className={`text-center text-xs mt-1 ${featured ? 'text-forest/60' : 'text-cream/60'}`}>
                  {g.note}
                </p>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {items.slice(0, 6).map((i) => (
                    <li key={i.id} className="flex items-start gap-2.5 text-[13px] leading-snug">
                      <span
                        className={`mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                          featured ? 'bg-forest text-paper' : 'bg-lime text-forest-ink'
                        }`}
                      >
                        <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
                      </span>
                      <span className={featured ? 'text-forest-ink/80' : 'text-cream/80'}>{i.name}</span>
                    </li>
                  ))}
                </ul>
                {/* perforation sits where the notches are */}
                <div className={`my-6 border-t-2 border-dashed ${featured ? 'border-forest/20' : 'border-cream/15'}`} />
                <Link href="/menu" className="btn btn-lime btn-sm w-full">
                  <span className="roll">
                    <span>See {g.title.toLowerCase()}</span>
                    <span>See {g.title.toLowerCase()}</span>
                  </span>
                </Link>
                <p className="mt-3 text-center wide-medium text-lg">
                  From ${from.toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* What makes us different — burst + six notes                         */
/* ------------------------------------------------------------------ */
const DIFFS = [
  { icon: Droplets, title: 'Zero seed oils', text: 'Olive and avocado oil only. No canola, soy or corn oil.' },
  { icon: ChefHat, title: 'Made in-house', text: 'Sauces, broths and dressings made behind our counter each morning.' },
  { icon: Sprout, title: 'Seasonal', text: 'Ontario squash, kale and apples when they are at their best.' },
  { icon: ScanSearch, title: 'Every ingredient listed', text: 'Tap any dish to see exactly what goes in it.' },
  { icon: Timer, title: 'Fast pickup', text: '15-minute slots, hot and packed when you arrive.' },
  { icon: BadgeDollarSign, title: 'No app markup', text: 'Order direct. You pay menu price, not a 30% surcharge.' },
];

export function Different() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.to('[data-burst]', {
          rotation: 90,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
        });
        gsap.from('[data-bowl]', {
          scale: 0.7,
          rotation: -12,
          autoAlpha: 0,
          duration: 1.2,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: '[data-bowl]', start: 'top 80%', once: true },
        });
        gsap.from('[data-diff]', {
          scale: 0.85,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'back.out(1.8)',
          stagger: 0.08,
          scrollTrigger: { trigger: '[data-diffs]', start: 'top 75%', once: true },
        });
      });
    },
    { scope: root },
  );

  const rays = Array.from({ length: 24 }, (_, i) => i);
  const left = DIFFS.slice(0, 3);
  const right = DIFFS.slice(3);

  return (
    <section ref={root} className="paper-grid py-20 sm:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BigTitle lines={['What makes us']} script="Different?" align="left" />

        <div data-diffs className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1.1fr)_1fr] gap-6 lg:gap-4 items-center">
          <div className="space-y-4 order-2 lg:order-1">
            {left.map((d, i) => (
              <DiffNote key={d.title} d={d} offset={i === 1 ? 'lg:-ml-6' : 'lg:ml-6'} />
            ))}
          </div>

          <div className="relative order-1 lg:order-2 aspect-square max-w-[520px] w-full mx-auto">
            <svg data-burst viewBox="0 0 400 400" className="absolute inset-0 w-full h-full" aria-hidden>
              {rays.map((i) => (
                <polygon
                  key={i}
                  points="200,200 176,-4 224,-4"
                  fill={i % 2 ? '#FFD66B' : '#F5C24A'}
                  transform={`rotate(${i * 15} 200 200)`}
                />
              ))}
              <circle cx="200" cy="200" r="120" fill="#FFD66B" />
            </svg>
            <div data-bowl className="absolute inset-[17%] rounded-full overflow-hidden ring-8 ring-cream shadow-[0_24px_40px_-10px_rgba(42, 26, 20,0.5)]">
              <Img
                src={SITE_PHOTOS.topBowl}
                w={800}
                h={800}
                alt="Rice, chickpeas, salmon and greens from above"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-4 order-3">
            {right.map((d, i) => (
              <DiffNote key={d.title} d={d} offset={i === 1 ? 'lg:ml-6' : 'lg:-ml-2'} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DiffNote({ d, offset }: { d: (typeof DIFFS)[number]; offset: string }) {
  const Icon = d.icon;
  return (
    <div data-diff className={`flex items-start gap-3 rounded-2xl border-[1.5px] border-forest/20 bg-paper p-4 shadow-[0_3px_0_var(--color-line)] ${offset}`}>
      <span className="shrink-0 w-10 h-10 rounded-full bg-forest text-paper flex items-center justify-center">
        <Icon className="w-[18px] h-[18px]" />
      </span>
      <div>
        <h3 className="wide-medium text-xl text-forest">{d.title}</h3>
        <p className="text-[13px] text-forest-ink/70 leading-snug mt-0.5">{d.text}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Statement — Instagram to pickup, words light up as you scroll       */
/* ------------------------------------------------------------------ */
export function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create('[data-statement]', { type: 'words', aria: 'auto' });
        gsap.fromTo(
          split.words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: '[data-statement]', start: 'top 80%', end: 'bottom 45%', scrub: true },
          },
        );
        gsap.from('[data-pill]', {
          scale: 0,
          duration: 0.6,
          ease: 'back.out(2)',
          stagger: 0.15,
          scrollTrigger: { trigger: '[data-statement]', start: 'top 70%', once: true },
        });
      });
    },
    { scope: root },
  );

  const pill = (src: string) => (
    <span data-pill className="inline-block align-middle w-[1.9em] h-[0.95em] mx-[0.12em] rounded-full overflow-hidden relative -top-[0.06em]">
      <Img src={src} w={240} h={120} alt="" className="w-full h-full object-cover" />
    </span>
  );

  return (
    <section ref={root} className="bg-cream-deep py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-script text-3xl text-orange mb-4">from reel to counter</p>
        <p data-statement className="wide-medium text-forest text-[9.5vw] sm:text-6xl lg:text-[4.6rem] leading-[0.95]">
          Someone comments &ldquo;menu&rdquo; on a reel {pill(MENU_ITEMS[7].visual.imageSrc!)} and gets one link: the
          dishes, every ingredient {pill(MENU_ITEMS[3].visual.imageSrc!)} and a pickup slot. On your own site, with no
          30% cut {pill(MENU_ITEMS[11].visual.imageSrc!)}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/dashboard" className="btn btn-forest">
            <span className="roll">
              <span>See the comment-to-order dashboard</span>
              <span>See the comment-to-order dashboard</span>
            </span>
          </Link>
          <a href={STORE_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <InstagramIcon className="w-4 h-4" />
            <span>{STORE_INFO.handle}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Seasonal signup — a lime dog-eared card                             */
/* ------------------------------------------------------------------ */
export function Signup() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section className="paper-grid py-20 sm:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="dogear bg-lime rounded-[26px] p-7 sm:p-12 grid sm:grid-cols-[1.1fr_1fr] gap-8 items-center" style={{ ['--flap' as string]: '#F5C24A' }}>
          <div>
            <p className="font-script text-2xl text-orange-deep">new season, new plates</p>
            <h2 className="wide text-6xl sm:text-7xl text-forest mt-1">Get the drop</h2>
            <p className="text-sm text-forest/80 mt-3 max-w-xs">
              One email when the seasonal dishes change at 700 King West. Nothing else.
            </p>
          </div>
          {subscribed ? (
            <p role="status" className="rounded-2xl bg-forest text-cream p-5 text-sm font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-lime" />
              You&apos;re on the list. See you next harvest.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubscribed(true);
              }}
              className="space-y-3"
            >
              <label htmlFor="signup-email" className="sr-only">
                Email address
              </label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-5 py-3.5 rounded-full bg-paper border-[1.5px] border-forest/20 text-sm text-forest-ink placeholder:text-forest/40 focus:outline-none focus:border-forest"
              />
              <button type="submit" className="btn btn-forest w-full">
                <span className="roll">
                  <span>Sign me up</span>
                  <span>Sign me up</span>
                </span>
              </button>
              <p className="text-[11px] text-forest/60 text-center">Demo form. 342 King West locals so far.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
