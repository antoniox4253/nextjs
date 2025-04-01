export const DAILY_MISSIONS = [
  {
    id: 'DAILY_LOGIN',
    title: 'Login Diario',
    description: 'Inicia sesión en el juego',
    total: 1,
    rewards: {
      exp: 500,
      gold: 200
    },
    autoComplete: true
  },
  {
    id: 'TRAINING_COMPLETE',
    title: 'Entrenamiento Diario',
    description: 'Completa 4 sesiones de entrenamiento',
    total: 4,
    rewards: {
      exp: 1000,
      gold: 400,
      item: 'training_potion'
    },
    trigger: 'TRAINING_SESSION_COMPLETE'
  },
  {
    id: 'INVITE_FRIENDS',
    title: 'Invita Amigos',
    description: 'Invita a 2 amigos al juego',
    total: 2,
    rewards: {
      exp: 1500,
      gold: 1000,
      wld: 1
    },
    trigger: 'REFERRAL_USED'
  },
  {
    id: 'DUNGEON_RUNS',
    title: 'Explorador de Mazmorras',
    description: 'Completa 2 mazmorras',
    total: 2,
    rewards: {
      exp: 1200,
      gold: 600,
      item: 'dungeon_chest'
    },
    trigger: 'DUNGEON_COMPLETE'
  },
  {
    id: 'SPEND_ENERGY',
    title: 'Gasta Energía',
    description: 'Gasta 10 puntos de energía',
    total: 10,
    rewards: {
      exp: 800,
      gold: 300,
      energy: 5
    },
    trigger: 'ENERGY_SPENT'
  }
]; 