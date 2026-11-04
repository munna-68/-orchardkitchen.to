'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Img from '@/components/Img';
import { useCart } from '@/context/CartContext';
import { PICKUP_TIME_SLOTS } from '@/data/mockData';
import { X, Trash2, Plus, Minus, Clock, MapPin, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    tax,
    total,
    cartCount,
    selectedTimeSlot,
    setSelectedTimeSlot,
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    orderNotes,
    setOrderNotes,
    placeOrder,
  } = useCart();

  const [step, setStep] = useState<'cart' | 'pickup' | 'confirmed'>('cart');
  const [completedOrderNum, setCompletedOrderNum] = useState('');

  if (!isCartOpen) return null;

  const handlePlaceOrder = () => {
    const order = placeOrder();
    setCompletedOrderNum(order.id);
    setStep('confirmed');
  };

  const handleReset = () => {
    setStep('cart');
    closeCart();
  };

  return (
    <div data-lenis-prevent className="fixed inset-0 z-50 flex justify-end bg-forest-deep/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={closeCart} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-lg bg-[#FEF6DE] h-full shadow-2xl flex flex-col border-l border-[#EED9AE] z-10">
        {/* Header */}
        <div className="p-5 border-b border-[#EED9AE] bg-paper flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="wide-medium text-4xl text-forest">
              {step === 'cart' && `Your Pickup Bag (${cartCount})`}
              {step === 'pickup' && 'Pickup & Contact Details'}
              {step === 'confirmed' && 'Order Received!'}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Notice Banner */}
        <div className="bg-[#FCEFCB] px-4 py-2 border-b border-[#EED9AE] flex items-center gap-2 text-xs text-[#92400E]">
          <span className="font-bold text-[10px] uppercase tracking-wider bg-[#EE8A2B] text-white px-1.5 py-0.5 rounded">
            Demo Mode
          </span>
          <span>No payment required • Prepared for sales recording</span>
        </div>

        {/* STEP 1: CART ITEMS */}
        {step === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="w-16 h-16 rounded-full bg-[#FBEBC4] flex items-center justify-center mx-auto mb-4 text-3xl">
                    🥣
                  </div>
                  <h3 className="font-display font-bold text-lg text-stone-900">
                    Your pickup bag is empty
                  </h3>
                  <p className="text-sm text-stone-600 mt-1 max-w-xs mx-auto">
                    Explore our whole-ingredient plates, hearty bowls, and fresh immunity shots.
                  </p>
                  <button
                    onClick={closeCart}
                    className="btn btn-lime btn-sm mt-6"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                items.map((ci) => (
                  <div
                    key={ci.item.id}
                    className="p-4 rounded-2xl bg-paper border border-[#EED9AE] shadow-xs flex gap-3 items-start"
                  >
                    {/* Visual icon */}
                    <Img
                      src={ci.item.visual.imageSrc!}
                      w={140}
                      h={140}
                      alt=""
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="font-display font-semibold text-stone-900 text-sm truncate">
                          {ci.item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(ci.item.id)}
                          className="text-stone-400 hover:text-[#D4731A] transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-stone-500 mt-0.5">
                        ${ci.item.price.toFixed(2)} each
                      </div>

                      {ci.notes && (
                        <div className="text-[11px] text-[#B8412D] bg-[#FFF0C2] rounded px-2 py-0.5 mt-1">
                          Note: {ci.notes}
                        </div>
                      )}

                      {/* Quantity Controller */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100">
                        <div className="flex items-center gap-2 bg-[#FEF6DE] rounded-lg border border-stone-200 p-0.5">
                          <button
                            onClick={() => updateQuantity(ci.item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center rounded bg-paper text-stone-700 hover:bg-stone-50 shadow-xs"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-stone-800">
                            {ci.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(ci.item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center rounded bg-paper text-stone-700 hover:bg-stone-50 shadow-xs"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-bold text-sm text-[#D94F3A]">
                          ${(ci.item.price * ci.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer with totals */}
            {items.length > 0 && (
              <div className="p-5 bg-paper border-t border-[#EED9AE] space-y-3">
                <div className="flex items-center justify-between text-sm text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-stone-600">
                  <span>Ontario HST (13%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total (Demo)</span>
                  <span className="text-xl font-display text-[#D94F3A]">${total.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => setStep('pickup')}
                  className="btn btn-lime w-full mt-2"
                >
                  Choose Pickup Time & Details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

        {/* STEP 2: PICKUP TIME & CUSTOMER INFO */}
        {step === 'pickup' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Store Location */}
            <div className="p-4 rounded-2xl bg-paper border border-[#EED9AE] space-y-1">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <MapPin className="w-4 h-4 text-[#D94F3A]" />
                <span>Express Pickup Counter</span>
              </div>
              <p className="text-xs text-stone-600">
                700 King St. W, Toronto (King & Bathurst)
              </p>
              <p className="text-[11px] text-[#B8412D] font-medium pt-1">
                Open Daily 8:00 AM – 8:00 PM • Fast In-Store Hand-Off
              </p>
            </div>

            {/* Pickup Time Slots */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D94F3A]" />
                  Select Pickup Time (Today):
                </label>
                <span className="text-[11px] text-stone-500">15-min slots</span>
              </div>

              <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1 bg-paper rounded-xl border border-[#EED9AE]">
                {PICKUP_TIME_SLOTS.map((slot) => {
                  const isSelected = selectedTimeSlot === slot.time;
                  const isBusy = slot.status === 'busy';
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot.time)}
                      className={`py-2 px-2 rounded-lg text-xs font-medium text-center transition-all relative ${
                        isSelected
                          ? 'bg-forest text-paper font-bold shadow-xs'
                          : isBusy
                          ? 'bg-[#FDE7DA] text-[#C2461A] border border-[#F7B48F] hover:bg-[#FDE7DA]'
                          : 'bg-[#FEF6DE] text-stone-800 hover:bg-[#FBEBC4] border border-stone-200'
                      }`}
                    >
                      <div>{slot.time}</div>
                      {isBusy && !isSelected && (
                        <div className="text-[9px] font-bold text-[#C2461A]">
                          {slot.label || 'Busy'}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                Selected: <strong className="text-stone-900">{selectedTimeSlot}</strong> at 700 King West.
              </p>
            </div>

            {/* Customer Information (Demo Names) */}
            <div className="space-y-3 bg-paper p-4 rounded-2xl border border-[#EED9AE]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Contact For Order Pickup Text:
              </h4>

              <div>
                <label className="block text-xs text-stone-600 mb-1">Your Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. J. Sample"
                  className="w-full px-3 py-2 rounded-lg bg-[#FEF6DE] border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D94F3A]"
                />
              </div>

              <div>
                <label className="block text-xs text-stone-600 mb-1">Mobile Phone (Demo SMS)</label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="(416) 555-0199"
                  className="w-full px-3 py-2 rounded-lg bg-[#FEF6DE] border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D94F3A]"
                />
              </div>

              <div>
                <label className="block text-xs text-stone-600 mb-1">Pickup Notes (Optional)</label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. extra napkins, calling when arriving"
                  className="w-full px-3 py-2 rounded-lg bg-[#FEF6DE] border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D94F3A]"
                />
              </div>
            </div>

            {/* Total summary */}
            <div className="bg-[#FEF6DE] p-4 rounded-2xl border border-[#EED9AE] flex justify-between items-center">
              <div>
                <div className="text-xs text-stone-500">Total Demo Amount</div>
                <div className="text-xl font-display font-bold text-[#D94F3A]">
                  ${total.toFixed(2)}
                </div>
              </div>
              <div className="text-right text-xs text-stone-500">
                <div>{cartCount} items</div>
                <div className="font-semibold text-stone-800">Ready at {selectedTimeSlot}</div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="px-4 py-3 rounded-xl border border-stone-300 text-stone-700 text-sm font-semibold hover:bg-paper"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="btn btn-lime flex-1"
              >
                <Sparkles className="w-4 h-4" />
                Place Demo Pickup Order
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ORDER CONFIRMED */}
        {step === 'confirmed' && (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FFF0C2] text-[#D94F3A] flex items-center justify-center shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D94F3A] bg-[#FFF0C2] px-3 py-1 rounded-full border border-[#F5C24A]">
                Order Received • Whole Kitchen Working
              </span>
              <h3 className="wide text-5xl text-forest mt-2">
                Thank You, {customerName}!
              </h3>
              <p className="text-sm text-stone-600 mt-1">
                Your order <strong className="text-stone-900">{completedOrderNum}</strong> is confirmed.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="w-full bg-paper rounded-2xl p-5 border-2 border-[#EED9AE] text-left space-y-3 shadow-xs">
              <div className="flex justify-between items-center pb-2 border-b border-stone-200 text-xs">
                <span className="text-stone-500">Pickup Window</span>
                <span className="font-bold text-stone-900">{selectedTimeSlot} Today</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-stone-200 text-xs">
                <span className="text-stone-500">Pickup Counter</span>
                <span className="font-bold text-stone-900">700 King St. W, Toronto</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-500">Total (Demo)</span>
                <span className="font-bold text-[#D94F3A] text-base">${total.toFixed(2)}</span>
              </div>
              <div className="pt-2 text-[11px] text-[#B8412D] bg-[#FFF0C2] rounded-lg p-2.5">
                🌿 Freshly prepared with zero seed oils, in-house dressings, and whole Ontario ingredients.
              </div>
            </div>

            {/* Actions */}
            <div className="w-full space-y-2 pt-2">
              <Link
                href="/dashboard"
                onClick={handleReset}
                className="btn btn-forest w-full"
              >
                View in Restaurant Owner Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 rounded-xl border border-stone-300 text-stone-700 text-sm font-semibold hover:bg-paper transition-colors"
              >
                Place Another Test Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
