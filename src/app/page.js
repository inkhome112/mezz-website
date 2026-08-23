import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProjectGrid from '@/components/ProjectGrid';
import StatsCounter from '@/components/StatsCounter';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

import projectsData from '@/data/projects.json';
import companyData from '@/data/company.json';

export default function HomePage() {
  return (
    <main className="flex-1">
      <Navbar />
      <Hero />
      <StatsCounter stats={companyData.stats} />
      <ProjectGrid projects={projectsData} />
      <AboutSection about={companyData.about} />
      <ContactSection contact={companyData.contact} />
      <Footer />
    </main>
  );
}
