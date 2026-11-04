'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, X, LayoutDashboard } from 'lucide-react';

const navLinks = [
  { href: '/menu', label: 'Menu' },
  { href: '/order', label: 'Order pickup' },
  { href: '/mission', label: 'Our mission' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // over the home hero photo the bar is transparent with cream type
  const overPhoto = pathname === '/' && !scrolled && !mobileMenuOpen;
  const text = overPhoto ? 'text-cream' : 'text-forest';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        overPhoto
          ? 'bg-transparent'
          : 'bg-cream/95 backdrop-blur-md shadow-[0_1px_0_var(--color-line)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] sm:h-20 flex items-center justify-between gap-4">
        {/* Stacked wordmark */}
        <Link href="/" aria-label="Orchard Kitchen home" className={`wide-medium text-[1.45rem] sm:text-[1.6rem] leading-[0.82] ${text} transition-colors`}>
          Orchard
          <br />
          Kitchen
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-3.5 py-2 text-sm font-semibold ${text} transition-colors group`}
              >
                {link.label}
                <span
                  className={`absolute left-3.5 right-3.5 -bottom-0.5 h-[3px] rounded-full bg-lime origin-left transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href="/dashboard"
            className={`ml-1 inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold ${
              overPhoto ? 'text-cream/75 hover:text-cream' : 'text-forest/70 hover:text-forest'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Owner demo
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/order" className="btn btn-lime btn-sm hidden sm:inline-flex">
            <span className="roll">
              <span>Order pickup</span>
              <span>Order pickup</span>
            </span>
          </Link>
          <button
            onClick={openCart}
            className={`relative w-11 h-11 rounded-full flex items-center justify-center border-[1.5px] transition-colors ${
              overPhoto
                ? 'border-cream/50 text-cream hover:bg-cream hover:text-forest'
                : 'border-forest/25 text-forest hover:bg-forest hover:text-cream'
            }`}
            aria-label={`Open pickup bag${cartCount ? `, ${cartCount} items` : ''}`}
          >
            <ShoppingBag className="w-[18px] h-[18px]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-orange text-paper text-[11px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            className={`md:hidden w-11 h-11 flex flex-col items-center justify-center gap-[5px] ${text}`}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <>
                <span className="block w-6 h-[2px] bg-current rounded" />
                <span className="block w-6 h-[2px] bg-current rounded" />
                <span className="block w-4 h-[2px] bg-current rounded ml-2" />
              </>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-cream border-t border-line px-4 pt-4 pb-7 space-y-1">
          {[{ href: '/', label: 'Home' }, ...navLinks].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block wide-medium text-5xl py-1.5 ${pathname === link.href ? 'text-orange' : 'text-forest'}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-5 flex flex-wrap gap-2">
            <Link href="/order" onClick={() => setMobileMenuOpen(false)} className="btn btn-lime">
              Order pickup
            </Link>
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="btn btn-ghost">
              <LayoutDashboard className="w-4 h-4" />
              Owner demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
