"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Medal, Crown } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RankingProps {
  type: 'general' | 'class' | 'weekly';
  characterClass?: string;
}

// Interfaces para los diferentes tipos de ranking
interface User {
  _id: string;
  nickname: string;
}

interface Character {
  _id: string;
  level: number;
  class: string;
  progression: {
    xp: number;
  };
}

interface BaseRanking {
  _id: string;
  user: User[];
}

interface GeneralRanking extends BaseRanking {
  totalXP: number;
  character: Character;
}

interface ClassRanking extends BaseRanking {
  character: Character[];
  progression: {
    xp: number;
  };
}

interface WeeklyRanking extends BaseRanking {
  experience: number;
  dungeonClears: number;
  character: Character[];
}

type RankingType = GeneralRanking | ClassRanking | WeeklyRanking;

// Helper para type guards
const isGeneralRanking = (rank: RankingType): rank is GeneralRanking => {
  return 'totalXP' in rank;
};

const isClassRanking = (rank: RankingType): rank is ClassRanking => {
  return 'progression' in rank && Array.isArray(rank.character);
};

const isWeeklyRanking = (rank: RankingType): rank is WeeklyRanking => {
  return 'experience' in rank;
};

export default function RankingSection({ type, characterClass }: RankingProps) {
  const { data: session } = useSession();
  const [rankings, setRankings] = useState<RankingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<string>("");

  // Lista completa de clases con valores que coinciden con la base de datos
  const classes = [
    { value: "guerrero", label: "Guerrero", icon: "⚔️" },
    { value: "mago", label: "Mago", icon: "🔮" },
    { value: "arquero", label: "Arquero", icon: "🏹" },
    { value: "curador", label: "Curador", icon: "✨" },
    { value: "asesino", label: "Asesino", icon: "🗡️" },
    { value: "espadachin", label: "Espadachín", icon: "🛡️" }
  ];

  useEffect(() => {
    const fetchRankings = async () => {
      if (!session?.user?.name) return;
      if (type === 'class' && !selectedClass) {
        setRankings([]);
        setLoading(false);
        return;
      }

      try {
        const params = new URLSearchParams({
          type,
          limit: '10'
        });

        if (type === 'class' && selectedClass) {
          params.append('class', selectedClass);
        }

        const response = await fetch(`/api/ranking?${params}`);
        const data = await response.json();
        setRankings(data);
      } catch (error) {
        console.error('Error fetching rankings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, [type, selectedClass, session]);

  if (loading) {
    return <div>Cargando rankings...</div>;
  }

  const getRankXP = (rank: RankingType): string => {
    if (isWeeklyRanking(rank)) {
      return rank.experience.toLocaleString();
    } else if (isGeneralRanking(rank)) {
      return rank.totalXP.toLocaleString();
    } else if (isClassRanking(rank)) {
      return rank.progression.xp.toLocaleString();
    }
    return '0';
  };

  const getCharacterInfo = (rank: RankingType): Character | null => {
    if (isGeneralRanking(rank)) {
      return rank.character;
    } else if (isClassRanking(rank) || isWeeklyRanking(rank)) {
      return rank.character[0] || null;
    }
    return null;
  };
  
  return (
    <div className="space-y-6">
      {type === 'class' && (
        <div className="bg-solo-dark/40 rounded-lg p-4 border border-solo-purple/20">
          <h3 className="text-sm text-solo-gray mb-3">Selecciona una clase</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {classes.map((c) => (
              <button
                key={c.value}
                onClick={() => setSelectedClass(c.value)}
                className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
                  selectedClass === c.value
                    ? 'bg-solo-purple/30 border-solo-purple text-white'
                    : 'bg-solo-dark/50 border-solo-purple/20 text-solo-gray hover:bg-solo-purple/20'
                } border`}
              >
                <span className="text-xl">{c.icon}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {type === 'class' && !selectedClass ? (
        <div className="text-center p-8 rounded-lg bg-solo-dark/40 border border-solo-purple/20">
          <div className="text-4xl mb-3">🎮</div>
          <div className="text-solo-gray">
            Selecciona una clase para ver el ranking
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {rankings.map((rank, index) => {
            const characterInfo = getCharacterInfo(rank);
            const classInfo = classes.find(c => c.value === characterInfo?.class);
            
            return (
              <Card 
                key={rank._id} 
                className={`p-4 transition-all ${
                  index === 0 
                    ? 'bg-gradient-to-r from-yellow-500/20 to-solo-dark/60 border-yellow-500/30' 
                    : 'bg-solo-dark/60 border-solo-purple/20 hover:border-solo-purple/40'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Medalla según posición */}
                  <div className="text-2xl w-10 h-10 flex items-center justify-center">
                    {index === 0 && <Crown className="w-6 h-6 text-yellow-500" />}
                    {index === 1 && <Medal className="w-6 h-6 text-gray-400" />}
                    {index === 2 && <Medal className="w-6 h-6 text-amber-600" />}
                    {index > 2 && (
                      <span className="text-lg font-bold text-solo-gray">
                        #{index + 1}
                      </span>
                    )}
                  </div>

                  {/* Información del jugador */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-white">
                        {rank.user[0]?.nickname || 'Unknown'}
                      </h3>
                      {classInfo && (
                        <span className="text-lg" title={classInfo.label}>
                          {classInfo.icon}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-solo-gray mt-1">
                      <span>Nivel {characterInfo?.level || 0}</span>
                      <span>•</span>
                      <span className="capitalize">{classInfo?.label || 'Unknown'}</span>
                    </div>
                  </div>

                  {/* Puntuación */}
                  <div className="text-right">
                    <div className="text-xl font-bold text-solo-purple">
                      {`${getRankXP(rank)} XP`}
                    </div>
                    {'dungeonClears' in rank && (
                      <div className="text-sm text-solo-gray">
                        {rank.dungeonClears} dungeons
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}

          {rankings.length === 0 && (
            <div className="text-center p-6 text-solo-gray">
              No hay jugadores registrados con esta clase
            </div>
          )}
        </div>
      )}
    </div>
  );
}