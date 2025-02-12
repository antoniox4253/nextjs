import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';
import { InventoryItem, rarityColors } from './ItemCard';

interface ItemDetailsProps {
  selectedItem: InventoryItem | null;
}

const ItemDetails = ({ selectedItem }: ItemDetailsProps) => {
  if (!selectedItem) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-solo-gray space-y-4">
        <Package className="w-12 h-12" />
        <p>Selecciona un item para ver sus detalles</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className={`p-4 rounded-lg bg-solo-dark/80 ${rarityColors[selectedItem.rarity]}`}>
          {selectedItem.icon}
        </div>
        <div>
          <h3 className={`text-xl font-bold ${rarityColors[selectedItem.rarity].split(' ')[0]}`}>
            {selectedItem.name}
          </h3>
          <div className="flex gap-2 mt-1">
            <Badge variant="outline" className={rarityColors[selectedItem.rarity]}>
              {selectedItem.rarity.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="border-solo-purple text-solo-purple">
              Nivel {selectedItem.level}
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-solo-gray font-medium">Estadísticas</h4>
          {Object.entries(selectedItem.stats).map(([stat, value]) => (
            <div key={stat} className="flex justify-between items-center">
              <span className="text-white">{stat}</span>
              <span className={`${rarityColors[selectedItem.rarity].split(' ')[0]}`}>{value}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h4 className="text-solo-gray font-medium">Descripción</h4>
          <p className="text-white/80 text-sm">{selectedItem.description}</p>
        </div>

        {selectedItem.isEquipped ? (
          <button className="w-full py-2 px-4 rounded bg-solo-dark border border-solo-purple/50 text-solo-purple hover:bg-solo-purple/20 transition-colors">
            Desequipar
          </button>
        ) : (
          <button className="w-full py-2 px-4 rounded bg-solo-purple/20 border border-solo-purple text-white hover:bg-solo-purple/30 transition-colors">
            Equipar
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;