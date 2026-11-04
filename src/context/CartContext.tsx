'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, MENU_ITEMS } from '@/data/mockData';

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface ConfirmedOrder {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  timeSlot: string;
  customerName: string;
  customerPhone: string;
  orderNotes?: string;
  placedAt: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, quantity?: number, notes?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  tax: number;
  total: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  selectedTimeSlot: string;
  setSelectedTimeSlot: (slot: string) => void;
  customerName: string;
  setCustomerName: (name: string) => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;
  orderNotes: string;
  setOrderNotes: (notes: string) => void;
  confirmedOrder: ConfirmedOrder | null;
  placeOrder: () => ConfirmedOrder;
  resetOrder: () => void;
  detailItem: MenuItem | null;
  openDetailModal: (item: MenuItem) => void;
  closeDetailModal: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Prepopulate cart with 1 demo item (Lomo Saltado) for video presentation readiness, or allow clean editing
  const [items, setItems] = useState<CartItem[]>(() => {
    const lomo = MENU_ITEMS.find((i) => i.id === 'lomo-saltado-plate');
    const shot = MENU_ITEMS.find((i) => i.id === 'turmeric-pepper-shot');
    if (lomo && shot) {
      return [
        { item: lomo, quantity: 1 },
        { item: shot, quantity: 1 },
      ];
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('12:30 PM');
  const [customerName, setCustomerName] = useState('J. Sample');
  const [customerPhone, setCustomerPhone] = useState('(416) 555-0199');
  const [orderNotes, setOrderNotes] = useState('Extra aji verde sauce on the side please!');
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);
  const [detailItem, setDetailItem] = useState<MenuItem | null>(null);

  const addItem = (item: MenuItem, quantity = 1, notes = '') => {
    setItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + quantity, notes: notes || ci.notes } : ci
        );
      }
      return [...prev, { item, quantity, notes }];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((acc, ci) => acc + ci.quantity, 0);
  const subtotal = items.reduce((acc, ci) => acc + ci.item.price * ci.quantity, 0);
  const tax = Math.round(subtotal * 0.13 * 100) / 100; // Ontario HST 13%
  const total = Math.round((subtotal + tax) * 100) / 100;

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openDetailModal = (item: MenuItem) => setDetailItem(item);
  const closeDetailModal = () => setDetailItem(null);

  const placeOrder = (): ConfirmedOrder => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: ConfirmedOrder = {
      id: `#OK-${randomSuffix}`,
      items: [...items],
      subtotal,
      tax,
      total,
      timeSlot: selectedTimeSlot,
      customerName: customerName || 'Valued Guest',
      customerPhone: customerPhone || '(416) 555-0199',
      orderNotes,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setConfirmedOrder(newOrder);
    setItems([]);
    setIsCartOpen(false);
    return newOrder;
  };

  const resetOrder = () => {
    setConfirmedOrder(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        tax,
        total,
        isCartOpen,
        openCart,
        closeCart,
        selectedTimeSlot,
        setSelectedTimeSlot,
        customerName,
        setCustomerName,
        customerPhone,
        setCustomerPhone,
        orderNotes,
        setOrderNotes,
        confirmedOrder,
        placeOrder,
        resetOrder,
        detailItem,
        openDetailModal,
        closeDetailModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
