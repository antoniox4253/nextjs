import { Schema, model, models } from "mongoose";

// 📌 Modelo del usuario registrado en el juego
const UserSchema = new Schema({
  hashworld: { type: String, required: true, unique: true }, // ✅ Se vincula con `Auth`
  nickname: { type: String, unique: true, required: true }, // ✅ Nombre del jugador
  authProvider: { type: String, required: true, enum: ['worldcoin', 'google'] }, // Nuevo campo
  referral: { type: String, default: "" }, // Código de referido
  gold: { type: Number, default: 100 }, // Oro inicial
  wld: { type: Number, default: 0 }, // Moneda premium
  referredCount: { type: Number, default: 0 }, // Número de referidos
  worldcoin_hash: { type: String, default: "" }, // Hash único de Worldcoin
  characters: [{ type: Schema.Types.ObjectId, ref: "Character" }], // Relación con personajes
  createdAt: { type: Date, default: Date.now },
});

export default models.User || model("User", UserSchema);
