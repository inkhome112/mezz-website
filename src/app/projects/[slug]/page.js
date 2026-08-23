import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LightboxModal from '@/components/LightboxModal';
import projectsData from '@/data/projects.json';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Building, Sparkles, Check, Images } from 'lucide-react';
import ProjectDetailClient from './ProjectDetailClient';

export function generateStaticParams() {
  return projectsData.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex-1 min-h-screen bg-[#0A0A0B]">
      <Navbar />
      <ProjectDetailClient project={project} />
      <Footer />
    </main>
  );
}
