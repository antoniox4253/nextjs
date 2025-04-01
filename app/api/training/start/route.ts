import { connectToDB } from "@/utils/db";
import Character from "@/app/api/models/Character";
import Training from "@/app/api/models/Training";
import User from "@/app/api/models/User";
import { TRAININGS } from "@/config/trainings";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    
    const { hashworld, trainingId, category, energyCost } = await req.json();
    
    if (!hashworld || !trainingId || !category || !energyCost) {
      return NextResponse.json({ 
        error: "Faltan datos requeridos",
        details: { hashworld, trainingId, category, energyCost }
      }, { status: 400 });
    }

    // Buscar usuario por hashworld
    const user = await User.findOne({ hashworld });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // Buscar personaje activo
    const character = await Character.findOne({ 
      userId: user._id,
      active: true 
    });

    if (!character) {
      return NextResponse.json({ error: "Personaje no encontrado" }, { status: 404 });
    }

    // Verificar slots disponibles
    const activeTrainings = await Training.find({
      userId: user._id,
      completed: false,
      endTime: { $gt: new Date() }
    });

    if (activeTrainings.length >= character.slotTraining) {
      return NextResponse.json({ 
        error: "Has alcanzado el límite de entrenamientos simultáneos",
        activeTraining: activeTrainings[0]
      }, { status: 400 });
    }

    // Verificar energía
    console.log('Energy check:', { current: character.energy.current, required: energyCost });
    if (character.energy.current < energyCost) {
      return NextResponse.json({ error: "Energía insuficiente" }, { status: 400 });
    }

    // Encontrar el entrenamiento en la configuración
    const trainingConfig = TRAININGS[category].find(t => t.id === trainingId);
    if (!trainingConfig) {
      return NextResponse.json({ error: "Entrenamiento no válido" }, { status: 400 });
    }

    console.log('Training config:', trainingConfig); // Debug

    // Crear nuevo entrenamiento
    const training = await Training.create({
      userId: user._id,
      characterId: character._id,
      trainingId,
      category,
      startTime: new Date(),
      endTime: new Date(Date.now() + (trainingConfig.duration * 1000)),
      stats: trainingConfig.stats // Asegurarnos que los stats se guarden correctamente
    });

    console.log('Training created with stats:', training.stats); // Debug

    // Actualizar energía y guardar
    character.energy.current -= energyCost;
    
    await Promise.all([
      training.save(),
      character.save()
    ]);

    return NextResponse.json({ 
      success: true,
      training: {
        id: training._id,
        endTime: training.endTime,
        stats: training.stats
      },
      newEnergy: character.energy.current
    });

  } catch (error) {
    console.error("Error general:", error);
    return NextResponse.json({ 
      error: "Error interno del servidor",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 