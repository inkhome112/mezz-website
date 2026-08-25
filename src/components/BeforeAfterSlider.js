'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Layers, SlidersHorizontal } from 'lucide-react';

const transformations = [
  {
    id: 'coppin',
    title: 'Coppin Estate',
    subtitle: 'Gascoigne Estate, Malvern East VIC',
    category: 'Heritage Restoration & Modern Extension',
    beforeLabel: 'Original Heritage Structure',
    afterLabel: 'Completed Luxury Extension',
    beforeImage: 'https://www.mezzgroup.com.au/wp-content/uploads/2026/01/image-62.jpg',
    afterImage: 'https://www.mezzgroup.com.au/wp-content/uploads/2026/01/01823483_img_08_1600x-1.jpg',
    description: 'Transforming a solid-brick Edwardian period residence into an ultra-modern family sanctuary featuring Verde marble benchtops, custom linear fireplaces, and expansive full-height garden glass.',
    details: [
      'Preserved ornate ceiling roses and colonial timber craftsmanship',
      'Engineered seamless indoor-outdoor transition to landscaped rear',
      'Custom Verde marble joinery and architectural lighting'
    ]
  },
  {
    id: 'tennyson',
    title: 'Tennyson Residence',
    subtitle: 'Malvern East VIC',
    category: 'Contemporary Architecture & Spatial Sculpting',
    beforeLabel: 'Passive Solar Concept',
    afterLabel: 'Completed Architectural Residence',
    beforeImage: 'https://www.mezzgroup.com.au/wp-content/uploads/2022/05/untitled-3227-编辑-1-1024x683-1.jpg',
    afterImage: 'https://www.mezzgroup.com.au/wp-content/uploads/2022/05/K1600_a7r-1467-1024x683-1.jpg',
    description: 'A bespoke double-storey architectural residence designed to capture east-west natural daylight with an overhanging upper floor and signature sculptural curved staircase.',
    details: [
      'Signature curved continuous sculptural staircase',
      'Dark timber cladding providing passive thermal screening',
      'Double-height glazing and ambient skylights'
    ]
  },
  {
    id: 'ivori',
    title: 'Ivori Townhouses',
    subtitle: 'Glen Iris VIC',
    category: 'Multi-Residential Development',
    beforeLabel: 'Spatial Planning Renders',
    afterLabel: 'Completed 8 Townhouse Landmark',
    beforeImage: 'https://www.mezzgroup.com.au/wp-content/uploads/2022/05/ivori-kitchen-lights-on-5K-edited-1536x1025-1.jpg',
    afterImage: 'https://www.mezzgroup.com.au/wp-content/uploads/2022/05/ivori-exterior-closeup-5K-edited-1536x1536-1.jpg',
    description: 'Eight boutique luxury townhouses celebrating light-filled open layouts, natural stone kitchens, and private landscaped courtyards.',
    details: [
      '8 multi-level boutique townhomes',
      'Seamless material palette of stone, timber, and matte metal',
      'Integrated private courtyard entertainment zones'
    ]
  }
];

export default function BeforeAfterSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const activeItem = transformations[activeIdx];

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  return (
    <section id="transformations" className="py-28 px-6 md:px-12 bg-[#070709] border-t border-neutral-900 text-white relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 rounded-full bg-[#C5A880]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-[#C5A880]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs uppercase tracking-[0.2em] mb-4">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Architectural Transformations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
              Before & After <br />
              <span className="italic font-light text-neutral-400">Master Craftsmanship.</span>
            </h2>
          </div>

          {/* Project Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 backdrop-blur-md">
            {transformations.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveIdx(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all ${
                  activeIdx === idx
                    ? 'bg-[#C5A880] text-black font-semibold shadow-lg shadow-[#C5A880]/20'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Split Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Slider Visual Column */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onTouchStart={handleMouseDown}
              onTouchMove={handleTouchMove}
              className="relative h-[420px] sm:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 cursor-ew-resize select-none bg-neutral-950"
            >
              {/* After Image (Full Base) */}
              <img
                src={activeItem.afterImage}
                alt={activeItem.afterLabel}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              />

              {/* Before Image (Clipped Left Layer) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeItem.beforeImage}
                  alt={activeItem.beforeLabel}
                  className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
                  style={{
                    width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                    height: '100%',
                  }}
                />
              </div>

              {/* Badges on Top of Images */}
              <div className="absolute top-5 left-5 z-20 pointer-events-none">
                <span className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-xs text-neutral-300 uppercase tracking-widest font-medium">
                  {activeItem.beforeLabel}
                </span>
              </div>
              <div className="absolute top-5 right-5 z-20 pointer-events-none">
                <span className="px-3 py-1.5 rounded-full bg-[#C5A880]/90 backdrop-blur-md border border-[#DFC29A]/40 text-xs text-black uppercase tracking-widest font-semibold">
                  {activeItem.afterLabel}
                </span>
              </div>

              {/* Interactive Divider Line */}
              <div
                className="absolute top-0 bottom-0 z-30 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Vertical Glowing Line */}
                <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-[#C5A880] shadow-[0_0_15px_#C5A880]" />

                {/* Draggable Handle Button */}
                <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-12 h-12 rounded-full bg-[#C5A880] text-black shadow-2xl flex items-center justify-center font-bold text-xs pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform border-2 border-white">
                  <span className="tracking-tighter">⟨ ⟩</span>
                </div>
              </div>

              {/* Bottom Instruction Pill */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-[11px] text-neutral-400 uppercase tracking-wider border border-white/10">
                Drag slider to compare transformation
              </div>
            </div>
          </div>

          {/* Context & Transformation Details Column */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#C5A880] mb-2 font-medium">
                {activeItem.category}
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-white mb-2">
                {activeItem.title}
              </h3>
              <p className="text-xs text-neutral-400 uppercase tracking-widest mb-6">
                {activeItem.subtitle}
              </p>
              <p className="text-sm text-neutral-300 font-light leading-relaxed mb-8">
                {activeItem.description}
              </p>

              {/* Highlights Checklist */}
              <div className="space-y-3 pt-6 border-t border-neutral-800">
                <h4 className="text-xs uppercase tracking-widest text-[#DFC29A] font-medium mb-3">
                  Scope Highlights
                </h4>
                {activeItem.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-light">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-1.5 flex-shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <a
                href={`/projects/${activeItem.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C5A880] hover:bg-[#DFC29A] text-black font-medium text-xs uppercase tracking-[0.15em] transition-all shadow-lg shadow-[#C5A880]/15"
              >
                <span>View Full Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
