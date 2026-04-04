import type { Route } from './+types/index';
import { useLanguage } from "../../context/LanguageContext";
import en from "../../locales/en.json";
import pt from "../../locales/pt.json";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Carolina Médici | Developer" },
    { name: "description", content: "Welcome to my portfolio as a fullstack developer." },
  ];
}

export default function Home() {

  const {lang} = useLanguage();
  const t = lang === "en" ? en : pt;

  return (
    <main>     
      <section className="bg-white  px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">          
            <div className="w-48 h-48 rounded-full bg-gray-200 overflow-hidden shadow-lg">
              <img src="../public/images/profile.png" alt="Carolina Médici" className="w-full h-full object-cover" />
            </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.about.title}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t.about.text}
            </p>            
          
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Java / Spring Boot</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">REST APIs</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">JUnit</span>

              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Angular</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">React</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Tailwind</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Jasmine</span>

              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">PostgreSQL</span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">MySQL</span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">Git</span>
              <span className="px-3 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">Keycloack</span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">CI/CD Pipelines</span>

            </div>
          </div>
        </div>
      </section>    
    </main>
  );
}
