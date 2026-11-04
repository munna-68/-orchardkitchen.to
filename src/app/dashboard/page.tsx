'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DASHBOARD_METRICS, STORE_INFO, MENU_ITEMS } from '@/data/mockData';
import {
  TrendingUp,
  Instagram,
  Eye,
  ShoppingBag,
  Mail,
  DollarSign,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  Filter,
  BarChart3,
  Users,
  Utensils,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'orders' | 'audience'>('overview');
  const [recentOrders, setRecentOrders] = useState(DASHBOARD_METRICS.recentOrders);
  const [countedValues, setCountedValues] = useState({
    igVisits: 0,
    menuViews: 0,
    ordersToday: 0,
    emailSignups: 0,
    revenue: 0,
  });

  // Smooth restrained count-up animation for stats on screen recording
  useEffect(() => {
    const target = {
      igVisits: DASHBOARD_METRICS.stats.visitsFromInstagram.value,
      menuViews: DASHBOARD_METRICS.stats.menuViews.value,
      ordersToday: DASHBOARD_METRICS.stats.pickupOrdersToday.value,
      emailSignups: DASHBOARD_METRICS.stats.emailSignups.value,
      revenue: 1084,
    };

    const duration = 1000;
    const steps = 30;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const factor = Math.min(1, step / steps);
      // ease-out cubic
      const progress = 1 - Math.pow(1 - factor, 3);

      setCountedValues({
        igVisits: Math.round(target.igVisits * progress),
        menuViews: Math.round(target.menuViews * progress),
        ordersToday: Math.round(target.ordersToday * progress),
        emailSignups: Math.round(target.emailSignups * progress),
        revenue: Math.round(target.revenue * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setRecentOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: newStatus,
              statusColor:
                newStatus === 'Ready for Pickup'
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : newStatus === 'Preparing in Kitchen'
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-stone-100 text-stone-700 border-stone-300',
            }
          : o
      )
    );
  };

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Top Banner: Sales Narrative & Demo Disclaimer */}
      <div className="bg-[#1E1B18] text-white rounded-3xl p-5 sm:p-6 shadow-md border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E54F38] text-white">
              Restaurant Owner View
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-amber-400 text-stone-900 font-bold">
              Demo Data
            </span>
            <span className="text-xs text-stone-400">@orchardkitchen.to (700 King W)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-stone-100">
            Instagram-to-Pickup Command Center
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
            Watch how Instagram comments of &quot;menu&quot; turn directly into high-margin pickup orders on your own domain without losing 30% to delivery platforms.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/order"
            className="px-4 py-2.5 rounded-xl bg-white text-stone-900 font-bold text-xs hover:bg-stone-100 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>Test Customer Flow</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Layout: Sidebar Nav + Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 bg-white rounded-3xl p-4 border-2 border-[#E8E0D2] shadow-xs space-y-2">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-stone-400">
            Command Views
          </div>
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-bold transition-all text-left ${
              activeTab === 'overview'
                ? 'bg-[#FAF2E6] text-[#E54F38] shadow-xs'
                : 'text-stone-700 hover:bg-[#FAF7F2]'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-[#E54F38]" />
            <span>Overview & Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-bold transition-all text-left ${
              activeTab === 'orders'
                ? 'bg-[#FAF2E6] text-[#E54F38] shadow-xs'
                : 'text-stone-700 hover:bg-[#FAF7F2]'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-4 h-4 text-[#E88544]" />
              <span>Orders & Pickup Queue</span>
            </div>
            <span className="w-5 h-5 rounded-full bg-[#E54F38] text-white text-[10px] flex items-center justify-center font-bold">
              {recentOrders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('audience')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-bold transition-all text-left ${
              activeTab === 'audience'
                ? 'bg-[#FAF2E6] text-[#E54F38] shadow-xs'
                : 'text-stone-700 hover:bg-[#FAF7F2]'
            }`}
          >
            <Instagram className="w-4 h-4 text-[#E54F38]" />
            <span>Comment-to-Link (IG)</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-bold transition-all text-left ${
              activeTab === 'menu'
                ? 'bg-[#FAF2E6] text-[#E54F38] shadow-xs'
                : 'text-stone-700 hover:bg-[#FAF7F2]'
            }`}
          >
            <Utensils className="w-4 h-4 text-[#547243]" />
            <span>Menu & Transparency</span>
          </button>

          {/* Quick Highlight Box */}
          <div className="pt-4 mt-2 border-t border-stone-200 px-3 pb-2 space-y-2">
            <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              💰 <strong className="text-emerald-900">$325.35 Saved Today</strong>
              <div className="text-[10px] text-stone-600 mt-0.5">
                Saved by receiving 38 pickup orders direct vs paying 30% delivery aggregator fees.
              </div>
            </div>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="lg:col-span-9 space-y-6">
          {/* ================= VIEW 1: OVERVIEW ================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards Grid (Realistic for 2.1K IG follower restaurant) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {/* Stat 1: IG Visits */}
                <div className="bg-white p-4 rounded-2xl border-2 border-[#E8E0D2] shadow-xs">
                  <div className="flex items-center justify-between text-stone-500 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider">IG Visits</span>
                    <Instagram className="w-4 h-4 text-[#E54F38]" />
                  </div>
                  <div className="text-2xl font-display font-extrabold text-stone-900">
                    {countedValues.igVisits}
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600">
                    +18.4% this week
                  </span>
                </div>

                {/* Stat 2: Menu Views */}
                <div className="bg-white p-4 rounded-2xl border-2 border-[#E8E0D2] shadow-xs">
                  <div className="flex items-center justify-between text-stone-500 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Menu Views</span>
                    <Eye className="w-4 h-4 text-[#E88544]" />
                  </div>
                  <div className="text-2xl font-display font-extrabold text-stone-900">
                    {countedValues.menuViews}
                  </div>
                  <span className="text-[10px] font-medium text-stone-500">
                    70.7% conversion
                  </span>
                </div>

                {/* Stat 3: Pickup Orders Today */}
                <div className="bg-white p-4 rounded-2xl border-2 border-[#E8E0D2] shadow-xs">
                  <div className="flex items-center justify-between text-stone-500 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Pickup Orders</span>
                    <ShoppingBag className="w-4 h-4 text-[#547243]" />
                  </div>
                  <div className="text-2xl font-display font-extrabold text-stone-900">
                    {countedValues.ordersToday}
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600">
                    38 orders today
                  </span>
                </div>

                {/* Stat 4: Revenue Today (Demo) */}
                <div className="bg-white p-4 rounded-2xl border-2 border-[#E8E0D2] shadow-xs">
                  <div className="flex items-center justify-between text-stone-500 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Revenue (Demo)</span>
                    <DollarSign className="w-4 h-4 text-[#E54F38]" />
                  </div>
                  <div className="text-2xl font-display font-extrabold text-[#E54F38]">
                    ${countedValues.revenue}
                  </div>
                  <span className="text-[10px] font-medium text-stone-500">
                    $28.54 avg order
                  </span>
                </div>

                {/* Stat 5: Email Signups */}
                <div className="bg-white p-4 rounded-2xl border-2 border-[#E8E0D2] shadow-xs col-span-2 sm:col-span-1">
                  <div className="flex items-center justify-between text-stone-500 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Email List</span>
                    <Mail className="w-4 h-4 text-stone-600" />
                  </div>
                  <div className="text-2xl font-display font-extrabold text-stone-900">
                    {countedValues.emailSignups}
                  </div>
                  <span className="text-[10px] font-medium text-stone-500">
                    342 total King W
                  </span>
                </div>
              </div>

              {/* Weekly Orders Chart with Lunch & Dinner Spikes */}
              <div className="bg-white rounded-3xl p-6 border-2 border-[#E8E0D2] shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display font-bold text-lg text-stone-900">
                      Weekly Pickup Orders Distribution
                    </h3>
                    <p className="text-xs text-stone-500">
                      Peak volumes at Lunch (11:45 AM – 1:30 PM) & Dinner (5:30 PM – 7:00 PM)
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-[#E54F38]" />
                      Lunch Rush
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-[#E88544]" />
                      Dinner Rush
                    </span>
                  </div>
                </div>

                {/* Responsive CSS Bar Chart */}
                <div className="pt-4 grid grid-cols-7 gap-2 sm:gap-4 items-end h-56 border-b border-stone-200 pb-2">
                  {DASHBOARD_METRICS.weeklyVolume.map((col) => {
                    // Maximum total is ~50 orders
                    const maxScale = 55;
                    const lunchHeight = (col.lunch / maxScale) * 100;
                    const dinnerHeight = (col.dinner / maxScale) * 100;

                    return (
                      <div key={col.day} className="flex flex-col items-center h-full justify-end group">
                        {/* Order count tooltip on hover */}
                        <div className="text-[10px] font-bold text-stone-700 opacity-80 group-hover:opacity-100 mb-1">
                          {col.total}
                        </div>
                        {/* Stacked bar */}
                        <div className="w-full max-w-[42px] flex flex-col justify-end rounded-t-lg overflow-hidden bg-stone-100">
                          <div
                            style={{ height: `${dinnerHeight}%` }}
                            className="w-full bg-[#E88544] hover:bg-[#d07335] transition-all"
                            title={`${col.day} Dinner: ${col.dinner} orders`}
                          />
                          <div
                            style={{ height: `${lunchHeight}%` }}
                            className="w-full bg-[#E54F38] hover:bg-[#CF3F29] transition-all border-t border-white/20"
                            title={`${col.day} Lunch: ${col.lunch} orders`}
                          />
                        </div>
                        <div className="text-xs font-bold text-stone-600 mt-2">{col.day}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center text-xs text-stone-500 pt-1">
                  <span>Monday (Quiet day)</span>
                  <span className="font-semibold text-stone-800">Friday Peak: 49 pickup orders</span>
                  <span>Sunday (Brunch rush)</span>
                </div>
              </div>

              {/* Two Column Layout: Top Items & Recent Orders preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Top Items List */}
                <div className="lg:col-span-5 bg-white rounded-3xl p-6 border-2 border-[#E8E0D2] shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <h3 className="font-display font-bold text-base text-stone-900">
                      Top Dishes Today
                    </h3>
                    <span className="text-xs font-bold text-[#E54F38]">38 Orders</span>
                  </div>

                  <div className="space-y-3">
                    {DASHBOARD_METRICS.topItems.map((item, idx) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#FAF7F2] border border-stone-200"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold font-mono text-stone-400 w-4">
                            #{idx + 1}
                          </span>
                          <div>
                            <div className="font-bold text-stone-900">{item.name}</div>
                            <span className="text-[10px] text-stone-500">{item.tag}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-stone-900">{item.count} orders</span>
                          <span className="block text-[10px] text-stone-500">{item.revenue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comment-to-Link Spotlight */}
                <div className="lg:col-span-7 bg-[#FAF2E6] rounded-3xl p-6 border-2 border-[#E8DEC8] shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8DEC8]">
                    <div className="flex items-center gap-2">
                      <Instagram className="w-5 h-5 text-[#E54F38]" />
                      <h3 className="font-display font-bold text-base text-stone-900">
                        Top Converting Instagram Reel
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('audience')}
                      className="text-xs font-bold text-[#E54F38] hover:underline"
                    >
                      View All Reels →
                    </button>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-3">
                    <div className="text-xs font-bold text-stone-900">
                      &ldquo;What&apos;s in our Lomo Saltado? 🥩 (Zero Seed Oils)&rdquo;
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-xl bg-[#FAF7F2]">
                        <span className="text-[10px] text-stone-500 block">Reel Views</span>
                        <strong className="text-base text-stone-900 font-display">18.4k</strong>
                      </div>
                      <div className="p-2 rounded-xl bg-amber-50 border border-amber-200">
                        <span className="text-[10px] text-amber-800 block">&quot;menu&quot; Comments</span>
                        <strong className="text-base text-amber-900 font-display">142</strong>
                      </div>
                      <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                        <span className="text-[10px] text-emerald-800 block">Direct Orders</span>
                        <strong className="text-base text-emerald-900 font-display">44</strong>
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      Generated <strong>$1,254.00 demo revenue</strong> directly through the link sent to their Instagram DM. 34.3% of commenters converted to a pickup order.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 2: ORDERS QUEUE ================= */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-3xl p-6 border-2 border-[#E8E0D2] shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
                <div>
                  <h3 className="font-display font-bold text-xl text-stone-900">
                    Live Pickup Queue (Today)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Express pickup orders for 700 King West • Hand off at counter
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-bold">
                    Kitchen Active
                  </span>
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse min-w-[640px]">
                  <thead>
                    <tr className="border-b border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-500">
                      <th className="py-3 px-3">Order #</th>
                      <th className="py-3 px-3">Customer</th>
                      <th className="py-3 px-3">Pickup Slot</th>
                      <th className="py-3 px-3">Items</th>
                      <th className="py-3 px-3">Total</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-xs text-[#E54F38]">
                          {order.id}
                        </td>
                        <td className="py-3 px-3 font-semibold text-stone-900">
                          {order.customerName}
                        </td>
                        <td className="py-3 px-3 text-xs font-bold text-stone-800">
                          <span className="inline-flex items-center gap-1 bg-[#FAF7F2] px-2 py-0.5 rounded border border-stone-200">
                            <Clock className="w-3 h-3 text-[#E88544]" />
                            {order.pickupTime}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-xs text-stone-600 max-w-xs truncate">
                          {order.items}
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-xs text-stone-900">
                          {order.total}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${order.statusColor}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() =>
                              handleUpdateOrderStatus(
                                order.id,
                                order.status === 'Ready for Pickup'
                                  ? 'Completed'
                                  : 'Ready for Pickup'
                              )
                            }
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-stone-300 hover:bg-stone-100 transition-colors"
                          >
                            Toggle Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-2 text-xs text-stone-500 italic">
                *Demo customer names used for confidentiality. Status toggle updates in real-time.
              </div>
            </div>
          )}

          {/* ================= VIEW 3: AUDIENCE & COMMENT CAMPAIGNS ================= */}
          {activeTab === 'audience' && (
            <div className="bg-white rounded-3xl p-6 border-2 border-[#E8E0D2] shadow-xs space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <Instagram className="w-5 h-5 text-[#E54F38]" />
                  <h3 className="font-display font-bold text-xl text-stone-900">
                    Comment-to-Link Campaign Performance
                  </h3>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  How Instagram visitors to @orchardkitchen.to turn into direct pickup customers.
                </p>
              </div>

              {/* Campaign Cards */}
              <div className="space-y-4">
                {DASHBOARD_METRICS.commentCampaigns.map((camp, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D2] space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                          Instagram Reel #{idx + 1}
                        </span>
                        <h4 className="font-display font-bold text-base text-stone-900">
                          {camp.reelTitle}
                        </h4>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 w-fit">
                        {camp.conversionRate} Conversion
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                      <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                        <span className="text-[10px] text-stone-400 block">Total Views</span>
                        <strong className="text-sm font-bold text-stone-900">{camp.views}</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                        <span className="text-[10px] text-stone-400 block">&quot;menu&quot; Comments</span>
                        <strong className="text-sm font-bold text-stone-900">{camp.comments}</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                        <span className="text-[10px] text-stone-400 block">Links Sent (DM)</span>
                        <strong className="text-sm font-bold text-stone-900">{camp.linksSent}</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                        <span className="text-[10px] text-stone-400 block">Pickup Orders</span>
                        <strong className="text-sm font-bold text-[#E54F38]">{camp.ordersPlaced}</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-stone-200 col-span-2 sm:col-span-1">
                        <span className="text-[10px] text-stone-400 block">Revenue</span>
                        <strong className="text-sm font-bold text-emerald-700 font-mono">
                          {camp.revenueGenerated}
                        </strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Callout box for sales pitch */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <strong>Why this converts:</strong> Instead of sending commenters to a generic Linktree with 6 broken links, the automation sends one bespoke link with the dish they just watched, full ingredient transparency, and instant 15-minute pickup checkout.
              </div>
            </div>
          )}

          {/* ================= VIEW 4: MENU & TRANSPARENCY ================= */}
          {activeTab === 'menu' && (
            <div className="bg-white rounded-3xl p-6 border-2 border-[#E8E0D2] shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <h3 className="font-display font-bold text-xl text-stone-900">
                    Menu & Transparency Compliance
                  </h3>
                  <p className="text-xs text-stone-500">
                    Live check on all 14 dishes: 100% seed-oil free verification & in-house prep logs
                  </p>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-300">
                  14/14 Disclosed
                </span>
              </div>

              <div className="space-y-3">
                {MENU_ITEMS.map((dish) => (
                  <div
                    key={dish.id}
                    className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{dish.visual.accentEmoji}</span>
                      <div>
                        <div className="font-bold text-stone-900 text-sm">{dish.name}</div>
                        <div className="text-stone-500 text-[11px]">
                          {dish.categoryLabel} • {dish.calories} • {dish.prepTime}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                        ✓ 0 Seed Oils
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white text-stone-700 border border-stone-200 text-[10px] font-bold">
                        ${dish.price.toFixed(2)}
                      </span>
                      <Link
                        href="/menu"
                        className="px-2.5 py-1 rounded bg-[#E54F38] text-white font-bold text-[10px] hover:bg-[#CF3F29]"
                      >
                        Preview Label
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
