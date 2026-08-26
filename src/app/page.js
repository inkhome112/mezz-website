import HomeClient from '@/components/HomeClient';
import projectsData from '@/data/projects.json';
import companyData from '@/data/company.json';
import { getGlobalTheme } from '@/app/api/theme/route';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export default async function HomePage() {
  const globalTheme = await getGlobalTheme();
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get('mezz_public_theme')?.value;

  const activeTheme = globalTheme || cookieTheme || companyData?.activeTheme || 'noir';
  const company = {
    ...companyData,
    activeTheme
  };

  return (
    <HomeClient
      projectsData={projectsData}
      companyData={company}
    />
  );
}
