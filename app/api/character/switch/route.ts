import { connectToDB } from "@/utils/db";
import Character from "@/app/api/models/Character";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const { characterId } = await req.json();

    // Desactivar todos los personajes del usuario
    const character = await Character.findById(characterId);
    if (!character) {
      return NextResponse.json({ error: "Personaje no encontrado" }, { status: 404 });
    }

    // Desactivar todos los personajes del usuario
    await Character.updateMany(
      { userId: character.userId },
      { active: false }
    );

    // Activar el personaje seleccionado
    character.active = true;
    await character.save();

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error cambiando personaje:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
} 