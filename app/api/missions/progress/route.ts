import { connectToDB } from "@/utils/db";
import Mission from "@/app/api/models/Mission";
import User from "@/app/api/models/User";
import { DAILY_MISSIONS } from "@/config/missions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const { hashworld, missionId, trigger, amount = 1 } = await req.json();

    const user = await User.findOne({ hashworld });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    let userMissions = await Mission.findOne({ userId: user._id });
    if (!userMissions) {
      return NextResponse.json({ error: "Misiones no encontradas" }, { status: 404 });
    }

    // Encontrar la misión que corresponde al trigger
    const missionConfig = DAILY_MISSIONS.find(m => m.trigger === trigger);
    if (!missionConfig) return NextResponse.json({ error: "Trigger no válido" });

    // Actualizar el progreso de la misión
    const missionIndex = userMissions.dailyMissions.findIndex(
      (m: { missionId: string }) => m.missionId === missionConfig.id
    );

    if (missionIndex === -1) return NextResponse.json({ error: "Misión no encontrada" });

    const mission = userMissions.dailyMissions[missionIndex];
    
    // No actualizar si ya está completada
    if (mission.completed) {
      return NextResponse.json({ message: "Misión ya completada" });
    }

    // Actualizar progreso
    mission.progress += amount;
    
    // Verificar si se completó
    if (mission.progress >= missionConfig.total) {
      mission.progress = missionConfig.total;
      mission.completed = true;
      mission.completedAt = new Date();
    }

    // Guardar cambios
    userMissions.dailyMissions[missionIndex] = mission;
    await userMissions.save();

    return NextResponse.json({
      success: true,
      mission: mission
    });

  } catch (error) {
    console.error("Error actualizando misión:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
} 