import React from 'react';
import { useNavigate } from 'react-router-dom';
import MatchmakingPanel from '@/components/MatchmakingPanel';
import ParticleBackground from '@/components/ParticleBackground';

const DungeonGuild = () => {
  const navigate = useNavigate();

  const handleMatchFound = (players: any[]) => {
    navigate('/dungeon/combat', { state: { players } });
  };

  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      <ParticleBackground />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          Mazmorra - Nivel 3 (Gremio)
        </h1>
        <MatchmakingPanel
          mode="guild"
          minPlayers={3}
          maxPlayers={5}
          onMatchFound={handleMatchFound}
        />
      </div>
    </div>
  );
};

export default DungeonGuild;