"use client"; // 👈 Necesario para permitir hooks en Next.js

import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import GuildPanel from "@/components/GuildPanel";
import ParticleBackground from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Gamepad, Dumbbell, Users, Compass, ShoppingBag, Swords } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute"; // ✅ Protegemos la ruta
import FooterNav from "@/components/Footer"; // ✅ Footer centralizado


export default function Guild() {
  const router = useRouter(); // ✅ Reemplazo de useNavigate()
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


  // ✅ Datos del usuario (Worldcoin usa `session.user.name` como ID único)
  const userId = session?.user?.name;

  const [gold, setGold] = useState(1000);
  const [wld, setWld] = useState(100);
  const [missions, setMissions] = useState([
    { name: "Conquista del Reino", reward: "5000 Gold + 100 WLD" },
    { name: "Defensa del Territorio", reward: "3000 Gold" },
    { name: "Caza de Dragones", reward: "4000 Gold + 50 WLD" }
  ]);
  const [clanPower, setClanPower] = useState(125000);
  const [clanUpgrades, setClanUpgrades] = useState([
    { name: "Fortaleza del Clan", level: 5, progress: 75 },
    { name: "Banco del Clan", level: 3, progress: 45 },
    { name: "Academia de Guerra", level: 4, progress: 60 }
  ]);
  const [expanded, setExpanded] = useState<string>("");

  const donateGold = (amount: number) => {
    if (amount > gold) return;
    setGold(prev => prev - amount);
    setClanPower(prev => prev + Math.floor(amount * 0.1));
  };

  const donateWld = (amount: number) => {
    if (amount > wld) return;
    setWld(prev => prev - amount);
    setClanPower(prev => prev + Math.floor(amount * 10));
  };

  const addMission = (mission: any) => setMissions([...missions, mission]);
  const addClanUpgrade = (upgrade: any) => setClanUpgrades([...clanUpgrades, upgrade]);
  const handleAccordionChange = (value: string) => setExpanded(expanded === value ? "" : value);

  return (
    <ProtectedRoute> {/* ✅ Protegemos la ruta */}
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      <ParticleBackground />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-solo-guild via-solo-cyber to-solo-magenta bg-clip-text text-transparent">
          Gremio
        </h1>
        <GuildPanel 
          gold={gold} 
          wld={wld} 
          missions={missions} 
          clanPower={clanPower} 
          clanUpgrades={clanUpgrades} 
          donateGold={donateGold} 
          donateWld={donateWld} 
          addMission={addMission} 
          addClanUpgrade={addClanUpgrade} 
          expanded={expanded}
          onAccordionChange={handleAccordionChange}
        />
      </div>

        {/* ✅ Footer reutilizable */}
              <FooterNav />
    </div>
    </ProtectedRoute>
  );
}
