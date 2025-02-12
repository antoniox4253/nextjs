"use client"; // 👈 Necesario para permitir el uso de hooks en Next.js

import { useRouter } from "next/navigation";
import ParticleBackground from "@/components/ParticleBackground";
import CharacterPanel from "@/components/CharacterPanel";
import EnergyBar from "@/components/EnergyBar";
import DailyMissions from "@/components/DailyMissions";
import CharacterSelector from "@/components/CharacterSelector";
import ServerChat from "@/components/chat/ServerChat";
import MessageInbox from "@/components/messaging/MessageInbox";
import AdvertisingSection from "@/components/AdvertisingSection";
import RankingSection from "@/components/RankingSection";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Trophy, Star, Gamepad, Dumbbell, Users, Compass, ShoppingBag, Swords } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Dashboard() {
  const router = useRouter(); // ✅ Reemplazo de useNavigate()
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-solo-dark to-solo-dark/95 text-white relative overflow-x-hidden">
      <ParticleBackground className="absolute inset-0 z-0" />
      
      <div className="relative z-10 container mx-auto px-4 py-6">
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-solo-purple via-solo-blue to-solo-magenta bg-clip-text text-transparent">
            Realm of Valor
          </h1>
        </header>

        {/* ✅ Barra de navegación con botones */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-solo-dark/90 backdrop-blur-sm border-t border-solo-purple/20 py-2 px-4">
          <nav className="max-w-xl mx-auto grid grid-cols-6 gap-1">
            <Button onClick={() => router.push('/dashboard')} variant="ghost" size="sm">
              <Gamepad className="w-5 h-5 text-solo-purple" />
              <span className="text-xs">{t('home')}</span>
            </Button>
            <Button onClick={() => router.push('/training')} variant="outline" size="sm">
              <Dumbbell className="w-5 h-5 text-solo-blue" />
              <span className="text-xs">{t('training')}</span>
            </Button>
            <Button onClick={() => router.push('/guild')} variant="secondary" size="sm">
              <Users className="w-5 h-5 text-solo-guild" />
              <span className="text-xs">{t('guild')}</span>
            </Button>
            <Button onClick={() => router.push('/combat')} variant="destructive" size="sm">
              <Swords className="w-5 h-5 text-solo-energy" />
              <span className="text-xs">{t('combat')}</span>
            </Button>
            <Button onClick={() => router.push('/inventory')} variant="ghost" size="sm">
              <Compass className="w-5 h-5 text-solo-cyber" />
              <span className="text-xs">{t('inventory')}</span>
            </Button>
            <Button onClick={() => router.push('/market')} variant="link" size="sm">
              <ShoppingBag className="w-5 h-5 text-solo-neon" />
              <span className="text-xs">{t('market')}</span>
            </Button>
          </nav>
        </div>

        {/* ✅ Contenido principal con múltiples Tabs */}
        <main className="pb-24 space-y-6">
          <CharacterPanel />
          <EnergyBar currentEnergy={10} maxEnergy={20} isCharging={true} />

          <Tabs defaultValue="character" className="w-full">
            <TabsList className="w-full bg-solo-dark/50 border border-solo-purple/30 mb-4">
              <TabsTrigger value="character">{t('tabs.character')}</TabsTrigger>
              <TabsTrigger value="missions">{t('tabs.missions')}</TabsTrigger>
              <TabsTrigger value="social">{t('tabs.social')}</TabsTrigger>
              <TabsTrigger value="rankings">{t('tabs.rankings')}</TabsTrigger>
            </TabsList>

            <TabsContent value="character" className="animate-fade-in">
              <CharacterSelector />
            </TabsContent>

            <TabsContent value="missions" className="animate-fade-in">
              <DailyMissions />
              <AdvertisingSection />
            </TabsContent>

            <TabsContent value="social" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ServerChat />
                <MessageInbox />
              </div>
            </TabsContent>

            <TabsContent value="rankings" className="animate-fade-in">
              <Tabs defaultValue="general">
                <TabsList className="w-full bg-solo-dark/50 border border-solo-purple/30 mb-4">
                  <TabsTrigger value="general" className="flex-1">
                    <Trophy className="w-4 h-4 mr-2" /> {t('general')}
                  </TabsTrigger>
                  <TabsTrigger value="class" className="flex-1">
                    <Star className="w-4 h-4 mr-2" /> {t('byClass')}
                  </TabsTrigger>
                  <TabsTrigger value="weekly" className="flex-1">
                    <Award className="w-4 h-4 mr-2" /> {t('weekly')}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                  <RankingSection type="general" />
                </TabsContent>
                <TabsContent value="class">
                  <RankingSection type="class" />
                </TabsContent>
                <TabsContent value="weekly">
                  <RankingSection type="weekly" />
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
