import projectsData from '@/data/projects.json';
import { notFound } from 'next/navigation';
import ProjectDetailClient from './ProjectDetailClient';
import { getGlobalTheme } from '@/app/api/theme/route';
import { cookies } from 'next/headers';

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

  if (!project) {
    notFound();
  }

  const globalTheme = await getGlobalTheme();
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get('mezz_public_theme')?.value;
  const theme = globalTheme || cookieTheme || 'noir';

  return (
    <ProjectDetailClient project={project} theme={theme} />
  );
}
