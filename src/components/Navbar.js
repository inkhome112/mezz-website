'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Transformations', href: '#transformations' },
    { name: 'About', href: '#about' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-nav py-4 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-serif tracking-[0.25em] text-white uppercase group-hover:text-[#DFC29A] transition-colors duration-300">
                MEZZ
              </span>
              <span className="text-[10px] tracking-[0.4em] text-[#C5A880] uppercase -mt-1 font-sans font-light">
                GROUP
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-neutral-300 hover:text-[#DFC29A] transition-colors duration-200 relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full bg-[#C5A880] hover:bg-[#DFC29A] text-black font-medium text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 shadow-lg shadow-[#C5A880]/10 hover:shadow-[#C5A880]/30 hover:scale-[1.02]"
            >
              <span>Enquire</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-200 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-28 px-8 flex flex-col justify-between pb-12 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#C5A880]">
                Navigation
              </span>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-serif text-white hover:text-[#DFC29A] transition-colors py-1 flex items-center justify-between border-b border-neutral-800/80"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-5 h-5 text-neutral-500" />
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4 border-t border-neutral-800 pt-6">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 text-center rounded-full bg-[#C5A880] text-black font-medium tracking-wider uppercase text-sm"
              >
                Enquire for Project
              </a>
              <div className="text-center text-xs text-neutral-500">
                252 High Street, Ashburton VIC 3147
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
