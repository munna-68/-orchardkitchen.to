'use client';

import React from 'react';
import { MenuItem } from '@/data/mockData';
import Img from '@/components/Img';

interface FoodVisualProps {
  item: MenuItem;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export default function FoodVisual({ item, className = '', size = 'md' }: FoodVisualProps) {
  const { visual, name } = item;

  // Photo path (stock placeholders live in mockData — swap for the kitchen's own shots)
  if (visual.imageSrc) {
    const aspect = /\baspect-/.test(className) ? '' : {
      sm: 'aspect-[4/3]',
      md: 'aspect-[4/3]',
      lg: 'aspect-[5/4]',
      hero: 'aspect-[5/4]',
    }[size];
    const w = size === 'sm' ? 520 : size === 'md' ? 760 : 1000;
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-cream-deep group/photo ${aspect} ${className}`}>
        <Img
          src={visual.imageSrc}
          w={w}
          h={Math.round(w * 0.78)}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/photo:scale-[1.06]"
        />
        {item.isSeasonal && item.seasonTag && (
          <span className="sticker absolute top-3 left-3 bg-lime text-forest-ink" style={{ transform: 'rotate(-4deg)' }}>
            {item.seasonTag}
          </span>
        )}
      </div>
    );
  }

  // Dimension helpers
  const sizeClasses = {
    sm: 'h-36 w-full',
    md: 'h-52 w-full',
    lg: 'h-64 w-full',
    hero: 'h-80 w-full',
  }[size];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl select-none group ${sizeClasses} ${className}`}
      style={{ backgroundColor: visual.bgBlobColor || '#FDF6EE' }}
    >
      {/* Background Organic Blob Shape */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40 transition-transform duration-700 group-hover:scale-110"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={visual.accentColor || '#E54F38'}
          d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.4,90,-16.2,88.2,-0.9C86.4,14.3,80.2,28.6,71.5,40.8C62.8,53,51.6,63.1,38.6,70.5C25.6,77.9,10.8,82.5,-3.5,84.5C-17.8,86.5,-35.6,85.9,-49.2,78.2C-62.8,70.5,-72.2,55.7,-77.9,40.1C-83.6,24.5,-85.6,8,-83.4,-7.8C-81.2,-23.6,-74.8,-38.7,-64.5,-49.9C-54.2,-61.1,-40,-68.4,-25.9,-75.4C-11.8,-82.4,2.2,-89.1,16.2,-87.3C30.2,-85.5,44.2,-75.2,44.7,-76.4Z"
          transform="translate(100 100)"
        />
      </svg>

      {/* Decorative Warm Ring / Plate Foundation */}
      <div className="relative flex items-center justify-center z-10">
        {visual.type === 'cup' ? (
          // Glass / Shot Bottle Graphic
          <div className="relative flex flex-col items-center">
            {/* Bottle / Shot Glass */}
            <div
              className="w-20 h-28 rounded-t-xl rounded-b-2xl shadow-lg border-2 border-white/80 p-2 flex flex-col items-center justify-between relative overflow-hidden backdrop-blur-xs transition-transform duration-300 group-hover:-translate-y-1"
              style={{
                background: `linear-gradient(180deg, rgba(255,255,255,0.85) 0%, ${visual.gradientFrom} 35%, ${visual.gradientTo} 100%)`,
              }}
            >
              {/* Cold-pressed layer lines */}
              <div className="w-full h-1 bg-white/30 rounded-full mt-2" />
              <div className="text-3xl my-auto drop-shadow-sm animate-pulse">{visual.accentEmoji}</div>
              <div className="w-full text-[9px] font-mono font-bold text-center tracking-wider text-white/90 uppercase bg-black/20 py-0.5 rounded">
                Cold-Pressed
              </div>
            </div>
            {/* Glass Base Shadow */}
            <div className="w-16 h-2.5 bg-stone-900/10 rounded-full blur-xs mt-2" />
          </div>
        ) : visual.type === 'soup' ? (
          // Ceramic Soup Bowl Graphic
          <div className="relative flex flex-col items-center">
            {/* Ceramic Rim */}
            <div
              className="w-36 h-36 rounded-full shadow-lg border-4 border-amber-50 flex items-center justify-center relative p-3 transition-transform duration-300 group-hover:scale-105"
              style={{
                background: `radial-gradient(circle at 35% 35%, ${visual.gradientTo}, ${visual.gradientFrom})`,
              }}
            >
              {/* Soup Swirl / Coconut cream drizzle & Herbs */}
              <div className="absolute inset-4 rounded-full border border-white/30 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-white/50 flex items-center justify-center">
                  <span className="text-3xl filter drop-shadow">{visual.accentEmoji}</span>
                </div>
              </div>
              {/* Steam wisps */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex space-x-1 opacity-70">
                <span className="text-xs text-amber-900/40 animate-bounce">~</span>
                <span className="text-xs text-amber-900/40 animate-bounce delay-100">~</span>
              </div>
            </div>
            <div className="w-28 h-3 bg-stone-900/10 rounded-full blur-xs mt-2" />
          </div>
        ) : visual.type === 'bowl' ? (
          // Deep Grain / Salad Bowl Graphic
          <div className="relative flex flex-col items-center">
            <div
              className="w-40 h-40 rounded-full shadow-xl border-4 border-stone-100 flex items-center justify-center relative p-3 overflow-hidden transition-transform duration-300 group-hover:scale-105"
              style={{
                background: `radial-gradient(circle at 40% 40%, ${visual.gradientTo}, ${visual.gradientFrom})`,
              }}
            >
              {/* Garnish ring */}
              <div className="absolute inset-2 rounded-full border-2 border-emerald-200/40 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shadow-inner">
                  <span className="text-4xl filter drop-shadow-md">{visual.accentEmoji}</span>
                </div>
              </div>
              {/* Sprinkles of seeds and microgreens */}
              <div className="absolute top-2 right-4 text-xs opacity-80">🌱</div>
              <div className="absolute bottom-3 left-4 text-xs opacity-80">✨</div>
            </div>
            <div className="w-32 h-3 bg-stone-900/10 rounded-full blur-xs mt-2" />
          </div>
        ) : (
          // Ceramic Flat Plate (e.g. Lomo Saltado, Rotisserie Chicken, Sourdough)
          <div className="relative flex flex-col items-center">
            {/* Outer Rim */}
            <div className="w-44 h-44 rounded-full bg-gradient-to-br from-stone-50 to-stone-200 shadow-xl border-2 border-stone-300/60 p-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              {/* Inner Well */}
              <div
                className="w-36 h-36 rounded-full shadow-inner border border-stone-300/40 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `radial-gradient(circle at 35% 35%, ${visual.gradientTo}, ${visual.gradientFrom})`,
                }}
              >
                {/* Culinary Center & Emoji */}
                <div className="relative flex flex-col items-center">
                  <span className="text-4xl filter drop-shadow-lg">{visual.accentEmoji}</span>
                  <span className="text-[10px] font-semibold text-white/90 tracking-wide mt-1 bg-black/25 px-2 py-0.5 rounded-full">
                    Whole Cooked
                  </span>
                </div>
                {/* Herb accent */}
                <div className="absolute bottom-1 right-2 text-xs">🌿</div>
              </div>
            </div>
            <div className="w-36 h-3 bg-stone-900/10 rounded-full blur-xs mt-2" />
          </div>
        )}
      </div>

      {/* Seasonal Badge / Label pill */}
      {item.isSeasonal && item.seasonTag && (
        <div className="absolute top-3 left-3 z-20">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-[#FAF7F2] text-[#E54F38] border border-[#E54F38]/30 px-2.5 py-1 rounded-full shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E54F38] animate-ping" />
            {item.seasonTag}
          </span>
        </div>
      )}

      {/* Transparency Checkmark pill */}
      <div className="absolute bottom-3 right-3 z-20 opacity-90 transition-opacity group-hover:opacity-100">
        <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-white/95 text-stone-800 backdrop-blur-xs px-2 py-0.5 rounded-md border border-stone-200/80 shadow-xs">
          <span className="text-emerald-600 font-bold">✓</span> No UPF
        </span>
      </div>
    </div>
  );
}
