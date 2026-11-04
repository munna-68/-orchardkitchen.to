'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import FoodVisual from './FoodVisual';
import { X, Check, ShieldCheck, Clock, Flame, Plus, Minus, ShoppingBag, Sparkles } from 'lucide-react';

export default function ItemDetailModal() {
  const { detailItem, closeDetailModal, addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [specialNote, setSpecialNote] = useState('');
  const [addedToast, setAddedToast] = useState(false);

  if (!detailItem) return null;

  const handleAddToCart = () => {
    addItem(detailItem, quantity, specialNote);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      closeDetailModal();
      openCart();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E8E0D2] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeDetailModal}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/90 text-stone-700 hover:text-black hover:bg-white shadow-sm transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Visual Header */}
        <div className="relative">
          <FoodVisual item={detailItem} size="lg" className="rounded-none rounded-t-3xl" />
          <div className="absolute bottom-4 left-6 z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-[#E54F38] shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#547243]" />
              Zero Ultra-Processed Foods
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-16rem)] overflow-y-auto">
          {/* Title & Metadata */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#547243]">
                  {detailItem.categoryLabel}
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1E1B18] mt-1">
                  {detailItem.name}
                </h2>
              </div>
              <div className="text-right shrink-0">
                <span className="text-2xl font-bold font-display text-[#E54F38]">
                  ${detailItem.price.toFixed(2)}
                </span>
                <span className="block text-[11px] text-stone-500 font-medium">demo price</span>
              </div>
            </div>

            <p className="text-stone-700 text-base leading-relaxed mt-3">
              {detailItem.shortDesc}
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              {detailItem.dietary.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F3ECE1] text-stone-800 border border-stone-200/80"
                >
                  {tag}
                </span>
              ))}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs text-stone-600 bg-white border border-stone-200">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {detailItem.prepTime}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs text-stone-600 bg-white border border-stone-200">
                <Flame className="w-3.5 h-3.5 text-stone-400" />
                {detailItem.calories}
              </span>
            </div>
          </div>

          {/* THE PROUD TRANSPARENCY LABEL */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-[#E8E0D2] shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E54F38]" />
                <h3 className="font-display font-bold text-lg text-stone-900 tracking-tight">
                  Proud Transparency Label
                </h3>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                100% Disclosed
              </span>
            </div>

            {/* What's In It */}
            <div className="mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Every Single Raw Ingredient:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-stone-800">
                {detailItem.transparency.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#547243] font-bold mt-0.5">✓</span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Made In-House Highlight */}
            <div className="mt-4 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8E0D2] text-xs text-stone-700 leading-relaxed">
              <strong className="text-stone-900 block mb-0.5 font-semibold">
                🧑‍🍳 Made In-House at 700 King W:
              </strong>
              {detailItem.transparency.madeInHouse}
            </div>

            {/* What is NEVER inside */}
            <div className="mt-4 pt-3 border-t border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-2">
                What We Will NEVER Put In Your Body:
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {detailItem.transparency.whatIsExcluded.map((ex, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-[10px]">
                      ✕
                    </span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sourcing note */}
            <div className="mt-3 text-[11px] text-stone-500 italic">
              Sourcing: {detailItem.transparency.sourcing}
            </div>
          </div>

          {/* Kitchen Notes Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
              Pickup Instructions or Dietary Notes (Optional):
            </label>
            <input
              type="text"
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="e.g. sauce on side, light salt, etc."
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E8E0D2] text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E54F38]"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white border-t border-[#E8E0D2] flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3 bg-[#FAF7F2] p-1.5 rounded-xl border border-stone-200">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg bg-white text-stone-700 flex items-center justify-center hover:bg-stone-100 disabled:opacity-40 transition-colors shadow-xs"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold text-stone-900 text-base">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-lg bg-white text-stone-700 flex items-center justify-center hover:bg-stone-100 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={addedToast}
            className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-md ${
              addedToast
                ? 'bg-emerald-600 text-white'
                : 'bg-[#E54F38] hover:bg-[#CF3F29] text-white hover:shadow-lg'
            }`}
          >
            {addedToast ? (
              <>
                <Check className="w-5 h-5 animate-scale" />
                Added to Pickup Order!
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                Add to Pickup Order • ${(detailItem.price * quantity).toFixed(2)}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
