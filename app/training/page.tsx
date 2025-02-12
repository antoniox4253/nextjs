
import React from 'react';
import TrainingSection from '@/components/TrainingSection';
import ParticleBackground from '@/components/ParticleBackground';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Gamepad, Dumbbell, Users, Compass, ShoppingBag, Swords } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Training = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-solo-dark text-white relative">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-solo-purple via-solo-blue to-solo-magenta bg-clip-text text-transparent">
            {t('training')}
          </h1>
        </div>

        <Tabs defaultValue="physical" className="w-full">
          <TabsList className="grid grid-cols-2 gap-4 bg-solo-dark/50 p-1 mb-6">
            <TabsTrigger 
              value="physical"
              className="data-[state=active]:bg-solo-neon data-[state=active]:text-black"
            >
              Physical
            </TabsTrigger>
            <TabsTrigger 
              value="magical"
              className="data-[state=active]:bg-solo-cyber data-[state=active]:text-black"
            >
              Magical
            </TabsTrigger>
          </TabsList>

          <TabsContent value="physical" className="mt-0">
            <TrainingSection category="physical" />
          </TabsContent>

          <TabsContent value="magical" className="mt-0">
            <TrainingSection category="magical" />
          </TabsContent>
        </Tabs>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-solo-dark/95 backdrop-blur-sm border-t border-solo-purple/20 py-2 px-4 z-50">
        <div className="grid grid-cols-6 gap-1 max-w-lg mx-auto">
          <Button 
            onClick={() => navigate('/dashboard')} 
            variant="ghost"
            className="flex flex-col items-center justify-center gap-1 h-auto py-2 hover:bg-solo-purple/20"
          >
            <Gamepad className="w-5 h-5 text-solo-purple" />
            <span className="text-[10px] text-solo-gray">Home</span>
          </Button>
          <Button 
            onClick={() => navigate('/training')} 
            variant="ghost"
            className="flex flex-col items-center justify-center gap-1 h-auto py-2 hover:bg-solo-blue/20 bg-solo-blue/10"
          >
            <Dumbbell className="w-5 h-5 text-solo-blue" />
            <span className="text-[10px] text-white">Training</span>
          </Button>
          <Button 
            onClick={() => navigate('/guild')} 
            variant="ghost"
            className="flex flex-col items-center justify-center gap-1 h-auto py-2 hover:bg-solo-magenta/20"
          >
            <Users className="w-5 h-5 text-solo-magenta" />
            <span className="text-[10px] text-solo-gray">Guild</span>
          </Button>
          <Button 
            onClick={() => navigate('/inventory')} 
            variant="ghost"
            className="flex flex-col items-center justify-center gap-1 h-auto py-2 hover:bg-solo-cyber/20"
          >
            <Compass className="w-5 h-5 text-solo-cyber" />
            <span className="text-[10px] text-solo-gray">Inventory</span>
          </Button>
          <Button 
            onClick={() => navigate('/combat')} 
            variant="ghost"
            className="flex flex-col items-center justify-center gap-1 h-auto py-2 hover:bg-solo-energy/20"
          >
            <Swords className="w-5 h-5 text-solo-energy" />
            <span className="text-[10px] text-solo-gray">Combat</span>
          </Button>
          <Button 
            onClick={() => navigate('/market')} 
            variant="ghost"
            className="flex flex-col items-center justify-center gap-1 h-auto py-2 hover:bg-solo-neon/20"
          >
            <ShoppingBag className="w-5 h-5 text-solo-neon" />
            <span className="text-[10px] text-solo-gray">Market</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Training;
