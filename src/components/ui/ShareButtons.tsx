'use client';

import { useEffect, useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, Check, Send } from 'lucide-react';
import { WhatsAppLogo } from '@/components/ui/BrandIcons';
import toast from 'react-hot-toast';

interface ShareButtonsProps {
  title: string;
  variant?: 'inline' | 'compact';
}

export default function ShareButtons({ title, variant = 'inline' }: ShareButtonsProps) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleCopy = () => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2">
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center border border-emerald-500/20"
          title="Share via WhatsApp"
        >
          <WhatsAppLogo className="w-4 h-4 fill-current" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center border border-blue-500/20"
          title="Share on LinkedIn"
        >
          <Linkedin size={15} />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center border border-slate-700/60"
          title="Share on X"
        >
          <Twitter size={15} />
        </a>
        <button
          onClick={handleCopy}
          className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center border border-slate-700/60"
          title="Copy Link"
        >
          {copied ? <Check size={15} className="text-emerald-400" /> : <LinkIcon size={15} />}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#0F172A]/80 border border-[#1E2D45] backdrop-blur-md">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20">
          <Share2 size={16} />
        </div>
        <div>
          <p className="text-white text-sm font-semibold">Share this Article</p>
          <p className="text-slate-400 text-xs">Help your architect, contractor, or family make informed civil choices</p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all text-xs font-medium border border-emerald-500/20"
        >
          <WhatsAppLogo className="w-3.5 h-3.5 fill-current" /> WhatsApp
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-600 hover:text-white transition-all text-xs font-medium border border-blue-500/20"
        >
          <Linkedin size={14} /> LinkedIn
        </a>

        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-white hover:text-slate-900 transition-all text-xs font-medium border border-slate-700/60"
        >
          <Twitter size={14} /> X / Twitter
        </a>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-orange-500 hover:text-white transition-all text-xs font-medium border border-slate-700/60"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-400" /> Copied!
            </>
          ) : (
            <>
              <LinkIcon size={14} /> Copy Link
            </>
          )}
        </button>
      </div>
    </div>
  );
}
