'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Building2, Award } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0B]">
      {/* Background Image with Ambient Ken Burns Motion */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'easeOut' }}
          className="relative w-full h-full"
        >
          <img
            src="https://www.mezzgroup.com.au/wp-content/uploads/2022/05/ivori-living-closeup-5K-edited.jpg"
            alt="Mezz Group Architecture"
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1]"
          />
        </motion.div>
        {/* Subtle Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/80" />
      </div>

      {/* Decorative architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-15 max-w-7xl mx-auto px-6 grid grid-cols-4 md:grid-cols-6 h-full">
        <div className="border-r border-white/10 h-full" />
        <div className="border-r border-white/10 h-full hidden md:block" />
        <div className="border-r border-white/10 h-full" />
        <div className="border-r border-white/10 h-full hidden md:block" />
        <div className="border-r border-white/10 h-full" />
        <div className="h-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center pt-24 pb-16 flex flex-col items-center">
        {/* Top Luxury Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#C5A880]/30 text-[#DFC29A] text-xs uppercase tracking-[0.25em] mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Melbourne Architectural Studio</span>
        </motion.div>

        {/* Editorial Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-white tracking-tight leading-[1.15] mb-6"
        >
          Elevating Spaces.
          <span className="block mt-2 font-serif italic gold-gradient-text">
            Defining Modern Living.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Bespoke multi-level residential developments, boutique townhouses, and
          iconic commercial spaces crafted with architectural purity.
        </motion.p>

        {/* CTA Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C5A880] hover:bg-[#DFC29A] text-black font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-xl shadow-[#C5A880]/15 hover:shadow-[#C5A880]/30 hover:scale-[1.02]"
          >
            Explore Portfolio
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-neutral-700 bg-neutral-900/40 hover:bg-neutral-800/80 text-neutral-200 hover:text-white font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-md"
          >
            Our Philosophy
          </a>
        </motion.div>

        {/* Quick Highlights Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 mt-16 pt-10 border-t border-white/10 w-full max-w-3xl"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-serif text-white font-medium">8+ Multi-Townhouse</span>
            <span className="text-xs uppercase tracking-wider text-neutral-400 mt-1">Ivori Development</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-serif text-[#DFC29A] font-medium">$120M+</span>
            <span className="text-xs uppercase tracking-wider text-neutral-400 mt-1">Project Portfolio</span>
          </div>
          <div className="flex flex-col items-center col-span-2 md:col-span-1">
            <span className="text-2xl md:text-3xl font-serif text-white font-medium">Glen Iris & Malvern</span>
            <span className="text-xs uppercase tracking-wider text-neutral-400 mt-1">Prime Locations</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Cue */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 1.2 },
          y: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-neutral-400 hover:text-[#DFC29A] transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5" />
      </motion.a>
    </section>
  );
}
