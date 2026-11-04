'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { STORE_INFO } from '@/data/mockData';
import { MapPin, Clock, Leaf } from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          '[data-wordmark]',
          { yPercent: 60 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative bg-forest-deep text-cream mt-auto overflow-hidden">
      {/* lime fact strip */}
      <div className="bg-lime text-forest-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6 text-sm font-bold">
          <span className="flex items-center gap-2">
            <Leaf className="w-4 h-4" /> Zero ultra-processed food
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" /> {STORE_INFO.hours}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> 700 King St. W, Toronto
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-5">
            <p className="font-script text-3xl text-lime">health, flavour &amp; value</p>
            <p className="text-cream/75 text-sm max-w-sm leading-relaxed">
              We&apos;re on a mission to eliminate ultra-processed food on King Street West. Everything is
              made from scratch every morning, behind our own counter.
            </p>
            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost-light btn-sm"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Follow {STORE_INFO.handle}</span>
            </a>
          </div>

          <div className="md:col-span-3">
            <h4 className="wide-medium text-2xl text-lime mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm text-cream/75">
              {[
                ['/', 'Home'],
                ['/menu', 'Menu & ingredients'],
                ['/order', 'Order ahead for pickup'],
                ['/mission', 'Our mission & sourcing'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-lime transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="wide-medium text-2xl text-lime mb-4">For the owner</h4>
            <p className="text-sm text-cream/70 leading-relaxed max-w-xs">
              One link from Instagram to a pickup order, on your own domain, with no aggregator
              commission.
            </p>
            <Link href="/dashboard" className="btn btn-lime btn-sm mt-4">
              <span className="roll">
                <span>Open owner dashboard</span>
                <span>Open owner dashboard</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* giant wordmark rises as the footer enters */}
      <div className="px-2 sm:px-4 overflow-hidden" aria-hidden>
        <div data-wordmark className="wide text-cream/95 text-[13.8vw] leading-[0.78] text-center whitespace-nowrap">
          Orchard Kitchen
        </div>
      </div>

      <div className="relative border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row gap-2 justify-between text-xs text-cream/50">
          <p>© 2026 Orchard Kitchen demo, built for a sales walkthrough.</p>
          <p>
            Placeholder photography from{' '}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-lime">
              Unsplash
            </a>{' '}
            contributors.
          </p>
        </div>
      </div>
    </footer>
  );
}
