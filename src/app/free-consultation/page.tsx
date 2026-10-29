'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, CheckCircle, Shield, Award, MapPin, Loader2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Bungalow Construction',
    websiteUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = formData.phone.replace(/\D/g, '').slice(-10);
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, phone: cleanPhone, address: 'Mumbai Area (Free Consultation Request)' }),
      });

      const data = await res.json();
      
      if (res.ok && data.success) {
        setSuccess(true);
        toast.success('Request submitted successfully!');
        // Keep success message visible
      } else {
        toast.error(data.error || 'Failed to submit request');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const text = `Hi AMS Civil! I'm interested in ${formData.service || 'your services'}. Please contact me.`;
    window.open(`https://wa.me/918779391690?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#080D1A] text-white selection-orange font-body">
      
      {/* ── Header ────────────────────────────────────────── */}
      <header className="bg-[#0B1120] border-b border-[#1E2D45] sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center justify-between">
          <Link prefetch={false} href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black font-display tracking-tight text-white">
              AMS <span className="text-orange-500">Civil.</span>
            </span>
          </Link>
          <a href="tel:+918779391690" className="flex items-center gap-2 text-white font-bold hover:text-orange-400 transition-colors bg-[#161F2E] px-4 py-2 rounded-full border border-[#1E2D45]">
            <Phone size={18} className="text-orange-500" />
            <span className="hidden sm:inline">+91 87793 91690</span>
            <span className="sm:hidden">Call Now</span>
          </a>
        </div>
      </header>

      {/* ── Hero & Form Section ────────────────────────────── */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-semibold text-sm mb-6">
                <MapPin size={16} /> Serving All Mumbai, Thane & Navi Mumbai
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-display leading-[1.1] mb-6">
                Premium Home Renovation & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Civil Construction</span>
              </h1>
              <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0">
                Don't risk your hard-earned money with unverified contractors. Get guaranteed quality, transparent pricing, and timely delivery from Mumbai's most trusted civil engineers.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto lg:mx-0 mb-8">
                {[
                  '100% Free Site Inspection (Diwali Special)',
                  'Exact Estimate in 24 Hours',
                  '10+ Years of Expertise',
                  'No Hidden Charges',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="text-orange-500 shrink-0" size={20} />
                    <span className="font-medium text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="flex -space-x-4">
                  {[
                    { initial: 'VM', bg: 'bg-orange-600' },
                    { initial: 'AD', bg: 'bg-blue-600' },
                    { initial: 'RK', bg: 'bg-emerald-600' },
                    { initial: 'SP', bg: 'bg-purple-600' },
                  ].map((user, i) => (
                    <div key={i} className={`w-12 h-12 rounded-full border-2 border-[#0B1120] ${user.bg} text-white font-bold text-xs flex items-center justify-center shadow-md`}>
                      {user.initial}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex text-orange-500 text-sm">
                    {Array(5).fill('★').join('')}
                  </div>
                  <p className="text-xs text-slate-400 font-bold mt-1">Trusted by 200+ Families</p>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="w-full max-w-md">
              <div className="bg-[#101827] border border-[#1E2D45] rounded-3xl p-8 shadow-2xl relative">
                {/* Ribbon */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg transform rotate-3">
                  Diwali Special!
                </div>

                {success ? (
                  <div className="text-center py-10 animate-fade-in">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Request Received!</h3>
                    <p className="text-slate-400 mb-6">
                      Thank you! Our senior engineer will call you shortly to schedule your Free Site Visit & Consultation.
                    </p>
                    <button onClick={() => setSuccess(false)} className="text-orange-500 font-medium hover:underline">
                      Submit another request
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-white mb-2">Get Your Free Estimate</h2>
                    <p className="text-sm text-slate-400 mb-6">Fill the details below and we'll call you instantly.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name *</label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#161F2E] border border-[#1E2D45] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                          placeholder="Rahul Sharma"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number *</label>
                        <input
                          required
                          type="tel"
                          maxLength={15}
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-[#161F2E] border border-[#1E2D45] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                          placeholder="10-digit mobile number"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#161F2E] border border-[#1E2D45] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                          placeholder="For written quote (optional)"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Service Required *</label>
                        <select
                          required
                          value={formData.service}
                          onChange={e => setFormData({ ...formData, service: e.target.value })}
                          className="w-full bg-[#161F2E] border border-[#1E2D45] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none"
                        >
                          <option value="Full Home Renovation">Full Home Renovation</option>
                          <option value="1BHK Complete Renovation">1BHK Complete Renovation</option>
                          <option value="2BHK Complete Renovation">2BHK Complete Renovation</option>
                          <option value="3BHK Luxury Interiors">3BHK Luxury Interiors</option>
                          <option value="4BHK Ultra Premium">4BHK Ultra Premium</option>
                          <option value="Bungalow Construction">Bungalow Construction</option>
                          <option value="Terrace Home Construction">Terrace Home Construction</option>
                          <option value="Building / Society Renovation">Building / Society Renovation</option>
                          <option value="Bathroom Renovation">Bathroom Renovation</option>
                          <option value="Modular Kitchen">Modular Kitchen</option>
                          <option value="Tiles & Flooring">Tiles & Flooring</option>
                          <option value="Painting & POP">Painting & POP</option>
                          <option value="Waterproofing">Waterproofing</option>
                          <option value="Gym Renovation">Gym Renovation</option>
                          <option value="New Gym Construction">New Gym Construction</option>
                          <option value="Office Renovation">Office Renovation</option>
                          <option value="New Office Construction">New Office Construction</option>
                          <option value="New Home Design & Build">New Home Design & Build</option>
                          <option value="B2B Partner / Architect Connect">B2B Partner / Architect Connect</option>
                        </select>
                      </div>

                      {/* Honeypot Field */}
                      <div style={{ display: 'none' }} aria-hidden="true">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Website URL</label>
                        <input
                          type="text"
                          value={formData.websiteUrl}
                          onChange={e => setFormData({ ...formData, websiteUrl: e.target.value })}
                          className="w-full bg-[#161F2E] border border-[#1E2D45] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all flex items-center justify-center gap-2 mt-2"
                      >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Request Free Call Back'}
                      </button>

                      {/* WhatsApp Alternative */}
                      <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-[#1E2D45]"></div>
                        <span className="flex-shrink-0 mx-4 text-slate-500 text-xs uppercase font-bold">Or</span>
                        <div className="flex-grow border-t border-[#1E2D45]"></div>
                      </div>

                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                      >
                        Message on WhatsApp <ArrowRight size={16} />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Badges Section ─────────────────────────────────── */}
      <section className="border-y border-[#1E2D45] bg-[#0B1120] py-8">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-slate-300" />
              <div className="text-sm font-bold text-slate-300 uppercase tracking-widest">ISO Certified Quality</div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-slate-300" />
              <div className="text-sm font-bold text-slate-300 uppercase tracking-widest">10+ Years Experience</div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-slate-300" />
              <div className="text-sm font-bold text-slate-300 uppercase tracking-widest">10 Year Warranty</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="py-8 text-center border-t border-[#1E2D45]">
        <div className="container-custom text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AMS Civil Construction. All rights reserved.</p>
          <p className="mt-2">Mumbai, Maharashtra</p>
        </div>
      </footer>

    </div>
  );
}
