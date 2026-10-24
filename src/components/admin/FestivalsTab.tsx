// src/components/admin/FestivalsTab.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Sparkles, Plus, Pencil, Trash2, RefreshCw, Calendar, Eye,
  CheckCircle, XCircle, Clock, Upload, AlertCircle, X, ExternalLink
} from 'lucide-react';
import toast from 'react-hot-toast';

export interface FestivalCampaign {
  id: string;
  title: string;
  sanskritTag?: string;
  message?: string;
  posterImage: string;
  startDate: string;
  endDate: string;
  ctaText?: string;
  ctaLink?: string;
  whatsappMessage?: string;
  isActive: boolean;
  createdAt?: string;
}

export default function FestivalsTab() {
  const [campaigns, setCampaigns] = useState<FestivalCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<FestivalCampaign | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [sanskritTag, setSanskritTag] = useState('');
  const [message, setMessage] = useState('');
  const [posterImage, setPosterImage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [ctaText, setCtaText] = useState('Claim Free Quotation & Site Visit');
  const [ctaLink, setCtaLink] = useState('/free-consultation');
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/festivals');
      const j = await res.json();
      if (j.success) {
        setCampaigns(j.data || []);
      } else {
        toast.error('Failed to load festival campaigns.');
      }
    } catch {
      toast.error('Network error loading festival campaigns.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  // Today string for comparison (YYYY-MM-DD)
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;

  // Find currently active live campaign
  const currentLive = campaigns.find(
    c => c.isActive && c.startDate <= todayStr && c.endDate >= todayStr
  );

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle('Happy Diwali & Happy Chhath Puja');
    setSanskritTag('॥ शुभ दीपावली एवं महापर्व छठ पूजा महोत्सव ॥');
    setMessage('AMS Civil Construction brings Special FREE QUOTATION OFFER for your home construction, renovation & interior needs this festive season!');
    setPosterImage('/diwali-chhath-offer.jpg');
    setStartDate(todayStr);
    setEndDate(`${yyyy}-11-18`);
    setCtaText('Claim Free Quotation & Site Visit');
    setCtaLink('/free-consultation');
    setWhatsappMessage(
      '🪔 Happy Diwali & Happy Chhath Puja! ✨\n\n' +
      'AMS Civil Construction is offering a Special FREE QUOTATION for Bungalow Construction, Home Renovation, Modular Kitchen, Bathroom Remodeling & Civil Work!\n\n' +
      '📞 Call/WhatsApp: +91 87793 91690 / +91 90042 98911\n' +
      '🌐 Website: https://www.amscivilwork.in/free-consultation'
    );
    setIsActive(true);
    setShowModal(true);
  };

  const openEditModal = (c: FestivalCampaign) => {
    setEditingItem(c);
    setTitle(c.title || '');
    setSanskritTag(c.sanskritTag || '');
    setMessage(c.message || '');
    setPosterImage(c.posterImage || '');
    setStartDate(c.startDate || todayStr);
    setEndDate(c.endDate || todayStr);
    setCtaText(c.ctaText || 'Claim Free Quotation & Site Visit');
    setCtaLink(c.ctaLink || '/free-consultation');
    setWhatsappMessage(c.whatsappMessage || '');
    setIsActive(c.isActive !== false);
    setShowModal(true);
  };

  // Image Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be under 5MB.');
      return;
    }

    const tid = toast.loading('Uploading poster image to Cloudinary...');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success && data.url) {
        setPosterImage(data.url);
        toast.success('Poster uploaded successfully!', { id: tid });
      } else {
        toast.error(data.error || 'Upload failed.', { id: tid });
      }
    } catch {
      toast.error('Network error during image upload.', { id: tid });
    } finally {
      setUploading(false);
    }
  };

  // Submit Save
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Please enter a campaign title.');
      return;
    }
    if (!posterImage.trim()) {
      toast.error('Please upload or provide a poster image URL.');
      return;
    }
    if (!startDate || !endDate) {
      toast.error('Please select both Start Date and End Date.');
      return;
    }
    if (startDate > endDate) {
      toast.error('Start Date cannot be after End Date.');
      return;
    }

    setSaving(true);
    const tid = toast.loading(editingItem ? 'Updating campaign...' : 'Creating campaign...');

    const payload = {
      title,
      sanskritTag,
      message,
      posterImage,
      startDate,
      endDate,
      ctaText,
      ctaLink,
      whatsappMessage,
      isActive,
    };

    try {
      const url = editingItem ? `/api/festivals/${editingItem.id}` : '/api/festivals';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(editingItem ? 'Campaign updated!' : 'Campaign created successfully!', { id: tid });
        setShowModal(false);
        fetchCampaigns();
      } else {
        toast.error(data.error || 'Operation failed.', { id: tid });
      }
    } catch {
      toast.error('Network error saving campaign.', { id: tid });
    } finally {
      setSaving(false);
    }
  };

  // Quick Toggle Active State
  const toggleActive = async (c: FestivalCampaign) => {
    const updatedStatus = !c.isActive;
    const tid = toast.loading(`Turning ${updatedStatus ? 'ON' : 'OFF'}...`);
    try {
      const res = await fetch(`/api/festivals/${c.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: updatedStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setCampaigns(prev =>
          prev.map(item => (item.id === c.id ? { ...item, isActive: updatedStatus } : item))
        );
        toast.success(`Campaign ${updatedStatus ? 'Activated' : 'Paused'}!`, { id: tid });
      } else {
        toast.error(data.error || 'Failed to toggle status.', { id: tid });
      }
    } catch {
      toast.error('Network error.', { id: tid });
    }
  };

  // Delete Campaign
  const handleDelete = async (c: FestivalCampaign) => {
    if (!confirm(`Are you sure you want to delete campaign "${c.title}"?`)) return;

    const tid = toast.loading('Deleting campaign...');
    try {
      const res = await fetch(`/api/festivals/${c.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setCampaigns(prev => prev.filter(item => item.id !== c.id));
        toast.success('Campaign deleted.', { id: tid });
      } else {
        toast.error(data.error || 'Delete failed.', { id: tid });
      }
    } catch {
      toast.error('Network error.', { id: tid });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex items-center justify-between flex-wrap gap-4 p-6 rounded-2xl bg-[#101827] border border-[#1E2D45] shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles size={22} className="text-amber-400" />
            <span>Festival & Promotional Popups</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Post custom festival banners with date ranges. If no custom banner is set or date expires, the website automatically falls back to built-in holiday wishes!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchCampaigns}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-xl bg-[#161F2E] text-slate-300 hover:text-white border border-[#1E2D45] hover:border-slate-500 transition-colors"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-md hover:shadow-lg transition-all"
          >
            <Plus size={15} />
            <span>New Festival Banner</span>
          </button>
        </div>
      </div>

      {/* Live Status Banner */}
      <div
        className={`p-4 rounded-xl border flex items-center justify-between flex-wrap gap-3 text-xs ${
          currentLive
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
            : 'bg-blue-500/10 border-blue-500/30 text-blue-200'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                currentLive ? 'bg-amber-400' : 'bg-blue-400'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                currentLive ? 'bg-amber-500' : 'bg-blue-500'
              }`}
            />
          </span>
          <div>
            <span className="font-bold text-white">Current Website Popup Status: </span>
            {currentLive ? (
              <span>
                Live Custom Banner Active: <strong>&ldquo;{currentLive.title}&rdquo;</strong> (From {currentLive.startDate} to {currentLive.endDate})
              </span>
            ) : (
              <span>
                <strong>Auto Holiday Mode Active:</strong> Website is using built-in festival calendar fallback wishes.
              </span>
            )}
          </div>
        </div>

        {currentLive && (
          <button
            onClick={() => setPreviewImage(currentLive.posterImage)}
            className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Eye size={12} />
            <span>View Live Poster</span>
          </button>
        )}
      </div>

      {/* Campaigns List */}
      <div className="bg-[#101827] border border-[#1E2D45] rounded-2xl p-6 shadow-lg">
        <h3 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
          <span>All Scheduled Festival Posters</span>
          <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
            {campaigns.length}
          </span>
        </h3>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400 text-xs">
            <span className="w-7 h-7 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mb-3" />
            <span>Loading festival campaigns...</span>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm">
            <AlertCircle size={32} className="mx-auto mb-2 text-slate-600" />
            <p>No festival campaigns created yet.</p>
            <button
              onClick={openCreateModal}
              className="mt-3 text-xs text-orange-400 underline hover:text-orange-300"
            >
              Click here to add your first festival poster
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {campaigns.map(c => {
              const isLive = c.isActive && c.startDate <= todayStr && c.endDate >= todayStr;
              const isUpcoming = c.isActive && c.startDate > todayStr;
              const isExpired = c.endDate < todayStr;

              return (
                <div
                  key={c.id}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                    isLive
                      ? 'bg-amber-950/20 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.1)]'
                      : 'bg-[#161F2E] border-[#1E2D45] hover:border-slate-600'
                  }`}
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Thumbnail */}
                    <div
                      onClick={() => setPreviewImage(c.posterImage)}
                      className="relative w-16 h-16 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-amber-500/30 cursor-pointer group"
                    >
                      <img
                        src={c.posterImage}
                        alt={c.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Eye size={14} className="text-white" />
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-white text-sm truncate">{c.title}</h4>
                        {/* Status Badges */}
                        {isLive && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Live on Site
                          </span>
                        )}
                        {isUpcoming && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                            <Clock size={10} />
                            Upcoming
                          </span>
                        )}
                        {isExpired && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-700 text-slate-400">
                            Expired
                          </span>
                        )}
                        {!c.isActive && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            Disabled
                          </span>
                        )}
                      </div>

                      {c.sanskritTag && (
                        <p className="text-[11px] text-amber-300/80 font-serif mt-0.5">{c.sanskritTag}</p>
                      )}

                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} className="text-orange-400" />
                          <span>{c.startDate} to {c.endDate}</span>
                        </span>
                        {c.ctaText && (
                          <span className="text-slate-500 hidden md:inline">
                            CTA: {c.ctaText}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Toggle Switch & Actions */}
                  <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-center">
                    {/* Active Toggle Switch */}
                    <button
                      onClick={() => toggleActive(c)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                        c.isActive
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/25'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      {c.isActive ? <CheckCircle size={13} /> : <XCircle size={13} />}
                      <span>{c.isActive ? 'Active' : 'Paused'}</span>
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => openEditModal(c)}
                      className="p-2 rounded-lg bg-[#1F2937] hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Edit Campaign"
                    >
                      <Pencil size={14} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(c)}
                      className="p-2 rounded-lg bg-[#1F2937] hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 transition-colors"
                      title="Delete Campaign"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal: Add / Edit Campaign */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-[#101827] border border-[#1E2D45] rounded-3xl p-6 shadow-2xl my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1E2D45] mb-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles size={18} className="text-amber-400" />
                <span>{editingItem ? 'Edit Festival Banner' : 'Create New Festival Banner'}</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-4">
              {/* Campaign Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Campaign / Festival Title <span className="text-orange-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Happy Diwali & Happy Chhath Puja"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161F2E] border border-[#1E2D45] text-white text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Sanskrit Tag / Subtitle */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Sacred Ribbon / Top Subtitle (Optional)
                </label>
                <input
                  type="text"
                  value={sanskritTag}
                  onChange={e => setSanskritTag(e.target.value)}
                  placeholder="e.g. ॥ शुभ दीपावली एवं महापर्व छठ पूजा महोत्सव ॥"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161F2E] border border-[#1E2D45] text-white text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Poster Image Upload & Preview */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Festival Poster Image <span className="text-orange-400">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={posterImage}
                    onChange={e => setPosterImage(e.target.value)}
                    placeholder="Upload image or paste image URL (e.g. /diwali-chhath-offer.jpg)"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#161F2E] border border-[#1E2D45] text-white text-xs focus:border-amber-500 focus:outline-none font-mono"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    <Upload size={14} />
                    <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
                  </button>
                </div>

                {/* Quick Presets */}
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                  <span>Quick Preset:</span>
                  <button
                    type="button"
                    onClick={() => setPosterImage('/diwali-chhath-offer.jpg')}
                    className="text-amber-400 underline hover:text-amber-300"
                  >
                    Current Diwali & Chhath Poster
                  </button>
                </div>

                {/* Image Preview Box */}
                {posterImage && (
                  <div className="mt-2.5 p-2 rounded-xl bg-black/40 border border-amber-500/30 flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-white/10">
                      <img src={posterImage} alt="Preview" className="w-full h-full object-contain" />
                    </div>
                    <div className="text-xs text-slate-300 truncate">
                      <span className="font-semibold text-emerald-400">Poster Selected:</span>
                      <p className="font-mono text-[11px] text-slate-400 truncate">{posterImage}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Date Range: Start Date & End Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Start Date <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161F2E] border border-[#1E2D45] text-white text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    End Date <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161F2E] border border-[#1E2D45] text-white text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* CTA Button Text & Link */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={e => setCtaText(e.target.value)}
                    placeholder="Claim Free Quotation & Site Visit"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161F2E] border border-[#1E2D45] text-white text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    CTA Link / URL
                  </label>
                  <input
                    type="text"
                    value={ctaLink}
                    onChange={e => setCtaLink(e.target.value)}
                    placeholder="/free-consultation"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161F2E] border border-[#1E2D45] text-white text-xs focus:border-amber-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* WhatsApp Share Text */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  WhatsApp Share / Chat Greeting Text
                </label>
                <textarea
                  rows={2}
                  value={whatsappMessage}
                  onChange={e => setWhatsappMessage(e.target.value)}
                  placeholder="Greeting text sent when users click WhatsApp buttons"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#161F2E] border border-[#1E2D45] text-white text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="checkbox"
                  id="activeToggle"
                  checked={isActive}
                  onChange={e => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded text-orange-500 focus:ring-0 bg-[#161F2E] border-[#1E2D45] cursor-pointer"
                />
                <label htmlFor="activeToggle" className="text-xs text-white cursor-pointer font-medium">
                  Set this festival banner active immediately
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1E2D45]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-md transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingItem ? 'Save Changes' : 'Publish Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Poster Full Preview Modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-pointer"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="relative max-w-md w-full bg-black border border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl p-2"
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-black/80 text-white hover:bg-black border border-white/20"
            >
              <X size={16} />
            </button>
            <img
              src={previewImage}
              alt="Poster Preview"
              className="w-full aspect-square object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
