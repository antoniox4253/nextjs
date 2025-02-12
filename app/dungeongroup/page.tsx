import React from 'react';
import { useNavigate } from 'react-router-dom';
import MatchmakingPanel from '@/components/MatchmakingPanel';
import ParticleBackground from '@/components/ParticleBackground';

const DungeonGroup = () => {
  const navigate = useNavigate();

  const handleMatchFound = (players: any[]) => {
    // Aquí podrías guardar los jugadores en un estado global o pasarlos como state en la navegación
    navigate('/dungeon/combat', { state: { players } });
  };

  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      <ParticleBackground />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          Mazmorra - Nivel 2
        </h1>
        <MatchmakingPanel
          mode="group"
          minPlayers={2}
          maxPlayers={3}
          onMatchFound={handleMatchFound}
        />
      </div>
    </div>
  );
};

export default DungeonGroup;