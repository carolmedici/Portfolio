import { useState } from 'react';
import type { Route } from './+types/index';
import type { Project, StrapiProject, StrapiResponse } from '~/types';
import ProjectCard from '~/components/ProjectCard';
import Pagination from '~/components/Pagination';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from "~/context/LanguageContext";

interface LayoutContext {
  t: typeof import("../../locales/en.json");
  lang: string;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Carolina Médici | Projects' },
     { name: 'description', content: 'My Portfolio' },
  ];
}

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const apiUrl = import.meta.env.VITE_API_URL;  

  if (!apiUrl) { 
    console.error("ERRO: O ambiente não forneceu a VITE_API_URL.");
    return { projects: [] };
  }

  try {
    const res = await fetch(`${apiUrl}/projects?populate=*`);
    
    if (!res.ok) {
      console.error(`ERRO_HTTP: Status ${res.status} ao buscar do Strapi`);
      return { projects: [] };
    }

    const json: StrapiResponse<StrapiProject> = await res.json();    
    const strapiBase = apiUrl.replace('/api', '');

    const projects = (json.data || []).map((item) => {
      const firstImage = Array.isArray(item.image) && item.image.length > 0 ? item.image[0] : item.image;
      return {
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        description: item.description,
        image: firstImage?.url 
          ? (firstImage.url.startsWith('http') ? firstImage.url : `${strapiBase}${firstImage.url}`)
          : 'https://placehold.co/600x400/1f2937/60a5fa?text=Sem+Imagem',
        url: item.url,
        date: item.date,
        category: item.category,
        featured: item.featured,
      };
    });

    return { projects };
  } catch (error) {
    console.error("LOG_CRITICAL: Falha na comunicação com o backend:", error);
    return { projects: [] };
  }
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  const { projects } = loaderData as { projects: Project[] };

  const categories = [
    'All',
    ...new Set(projects.map((project) => project.category)),
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  const { t } = useLanguage();

  return (
    <>
    <div className="flex justify-end mb-6">    
      </div>
      <h2 className='text-3xl text-white font-bold mb-8'>
        {t.projects.title}
      </h2>

      <div className='flex flex-wrap gap-2 mb-8'>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded text-sm cursor-pointer ${
              selectedCategory === category
                ? 'bg-cyan-600 hover:bg-cyan-400 hover:text-gray-800 text-white px-4 py-2 rounded-md hover:cursor-pointer'
                : 'bg-cyan-700 text-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        <motion.div layout className='grid gap-6 sm:grid-cols-2'>
          {currentProjects.map((project) => (
            <motion.div key={project.id} layout>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default ProjectsPage;
