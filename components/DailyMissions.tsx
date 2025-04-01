"use client";

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Target, CheckCircle2, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';

interface Mission {
  missionId: string;
  progress: number;
  completed: boolean;
  claimed: boolean;
}

const DailyMissions = () => {
  const { t } = useLanguage();
  const { data: session } = useSession();
  const { toast } = useToast();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [timeUntilReset, setTimeUntilReset] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissions = async () => {
      if (!session?.user?.name) return;

      try {
        const response = await fetch(`/api/missions/daily?hashworld=${session.user.name}`);
        const data = await response.json();

        if (response.ok) {
          setMissions(data.missions);
          setTimeUntilReset(data.timeUntilReset);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar las misiones",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
    
    // Actualizar el contador cada segundo
    const timer = setInterval(() => {
      setTimeUntilReset(prev => Math.max(0, prev - 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [session]);

  // Formatear el tiempo restante
  const formatTimeRemaining = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-solo-dark/80 border-solo-energy/30 p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-solo-energy/20 to-transparent opacity-50" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-6 h-6 text-solo-energy" />
          <h2 className="text-xl font-bold text-white">{t('dailyMissions')}</h2>
          <div className="ml-auto flex items-center gap-2">
            <Clock className="w-4 h-4 text-solo-gray" />
            <span className="text-sm text-solo-gray">{t('resetIn')}: {formatTimeRemaining(timeUntilReset)}</span>
          </div>
        </div>

        <ScrollArea className="h-[200px]">
          <div className="space-y-3">
            {missions.map((mission) => (
              <Card 
                key={mission.missionId}
                className={`p-3 bg-solo-dark/60 border-solo-energy/20 hover:border-solo-energy transition-colors ${
                  mission.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1 ${mission.completed ? 'text-green-500' : 'text-solo-energy'}`}>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-white">{mission.missionId}</h3>
                    </div>
                    {!mission.completed && (
                      <div className="mt-2">
                        <div className="h-1.5 bg-solo-dark/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-solo-energy rounded-full transition-all duration-300"
                            style={{ width: `${(mission.progress / 100) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-solo-gray">{mission.progress}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
};

export default DailyMissions;