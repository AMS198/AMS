// @ts-nocheck
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, PhoneCall } from 'lucide-react';
import { useChat } from '@ai-sdk/react';

/* ── Inner chat component — only mounted after first open ── */
function ChatWindow({ onClose }: { onClose: () => void }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Hello! Welcome to AMS Civil Construction. How can I help you today? Are you looking for a new bungalow, renovation, or something else?',
      }
    ]
  });

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Focus input on mount
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const handleWA = () => {
    window.open('https://wa.me/918779391690?text=Hi,%20I%20would%20like%20to%20book%20a%20site%20visit.', '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-24 right-4 sm:right-6 w-[350px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[70vh] bg-[#161F2E] border border-orange-500/20 rounded-2xl shadow-2xl shadow-orange-500/10 flex flex-col z-[100] overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B1120] to-[#161F2E] p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
              <Bot className="text-white" size={24} />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#161F2E] rounded-full"></span>
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">AMS Assistant (AI)</h3>
            <p className="text-orange-400 text-xs">Online | Replies instantly</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-slate-400 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0B1120]/50 scrollbar-thin">
        {messages.map((m: { id: string; role: string; content: string }) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400'}`}>
              {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>

            <div className={`flex flex-col gap-1 max-w-[75%] ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-sm'
                  : 'bg-[#161F2E] border border-white/5 text-slate-200 rounded-tl-sm'
              }`}>
                {m.content}
              </div>
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-orange-500/20 text-orange-400">
              <Bot size={16} />
            </div>
            <div className="bg-[#161F2E] border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-[#161F2E] border-t border-white/10">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder={isLoading ? 'AI is typing...' : 'Type your message...'}
            className="flex-1 bg-[#0B1120] border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} className="ml-1" />
          </button>
        </form>
        <div className="mt-2 text-center">
          <button onClick={handleWA} className="text-[10px] text-orange-400 hover:text-orange-300 flex items-center justify-center w-full gap-1">
            <PhoneCall size={10} /> Call +91 8779391690 directly
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main export — lazy-mounts ChatWindow only after first click ── */
export default function SmartBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false); // once true, ChatWindow stays in DOM

  const handleToggle = () => {
    if (!hasOpened) setHasOpened(true);
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <AnimatePresence>
        {/* Only mount ChatWindow after user has clicked once */}
        {hasOpened && isOpen && (
          <ChatWindow onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={handleToggle}
        className="fixed bottom-24 right-4 sm:right-6 w-14 h-14 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:scale-105 transition-all z-50 group"
      >
        {isOpen ? (
          <X size={28} className="animate-in fade-in zoom-in duration-300" />
        ) : (
          <MessageSquare size={28} className="animate-in fade-in zoom-in duration-300 group-hover:scale-110 transition-transform" />
        )}

        {/* Unread Badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-[#0B1120]">
            1
          </span>
        )}
      </button>
    </>
  );
}

