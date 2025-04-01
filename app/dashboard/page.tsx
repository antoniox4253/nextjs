"use client"; // ✅ Necesario para usar hooks en Next.js

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import ProtectedRoute from "@/components/ProtectedRoute"; // ✅ Protección de ruta
import SignIn from "@/components/SignIn"; // ✅ Importamos SignIn (Sign Out incluido)
import FooterNav from "@/components/Footer"; // ✅ Footer centralizado
import { TabsContent } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ParticleBackground from "@/components/ParticleBackground";
import CharacterPanel from "@/components/CharacterPanel";
import EnergyBar from "@/components/EnergyBar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CharacterSelector from "@/components/CharacterSelector";
import { Star, Award, Trophy } from "lucide-react";
import AdvertisingSection from "@/components/AdvertisingSection";
import ServerChat from "@/components/chat/ServerChat";
import DailyMissions from "@/components/DailyMissions";
import MessageInbox from "@/components/messaging/MessageInbox";
import RankingSection from "@/components/RankingSection";
import Image from "next/image";
import CurrencyPanel from '@/components/CurrencyPanel';

interface UserData {
  authProvider: 'google' | 'worldcoin' | 'unknown';
  // ... otros campos que necesites
}

export default function Dashboard() {
  const router = useRouter();
  const { t } = useLanguage();
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeCharacter, setActiveCharacter] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.name) return;
      
      try {
        const response = await fetch(`/api/user/data?hashworld=${session.user.name}`);
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchCharacterData = async () => {
      if (!session?.user?.name) return;
      
      try {
        const response = await fetch(`/api/character/active?hashworld=${session.user.name}`);
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        setActiveCharacter(data);
      } catch (error) {
        console.error('Error fetching character data:', error);
      }
    };

    if (session?.user?.name) {
      fetchUserData();
      fetchCharacterData();
    }
  }, [session]);

  // 🚀 Redirige al login si no está autenticado después de 5 segundos
  useEffect(() => {
    if (status === "unauthenticated") {
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    }
  }, [status, router]);

  // 🛑 Muestra un mensaje si está verificando la sesión o si está no autenticado (antes de redirigir)
  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-solo-dark text-black">
        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
          <p className="text-xl font-bold">🔄 Login please...</p>
          {status === "unauthenticated" && (
            <p className="text-md text-gray-600 mt-2">You will be redirected to login in 5 seconds...</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute> {/* ✅ Protegemos la ruta */}
      <div className="min-h-screen bg-gradient-to-b from-solo-dark to-solo-dark/95 text-white relative overflow-x-hidden">
        <ParticleBackground className="absolute inset-0 z-0" />

        <div className="relative z-10 container mx-auto px-4 py-6">
          <header className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-solo-purple via-solo-blue to-solo-magenta bg-clip-text text-transparent">
              Realm of Valor
            </h1>
            
            {/* Badge de autenticación */}
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-sm text-gray-400">Auth with</span>
              {userData ? (
                userData.authProvider === 'google' ? (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                    <Image src="/Glogo.png" alt="Google" width={16} height={16} />
                    <span className="text-sm text-blue-500">Google</span>
                  </div>
                ) : userData.authProvider === 'worldcoin' ? (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                    <Image src="/wldlogo.png" alt="Worldcoin" width={16} height={16} />
                    <span className="text-sm text-green-500">Worldcoin</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-500/10 border border-gray-500/20">
                    <span className="text-sm text-gray-400">Loading...</span>
                  </div>
                )
              ) : (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-500/10 border border-gray-500/20">
                  <span className="text-sm text-gray-400">
                    <span className="inline-block animate-spin mr-1">⌛</span>
                    Loading...
                  </span>
                </div>
              )}
            </div>
          </header>

          {/* ✅ Contenido principal con múltiples Tabs */}
          <main className="pb-24 space-y-6">
            <CurrencyPanel />
            <CharacterPanel />
            <EnergyBar />

            <Tabs defaultValue="character" className="w-full">
              <TabsList className="w-full bg-solo-dark/50 border border-solo-purple/30 mb-4">
                <TabsTrigger value="character">{t("tabs.character")}</TabsTrigger>
                <TabsTrigger value="missions">{t("tabs.missions")}</TabsTrigger>
                <TabsTrigger value="social">{t("tabs.social")}</TabsTrigger>
                <TabsTrigger value="rankings">{t("tabs.rankings")}</TabsTrigger>
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
                      <Trophy className="w-4 h-4 mr-2" /> {t("general")}
                    </TabsTrigger>
                    <TabsTrigger value="class" className="flex-1">
                      <Star className="w-4 h-4 mr-2" /> {t("byClass")}
                    </TabsTrigger>
                    <TabsTrigger value="weekly" className="flex-1">
                      <Award className="w-4 h-4 mr-2" /> {t("weekly")}
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

            {/* 🚀 Botón de Sign Out */}
            <div className="flex justify-center mt-8">
              <SignIn /> {/* ✅ Se usa para cerrar sesión también */}
            </div>
          </main>
        </div>

        {/* ✅ Footer reutilizable */}
        <FooterNav />
      </div>
    </ProtectedRoute>
  );
}
