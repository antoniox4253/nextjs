import { Heart, Shield, Swords, Zap, Gauge, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StatsPanelProps {
  stats: {
    fuerza: number;
    defensa: number;
    maxHP: number;
    currentHP: number;
    maxMana: number;
    currentMana: number;
    critico: number;
    velocidad: number;
  };
}

export function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="bg-solo-dark/30 rounded-lg p-4 border border-solo-purple/20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Barras de HP y Mana */}
        <div className="col-span-full space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span>HP</span>
              </div>
              <span>{stats.currentHP} / {stats.maxHP}</span>
            </div>
            <Progress 
              value={(stats.currentHP / stats.maxHP) * 100} 
              className="h-2 bg-red-950"
              indicatorClassName="bg-red-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                <span>Mana</span>
              </div>
              <span>{stats.currentMana} / {stats.maxMana}</span>
            </div>
            <Progress 
              value={(stats.currentMana / stats.maxMana) * 100} 
              className="h-2 bg-blue-950"
              indicatorClassName="bg-blue-500"
            />
          </div>
        </div>

        {/* Estadísticas */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-solo-energy" />
            <span>Fuerza: {stats.fuerza}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-solo-guild" />
            <span>Defensa: {stats.defensa}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-solo-magenta" />
            <span>Crítico: {stats.critico}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-solo-cyber" />
            <span>Velocidad: {stats.velocidad}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 