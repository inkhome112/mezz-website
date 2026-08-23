'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, LayoutDashboard, Images, MapPin, Sparkles } from 'lucide-react';
import LightboxModal from '../LightboxModal';

export default function CinematicView({ projects = [], company }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const heroSlides = projects.slice(0, 4);

  const nextSlide = () => {
    setSlideIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleOpenLightbox = (p) => {
    setSelectedProject(p);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-[#080B0E] text-white min-h-screen font-sans selection:bg-emerald-400 selection:text-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#080B0E]/80 backdrop-blur-xl border-b border-white/10 py-5 px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl font-serif tracking-[0.25em] uppercase text-white font-bold">
            MEZZ
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-emerald-400 font-mono">
            CINEMATIC
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs uppercase tracking-wider flex items-center gap-2"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
            <span>CMS Studio</span>
          </Link>
          <a
            href="#contact"
            className="px-5 py-2 rounded-full bg-emerald-400 text-black font-semibold text-xs uppercase tracking-wider hover:bg-emerald-300 transition-colors"
          >
            Inquire
          </a>
        </div>
      </header>

      {/* Fullscreen Horizon Hero Slider */}
      <section className="relative h-screen w-full overflow-hidden flex items-end pb-24 px-6 md:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={heroSlides[slideIndex]?.heroImage}
              alt={heroSlides[slideIndex]?.title}
              className="w-full h-full object-cover filter brightness-[0.4]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080B0E] via-black/30 to-black/60" />
          </motion.div>
        </AnimatePresence>

        {/* Slide Info */}
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{heroSlides[slideIndex]?.category} Showcase 0{slideIndex + 1}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white font-normal mb-4 leading-tight">
            {heroSlides[slideIndex]?.title}
          </h1>

          <p className="text-base sm:text-xl text-neutral-300 font-light max-w-2xl leading-relaxed mb-8">
            {heroSlides[slideIndex]?.subtitle} — {heroSlides[slideIndex]?.location}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleOpenLightbox(heroSlides[slideIndex])}
              className="px-8 py-3.5 rounded-full bg-emerald-400 text-black font-semibold text-xs uppercase tracking-[0.15em] flex items-center gap-2 hover:bg-emerald-300 transition-colors"
            >
              <span>Explore Gallery</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 right-6 md:right-16 z-20 flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="p-3.5 rounded-full bg-black/60 border border-white/15 text-white hover:bg-white/10 backdrop-blur-md transition-all"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-3.5 rounded-full bg-black/60 border border-white/15 text-white hover:bg-white/10 backdrop-blur-md transition-all"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Horizontal Project Showcase Strip */}
      <section className="py-24 px-6 md:px-16 border-t border-white/10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-emerald-400">All Developments</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white mt-1">
              Architectural Works
            </h2>
          </div>
          <span className="text-xs text-neutral-400">{projects.length} Total Projects</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => handleOpenLightbox(proj)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-emerald-400/50 transition-all p-4 flex flex-col justify-between"
            >
              <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                <img
                  src={proj.heroImage}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] uppercase tracking-wider text-emerald-400">
                  {proj.category}
                </div>
              </div>

              <div>
                <div className="text-xs text-neutral-400 uppercase tracking-wider">{proj.subtitle}</div>
                <h3 className="text-xl font-serif text-white mt-0.5 group-hover:text-emerald-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light mt-2 line-clamp-2">
                  {proj.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-500">
                <span>{proj.location}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  View Photos ({proj.images?.length || 1}) →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <LightboxModal
        project={selectedProject}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 md:px-16 text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>Mezz Group — 252 High Street, Ashburton VIC 3147</div>
        <div>Melbourne Architectural Studio</div>
      </footer>
    </div>
  );
}
