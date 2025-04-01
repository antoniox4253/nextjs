"use client";

import { Card } from '@/components/ui/card';
import { Coins, Diamond, Users } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import type { UserStats } from '@/types/game';

const CurrencyPanel = () => {
  const { data: session } = useSession();
  const [userStats, setUserStats] = useState<UserStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      if (!session?.user?.name) return;
      
      try {
        const response = await fetch(`/api/user/stats?hashworld=${session.user.name}`);
        const data = await response.json();
        
        if (response.ok) {
          setUserStats(data);
        }
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    fetchStats();

    // Agregar listener para actualizaciones
    const handleUpdate = () => fetchStats();
    window.addEventListener('currencyUpdate', handleUpdate);
    
    return () => window.removeEventListener('currencyUpdate', handleUpdate);
  }, [session]);

  if (!userStats) return null;

  return (
    <Card className="bg-solo-dark/50 border border-solo-purple/30 p-4 animate-fade-in w-full mb-4">
      <div className="grid grid-cols-3 gap-3">
        {/* Oro */}
        <div className="bg-gradient-to-br from-solo-dark/40 to-solo-dark/20 p-3 rounded-lg border border-solo-purple/20 hover:border-solo-purple/40 transition-all duration-300 group">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center gap-2 flex-shrink">
              <Coins className="w-5 h-5 shrink-0 text-yellow-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-xs md:text-sm text-solo-gray whitespace-nowrap">Oro</h3>
            </div>
            <div className="flex-shrink-0">
              <p className="text-base md:text-lg font-bold text-yellow-500 text-right">
                {userStats.gold.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* WLD */}
        <div className="bg-gradient-to-br from-solo-dark/40 to-solo-dark/20 p-3 rounded-lg border border-solo-purple/20 hover:border-solo-purple/40 transition-all duration-300 group">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center gap-2 flex-shrink">
              <Diamond className="w-5 h-5 shrink-0 text-blue-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-xs md:text-sm text-solo-gray whitespace-nowrap">WLD</h3>
            </div>
            <div className="flex-shrink-0">
              <p className="text-base md:text-lg font-bold text-blue-400 text-right">
                {userStats.wld.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Referidos */}
        <div className="bg-gradient-to-br from-solo-dark/40 to-solo-dark/20 p-3 rounded-lg border border-solo-purple/20 hover:border-solo-purple/40 transition-all duration-300 group">
          <div className="flex items-center justify-between space-x-1">
            <div className="flex items-center gap-1 flex-shrink">
              <Users className="w-3.5 h-3.5 shrink-0 text-green-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-[9px] md:text-[11px] text-solo-gray whitespace-nowrap">Referidos</h3>
            </div>
            <div className="flex-shrink-0">
              <p className="text-sm md:text-base font-bold text-green-400 text-right">
                {(userStats.referredCount || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CurrencyPanel; 