'use client';

import { motion } from 'framer-motion';
import { Building2, Award, Users, CheckCircle2 } from 'lucide-react';

export default function StatsCounter({ stats = [] }) {
  const icons = [Building2, Award, Users, CheckCircle2];

  return (
    <section className="py-20 bg-gradient-to-b from-[#0A0A0B] via-[#111114] to-[#0A0A0B] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl glass-panel border border-neutral-800/60 hover:border-[#C5A880]/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C5A880]/10 flex items-center justify-center text-[#C5A880] mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-normal mb-2 gold-gradient-text">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-light">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
