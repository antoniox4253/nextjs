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

    // Buscar usuario y su personaje activo
    const user = await User.findOne({ hashworld });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    const character = await Character.findOne({ 
      userId: user._id,
      active: true 
    });

    if (!character) {
      return NextResponse.json({ error: "No hay personaje activo" }, { status: 404 });
    }

    // Calcular recuperación de energía
    const now = new Date();
    const lastRecovery = new Date(character.energy.lastRecovery);
    const minutesPassed = Math.floor((now.getTime() - lastRecovery.getTime()) / (1000 * 60));
    const energyRecovered = Math.floor(minutesPassed / 5); // 1 punto cada 5 minutos

    // Actualizar energía si ha pasado tiempo suficiente
    if (energyRecovered > 0 && character.energy.current < character.energy.max) {
      const newEnergy = Math.min(
        character.energy.max,
        character.energy.current + energyRecovered
      );
      
      // Actualizar solo si hay cambios
      if (newEnergy !== character.energy.current) {
        character.energy.current = newEnergy;
        character.energy.lastRecovery = now;
        await character.save();
      }
    }

    // Retornar datos actualizados
    return NextResponse.json({
      energy: {
        current: character.energy.current,
        max: character.energy.max,
        lastRecovery: character.energy.lastRecovery
      }
    });

  } catch (error) {
    console.error("Error obteniendo energía:", error);
    return NextResponse.json({ 
      error: "Error interno del servidor",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 