'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Images, ArrowUpRight, Calendar, Sparkles, Eye } from 'lucide-react';
import Link from 'next/link';

export default function ProjectCard({ project, onOpenLightbox }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const imageCount = project.images ? project.images.length : 1;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-2xl overflow-hidden glass-panel border border-neutral-800/80 hover:border-[#C5A880]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#C5A880]/5"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Image Container */}
      <div className="relative h-80 sm:h-96 w-full overflow-hidden">
        <Link href={`/projects/${project.slug}`} className="block w-full h-full">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover object-center transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-108 filter brightness-[0.9] group-hover:brightness-100"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[#DFC29A] text-[11px] uppercase tracking-[0.2em] font-medium">
            {project.category}
          </span>
          <button
            onClick={() => onOpenLightbox(project, 0)}
            className="px-3 py-1 rounded-full bg-black/70 hover:bg-black backdrop-blur-md border border-white/15 hover:border-[#C5A880] text-neutral-300 hover:text-white text-xs flex items-center gap-1.5 transition-all"
            title="Open Quick Photo Lightbox"
          >
            <Images className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{imageCount} Photos</span>
          </button>
        </div>

        {/* Floating Magnetic Hover Indicator */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
            x: mousePos.x - 70,
            y: mousePos.y - 20,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="pointer-events-none absolute top-0 left-0 z-30 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5A880] text-black font-medium text-xs tracking-wider uppercase shadow-2xl"
        >
          <span>Explore Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </motion.div>

        {/* Bottom Card Title Overlay */}
        <div className="absolute bottom-4 left-5 right-5 z-10 pointer-events-none">
          <div className="text-xs uppercase tracking-widest text-[#DFC29A] font-light mb-1">
            {project.subtitle}
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-white group-hover:text-[#DFC29A] transition-colors duration-300">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#141417]/80 to-[#0F0F12]">
        <p className="text-sm text-neutral-400 font-light leading-relaxed line-clamp-3 mb-6">
          {project.description}
        </p>

        {/* Meta Grid */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{project.location}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{project.year}</span>
          </div>
        </div>

        {/* Prominent Two-Tier Action Bar */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="flex-1 py-3 px-4 rounded-xl bg-[#C5A880] hover:bg-[#DFC29A] text-black font-medium text-xs tracking-[0.15em] uppercase text-center flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-[#C5A880]/15 hover:shadow-[#C5A880]/30 hover:scale-[1.01]"
          >
            <span>View Project Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => onOpenLightbox(project, 0)}
            className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 hover:border-[#C5A880] text-neutral-300 hover:text-white text-xs flex items-center gap-1.5 transition-all flex-shrink-0"
            title="Open Quick Photo Gallery"
          >
            <Images className="w-4 h-4 text-[#C5A880]" />
            <span className="hidden sm:inline">Gallery</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
