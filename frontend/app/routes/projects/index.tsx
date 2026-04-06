import { useState, useEffect } from 'react';
import type { Route } from './+types/index';
import type { Project, StrapiProject, StrapiResponse } from '~/types';
import ProjectCard from '~/components/ProjectCard';
import Pagination from '~/components/Pagination';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from "~/context/LanguageContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Carolina Médici | Projects' },
    { name: 'description', content: 'My Portfolio' },
  ];
}

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
 
  const apiUrl = import.meta.env.VITE_API_URL || 'https://portfolio-ykoq.onrender.com/api';  

  try {
    const res = await fetch(`${apiUrl}/projects?populate=*`);
    
    if (!res.ok) {
      console.error(`ERRO_HTTP: Status ${res.status}`);
      return { projects: [] };
    }

    const json: StrapiResponse<StrapiProject> = await res.json();    
    const strapiBase = import.meta.env.VITE_STRAPI_URL || 'https://portfolio-ykoq.onrender.com';

    const projects = (json.data || []).map((item) => {
  
      const imageData = Array.isArray(item.image) ? item.image[0] : item.image;
      const rawUrl = imageData?.url;

      return {
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        description: item.description,
        image: rawUrl 
          ? (rawUrl.startsWith('http') ? rawUrl : `${strapiBase}${rawUrl}`)
          : 'https://placehold.co/600x400/1f2937/60a5fa?text=Sem+Imagem',
        url: item.url,
        date: item.date,
        category: item.category,
        featured: item.featured,
      };
    });

    return { projects };
  } catch (error) {
    console.error("LOG_CRITICAL: Falha na comunicação:", error);
    return { projects: [] };
  }
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  const { projects } = loaderData as { projects: Project[] };
  const { t } = useLanguage();
  
  if (!isMounted) {
    return <div className="min-h-screen bg-transparent" />;
  }

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

  return (
    <>
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
            className={`px-4 py-2 rounded-md text-sm cursor-pointer transition-all ${
              selectedCategory === category
                ? 'bg-cyan-600 text-white'
                : 'bg-cyan-900/50 text-gray-300 hover:bg-cyan-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        <motion.div 
          key={selectedCategory + currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className='grid gap-6 sm:grid-cols-2'
        >
          {currentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default ProjectsPage;