import { connectToDB } from "@/utils/db";
import Auth from "@/app/api/models/Auth";
import User from "@/app/api/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("🔍 Iniciando verificación de usuario...");
    await connectToDB();
    
    const { hashworld } = await req.json();
    console.log("📝 Verificando hashworld:", hashworld);

    if (!hashworld) {
      console.log("❌ Falta hashworld");
      return NextResponse.json({ error: "Falta hashworld" }, { status: 400 });
    }

    // Verificar si el usuario está registrado completamente
    const user = await User.findOne({ hashworld });
    console.log("👤 Usuario encontrado:", user);

    if (user) {
      return NextResponse.json({
        isAuthenticated: true,
        isRegistered: true,
        user
      });
    }

    // Verificar si el usuario está autenticado pero no registrado
    const authUser = await Auth.findOne({ hashworld });
    console.log("🔐 Auth encontrado:", authUser);

    if (authUser) {
      return NextResponse.json({
        isAuthenticated: true,
        isRegistered: false
      });
    }

    console.log("❌ Usuario no autenticado");
    return NextResponse.json({
      isAuthenticated: false,
      isRegistered: false
    });

  } catch (error) {
    console.error("❌ Error detallado:", error);
    return NextResponse.json({ 
      error: "Error interno del servidor",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 