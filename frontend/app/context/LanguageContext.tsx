import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import en from "../locales/en.json"; 
import pt from "../locales/pt.json";

type LanguageContextType = {
  lang: string;
  setLang: (lang: string) => void;
  t: any; 
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {

  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("preferred-lang") || "en";
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("preferred-lang", lang);
  }, [lang]);

  const t = lang === "en" ? en : pt;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};