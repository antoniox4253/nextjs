import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Medal, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Define valid character classes that match our translation keys
type CharacterClass = 'warrior' | 'assassin' | 'mage' | 'archer' | 'healer';

interface RankingItemProps {
  rank: number;
  name: string;
  level: number;
  class?: CharacterClass;
  experience: number;
}

const RankingItem = ({ rank, name, level, class: characterClass, experience }: RankingItemProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="bg-solo-dark/60 border-solo-purple/30 p-4 hover:border-solo-purple transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-8 h-8">
          {rank <= 3 ? (
            <div className="text-2xl">
              {rank === 1 && <Trophy className="w-6 h-6 text-yellow-500" />}
              {rank === 2 && <Medal className="w-6 h-6 text-gray-400" />}
              {rank === 3 && <Medal className="w-6 h-6 text-amber-700" />}
            </div>
          ) : (
            <span className="text-solo-gray font-mono">{rank}</span>
          )}
        </div>
        
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <span className="font-medium text-white">{name}</span>
            <span className="text-solo-purple font-mono">{t('level')} {level}</span>
          </div>
          
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-solo-gray">
              {characterClass && `${t(characterClass)} • `}
              {experience.toLocaleString()} XP
            </span>
            {rank <= 10 && <Star className="w-4 h-4 text-solo-cyber" />}
          </div>
        </div>
      </div>
    </Card>
  );
};

// Datos de ejemplo - En una implementación real, estos vendrían de una API
const mockRankings = {
  general: [
    { rank: 1, name: "ShadowLord", level: 85, experience: 1250000 },
    { rank: 2, name: "DragonHunter", level: 82, experience: 1150000 },
    { rank: 3, name: "StormBringer", level: 80, experience: 1050000 },
    { rank: 4, name: "LightSeeker", level: 78, experience: 950000 },
    { rank: 5, name: "DarkKnight", level: 75, experience: 850000 },
  ],
  class: [
    { rank: 1, name: "BladeRunner", level: 75, class: "warrior" as CharacterClass, experience: 950000 },
    { rank: 2, name: "ShadowStep", level: 73, class: "assassin" as CharacterClass, experience: 900000 },
    { rank: 3, name: "SpellWeaver", level: 70, class: "mage" as CharacterClass, experience: 850000 },
    { rank: 4, name: "ArrowStorm", level: 68, class: "archer" as CharacterClass, experience: 800000 },
    { rank: 5, name: "LifeBringer", level: 65, class: "healer" as CharacterClass, experience: 750000 },
  ],
  weekly: [
    { rank: 1, name: "WeeklyChamp", level: 65, experience: 150000 },
    { rank: 2, name: "Grinder", level: 63, experience: 140000 },
    { rank: 3, name: "Dedicated", level: 60, experience: 130000 },
    { rank: 4, name: "Challenger", level: 58, experience: 120000 },
    { rank: 5, name: "Competitor", level: 55, experience: 110000 },
  ]
};

// Datos de ejemplo para el personaje activo
const mockActiveCharacter = {
  general: { rank: 8, total: 1000 },
  class: { rank: 3, total: 100 },
  weekly: { rank: 15, total: 500 }
};

interface RankingSectionProps {
  type: 'general' | 'class' | 'weekly';
}

const RankingSection = ({ type }: RankingSectionProps) => {
  const { t } = useLanguage();
  const rankings = mockRankings[type];
  const activeCharacterRank = mockActiveCharacter[type];
  
  return (
    <div className="space-y-4">
      {rankings.map((ranking) => (
        <RankingItem key={ranking.rank} {...ranking} />
      ))}
      
      {/* Sección de posición del personaje activo */}
      <Card className="mt-4 bg-solo-dark/80 border-solo-purple p-4">
        <div className="flex items-center justify-between">
          <span className="text-solo-gray">{t('yourRank')}</span>
          <div className="text-right">
            <div className="text-white font-medium">
              {activeCharacterRank.rank} / {activeCharacterRank.total}
            </div>
            <div className="text-sm text-solo-gray">
              {t('currentPosition')}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RankingSection;