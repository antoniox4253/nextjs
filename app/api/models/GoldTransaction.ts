import { Schema, model, models } from "mongoose";

// Tipos de transacciones de oro
export type GoldTransactionType = 
  | 'QUEST_REWARD'        // Recompensa por misión
  | 'MONSTER_KILL'        // Oro por matar monstruos
  | 'ITEM_PURCHASE'       // Compra de item
  | 'ITEM_SALE'          // Venta de item
  | 'MARKET_PURCHASE'     // Compra en el mercado
  | 'MARKET_SALE'        // Venta en el mercado
  | 'REPAIR_COST'        // Costo de reparación de items
  | 'SKILL_TRAINING'     // Entrenamiento de habilidades
  | 'DUNGEON_REWARD'     // Recompensa de mazmorra
  | 'GUILD_CONTRIBUTION'  // Contribución a la guild
  | 'GUILD_REWARD'       // Recompensa de la guild
  | 'DAILY_REWARD'       // Recompensa diaria
  | 'SYSTEM_ADJUSTMENT'; // Ajuste del sistema

const GoldTransactionSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    index: true
  },
  characterId: { 
    type: Schema.Types.ObjectId, 
    ref: "Character", 
    required: true,
    index: true
  }, // El personaje que realizó la transacción
  type: { 
    type: String, 
    required: true,
    enum: [
      'QUEST_REWARD',
      'MONSTER_KILL',
      'ITEM_PURCHASE',
      'ITEM_SALE',
      'MARKET_PURCHASE',
      'MARKET_SALE',
      'REPAIR_COST',
      'SKILL_TRAINING',
      'DUNGEON_REWARD',
      'GUILD_CONTRIBUTION',
      'GUILD_REWARD',
      'DAILY_REWARD',
      'SYSTEM_ADJUSTMENT'
    ]
  },
  amount: { 
    type: Number, 
    required: true 
  }, // Cantidad (negativo para gastos, positivo para ingresos)
  description: { 
    type: String, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now,
    index: true
  },
  location: {
    type: String,
    required: true
  }, // Dónde ocurrió la transacción (ciudad, mazmorra, etc)
  metadata: {
    type: Map,
    of: Schema.Types.Mixed
  }, // Datos adicionales (IDs de items, monstruos, etc)
  balanceAfter: { 
    type: Number, 
    required: true 
  }, // Balance después de la transacción
  relatedCharacterId: { 
    type: Schema.Types.ObjectId, 
    ref: "Character"
  }, // Para transacciones entre personajes
});

// Índices compuestos para búsquedas comunes
GoldTransactionSchema.index({ userId: 1, timestamp: -1 });
GoldTransactionSchema.index({ characterId: 1, timestamp: -1 });
GoldTransactionSchema.index({ userId: 1, type: 1 });
GoldTransactionSchema.index({ characterId: 1, type: 1 });

export default models.GoldTransaction || model("GoldTransaction", GoldTransactionSchema); 