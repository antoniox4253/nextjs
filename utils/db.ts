import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("🚨 La variable de entorno MONGO_URI no está definida en .env.local");
}

// 📌 Variable global para evitar múltiples conexiones en desarrollo
let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log("📌 Ya conectado a MongoDB");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "realm", 
    });

    isConnected = true;
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    process.exit(1);
  }
};
