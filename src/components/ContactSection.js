'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection({ contact }) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate instant sending
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#C5A880', '#DFC29A', '#FFFFFF'],
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Office & Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Project Inquiries</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white leading-tight mb-6">
              Let's Discuss Your Next Development.
            </h2>
            <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed mb-10">
              Whether you are planning a residential townhouse project, a heritage extension, or a commercial fitout, our team is ready to assist from initial concept to completion.
            </p>

            <div className="flex flex-col gap-6">
              {/* Visit Us */}
              <div className="flex items-start gap-4 p-5 rounded-2xl glass-panel border border-neutral-800/80">
                <div className="p-3 rounded-xl bg-[#C5A880]/10 text-[#C5A880]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#DFC29A] font-light">Visit Us</div>
                  <div className="text-sm font-medium text-white mt-1">252 High Street, Ashburton</div>
                  <div className="text-xs text-neutral-400">VIC 3147, Melbourne Australia</div>
                </div>
              </div>

              {/* Call Us */}
              <a
                href="tel:0433124797"
                className="flex items-start gap-4 p-5 rounded-2xl glass-panel border border-neutral-800/80 hover:border-[#C5A880]/40 transition-colors group"
              >
                <div className="p-3 rounded-xl bg-[#C5A880]/10 text-[#C5A880] group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#DFC29A] font-light">Direct Phone</div>
                  <div className="text-sm font-medium text-white mt-1 group-hover:text-[#DFC29A] transition-colors">
                    0433 124 797
                  </div>
                  <div className="text-xs text-neutral-400">Office & Project Consultations</div>
                </div>
              </a>

              {/* Email Us */}
              <a
                href="mailto:info@mezzgroup.com.au"
                className="flex items-start gap-4 p-5 rounded-2xl glass-panel border border-neutral-800/80 hover:border-[#C5A880]/40 transition-colors group"
              >
                <div className="p-3 rounded-xl bg-[#C5A880]/10 text-[#C5A880] group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#DFC29A] font-light">Email Inquiries</div>
                  <div className="text-sm font-medium text-white mt-1 group-hover:text-[#DFC29A] transition-colors">
                    info@mezzgroup.com.au
                  </div>
                  <div className="text-xs text-neutral-400">Response within 24 business hours</div>
                </div>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-800 text-xs text-neutral-500 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C5A880]" />
            <span>Studio hours: Mon - Fri 9:00 AM - 5:30 PM</span>
          </div>
        </motion.div>

        {/* Right Column: Interactive Inquiry Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7"
        >
          <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-neutral-800 shadow-2xl relative overflow-hidden">
            {isSubmitted ? (
              <div className="py-16 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#C5A880]/10 border border-[#C5A880] flex items-center justify-center text-[#C5A880] mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-white mb-2">
                  Thank You for Your Inquiry
                </h3>
                <p className="text-neutral-400 text-sm max-w-md mb-8">
                  Our architecture and development team will review your project brief and get in touch with you shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormState({ name: '', email: '', phone: '', projectType: 'Residential', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-full border border-neutral-700 text-xs uppercase tracking-wider text-neutral-300 hover:text-white"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif text-white mb-1">
                    Send a Project Brief
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Fill out the details below and we will get back to you with a preliminary consultation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alexander Vance"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="alexander@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="0400 000 000"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                      Development Category
                    </label>
                    <select
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#C5A880] transition-colors"
                    >
                      <option value="Residential">Residential Townhouses / Homes</option>
                      <option value="Commercial">Commercial / Mixed-Use</option>
                      <option value="Hospitality">Hospitality & Restaurant Fitout</option>
                      <option value="Childcare">Childcare / Educational</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                    Project Location & Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us about your project scope, location, and timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#C5A880] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#C5A880] hover:bg-[#DFC29A] text-black font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-[#C5A880]/15 hover:shadow-[#C5A880]/30 hover:scale-[1.01]"
                >
                  {isSubmitting ? (
                    <span>Sending Brief...</span>
                  ) : (
                    <>
                      <span>Submit Project Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
