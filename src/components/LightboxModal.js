'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, MapPin, Calendar, Building } from 'lucide-react';

export default function LightboxModal({ project, initialIndex = 0, isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, project]);

  if (!project || !project.images || project.images.length === 0) return null;

  const images = project.images;

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 md:p-8"
          onClick={onClose}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between z-20 pb-4 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880]">
                  {project.category}
                </span>
                <span className="text-xs text-neutral-500">•</span>
                <span className="text-xs text-neutral-400">
                  Photo {currentIndex + 1} of {images.length}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif text-white mt-0.5">
                {project.title} — {project.subtitle}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-[#C5A880] transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Central Image Viewport */}
          <div
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-6 z-30 p-3 md:p-4 rounded-full bg-black/60 border border-white/10 hover:border-[#C5A880] text-white backdrop-blur-md transition-all hover:scale-110"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-6 z-30 p-3 md:p-4 rounded-full bg-black/60 border border-white/10 hover:border-[#C5A880] text-white backdrop-blur-md transition-all hover:scale-110"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image with Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative max-w-full max-h-[70vh] flex items-center justify-center"
              >
                <img
                  src={images[currentIndex]}
                  alt={`${project.title} - photo ${currentIndex + 1}`}
                  className="max-h-[68vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/5"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Thumbnail Strip & Project Meta Info */}
          <div
            className="z-20 pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Project Details */}
            <div className="hidden lg:flex items-center gap-6 text-xs text-neutral-400">
              {project.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  {project.location}
                </span>
              )}
              {project.year && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                  {project.year}
                </span>
              )}
              {project.client && (
                <span className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-[#C5A880]" />
                  {project.client}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-14 h-10 md:w-16 md:h-12 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                    idx === currentIndex
                      ? 'border-[#C5A880] scale-105 opacity-100'
                      : 'border-transparent opacity-40 hover:opacity-80'
                  }`}
                >
                  <img
                    src={img}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
