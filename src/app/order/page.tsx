'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { MENU_ITEMS, PICKUP_TIME_SLOTS, STORE_INFO } from '@/data/mockData';
import FoodVisual from '@/components/FoodVisual';
import {
  Clock,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Phone,
  User,
  FileText,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';

export default function OrderPickupPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    addItem,
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
    confirmedOrder,
    resetOrder,
  } = useCart();

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(confirmedOrder);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    const order = placeOrder();
    setCurrentOrder(order);
    setHasSubmitted(true);
  };

  const handleStartNewOrder = () => {
    resetOrder();
    setHasSubmitted(false);
    setCurrentOrder(null);
  };

  // If order was placed, show confirmation screen
  if (hasSubmitted && currentOrder) {
    return (
      <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
        <div className="text-center space-y-3">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle className="w-12 h-12" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
            Demo Order Confirmed • Real-Time Prep
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-stone-900">
            Ready for Pickup at {currentOrder.timeSlot}
          </h1>
          <p className="text-stone-600 text-sm max-w-md mx-auto">
            Thank you, <strong className="text-stone-900">{currentOrder.customerName}</strong>. Our kitchen is preparing your whole-ingredient order right now.
          </p>
        </div>

        {/* Live Prep Status Tracker */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E8E0D2] shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div>
              <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                Demo Order Reference
              </span>
              <div className="text-2xl font-display font-extrabold text-[#E54F38]">
                {currentOrder.id}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                Target Pickup Time
              </span>
              <div className="text-lg font-bold text-stone-900 flex items-center gap-1.5 justify-end">
                <Clock className="w-4 h-4 text-[#E54F38]" />
                {currentOrder.timeSlot} Today
              </div>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Kitchen Preparation Status:
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                <div className="text-lg mb-1">✓</div>
                <span>1. Order Placed</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-900 font-bold animate-pulse">
                <div className="text-lg mb-1">🧑‍🍳</div>
                <span>2. Cooking in Kitchen</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-400 font-medium">
                <div className="text-lg mb-1">📦</div>
                <span>3. Ready at Counter</span>
              </div>
            </div>
          </div>

          {/* Pickup Instructions */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D2] flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#E54F38] shrink-0 mt-0.5" />
            <div className="text-xs text-stone-700 leading-relaxed">
              <strong className="block text-stone-900 font-semibold mb-0.5">
                Pickup Location Instructions:
              </strong>
              Walk into Orchard Kitchen at <strong>700 King St. W</strong> (corner of King & Bathurst).
              Head straight to the Express Pickup Counter on the left and tell the team your name (
              <strong>{currentOrder.customerName}</strong>).
            </div>
          </div>

          {/* Ordered Items Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
              Order Summary:
            </h4>
            <div className="divide-y divide-stone-100 text-sm">
              {currentOrder.items.map((ci, idx) => (
                <div key={idx} className="py-2.5 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#E54F38] text-xs w-5">{ci.quantity}x</span>
                    <span className="text-stone-800 font-medium">{ci.item.name}</span>
                  </div>
                  <span className="font-mono text-stone-700">
                    ${(ci.item.price * ci.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${currentOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Ontario HST (13%)</span>
                <span>${currentOrder.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-100">
                <span>Total Demo Amount</span>
                <span className="text-lg text-[#E54F38] font-display">
                  ${currentOrder.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard link & reset */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/dashboard"
            className="flex-1 py-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm text-center shadow transition-all flex items-center justify-center gap-2"
          >
            <span>View this order in Owner Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={handleStartNewOrder}
            className="px-6 py-4 rounded-2xl border-2 border-stone-300 text-stone-800 font-bold text-sm hover:bg-white transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Place Another Order</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#E88544]">
          Express Pickup Counter
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#1E1B18]">
          Order Ahead for Pickup
        </h1>
        <p className="text-stone-600 text-sm">
          Skip the line at 700 King West. Pick your time slot between 8am and 8pm for fresh, whole-ingredient comfort food.
        </p>
      </div>

      {/* Demo Warning Banner */}
      <div className="max-w-4xl mx-auto bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-amber-900">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
        <div className="leading-relaxed">
          <strong>Interactive Sales Demo:</strong> No credit card or POS connection required. Feel free to customize quantities, select a time slot, and test the full flow on screen.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
        {/* Left Column: Bag & Quick Add */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#E8E0D2] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h2 className="font-display font-bold text-xl text-stone-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#E54F38]" />
                Your Selected Items ({cartCount})
              </h2>
              <Link href="/menu" className="text-xs font-bold text-[#E54F38] hover:underline">
                + Add more items
              </Link>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="text-4xl mb-2">🥗</div>
                <h3 className="font-display font-bold text-base text-stone-900">Your bag is empty</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Add one of our signature plates below to test the ordering checkout flow!
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => addItem(MENU_ITEMS[0], 1)}
                    className="px-3 py-1.5 rounded-lg bg-[#E54F38] text-white text-xs font-bold hover:bg-[#CF3F29]"
                  >
                    + Add Lomo Saltado
                  </button>
                  <button
                    onClick={() => addItem(MENU_ITEMS[1], 1)}
                    className="px-3 py-1.5 rounded-lg bg-[#E88544] text-white text-xs font-bold hover:bg-[#d07335]"
                  >
                    + Add Rotisserie Chicken
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((ci) => (
                  <div
                    key={ci.item.id}
                    className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D2] flex gap-3 items-center"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ backgroundColor: ci.item.visual.bgBlobColor || '#FFF' }}
                    >
                      {ci.item.visual.accentEmoji}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="font-display font-bold text-sm text-stone-900 truncate">
                          {ci.item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(ci.item.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-stone-500">
                        ${ci.item.price.toFixed(2)} each • {ci.item.dietary.join(', ')}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1">
                        <div className="flex items-center gap-2 bg-white rounded-lg border border-stone-200 p-0.5">
                          <button
                            onClick={() => updateQuantity(ci.item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-stone-900">
                            {ci.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(ci.item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-bold text-sm text-[#E54F38]">
                          ${(ci.item.price * ci.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Popular Add-Ons */}
          <div className="bg-white rounded-3xl p-5 border border-[#E8E0D2] shadow-xs space-y-3">
            <h3 className="font-display font-bold text-sm text-stone-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#E88544]" />
              Popular Immunity Shots & Sides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {MENU_ITEMS.filter((i) => i.category === 'juices-shots' || i.category === 'sides')
                .slice(0, 4)
                .map((dish) => (
                  <div
                    key={dish.id}
                    className="p-2.5 rounded-xl bg-[#FAF7F2] border border-stone-200 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-lg">{dish.visual.accentEmoji}</span>
                      <div className="truncate">
                        <div className="text-xs font-bold text-stone-800 truncate">{dish.name}</div>
                        <div className="text-[10px] text-stone-500">${dish.price.toFixed(2)}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => addItem(dish, 1)}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-stone-100 border border-stone-300 text-[11px] font-bold text-stone-800 shrink-0 shadow-xs"
                    >
                      + Add
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right Column: Time Slot & Demo Checkout */}
        <div className="lg:col-span-5 space-y-6">
          <form
            onSubmit={handlePlaceOrder}
            className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#E8E0D2] shadow-sm space-y-5"
          >
            <h3 className="font-display font-bold text-lg text-stone-900 border-b border-stone-200 pb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#E54F38]" />
              Choose 15-Min Pickup Slot
            </h3>

            {/* Time Slot Picker */}
            <div>
              <div className="grid grid-cols-3 gap-2 max-h-52 overflow-y-auto p-1 bg-[#FAF7F2] rounded-xl border border-stone-200">
                {PICKUP_TIME_SLOTS.map((slot) => {
                  const isSelected = selectedTimeSlot === slot.time;
                  const isBusy = slot.status === 'busy';
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot.time)}
                      className={`py-2 px-2 rounded-lg text-xs font-semibold text-center transition-all ${
                        isSelected
                          ? 'bg-[#E54F38] text-white font-bold shadow-xs scale-102'
                          : isBusy
                          ? 'bg-amber-100/70 text-amber-900 border border-amber-300 hover:bg-amber-100'
                          : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                      }`}
                    >
                      <div>{slot.time}</div>
                      {isBusy && (
                        <div className={`text-[9px] ${isSelected ? 'text-white' : 'text-amber-800'}`}>
                          {slot.label || 'Rush'}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-stone-500 mt-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#E54F38]" />
                Selected time: <strong className="text-stone-900">{selectedTimeSlot}</strong> at 700 King W
              </p>
            </div>

            {/* Customer Inputs */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Pickup Contact Details:
              </h4>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-stone-400" />
                  Your Name (Demo)
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. J. Sample"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E54F38]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  Phone (for ready text)
                </label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="(416) 555-0199"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E54F38]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-stone-400" />
                  Kitchen Request (Optional)
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. sauce on side, extra napkins"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E54F38]"
                />
              </div>
            </div>

            {/* Price calculation */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-medium text-stone-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Ontario HST (13%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Direct Pickup Fee</span>
                <span>$0.00 (No 30% App Surcharge)</span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total (Demo)</span>
                <span className="text-xl font-display text-[#E54F38]">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={items.length === 0}
              className="w-full py-4 rounded-2xl bg-[#E54F38] hover:bg-[#CF3F29] disabled:opacity-50 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Place Demo Pickup Order</span>
            </button>

            <p className="text-[11px] text-center text-stone-400">
              Demo order simulation for sales recording. No charges made.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
