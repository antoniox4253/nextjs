import { Schema, model, models } from "mongoose";

const TrainingSchema = new Schema({
  characterId: { 
    type: Schema.Types.ObjectId, 
    ref: "Character", 
    required: true,
    index: true
  },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    index: true
  },
  trainingId: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    enum: ['physical', 'magical'], 
    required: true 
  },
  startTime: { 
    type: Date, 
    default: Date.now,
    index: true
  },
  endTime: { 
    type: Date, 
    required: true,
    index: true
  },
  completed: { 
    type: Boolean, 
    default: false,
    index: true
  },
  stats: {
    type: {
      fuerza: { type: Number },
      defensa: { type: Number },
      maxHP: { type: Number },
      maxMana: { type: Number },
      critico: { type: Number },
      velocidad: { type: Number },
      suerte: { type: Number }
    },
    required: true
  },
  statsApplied: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Índices para búsquedas comunes
TrainingSchema.index({ characterId: 1, completed: 1 });
TrainingSchema.index({ userId: 1, completed: 1 });

export default models.Training || model("Training", TrainingSchema); 