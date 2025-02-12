import React from 'react';
import { Battery, BatteryCharging } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface EnergyBarProps {
  currentEnergy: number;
  maxEnergy: number;
  isCharging?: boolean;
}

const EnergyBar = ({ currentEnergy, maxEnergy, isCharging = false }: EnergyBarProps) => {
  const percentage = (currentEnergy / maxEnergy) * 100;

  return (
    <Card className="bg-solo-dark/80 border-solo-energy/30 p-4 relative overflow-hidden group hover:border-solo-energy transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-solo-energy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative flex items-center gap-4">
        {isCharging ? (
          <BatteryCharging className="w-6 h-6 text-solo-energy animate-pulse" />
        ) : (
          <Battery className="w-6 h-6 text-solo-energy" />
        )}
        <div className="flex-1">
          <div className="h-2 bg-solo-dark/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-solo-energy to-solo-neon rounded-full animate-energy-pulse transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs">
            <span className="text-solo-energy">{currentEnergy} / {maxEnergy}</span>
            <span className="text-solo-gray">{isCharging ? 'Recargando...' : `${Math.round(percentage)}%`}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EnergyBar;