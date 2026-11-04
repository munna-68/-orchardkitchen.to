import React from 'react';
import Link from 'next/link';
import { STORE_INFO } from '@/data/mockData';
import { Leaf, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';

export default function Footer() {
  return (
    <footer className="bg-[#1E1B18] text-[#FAF7F2] border-t border-stone-800 mt-auto">
      {/* Top Value Banner */}
      <div className="border-b border-stone-800/80 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E54F38]/20 text-[#E54F38] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-100">Zero Ultra-Processed Foods</h4>
              <p className="text-xs text-stone-400">100% whole ingredients, zero seed oils</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-100">8:00 AM – 8:00 PM Daily</h4>
              <p className="text-xs text-stone-400">Fast 15-minute pickup slots</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-100">700 King Street West</h4>
              <p className="text-xs text-stone-400">King & Bathurst, Downtown Toronto</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E54F38] text-white flex items-center justify-center">
                <Leaf className="w-4 h-4 fill-current" />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                Orchard Kitchen
              </span>
            </div>
            <p className="text-stone-300 text-sm max-w-md leading-relaxed">
              At Orchard Kitchen, we are on a mission to eliminate ultra-processed foods by creating
              an offering that combines three virtues: health, flavour, and value. Made from scratch
              every morning in Toronto.
            </p>
            <div className="pt-2">
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800 text-stone-200 hover:text-white hover:bg-stone-700 text-xs font-semibold transition-all border border-stone-700"
              >
                <InstagramIcon className="w-4 h-4 text-[#E54F38]" />
                <span>Follow {STORE_INFO.handle}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-stone-200 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-white transition-colors">
                  Full Menu & Transparency
                </Link>
              </li>
              <li>
                <Link href="/order" className="hover:text-white transition-colors">
                  Order Ahead for Pickup
                </Link>
              </li>
              <li>
                <Link href="/mission" className="hover:text-white transition-colors">
                  Our Mission & Sourcing
                </Link>
              </li>
            </ul>
          </div>

          {/* Sales Video Demo Note */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-amber-400 mb-4">
              Sales Video Walkthrough
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              This single-domain experience converts social media visitors into direct pickup orders
              without 3rd-party aggregator commission cuts.
            </p>
            <div className="mt-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#E88544] text-white text-xs font-bold hover:bg-[#d07335] transition-colors"
              >
                Open Owner Dashboard →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Orchard Kitchen Demo. Built for sales demonstration.</p>
          <p className="text-stone-400 flex items-center gap-1.5">
            Crafted for <span className="text-[#E54F38]">@orchardkitchen.to</span> on King St. W
          </p>
        </div>
      </div>
    </footer>
  );
}
