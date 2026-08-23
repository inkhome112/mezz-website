'use client';

import { motion } from 'framer-motion';
import { Check, Compass, ShieldCheck, Sparkles, Sliders, HeartHandshake } from 'lucide-react';

export default function AboutSection({ about }) {
  const principles = about?.principles || [
    {
      title: 'Thoughtful Design Alignment',
      description: 'Designs tailored precisely to align with client goals and site context.',
      icon: Compass,
    },
    {
      title: 'Aesthetic & Functional Balance',
      description: 'Sculptural architectural forms paired with effortless daily living flow.',
      icon: Sliders,
    },
    {
      title: 'Effective Spatial Utilization',
      description: 'Optimizing spaces for ample natural light without compromising aesthetics.',
      icon: Sparkles,
    },
    {
      title: 'Collaborative Delivery Support',
      description: 'Continuous engagement with consultants and clients through final handover.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="about" className="py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
        {/* Left Column Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 flex flex-col justify-center"
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Melbourne Studio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white leading-tight mb-6">
            Innovative, Contextual & Architectural Excellence.
          </h2>

          <p className="text-neutral-300 font-light text-base md:text-lg leading-relaxed mb-6">
            Mezz Group is an innovative Melbourne-based architectural and property development studio.
            We specialize in bespoke residential developments—including multi-level townhouses and medium-rise residences—as well as premier commercial and hospitality fitouts.
          </p>

          <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed mb-8">
            We carefully analyze our clients' brief and site orientation to formulate custom design solutions that maximize natural light, celebrate heritage character, and introduce contemporary elegance.
          </p>

          <div className="flex items-center gap-8 pt-6 border-t border-neutral-800">
            <div>
              <div className="text-2xl font-serif text-[#DFC29A]">Melbourne VIC</div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 mt-0.5">Ashburton HQ</div>
            </div>
            <div className="w-[1px] h-10 bg-neutral-800" />
            <div>
              <div className="text-2xl font-serif text-white">Full-Service</div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 mt-0.5">Concept to Handover</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column Image Stack */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 relative"
        >
          <div className="relative rounded-2xl overflow-hidden glass-panel border border-neutral-800 shadow-2xl">
            <img
              src="https://www.mezzgroup.com.au/wp-content/uploads/2022/07/new.jpg"
              alt="Mezz Group Studio"
              className="w-full h-[450px] md:h-[520px] object-cover filter contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl glass-panel border border-white/10">
              <div className="text-xs uppercase tracking-widest text-[#DFC29A]">Mezz Group Philosophy</div>
              <div className="text-base md:text-lg font-serif text-white mt-1">
                "Designs that are not only striking, but deeply functional."
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Core Principles Grid */}
      <div id="philosophy" className="pt-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-2">Our Foundation</div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white">Key Focus Areas</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl glass-panel border border-neutral-800/80 hover:border-[#C5A880]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#C5A880]/10 flex items-center justify-center text-[#C5A880] mb-5 group-hover:scale-110 transition-transform">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-base font-serif text-white mb-2 group-hover:text-[#DFC29A] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
