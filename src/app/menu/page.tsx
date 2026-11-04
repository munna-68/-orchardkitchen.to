'use client';

import React, { useState, useMemo, useRef } from 'react';
import { MENU_ITEMS, MENU_CATEGORIES, MenuItem } from '@/data/mockData';
import FoodVisual from '@/components/FoodVisual';
import PageHeader from '@/components/PageHeader';
import { useCart } from '@/context/CartContext';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import { Search, X, Clock, Plus, Leaf } from 'lucide-react';

export default function MenuPage() {
  const { openDetailModal, addItem, openCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const grid = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.shortDesc.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.dietary.some((tag) => tag.toLowerCase().includes(q)) ||
        item.transparency.ingredients.some((ing) => ing.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from('[data-card]', {
          y: 36,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: { each: 0.06, from: 'start' },
          clearProps: 'transform,opacity,visibility',
        });
      });
    },
    { scope: grid, dependencies: [activeCategory] },
  );

  return (
    <div className="pb-20">
      <PageHeader
        lines={['The menu']}
        script="every ingredient listed"
        intro="Everything here is cooked from scratch at 700 King West. Tap a dish to read its full ingredient label, what we make in-house and where it comes from."
        fact={{ value: String(MENU_ITEMS.length), label: 'dishes, all free of seed oils and refined sugar' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        {/* search + filters */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:justify-between">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex gap-1.5 overflow-x-auto scrollbar-none rounded-full border border-line bg-paper p-1.5 shadow-[0_2px_0_var(--color-line)] max-w-full"
          >
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === 'all' ? MENU_ITEMS.length : MENU_ITEMS.filter((i) => i.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                    isActive ? 'bg-lime text-forest-ink ring-2 ring-forest/80' : 'text-forest-ink/70 hover:bg-cream-deep'
                  }`}
                >
                  {cat.label}
                  <span className={`ml-1.5 text-[11px] ${isActive ? 'text-forest/70' : 'text-forest-ink/40'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:max-w-sm">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-forest/50" />
            <label htmlFor="menu-search" className="sr-only">
              Search dishes and ingredients
            </label>
            <input
              id="menu-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ginger, steak, kale, tahini…"
              className="w-full pl-11 pr-10 py-3 rounded-full bg-paper border-[1.5px] border-line text-sm text-forest-ink placeholder:text-forest/40 focus:outline-none focus:border-forest"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-forest/50 hover:text-forest"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16 rounded-[26px] border-[1.5px] border-dashed border-forest/25 max-w-md mx-auto">
            <h3 className="wide-medium text-4xl text-forest">Nothing matches</h3>
            <p className="text-sm text-forest-ink/60 mt-2">
              No dish contains &ldquo;{searchQuery}&rdquo;. Try another ingredient or show everything.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="btn btn-lime btn-sm mt-5"
            >
              Show all dishes
            </button>
          </div>
        ) : (
          <div ref={grid} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onOpenDetail={() => openDetailModal(item)}
                onQuickAdd={() => {
                  addItem(item, 1);
                  openCart();
                }}
              />
            ))}
          </div>
        )}

        <div className="dogear bg-forest text-cream rounded-[22px] p-7 sm:p-9 max-w-3xl mx-auto grid sm:grid-cols-[auto_1fr] gap-5 items-center">
          <p className="font-script text-4xl text-lime leading-none">our promise</p>
          <p className="text-sm text-cream/80 leading-relaxed">
            We never cook with refined canola, soy or corn oil. Allergies or questions about a dish? Ask
            the counter team at 700 King W — they can tell you exactly what&apos;s in it.
          </p>
        </div>
      </div>
    </div>
  );
}

function MenuItemCard({
  item,
  onOpenDetail,
  onQuickAdd,
}: {
  item: MenuItem;
  onOpenDetail: () => void;
  onQuickAdd: () => void;
}) {
  return (
    <article data-card className="rounded-[26px] bg-paper p-2 border border-line shadow-[0_3px_0_var(--color-line)] flex flex-col">
      <button onClick={onOpenDetail} className="block text-left" aria-label={`View ingredients for ${item.name}`}>
        <FoodVisual item={item} size="md" className="rounded-[20px]" />
      </button>

      <div className="flex-1 flex flex-col rounded-[20px] border-[1.5px] border-dashed border-forest/25 mt-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-forest-ink/55">
              {item.categoryLabel}, {item.calories}
            </p>
            <h3 className="wide-medium text-[1.85rem] text-forest mt-1 leading-[0.9]">
              <button onClick={onOpenDetail} className="text-left uppercase [font-variation-settings:inherit] hover:text-orange transition-colors">
                {item.name}
              </button>
            </h3>
          </div>
          <span className="sticker bg-forest text-paper text-sm shrink-0" style={{ transform: 'rotate(4deg)' }}>
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="mt-3 text-[13px] text-forest-ink/75 leading-relaxed line-clamp-3">{item.shortDesc}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-lime-soft text-forest-ink px-2 py-1 rounded-full">
            <Leaf className="w-3 h-3" />
            No UPF
          </span>
          {item.dietary.map((tag) => (
            <span key={tag} className="text-[11px] font-medium bg-cream-deep text-forest-ink/75 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5 flex items-center gap-2">
          <button onClick={onQuickAdd} className="btn btn-lime btn-sm flex-1">
            <Plus className="w-3.5 h-3.5" />
            <span className="roll">
              <span>Add to bag</span>
              <span>Add to bag</span>
            </span>
          </button>
          <button
            onClick={onOpenDetail}
            className="btn btn-ghost btn-sm"
          >
            Ingredients
          </button>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-forest-ink/50 pl-1">
            <Clock className="w-3 h-3" />
            {item.prepTime.replace('Ready in ', '').replace(' mins', 'm')}
          </span>
        </div>
      </div>
    </article>
  );
}
