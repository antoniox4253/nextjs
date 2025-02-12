import React from 'react';
import { Card } from '@/components/ui/card';
import { Users, Swords, Trophy, Compass, Book, Zap } from 'lucide-react';

const GameModeSelector = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-6">
      <Card className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 bg-solo-dark/80 border-solo-purple/30 hover:border-solo-purple">
        <div className="absolute inset-0 bg-gradient-to-br from-solo-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-solo-purple to-solo-cyber opacity-0 group-hover:opacity-20 transition-opacity blur" />
        <div className="p-6 flex flex-col items-center gap-4">
          <Users className="w-12 h-12 text-solo-purple animate-pulse-glow" />
          <h3 className="text-xl font-bold text-white group-hover:text-solo-neon transition-colors">PvP Arena</h3>
          <p className="text-solo-gray text-center">Desafía a otros cazadores en batallas épicas</p>
        </div>
      </Card>

      <Card className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 bg-solo-dark/80 border-solo-blue/30 hover:border-solo-blue">
        <div className="absolute inset-0 bg-gradient-to-br from-solo-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-solo-blue to-solo-cyber opacity-0 group-hover:opacity-20 transition-opacity blur" />
        <div className="p-6 flex flex-col items-center gap-4">
          <Swords className="w-12 h-12 text-solo-blue animate-pulse-glow" />
          <h3 className="text-xl font-bold text-white group-hover:text-solo-cyber transition-colors">Mazmorras</h3>
          <p className="text-solo-gray text-center">Explora dungeons y derrota monstruos poderosos</p>
        </div>
      </Card>

      <Card className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 bg-solo-dark/80 border-solo-magenta/30 hover:border-solo-magenta">
        <div className="absolute inset-0 bg-gradient-to-br from-solo-magenta/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-solo-magenta to-solo-neon opacity-0 group-hover:opacity-20 transition-opacity blur" />
        <div className="p-6 flex flex-col items-center gap-4">
          <Trophy className="w-12 h-12 text-solo-magenta animate-pulse-glow" />
          <h3 className="text-xl font-bold text-white group-hover:text-solo-magenta transition-colors">Ranked</h3>
          <p className="text-solo-gray text-center">Compite en el ranking mundial de cazadores</p>
        </div>
      </Card>

      <Card className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 bg-solo-dark/80 border-solo-cyber/30 hover:border-solo-cyber">
        <div className="absolute inset-0 bg-gradient-to-br from-solo-cyber/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-solo-cyber to-solo-blue opacity-0 group-hover:opacity-20 transition-opacity blur" />
        <div className="p-6 flex flex-col items-center gap-4">
          <Compass className="w-12 h-12 text-solo-cyber animate-pulse-glow" />
          <h3 className="text-xl font-bold text-white group-hover:text-solo-cyber transition-colors">Exploración</h3>
          <p className="text-solo-gray text-center">Descubre nuevos territorios y secretos ocultos</p>
        </div>
      </Card>

      <Card className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 bg-solo-dark/80 border-solo-neon/30 hover:border-solo-neon">
        <div className="absolute inset-0 bg-gradient-to-br from-solo-neon/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-solo-neon to-solo-purple opacity-0 group-hover:opacity-20 transition-opacity blur" />
        <div className="p-6 flex flex-col items-center gap-4">
          <Book className="w-12 h-12 text-solo-neon animate-pulse-glow" />
          <h3 className="text-xl font-bold text-white group-hover:text-solo-neon transition-colors">Historia</h3>
          <p className="text-solo-gray text-center">Sigue la trama principal y misiones secundarias</p>
        </div>
      </Card>

      <Card className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 bg-solo-dark/80 border-solo-purple/30 hover:border-solo-purple">
        <div className="absolute inset-0 bg-gradient-to-br from-solo-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-solo-purple to-solo-magenta opacity-0 group-hover:opacity-20 transition-opacity blur" />
        <div className="p-6 flex flex-col items-center gap-4">
          <Zap className="w-12 h-12 text-solo-purple animate-pulse-glow" />
          <h3 className="text-xl font-bold text-white group-hover:text-solo-purple transition-colors">Eventos</h3>
          <p className="text-solo-gray text-center">Participa en eventos especiales y raids</p>
        </div>
      </Card>
    </div>
  );
};

export default GameModeSelector;