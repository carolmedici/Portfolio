import { useState } from "react";
import en from "../../locales/en.json";
import pt from "../../locales/pt.json";

const AboutPage = () => {
  const [lang, setLang] = useState("en");

  const t = lang === "en" ? en : pt; 

  return (
    <div className='max-w-5xl w-full mx-auto px-8 py-12 bg-gradient-to-br from-gray-600 via-gray-800 to-indigo-950 text-white rounded-3xl shadow-2xl transition-all duration-300'>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setLang(lang === "en" ? "pt" : "en")}
          className="bg-cyan-600 hover:bg-cyan-400 hover:text-gray-800 text-white px-4 py-2 rounded-md hover:cursor-pointer"
        >
          {lang === "en" ? "Português" : "English"}
        </button>
      </div>
   
      <div className='flex flex-col md:flex-row md:items-start items-center gap-10 mb-12'>
        <img
          src="/images/profile.png"
          alt='profile'
          className='w-40 h-40 rounded-full object-cover border-4 border-cyan-700 shadow-md'
        />
        <div>
          <h1 className='text-3xl font-bold text-white mb-2'>
            {t.intro.title}
          </h1>
          <p className='text-gray-300 text-lg'>
            {t.intro.description}
          </p>
        </div>
      </div>
     
      <div className='mb-12'>
        <h2 className='text-2xl font-semibold text-white mb-4'>
          {t.about.title}
        </h2>
        <p className='text-gray-300 leading-relaxed'>
          {t.about.text}
        </p>
      </div>
      
      <h2 className='text-2xl font-semibold text-white mb-4'>
        {t.tech}
      </h2>

      <ul className='flex flex-wrap gap-4 text-sm text-gray-300'>
        {[
          'Java',
          'Spring Boot',
          'React',
          'Angular',
          'Tailwind CSS',
          'MySQL',
          'PostgreSQL',
          'Keycloak',
          'OAuth2',
          'OpenID Connect',
          'Docker',
          'CI/CD',
          'Grafana',
          'JUnit',
          'Jasmine',
          'Postman',
          'Git',
          'Jira',
          'Trello',         
        ].map((tech) => (
          <li key={tech} className='bg-cyan-700 px-3 py-1 rounded-md'>
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutPage;