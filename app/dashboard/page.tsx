"use client"; // ✅ Necesario para usar hooks en Next.js

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import ParticleBackground from "@/components/ParticleBackground";
import CharacterPanel from "@/components/CharacterPanel";
import EnergyBar from "@/components/EnergyBar";
import DailyMissions from "@/components/DailyMissions";
import CharacterSelector from "@/components/CharacterSelector";
import ServerChat from "@/components/chat/ServerChat";
import MessageInbox from "@/components/messaging/MessageInbox";
import AdvertisingSection from "@/components/AdvertisingSection";
import RankingSection from "@/components/RankingSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Trophy, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ProtectedRoute from "@/components/ProtectedRoute"; // ✅ Protección de ruta
import SignIn from "@/components/SignIn"; // ✅ Importamos SignIn (Sign Out incluido)
import FooterNav from "@/components/Footer"; // ✅ Footer centralizado

export default function Dashboard() {
  const router = useRouter();
  const { t } = useLanguage();
  const { data: session, status } = useSession();

  // 🚀 Redirige al login si no está autenticado después de 5 segundos
  useEffect(() => {
    if (status === "unauthenticated") {
      setTimeout(() => {
        signIn();
      }, 5000);
    }
  }, [status]);

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
          </header>

          {/* ✅ Contenido principal con múltiples Tabs */}
          <main className="pb-24 space-y-6">
            <CharacterPanel />
            <EnergyBar currentEnergy={10} maxEnergy={20} isCharging={true} />

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
