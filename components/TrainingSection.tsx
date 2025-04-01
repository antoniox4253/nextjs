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
  useEffect(() => {
    const checkActiveTrainings = async () => {
      if (!session?.user?.name) return;

      try {
        const response = await fetch(`/api/training/active?hashworld=${session.user.name}`);
        const data = await response.json();

        if (data.active) {
          // Verificar cada entrenamiento y completar si es necesario
          for (const training of data.trainings) {
            if (training.category === category && training.timeLeft <= 0 && !training.completed) {
              console.log('Completando entrenamiento:', training.id);
              await completeTraining(training.id);
            }
          }

          setActiveTrainings(data.trainings);
          
          // Actualizar timers solo para entrenamientos no completados
          const newTimers: { [key: string]: number } = {};
          data.trainings.forEach((training: ActiveTraining) => {
            if (!training.completed && training.category === category) {
              const trainingConfig = TRAININGS[category].find(t => t.id === training.trainingId);
              if (trainingConfig) {
                newTimers[training.id] = training.timeLeft;
              }
            }
          });
          setTrainingTimers(newTimers);
        } else {
          setActiveTrainings([]);
          setTrainingTimers({});
        }
      } catch (error) {
        console.error('Error checking active trainings:', error);
      }
    };

    checkActiveTrainings();
    const interval = setInterval(checkActiveTrainings, 1000);
    return () => clearInterval(interval);
  }, [session, category]);

  // Actualizar timers cada segundo y verificar completados
  useEffect(() => {
    const timer = setInterval(() => {
      setTrainingTimers(prev => {
        const updated = { ...prev };
        let needsUpdate = false;
        
        Object.keys(updated).forEach(key => {
          if (updated[key] > 0) {
            updated[key] -= 1;
            if (updated[key] === 0) {
              needsUpdate = true;
              // Buscar el entrenamiento correspondiente
              const training = activeTrainings.find(t => t.id === key);
              if (training && !training.completed) {
                completeTraining(key);
              }
            }
          }
        });

        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTrainings]);

  // Verificar si puede iniciar nuevo entrenamiento
  const canStartNewTraining = () => {
    if (!character) {
      console.log('No hay personaje cargado');
      return false;
    }
    
    const currentActiveTrainings = activeTrainings.filter(t => !t.completed && t.timeLeft > 0).length;
    
    console.log('Validación de inicio de entrenamiento:', {
      slotsDisponibles: character.slotTraining,
      entrenamientosActivos: currentActiveTrainings,
      todosLosEntrenamientos: activeTrainings,
      entrenamientosFiltrados: activeTrainings.filter(t => !t.completed && t.timeLeft > 0)
    });
    
    return currentActiveTrainings < (character.slotTraining || 1);
  };

  const startTraining = async (trainingId: string) => {
    if (!session?.user?.name || !character) {
      console.log('No hay sesión o personaje:', { session: !!session, character: !!character });
      return;
    }

    // Verificar slots disponibles
    const currentActive = activeTrainings.filter(t => !t.completed && t.timeLeft > 0).length;
    console.log('Verificación de slots:', {
      currentActive,
      maxSlots: character.slotTraining,
      activeTrainings,
      canStart: canStartNewTraining()
    });

    if (!canStartNewTraining()) {
      toast({
        title: "❌ Slots llenos",
        description: `Tienes ${currentActive}/${character.slotTraining} entrenamientos activos`,
        variant: "destructive"
      });
      return;
    }

    // Marcar este entrenamiento específico como en progreso
    setTrainingInProgress(prev => ({ ...prev, [trainingId]: true }));
    console.log('Iniciando entrenamiento:', { trainingId, category });

    const training = TRAININGS[category].find((t: Training) => t.id === trainingId);
    if (!training) {
      console.log('Entrenamiento no encontrado:', trainingId);
      return;
    }

    // Verificar energía
    console.log('Verificación de energía:', {
      required: training.energyCost,
      current: character.energy.current
    });

    if (character.energy.current < training.energyCost) {
      toast({
        title: "❌ Energía insuficiente",
        description: `Necesitas ${training.energyCost} energía. Tienes ${character.energy.current}`,
        variant: "destructive"
      });
      return;
    }

    try {
      console.log('Enviando petición al servidor...');
      const response = await fetch('/api/training/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hashworld: session.user.name,
          trainingId,
          category,
          energyCost: training.energyCost
        })
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar entrenamiento');
      }

      // Actualizar el personaje localmente
      setCharacter(prevChar => {
        if (!prevChar) return null;
        console.log('Actualizando energía:', {
          anterior: prevChar.energy.current,
          nueva: data.newEnergy
        });
        const updatedChar = {
          ...prevChar,
          energy: {
            ...prevChar.energy,
            current: data.newEnergy
          }
        };
        window.dispatchEvent(new Event('energyChanged'));
        return updatedChar;
      });

      // Agregar el nuevo entrenamiento a la lista de activos
      setActiveTrainings(prevTrainings => {
        console.log('Actualizando entrenamientos activos:', {
          anteriores: prevTrainings,
          nuevo: {
            id: data.trainingId,
            trainingId,
            category,
            timeLeft: training.duration,
            endTime: new Date(data.endTime),
            completed: false
          }
        });
        return [...prevTrainings, {
          id: data.trainingId,
          trainingId,
          category,
          timeLeft: training.duration,
          endTime: new Date(data.endTime),
          completed: false
        }];
      });

      toast({
        title: "✅ Entrenamiento iniciado",
        description: `Has comenzado el entrenamiento de ${training.name}`
      });

    } catch (error) {
      console.error('Error detallado al iniciar entrenamiento:', error);
      toast({
        title: "❌ Error",
        description: error instanceof Error ? error.message : "No se pudo iniciar el entrenamiento",
        variant: "destructive"
      });
    } finally {
      console.log('Finalizando proceso de inicio de entrenamiento');
      setTrainingInProgress(prev => ({ ...prev, [trainingId]: false }));
    }
  };

  const completeTraining = async (trainingId: string) => {
    if (!session?.user?.name) return;
  
    try {
      console.log('Iniciando completado de entrenamiento:', trainingId);
      
      const response = await fetch('/api/training/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hashworld: session.user.name,
          trainingId
        })
      });
  
      const data = await response.json();
  
      // 🔴 Agrega este console.log justo aquí 🔴
      console.log('Respuesta del backend al completar:', data);
  
      if (!response.ok) {
        throw new Error(data.error || 'Error al completar entrenamiento');
      }
  
      // Actualizar la lista de entrenamientos localmente
      setActiveTrainings(prev => 
        prev.map(t => 
          t.id === trainingId 
            ? { ...t, completed: true } 
            : t
        )
      );
  
      // Limpiar el timer para este entrenamiento
      setTrainingTimers(prev => {
        const updated = { ...prev };
        delete updated[trainingId];
        return updated;
      });
  
      // 🔥 Verificar si newStats está presente antes de actualizar el personaje
      if (data.newStats) {
        setCharacter(prevChar => {
          if (!prevChar) return null;
          return {
            ...prevChar,
            stats: {
              ...prevChar.stats,
              ...data.newStats // ✅ Se suman los nuevos stats correctamente
            },
            progression: {
              ...prevChar.progression,
              xp: data.newXP
            }
          };
        });
      }
  
      toast({
        title: "✅ Entrenamiento completado",
        description: `Has ganado ${data.xpGained} XP`
      });
  
    } catch (error) {
      console.error('Error en completeTraining:', error);
      toast({
        title: "❌ Error",
        description: "No se pudo completar el entrenamiento",
        variant: "destructive"
      });
    }
  };
  

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
                    onClick={() => startTraining(training.id)}
                    disabled={
                      trainingInProgress[training.id] || 
                      !character || 
                      character.energy.current < training.energyCost || 
                      !canStartNewTraining()
                    }
                    className={`w-full h-12 relative overflow-hidden
                      ${trainingInProgress[training.id] || !canStartNewTraining()
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
