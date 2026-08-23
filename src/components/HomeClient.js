'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProjectGrid from '@/components/ProjectGrid';
import StatsCounter from '@/components/StatsCounter';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ThemeSwitcher from '@/components/ThemeSwitcher';

// Alternative Views for Themes 2 and 3
import MinimalistView from '@/components/themes/MinimalistView';
import CinematicView from '@/components/themes/CinematicView';

export default function HomeClient({ projectsData, companyData }) {
  const [theme, setTheme] = useState('noir'); // 'noir' | 'minimalist' | 'cinematic'

  return (
    <div className={theme === 'minimalist' ? 'theme-minimalist' : 'theme-dark'}>
      {theme === 'noir' && (
        <main className="flex-1 bg-[#0A0A0B] text-[#F7F6F2] selection:bg-[#C5A880] selection:text-black">
          <Navbar />
          <Hero />
          <StatsCounter stats={companyData.stats} />
          <ProjectGrid projects={projectsData} />
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

      {/* Floating Theme / Design Option Switcher */}
      <ThemeSwitcher currentTheme={theme} onSelectTheme={setTheme} />
    </div>
  );
}
