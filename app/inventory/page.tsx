"use client"; // 👈 Necesario para permitir hooks en Next.js

import { useRouter } from "next/navigation";
import ParticleBackground from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Gamepad, Dumbbell, Users, Compass, ShoppingBag, Swords } from "lucide-react";
import Inventory from "@/components/Inventory";

export default function InventoryPage() {
  const router = useRouter(); // ✅ Reemplazo de useNavigate()

  return (
    <div className="min-h-screen bg-solo-dark text-white relative overflow-hidden flex flex-col">
      <ParticleBackground className="absolute inset-0 z-0" />
      <div className="relative z-10 flex-grow">
        <header className="text-center py-8 px-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-solo-purple via-solo-blue to-solo-magenta bg-clip-text text-transparent">
            Inventario del Cazador
          </h1>
        </header>
        <main className="container mx-auto pb-12 px-4">
          <Inventory />
        </main>
      </div>

      {/* ✅ Footer con navegación */}
      <footer className="relative z-10 bg-gradient-to-t from-solo-dark/95 to-solo-dark/80 backdrop-blur-sm py-4 md:py-6 border-t border-solo-purple/20">
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
