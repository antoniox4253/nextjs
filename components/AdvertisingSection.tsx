import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Megaphone, XOctagon, DollarSign } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AdvertisingSection = () => {
  const [adCount, setAdCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  const maxAds = 3;

  const handleAdClick = () => {
    if (adCount < maxAds) {
      setAdCount(prev => prev + 1);
      toast({
        title: t('comingSoon'),
        description: `${t('featureInDevelopment')} (${adCount + 1}/${maxAds})`,
      });
    }
    
    if (adCount + 1 >= maxAds) {
      setIsDisabled(true);
    }
  };

  return (
    <Card className="bg-solo-dark/80 border-solo-cyber/30 p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-solo-cyber/20 to-transparent opacity-50" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <Megaphone className="w-6 h-6 text-solo-cyber" />
          <h2 className="text-xl font-bold text-white">Zona de Publicidad</h2>
          <div className="ml-auto flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-solo-gray" />
            <span className="text-sm text-solo-gray">Anuncios: {adCount}/{maxAds}</span>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="p-4 bg-solo-dark/60 border-solo-cyber/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isDisabled ? (
                  <XOctagon className="w-8 h-8 text-red-500" />
                ) : (
                  <Megaphone className="w-8 h-8 text-solo-cyber animate-pulse" />
                )}
                <div>
                  <h3 className="font-medium text-white">Recompensas por Publicidad</h3>
                  <p className="text-sm text-solo-gray">Ver anuncios para obtener recompensas especiales</p>
                </div>
              </div>
              <Button
                onClick={handleAdClick}
                disabled={isDisabled}
                className={`bg-solo-cyber hover:bg-solo-cyber/80 text-black font-semibold ${
                  isDisabled ? 'opacity-50' : ''
                }`}
              >
                {isDisabled ? 'Límite Alcanzado' : 'Ver Anuncio'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default AdvertisingSection;