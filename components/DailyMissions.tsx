import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Target, CheckCircle2, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Mission {
  id: string;
  title: string;
  description: string;
  reward: string;
  progress: number;
  total: number;
  completed: boolean;
}

const DailyMissions = () => {
  const { t } = useLanguage();

  const missions: Mission[] = [
    {
      id: '1',
      title: t('demonHunter'),
      description: t('defeatDemons'),
      reward: '1000 EXP + 500 Oro',
      progress: 3,
      total: 10,
      completed: false
    },
    {
      id: '2',
      title: t('dailyTraining'),
      description: t('completeTraining'),
      reward: '800 EXP + Poción de Poder',
      progress: 2,
      total: 3,
      completed: false
    },
    {
      id: '3',
      title: t('expertTrader'),
      description: t('sellItems'),
      reward: '300 Oro + Caja Misteriosa',
      progress: 5,
      total: 5,
      completed: true
    }
  ];

  return (
    <Card className="bg-solo-dark/80 border-solo-energy/30 p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-solo-energy/20 to-transparent opacity-50" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-6 h-6 text-solo-energy" />
          <h2 className="text-xl font-bold text-white">{t('dailyMissions')}</h2>
          <div className="ml-auto flex items-center gap-2">
            <Clock className="w-4 h-4 text-solo-gray" />
            <span className="text-sm text-solo-gray">{t('resetIn')}: 12:34:56</span>
          </div>
        </div>

        <ScrollArea className="h-[200px]">
          <div className="space-y-3">
            {missions.map((mission) => (
              <Card 
                key={mission.id}
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
                      <h3 className="font-medium text-white">{mission.title}</h3>
                      <span className="text-sm text-solo-energy">{mission.reward}</span>
                    </div>
                    <p className="text-sm text-solo-gray mt-1">{mission.description}</p>
                    {!mission.completed && (
                      <div className="mt-2">
                        <div className="h-1.5 bg-solo-dark/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-solo-energy rounded-full transition-all duration-300"
                            style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-solo-gray">{mission.progress}/{mission.total}</span>
                          <span className="text-xs text-solo-gray">{Math.round((mission.progress / mission.total) * 100)}%</span>
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