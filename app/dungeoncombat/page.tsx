import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CombatInterface from '@/components/CombatInterface';
import { useToast } from '@/components/ui/use-toast';

const defaultPlayers = [
  {
    id: "p1",
    name: "Player 1",
    level: 1,
    stats: {
      hp: 100,
      maxHp: 100,
      power: 20,
      defense: 10,
      mana: 50,
      maxMana: 50
    },
    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

const DungeonCombat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Ensure we have valid player data or use defaults
  const players = (location.state?.players?.length > 0 ? location.state.players : defaultPlayers)
    .map(player => ({
      ...player,
      stats: {
        hp: player.stats?.hp ?? 100,
        maxHp: player.stats?.maxHp ?? 100,
        power: player.stats?.power ?? 20,
        defense: player.stats?.defense ?? 10,
        mana: player.stats?.mana ?? 50,
        maxMana: player.stats?.maxMana ?? 50
      }
    }));

  const handleCombatEnd = (winner: any) => {
    toast({
      title: "¡Combate finalizado!",
      description: `${winner.name} es victorioso!`,
    });
    setTimeout(() => navigate('/dungeon'), 3000);
  };

  return (
    <CombatInterface
      players={players}
      onCombatEnd={handleCombatEnd}
    />
  );
};

export default DungeonCombat;