
import React from 'react';
import { Card } from '@/components/ui/card';

const CharacterPanel = () => {
  return (
    <Card className="bg-solo-dark/50 border border-solo-purple/30 p-4 md:p-6 animate-fade-in">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-white">Panel de Personaje</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-solo-dark/30 p-3 md:p-4 rounded-lg hover:bg-solo-dark/40 transition-colors">
            <h3 className="text-solo-gray text-xs md:text-sm mb-1">Nivel</h3>
            <p className="text-xl md:text-2xl font-bold text-white">1</p>
          </div>
          <div className="bg-solo-dark/30 p-3 md:p-4 rounded-lg hover:bg-solo-dark/40 transition-colors">
            <h3 className="text-solo-gray text-xs md:text-sm mb-1">Experiencia</h3>
            <p className="text-xl md:text-2xl font-bold text-white">0/100</p>
          </div>
          <div className="bg-solo-dark/30 p-3 md:p-4 rounded-lg hover:bg-solo-dark/40 transition-colors">
            <h3 className="text-solo-gray text-xs md:text-sm mb-1">Oro</h3>
            <p className="text-xl md:text-2xl font-bold text-white">0</p>
          </div>
          <div className="bg-solo-dark/30 p-3 md:p-4 rounded-lg hover:bg-solo-dark/40 transition-colors">
            <h3 className="text-solo-gray text-xs md:text-sm mb-1">Diamantes</h3>
            <p className="text-xl md:text-2xl font-bold text-white">0</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-solo-dark/30 p-3 md:p-4 rounded-lg hover:bg-solo-dark/40 transition-colors">
            <h3 className="text-solo-gray text-xs md:text-sm mb-1">Fuerza</h3>
            <p className="text-xl md:text-2xl font-bold text-white">10</p>
          </div>
          <div className="bg-solo-dark/30 p-3 md:p-4 rounded-lg hover:bg-solo-dark/40 transition-colors">
            <h3 className="text-solo-gray text-xs md:text-sm mb-1">Destreza</h3>
            <p className="text-xl md:text-2xl font-bold text-white">10</p>
          </div>
          <div className="bg-solo-dark/30 p-3 md:p-4 rounded-lg hover:bg-solo-dark/40 transition-colors">
            <h3 className="text-solo-gray text-xs md:text-sm mb-1">Inteligencia</h3>
            <p className="text-xl md:text-2xl font-bold text-white">10</p>
          </div>
          <div className="bg-solo-dark/30 p-3 md:p-4 rounded-lg hover:bg-solo-dark/40 transition-colors">
            <h3 className="text-solo-gray text-xs md:text-sm mb-1">Vitalidad</h3>
            <p className="text-xl md:text-2xl font-bold text-white">10</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CharacterPanel;
