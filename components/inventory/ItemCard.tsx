import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface ItemCardProps {
  item: InventoryItem;
  onClick: () => void;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory' | 'consumable' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  level: number;
  stats: { [key: string]: string | number };
  description: string;
  icon: React.ReactNode;
  isEquipped?: boolean;
}

export const rarityColors = {
  common: 'text-gray-400 border-gray-400',
  rare: 'text-solo-blue border-solo-blue',
  epic: 'text-solo-purple border-solo-purple',
  legendary: 'text-solo-cyber border-solo-cyber',
  mythic: 'text-solo-guild border-solo-guild'
};

export const rarityGradients = {
  common: 'from-gray-400/20',
  rare: 'from-solo-blue/20',
  epic: 'from-solo-purple/20',
  legendary: 'from-solo-cyber/20',
  mythic: 'from-solo-guild/20'
};

const ItemCard = ({ item, onClick }: ItemCardProps) => {
  return (
    <Card 
      onClick={onClick}
      className={`bg-solo-dark/60 border-${rarityColors[item.rarity].split(' ')[1]} p-4 flex items-center gap-4 group hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden`}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${rarityGradients[item.rarity]} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
      
      <div className={`relative p-3 rounded-lg bg-solo-dark/80 ${rarityColors[item.rarity]}`}>
        {item.icon}
        {item.isEquipped && (
          <div className="absolute -top-1 -right-1">
            <Star className="w-4 h-4 text-solo-energy fill-solo-energy animate-pulse" />
          </div>
        )}
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center gap-2">
          <h4 className={`font-medium ${rarityColors[item.rarity].split(' ')[0]}`}>{item.name}</h4>
          <Badge variant="outline" className={`${rarityColors[item.rarity]} text-xs`}>
            Nv.{item.level}
          </Badge>
        </div>
        <p className="text-sm text-solo-gray mt-1">
          {Object.entries(item.stats)[0][0]}: {Object.entries(item.stats)[0][1]}
        </p>
      </div>
    </Card>
  );
};

export default ItemCard;