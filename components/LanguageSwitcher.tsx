import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <Button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 bg-solo-dark/80 hover:bg-solo-dark border border-solo-purple/30 text-white"
    >
      <Languages className="w-5 h-5 mr-2" />
      {language.toUpperCase()}
    </Button>
  );
};

export default LanguageSwitcher;