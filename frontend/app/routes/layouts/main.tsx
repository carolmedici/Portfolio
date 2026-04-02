import { Outlet, Link, useLocation } from 'react-router';
import type { Route } from '../about/+types';
import { useLanguage } from '~/context/LanguageContext';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Carolina Médici | Developer' },
    { name: 'description', content: 'My Portfolio' },
  ];
}

const MainLayout = () => {

  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const isHome = location.pathname === '/'; 

  const toggleLang = () => setLang(lang === "en" ? "pt" : "en");

  return (
    <section className='min-h-screen w-full bg-gradient-to-br from-gray-600 via-gray-800 to-indigo-950 text-white flex flex-col items-center p-4 md:p-12 relative'>
      
      <div className="w-full max-w-6xl flex justify-between items-center mb-8">
        <div>
          {!isHome && (
            <Link to="/" className="text-gray-400 hover:text-cyan-400">
              ← {t.buttons.backHome}
            </Link>
          )}
        </div>

        <button
          onClick={toggleLang}
          className="bg-cyan-600 hover:bg-cyan-400 text-white px-4 py-2 rounded-md cursor-pointer font-medium"
        >
          {lang === "en" ? "Português" : "English"}
        </button>
      </div>

      <div className="w-full max-w-6xl">
        <Outlet /> 
      </div>
    </section>
  );
};

export default MainLayout;
