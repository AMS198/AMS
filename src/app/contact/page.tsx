'use client';
// src/app/contact/page.tsx
// FIXED: onSubmit now calls POST /api/contact → saves to MongoDB → shows in admin

import { useEffect } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { WhatsAppLogo, PhoneLogo } from '@/components/ui/BrandIcons';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  websiteUrl?: string;
  dpdpConsent: boolean;
}

function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('visible');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.08 },
    );
    document.querySelectorAll('.animate-on-scroll').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function ContactPage() {
  useScrollReveal();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amscivilwork.in' },
      { '@type': 'ListItem', position: 2, name: 'Contact Us', item: 'https://www.amscivilwork.in/contact' },
    ],
  };

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<ContactFormData>();

  /* ── FIXED: actually calls the API ─────────────────────────── */
  const onSubmit = async (data: ContactFormData) => {
    try {
      const res  = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });
      const json = await res.json();

      if (json.success) {
        toast.success('Message sent! We\'ll contact you within 24 hours.', { duration: 5000 });
        reset();
      } else {
        toast.error(json.error || 'Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Network error. Please check your connection and try again.');
    }
  };

  const contactDetails = [
    {
      icon: PhoneLogo,
      label: 'Phone / WhatsApp',
      values: ['+91 87793 91690', '+91 90042 98911'],
      href: 'tel:+918779391690', // Fallback
    },
    {
      icon: Mail,
      label: 'Email',
      values: ['ams.constructionwork@gmail.com'],
      href: 'mailto:ams.constructionwork@gmail.com',
    },
    {
      icon: MapPin,
      label: 'Location',
      values: ['Mumbai, Maharashtra, India'],
      href: null,
    },
    {
      icon: Clock,
      label: 'Working Hours',
      values: ['Mon – Sat: 9:00 AM – 7:00 PM', 'Sunday: 10:00 AM – 2:00 PM'],
      href: null,
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* ── Page Header ──────────────────────────────────────── */}
      <section className="relative pt-32 pb-8 overflow-hidden" style={{ background: '#0B1120' }}>
        <div className="glow-orb w-[500px] h-[500px] opacity-15"
          style={{ background: 'radial-gradient(circle, #F97316, transparent 70%)', top: '-20%', right: '-10%' }} />
        <div className="relative container-custom">
          <div className="section-label animate-fadeIn">Get in Touch</div>
          <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl mt-2 animate-fadeUp">
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="text-slate-400 mt-3 max-w-xl text-sm leading-relaxed animate-fadeIn">
            Have a project in mind? Reach out for a free consultation.
            Our team responds within 24 hours.
          </p>
        </div>
      </section>

      {/* ── Contact Content ──────────────────────────────────── */}
      <section className="pb-20" style={{ background: '#0B1120' }}>
        <div className="container-custom grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left — Info cards */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="animate-on-scroll">
              <div className="section-label">Our Coordinates</div>
              <h2 className="font-display text-2xl text-white mt-2 mb-4">
                We&apos;re Here to <span className="text-gradient">Help</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether you have a question, want a quote, or are ready to start — our team is
                ready to help.
              </p>
            </div>

            {contactDetails.map(({ icon: Icon, label, values, href }, i) => (
              <div key={label} className="card p-5 flex items-start gap-4 animate-on-scroll"
                style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(249,115,22,0.12)' }}>
                  <Icon className="w-5 h-5 fill-[#F97316]" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">{label}</p>
                  {values.map(v => (
                    href ? (
                      <a key={v} href={`tel:+91${v.replace(/\D/g, '').slice(-10)}`}
                        className="block text-slate-300 text-sm font-medium hover:text-orange-400 transition-colors">
                        {v}
                      </a>
                    ) : (
                      <p key={v} className="text-slate-300 text-sm">{v}</p>
                    )
                  ))}
                </div>
              </div>
            ))}

            {/* WhatsApp quick connect */}
            <div className="flex flex-col sm:flex-row gap-4 animate-on-scroll">
              <a href="https://wa.me/918779391690?text=Hi!%20I'd%20like%20to%20discuss%20a%20project."
                target="_blank" rel="noopener noreferrer"
                className="btn-primary flex-1 justify-center gap-2">
                <WhatsAppLogo className="w-5 h-5 fill-white" />
                WhatsApp 1
              </a>
              <a href="https://wa.me/919004298911?text=Hi!%20I'd%20like%20to%20discuss%20a%20project."
                target="_blank" rel="noopener noreferrer"
                className="btn-outline flex-1 justify-center gap-2 group">
                <WhatsAppLogo className="w-5 h-5 fill-[#F97316] group-hover:fill-current" />
                WhatsApp 2
              </a>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div className="lg:col-span-3 animate-on-scroll">
            <div className="card p-8">
              <h3 className="font-display text-2xl text-white mb-2">Send Us a Message</h3>
              <p className="text-slate-400 text-sm mb-6">
                Fill in the form below and your message will be saved directly to our system.
                We'll call you back within 24 hours.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-slate-300 text-xs font-medium mb-1.5">
                      Full Name *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      placeholder="e.g. Rajesh Sharma"
                      className="form-input"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-slate-300 text-xs font-medium mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      {...register('phone', {
                        required: 'Phone is required',
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message: 'Enter a valid 10-digit mobile number',
                        },
                      })}
                      placeholder="e.g. 8779391690"
                      className="form-input"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 text-xs font-medium mb-1.5">
                    Email Address *
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    type="email"
                    placeholder="you@example.com"
                    className="form-input"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Service */}
                <div>
                  <label className="block text-slate-300 text-xs font-medium mb-1.5">
                    Service Required *
                  </label>
                  <select
                    {...register('service', { required: 'Please select a service' })}
                    className="form-input appearance-none"
                  >
                    <option value="">Select a service…</option>
                    <option>Bungalow Construction</option>
                    <option>Bathroom Renovation</option>
                    <option>Kitchen Work</option>
                    <option>Tiles Work</option>
                    <option>Flooring Work</option>
                    <option>POP Work</option>
                    <option>Wall Work</option>
                    <option>Plaster Work</option>
                    <option>Other / General Enquiry</option>
                  </select>
                  {errors.service && (
                    <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-slate-300 text-xs font-medium mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    {...register('message', { required: 'Please describe your project' })}
                    rows={5}
                    placeholder="Tell us about your project — location, size, timeline, budget, etc."
                    className="form-input resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Honeypot Field */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label htmlFor="websiteUrl">Website URL</label>
                  <input
                    {...register('websiteUrl')}
                    type="text"
                    id="websiteUrl"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* DPDP Consent */}
                <div className="flex items-start gap-3 mt-2">
                  <input 
                    type="checkbox" 
                    id="dpdpConsentContact"
                    {...register('dpdpConsent', { required: 'You must consent to data processing' })}
                    className="mt-1 accent-orange-500 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="dpdpConsentContact" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
                    I agree to the <a href="/privacy" target="_blank" className="text-orange-400 hover:underline">Privacy Policy</a> and consent to receive construction estimates and project updates.
                  </label>
                </div>
                {errors.dpdpConsent && (
                  <p className="text-red-400 text-xs mt-0">{errors.dpdpConsent.message as string}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin1" />
                      Sending to database…
                    </>
                  ) : (
                    <>
                      <Send size={17} />
                      Send Message
                    </>
                  )}
                </button>

                {/* Reassurance note */}
                <p className="flex items-center gap-2 text-slate-500 text-xs">
                  <CheckCircle size={13} style={{ color: '#10B981' }} />
                  Your message is saved securely and only visible to authorized personnel.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
