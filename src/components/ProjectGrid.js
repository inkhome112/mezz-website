'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Sparkles, Plus, LayoutDashboard } from 'lucide-react';
import ProjectCard from './ProjectCard';
import LightboxModal from './LightboxModal';
import Link from 'next/link';

export default function ProjectGrid({ projects = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const categories = ['All', 'Residential', 'Hospitality', 'Childcare'];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter(
          (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
        );

  const handleOpenLightbox = (project, idx = 0) => {
    setSelectedProject(project);
    setSelectedPhotoIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <section id="projects" className="py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white">
            Featured Developments
          </h2>
        </div>

        {/* Category Filter Pills (60fps layout animation) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'text-black'
                  : 'text-neutral-400 hover:text-white border border-neutral-800 bg-neutral-900/50'
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategoryBg"
                  className="absolute inset-0 rounded-full bg-[#C5A880] -z-10 shadow-lg shadow-[#C5A880]/20"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transform-gpu">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenLightbox={handleOpenLightbox}
          />
        ))}
      </div>



      {/* Full-Screen Lightbox Modal */}
      <LightboxModal
        project={selectedProject}
        initialIndex={selectedPhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
