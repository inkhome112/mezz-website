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
  const [theme, setTheme] = useState(companyData?.activeTheme || 'noir');

  useEffect(() => {
    // Keep theme state synchronized with server when user switches in admin
    const checkTheme = () => {
      fetch('/api/theme')
        .then((res) => res.json())
        .then((data) => {
          if (data?.activeTheme && ['noir', 'minimalist', 'cinematic'].includes(data.activeTheme)) {
            setTheme(data.activeTheme);
          }
        })
        .catch(() => {});
    };

    checkTheme();
    window.addEventListener('focus', checkTheme);
    const interval = setInterval(checkTheme, 3000);
    return () => {
      window.removeEventListener('focus', checkTheme);
      clearInterval(interval);
    };
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
