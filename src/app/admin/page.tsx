'use client';
// src/app/admin/page.tsx
// ✅ SECURE: Credentials verified server-side via /api/admin/login
// Username/password stored in .env.local — never visible in browser

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  LayoutDashboard, FolderOpen, MessageSquare, Plus, Pencil, Trash2,
  Eye, X, Save, CheckCircle, Clock, HardHat, LogIn, LogOut, Lock,
  User, Eye as EyeIcon, EyeOff, ShieldCheck, AlertCircle, Upload,
  ImageIcon, RefreshCw, Mail, Calendar, Tag, MapPin,
  Bell, BellOff, Search, PenTool, MessageCircle, BarChart3, Sparkles
} from 'lucide-react';
import { WhatsAppLogo, PhoneLogo } from '@/components/ui/BrandIcons';
import toast from 'react-hot-toast';
import BlogsTab from '@/components/admin/BlogsTab';
import AnalyticsTab from '@/components/admin/AnalyticsTab';
import FestivalsTab from '@/components/admin/FestivalsTab';

/* ─── Session key only — credentials live in .env.local on server ─ */
const SESSION_KEY = 'mandal_admin_auth';

/* ─── Types ─────────────────────────────────────────────────────── */
type Tab        = 'overview' | 'projects' | 'gallery' | 'enquiries' | 'testimonials' | 'blogs' | 'analytics' | 'festivals';
type ProjStatus = 'ongoing' | 'completed';
type EnqStatus  = 'new' | 'contacted' | 'converted';

interface Project {
  id: string; title: string; slug: string; category: string;
  location: string; status: ProjStatus; description: string;
  images: string[]; completedDate?: string | null;
}

interface Enquiry {
  id: string; name: string; phone: string; email?: string;
  service: string; location?: string; message?: string; status: EnqStatus;
  source: string; createdAt: string; details?: any;
}

interface GalleryItem {
  id: string; src: string; title: string; category: string; createdAt: string;
}

interface Testimonial {
  id: string; name: string; location: string; rating: number; text: string;
  service: string; avatar: string; createdAt: string;
}

interface Blog {
  id: string; slug: string; title: string; excerpt: string; content: string;
  featuredImage?: string; seoKeywords: string; author: string;
  published: boolean; createdAt: string;
}

/* ═══════════════════════════════════════════════════════════════
   ROOT — Login gate
═══════════════════════════════════════════════════════════════ */
export default function AdminPage() {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    setAuth(sessionStorage.getItem(SESSION_KEY) === 'true');
  }, []);

  if (auth === null) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0B1120' }}>
      <span className="w-8 h-8 border-2 rounded-full animate-spin1"
        style={{ borderColor: '#1E2D45', borderTopColor: '#F97316' }} />
    </div>
  );

  return auth
    ? <Dashboard onLogout={() => { sessionStorage.removeItem(SESSION_KEY); setAuth(false); }} />
    : <LoginScreen onLogin={() => { sessionStorage.setItem(SESSION_KEY, 'true'); setAuth(true); }} />;
}

