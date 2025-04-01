"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { TRAININGS, Training, TrainingCategories, TrainingStats } from '@/config/trainings';
import { Progress } from '@/components/ui/progress';
import { Character, CharacterStats } from '@/types/game';
import { Clock, Swords, Shield, Wind, Target, Heart, Droplet, Circle } from 'lucide-react';

// Extender el tipo User de next-auth
declare module "next-auth" {
  interface User {
    hashworld: string;    
  }
}

interface TrainingSectionProps {
  category: keyof TrainingCategories;
}

interface ActiveTraining {
  id: string;
  trainingId: string;
  category: string;
  timeLeft: number;
  endTime: Date;
  completed: boolean;
}

const TrainingSection = ({ category }: TrainingSectionProps) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [character, setCharacter] = useState<Character | null>(null);
  const [activeTrainings, setActiveTrainings] = useState<ActiveTraining[]>([]);
  const [trainingProgress, setTrainingProgress] = useState<{ [key: string]: number }>({});
  const [trainingInProgress, setTrainingInProgress] = useState<{ [key: string]: boolean }>({});
  const [trainingTimers, setTrainingTimers] = useState<{ [key: string]: number }>({});

  // Cargar personaje activo
  useEffect(() => {
    const loadCharacter = async () => {
      if (!session?.user?.name) return;
      try {
        const response = await fetch(`/api/character/active?hashworld=${session.user.name}`);
        if (!response.ok) throw new Error('Error cargando personaje');
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error('Error loading character:', error);
        toast({
          title: "❌ Error",
          description: "No se pudo cargar el personaje",
          variant: "destructive"
        });
      }
    };

    loadCharacter();
  }, [session, toast]);

  // Verificar entrenamientos activos y actualizar timers

  
  // Actualizar timers cada segundo y verificar completados

  // Verificar si puede iniciar nuevo entrenamiento

  // Marcar este entrenamiento específico como en progreso
   
  // Verificar energía del personaje activo

  // Actualizar el personaje localmente
     
  // Agregar el nuevo entrenamiento a la lista de activos
      



  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {/* Mostrar contador de slots disponibles */}
      <div className="text-sm text-solo-gray mb-4">
        Slots Activos: {activeTrainings.filter(t => !t.completed && t.timeLeft > 0).length}/{character?.slotTraining || 1}
      </div>

      {TRAININGS[category].map((training: Training) => {
        const activeTraining = activeTrainings.find(t => t.trainingId === training.id);
        
        return (
          <Card 
            key={training.id}
            className={`p-6 transition-all ${
              activeTraining 
                ? 'bg-gradient-to-r from-solo-purple/20 to-solo-dark/60 border-solo-purple/40'
                : 'bg-solo-dark/60 border-solo-purple/20 hover:border-solo-purple/40 hover:bg-solo-dark/70'
            }`}
          >
            <div className="flex items-start gap-6">
              {/* Icono y Energía */}
              <div className="flex flex-col items-center gap-2">
                <div className="text-4xl bg-solo-dark/50 p-4 rounded-lg border border-solo-purple/20">
                  {training.icon}
                </div>
                <div className="text-center">
                  <div className="text-solo-energy text-lg font-bold">
                    {training.energyCost}
                  </div>
                  <div className="text-xs text-solo-gray">
                    Energía
                  </div>
                </div>
              </div>

              {/* Contenido Principal */}
              <div className="flex-grow space-y-4">
                {/* Título y Descripción */}
                <div>
                  <h3 className="text-xl font-bold text-white">{training.name}</h3>
                  <p className="text-sm text-solo-gray mt-1">{training.description}</p>
                </div>

                {/* Stats que mejora */}
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(training.stats).map(([stat, value]) => (
                    <div 
                      key={stat}
                      className="flex items-center gap-2 bg-solo-dark/40 p-2 rounded-lg border border-solo-purple/10"
                    >
                      <div className="text-solo-purple">
                        {getStatIcon(stat as keyof TrainingStats)}
                      </div>
                      <div>
                        <div className="text-xs text-solo-gray capitalize">
                          {stat}
                        </div>
                        <div className="text-sm text-white">
                          +{value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progreso o Botón */}
                {activeTraining ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-solo-gray mb-1">
                      <span>Progreso</span>
                      <span>
                        {trainingTimers[activeTraining.id] || 0}s restantes
                      </span>
                    </div>
                    <Progress 
                      value={trainingProgress[activeTraining.id] || 0} 
                      className="h-2"
                      indicatorClassName="bg-gradient-to-r from-solo-purple to-solo-magenta"
                    />
                  </div>
                ) : (
                  <Button
                    //boton on click
                    
                    className={`w-full h-12 relative overflow-hidden
                      ${trainingInProgress[training.id] 
                        ? 'bg-solo-dark/50 text-solo-gray cursor-not-allowed' 
                        : !character || character.energy.current < training.energyCost 
                          ? 'bg-solo-dark/50 text-solo-gray cursor-not-allowed' 
                          : 'bg-gradient-to-r from-solo-purple to-solo-magenta hover:opacity-90'
                      }`}
                  >
                    {trainingInProgress[training.id] ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin" />
                        <span>Iniciando...</span>
                      </div>
                    ) : !character ? (
                      <span>Cargando...</span>
                    ) : character.energy.current < training.energyCost ? (
                      <span>Energía insuficiente</span>
                    ) : (
                      <span>Iniciar entrenamiento</span>
                    )}
                  </Button>
                )}

                {/* Duración */}
                <div className="flex items-center justify-center gap-2 text-sm text-solo-gray">
                  <Clock className="w-4 h-4" />
                  <span>Duración: {training.duration} segundos</span>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

// Helper para iconos de stats con tipo específico
const getStatIcon = (stat: keyof TrainingStats) => {
  const icons: Record<keyof TrainingStats, JSX.Element> = {
    fuerza: <Swords className="w-4 h-4" />,
    defensa: <Shield className="w-4 h-4" />,
    velocidad: <Wind className="w-4 h-4" />,
    critico: <Target className="w-4 h-4" />,
    maxHP: <Heart className="w-4 h-4" />,
    maxMana: <Droplet className="w-4 h-4" />
  };
  return icons[stat] || <Circle className="w-4 h-4" />;
};

export default TrainingSection;
