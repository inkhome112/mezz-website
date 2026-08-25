import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import projectsData from '@/data/projects.json';
import { notFound } from 'next/navigation';
import ProjectDetailClient from './ProjectDetailClient';
import { getGlobalTheme } from '@/app/api/theme/route';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export function generateStaticParams() {
  return projectsData.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  const theme = await getGlobalTheme();

  if (!project) {
    notFound();
  }

  return (
    <ProjectDetailClient project={project} theme={theme || 'noir'} />
  );
}
