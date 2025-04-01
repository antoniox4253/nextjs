export interface CharacterStats {
  fuerza: number;
  defensa: number;
  maxHP: number;
  currentHP: number;
  maxMana: number;
  currentMana: number;
  critico: number;
  velocidad: number;
}

export interface CharacterEnergy {
  current: number;
  max: number;
  lastRecovery: Date;
}

export interface CharacterProgression {
  xp: number;
  maxXp: number;
  level: number;
}

export interface Character {
  _id: string;
  userId: string;
  userNickname: string;
  class: string;
  level: number;
  slotTraining: number;
  stats: CharacterStats;
  progression: CharacterProgression;
  energy: CharacterEnergy;
  active: boolean;
  createdAt: string;
}

export interface UserStats {
  gold: number;
  wld: number;
  referredCount: number;
} 