/* ═══════════════════════════════════════════════════════════════
   LOGIN SCREEN
═══════════════════════════════════════════════════════════════ */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username,  setUsername]  = useState('');
  const [password,  setPassword]  = useState('');
  const [showPass,  setShowPass]  = useState(false);
  const [error,     setError]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const [attempts,  setAttempts]  = useState(0);
  const [locked,    setLocked]    = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!countdown) return;
    const t = setTimeout(() => setCountdown(c => {
      if (c <= 1) { setLocked(false); setAttempts(0); return 0; }
      return c - 1;
    }), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (locked) return;
    setError(''); setLoading(true);

    try {
      // ✅ Password checked SERVER-SIDE — never exposed to browser
      const res = await fetch('/api/admin/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ username: username.trim(), password }),
      });
      const j = await res.json();

      if (j.success) {
        setLoading(false);
        onLogin();
      } else {
        const n = attempts + 1; setAttempts(n); setLoading(false);
        if (n >= 5) {
          setLocked(true); setCountdown(30);
          setError('Too many failed attempts. Locked for 30 seconds.');
        } else {
          setError(`Incorrect username or password. ${5 - n} attempt${5 - n > 1 ? 's' : ''} left.`);
        }
      }
    } catch {
      setLoading(false);
      setError('Network error. Please check connection and try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: '#0B1120' }}>
      <div className="glow-orb w-96 h-96 opacity-10"
        style={{ background: 'radial-gradient(circle, #F97316, transparent 70%)', top: '-10%', right: '-5%' }} />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 shadow-orange"
            style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
            <HardHat size={28} className="text-white" strokeWidth={2.5} />
          </div>
          <h1 className="font-display font-bold text-white text-3xl">Admin Portal</h1>
          <p className="text-slate-400 text-sm mt-1">AMS Civil Construction</p>
        </div>

        {/* Card */}
        <div className="p-8 shadow-card" style={{ background: '#161F2E', border: '1px solid #1E2D45' }}>
          <div className="flex items-center gap-2 mb-6 px-3 py-2.5"
            style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}>
            <ShieldCheck size={14} style={{ color: '#F97316' }} className="flex-shrink-0" />
            <span className="text-xs font-mono tracking-wide" style={{ color: '#F97316' }}>
              Restricted — Admin Access Only
            </span>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 mb-5 px-3 py-2.5 animate-scaleIn"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)' }}>
              <AlertCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}

          <form onSubmit={submit} className="flex flex-col gap-5" noValidate>
            <div>
              <label className="block text-slate-300 text-xs font-medium mb-1.5">Username</label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: '#475569' }} />
                <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                  placeholder="Enter admin username" disabled={locked} autoComplete="username" required
                  className="form-input pl-9 disabled:opacity-50" />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-xs font-medium mb-1.5">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: '#475569' }} />
                <input type={showPass ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)} placeholder="Enter password"
                  disabled={locked} autoComplete="current-password" required
                  className="form-input pl-9 pr-10 disabled:opacity-50" />
                <button type="button" tabIndex={-1} onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: '#475569' }}>
                  {showPass ? <EyeOff size={14} /> : <EyeIcon size={14} />}
                </button>
              </div>
            </div>

            {locked && (
              <p className="text-center text-sm font-mono" style={{ color: '#F97316' }}>
                Locked — try again in <strong className="text-white">{countdown}s</strong>
              </p>
            )}

            <button type="submit" disabled={loading || locked}
              className="btn-primary justify-center py-4 mt-1 disabled:opacity-50">
              {loading
                ? <><span className="w-4 h-4 border-2 rounded-full animate-spin1"
                    style={{ borderColor: 'rgba(255,255,255,0.2)', borderTopColor: '#fff' }} />Verifying…</>
                : <><LogIn size={16} />Sign In to Dashboard</>}
            </button>
          </form>

          {/* ✅ NO credentials shown here — removed for security */}
          <p className="text-center text-slate-600 text-[11px] mt-4 font-mono">
            Credentials are set in .env.local on server
          </p>
        </div>

        <p className="text-center mt-5">
          <Link prefetch={false} href="/" className="text-xs text-slate-500 hover:text-orange-400 transition-colors">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════════════════ */
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab,   setActiveTab]   = useState<Tab>('overview');
  const [projects,    setProjects]    = useState<Project[]>([]);
  const [enquiries,   setEnquiries]   = useState<Enquiry[]>([]);
  const [galleryItems,setGalleryItems] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingProj, setLoadingProj] = useState(true);
  const [loadingEnq,  setLoadingEnq]  = useState(true);
  const [loadingGal,  setLoadingGal]  = useState(true);
  const [loadingTest, setLoadingTest] = useState(true);
  const [showForm,    setShowForm]    = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [enqSearch,   setEnqSearch]   = useState('');
  const [enqFilter,   setEnqFilter]   = useState<'all' | EnqStatus>('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoadingProj(true);
    try {
      const res = await fetch('/api/projects');
      const j   = await res.json();
      if (j.success) setProjects(j.data);
      else toast.error('Failed to load projects.');
    } catch { toast.error('Network error loading projects.'); }
    finally { setLoadingProj(false); }
  }, []);

  const fetchEnquiries = useCallback(async (silent = false) => {
    if (!silent) setLoadingEnq(true);
    try {
      const res = await fetch('/api/enquiries');
      const j   = await res.json();
      if (j.success) {
        setEnquiries(prev => {
          const newCount = j.data.filter((e: Enquiry) => e.status === 'new').length;
          const oldCount = prev.filter(e => e.status === 'new').length;
          if (silent && newCount > oldCount)
            toast.success(`🔔 ${newCount - oldCount} new enquiry received!`, { duration: 5000 });
          return j.data;
        });
      }
    } catch { if (!silent) toast.error('Network error loading enquiries.'); }
    finally { if (!silent) setLoadingEnq(false); }
  }, []);

  const fetchGallery = useCallback(async () => {
    setLoadingGal(true);
    try {
      const res = await fetch('/api/gallery');
      const j   = await res.json();
      if (j.success) setGalleryItems(j.data);
      else toast.error('Failed to load gallery.');
    } catch { toast.error('Network error loading gallery.'); }
    finally { setLoadingGal(false); }
  }, []);

  const fetchTestimonials = useCallback(async () => {
    setLoadingTest(true);
    try {
      const res = await fetch('/api/testimonials');
      const j   = await res.json();
      if (j.success) setTestimonials(j.data);
      else toast.error('Failed to load testimonials.');
    } catch { toast.error('Network error loading testimonials.'); }
    finally { setLoadingTest(false); }
  }, []);

  useEffect(() => { 
    fetchProjects(); 
    fetchEnquiries(); 
    fetchGallery(); 
    fetchTestimonials();
  }, [fetchProjects, fetchEnquiries, fetchGallery, fetchTestimonials]);

  useEffect(() => {
    if (autoRefresh) {
      pollRef.current = setInterval(() => fetchEnquiries(true), 30_000);
    } else {
      if (pollRef.current) clearInterval(pollRef.current);
    }
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [autoRefresh, fetchEnquiries]);

  const deleteProject = async (id: string, title: string) => {
    // Note: Inline confirmation is better but for now just removing the blocking call if it's problematic
    // Let's keep it for projects since the user only complained about enquiries for now, 
    // but I'll make it more robust by just removing the confirm if they want.
    // Actually, I'll keep it for now but the user specifically mentioned Enquiries.
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const tid = toast.loading('Deleting…');
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      const j   = await res.json();
      if (j.success) { setProjects(p => p.filter(x => x.id !== id)); toast.success('Project deleted.', { id: tid }); }
      else toast.error(j.error || 'Delete failed.', { id: tid });
    } catch { toast.error('Network error.', { id: tid }); }
  };

  const updateEnqStatus = async (id: string, status: EnqStatus) => {
    try {
      await fetch(`/api/enquiries?id=${id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
      toast.success('Status updated.');
    } catch { toast.error('Update failed.'); }
  };

  const deleteEnquiry = async (id: string) => {
    // Native confirm() removed here to fix the auto-hiding issue.
    // Confirmation is now handled inline within the EnquiryCard.
    const tid = toast.loading('Deleting enquiry...');
    try {
      const res  = await fetch(`/api/enquiries?id=${id}`, { method: 'DELETE' });
      const json = await res.json();

      if (json.success) {
        setEnquiries(prev => prev.filter(e => e.id !== id));
        toast.success('Enquiry deleted successfully.', { id: tid });
      } else {
        toast.error(json.error || 'Delete failed from server.', { id: tid });
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Network error. Failed to delete.', { id: tid });
    }
  };

  const deleteGalleryItem = async (id: string) => {
    if (!confirm('Delete this photo from gallery?')) return;
    const tid = toast.loading('Deleting…');
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      const j   = await res.json();
      if (j.success) {
        setGalleryItems(prev => prev.filter(item => item.id !== id));
        toast.success('Photo deleted.', { id: tid });
      } else {
        toast.error(j.error || 'Delete failed.', { id: tid });
      }
    } catch { toast.error('Network error.', { id: tid }); }
  };

  const filteredEnq = enquiries
    .filter(e => enqFilter === 'all' || e.status === enqFilter)
    .filter(e => !enqSearch || [e.name, e.phone, e.service, e.message ?? '']
      .join(' ').toLowerCase().includes(enqSearch.toLowerCase()));

  const newEnqCount = enquiries.filter(e => e.status === 'new').length;

  const statCards = [
    { label: 'Total Projects', value: projects.length,                                       color: '#3B82F6', icon: FolderOpen    },
    { label: 'Ongoing',        value: projects.filter(p => p.status === 'ongoing').length,   color: '#F97316', icon: Clock         },
    { label: 'Completed',      value: projects.filter(p => p.status === 'completed').length, color: '#10B981', icon: CheckCircle   },
    { label: 'New Enquiries',  value: newEnqCount,                                           color: '#8B5CF6', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen pt-20" style={{ background: '#0B1120' }}>

      {/* Top bar */}
      <div className="px-6 py-4" style={{ background: '#101827', borderBottom: '1px solid #1E2D45' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2" style={{ background: 'linear-gradient(135deg,#F97316,#EA580C)' }}>
              <HardHat size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-semibold">AMS Civil Admin</h1>
              <p className="text-slate-500 text-xs flex items-center gap-1">
                <ShieldCheck size={10} className="text-green-400" />
                Signed in as <span className="font-mono ml-1" style={{ color: '#F97316' }}>Admin</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setAutoRefresh(v => !v)}
              className="flex items-center gap-1.5 text-xs transition-colors"
              style={{ color: autoRefresh ? '#10B981' : '#475569' }}
              title={autoRefresh ? 'Auto-refresh ON (every 30s)' : 'Auto-refresh OFF'}>
              {autoRefresh ? <Bell size={13} /> : <BellOff size={13} />}
              {autoRefresh ? 'Live' : 'Paused'}
            </button>
            <Link prefetch={false} href="/" className="flex items-center gap-1.5 text-slate-500 hover:text-orange-400 text-xs transition-colors">
              <Eye size={13} /> View Site
            </Link>
            <button onClick={onLogout}
              className="flex items-center gap-1.5 px-4 py-2 text-xs text-slate-500 hover:text-red-400 transition-all duration-200"
              style={{ border: '1px solid #1E2D45' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239,68,68,0.5)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = '#1E2D45'}>
              <LogOut size={13} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar */}
          <nav className="flex lg:flex-col gap-1 lg:w-52 flex-shrink-0 overflow-x-auto pb-2 lg:pb-0 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {([
              { id: 'overview',  label: 'Overview',  icon: LayoutDashboard },
              { id: 'analytics', label: 'Traffic Analytics', icon: BarChart3 },
              { id: 'projects',  label: 'Projects',  icon: FolderOpen      },
              { id: 'gallery',   label: 'Gallery',   icon: ImageIcon       },
              { id: 'enquiries', label: 'Enquiries', icon: MessageSquare   },
              { id: 'testimonials', label: 'Testimonials', icon: MessageCircle },
              { id: 'blogs',     label: 'Blog Articles', icon: PenTool },
              { id: 'festivals', label: 'Festivals & Offers', icon: Sparkles },
            ] as { id: Tab; label: string; icon: React.ElementType }[]).map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-left transition-all duration-150 flex-shrink-0 whitespace-nowrap rounded-lg lg:rounded-none"
                style={activeTab === id ? { background: '#F97316', color: '#fff' } : { color: '#94A3B8' }}
                onMouseEnter={e => { if (activeTab !== id) (e.currentTarget as HTMLElement).style.background = '#161F2E'; }}
                onMouseLeave={e => { if (activeTab !== id) (e.currentTarget as HTMLElement).style.background = ''; }}>
                <Icon size={16} />
                {label}
                {id === 'enquiries' && newEnqCount > 0 && (
                  <span className="ml-auto text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: '#EF4444' }}>{newEnqCount}</span>
                )}
              </button>
            ))}
          </nav>

          {/* Tab content */}
          <div className="flex-1 min-w-0">
            {activeTab === 'analytics' && <AnalyticsTab />}
            {activeTab === 'blogs' && <BlogsTab />}
            {activeTab === 'festivals' && <FestivalsTab />}
            {activeTab === 'testimonials' && (
              <TestimonialsTab 
                data={testimonials} 
                loading={loadingTest} 
                onRefresh={fetchTestimonials} 
              />
            )}

            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="font-display text-2xl text-white mb-6">Dashboard Overview</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {statCards.map(({ label, value, color, icon: Icon }) => (
                    <div key={label} className="card p-6">
                      <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: color }}>
                        <Icon size={18} className="text-white" />
                      </div>
                      <div className="text-3xl font-display font-bold text-white">
                        {loadingProj || loadingEnq ? '—' : value}
                      </div>
                      <div className="text-slate-500 text-xs mt-1">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="card p-6 mb-4" style={{ border: '1px solid rgba(249,115,22,0.2)', background: 'rgba(249,115,22,0.04)' }}>
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Bell size={16} style={{ color: '#F97316' }} /> How Enquiries Reach You
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">Contact Page Form</span>
                      <span>Customer fills the contact form → saved to database → appears in Enquiries tab instantly</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">Get Free Quote Popup</span>
                      <span>Customer clicks "Get Quote" → fills popup → saved to database → appears here</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">Email Alert</span>
                      <span>Every submission also sends an email alert to the admin.</span>
                    </div>
                  </div>
                </div>
                <div className="card p-6">
                  <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => { setActiveTab('projects'); setShowForm(true); setEditProject(null); }}
                      className="btn-primary text-xs px-5 py-2.5">
                      <Plus size={14} /> Add New Project
                    </button>
                    <button onClick={() => setActiveTab('enquiries')} className="btn-outline text-xs px-5 py-2.5">
                      <MessageSquare size={14} /> View Enquiries ({newEnqCount} new)
                    </button>
                    <button onClick={() => { fetchProjects(); fetchEnquiries(); }} className="btn-ghost text-xs px-5 py-2.5">
                      <RefreshCw size={14} /> Refresh All
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PROJECTS */}
            {activeTab === 'projects' && (
              <div>
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <h2 className="font-display text-2xl text-white">Manage Projects</h2>
                  <div className="flex gap-2">
                    <button onClick={fetchProjects} className="btn-ghost text-xs px-4 py-2.5 flex items-center gap-1.5">
                      <RefreshCw size={13} /> Refresh
                    </button>
                    <button onClick={() => { setShowForm(true); setEditProject(null); }} className="btn-primary text-xs px-5 py-2.5">
                      <Plus size={14} /> Add Project
                    </button>
                  </div>
                </div>

                {(showForm || editProject) && (
                  <ProjectForm
                    project={editProject}
                    onClose={() => { setShowForm(false); setEditProject(null); }}
                    onSaved={(saved, isEdit) => {
                      if (isEdit) setProjects(p => p.map(x => x.id === saved.id ? saved : x));
                      else setProjects(p => [saved, ...p]);
                      setShowForm(false); setEditProject(null);
                    }}
                  />
                )}

                {loadingProj ? (
                  <div className="card p-12 flex items-center justify-center gap-3 text-slate-400">
                    <span className="w-5 h-5 border-2 rounded-full animate-spin1"
                      style={{ borderColor: '#1E2D45', borderTopColor: '#F97316' }} />
                    Loading projects…
                  </div>
                ) : projects.length === 0 ? (
                  <div className="card p-12 text-center text-slate-400">
                    <FolderOpen size={40} className="mx-auto mb-3 opacity-30" />
                    <p>No projects yet. Add your first project.</p>
                  </div>
                ) : (
                  <div className="card overflow-x-auto">
                    <table className="w-full text-sm min-w-[600px]">
                      <thead>
                        <tr style={{ borderBottom: '1px solid #1E2D45', background: 'rgba(11,17,32,0.5)' }}>
                          {['Project', 'Location', 'Status', 'Actions'].map(h => (
                            <th key={h}
                              className={`text-left py-3 px-4 text-slate-500 text-xs uppercase tracking-wider
                                ${h === 'Location' ? 'hidden md:table-cell' : ''}
                                ${h === 'Actions'  ? 'text-right' : ''}`}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((p, i) => (
                          <tr key={p.id} style={{
                            borderBottom: '1px solid rgba(30,45,69,0.4)',
                            background: i % 2 === 0 ? '' : 'rgba(11,17,32,0.2)',
                          }}>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 flex-shrink-0 overflow-hidden" style={{ background: '#1E2D45' }}>
                                  {p.images?.[0]
                                    ? <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                                    : <ImageIcon size={16} className="absolute inset-0 m-auto text-slate-600" />}
                                </div>
                                <div>
                                  <p className="text-slate-300 font-medium text-xs">{p.title}</p>
                                  <p className="text-slate-500 text-xs">{p.category}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-slate-500 text-xs hidden md:table-cell">{p.location}</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 text-xs font-mono font-semibold uppercase"
                                style={p.status === 'ongoing'
                                  ? { background: 'rgba(59,130,246,0.15)', color: '#60A5FA' }
                                  : { background: 'rgba(16,185,129,0.15)', color: '#34D399' }}>
                                {p.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => { setEditProject(p); setShowForm(false); }}
                                  className="p-1.5 text-slate-500 hover:text-orange-400 transition-colors" title="Edit">
                                  <Pencil size={14} />
                                </button>
                                <button onClick={() => deleteProject(p.id, p.title)}
                                  className="p-1.5 text-slate-500 hover:text-red-400 transition-colors" title="Delete">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* GALLERY */}
            {activeTab === 'gallery' && (
              <div>
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <h2 className="font-display text-2xl text-white">Manage Gallery</h2>
                  <div className="flex gap-2">
                    <button onClick={fetchGallery} className="btn-ghost text-xs px-4 py-2.5 flex items-center gap-1.5">
                      <RefreshCw size={13} /> Refresh
                    </button>
                    <button onClick={() => setShowForm(v => !v)} className="btn-primary text-xs px-5 py-2.5">
                      {showForm ? 'Close Form' : <><Plus size={14} /> Upload Photo</>}
                    </button>
                  </div>
                </div>

                {showForm && (
                  <GalleryForm
                    onClose={() => setShowForm(false)}
                    onSaved={(newItem) => {
                      setGalleryItems(p => [newItem, ...p]);
                      setShowForm(false);
                    }}
                  />
                )}

                {loadingGal ? (
                  <div className="card p-12 flex items-center justify-center gap-3 text-slate-400">
                    <span className="w-5 h-5 border-2 rounded-full animate-spin1"
                      style={{ borderColor: '#1E2D45', borderTopColor: '#F97316' }} />
                    Loading gallery…
                  </div>
                ) : galleryItems.length === 0 ? (
                  <div className="card p-12 text-center text-slate-400">
                    <ImageIcon size={40} className="mx-auto mb-3 opacity-30" />
                    <p>No photos yet. Start by uploading one.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galleryItems.map(item => (
                      <div key={item.id} className="card group relative aspect-square overflow-hidden bg-[#1E2D45]">
                        <Image src={item.src} alt={item.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                          <p className="text-white text-xs font-semibold mb-1">{item.title}</p>
                          <span className="text-orange-400 text-[10px] uppercase font-mono">{item.category}</span>
                          <button onClick={() => deleteGalleryItem(item.id)}
                            className="mt-3 p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all rounded">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {activeTab === 'enquiries' && (
              <div>
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <div>
                    <h2 className="font-display text-2xl text-white">Customer Enquiries</h2>
                    <p className="text-slate-500 text-xs mt-1">
                      From Contact Page &amp; Quote Popup ·{' '}
                      {autoRefresh ? 'Auto-refreshes every 30s' : 'Auto-refresh paused'}
                    </p>
                  </div>
                  <button onClick={() => fetchEnquiries()} className="btn-ghost text-xs px-4 py-2.5 flex items-center gap-1.5">
                    <RefreshCw size={13} /> Refresh Now
                  </button>
                </div>

                <div className="flex flex-wrap gap-3 mb-5">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: '#475569' }} />
                    <input type="text" placeholder="Search name, phone, service…"
                      value={enqSearch} onChange={e => setEnqSearch(e.target.value)}
                      className="form-input pl-8 text-xs py-2" />
                  </div>
                  <div className="flex gap-2">
                    {(['all', 'new', 'contacted', 'converted'] as const).map(f => (
                      <button key={f} onClick={() => setEnqFilter(f)}
                        className="px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-all duration-150"
                        style={enqFilter === f
                          ? { background: '#F97316', color: '#fff' }
                          : { border: '1px solid #1E2D45', color: '#94A3B8' }}>
                        {f}{f !== 'all' && <span className="opacity-60 ml-1">({enquiries.filter(e => e.status === f).length})</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {loadingEnq ? (
                  <div className="card p-12 flex items-center justify-center gap-3 text-slate-400">
                    <span className="w-5 h-5 border-2 rounded-full animate-spin1"
                      style={{ borderColor: '#1E2D45', borderTopColor: '#F97316' }} />
                    Loading enquiries from database…
                  </div>
                ) : filteredEnq.length === 0 ? (
                  <div className="card p-12 text-center text-slate-400">
                    <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
                    {enquiries.length === 0
                      ? <p>No enquiries yet. When someone fills the contact form or quote popup, they&apos;ll appear here.</p>
                      : <p>No enquiries match this filter.</p>}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {filteredEnq.map(enq => (
                      <EnquiryCard key={enq.id} enq={enq}
                        onStatusChange={updateEnqStatus} onDelete={deleteEnquiry} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ENQUIRY CARD
═══════════════════════════════════════════════════════════════ */
function EnquiryCard({
  enq, onStatusChange, onDelete,
}: {
  enq: Enquiry;
  onStatusChange: (id: string, status: EnqStatus) => void;
  onDelete: (id: string) => void;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const statusStyle: Record<EnqStatus, React.CSSProperties> = {
    new:       { background: 'rgba(59,130,246,0.12)', color: '#60A5FA', border: '1px solid rgba(59,130,246,0.25)' },
    contacted: { background: 'rgba(249,115,22,0.12)', color: '#FB923C', border: '1px solid rgba(249,115,22,0.25)' },
    converted: { background: 'rgba(16,185,129,0.12)', color: '#34D399', border: '1px solid rgba(16,185,129,0.25)' },
  };

  const sourceLabel = enq.source === 'quote-popup' ? '📋 Quote Popup'
    : enq.source === 'contact-form' ? '📬 Contact Form'
    : enq.source === 'scroll-lead' ? '✨ Scroll Lead' : enq.source;

  const formattedDate = enq.createdAt
    ? new Date(enq.createdAt).toLocaleString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
      })
    : '—';

  return (
    <div className="card p-5 transition-all duration-200 hover:border-orange-500/30"
      style={enq.status === 'new' ? { borderColor: 'rgba(249,115,22,0.3)' } : {}}>
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <h3 className="text-white font-semibold text-sm">{enq.name}</h3>
            <select value={enq.status}
              onChange={e => onStatusChange(enq.id, e.target.value as EnqStatus)}
              className="px-2 py-0.5 text-xs font-mono font-semibold uppercase cursor-pointer border-0 outline-none"
              style={statusStyle[enq.status]}>
              <option value="new">🔵 new</option>
              <option value="contacted">🟠 contacted</option>
              <option value="converted">🟢 converted</option>
            </select>
            <span className="text-[10px] font-mono px-2 py-0.5" style={{ background: '#1E2D45', color: '#94A3B8' }}>
              {sourceLabel}
            </span>
            <span className="text-slate-600 text-[11px] font-mono flex items-center gap-1">
              <Calendar size={10} /> {formattedDate}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs text-slate-400">
            <a href={`tel:+91${enq.phone}`} className="flex items-center gap-1.5 hover:text-orange-400 transition-colors font-medium">
              <PhoneLogo className="w-3 h-3 fill-[#F97316]" /> {enq.phone}
            </a>
            {enq.email && (
              <a href={`mailto:${enq.email}`} className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                <Mail size={12} style={{ color: '#F97316' }} /> {enq.email}
              </a>
            )}
            <span className="flex items-center gap-1.5">
              <Tag size={12} style={{ color: '#F97316' }} />
              <span className="font-semibold text-slate-300">{enq.service}</span>
            </span>
            {enq.location && (
              <span className="flex items-center gap-1.5 text-slate-400">
                <MapPin size={12} style={{ color: '#F97316' }} />
                <span>{enq.location}</span>
              </span>
            )}
          </div>
          {enq.message && (
            <div className="px-3 py-2 text-xs text-slate-400 leading-relaxed"
              style={{ background: 'rgba(11,17,32,0.5)', borderLeft: '2px solid rgba(249,115,22,0.4)' }}>
              {enq.message}
            </div>
          )}
          {enq.details && enq.source === 'calculator' && (
            <div className="mt-3 px-4 py-3 rounded-lg text-xs" style={{ background: 'rgba(20, 28, 43, 0.6)', border: '1px solid rgba(249,115,22,0.2)' }}>
              <div className="font-semibold text-orange-400 mb-2 flex items-center gap-1.5">
                <BarChart3 size={12} /> Calculator Result Details
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div><span className="text-slate-500">Property:</span> {enq.details.propertyType}</div>
                <div><span className="text-slate-500">Quality:</span> {enq.details.condition} Finish</div>
                <div className="col-span-2"><span className="text-slate-500">Services:</span> {Array.isArray(enq.details.services) ? enq.details.services.join(', ') : enq.details.services}</div>
                <div className="col-span-2 mt-1"><span className="text-slate-500">Shown Estimate:</span> <span className="font-bold text-green-400">{enq.details.estimateMin} - {enq.details.estimateMax}</span></div>
              </div>
            </div>
          )}
        </div>
        <div className="flex sm:flex-col gap-2 flex-shrink-0">
          <a href={`tel:+91${enq.phone}`} className="btn-primary text-xs px-3 py-2 flex items-center gap-1.5 justify-center">
            <PhoneLogo className="w-3.5 h-3.5 fill-white" /> Call
          </a>
          <a href={`https://wa.me/91${enq.phone}?text=Hi%20${encodeURIComponent(enq.name)}!%20This%20is%20AMS%20Civil%20Construction%20team.%20Regarding%20your%20enquiry%20for%20${encodeURIComponent(enq.service)}.`}
            target="_blank" rel="noopener noreferrer"
            className="btn-outline text-xs px-3 py-2 flex items-center gap-1.5 justify-center group">
            <WhatsAppLogo className="w-3.5 h-3.5 fill-[#F97316] group-hover:fill-current" /> WhatsApp
          </a>
          
          {showConfirm ? (
            <div className="flex flex-col gap-1 mt-1">
              <button onClick={() => onDelete(enq.id)}
                className="text-[10px] px-2 py-1.5 bg-red-600 text-white font-bold rounded shadow-lg hover:bg-red-700 transition-colors">
                CONFIRM DELETE?
              </button>
              <button onClick={() => setShowConfirm(false)}
                className="text-[10px] px-2 py-1 text-slate-400 hover:text-white transition-colors">
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setShowConfirm(true)}
              className="text-xs px-3 py-2 flex items-center gap-1.5 justify-center text-slate-600 hover:text-red-400 transition-colors"
              style={{ border: '1px solid #1E2D45' }}>
              <Trash2 size={12} /> Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROJECT FORM
═══════════════════════════════════════════════════════════════ */
interface ProjectFormProps {
  project: Project | null;
  onClose: () => void;
  onSaved: (p: Project, isEdit: boolean) => void;
}

function ProjectForm({ project, onClose, onSaved }: ProjectFormProps) {
  const isEdit  = Boolean(project);
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    title:         project?.title         ?? '',
    category:      project?.category      ?? '',
    location:      project?.location      ?? '',
    status:        project?.status        ?? 'ongoing',
    description:   project?.description   ?? '',
    completedDate: project?.completedDate ?? '',
  });
  const [images,    setImages]    = useState<string[]>(project?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [saving,    setSaving]    = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    for (const f of files) {
      if (!f.type.startsWith('image/')) { toast.error(`${f.name} is not an image`); return; }
      if (f.size > 5 * 1024 * 1024)    { toast.error(`${f.name} exceeds 5 MB`); return; }
    }
    setUploading(true);
    const uploaded: string[] = [];
    for (let i = 0; i < files.length; i++) {
      setUploadMsg(`Uploading ${i + 1} of ${files.length}…`);
      try {
        const fd = new FormData(); fd.append('file', files[i]);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const j   = await res.json();
        if (j.success) uploaded.push(j.url);
        else toast.error(`Upload failed: ${j.error}`);
      } catch { toast.error(`Failed to upload ${files[i].name}`); }
    }
    setImages(p => [...p, ...uploaded]);
    setUploading(false); setUploadMsg('');
    if (uploaded.length) toast.success(`${uploaded.length} image${uploaded.length > 1 ? 's' : ''} uploaded!`);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.location.trim()) { toast.error('Title and location are required.'); return; }
    if (uploading) { toast.error('Wait for upload to finish.'); return; }
    setSaving(true);
    const tid = toast.loading(isEdit ? 'Updating…' : 'Saving…');
    try {
      const res = await fetch(isEdit ? `/api/projects/${project!.id}` : '/api/projects', {
        method:  isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...form, images, completedDate: form.completedDate || null }),
      });
      const j = await res.json();
      if (j.success) {
        toast.success(isEdit ? 'Project updated!' : 'Project saved!', { id: tid });
        onSaved(j.data, isEdit);
      } else {
        toast.error(j.error || 'Save failed.', { id: tid });
      }
    } catch { toast.error('Network error.', { id: tid }); }
    finally { setSaving(false); }
  };

  return (
    <div className="card p-6 mb-6 animate-scaleIn" style={{ border: '1px solid rgba(249,115,22,0.35)' }}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-semibold">{isEdit ? '✏️ Edit Project' : '➕ Add New Project'}</h3>
        <button onClick={onClose} className="p-1.5 text-slate-500 hover:text-white transition-colors">
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-300 text-xs font-medium mb-1.5">Title *</label>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Sharma Bungalow, Borivali" className="form-input" required />
        </div>
        <div>
          <label className="block text-slate-300 text-xs font-medium mb-1.5">Category</label>
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
            className="form-input appearance-none">
            <option value="">Select…</option>
            {['Bungalow Construction','Interior Work','Kitchen Work','Bathroom Renovation',
              'Tiles Work','Flooring Work','POP Work','Plaster Work','Commercial'].map(c =>
              <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-slate-300 text-xs font-medium mb-1.5">Location *</label>
          <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
            placeholder="e.g. Borivali West, Mumbai" className="form-input" required />
        </div>
        <div>
          <label className="block text-slate-300 text-xs font-medium mb-1.5">Status</label>
          <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as ProjStatus })}
            className="form-input appearance-none">
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        {form.status === 'completed' && (
          <div>
            <label className="block text-slate-300 text-xs font-medium mb-1.5">Completion Date</label>
            <input value={form.completedDate} onChange={e => setForm({ ...form, completedDate: e.target.value })}
              placeholder="e.g. March 2025" className="form-input" />
          </div>
        )}
        <div className="sm:col-span-2">
          <label className="block text-slate-300 text-xs font-medium mb-1.5">Description</label>
          <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
            rows={3} placeholder="Project details…" className="form-input resize-none" />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-slate-300 text-xs font-medium mb-1.5">
            Photos <span className="text-slate-500 font-normal">(max 5 MB each)</span>
          </label>
          <div onClick={() => !uploading && fileRef.current?.click()}
            className="border-2 border-dashed px-6 py-7 text-center cursor-pointer transition-all duration-200"
            style={{ borderColor: uploading ? '#F97316' : '#1E2D45', background: uploading ? 'rgba(249,115,22,0.04)' : '' }}
            onMouseEnter={e => { if (!uploading) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(249,115,22,0.4)'; }}
            onMouseLeave={e => { if (!uploading) (e.currentTarget as HTMLElement).style.borderColor = '#1E2D45'; }}>
            <input ref={fileRef} type="file" multiple accept="image/*" className="hidden" onChange={handleFiles} />
            {uploading ? (
              <div className="flex flex-col items-center gap-2" style={{ color: '#F97316' }}>
                <span className="w-6 h-6 border-2 rounded-full animate-spin1"
                  style={{ borderColor: 'rgba(249,115,22,0.2)', borderTopColor: '#F97316' }} />
                <span className="text-sm font-medium">{uploadMsg}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-500">
                <Upload size={26} style={{ color: '#1E2D45' }} />
                <span className="text-sm text-slate-400">Click to upload photos</span>
                <span className="text-xs">Uploads to Cloudinary · JPG, PNG, WEBP</span>
              </div>
            )}
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mt-3">
              {images.map((url, i) => (
                <div key={i} className="relative group aspect-square overflow-hidden" style={{ background: '#1E2D45' }}>
                  <Image src={url} alt={`img ${i + 1}`} fill className="object-cover" />
                  <button type="button" onClick={() => setImages(p => p.filter((_, j) => j !== i))}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: '#EF4444' }}>
                    <X size={10} className="text-white" />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-0.5 left-0.5 text-[9px] font-bold px-1"
                      style={{ background: '#F97316', color: '#fff' }}>Cover</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sm:col-span-2 flex gap-3 pt-1">
          <button type="submit" disabled={saving || uploading} className="btn-primary text-xs px-6 py-2.5 disabled:opacity-50">
            {saving
              ? <><span className="w-3.5 h-3.5 border-2 rounded-full animate-spin1"
                  style={{ borderColor: 'rgba(255,255,255,0.2)', borderTopColor: '#fff' }} />Saving…</>
              : <><Save size={14} />{isEdit ? 'Update' : 'Save to Database'}</>}
          </button>
          <button type="button" onClick={onClose} className="btn-ghost text-xs px-6 py-2.5" disabled={saving}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GALLERY FORM
 ═══════════════════════════════════════════════════════════════ */
interface GalleryFormProps {
  onClose: () => void;
  onSaved: (item: GalleryItem) => void;
}

function GalleryForm({ onClose, onSaved }: GalleryFormProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [title,     setTitle]     = useState('');
  const [category,  setCategory]  = useState('');
  const [image,     setImage]     = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving,    setSaving]    = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error('Please select an image file.'); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error('File size exceeds 5MB.'); return; }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const j   = await res.json();
      if (j.success) {
        setImage(j.url);
        toast.success('Image uploaded!');
      } else {
        toast.error(j.error || 'Upload failed.');
      }
    } catch {
      toast.error('Network error during upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) { toast.error('Please upload an image first.'); return; }
    if (!category) { toast.error('Please select a category.'); return; }

    setSaving(true);
    const tid = toast.loading('Saving to gallery…');
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ src: image, title, category }),
      });
      const j = await res.json();
      if (j.success) {
        toast.success('Added to gallery!', { id: tid });
        onSaved(j.data);
      } else {
        toast.error(j.error || 'Save failed.', { id: tid });
      }
    } catch {
      toast.error('Network error.', { id: tid });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card p-6 mb-8 animate-scaleIn" style={{ border: '1px solid rgba(249,115,22,0.35)' }}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-semibold">Upload to Gallery</h3>
        <button onClick={onClose} className="p-1.5 text-slate-500 hover:text-white transition-colors">
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 text-xs font-medium mb-1.5">Caption / Title (Optional)</label>
            <input value={title} onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Modern Kitchen Design" className="form-input" />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-medium mb-1.5">Category *</label>
            <select value={category} onChange={e => setCategory(e.target.value)} required
              className="form-input appearance-none">
              <option value="">Select Category…</option>
              {['Bungalow', 'Interior', 'Kitchen', 'Bathroom', 'Tiles', 'Flooring', 'POP', 'Exterior', 'Repair', 'Other'].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-slate-300 text-xs font-medium mb-1.5">Photo *</label>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex-1 h-32 border-2 border-dashed border-[#1E2D45] hover:border-orange-500/50 transition-colors flex flex-col items-center justify-center gap-2 text-slate-500 bg-[#0B1120]">
              {uploading ? (
                <RefreshCw size={24} className="animate-spin" />
              ) : image ? (
                <div className="relative w-full h-full p-2">
                  <Image src={image} alt="Preview" fill className="object-contain" />
                </div>
              ) : (
                <>
                  <Upload size={24} />
                  <span className="text-xs">Click to choose image</span>
                </>
              )}
            </button>
            <input type="file" ref={fileRef} onChange={handleUpload} className="hidden" accept="image/*" />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button type="button" onClick={onClose} className="btn-ghost text-xs px-6">Cancel</button>
          <button type="submit" disabled={saving || uploading} className="btn-primary text-xs px-8">
            {saving ? 'Saving…' : 'Add to Gallery'}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS TAB
   ═══════════════════════════════════════════════════════════════ */
function TestimonialsTab({ data, loading, onRefresh }: { data: Testimonial[], loading: boolean, onRefresh: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [editItem, setEditItem] = useState<Testimonial | null>(null);

  const deleteTestimonial = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from ${name}?`)) return;
    const tid = toast.loading('Deleting…');
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      const j = await res.json();
      if (j.success) {
        toast.success('Testimonial deleted.', { id: tid });
        onRefresh();
      } else toast.error(j.error || 'Delete failed.', { id: tid });
    } catch { toast.error('Network error.', { id: tid }); }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      location: formData.get('location'),
      rating: Number(formData.get('rating')),
      service: formData.get('service'),
      text: formData.get('text'),
    };

    try {
      const url = editItem ? `/api/testimonials/${editItem.id}` : '/api/testimonials';
      const method = editItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const j = await res.json();
      if (j.success) {
        toast.success(editItem ? 'Testimonial updated!' : 'Testimonial added!');
        setEditItem(null);
        (e.target as HTMLFormElement).reset();
        onRefresh();
      } else toast.error(j.error || 'Failed to save.');
    } catch { toast.error('Network error.'); }
    finally { setSubmitting(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-white">Manage Testimonials</h2>
        <button onClick={() => { onRefresh(); setEditItem(null); }} className="text-slate-500 hover:text-orange-400 p-2 transition-colors">
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 text-white">
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h3 className="text-white font-semibold mb-4">{editItem ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
            <form onSubmit={onSubmit} className="flex flex-col gap-4" key={editItem?.id || 'new'}>
              <div>
                <label className="block text-slate-400 text-[11px] uppercase font-bold mb-1">Client Name</label>
                <input name="name" required defaultValue={editItem?.name} placeholder="e.g. Rajesh Sharma" className="form-input" />
              </div>
              <div>
                <label className="block text-slate-400 text-[11px] uppercase font-bold mb-1">Location</label>
                <input name="location" required defaultValue={editItem?.location} placeholder="e.g. Borivali" className="form-input" />
              </div>
              <div>
                <label className="block text-slate-400 text-[11px] uppercase font-bold mb-1">Rating (1-5)</label>
                <select name="rating" required defaultValue={editItem?.rating || 5} className="form-input border-slate-700 bg-slate-900 text-white">
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 text-[11px] uppercase font-bold mb-1">Service Provided</label>
                <input name="service" required defaultValue={editItem?.service} placeholder="e.g. Full Home Renovation" className="form-input" />
              </div>
              <div>
                <label className="block text-slate-400 text-[11px] uppercase font-bold mb-1">Feedback Message</label>
                <textarea name="text" required defaultValue={editItem?.text} rows={4} placeholder="Client feedback content..." className="form-input py-2" />
              </div>
              <div className="flex flex-col gap-2">
                <button type="submit" disabled={submitting} className="btn-primary justify-center">
                  {submitting ? 'Saving...' : editItem ? 'Update Testimonial' : 'Add Testimonial'}
                </button>
                {editItem && (
                  <button type="button" onClick={() => setEditItem(null)} className="btn-ghost justify-center text-xs">
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          {loading && !data.length ? (
            <div className="card p-12 text-center text-slate-500">Loading testimonials...</div>
          ) : !data.length ? (
            <div className="card p-12 text-center text-slate-500">No testimonials found.</div>
          ) : (
            data.map(t => (
              <div key={t.id} className={`card p-6 flex items-start justify-between gap-4 transition-all ${editItem?.id === t.id ? 'ring-2 ring-orange-500 ring-inset' : ''}`}>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-amber text-brand-charcoal flex items-center justify-center font-bold flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-semibold">{t.name}</h4>
                      <span className="text-slate-500 text-[10px]">• {t.location}</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-2 line-clamp-3">{t.text}</p>
                    <p className="text-orange-500 text-[10px] uppercase font-bold">{t.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditItem(t)} className="p-2 text-slate-500 hover:text-orange-400 transition-colors" title="Edit">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => deleteTestimonial(t.id, t.name)} className="p-2 text-slate-500 hover:text-red-400 transition-colors" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
