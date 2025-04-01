// Definir interfaces para los tipos
export interface TrainingStats {
  fuerza?: number;
  defensa?: number;
  velocidad?: number;
  critico?: number;
  maxHP?: number;
  maxMana?: number;
}

export interface Training {
  id: string;
  name: string;
  description: string;
  icon: string;
  energyCost: number;
  duration: number;
  stats: TrainingStats;
}

export interface TrainingCategories {
  physical: Training[];
  magical: Training[];
}

export const TRAININGS: TrainingCategories = {
  physical: [
    {
      id: 'strength_training',
      name: 'Entrenamiento de Fuerza',
      description: 'Mejora tu fuerza física',
      icon: '💪',
      energyCost: 3,
      duration: 180,
      stats: {
        fuerza: 2
      }
    },
    {
      id: 'defense_training',
      name: 'Entrenamiento de Defensa',
      description: 'Mejora tu resistencia',
      duration: 270,
      energyCost: 2,
      stats: {
        defensa: 1
      },
      icon: '🛡️'
    },
    {
      id: 'speed_training',
      name: 'Entrenamiento de Velocidad',
      description: 'Aumenta tu agilidad',
      duration: 180,
      energyCost: 2,
      stats: {
        velocidad: 1
      },
      icon: '⚡'
    },
    {
      id: 'critical_training',
      name: 'Entrenamiento de Precisión',
      description: 'Mejora tu golpe crítico',
      duration: 270,
      energyCost: 4,
      stats: {
        critico: 1
      },
      icon: '🎯'
    }
  ],
  magical: [
    {
      id: 'mana_training',
      name: 'Entrenamiento de Mana',
      description: 'Incrementa tu poder mágico',
      icon: '✨',
      energyCost: 4,
      duration: 270,
      stats: {
        maxMana: 5
      }
    },
    {
      id: 'spell_training',
      name: 'Práctica de Hechizos',
      description: 'Mejora tu control mágico',
      duration: 360,
      energyCost: 5,
      stats: {
        maxMana: 3,
        critico: 1
      },
      icon: '🔮'
    }
  ]
}; 