import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, Crown, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DungeonPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-solo-dark p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          Mazmorras
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Nivel 1 - Individual */}
          <Card className="bg-solo-dark/90 border-solo-cyber/30 p-6 hover:border-solo-cyber transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Nivel 1</h3>
                <Shield className="w-8 h-8 text-solo-cyber" />
              </div>
              <p className="text-solo-gray">Modo Individual</p>
              <ul className="text-sm text-solo-gray space-y-2">
                <li>• Nivel mínimo: 1</li>
                <li>• Dificultad: Fácil</li>
                <li>• Recompensas: Básicas</li>
              </ul>
              <Button 
                className="w-full bg-solo-cyber hover:bg-solo-cyber/80 text-white"
                onClick={() => navigate('/dungeon/solo')}
              >
                Entrar
              </Button>
            </div>
          </Card>

          {/* Nivel 2 - Grupo */}
          <Card className="bg-solo-dark/90 border-solo-purple/30 p-6 hover:border-solo-purple transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Nivel 2</h3>
                <Users className="w-8 h-8 text-solo-purple" />
              </div>
              <p className="text-solo-gray">Modo Grupo (2-3 jugadores)</p>
              <ul className="text-sm text-solo-gray space-y-2">
                <li>• Nivel mínimo: 10</li>
                <li>• Dificultad: Media</li>
                <li>• Recompensas: Avanzadas</li>
              </ul>
              <Button 
                className="w-full bg-solo-purple hover:bg-solo-purple/80 text-white"
                onClick={() => navigate('/dungeon/group')}
              >
                Buscar Grupo
              </Button>
            </div>
          </Card>

          {/* Nivel 3 - Gremio */}
          <Card className="bg-solo-dark/90 border-solo-guild/30 p-6 hover:border-solo-guild transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Nivel 3</h3>
                <Crown className="w-8 h-8 text-solo-guild" />
              </div>
              <p className="text-solo-gray">Modo Gremio</p>
              <ul className="text-sm text-solo-gray space-y-2">
                <li>• Nivel mínimo: 20</li>
                <li>• Requiere Gremio</li>
                <li>• Recompensas: Épicas</li>
              </ul>
              <Button 
                className="w-full bg-solo-guild hover:bg-solo-guild/80 text-white"
                onClick={() => navigate('/dungeon/guild')}
              >
                Reunir Gremio
              </Button>
            </div>
          </Card>

          {/* Coming Soon */}
          <Card className="bg-solo-dark/90 border-solo-gray/30 p-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Próximamente</h3>
                <Lock className="w-8 h-8 text-solo-gray" />
              </div>
              <p className="text-solo-gray">Nuevo Contenido</p>
              <div className="h-[96px] flex items-center justify-center">
                <p className="text-solo-gray text-sm">Más niveles próximamente...</p>
              </div>
              <Button 
                className="w-full bg-solo-gray/50 cursor-not-allowed"
                disabled
              >
                Bloqueado
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DungeonPanel;