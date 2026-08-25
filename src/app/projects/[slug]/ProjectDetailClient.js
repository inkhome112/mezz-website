'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Building, Sparkles, Check, Images, Maximize2 } from 'lucide-react';
import LightboxModal from '@/components/LightboxModal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProjectDetailClient({ project, theme = 'noir' }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const handleImageClick = (idx) => {
    setSelectedPhotoIndex(idx);
    setLightboxOpen(true);
  };

  const isMinimalist = theme === 'minimalist';
  const isCinematic = theme === 'cinematic';

  return (
    <div className={`min-h-screen ${
      isMinimalist 
        ? 'bg-[#FAF9F5] text-[#121212]' 
        : isCinematic 
          ? 'bg-[#05080A] text-[#F0FDF4]' 
          : 'bg-[#0A0A0B] text-[#F7F6F2]'
    }`}>
      {/* Navigation Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-5 ${
        isMinimalist 
          ? 'bg-[#FAF9F5]/90 backdrop-blur-md border-b border-neutral-200' 
          : 'bg-black/85 backdrop-blur-md border-b border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <span className={`text-2xl font-serif tracking-[0.25em] uppercase ${
              isMinimalist ? 'text-black' : 'text-white group-hover:text-[#DFC29A]'
            }`}>
              Mezz
            </span>
          </Link>

          <Link
            href="/#projects"
            className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium px-4 py-2 rounded-full transition-all ${
              isMinimalist 
                ? 'bg-black text-white hover:bg-neutral-800' 
                : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-[#C5A880]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Projects</span>
          </Link>
        </div>
      </header>

      <div className="pt-32 pb-32">
        {/* Hero Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
            <div className="lg:col-span-8">
              <div className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] mb-3 font-medium ${
                isMinimalist ? 'text-neutral-500' : isCinematic ? 'text-emerald-400' : 'text-[#C5A880]'
              }`}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{project.category} Architecture</span>
              </div>
              <h1 className={`text-4xl sm:text-6xl font-serif font-normal mb-4 ${
                isMinimalist ? 'text-black' : 'text-white'
              }`}>
                {project.title}
              </h1>
              <p className={`text-lg sm:text-xl font-light max-w-2xl ${
                isMinimalist ? 'text-neutral-600' : 'text-neutral-300'
              }`}>
                {project.subtitle}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
              <button
                onClick={() => handleImageClick(0)}
                className={`px-6 py-3 rounded-full font-medium text-xs tracking-[0.15em] uppercase transition-all flex items-center gap-2 shadow-lg ${
                  isMinimalist
                    ? 'bg-black text-white hover:bg-neutral-800'
                    : isCinematic
                      ? 'bg-emerald-400 text-black hover:bg-emerald-300'
                      : 'bg-[#C5A880] hover:bg-[#DFC29A] text-black shadow-[#C5A880]/15'
                }`}
              >
                <Images className="w-4 h-4" />
                <span>Photos ({project.images?.length || 1})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Full-Bleed Featured Hero Image */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
          <div
            className={`relative h-[380px] sm:h-[580px] w-full rounded-3xl overflow-hidden shadow-2xl cursor-pointer group border ${
              isMinimalist ? 'border-neutral-200 bg-neutral-100' : 'border-neutral-800 bg-neutral-950'
            }`}
            onClick={() => handleImageClick(0)}
          >
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 right-5 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs flex items-center gap-2">
              <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Click to Expand</span>
            </div>
          </div>
        </div>

        {/* Details & Specifications Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Overview & Features */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className={`text-xs uppercase tracking-[0.2em] font-medium mb-4 ${
                  isMinimalist ? 'text-neutral-500' : 'text-[#C5A880]'
                }`}>
                  Project Overview
                </h2>
                <p className={`text-base sm:text-lg font-light leading-relaxed ${
                  isMinimalist ? 'text-neutral-700' : 'text-neutral-300'
                }`}>
                  {project.description}
                </p>
              </div>

              {project.features && (
                <div className={`pt-6 border-t ${isMinimalist ? 'border-neutral-200' : 'border-neutral-800'}`}>
                  <h3 className={`text-xs uppercase tracking-[0.2em] font-medium mb-6 ${
                    isMinimalist ? 'text-neutral-900' : 'text-[#DFC29A]'
                  }`}>
                    Design Highlights & Key Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border flex items-start gap-3 ${
                          isMinimalist 
                            ? 'bg-white border-neutral-200 shadow-sm' 
                            : 'glass-panel border-neutral-800'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg mt-0.5 ${
                          isMinimalist ? 'bg-neutral-100 text-black' : 'bg-[#C5A880]/10 text-[#C5A880]'
                        }`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className={`text-xs leading-relaxed ${
                          isMinimalist ? 'text-neutral-700' : 'text-neutral-300'
                        }`}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Project Specifications Sidebar */}
            <div className="lg:col-span-5">
              <div className={`p-8 rounded-3xl border space-y-6 ${
                isMinimalist ? 'bg-white border-neutral-200 shadow-sm' : 'glass-panel border-neutral-800'
              }`}>
                <h3 className={`text-xs uppercase tracking-[0.2em] font-medium pb-4 border-b ${
                  isMinimalist ? 'text-neutral-900 border-neutral-200' : 'text-[#DFC29A] border-neutral-800'
                }`}>
                  Project Specifications
                </h3>

                {project.location && (
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl border ${
                      isMinimalist ? 'bg-neutral-100 border-neutral-200 text-black' : 'bg-neutral-900 text-[#C5A880] border-neutral-800'
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 uppercase tracking-wider">Location</div>
                      <div className={`text-sm font-medium mt-0.5 ${isMinimalist ? 'text-black' : 'text-white'}`}>
                        {project.location}
                      </div>
                    </div>
                  </div>
                )}

                {project.year && (
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl border ${
                      isMinimalist ? 'bg-neutral-100 border-neutral-200 text-black' : 'bg-neutral-900 text-[#C5A880] border-neutral-800'
                    }`}>
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 uppercase tracking-wider">Completion Year</div>
                      <div className={`text-sm font-medium mt-0.5 ${isMinimalist ? 'text-black' : 'text-white'}`}>
                        {project.year}
                      </div>
                    </div>
                  </div>
                )}

                {project.client && (
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl border ${
                      isMinimalist ? 'bg-neutral-100 border-neutral-200 text-black' : 'bg-neutral-900 text-[#C5A880] border-neutral-800'
                    }`}>
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 uppercase tracking-wider">Client / Developer</div>
                      <div className={`text-sm font-medium mt-0.5 ${isMinimalist ? 'text-black' : 'text-white'}`}>
                        {project.client}
                      </div>
                    </div>
                  </div>
                )}

                <div className={`pt-6 border-t ${isMinimalist ? 'border-neutral-200' : 'border-neutral-800'}`}>
                  <Link
                    href="/#contact"
                    className={`w-full py-3.5 rounded-full font-medium text-xs tracking-[0.15em] uppercase text-center block transition-all shadow-md ${
                      isMinimalist
                        ? 'bg-black hover:bg-neutral-800 text-white'
                        : isCinematic
                          ? 'bg-emerald-400 text-black hover:bg-emerald-300'
                          : 'bg-[#C5A880] hover:bg-[#DFC29A] text-black'
                    }`}
                  >
                    Enquire for Similar Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className={`flex items-center justify-between mb-8 pb-4 border-b ${
            isMinimalist ? 'border-neutral-200' : 'border-neutral-800'
          }`}>
            <div>
              <div className={`text-xs uppercase tracking-[0.2em] ${
                isMinimalist ? 'text-neutral-500' : 'text-[#C5A880]'
              }`}>
                High-Resolution Showcase
              </div>
              <h2 className={`text-2xl sm:text-3xl font-serif mt-1 ${
                isMinimalist ? 'text-black' : 'text-white'
              }`}>
                Architectural Gallery
              </h2>
            </div>
            <span className={`text-xs ${isMinimalist ? 'text-neutral-500' : 'text-neutral-400'}`}>
              {project.images?.length || 0} Photographs
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.images?.map((img, idx) => (
              <div
                key={idx}
                onClick={() => handleImageClick(idx)}
                className={`relative h-72 rounded-2xl overflow-hidden cursor-pointer group shadow-md border ${
                  isMinimalist ? 'border-neutral-200 bg-white' : 'glass-panel border-neutral-800'
                }`}
              >
                <img
                  src={img}
                  alt={`${project.title} photograph ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity text-white">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        project={project}
        initialIndex={selectedPhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      {/* Footer */}
      <footer className={`py-12 px-6 md:px-12 border-t text-xs flex flex-col sm:flex-row items-center justify-between gap-4 ${
        isMinimalist 
          ? 'bg-[#FAF9F5] border-neutral-200 text-neutral-500' 
          : 'bg-[#0A0A0B] border-neutral-900 text-neutral-400'
      }`}>
        <div>Mezz Group — 252 High Street, Ashburton VIC 3147</div>
        <div>Melbourne Architectural Studio</div>
      </footer>
    </div>
  );
}
