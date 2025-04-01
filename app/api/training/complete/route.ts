import { connectToDB } from "@/utils/db";
import Character from "@/app/api/models/Character";
import Training from "@/app/api/models/Training";
import User from "@/app/api/models/User";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const { hashworld, trainingId } = await req.json();

    // Buscar usuario
    const user = await User.findOne({ hashworld });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // Buscar entrenamiento
    const training = await Training.findById(trainingId);
    if (!training) {
      return NextResponse.json({ error: "Entrenamiento no encontrado" }, { status: 404 });
    }

    if (training.completed) {
      return NextResponse.json({ 
        message: "Entrenamiento ya completado",
        alreadyCompleted: true 
      });
    }

    // Obtener personaje activo
    const character = await Character.findOne({ 
      userId: user._id,
      active: true 
    });

    if (!character) {
      return NextResponse.json({ error: "Personaje no encontrado" }, { status: 404 });
    }

    console.log('🔍 Antes de actualizar:', {
      statsActuales: character.stats,
      incrementos: training.stats
    });

    // Definir el objeto de actualización para MongoDB con `$inc`
    const updateFields: Record<string, number> = {};

    // Procesar cada stat del entrenamiento y sumarlo con `$inc`
    Object.entries(training.stats).forEach(([stat, increment]) => {
      const incrementValue = Number(increment);
      
      if (incrementValue > 0) {
        updateFields[`stats.${stat}`] = incrementValue; // ✅ Sumar en lugar de sobreescribir
      }
    });

    // Calcular experiencia ganada
    const xpGained = Math.floor(Math.random() * (80 - 40 + 1)) + 40;
    updateFields["progression.xp"] = xpGained; // ✅ Sumar XP también

    // Si `updateFields` está vacío, no hay nada que actualizar
    if (Object.keys(updateFields).length === 0) {
      console.error("❌ No hay stats para actualizar, revisa training.stats");
      return NextResponse.json({ error: "No hay estadísticas para actualizar" }, { status: 400 });
    }

    // Actualizar personaje usando `$inc` para incrementar valores en la BD
    const updatedCharacter = await Character.findOneAndUpdate(
      { _id: character._id },
      { $inc: updateFields },  // ✅ Se usa `$inc` en lugar de `$set`
      { new: true }
    );

    // Marcar el entrenamiento como completado
    await Training.findByIdAndUpdate(trainingId, { completed: true });

    console.log('✅ Después de actualizar:', {
      statsNuevos: updatedCharacter.stats,
      xpTotal: updatedCharacter.progression.xp
    });

    return NextResponse.json({
      message: "Entrenamiento completado",
      newStats: updatedCharacter.stats,
      newXP: updatedCharacter.progression.xp,
      xpGained,
      trainingId
    });

  } catch (error) {
    console.error("❌ Error completando entrenamiento:", error);
    return NextResponse.json({ 
      error: "Error interno del servidor",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
