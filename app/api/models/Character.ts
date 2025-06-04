import { Schema, model, models } from "mongoose";

// 📌 Modelo de personajes del juego
const CharacterSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 📌 Relación con el usuario
  userNickname: { type: String, required: true }, // Agregamos el nickname
  class: { type: String, required: true },
  level: { type: Number, default: 1 },
  slotTraining: { type: Number, default: 1 }, // Slots de entrenamiento disponibles
  stats: {
    fuerza: { type: Number, default: 10 },
    defensa: { type: Number, default: 10 },
    maxHP: { type: Number, default: 100 },
    currentHP: { type: Number, default: 100 },
    maxMana: { type: Number, default: 50 },
    currentMana: { type: Number, default: 50 },
    critico: { type: Number, default: 5 },
    velocidad: { type: Number, default: 10 },
    suerte: { type: Number, default: 10 } // Agregamos suerte
  },
  progression: {
    xp: { type: Number, default: 0 },
    maxXp: { type: Number, default: 1000 },
    bonusXp: { type: Number, default: 0 },
  },
  energy: {
    current: { type: Number, default: 20 },
    max: { type: Number, default: 20 },
    lastRecovery: { type: Date, default: Date.now },
  },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Índices para optimizar búsquedas
CharacterSchema.index({ userId: 1, active: 1 });
CharacterSchema.index({ userNickname: 1 });

export default models.Character || model("Character", CharacterSchema);
