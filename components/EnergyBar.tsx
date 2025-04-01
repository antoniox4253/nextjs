"use client";

import React from 'react';
import { Battery, BatteryCharging } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface EnergyStats {
  current: number;
  max: number;
  lastRecovery: string;
}

const EnergyBar = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [energyStats, setEnergyStats] = useState<EnergyStats>({
    current: 0,
    max: 20,
    lastRecovery: new Date().toISOString()
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchEnergyStats = async () => {
    if (!session?.user?.name) return;
    
    try {
      // Usar el mismo endpoint que usa el personaje activo
      const response = await fetch(`/api/character/active?hashworld=${session.user.name}`);
      if (!response.ok) {
        throw new Error('Error obteniendo energía');
      }
      const data = await response.json();
      if (data && data.energy) {
        setEnergyStats(data.energy);
      }
    } catch (error) {
      console.error('Error fetching energy stats:', error);
      toast({
        title: "Error",
        description: "No se pudo obtener la energía",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Efecto inicial y actualización periódica
  useEffect(() => {
    fetchEnergyStats();
    const interval = setInterval(fetchEnergyStats, 5000);
    return () => clearInterval(interval);
  }, [session]);

  // Efecto para escuchar eventos de cambio de energía
  useEffect(() => {
    const handleEnergyChange = () => {
      fetchEnergyStats();
    };

    // Escuchar el evento personalizado de cambio de energía
    window.addEventListener('energyChanged', handleEnergyChange);
    return () => window.removeEventListener('energyChanged', handleEnergyChange);
  }, []);

  const { current, max } = energyStats;
  const isCharging = current < max;
  const percentage = (current / max) * 100;

  if (isLoading) {
    return (
      <Card className="bg-solo-dark/80 border-solo-energy/30 p-4">
        <div className="animate-pulse flex items-center gap-4">
          <div className="w-6 h-6 bg-solo-energy/20 rounded" />
          <div className="flex-1 space-y-2">
            <div className="h-2 bg-solo-energy/20 rounded" />
            <div className="h-2 w-1/4 bg-solo-energy/20 rounded" />
          </div>
        </div>
      </Card>
    );
  }

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
              className="h-full bg-gradient-to-r from-solo-energy to-solo-neon rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs">
            <span className="text-solo-energy">{current} / {max}</span>
            <span className="text-solo-gray">
              {isCharging ? 'Recargando...' : `${Math.round(percentage)}%`}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EnergyBar;