'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { STORE_INFO, MENU_ITEMS } from '@/data/mockData';
import FoodVisual from '@/components/FoodVisual';
import { useCart } from '@/context/CartContext';
import {
  ArrowRight,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  Check,
  Instagram,
  UtensilsCrossed,
  BookOpen,
} from 'lucide-react';

export default function HomePage() {
  const { openDetailModal, addItem, openCart } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Signatures for the home highlight
  const featuredDishes = MENU_ITEMS.filter((i) => i.isSignature).slice(0, 3);
  const seasonalDishes = MENU_ITEMS.filter((i) => i.isSeasonal).slice(0, 3);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-20 bg-gradient-to-b from-[#F7F2EA] to-[#FAF7F2] border-b border-[#E8E0D2]">
        {/* Subtle Decorative Blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#FCEBE7] blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-[#F2F6EC] blur-3xl opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headlines & Call to Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Mission Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E0D2] shadow-xs text-xs font-bold uppercase tracking-wider text-[#E54F38]">
                <ShieldCheck className="w-4 h-4 text-[#547243]" />
                <span>Mission: Eliminate Ultra-Processed Foods</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#1E1B18] leading-[1.12]">
                Real, seasonal food on <span className="text-[#E54F38] underline decoration-[#E88544]/50 decoration-wavy">King Street West</span>.
              </h1>

              {/* Tagline */}
              <p className="text-lg sm:text-xl text-stone-700 max-w-2xl font-normal leading-relaxed">
                Whole-ingredient bowls, Peruvian Lomo Saltado, slow-roasted chicken, and raw immunity shots.
                Cooked from scratch daily with zero seed oils, zero artificial additives, and zero refined sugars.
              </p>

              {/* Location & Hours Bar */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm font-medium text-stone-700 pt-2">
                <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-stone-200/80 shadow-xs">
                  <MapPin className="w-4 h-4 text-[#E54F38]" />
                  <span>{STORE_INFO.address} ({STORE_INFO.neighborhood})</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-stone-200/80 shadow-xs">
                  <Clock className="w-4 h-4 text-[#547243]" />
                  <span>{STORE_INFO.hours}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-3">
                <Link
                  href="/order"
                  className="px-7 py-4 rounded-2xl bg-[#E54F38] hover:bg-[#CF3F29] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Order Pickup Ahead</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/menu"
                  className="px-6 py-4 rounded-2xl bg-white hover:bg-[#F3ECE1] text-stone-900 font-bold text-base border-2 border-stone-300 transition-all flex items-center gap-2 shadow-xs"
                >
                  <UtensilsCrossed className="w-5 h-5 text-stone-500" />
                  <span>Browse Full Menu</span>
                </Link>
              </div>

              {/* Social Proof / Instagram Callout */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-xs text-stone-500">
                <span className="flex items-center gap-1 font-semibold text-stone-800">
                  <Instagram className="w-4 h-4 text-[#E54F38]" />
                  @orchardkitchen.to
                </span>
                <span>•</span>
                <span>Comment &quot;menu&quot; on any reel to order directly here</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white p-5 rounded-3xl shadow-xl border-2 border-[#E8E0D2]">
                {/* Highlight Label */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-100">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#E88544]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                      Signature of the House
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#547243] bg-emerald-50 px-2 py-0.5 rounded">
                    100% Seed-Oil Free
                  </span>
                </div>

                {/* Hero Dish Visual */}
                <FoodVisual item={featuredDishes[0]} size="hero" className="rounded-2xl" />

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-xl text-stone-900">
                      {featuredDishes[0].name}
                    </h3>
                    <span className="font-bold text-lg text-[#E54F38]">
                      ${featuredDishes[0].price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 line-clamp-2">
                    {featuredDishes[0].shortDesc}
                  </p>

                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => openDetailModal(featuredDishes[0])}
                      className="flex-1 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-xs font-bold hover:bg-stone-50 transition-colors"
                    >
                      View Transparency Label
                    </button>
                    <button
                      onClick={() => {
                        addItem(featuredDishes[0], 1);
                        openCart();
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#E54F38] text-white text-xs font-bold hover:bg-[#CF3F29] transition-colors flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= THREE ENTRY CARDS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#547243]">
            Explore Orchard Kitchen
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1E1B18] mt-1">
            Everything in one place.
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            No 3rd-party aggregators, no hidden seed oils, and no inflated prices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Menu */}
          <Link
            href="/menu"
            className="group relative bg-white p-7 rounded-3xl border-2 border-[#E8E0D2] shadow-sm hover:shadow-xl hover:border-[#E54F38]/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#FDF0ED] text-[#E54F38] flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">
                🥗
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E54F38]">
                100% Disclosed
              </span>
              <h3 className="font-display font-bold text-2xl text-[#1E1B18] mt-1 group-hover:text-[#E54F38] transition-colors">
                Full Seasonal Menu
              </h3>
              <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                Browse every dish, plate, bowl, soup, and immunity shot with complete ingredient transparency labels.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between font-bold text-sm text-[#E54F38]">
              <span>Explore Menu Items</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 2: Order Pickup */}
          <Link
            href="/order"
            className="group relative bg-[#FBF6EE] p-7 rounded-3xl border-2 border-[#E8DEC8] shadow-sm hover:shadow-xl hover:border-[#E88544] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">
                ⏱️
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                15-Min Pickup Slots
              </span>
              <h3 className="font-display font-bold text-2xl text-[#1E1B18] mt-1 group-hover:text-[#E88544] transition-colors">
                Order Ahead for Pickup
              </h3>
              <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                Skip the line. Pick your time between 8am and 8pm for express in-store hand-off at 700 King West.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-amber-200/60 flex items-center justify-between font-bold text-sm text-amber-800">
              <span>Start Pickup Order</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 3: Our Mission */}
          <Link
            href="/mission"
            className="group relative bg-white p-7 rounded-3xl border-2 border-[#E8E0D2] shadow-sm hover:shadow-xl hover:border-[#547243]/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#EEF4E9] text-[#547243] flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">
                🌱
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#547243]">
                Zero UPFs
              </span>
              <h3 className="font-display font-bold text-2xl text-[#1E1B18] mt-1 group-hover:text-[#547243] transition-colors">
                Our Mission Story
              </h3>
              <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                Why we eliminate ultra-processed food and seed oils, and how our whole-food kitchen compares to standard fast-casual.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between font-bold text-sm text-[#547243]">
              <span>Read Our Principles</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* ================= WHAT'S IN SEASON FEATURE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF2E6] rounded-3xl p-6 sm:p-10 border border-[#E8DEC8]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E88544] mb-2">
                <Sparkles className="w-4 h-4" />
                Current Harvest Spotlight
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">
                &ldquo;Cool days bring warm flavours&rdquo;
              </h2>
              <p className="text-stone-600 text-sm mt-1 max-w-xl">
                Enjoying whole foods that are in season right now. Grown by regional Ontario growers and prepared fresh daily at King and Bathurst.
              </p>
            </div>
            <Link
              href="/menu?filter=all"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#E54F38] hover:underline"
            >
              <span>View all seasonal items</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Seasonal Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {seasonalDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-2xl p-4 border border-[#E8E0D2] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <FoodVisual item={dish} size="sm" className="mb-3" />
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-bold text-base text-stone-900">
                      {dish.name}
                    </h3>
                    <span className="font-bold text-sm text-[#E54F38] shrink-0">
                      ${dish.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                    {dish.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => openDetailModal(dish)}
                    className="text-xs font-semibold text-stone-700 hover:text-stone-900 underline"
                  >
                    Transparency Label
                  </button>
                  <button
                    onClick={() => {
                      addItem(dish, 1);
                      openCart();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#E54F38] text-white text-xs font-bold hover:bg-[#CF3F29] flex items-center gap-1 shadow-xs"
                  >
                    <PlusIcon className="w-3.5 h-3.5" />
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INSTAGRAM CONVERSION REEL CALLOUT ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E1B18] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E54F38]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-800 text-[#E88544] border border-stone-700">
                <Instagram className="w-3.5 h-3.5" />
                Instagram @orchardkitchen.to Integration
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-100">
                Turn reel comments into pickup orders in seconds.
              </h2>
              <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
                When a Toronto foodie comments &ldquo;menu&rdquo; on any Orchard Kitchen reel or story, this one direct link delivers the menu, transparency breakdown, and pickup checkout on their own domain — cutting out 30% delivery commission cuts.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/dashboard"
                className="w-full py-3.5 px-5 rounded-xl bg-[#E88544] hover:bg-[#d07335] text-white font-bold text-sm text-center shadow transition-all flex items-center justify-center gap-2"
              >
                <span>View Comment-to-Link Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-sm text-center border border-stone-700 transition-all flex items-center justify-center gap-2"
              >
                <Instagram className="w-4 h-4 text-[#E54F38]" />
                <span>Visit Instagram Profile</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EMAIL SIGNUP ================= */}
      <section className="max-w-3xl mx-auto px-4 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#E8E0D2] shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EEF4E9] text-[#547243] flex items-center justify-center mx-auto text-xl">
            📬
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#1E1B18]">
            Get Seasonal Menu Updates
          </h2>
          <p className="text-stone-600 text-sm max-w-md mx-auto">
            Stay in the loop when seasonal harvest dishes rotate at 700 King West. No spam, just real food announcements.
          </p>

          {subscribed ? (
            <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-sm font-semibold flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>You are subscribed to seasonal harvest drops!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8E0D2] text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E54F38]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#E54F38] hover:bg-[#CF3F29] text-white font-bold text-sm shadow transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[11px] text-stone-400">
            Demo feature • Joins 342 King West local subscribers
          </p>
        </div>
      </section>
    </div>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
    </svg>
  );
}
