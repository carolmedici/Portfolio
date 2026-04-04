import { useLoaderData, Link } from 'react-router';
import type { Route } from './+types/detail';
import ReactMarkdown from 'react-markdown';
import useEmblaCarousel from 'embla-carousel-react';
import { useLanguage } from "../../context/LanguageContext";
import en from "../../locales/en.json";
import pt from "../../locales/pt.json";

export async function loader({ params }: Route.LoaderArgs) {

    const { id } = params;
    const apiUrl = import.meta.env.VITE_API_URL;
    const strapiBase = import.meta.env.VITE_STRAPI_URL;    

    const res = await fetch(`${apiUrl}/projects/${id}?populate=*`);
    const json = await res.json();

    if (!json.data) throw new Response("Not Found", { status: 404 });

    const project = json.data;   
    const mainImageData = project.image?.data?.attributes || project.image;
    const mainImage = mainImageData?.url ? `${strapiBase}${mainImageData.url}`: null;

    return { project, mainImage, strapiBase };
}

export default function ProjectDetail() {
    const { project, strapiBase } = useLoaderData() as any;
    const [emblaRef] = useEmblaCarousel({ loop: true });
    const mainImage = project.image?.[0]?.url ? `${strapiBase}${project.image[0].url}`: null;

    const { lang, setLang } = useLanguage();
    const t = lang === "en" ? en : pt;

    return (
        <div className="w-full max-w-7xl mx-auto py-10 px-4 md:px-8">  
            <header className="mb-12">
                <h1 className="text-4xl font-bold text-white mb-3">{project.title}</h1>
                <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full">
                    {project.category}
                </span>
                                
                {mainImage && (<img src={mainImage} alt={project.title} className="w-full rounded-xl mt-8  mb-12 border border-gray-700" />)}
            </header>     
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <article className="prose prose-slate max-w-none">
                    <ReactMarkdown>{project.content}</ReactMarkdown>
                </article>    
              
                {project.gallery && project.gallery.length > 0 && (
                    <div className="mt-4 border-t border-gray-100 pt-12">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">{t.images.gallery}</h3>                        
                  
                        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                            <div className="flex gap-0">
                                {project.gallery.map((img: any) => (
                                    <div key={img.id} className="flex-[0_0_100%] min-w-0">
                                        <figure className="flex gap-4">                                      
                                            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
                                                <img 
                                                    src={`${strapiBase}${img.url}`} 
                                                    alt={img.alternativeText || "Slide"} 
                                                    className="w-full h-auto object-cover max-h-[600px]"
                                                />
                                            </div>
                                        
                                            <figcaption className="bg-gray-50 p-6 border-t border-gray-200">
                                                <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider mb-1 block">
                                                {t.images.projectDetails}
                                                </span>
                                                <strong className="block text-xl text-slate-900 font-bold leading-tight">
                                                {img.alternativeText || "Visualização Técnica"}
                                                </strong>
                                                {img.caption && (
                                                <p className="mt-2 text-slate-600 text-sm leading-relaxed italic border-l-2 border-cyan-200 pl-3">
                                                    {img.caption}
                                                </p>
                                                )}
                                            </figcaption>
                                        </figure>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <p className="text-center text-gray-400 text-xs mt-4">
                            ← {t.images.swipe} →
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}