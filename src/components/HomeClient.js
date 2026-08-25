'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProjectGrid from '@/components/ProjectGrid';
import StatsCounter from '@/components/StatsCounter';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

// Views for Themes 2 and 3
import MinimalistView from '@/components/themes/MinimalistView';
import CinematicView from '@/components/themes/CinematicView';

export default function HomeClient({ projectsData, companyData }) {
  // Theme is 100% determined by the server data
  const theme = companyData?.activeTheme || 'noir';

  useEffect(() => {
    // Clear out any old legacy local storage/cookie caches from client phones
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('mezz_public_theme');
        document.cookie = 'mezz_public_theme=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      } catch (e) {}
    }
  }, []);

  return (
    <div className={theme === 'minimalist' ? 'theme-minimalist' : 'theme-dark'}>
      {theme === 'noir' && (
        <main className="flex-1 bg-[#0A0A0B] text-[#F7F6F2] selection:bg-[#C5A880] selection:text-black">
          <Navbar />
          <Hero />
          <StatsCounter stats={companyData.stats} />
          <ProjectGrid projects={projectsData} />
          <BeforeAfterSlider />
          <AboutSection about={companyData.about} />
          <ContactSection contact={companyData.contact} />
          <Footer />
        </main>
      )}

      {theme === 'minimalist' && (
        <MinimalistView projects={projectsData} company={companyData} />
      )}

      {theme === 'cinematic' && (
        <CinematicView projects={projectsData} company={companyData} />
      )}
    </div>
  );
}
