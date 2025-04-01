"use client"; // ✅ Necesario para hooks en Next.js

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import ParticleBackground from "@/components/ParticleBackground";
import TrainingSection from "@/components/TrainingSection";
import EnergyBar from "@/components/EnergyBar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Gamepad, Dumbbell, Users, Compass, ShoppingBag, Swords } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import FooterNav from "@/components/Footer"; // ✅ Footer centralizado


export default function Training() {
  const router = useRouter();
  const { t } = useLanguage();
  const { data: session, status } = useSession();

 // 🚀 Redirige al login si no está autenticado después de 5 segundos
 useEffect(() => {
  if (status === "unauthenticated") {
    setTimeout(() => {
      signIn();
    }, 5000); // ⏳ Espera 5 segundos antes de redirigir
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
    <div className="min-h-screen bg-solo-dark text-white relative">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="space-y-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-solo-purple via-solo-blue to-solo-magenta bg-clip-text text-transparent">
            {t("training")}
          </h1>
          <EnergyBar />
        </div>

        {/* ✅ Sistema de Tabs */}
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

     {/* ✅ Footer reutilizable */}
        <FooterNav />
    </div>
  );
}
