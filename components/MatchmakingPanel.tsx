import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Timer, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Player {
  id: string;
  name: string;
  level: number;
}

interface MatchmakingPanelProps {
  mode: 'group' | 'guild';
  minPlayers: number;
  maxPlayers: number;
  onMatchFound: (players: Player[]) => void;
}

const MatchmakingPanel = ({ mode, minPlayers, maxPlayers, onMatchFound }: MatchmakingPanelProps) => {
  const [searching, setSearching] = useState(false);
  const [timer, setTimer] = useState(20);
  const [players, setPlayers] = useState<Player[]>([]);
  const { toast } = useToast();

  // Simular búsqueda de jugadores
  useEffect(() => {
    if (searching) {
      const interval = setInterval(() => {
        if (players.length < maxPlayers) {
          const newPlayer: Player = {
            id: Math.random().toString(),
            name: `Player${Math.floor(Math.random() * 1000)}`,
            level: Math.floor(Math.random() * 20) + 10,
          };
          setPlayers(prev => [...prev, newPlayer]);
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [searching, players, maxPlayers]);

  // Temporizador para inicio automático
  useEffect(() => {
    if (searching && players.length >= minPlayers) {
      const countdown = setInterval(() => {
        setTimer(prev => {
          if (prev <= 0 || players.length === maxPlayers) {
            clearInterval(countdown);
            handleStartMatch();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [searching, players, minPlayers, maxPlayers]);

  const handleStartMatch = () => {
    if (players.length >= minPlayers) {
      setSearching(false);
      onMatchFound(players);
      toast({
        title: "¡Partida encontrada!",
        description: "Preparando el combate...",
      });
    }
  };

  return (
    <Card className="bg-solo-dark/90 border-solo-purple/30 p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Buscando {mode === 'group' ? 'Grupo' : 'Miembros del Gremio'}
          </h2>
          <Users className="w-8 h-8 text-solo-purple animate-pulse" />
        </div>

        <div className="space-y-4">
          {players.map(player => (
            <Card key={player.id} className="bg-solo-dark/60 p-4 flex justify-between items-center">
              <div>
                <p className="text-white">{player.name}</p>
                <p className="text-sm text-solo-gray">Nivel {player.level}</p>
              </div>
              <Check className="w-5 h-5 text-solo-neon" />
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-solo-cyber" />
            <span className="text-solo-gray">{timer}s</span>
          </div>
          <p className="text-solo-gray">
            {players.length}/{maxPlayers} jugadores
          </p>
        </div>

        {!searching ? (
          <Button
            className="w-full bg-solo-purple hover:bg-solo-purple/80"
            onClick={() => setSearching(true)}
          >
            Buscar Partida
          </Button>
        ) : players.length >= minPlayers ? (
          <Button
            className="w-full bg-solo-neon hover:bg-solo-neon/80"
            onClick={handleStartMatch}
          >
            Iniciar ({timer}s)
          </Button>
        ) : (
          <Button
            className="w-full bg-solo-gray/50"
            disabled
          >
            Buscando jugadores...
          </Button>
        )}
      </div>
    </Card>
  );
};

export default MatchmakingPanel;