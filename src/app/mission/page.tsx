'use client';

import React from 'react';
import Link from 'next/link';
import { MISSION_PRINCIPLES, COMPARISON_MATRIX, STORE_INFO } from '@/data/mockData';
import {
  ShieldCheck,
  Leaf,
  Utensils,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  Check,
  X,
  Compass,
} from 'lucide-react';

export default function MissionPage() {
  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EEF4E9] text-[#547243] text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>The Orchard Kitchen Story</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#1E1B18] tracking-tight leading-tight">
          Eliminating Ultra-Processed Foods on King Street West.
        </h1>
        <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
          At Orchard Kitchen, we are on a mission to eliminate ultra-processed foods by creating an
          offering that combines three virtues: <strong className="text-stone-900">health</strong>,{' '}
          <strong className="text-stone-900">flavour</strong>, and{' '}
          <strong className="text-stone-900">value</strong>.
        </p>
      </section>

      {/* 4 Core Principle Blocks */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E88544]">
            How We Cook Every Morning
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 mt-1">
            Our Four Kitchen Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {MISSION_PRINCIPLES.map((principle) => (
            <div
              key={principle.num}
              className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-[#E8E0D2] shadow-xs hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-black text-2xl text-[#E54F38]/40">
                  {principle.num}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#547243] flex items-center justify-center border border-stone-200">
                  {principle.icon === 'Leaf' && <Leaf className="w-5 h-5" />}
                  {principle.icon === 'Utensils' && <Utensils className="w-5 h-5" />}
                  {principle.icon === 'Sparkles' && <Sparkles className="w-5 h-5" />}
                  {principle.icon === 'ShieldCheck' && <ShieldCheck className="w-5 h-5" />}
                </div>
              </div>

              <h3 className="font-display font-bold text-xl text-stone-900 mb-1">
                {principle.title}
              </h3>
              <div className="text-xs font-semibold text-[#547243] mb-3">
                {principle.tagline}
              </div>
              <p className="text-sm text-stone-600 leading-relaxed">
                {principle.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* "How We Compare" Visual Matrix */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#E8E0D2] shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E54F38]">
            Ingredient Integrity
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900">
            How We Compare
          </h2>
          <p className="text-stone-600 text-sm">
            An illustrative comparison between standard fast-casual shortcuts and the Orchard Kitchen scratch standard.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-500">
                <th className="py-3 px-4 w-1/4">Culinary Standard</th>
                <th className="py-3 px-4 w-3/8 text-rose-700 bg-rose-50/50 rounded-tl-xl">
                  Ultra-Processed Fast-Casual
                </th>
                <th className="py-3 px-4 w-3/8 text-emerald-800 bg-emerald-50/50 rounded-tr-xl">
                  Orchard Kitchen (700 King W)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {COMPARISON_MATRIX.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#FAF7F2]/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-stone-900 align-top">
                    {row.category}
                  </td>
                  <td className="py-4 px-4 text-xs text-stone-600 bg-rose-50/20 align-top">
                    <div className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                      <span>{row.standardFastCasual}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-xs text-stone-800 bg-emerald-50/20 font-medium align-top">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                      <span>{row.orchardKitchen}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-stone-400 text-center italic">
          *Descriptive ingredient sourcing comparison for customer education. Kept purely illustrative and focused on cooking practices.
        </p>
      </section>

      {/* Address, Hours & Map Placeholder Block */}
      <section className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 border-2 border-[#E8E0D2] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Info */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#547243]">
                Downtown Toronto
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 mt-1">
                Visit Us at 700 King W
              </h2>
              <p className="text-stone-600 text-sm mt-2">
                Situated at the corner of King Street West and Bathurst Street in the heart of Toronto&apos;s King West district.
              </p>
            </div>

            <div className="space-y-3 text-sm text-stone-800">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-stone-200">
                <MapPin className="w-5 h-5 text-[#E54F38] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900">{STORE_INFO.address}</div>
                  <div className="text-xs text-stone-500">Corner of King & Bathurst</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-stone-200">
                <Clock className="w-5 h-5 text-[#547243] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900">{STORE_INFO.hours}</div>
                  <div className="text-xs text-stone-500">Open 7 days a week for dine-in & pickup</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-stone-200">
                <Compass className="w-5 h-5 text-[#E88544] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900">Transit & Accessibility</div>
                  <div className="text-xs text-stone-500">504 King Streetcar stop right outside our door</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/order"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E54F38] hover:bg-[#CF3F29] text-white font-bold text-sm shadow transition-all"
              >
                <span>Order Ahead for Pickup</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Stylized Map Placeholder Block */}
          <div className="lg:col-span-7">
            <div className="w-full h-80 sm:h-96 rounded-2xl bg-[#EFE8DC] border-2 border-[#D8CEBD] relative overflow-hidden flex flex-col justify-between p-6 shadow-inner">
              {/* Street Grid Artwork */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-0 right-0 h-14 bg-stone-500 border-y-2 border-stone-600" />
                <div className="absolute top-0 bottom-0 left-1/2 w-16 bg-stone-500 border-x-2 border-stone-600" />
                <div className="absolute top-1/4 left-0 right-0 h-6 bg-stone-400" />
                <div className="absolute top-0 bottom-0 left-1/4 w-6 bg-stone-400" />
              </div>

              {/* Map Badge */}
              <div className="relative z-10 flex justify-between items-start">
                <div className="bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-stone-300 shadow-sm text-xs font-bold text-stone-800">
                  🗺️ Toronto Downtown Map View
                </div>
                <div className="bg-stone-900 text-white text-[10px] px-2.5 py-1 rounded font-mono uppercase">
                  King & Bathurst
                </div>
              </div>

              {/* Pin Centered at King & Bathurst */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                <div className="relative flex flex-col items-center">
                  <div className="px-3 py-1.5 rounded-xl bg-[#E54F38] text-white font-display font-bold text-xs shadow-xl flex items-center gap-1.5 border-2 border-white animate-bounce">
                    <Leaf className="w-3.5 h-3.5 fill-current" />
                    <span>Orchard Kitchen • 700 King W</span>
                  </div>
                  <div className="w-3 h-3 bg-[#E54F38] rotate-45 -mt-1 border-r border-b border-white" />
                  <div className="w-12 h-2.5 bg-stone-900/20 rounded-full blur-xs mt-1" />
                </div>
              </div>

              {/* Transit Note */}
              <div className="relative z-10 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-stone-300 text-xs text-stone-700 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900">504 King Streetcar Stop</span>
                  <span className="text-stone-500 block text-[11px]">Bathurst St & King St W</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">
                  Walk 30s
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
