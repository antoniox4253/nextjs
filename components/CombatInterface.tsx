import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Zap, Sword, Timer } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Player {
  id: string;
  name: string;
  level: number;
  stats: {
    hp: number;
    maxHp: number;
    power: number;
    defense: number;
    mana: number;
    maxMana: number;
  };
  image: string;
}

interface Boss {
  id: string;
  name: string;
  stats: {
    hp: number;
    maxHp: number;
    power: number;
    defense: number;
    mana: number;
    maxMana: number;
  };
  image: string;
}

interface CombatInterfaceProps {
  players: Player[];
  onCombatEnd: (winner: Player | Boss) => void;
}

const TURN_DURATION = 15000; // 15 segundos
const BOSS: Boss = {
  id: 'boss-id',
  name: 'Cyber Sentinel',
  stats: {
    hp: 5000,
    maxHp: 5000,
    power: 1000,
    defense: 300,
    mana: 400,
    maxMana: 1000
  },
  image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
};

const CombatInterface = ({ players = [], onCombatEnd }: CombatInterfaceProps) => {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [gameState, setGameState] = useState<Player[]>(players);
  const [bossState, setBossState] = useState<Boss>(BOSS);
  const [timeLeft, setTimeLeft] = useState(TURN_DURATION);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [turnInProgress, setTurnInProgress] = useState(true); // Cambiado a true por defecto

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (timeLeft > 0 && turnInProgress) {
      timer = setTimeout(() => {
        setTimeLeft(prev => Math.max(0, prev - 1000));
      }, 1000);
    } else if (timeLeft === 0) {
      handleTurnEnd();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, turnInProgress]);

  const handleTurnEnd = () => {
    if (isPlayerTurn) {
      toast({
        title: "¡Turno perdido!",
        description: `${gameState[currentTurn]?.name || 'Jugador'} perdió su turno`,
        variant: "destructive"
      });
      nextTurn();
    }
  };

  const handleAttack = (attackerId: string, targetId: string) => {
    setTurnInProgress(false);
    const attacker = gameState.find(p => p.id === attackerId);
    
    if (!attacker) return;
    
    const damage = Math.max(0, attacker.stats.power - bossState.stats.defense / 2);
    const newBossHp = Math.max(0, bossState.stats.hp - damage);
    
    setBossState(prev => ({
      ...prev,
      stats: { ...prev.stats, hp: newBossHp }
    }));

    toast({
      title: "¡Ataque realizado!",
      description: `${attacker.name} ha causado ${damage} de daño al ${bossState.name}`,
    });
    
    if (newBossHp <= 0) {
      onCombatEnd(attacker);
      return;
    }
    
    nextTurn();
  };

  const handleBossAttack = () => {
    if (gameState.length === 0) return;
    
    const targetIndex = Math.floor(Math.random() * gameState.length);
    const target = gameState[targetIndex];
    
    if (!target) return;
    
    const damage = Math.max(0, bossState.stats.power - target.stats.defense / 2);
    
    setGameState(prev => {
      const newState = [...prev];
      if (newState[targetIndex]) {
        const newHp = Math.max(0, target.stats.hp - damage);
        newState[targetIndex] = {
          ...target,
          stats: {
            ...target.stats,
            hp: newHp
          }
        };

        toast({
          title: "¡El jefe ataca!",
          description: `${bossState.name} ha causado ${damage} de daño a ${target.name}`,
          variant: "destructive"
        });

        if (newHp <= 0) {
          onCombatEnd(bossState);
        }
      }
      return newState;
    });

    setIsPlayerTurn(true);
    setCurrentTurn(0);
    setTimeLeft(TURN_DURATION);
    setTurnInProgress(true);
  };

  const nextTurn = () => {
    if (currentTurn + 1 >= gameState.length) {
      setIsPlayerTurn(false);
      setTimeLeft(TURN_DURATION / 2);
      setTimeout(handleBossAttack, 2000);
    } else {
      setCurrentTurn(prev => prev + 1);
      setTimeLeft(TURN_DURATION);
      setTurnInProgress(true);
    }
  };

  const StatBar = ({ current, max, color }: { current: number; max: number; color: string }) => (
    <div className="h-2 bg-solo-dark/50 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} transition-all duration-300`}
        style={{ width: `${(current / max) * 100}%` }}
      />
    </div>
  );

  if (!players.length) {
    return <div className="min-h-screen bg-solo-dark p-6 text-white text-center">No hay jugadores disponibles</div>;
  }

  return (
    <div className="min-h-screen bg-solo-dark p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Timer */}
        <div className="flex justify-center items-center gap-2 text-white">
          <Timer className="w-6 h-6" />
          <span className="font-mono text-xl">
            {Math.ceil(timeLeft / 1000)}s
          </span>
        </div>

        {/* Current Turn Indicator */}
        <div className="text-center text-white mb-4">
          <h2 className="text-xl font-bold">
            {isPlayerTurn 
              ? `Turno de ${gameState[currentTurn]?.name}`
              : `${bossState.name} está preparando su ataque...`}
          </h2>
        </div>

        <Card className="bg-solo-dark/90 border-solo-magenta/30 p-6">
          <div className="flex items-center gap-8">
            <img
              src={bossState.image}
              alt="Enemy"
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white">{bossState.name}</h3>
                <div className="flex gap-4">
                  <div className="text-center">
                    <Heart className="w-6 h-6 text-solo-magenta mx-auto" />
                    <p className="text-sm text-solo-gray mt-1">{bossState.stats.hp}</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 text-solo-cyber mx-auto" />
                    <p className="text-sm text-solo-gray mt-1">{bossState.stats.defense}</p>
                  </div>
                  <div className="text-center">
                    <Zap className="w-6 h-6 text-solo-purple mx-auto" />
                    <p className="text-sm text-solo-gray mt-1">{bossState.stats.mana}</p>
                  </div>
                  <div className="text-center">
                    <Sword className="w-6 h-6 text-solo-blue mx-auto" />
                    <p className="text-sm text-solo-gray mt-1">{bossState.stats.power}</p>
                  </div>
                </div>
              </div>
              <StatBar current={bossState.stats.hp} max={bossState.stats.maxHp} color="bg-solo-magenta" />
              <StatBar current={bossState.stats.mana} max={bossState.stats.maxMana} color="bg-solo-blue" />
            </div>
          </div>
        </Card>

        {/* Players */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameState.map((player, index) => (
            <Card 
              key={player.id}
              className={`bg-solo-dark/90 border-solo-purple/30 p-6 ${
                isPlayerTurn && currentTurn === index ? 'ring-2 ring-solo-neon animate-pulse' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-bold text-white">{player.name}</h4>
                    <p className="text-sm text-solo-gray">Nivel {player.level}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-solo-gray">HP</span>
                    <span className="text-solo-magenta">
                      {player.stats.hp}/{player.stats.maxHp}
                    </span>
                  </div>
                  <StatBar 
                    current={player.stats.hp}
                    max={player.stats.maxHp}
                    color="bg-solo-magenta"
                  />

                  <div className="flex justify-between text-sm">
                    <span className="text-solo-gray">Mana</span>
                    <span className="text-solo-blue">
                      {player.stats.mana}/{player.stats.maxMana}
                    </span>
                  </div>
                  <StatBar 
                    current={player.stats.mana}
                    max={player.stats.maxMana}
                    color="bg-solo-blue"
                  />
                </div>

                {isPlayerTurn && currentTurn === index && (
                  <div className="space-y-2">
                    <Button
                      className="w-full bg-solo-purple hover:bg-solo-purple/80"
                      onClick={() => handleAttack(player.id, 'boss-id')}
                      disabled={!turnInProgress}
                    >
                      Atacar
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CombatInterface;
