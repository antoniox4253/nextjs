import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Users, Edit2, UserPlus, Share2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Character {
  id: string;
  name: string;
  level: number;
  class: 'warrior' | 'assassin' | 'mage';
  isActive: boolean;
  image: string;
}

const characters: Character[] = [
  {
    id: '1',
    name: 'ShadowHunter',
    level: 45,
    class: 'assassin',
    isActive: true,
    image: '/images/asesino.png'
  },
  {
    id: '2',
    name: 'LightBringer',
    level: 30,
    class: 'warrior',
    isActive: false,
    image: '/images/guerrero.png'
  },
  {
    id: '3',
    name: 'SpellWeaver',
    level: 25,
    class: 'mage',
    isActive: false,
    image: '/images/mago.png'
  }
];

const CharacterSelector = () => {
  const { t } = useLanguage();

  return (
    <Card className="bg-solo-dark/80 border-solo-purple/30 p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-solo-purple/20 to-transparent opacity-50" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-solo-purple" />
            <h2 className="text-xl font-bold text-white">{t('myCharacters')}</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-solo-purple" />
              <span className="text-sm text-solo-gray">{t('referrals')}: 12</span>
            </div>
            <button className="p-2 rounded-full bg-solo-dark/60 border border-solo-purple/30 hover:bg-solo-purple/20 transition-colors">
              <UserPlus className="w-4 h-4 text-solo-purple" />
            </button>
          </div>
        </div>

        <ScrollArea className="h-[300px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {characters.map((character) => (
              <Card 
                key={character.id}
                className={`p-4 bg-solo-dark/60 border-solo-purple/20 hover:border-solo-purple transition-all ${
                  character.isActive ? 'ring-2 ring-solo-purple ring-offset-2 ring-offset-solo-dark' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16">
                    <img 
                      src={character.image} 
                      alt={character.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {character.isActive && (
                      <Badge className="absolute -top-2 -right-2 bg-solo-purple">
                        {t('active')}
                      </Badge>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-white">{character.name}</h3>
                      <button className="p-1.5 rounded-full hover:bg-solo-purple/20 transition-colors">
                        <Edit2 className="w-4 h-4 text-solo-purple" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs border-solo-purple text-solo-purple">
                        {t('level')} {character.level}
                      </Badge>
                      <span className="text-sm text-solo-gray">{t(character.class)}</span>
                    </div>
                    {!character.isActive && (
                      <button className="mt-2 w-full py-1 px-3 rounded text-sm bg-solo-purple/20 border border-solo-purple text-white hover:bg-solo-purple/30 transition-colors">
                        {t('select')}
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
};

export default CharacterSelector;