import HomeClient from '@/components/HomeClient';
import projectsData from '@/data/projects.json';
import companyData from '@/data/company.json';
import { getGlobalTheme } from '@/app/api/theme/route';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const activeTheme = await getGlobalTheme();
  const company = {
    ...companyData,
    activeTheme: activeTheme || companyData.activeTheme || 'noir'
  };

  return (
    <HomeClient
      projectsData={projectsData}
      companyData={company}
    />
  );
}
