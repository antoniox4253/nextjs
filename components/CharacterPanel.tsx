"use client";

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Swords, 
  Shield, 
  Brain, 
  Heart, 
  GaugeCircle, 
  Trophy,
  Zap,
  Gauge,
  Sparkles,
  Crown
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import type { Character, UserStats } from '@/types/game';

const CharacterPanel = () => {
  const { data: session } = useSession();
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);

  useEffect(() => {
    const fetchCharacterData = async () => {
      if (!session?.user?.name) return;
      
      try {
        const response = await fetch(`/api/character/active?hashworld=${session.user.name}`);
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        const data = await response.json();
        setActiveCharacter(data);
      } catch (error) {
        console.error('Error fetching character data:', error);
      }
    };

    fetchCharacterData();

    // Agregar listener para actualizaciones
    const handleUpdate = () => fetchCharacterData();
    window.addEventListener('characterUpdate', handleUpdate);
    
    return () => window.removeEventListener('characterUpdate', handleUpdate);
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.name) return;
      
      try {
        const [characterResponse, statsResponse] = await Promise.all([
          fetch(`/api/user/info?hashworld=${session.user.name}`),
          fetch(`/api/user/stats?hashworld=${session.user.name}`)
        ]);

        const characterData = await characterResponse.json();
        const statsData = await statsResponse.json();
        
        if (characterResponse.ok && characterData.characters) {
          const active = characterData.characters.find((char: Character) => char.active);
          if (active) setActiveCharacter(active);
        }

        if (statsResponse.ok) {
          setUserStats(statsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [session]);

  if (!activeCharacter || !userStats) return null;

  const expPercentage = (activeCharacter.progression.xp / activeCharacter.progression.maxXp) * 100;
  const hpPercentage = (activeCharacter.stats.currentHP / activeCharacter.stats.maxHP) * 100;
  const manaPercentage = (activeCharacter.stats.currentMana / activeCharacter.stats.maxMana) * 100;

  return (
    <Card className="bg-solo-dark/50 border border-solo-purple/30 p-4 md:p-6 animate-fade-in w-full">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="w-7 h-7 text-solo-purple animate-pulse" />
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                Stats
                <Sparkles className="w-4 h-4 text-solo-energy" />
              </h2>
              <p className="text-xs md:text-sm text-solo-gray">Personaje Activo</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-solo-dark/40 px-4 py-2 rounded-full border border-solo-purple/30">
            <span className="text-sm text-solo-purple font-medium capitalize">{activeCharacter.class}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-solo-dark/40 to-solo-dark/20 p-5 rounded-lg border border-solo-purple/20 hover:border-solo-purple/40 transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-2">
                <GaugeCircle className="w-5 h-5 text-solo-purple group-hover:scale-110 transition-transform" />
                <h3 className="text-sm text-solo-gray">Nivel</h3>
              </div>
              <p className="text-3xl font-bold text-white text-center">{activeCharacter.level}</p>
            </div>

            <div className="bg-gradient-to-br from-solo-dark/40 to-solo-dark/20 p-5 rounded-lg border border-solo-purple/20 hover:border-solo-purple/40 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                  <h3 className="text-sm text-solo-gray">HP</h3>
                </div>
                <span className="text-sm text-red-500 font-medium">
                  {activeCharacter.stats.currentHP}/{activeCharacter.stats.maxHP}
                </span>
              </div>
              <Progress 
                value={hpPercentage} 
                className="h-2.5 bg-solo-dark/50"
                indicatorClassName="bg-gradient-to-r from-red-500 to-red-400"
              />
            </div>

            <div className="bg-gradient-to-br from-solo-dark/40 to-solo-dark/20 p-5 rounded-lg border border-solo-purple/20 hover:border-solo-purple/40 transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-2">
                <Swords className="w-5 h-5 text-solo-energy group-hover:scale-110 transition-transform" />
                <h3 className="text-sm text-solo-gray">Fuerza</h3>
              </div>
              <p className="text-3xl font-bold text-white text-center">{activeCharacter.stats.fuerza}</p>
            </div>

            <div className="bg-gradient-to-br from-solo-dark/40 to-solo-dark/20 p-5 rounded-lg border border-solo-purple/20 hover:border-solo-purple/40 transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-solo-magenta group-hover:scale-110 transition-transform" />
                <h3 className="text-sm text-solo-gray">Crítico</h3>
              </div>
              <p className="text-3xl font-bold text-white text-center">{activeCharacter.stats.critico}%</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-solo-dark/40 to-solo-dark/20 p-5 rounded-lg border border-solo-purple/20 hover:border-solo-purple/40 transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-solo-energy group-hover:scale-110 transition-transform" />
                <h3 className="text-sm text-solo-gray">Experiencia</h3>
              </div>
              <Progress 
                value={expPercentage} 
                className="h-2.5 bg-solo-dark/50 mb-2"
                indicatorClassName="bg-gradient-to-r from-solo-energy to-solo-purple"
              />
              <p className="text-xl font-medium text-solo-gray text-center">
                {activeCharacter.progression.xp}/{activeCharacter.progression.maxXp}
              </p>
            </div>

            <div className="bg-gradient-to-br from-solo-dark/40 to-solo-dark/20 p-5 rounded-lg border border-solo-purple/20 hover:border-solo-purple/40 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                  <h3 className="text-sm text-solo-gray">Mana</h3>
                </div>
                <span className="text-sm text-blue-500 font-medium">
                  {activeCharacter.stats.currentMana}/{activeCharacter.stats.maxMana}
                </span>
              </div>
              <Progress 
                value={manaPercentage} 
                className="h-2.5 bg-solo-dark/50"
                indicatorClassName="bg-gradient-to-r from-blue-500 to-blue-400"
              />
            </div>

            <div className="bg-gradient-to-br from-solo-dark/40 to-solo-dark/20 p-5 rounded-lg border border-solo-purple/20 hover:border-solo-purple/40 transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-solo-guild group-hover:scale-110 transition-transform" />
                <h3 className="text-sm text-solo-gray">Defensa</h3>
              </div>
              <p className="text-3xl font-bold text-white text-center">{activeCharacter.stats.defensa}</p>
            </div>

            <div className="bg-gradient-to-br from-solo-dark/40 to-solo-dark/20 p-5 rounded-lg border border-solo-purple/20 hover:border-solo-purple/40 transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="w-5 h-5 text-solo-cyber group-hover:scale-110 transition-transform" />
                <h3 className="text-sm text-solo-gray">Velocidad</h3>
              </div>
              <p className="text-3xl font-bold text-white text-center">{activeCharacter.stats.velocidad}</p>
            </div>

            <div className="bg-gradient-to-br from-solo-dark/40 to-solo-dark/20 p-5 rounded-lg border border-solo-purple/20 hover:border-solo-purple/40 transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="w-5 h-5 text-solo-cyber group-hover:scale-110 transition-transform" />
                <h3 className="text-sm text-solo-gray">Suerte</h3>
              </div>
              <p className="text-3xl font-bold text-white text-center">{activeCharacter.stats.suerte}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CharacterPanel;
