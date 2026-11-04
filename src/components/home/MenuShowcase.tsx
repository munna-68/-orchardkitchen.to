'use client';

import React, { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock, Plus } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import BigTitle from '@/components/BigTitle';
import Img from '@/components/Img';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';

export default function MenuShowcase() {
  const [cat, setCat] = useState<string>('all');
  const track = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  const firstRun = useRef(true);
  const items = useMemo(
    () => (cat === 'all' ? MENU_ITEMS : MENU_ITEMS.filter((i) => i.category === cat)),
    [cat],
  );

  useGSAP(
    () => {
      const first = firstRun.current;
      firstRun.current = false;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from('[data-menu-card]', {
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.07,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: first ? { trigger: track.current, start: 'top 88%', once: true } : undefined,
        });
      });
    },
    { scope: root, dependencies: [cat] },
  );

  const scrollBy = (dir: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 720), behavior: 'smooth' });
  };

  return (
    <section ref={root} className="relative paper-grid pt-20 sm:pt-28 pb-16 sm:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BigTitle lines={['On the menu']} script="Cooked from scratch" />

        {/* filter pills inside a rounded track */}
        <div className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex flex-wrap justify-center gap-1.5 rounded-[28px] sm:rounded-full border border-line bg-paper p-1.5 shadow-[0_2px_0_var(--color-line)]"
          >
            {MENU_CATEGORIES.map((c) => {
              const active = c.id === cat;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCat(c.id)}
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-[13px] font-semibold transition-colors ${
                    active
                      ? 'bg-lime text-forest-ink ring-2 ring-forest/80'
                      : 'text-forest-ink/70 hover:text-forest hover:bg-cream-deep'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* card rail */}
      <div className="relative mt-10">
        <div
          ref={track}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none px-4 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] pb-4"
        >
          {items.map((item) => (
            <MenuCard key={`${cat}-${item.id}`} item={item} />
          ))}
          <Link
            href="/menu"
            data-menu-card
            className="snap-start shrink-0 w-[260px] rounded-[26px] bg-forest text-cream p-6 flex flex-col justify-between group"
          >
            <span className="font-script text-3xl text-lime">the full menu</span>
            <span className="wide text-6xl leading-[0.85]">
              Every
              <br />
              ingredient,
              <br />
              listed
            </span>
            <span className="text-sm font-semibold text-cream/80 group-hover:text-lime transition-colors">
              Browse all {MENU_ITEMS.length} dishes
            </span>
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex justify-end gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll dishes left"
            className="w-11 h-11 rounded-full border-[1.5px] border-forest/30 text-forest flex items-center justify-center hover:bg-forest hover:text-cream transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll dishes right"
            className="w-11 h-11 rounded-full border-[1.5px] border-forest/30 text-forest flex items-center justify-center hover:bg-forest hover:text-cream transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  const { openDetailModal, addItem, openCart } = useCart();
  return (
    <article
      data-menu-card
      className="snap-start shrink-0 w-[290px] sm:w-[320px] rounded-[26px] bg-paper p-2 shadow-[0_3px_0_var(--color-line)] border border-line"
    >
      <div className="h-full rounded-[20px] border-[1.5px] border-dashed border-forest/25 p-4 flex flex-col">
        <div className="flex items-start gap-3">
          <button
            onClick={() => openDetailModal(item)}
            className="shrink-0 w-[76px] h-[76px] rounded-2xl overflow-hidden bg-cream-deep"
            aria-label={`View ingredients for ${item.name}`}
          >
            <Img src={item.visual.imageSrc!} w={200} h={200} alt="" className="w-full h-full object-cover" />
          </button>
          <div className="min-w-0 pt-1">
            <h3 className="wide-medium text-[1.7rem] text-forest leading-[0.9]">{item.name}</h3>
            <p className="mt-1 text-[11px] font-semibold text-forest-ink/55">
              {item.categoryLabel}, {item.calories}
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="sticker bg-forest text-paper" style={{ transform: 'rotate(-3deg)' }}>
            ${item.price.toFixed(2)}
          </span>
          <span className="sticker bg-cream-deep text-forest shadow-none">
            <Clock className="w-3 h-3" />
            {item.prepTime.replace('Ready in ', '')}
          </span>
        </div>

        <p className="mt-3 text-[13px] leading-relaxed text-forest-ink/75 line-clamp-4 flex-1">
          &ldquo;{item.shortDesc}&rdquo;
        </p>

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => {
              addItem(item, 1);
              openCart();
            }}
            className="btn btn-lime btn-sm flex-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="roll">
              <span>Add to bag</span>
              <span>Add to bag</span>
            </span>
          </button>
          <button
            onClick={() => openDetailModal(item)}
            className="text-xs font-bold text-forest underline underline-offset-4 decoration-forest/30 hover:decoration-forest px-2"
          >
            Ingredients
          </button>
        </div>
      </div>
    </article>
  );
}
