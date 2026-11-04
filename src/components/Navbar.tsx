'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { STORE_INFO } from '@/data/mockData';
import { ShoppingBag, Menu as MenuIcon, X, Sparkles, LayoutDashboard, Leaf } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/order', label: 'Order Pickup' },
    { href: '/mission', label: 'Our Mission' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E0D2] transition-colors">
      {/* Top micro announcement bar */}
      <div className="bg-[#E54F38] text-white text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 opacity-90 animate-pulse" />
        <span>{STORE_INFO.announcement}</span>
        <span className="hidden md:inline opacity-75">|</span>
        <span className="hidden md:inline font-mono opacity-90">700 King St. W</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Wordmark (No tree logo recreation, just clean leaf wordmark) */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#E54F38] text-white flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
            <Leaf className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="font-display font-extrabold text-2xl tracking-tight text-[#1E1B18] group-hover:text-[#E54F38] transition-colors">
              Orchard Kitchen
            </span>
            <span className="block text-[11px] font-sans font-medium text-stone-500 tracking-wide uppercase">
              Toronto • King & Bathurst
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-[#E54F38] bg-[#FDF0ED] font-bold shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-[#F3ECE1]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dashboard Sales Demo Pill */}
          <Link
            href="/dashboard"
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              pathname === '/dashboard'
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-800 border-stone-300 hover:border-stone-400 hover:bg-stone-50 shadow-xs'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#E88544]" />
            <span>Owner Dashboard</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-100 text-amber-800 uppercase font-mono">
              Demo
            </span>
          </Link>

          {/* Cart Bag Trigger */}
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E54F38] hover:bg-[#CF3F29] text-white font-bold text-sm shadow-md transition-all active:scale-95"
            aria-label="View pickup cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Pickup Bag</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white text-[#E54F38] text-xs flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-stone-700 hover:bg-[#F3ECE1]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#E8E0D2] px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-base font-semibold ${
                pathname === link.href
                  ? 'text-[#E54F38] bg-[#FDF0ED] font-bold'
                  : 'text-stone-700 hover:bg-[#F3ECE1]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-stone-200">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold bg-white border border-stone-300 text-stone-900"
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-[#E88544]" />
                <span>Owner Dashboard</span>
              </div>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono">
                DEMO VIEW
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
