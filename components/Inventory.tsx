import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Box, Sword, Shield, CircleDot, FlaskConical, Crown, Package } from 'lucide-react';
import ItemCard, { InventoryItem } from './inventory/ItemCard';
import ItemDetails from './inventory/ItemDetails';

const mockItems: InventoryItem[] = [
  { 
    id: '1', 
    name: 'Espada del Cazador de Demonios', 
    type: 'weapon', 
    rarity: 'legendary',
    level: 45,
    stats: {
      'Daño': '+2500',
      'Crítico': '+15%',
      'Velocidad de Ataque': '+10%'
    },
    description: 'Una espada legendaria forjada con el alma de un demonio ancestral.',
    icon: <Sword className="w-6 h-6" />,
    isEquipped: true
  },
  { 
    id: '2', 
    name: 'Armadura de Sombras Eternas', 
    type: 'armor', 
    rarity: 'mythic',
    level: 50,
    stats: {
      'Defensa': '+1800',
      'HP': '+1000',
      'Resistencia Mágica': '+25%'
    },
    description: 'Armadura forjada en las profundidades del abismo, otorga poder sobre las sombras.',
    icon: <Shield className="w-6 h-6" />,
    isEquipped: true
  },
  { 
    id: '3', 
    name: 'Anillo del Monarca', 
    type: 'accessory', 
    rarity: 'epic',
    level: 40,
    stats: {
      'Poder Mágico': '+500',
      'Mana': '+300',
      'Regeneración de Mana': '+15%'
    },
    description: 'Un anillo que contiene el poder de los antiguos monarcas.',
    icon: <CircleDot className="w-6 h-6" />
  },
  { 
    id: '4', 
    name: 'Poción de Ascensión', 
    type: 'consumable', 
    rarity: 'rare',
    level: 1,
    stats: {
      'Duración': '30min',
      'Efecto': 'Aumenta todos los stats en 20%'
    },
    description: 'Poción especial que incrementa temporalmente todos los atributos.',
    icon: <FlaskConical className="w-6 h-6" />
  },
  { 
    id: '5', 
    name: 'Corona del Rey Demonio', 
    type: 'special', 
    rarity: 'mythic',
    level: 60,
    stats: {
      'Todos los Stats': '+15%',
      'Daño a Demonios': '+50%',
      'Resistencia Demoníaca': '+30%'
    },
    description: 'Reliquia legendaria que perteneció al Rey Demonio original.',
    icon: <Crown className="w-6 h-6" />
  },
];

const rarityColors = {
  common: 'text-gray-400 border-gray-400',
  rare: 'text-solo-blue border-solo-blue',
  epic: 'text-solo-purple border-solo-purple',
  legendary: 'text-solo-cyber border-solo-cyber',
  mythic: 'text-solo-guild border-solo-guild'
};

const rarityGradients = {
  common: 'from-gray-400/20',
  rare: 'from-solo-blue/20',
  epic: 'from-solo-purple/20',
  legendary: 'from-solo-cyber/20',
  mythic: 'from-solo-guild/20'
};

const Inventory = () => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  return (
    <div className="container mx-auto p-4 animate-fade-in">
      <Card className="bg-solo-dark/90 border-solo-purple/30 p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-solo-purple/20 to-transparent opacity-50" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-8 h-8 text-solo-purple animate-pulse-glow" />
            <h2 className="text-2xl font-bold text-white">Inventario del Cazador</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <Tabs defaultValue="equipped" className="w-full">
                <TabsList className="w-full bg-solo-dark/50 border border-solo-purple/30">
                  <TabsTrigger value="equipped" className="flex-1">Equipado</TabsTrigger>
                  <TabsTrigger value="inventory" className="flex-1">Inventario</TabsTrigger>
                  <TabsTrigger value="special" className="flex-1">Especial</TabsTrigger>
                </TabsList>

                <TabsContent value="equipped" className="mt-4">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="grid grid-cols-1 gap-3">
                      {mockItems.filter(item => item.isEquipped).map((item) => (
                        <ItemCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="inventory" className="mt-4">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="grid grid-cols-1 gap-3">
                      {mockItems.filter(item => !item.isEquipped && item.type !== 'special').map((item) => (
                        <ItemCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="special" className="mt-4">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="grid grid-cols-1 gap-3">
                      {mockItems.filter(item => item.type === 'special').map((item) => (
                        <ItemCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <Card className="bg-solo-dark/60 border-solo-purple/30 p-4 h-full">
                <ItemDetails selectedItem={selectedItem} />
              </Card>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Inventory;
