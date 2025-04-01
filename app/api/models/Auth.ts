import { Schema, model, models } from "mongoose";

// 📌 Modelo para manejar autenticación
const AuthSchema = new Schema({
  hashworld: { type: String, required: true, unique: true }, // ✅ Identificador único del usuario
  isRegistered: { type: Boolean, default: false }, // ✅ Si ya está registrado en el juego
  authProvider: { type: String, required: true, enum: ['worldcoin', 'google'] }, // Nuevo campo
  createdAt: { type: Date, default: Date.now },
});

export default models.Auth || model("Auth", AuthSchema);
