import { Schema, model, models } from "mongoose";

const WeeklyRankingSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  characterId: { 
    type: Schema.Types.ObjectId, 
    ref: "Character", 
    required: true 
  },
  weekNumber: { 
    type: Number, 
    required: true 
  }, // Número de semana del año
  year: { 
    type: Number, 
    required: true 
  },
  experience: { 
    type: Number, 
    default: 0 
  },
  dungeonClears: { 
    type: Number, 
    default: 0 
  },
  lastUpdate: { 
    type: Date, 
    default: Date.now 
  }
});

// Índices compuestos
WeeklyRankingSchema.index({ weekNumber: 1, year: 1 });
WeeklyRankingSchema.index({ experience: -1 });

export default models.WeeklyRanking || model("WeeklyRanking", WeeklyRankingSchema); 