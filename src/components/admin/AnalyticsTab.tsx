'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  BarChart3,
  TrendingUp,
  MapPin,
  Smartphone,
  Monitor,
  Eye,
  RefreshCw,
  PhoneCall,
  MessageSquare,
  Mail,
  Send,
  Clock,
  Layers
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ClickEventItem {
  id: string;
  type: 'whatsapp' | 'call' | 'quote' | 'lead' | 'custom';
  label: string;
  target?: string;
  page: string;
  device: string;
  createdAt: string;
}

interface AnalyticsData {
  totalViews: number;
  todayViews: number;
  topPages: { url: string; views: number; service?: string }[];
  topAreas: { area: string; views: number }[];
  topCities: { city: string; views: number }[];
  clicks?: {
    whatsapp: { today: number; total: number };
    calls: { today: number; total: number };
    enquiries: { today: number; total: number };
    topPages: { page: string; total: number; whatsapp: number; calls: number }[];
    sources: { label: string; type: string; count: number }[];
    devices: { device: string; count: number }[];
    recent: ClickEventItem[];
  };
}

export default function AnalyticsTab() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sendingReport, setSendingReport] = useState(false);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/analytics');
      const j = await res.json();
      if (j.success) {
        setData(j.data);
      } else {
        toast.error('Failed to load analytics.');
      }
    } catch {
      toast.error('Network error loading analytics.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSendDailyReport = async () => {
    setSendingReport(true);
    try {
      const res = await fetch('/api/analytics-report?force=true', { method: 'POST' });
      const j = await res.json();
      if (j.success) {
        toast.success(j.message || 'Daily report email sent successfully!');
      } else {
        toast.error(j.error || 'Failed to send daily report.');
      }
    } catch {
      toast.error('Failed to send report. Please check server logs.');
    } finally {
      setSendingReport(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) {
    return (
      <div className="card p-12 flex items-center justify-center gap-3 text-slate-400">
        <span className="w-5 h-5 border-2 rounded-full animate-spin1" style={{ borderColor: '#1E2D45', borderTopColor: '#F97316' }} />
        Loading click & conversion analytics...
      </div>
    );
  }

  if (!data) return null;

  const clicks = data.clicks || {
    whatsapp: { today: 0, total: 0 },
    calls: { today: 0, total: 0 },
    enquiries: { today: 0, total: 0 },
    topPages: [],
    sources: [],
    devices: [],
    recent: [],
  };

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex items-center justify-between flex-wrap gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="font-display text-2xl text-white font-bold flex items-center gap-2">
            📊 Conversion & Click Analytics
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time tracking for WhatsApp clicks, Phone calls, and Form submissions (Zero ISR Impact)
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSendDailyReport}
            disabled={sendingReport}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] flex items-center gap-2"
          >
            <Send size={13} />
            {sendingReport ? 'Sending Report...' : '📧 Send Daily Report (Email)'}
          </button>
          <button
            onClick={fetchAnalytics}
            className="btn-ghost text-xs px-4 py-2.5 flex items-center gap-1.5 rounded-xl border border-slate-700 hover:bg-slate-800"
          >
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
      </div>

      {/* Top 3 High-Impact Cards: WhatsApp, Calls, Leads */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* WhatsApp Card */}
        <div
          className="card p-6 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(37,211,102,0.12), rgba(15,23,42,0.8))',
            borderLeft: '4px solid #25D366',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-300 text-sm font-semibold flex items-center gap-2">
              <MessageSquare size={18} className="text-[#25D366]" /> WhatsApp Clicks
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-[#25D366]">
              Real-time
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <div className="text-4xl font-display font-extrabold text-white">
              {clicks.whatsapp.today}
            </div>
            <span className="text-xs text-emerald-400 font-medium">today</span>
          </div>
          <div className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-800/80 flex justify-between">
            <span>Last 30 days:</span>
            <span className="font-mono font-bold text-white">{clicks.whatsapp.total} clicks</span>
          </div>
        </div>

        {/* Call Clicks Card */}
        <div
          className="card p-6 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(249,115,22,0.12), rgba(15,23,42,0.8))',
            borderLeft: '4px solid #F97316',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-300 text-sm font-semibold flex items-center gap-2">
              <PhoneCall size={18} className="text-[#F97316]" /> Phone Call Clicks
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-[#F97316]">
              Real-time
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <div className="text-4xl font-display font-extrabold text-white">
              {clicks.calls.today}
            </div>
            <span className="text-xs text-orange-400 font-medium">today</span>
          </div>
          <div className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-800/80 flex justify-between">
            <span>Last 30 days:</span>
            <span className="font-mono font-bold text-white">{clicks.calls.total} clicks</span>
          </div>
        </div>

        {/* Website Form Leads Card */}
        <div
          className="card p-6 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(15,23,42,0.8))',
            borderLeft: '4px solid #3B82F6',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-300 text-sm font-semibold flex items-center gap-2">
              <Mail size={18} className="text-[#3B82F6]" /> Form Leads Received
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-[#3B82F6]">
              Verified
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <div className="text-4xl font-display font-extrabold text-white">
              {clicks.enquiries.today}
            </div>
            <span className="text-xs text-blue-400 font-medium">today</span>
          </div>
          <div className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-800/80 flex justify-between">
            <span>All-time enquiries:</span>
            <span className="font-mono font-bold text-white">{clicks.enquiries.total} leads</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Top Pages & Placements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Click-Generating Pages */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Eye size={16} className="text-orange-400" /> Top Pages Generating Clicks
            </h3>
            <span className="text-xs text-slate-400">Where clients take action</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-800">
                  <th className="pb-3 font-medium">Page URL</th>
                  <th className="pb-3 font-medium text-center">💬 WhatsApp</th>
                  <th className="pb-3 font-medium text-center">📞 Calls</th>
                  <th className="pb-3 font-medium text-right">Total Clicks</th>
                </tr>
              </thead>
              <tbody>
                {clicks.topPages.map((page, i) => (
                  <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 pr-4">
                      <a href={page.page} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-orange-400 truncate block max-w-[280px] font-mono text-xs">
                        {page.page === '/' ? '/ (Home)' : page.page}
                      </a>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-[#25D366]">
                        {page.whatsapp}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-500/15 text-[#F97316]">
                        {page.calls}
                      </span>
                    </td>
                    <td className="py-3 text-right font-mono text-white font-bold">
                      {page.total}
                    </td>
                  </tr>
                ))}
                {clicks.topPages.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">
                      No clicks recorded yet. Try clicking the WhatsApp or Call button on the site!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Click Sources / Buttons */}
        <div className="flex flex-col gap-6">
          <div className="card p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Layers size={16} className="text-blue-400" /> Button Placements
            </h3>
            <div className="space-y-3">
              {clicks.sources.map((source, i) => (
                <div key={i} className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-slate-800/50 border border-slate-800">
                  <span className="text-slate-300 capitalize">
                    {source.label.replace(/_/g, ' ')}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${source.type === 'whatsapp' ? 'bg-emerald-500/20 text-[#25D366]' : 'bg-orange-500/20 text-[#F97316]'}`}>
                      {source.type}
                    </span>
                    <span className="font-mono font-bold text-white">{source.count}</span>
                  </div>
                </div>
              ))}
              {clicks.sources.length === 0 && (
                <p className="text-slate-500 text-xs text-center py-4">No button clicks logged yet.</p>
              )}
            </div>
          </div>

          {/* Device Split */}
          <div className="card p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Smartphone size={16} className="text-purple-400" /> Device Breakdown
            </h3>
            <div className="space-y-3">
              {clicks.devices.map((device, i) => (
                <div key={i} className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-slate-800/50">
                  <span className="text-slate-300 capitalize flex items-center gap-1.5">
                    {device.device === 'mobile' ? <Smartphone size={13}/> : <Monitor size={13}/>}
                    {device.device}
                  </span>
                  <span className="font-mono font-bold text-purple-400">{device.count} clicks</span>
                </div>
              ))}
              {clicks.devices.length === 0 && (
                <p className="text-slate-500 text-xs text-center py-2">No device data yet.</p>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Recent Clicks Activity Feed (Live proof of tracking) */}
      <div className="card p-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Clock size={16} className="text-emerald-400" /> Live Click Activity Log
          </h3>
          <span className="text-xs text-slate-500">Last 20 customer actions</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-800">
                <th className="pb-3 font-medium">Time (IST)</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Button / Placement</th>
                <th className="pb-3 font-medium">Page</th>
                <th className="pb-3 font-medium text-right">Device</th>
              </tr>
            </thead>
            <tbody>
              {clicks.recent.map((item, i) => {
                const dateObj = new Date(item.createdAt);
                const timeStr = dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                const dateStr = dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
                return (
                  <tr key={item.id || i} className="border-b border-slate-800/40 hover:bg-slate-800/20">
                    <td className="py-2.5 text-slate-400 font-mono whitespace-nowrap">
                      {dateStr}, {timeStr}
                    </td>
                    <td className="py-2.5">
                      {item.type === 'whatsapp' ? (
                        <span className="font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-[#25D366]">
                          💬 WhatsApp
                        </span>
                      ) : item.type === 'call' ? (
                        <span className="font-bold px-2 py-0.5 rounded bg-orange-500/20 text-[#F97316]">
                          📞 Call
                        </span>
                      ) : (
                        <span className="font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
                          {item.type}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 text-slate-300 capitalize font-medium">
                      {item.label.replace(/_/g, ' ')}
                    </td>
                    <td className="py-2.5 text-slate-400 font-mono">
                      {item.page}
                    </td>
                    <td className="py-2.5 text-right text-slate-400 capitalize">
                      {item.device}
                    </td>
                  </tr>
                );
              })}
              {clicks.recent.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No recent clicks. As soon as a user clicks WhatsApp or Call, it will instantly appear here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
