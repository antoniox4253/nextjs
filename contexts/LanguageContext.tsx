
import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../translations/en';
import { es } from '../translations/es';

type Language = 'en' | 'es';
type TranslationValue = string | { [key: string]: TranslationValue };
type Translations = { [key: string]: TranslationValue };

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return (stored as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    console.log('Language changed to:', lang);
  };

  const t = (key: string): string => {
    const translations = language === 'en' ? en : es;
    const keys = key.split('.');
    let value: TranslationValue = translations;
    
    for (const k of keys) {
      if (typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = React.useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

const LANGUAGE_STORAGE_KEY = 'app-language';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
