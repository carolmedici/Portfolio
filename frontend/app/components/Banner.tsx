import { Link } from 'react-router';
import { useLanguage } from "../context/LanguageContext";
import en from "../locales/en.json";
import pt from "../locales/pt.json";


type BannerProps = {
  name?: string;
  text?: string;
};

const Banner: React.FC<BannerProps> = () => {
    
   const { lang, setLang } = useLanguage();
   const t = lang === "en" ? en : pt;

  return (
    <header className='text-center py-20 px-4 bg-gradient-to-br bg-gradient-to-br from-gray-600 via-gray-800 to-indigo-950 text-white transition-colors duration-300'>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setLang(lang === "en" ? "pt" : "en")}
          className="bg-cyan-600 hover:bg-cyan-400 hover:text-gray-800 text-white px-4 py-2 rounded-md hover:cursor-pointer"
        >
          {lang === "en" ? "Português" : "English"}
        </button>
      </div>

      <h2 className='text-4xl font-extrabold tracking-tight mb-4'>{t.welcome.title} ✨</h2>
      <p className='"text-lg text-purple-100 max-w-2xl mx-auto opacity-90 mb-6'> {t.welcome.description}</p>
      <div className='flex justify-center gap-4'>
        <Link
          to='/projects'
          className='bg-cyan-600 text-white px-6 py-2 rounded hover:scale-110 transition-transform'
        >
          {t.buttons.viewProjects}
        </Link>
        <Link
          to='/contact'
          className='border border-cyan-500 text-cyan-400 px-6 py-2 rounded hover:bg-cyan-600 hover:text-white transition'
        >
          {t.buttons.contactMe}
        </Link>
      </div>
    </header>
  );
};

export default Banner;
