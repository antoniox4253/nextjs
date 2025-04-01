import { connectToDB } from "@/utils/db";
import Auth from "@/app/api/models/Auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("🚀 Iniciando verificación de auth...");
    await connectToDB();
    
    const { hashworld, provider } = await req.json();
    console.log("📝 Verificando hashworld:", hashworld, "Provider:", provider);

    if (!hashworld || !provider) {
      console.log("❌ Faltan datos requeridos");
      return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
    }

    // Buscar o crear registro de autenticación
    let authRecord = await Auth.findOne({ hashworld });
    console.log("🔍 Registro existente:", authRecord);
    
    if (!authRecord) {
      console.log("✨ Creando nuevo registro de auth...");
      authRecord = await Auth.create({
        hashworld,
        isRegistered: false,
        authProvider: provider
      });
      console.log("✅ Nuevo registro creado:", authRecord);
    }

    return NextResponse.json({
      success: true,
      isRegistered: authRecord.isRegistered,
      authProvider: authRecord.authProvider
    });

  } catch (error) {
    console.error("❌ Error detallado:", error);
    return NextResponse.json({ 
      error: "Error interno del servidor",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 