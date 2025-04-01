import { connectToDB } from "@/utils/db";
import Training from "@/app/api/models/Training";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/api/models/User";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const hashworld = req.nextUrl.searchParams.get("hashworld");

    const user = await User.findOne({ hashworld });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // Buscar todos los entrenamientos no completados
    const now = new Date();
    const activeTrainings = await Training.find({
      userId: user._id,
      completed: false
    });

    // Verificar y actualizar cada entrenamiento
    const updatedTrainings = await Promise.all(activeTrainings.map(async (training) => {
      const timeLeft = Math.max(0, Math.floor((training.endTime.getTime() - now.getTime()) / 1000));
      
      // Si el tiempo llegó a 0 y no está completado, marcarlo como completado
      if (timeLeft === 0 && !training.completed) {
        training.completed = true;
        await training.save();
      }

      return {
        id: training._id,
        trainingId: training.trainingId,
        category: training.category,
        timeLeft,
        completed: training.completed,
        endTime: training.endTime
      };
    }));

    // Filtrar solo los entrenamientos que aún están en progreso
    const inProgressTrainings = updatedTrainings.filter(t => !t.completed);

    return NextResponse.json({
      active: inProgressTrainings.length > 0,
      trainings: updatedTrainings,
      activeCount: inProgressTrainings.length
    });

  } catch (error) {
    console.error("Error verificando entrenamientos activos:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
} 