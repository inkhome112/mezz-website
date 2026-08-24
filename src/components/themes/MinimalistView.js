'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin, Calendar, LayoutDashboard, Plus, ChevronRight, Sparkles, Images } from 'lucide-react';
import LightboxModal from '../LightboxModal';

export default function MinimalistView({ projects = [], company }) {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const categories = ['All', 'Residential', 'Hospitality', 'Childcare'];

  const filtered =
    activeTab === 'All'
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === activeTab.toLowerCase());

  const handleOpenLightbox = (p, idx = 0) => {
    setSelectedProject(p);
    setSelectedPhotoIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-[#FBFBFA] text-[#141416] min-h-screen font-sans selection:bg-neutral-900 selection:text-white">
      {/* Editorial Header */}
      <header className="sticky top-0 z-40 bg-[#FBFBFA]/90 backdrop-blur-xl border-b border-[#E8E6DF] py-5 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif tracking-[0.2em] uppercase text-black font-semibold">
              MEZZ
            </span>
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-500 font-light">
              GROUP
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em] text-neutral-600">
            <a href="#projects" className="hover:text-black transition-colors">Portfolio</a>
            <a href="#about" className="hover:text-black transition-colors">Studio</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full bg-black text-white text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              Enquire
            </a>
          </div>
        </div>
      </header>

      {/* Split-Screen Editorial Hero */}
      <section className="border-b border-[#E8E6DF] py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-block px-3 py-1 rounded-full bg-neutral-200 text-neutral-700 text-[11px] uppercase tracking-widest mb-6">
              Melbourne Architecture & Development
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-black leading-[1.08] tracking-tight mb-8">
              Purity of Form. <br />
              <span className="italic text-neutral-600">Enduring Spaces.</span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 font-light max-w-xl leading-relaxed mb-8">
              We design and construct high-end residential townhouses and commercial landmarks that celebrate natural light, refined materials, and spatial harmony.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="px-8 py-3.5 rounded-full bg-black text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-colors"
              >
                View Works
              </a>
              <Link
                href={`/projects/${projects[0]?.slug || 'ivori'}`}
                className="px-8 py-3.5 rounded-full border border-neutral-300 text-neutral-800 text-xs uppercase tracking-[0.2em] font-medium hover:border-black transition-colors flex items-center gap-1.5"
              >
                <span>Featured Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <Link
              href={`/projects/${projects[0]?.slug || 'ivori'}`}
              className="block relative h-[480px] rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 group"
            >
              <img
                src={projects[0]?.heroImage || 'https://www.mezzgroup.com.au/wp-content/uploads/2022/05/ivori-living-closeup-5K-edited.jpg'}
                alt="Mezz Architecture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-neutral-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500">Featured Project</span>
                  <div className="text-base font-serif text-black font-medium">{projects[0]?.title} — {projects[0]?.location}</div>
                </div>
                <div className="p-2 rounded-full bg-black text-white group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="border-b border-[#E8E6DF] py-12 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {company?.stats?.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-serif text-black font-normal">{s.value}</span>
              <span className="text-xs uppercase tracking-wider text-neutral-500 mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Project List */}
      <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Selected Works</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-black mt-1">Portfolio Archive</h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveTab(c)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all ${
                  activeTab === c
                    ? 'bg-black text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Minimalist 2-Column Large Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filtered.map((proj, idx) => (
            <motion.div
              key={proj.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group flex flex-col"
            >
              {/* Image Container with Direct Link & Quick Gallery Action */}
              <div className="relative h-96 sm:h-[420px] rounded-2xl overflow-hidden mb-5 bg-neutral-200 border border-neutral-200">
                <Link href={`/projects/${proj.slug}`} className="block w-full h-full">
                  <img
                    src={proj.heroImage}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </Link>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs uppercase tracking-wider text-black font-medium border border-neutral-200">
                    {proj.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => handleOpenLightbox(proj, 0)}
                    className="px-3 py-1 rounded-full bg-black/80 hover:bg-black text-white text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg"
                    title="Quick Photo Gallery"
                  >
                    <Images className="w-3.5 h-3.5" />
                    <span>{proj.images?.length || 1} Photos</span>
                  </button>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link href={`/projects/${proj.slug}`}>
                    <h3 className="text-2xl sm:text-3xl font-serif text-black group-hover:underline underline-offset-4">
                      {proj.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1">
                    {proj.subtitle} • {proj.location}
                  </p>
                  <p className="text-sm text-neutral-600 font-light mt-3 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Prominent Action Links */}
                  <div className="mt-4 flex items-center gap-4">
                    <Link
                      href={`/projects/${proj.slug}`}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-medium transition-colors"
                    >
                      <span>View Project Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => handleOpenLightbox(proj, 0)}
                      className="text-xs uppercase tracking-wider text-neutral-600 hover:text-black font-medium flex items-center gap-1 transition-colors"
                    >
                      <span>Photos ({proj.images?.length || 1})</span>
                    </button>
                  </div>
                </div>

                <span className="text-sm font-serif text-neutral-400 font-light flex-shrink-0">
                  {proj.year}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-12 bg-white border-t border-[#E8E6DF]">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3 block">
            About Mezz Group
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-black leading-tight mb-8">
            "Thoughtful designs that are not only striking, but deeply functional."
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10">
            Based in Ashburton, Melbourne, Mezz Group collaborates with private clients and visionary developers to create timeless architectural residences and hospitality destinations.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3.5 rounded-full bg-black text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-colors"
          >
            Start a Conversation
          </a>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        project={selectedProject}
        initialIndex={selectedPhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      {/* Minimal Footer */}
      <footer id="contact" className="border-t border-[#E8E6DF] py-12 px-6 md:px-12 text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <div>© {new Date().getFullYear()} Mezz Group. 252 High Street, Ashburton VIC 3147.</div>
        <div className="flex items-center gap-6">
          <a href="tel:0433124797" className="hover:text-black">0433 124 797</a>
          <a href="mailto:info@mezzgroup.com.au" className="hover:text-black">info@mezzgroup.com.au</a>
        </div>
      </footer>
    </div>
  );
}
