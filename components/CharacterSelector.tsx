"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, AlertCircle, Swords, Wand2, Target, Heart, Skull, GaugeCircle, Sword } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Mapeo de imágenes por clase
const classImages = {
  guerrero: '/images/classes/guerrero.png',
  espadachin: '/images/classes/espadachin.png',
  arquero: '/images/classes/arquero.png',
  curador: '/images/classes/curador.png',
  mago: '/images/classes/mago.png',
  asesino: '/images/classes/asesino.png'
};

interface Character {
  _id: string;
  class: string;
  level: number;
  active: boolean;
}

const MAX_CHARACTERS = 3;
const NEW_CHARACTER_COST = 5;

interface CharacterSelectorProps {
  onCharacterChange?: () => void;
}

const CharacterSelector = ({ onCharacterChange }: CharacterSelectorProps) => {
  const { t } = useLanguage();
  const { data: session } = useSession();
  const { toast } = useToast();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [userWLD, setUserWLD] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [switchingCharacter, setSwitchingCharacter] = useState<string | null>(null);

  // Cargar datos iniciales
  useEffect(() => {
    if (session?.user?.name) {
      fetchCharacters();
      fetchUserWLD();
    }
  }, [session]);

  // Obtener WLD del usuario
  const fetchUserWLD = async () => {
    if (!session?.user?.name) return;
    try {
      const response = await fetch(`/api/user/stats?hashworld=${session.user.name}`);
      const data = await response.json();
      if (response.ok) {
        setUserWLD(data.wld);
      }
    } catch (error) {
      console.error('Error fetching WLD:', error);
    }
  };

  // Obtener personajes
  const fetchCharacters = async () => {
    if (!session?.user?.name) return;
    
    try {
      const response = await fetch(`/api/user/info?hashworld=${session.user.name}`);
      const data = await response.json();
      
      if (response.ok && data.characters) {
        setCharacters(data.characters);
      }
    } catch (error) {
      toast({
        title: "❌ Error",
        description: "No se pudieron cargar los personajes",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Cambiar personaje activo
  const switchCharacter = async (characterId: string) => {
    if (!session?.user?.name) return;
    setSwitchingCharacter(characterId);

    try {
      const response = await fetch('/api/character/switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ characterId })
      });

      if (response.ok) {
        await fetchCharacters();
        
        // Forzar actualización de componentes
        window.dispatchEvent(new CustomEvent('characterUpdate'));
        
        onCharacterChange?.();
        
        toast({
          title: "✅ Personaje cambiado",
          description: "Has cambiado tu personaje activo"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cambiar el personaje",
        variant: "destructive"
      });
    } finally {
      setSwitchingCharacter(null);
    }
  };

  const handleCreateCharacter = async () => {
    if (!selectedClass || !session?.user?.name) return;

    if (userWLD < NEW_CHARACTER_COST) {
      toast({
        title: "❌ WLD Insuficiente",
        description: `Necesitas ${NEW_CHARACTER_COST} WLD para crear un personaje nuevo`,
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);

    try {
      const response = await fetch('/api/character/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hashworld: session.user.name,
          characterClass: selectedClass,
          cost: NEW_CHARACTER_COST
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Actualizar datos locales
        setUserWLD(data.newWldBalance);
        setCharacters(prev => [...prev, data.character]);
        
        // Forzar actualización de componentes
        window.dispatchEvent(new CustomEvent('currencyUpdate'));
        
        toast({
          title: "✅ Personaje Creado",
          description: `Tu ${selectedClass} ha sido creado exitosamente`,
        });

        setOpen(false);
        onCharacterChange?.();
      } else {
        throw new Error(data.error || 'Error creando personaje');
      }
    } catch (error) {
      toast({
        title: "❌ Error",
        description: error instanceof Error ? error.message : "Error creando personaje",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="bg-solo-dark/50 border-solo-purple/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-solo-purple" />
          <h2 className="text-lg font-semibold text-white">Mis Personajes</h2>
        </div>
        
        {characters.length < MAX_CHARACTERS && (
          <Button
            onClick={() => setOpen(true)}
            className="bg-solo-purple/20 hover:bg-solo-purple/30 border border-solo-purple px-4"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span className="text-sm">Nuevo</span>
          </Button>
        )}
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="grid grid-cols-1 gap-4">
          {characters.map((character) => (
            <Card 
              key={character._id}
              className={`
                relative overflow-hidden transition-all duration-300
                ${character.active 
                  ? 'bg-gradient-to-r from-solo-dark/90 to-solo-dark/70 border-solo-energy ring-1 ring-solo-energy' 
                  : 'bg-solo-dark/60 border-solo-purple/20 hover:border-solo-purple hover:bg-solo-dark/70'
                }
              `}
            >
              <div className="flex items-center p-4 gap-6">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-solo-purple/20 to-transparent rounded-lg" />
                  <Image
                    src={classImages[character.class as keyof typeof classImages]}
                    alt={character.class}
                    fill
                    className="object-contain p-1 rounded-lg"
                    sizes="(max-width: 80px) 100vw, 80px"
                    priority
                  />
                  {character.active && (
                    <Badge className="absolute -top-2 -right-2 bg-solo-energy font-medium">
                      Activo
                    </Badge>
                  )}
                </div>

                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {character.class === 'guerrero' && <Swords className="w-4 h-4 text-solo-energy" />}
                      {character.class === 'mago' && <Wand2 className="w-4 h-4 text-solo-magenta" />}
                      {character.class === 'arquero' && <Target className="w-4 h-4 text-solo-cyber" />}
                      {character.class === 'curador' && <Heart className="w-4 h-4 text-red-500" />}
                      {character.class === 'asesino' && <Skull className="w-4 h-4 text-solo-guild" />}
                      {character.class === 'espadachin' && <Sword className="w-4 h-4 text-solo-energy" />}
                      <h3 className="font-medium text-white capitalize">{character.class}</h3>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="text-xs border-solo-purple text-solo-purple bg-solo-dark/50 flex items-center gap-1"
                    >
                      <GaugeCircle className="w-3 h-3" />
                      Nivel {character.level}
                    </Badge>
                  </div>

                  {!character.active && (
                    <Button 
                      onClick={() => switchCharacter(character._id)}
                      disabled={switchingCharacter !== null}
                      className="mt-3 w-full bg-solo-purple/20 hover:bg-solo-purple/30 border border-solo-purple transition-colors"
                    >
                      {switchingCharacter === character._id ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-t-transparent border-solo-energy rounded-full animate-spin" />
                          <span>Cambiando...</span>
                        </div>
                      ) : (
                        <span>Seleccionar</span>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-solo-dark border-solo-purple/30">
          <DialogHeader>
            <DialogTitle className="text-white">Crear nuevo personaje</DialogTitle>
            <DialogDescription className="text-solo-gray">
              Selecciona una clase para tu nuevo personaje. Costo: {NEW_CHARACTER_COST} WLD
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 p-4">
            {Object.entries(classImages).map(([className, imagePath]) => (
              <Button
                key={className}
                onClick={() => setSelectedClass(className)}
                variant="outline"
                className={`
                  relative h-32 p-2 rounded-lg
                  ${selectedClass === className 
                    ? 'border-solo-energy ring-2 ring-solo-energy ring-offset-2 ring-offset-solo-dark' 
                    : 'border-solo-purple/20 hover:border-solo-purple/40'
                  }
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-solo-purple/10 to-transparent rounded-lg" />
                <div className="relative w-full h-full">
                  <Image
                    src={imagePath}
                    alt={className}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 120px) 100vw, 120px"
                  />
                </div>
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 capitalize text-white text-sm">
                  {className}
                </span>
              </Button>
            ))}
          </div>

          <DialogFooter>
            <Button
              onClick={handleCreateCharacter}
              disabled={!selectedClass || isCreating || userWLD < NEW_CHARACTER_COST}
              className="w-full bg-solo-purple/20 hover:bg-solo-purple/30 border border-solo-purple text-white"
            >
              {isCreating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                  <span>Creando...</span>
                </div>
              ) : userWLD < NEW_CHARACTER_COST ? (
                <span>WLD Insuficiente ({userWLD}/{NEW_CHARACTER_COST})</span>
              ) : (
                <span>Crear Personaje ({NEW_CHARACTER_COST} WLD)</span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CharacterSelector;