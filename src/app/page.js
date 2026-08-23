import HomeClient from '@/components/HomeClient';
import projectsData from '@/data/projects.json';
import companyData from '@/data/company.json';

export default function HomePage() {
  return (
    <HomeClient
      projectsData={projectsData}
      companyData={companyData}
    />
  );
}
