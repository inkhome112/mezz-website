'use client';

import { useState, useEffect } from 'react';
import { Palette, Check, Sparkles, Moon, Sun, Film, Grid3X3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const themes = [
  {
    id: 'noir',
    name: 'Noir Atelier',
    tagline: 'Dark Luxury & Champagne Gold',
    description: 'Deep obsidian background with warm champagne gold accents and glassmorphism. Perfect for high-end luxury property developers.',
    icon: Moon,
    badgeColor: 'bg-[#C5A880] text-black',
    previewBg: 'bg-[#0A0A0B] text-white border-[#C5A880]/30',
  },
  {
    id: 'minimalist',
    name: 'Editorial Gallery',
    tagline: 'Clean Off-White & Minimalist Architecture',
    description: 'Crisp warm ivory aesthetic with bold architectural typography, high-contrast imagery, and art-gallery curation.',
    icon: Sun,
    badgeColor: 'bg-black text-white',
    previewBg: 'bg-[#F9F8F5] text-neutral-900 border-neutral-300',
  },
  {
    id: 'cinematic',
    name: 'Horizon Cinematic',
    tagline: 'Full-Screen Visual Showcase & Horizon Slider',
    description: 'Ultra-wide horizontal project reel with dramatic photo headers, architectural line grids, and magazine-style layout.',
    icon: Film,
    badgeColor: 'bg-emerald-400 text-black',
    previewBg: 'bg-[#0C0F12] text-white border-emerald-500/30',
  },
];

export default function ThemeSwitcher({ currentTheme, onSelectTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 sm:w-96 p-5 rounded-3xl glass-panel border border-white/15 bg-black/95 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#C5A880]" />
                <h4 className="text-xs uppercase tracking-[0.2em] text-white font-medium">
                  Select Design Style
                </h4>
              </div>
              <span className="text-[10px] text-neutral-400">3 Options Available</span>
            </div>

            <div className="space-y-3">
              {themes.map((t) => {
                const Icon = t.icon;
                const isSelected = currentTheme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      onSelectTheme(t.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'border-[#C5A880] bg-white/5 shadow-lg shadow-[#C5A880]/10'
                        : 'border-white/5 hover:border-white/20 bg-black/40'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-xl mt-0.5 ${
                          isSelected ? 'bg-[#C5A880] text-black' : 'bg-neutral-800 text-neutral-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">{t.name}</span>
                          {isSelected && (
                            <span className="px-2 py-0.5 rounded-full bg-[#C5A880]/20 text-[#DFC29A] text-[9px] uppercase tracking-wider">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#DFC29A] font-light mt-0.5">
                          {t.tagline}
                        </div>
                        <div className="text-[10px] text-neutral-400 font-light mt-1 line-clamp-2">
                          {t.description}
                        </div>
                      </div>
                    </div>

                    {isSelected && <Check className="w-4 h-4 text-[#C5A880] mt-1 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="px-5 py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#DFC29A] text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2.5 shadow-2xl shadow-[#C5A880]/30 hover:shadow-[#C5A880]/50 transition-all border border-white/20"
      >
        <Palette className="w-4 h-4" />
        <span>Switch Design Option ({themes.find((t) => t.id === currentTheme)?.name})</span>
      </motion.button>
    </div>
  );
}
