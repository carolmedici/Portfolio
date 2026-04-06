import { useLoaderData, Link } from 'react-router';
import type { Route } from './+types/detail';
import ReactMarkdown from 'react-markdown';
import useEmblaCarousel from 'embla-carousel-react';
import { useLanguage } from "../../context/LanguageContext";
import en from "../../locales/en.json";
import pt from "../../locales/pt.json";

export async function loader({ params }: Route.LoaderArgs) {
    const { id } = params;
    const apiUrl = import.meta.env.VITE_API_URL || 'https://portfolio-ykoq.onrender.com/api';
    const strapiBase = import.meta.env.VITE_STRAPI_URL ||'https://portfolio-ykoq.onrender.com';    

    const res = await fetch(`${apiUrl}/projects/${id}?populate=*`);
    const json = await res.json();

    if (!json.data) throw new Response("Not Found", { status: 404 });

    const project = json.data;   

    const getFullUrl = (url: string | undefined) => {
        if (!url) return null;
        if (url.startsWith('http')) return url; 
        return `${strapiBase}${url}`; 
    };

    const rawMainImage = Array.isArray(project.image) ? project.image[0]?.url : project.image?.url;
    const mainImage = getFullUrl(rawMainImage);

    const gallery = (project.gallery || []).map((img: any) => ({
        ...img,
        url: getFullUrl(img.url)
    }));

    return { project: { ...project, gallery }, mainImage };
}

export default function ProjectDetail() {
    const { project, mainImage } = useLoaderData() as any;
    const [emblaRef] = useEmblaCarousel({ loop: true });
    const { lang } = useLanguage();
    const t = lang === "en" ? en : pt;

    return (
        <div className="w-full max-w-7xl mx-auto py-10 px-4 md:px-8">  
            <header className="mb-12">               
                <h1 className="text-4xl font-bold text-white mb-3">{project.title}</h1>
                <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full">
                    {project.category}
                </span>
                
                {mainImage && (
                    <img 
                        src={mainImage} 
                        alt={project.title} 
                        className="w-full rounded-xl mt-8 mb-12 border border-gray-700 shadow-2xl object-cover max-h-[500px]" 
                    />
                )}
            </header>     

            <div className="bg-white p-8 rounded-xl shadow-lg">
                <article className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-600">
                    <ReactMarkdown>{project.content}</ReactMarkdown>
                </article>      
              
                {project.gallery && project.gallery.length > 0 && (
                    <div className="mt-12 border-t border-gray-100 pt-12">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">{t.images.gallery}</h3>                                          
                  
                        <div className="overflow-hidden cursor-grab active:cursor-grabbing rounded-xl" ref={emblaRef}>
                            <div className="flex">
                                {project.gallery.map((img: any) => (
                                    <div key={img.id} className="flex-[0_0_100%] min-w-0 px-2">
                                        <figure className="flex flex-col md:flex-row gap-6 bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">                                              
                                            <div className="md:w-2/3">
                                                <img 
                                                    src={img.url} 
                                                    alt={img.alternativeText || "Slide"} 
                                                    className="w-full h-full object-cover max-h-[500px]"
                                                />
                                            </div>
                                        
                                            <figcaption className="md:w-1/3 p-8 flex flex-col justify-center">
                                                <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider mb-2 block">
                                                    {t.images.projectDetails}
                                                </span>
                                                <strong className="block text-xl text-slate-900 font-bold leading-tight mb-4">
                                                    {img.alternativeText || "Visualização Técnica"}
                                                </strong>
                                                {img.caption && (
                                                    <p className="text-slate-600 text-sm leading-relaxed italic border-l-2 border-cyan-200 pl-3">
                                                        {img.caption}
                                                    </p>
                                                )}
                                            </figcaption>
                                        </figure>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <p className="text-center text-gray-400 text-xs mt-6">
                            ← {t.images.swipe} →
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}