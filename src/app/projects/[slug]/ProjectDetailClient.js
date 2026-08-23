'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Building, Sparkles, Check, Images, Maximize2 } from 'lucide-react';
import LightboxModal from '@/components/LightboxModal';

export default function ProjectDetailClient({ project }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const handleImageClick = (idx) => {
    setSelectedPhotoIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-28 pb-32">
      {/* Top Breadcrumb / Back Button */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-[#DFC29A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{project.category} Architecture</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif text-white font-normal mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-neutral-300 font-light max-w-2xl">
              {project.subtitle}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
            <button
              onClick={() => handleImageClick(0)}
              className="px-6 py-3 rounded-full bg-[#C5A880] hover:bg-[#DFC29A] text-black font-medium text-xs tracking-[0.15em] uppercase transition-all flex items-center gap-2"
            >
              <Images className="w-4 h-4" />
              <span>View All {project.images?.length || 1} Photos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full-Bleed Featured Image */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div
          className="relative h-[450px] sm:h-[600px] w-full rounded-3xl overflow-hidden glass-panel border border-neutral-800 shadow-2xl cursor-pointer group"
          onClick={() => handleImageClick(0)}
        >
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs flex items-center gap-2">
            <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Click to Expand Lightbox</span>
          </div>
        </div>
      </div>

      {/* Details & Specifications Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Overview & Features */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-medium mb-4">
                Project Overview
              </h2>
              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            {project.features && (
              <div className="pt-6 border-t border-neutral-800">
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#DFC29A] font-medium mb-6">
                  Design Highlights & Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl glass-panel border border-neutral-800 flex items-start gap-3"
                    >
                      <div className="p-1.5 rounded-lg bg-[#C5A880]/10 text-[#C5A880] mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs text-neutral-300 leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Project Specifications Sidebar */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl glass-panel border border-neutral-800 space-y-6">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#DFC29A] font-medium pb-4 border-b border-neutral-800">
                Project Specifications
              </h3>

              {project.location && (
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-neutral-900 text-[#C5A880] border border-neutral-800">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 uppercase tracking-wider">Location</div>
                    <div className="text-sm text-white font-medium mt-0.5">{project.location}</div>
                  </div>
                </div>
              )}

              {project.year && (
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-neutral-900 text-[#C5A880] border border-neutral-800">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 uppercase tracking-wider">Completion Year</div>
                    <div className="text-sm text-white font-medium mt-0.5">{project.year}</div>
                  </div>
                </div>
              )}

              {project.client && (
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-neutral-900 text-[#C5A880] border border-neutral-800">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 uppercase tracking-wider">Client / Developer</div>
                    <div className="text-sm text-white font-medium mt-0.5">{project.client}</div>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-neutral-800">
                <a
                  href="/#contact"
                  className="w-full py-3.5 rounded-full bg-[#C5A880] hover:bg-[#DFC29A] text-black font-medium text-xs tracking-[0.15em] uppercase text-center block transition-all"
                >
                  Enquire for Similar Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-800">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#C5A880]">High-Resolution Showcase</div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mt-1">
              Architectural Gallery
            </h2>
          </div>
          <span className="text-xs text-neutral-400">
            {project.images?.length || 0} Photographs
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.images?.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => handleImageClick(idx)}
              className="relative h-72 rounded-2xl overflow-hidden glass-panel border border-neutral-800 cursor-pointer group shadow-lg"
            >
              <img
                src={img}
                alt={`${project.title} photograph ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity text-[#C5A880]">
                <Maximize2 className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        project={project}
        initialIndex={selectedPhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
