import { Schema, model, models } from "mongoose";

// 📌 Modelo de personajes del juego
const CharacterSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 📌 Relación con el usuario
  class: { type: String, required: true, enum: ["guerrero", "espadachin", "arquero", "curador", "mago", "asesino"] },
  level: { type: Number, default: 1 },
  stats: {
    fuerza: { type: Number, required: true },
    defensa: { type: Number, required: true },
    maxHP: { type: Number, required: true },
    currentHP: { type: Number, required: true },
    maxMana: { type: Number, required: true },
    currentMana: { type: Number, required: true },
    critico: { type: Number, required: true },
    velocidad: { type: Number, required: true },
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

export default models.Character || model("Character", CharacterSchema);
