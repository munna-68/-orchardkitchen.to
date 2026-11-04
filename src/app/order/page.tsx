'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { MENU_ITEMS, PICKUP_TIME_SLOTS } from '@/data/mockData';
import {
  Clock,
  MapPin,
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
  ChefHat,
  Package,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Img from '@/components/Img';

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
      <div className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="w-20 h-20 rounded-full bg-[#FFF0C2] text-[#D94F3A] flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle className="w-12 h-12" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFF0C2] text-[#D94F3A] border border-[#F5C24A]">
            Demo Order Confirmed • Real-Time Prep
          </span>
          <h1 className="wide text-6xl sm:text-8xl text-forest">
            Ready at {currentOrder.timeSlot}
          </h1>
          <p className="text-stone-600 text-sm max-w-md mx-auto">
            Thank you, <strong className="text-stone-900">{currentOrder.customerName}</strong>. Our kitchen is preparing your whole-ingredient order right now.
          </p>
        </div>

        {/* Live Prep Status Tracker */}
        <div className="bg-paper rounded-3xl p-6 sm:p-8 border-2 border-[#EED9AE] shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div>
              <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                Demo Order Reference
              </span>
              <div className="text-2xl font-display font-extrabold text-[#D94F3A]">
                {currentOrder.id}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                Target Pickup Time
              </span>
              <div className="text-lg font-bold text-stone-900 flex items-center gap-1.5 justify-end">
                <Clock className="w-4 h-4 text-[#D94F3A]" />
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
              <div className="p-3 rounded-xl bg-[#FFF0C2] border border-[#F5C24A] text-[#D94F3A] font-bold">
                <CheckCircle className="w-5 h-5 mx-auto mb-1" />
                <span>1. Order Placed</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FDE7DA] border-2 border-[#F7B48F] text-[#C2461A] font-bold animate-pulse">
                <ChefHat className="w-5 h-5 mx-auto mb-1" />
                <span>2. Cooking in Kitchen</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-400 font-medium">
                <Package className="w-5 h-5 mx-auto mb-1" />
                <span>3. Ready at Counter</span>
              </div>
            </div>
          </div>

          {/* Pickup Instructions */}
          <div className="p-4 rounded-2xl bg-[#FEF6DE] border border-[#EED9AE] flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#D94F3A] shrink-0 mt-0.5" />
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
                    <span className="font-bold text-[#D94F3A] text-xs w-5">{ci.quantity}x</span>
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
                <span className="text-lg text-[#D94F3A] font-display">
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
            className="btn btn-forest flex-1"
          >
            <span>View this order in Owner Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={handleStartNewOrder}
            className="btn btn-ghost"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Place Another Order</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <PageHeader
        lines={['Pickup']}
        script="skip the line"
        intro="Build your bag, choose a 15-minute slot between 8am and 8pm, and walk in to 700 King West when it's ready."
        fact={{ value: '$0', label: 'pickup fee — no 30% delivery-app markup' }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
      {/* Demo Warning Banner */}
      <div className="max-w-4xl mx-auto bg-[#FDE7DA] border border-[#F7B48F] rounded-2xl p-4 flex items-center gap-3 text-xs text-[#C2461A]">
        <AlertCircle className="w-5 h-5 text-[#C2461A] shrink-0" />
        <div className="leading-relaxed">
          <strong>Interactive Sales Demo:</strong> No credit card or POS connection required. Feel free to customize quantities, select a time slot, and test the full flow on screen.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
        {/* Left Column: Bag & Quick Add */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-paper rounded-3xl p-6 sm:p-7 border-2 border-[#EED9AE] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h2 className="font-display font-bold text-xl text-stone-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#D94F3A]" />
                Your Selected Items ({cartCount})
              </h2>
              <Link href="/menu" className="text-xs font-bold text-[#D94F3A] hover:underline">
                + Add more items
              </Link>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-12 px-4">
                <p className="font-script text-3xl text-orange mb-1">nothing yet</p>
                <h3 className="font-display font-bold text-base text-stone-900">Your bag is empty</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Add one of our signature plates below to test the ordering checkout flow!
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => addItem(MENU_ITEMS[0], 1)}
                    className="px-3 py-1.5 rounded-lg bg-[#D94F3A] text-white text-xs font-bold hover:bg-[#2A1A14]"
                  >
                    + Add Lomo Saltado
                  </button>
                  <button
                    onClick={() => addItem(MENU_ITEMS[1], 1)}
                    className="px-3 py-1.5 rounded-lg bg-[#EE8A2B] text-white text-xs font-bold hover:bg-[#D4731A]"
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
                    className="p-4 rounded-2xl bg-[#FEF6DE] border border-[#EED9AE] flex gap-3 items-center"
                  >
                    <Img
                      src={ci.item.visual.imageSrc!}
                      w={140}
                      h={140}
                      alt=""
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="font-display font-bold text-sm text-stone-900 truncate">
                          {ci.item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(ci.item.id)}
                          className="text-stone-400 hover:text-[#D4731A] transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-stone-500">
                        ${ci.item.price.toFixed(2)} each • {ci.item.dietary.join(', ')}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1">
                        <div className="flex items-center gap-2 bg-paper rounded-lg border border-stone-200 p-0.5">
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

                        <span className="font-bold text-sm text-[#D94F3A]">
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
          <div className="bg-paper rounded-3xl p-5 border border-[#EED9AE] shadow-xs space-y-3">
            <h3 className="font-display font-bold text-sm text-stone-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#EE8A2B]" />
              Popular Immunity Shots & Sides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {MENU_ITEMS.filter((i) => i.category === 'juices-shots' || i.category === 'sides')
                .slice(0, 4)
                .map((dish) => (
                  <div
                    key={dish.id}
                    className="p-2.5 rounded-xl bg-[#FEF6DE] border border-stone-200 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Img src={dish.visual.imageSrc!} w={96} h={96} alt="" className="w-9 h-9 rounded-lg object-cover shrink-0" />
                      <div className="truncate">
                        <div className="text-xs font-bold text-stone-800 truncate">{dish.name}</div>
                        <div className="text-[10px] text-stone-500">${dish.price.toFixed(2)}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => addItem(dish, 1)}
                      className="px-2.5 py-1 rounded-lg bg-paper hover:bg-stone-100 border border-stone-300 text-[11px] font-bold text-stone-800 shrink-0 shadow-xs"
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
            className="bg-paper rounded-3xl p-6 sm:p-7 border-2 border-[#EED9AE] shadow-sm space-y-5"
          >
            <h3 className="font-display font-bold text-lg text-stone-900 border-b border-stone-200 pb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#D94F3A]" />
              Choose 15-Min Pickup Slot
            </h3>

            {/* Time Slot Picker */}
            <div>
              <div className="grid grid-cols-3 gap-2 max-h-52 overflow-y-auto p-1 bg-[#FEF6DE] rounded-xl border border-stone-200">
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
                          ? 'bg-forest text-paper font-bold shadow-xs'
                          : isBusy
                          ? 'bg-[#FDE7DA]/70 text-[#C2461A] border border-[#F7B48F] hover:bg-[#FDE7DA]'
                          : 'bg-paper text-stone-700 hover:bg-stone-100 border border-stone-200'
                      }`}
                    >
                      <div>{slot.time}</div>
                      {isBusy && (
                        <div className={`text-[9px] ${isSelected ? 'text-white' : 'text-[#C2461A]'}`}>
                          {slot.label || 'Rush'}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-stone-500 mt-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#D94F3A]" />
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FEF6DE] border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D94F3A]"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FEF6DE] border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D94F3A]"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FEF6DE] border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#D94F3A]"
                />
              </div>
            </div>

            {/* Price calculation */}
            <div className="bg-[#FEF6DE] p-4 rounded-2xl border border-stone-200 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-medium text-stone-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Ontario HST (13%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#D94F3A] font-semibold">
                <span>Direct Pickup Fee</span>
                <span>$0.00 (No 30% App Surcharge)</span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total (Demo)</span>
                <span className="text-xl font-display text-[#D94F3A]">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={items.length === 0}
              className="btn btn-lime w-full !py-4 !text-base"
            >
              <span>Place demo pickup order</span>
            </button>

            <p className="text-[11px] text-center text-stone-400">
              Demo order simulation for sales recording. No charges made.
            </p>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}
