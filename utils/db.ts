import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("🚨 La variable de entorno MONGODB_URI no está definida en .env");
}

// 📌 Variable global para evitar múltiples conexiones en desarrollo
let isConnected = false;

export const connectToDB = async () => {
  try {
    if (isConnected) {
      console.log("📌 Ya conectado a MongoDB");
      return;
    }

    const options = {
      dbName: "realm", // Nombre de la base de datos
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(MONGODB_URI, options);
    
    isConnected = true;
    console.log("✅ Conectado a MongoDB");
    
    // Verificar la conexión
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, '❌ Error de conexión:'));
    db.once('open', function() {
      console.log("🎮 Base de datos War of Clans conectada");
    });

  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    throw error;
  }
};
