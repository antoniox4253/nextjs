import React from 'react';
import DungeonPanel from '@/components/DungeonPanel';
import ParticleBackground from '@/components/ParticleBackground';

const Dungeon = () => {
  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      <ParticleBackground />
      <DungeonPanel />
    </div>
  );
};

export default Dungeon;