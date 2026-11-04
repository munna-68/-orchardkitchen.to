'use client';

import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, MENU_CATEGORIES, MenuItem } from '@/data/mockData';
import FoodVisual from '@/components/FoodVisual';
import { useCart } from '@/context/CartContext';
import {
  Search,
  X,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Info,
  Clock,
  Flame,
  Plus,
} from 'lucide-react';

export default function MenuPage() {
  const { openDetailModal, addItem, openCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items based on active category and search query
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;

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

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4E9] text-[#547243] text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Whole Food • Zero UPF</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#1E1B18] tracking-tight">
          Seasonal Menu & Transparency
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Every dish made in-house at 700 King West. Click any item to inspect its complete ingredient disclosure label, made-in-house notes, and sourcing.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dishes, ingredients (e.g. ginger, steak, kale, tahini)..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border-2 border-[#E8E0D2] text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E54F38] shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count =
              cat.id === 'all'
                ? MENU_ITEMS.length
                : MENU_ITEMS.filter((i) => i.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs ${
                  isActive
                    ? 'bg-[#E54F38] text-white shadow-sm scale-105'
                    : 'bg-white text-stone-700 border border-[#E8E0D2] hover:bg-[#F3ECE1]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`ml-1.5 text-xs px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/25 text-white' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#E8E0D2] p-8 max-w-md mx-auto">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="font-display font-bold text-lg text-stone-900">No matching dishes found</h3>
          <p className="text-sm text-stone-500 mt-1">
            Try adjusting your search terms or clearing category filters.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-[#E54F38] text-white text-xs font-bold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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

      {/* Bottom Mission Note */}
      <div className="bg-[#FAF2E6] rounded-2xl p-6 border border-[#E8DEC8] text-center max-w-2xl mx-auto text-xs text-stone-700 space-y-1">
        <p className="font-bold text-stone-900 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#E54F38]" />
          Our Radical Transparency Guarantee
        </p>
        <p>
          We never cook with refined canola, soy, or corn oil. If you have any allergies or questions about our scratch kitchen at 700 King W, ask our counter team anytime.
        </p>
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
    <div className="group bg-white rounded-3xl border-2 border-[#E8E0D2] hover:border-[#E54F38]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Clickable Image / Food Visual container */}
        <div
          onClick={onOpenDetail}
          className="cursor-pointer overflow-hidden relative"
          title="Click to view ingredients & transparency label"
        >
          <FoodVisual item={item} size="md" />
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-3">
          {/* Category & Price */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#547243]">
                {item.categoryLabel}
              </span>
              <h3
                onClick={onOpenDetail}
                className="font-display font-bold text-xl text-[#1E1B18] mt-0.5 group-hover:text-[#E54F38] cursor-pointer transition-colors"
              >
                {item.name}
              </h3>
            </div>
            <div className="text-right shrink-0">
              <span className="font-display font-extrabold text-xl text-[#E54F38]">
                ${item.price.toFixed(2)}
              </span>
              <span className="block text-[10px] text-stone-400 font-medium">demo price</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
            {item.shortDesc}
          </p>

          {/* Dietary tags & No UPF Badge */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#EEF4E9] text-[#547243] px-2 py-0.5 rounded-md border border-emerald-200">
              <ShieldCheck className="w-3 h-3" />
              No UPF
            </span>
            {item.dietary.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium bg-[#F3ECE1] text-stone-700 px-2 py-0.5 rounded-md border border-stone-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Card Actions */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
        <button
          onClick={onOpenDetail}
          className="flex-1 py-2.5 px-3 rounded-xl border border-stone-300 hover:border-stone-400 text-stone-800 text-xs font-bold hover:bg-[#FAF7F2] transition-colors flex items-center justify-center gap-1.5"
        >
          <Info className="w-3.5 h-3.5 text-[#547243]" />
          <span>View Ingredients</span>
        </button>

        <button
          onClick={onQuickAdd}
          className="py-2.5 px-4 rounded-xl bg-[#E54F38] hover:bg-[#CF3F29] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 active:scale-95"
          title="Add to Pickup Order"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}
