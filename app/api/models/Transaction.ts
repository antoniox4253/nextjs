import { Schema, model, models } from "mongoose";

// Tipos de transacciones
export type TransactionType = 
  | 'CHARACTER_CREATION'   // Creación de personaje
  | 'REFERRAL_BONUS'      // Bonus por referido
  | 'DAILY_REWARD'        // Recompensa diaria
  | 'QUEST_REWARD'        // Recompensa por misión
  | 'ITEM_PURCHASE'       // Compra de item
  | 'ITEM_SALE'          // Venta de item
  | 'TRANSFER'           // Transferencia entre usuarios
  | 'BATTLE_REWARD'      // Recompensa por batalla
  | 'SYSTEM_ADJUSTMENT'; // Ajuste del sistema

const TransactionSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    index: true
  },
  type: { 
    type: String, 
    required: true,
    enum: [
      'CHARACTER_CREATION',
      'REFERRAL_BONUS',
      'DAILY_REWARD',
      'QUEST_REWARD',
      'ITEM_PURCHASE',
      'ITEM_SALE',
      'TRANSFER',
      'BATTLE_REWARD',
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
  relatedUserId: { 
    type: Schema.Types.ObjectId, 
    ref: "User"
  }, // Para transferencias entre usuarios
  metadata: {
    type: Map,
    of: Schema.Types.Mixed
  }, // Datos adicionales específicos del tipo de transacción
  balanceAfter: { 
    type: Number, 
    required: true 
  }, // Balance después de la transacción
});

// Índices compuestos para búsquedas comunes
TransactionSchema.index({ userId: 1, timestamp: -1 });
TransactionSchema.index({ userId: 1, type: 1 });

export default models.Transaction || model("Transaction", TransactionSchema); 