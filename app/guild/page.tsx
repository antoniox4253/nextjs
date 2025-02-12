"use client"; // 👈 Necesario para permitir hooks en Next.js

import { useRouter } from "next/navigation";
import { useState } from "react";
import GuildPanel from "@/components/GuildPanel";
import ParticleBackground from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Gamepad, Dumbbell, Users, Compass, ShoppingBag, Swords } from "lucide-react";

export default function Guild() {
  const router = useRouter(); // ✅ Reemplazo de useNavigate()
  
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

      {/* ✅ Footer con botones de navegación */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-solo-dark/95 to-solo-dark/80 backdrop-blur-sm py-4 md:py-6 border-t border-solo-purple/20">
        <div className="container mx-auto px-2 md:px-4">
          <nav className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-4 max-w-4xl mx-auto">
            <Button onClick={() => router.push('/dashboard')} variant="ghost" size="sm"
              className="flex flex-col items-center justify-center gap-1 h-auto py-2 hover:bg-solo-purple/20 transition-all duration-300 group">
              <Gamepad className="w-5 h-5 md:w-6 md:h-6 text-solo-purple group-hover:text-solo-neon transition-colors" />
              <span className="text-[10px] md:text-sm font-medium text-solo-gray group-hover:text-white transition-colors">
                Home
              </span>
            </Button>
            <Button onClick={() => router.push('/training')} variant="outline" size="sm"
              className="flex flex-col items-center justify-center gap-1 h-auto py-2 hover:bg-solo-blue/20 transition-all duration-300 group">
              <Dumbbell className="w-5 h-5 md:w-6 md:h-6 text-solo-blue group-hover:text-solo-cyber transition-colors" />
              <span className="text-[10px] md:text-sm font-medium text-solo-gray group-hover:text-white transition-colors">
                Training
              </span>
            </Button>
            <Button onClick={() => router.push('/guild')} variant="secondary" size="sm"
              className="flex flex-col items-center justify-center gap-1 h-auto py-2 hover:bg-solo-magenta/20 transition-all duration-300 group">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-solo-magenta group-hover:text-solo-energy transition-colors" />
              <span className="text-[10px] md:text-sm font-medium text-solo-gray group-hover:text-white transition-colors">
                Guild
              </span>
            </Button>
            <Button onClick={() => router.push('/inventory')} variant="ghost" size="sm"
              className="flex flex-col items-center justify-center gap-1 h-auto py-2 hover:bg-solo-cyber/20 transition-all duration-300 group">
              <Compass className="w-5 h-5 md:w-6 md:h-6 text-solo-cyber group-hover:text-solo-blue transition-colors" />
              <span className="text-[10px] md:text-sm font-medium text-solo-gray group-hover:text-white transition-colors">
                Inventory
              </span>
            </Button>
            <Button onClick={() => router.push('/combat')} variant="destructive" size="sm"
              className="flex flex-col items-center justify-center gap-1 h-auto py-2 hover:bg-solo-energy/20 transition-all duration-300 group">
              <Swords className="w-5 h-5 md:w-6 md:h-6 text-solo-energy group-hover:text-solo-magenta transition-colors" />
              <span className="text-[10px] md:text-sm font-medium text-solo-gray group-hover:text-white transition-colors">
                Combat
              </span>
            </Button>
            <Button onClick={() => router.push('/market')} variant="link" size="sm"
              className="flex flex-col items-center justify-center gap-1 h-auto py-2 hover:bg-solo-neon/20 transition-all duration-300 group">
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-solo-neon group-hover:text-solo-purple transition-colors" />
              <span className="text-[10px] md:text-sm font-medium text-solo-gray group-hover:text-white transition-colors">
                Market
              </span>
            </Button>
          </nav>
        </div>
      </footer>
    </div>
  );
}
