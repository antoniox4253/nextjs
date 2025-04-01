import { connectToDB } from "@/utils/db";
import User from "@/app/api/models/User";
import Character from "@/app/api/models/Character";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const hashworld = req.nextUrl.searchParams.get("hashworld");

    if (!hashworld) {
      return NextResponse.json({ error: "Falta hashworld" }, { status: 400 });
    }

    // Obtener usuario con sus personajes y toda la información necesaria
    const user = await User.findOne({ hashworld })
      .populate({
        path: 'characters',
        model: Character,
        select: 'stats class level active progression energy'
      })
      .select('nickname authProvider characters wld');

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    console.log("📊 Sending user data:", user);
    return NextResponse.json(user);

  } catch (error) {
    console.error("❌ Error obteniendo usuario:", error);
    return NextResponse.json({ 
      error: "Error interno del servidor",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 