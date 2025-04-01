import { connectToDB } from "@/utils/db";
import Mission from "@/app/api/models/Mission";
import User from "@/app/api/models/User";
import { DAILY_MISSIONS } from "@/config/missions";
import { NextRequest, NextResponse } from "next/server";

// Función para verificar si necesita reset
const needsReset = (lastReset: Date) => {
  const now = new Date();
  const resetTime = new Date(now);
  resetTime.setUTCHours(0, 0, 0, 0);
  
  return lastReset < resetTime;
};

// Función para generar misiones diarias nuevas
const generateDailyMissions = () => {
  return DAILY_MISSIONS.map(mission => ({
    missionId: mission.id,
    progress: 0,
    completed: false,
    claimed: false,
    completedAt: null
  }));
};

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const hashworld = req.nextUrl.searchParams.get("hashworld");
    
    if (!hashworld) {
      return NextResponse.json({ error: "Usuario no especificado" }, { status: 400 });
    }

    const user = await User.findOne({ hashworld });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    let userMissions = await Mission.findOne({ userId: user._id });
    
    // Si no tiene misiones o necesita reset, crear nuevas
    if (!userMissions || needsReset(userMissions.lastReset)) {
      if (!userMissions) {
        userMissions = new Mission({ userId: user._id });
      }
      userMissions.dailyMissions = generateDailyMissions();
      userMissions.lastReset = new Date();
      await userMissions.save();
    }

    // Calcular tiempo hasta el próximo reset
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setUTCHours(24, 0, 0, 0);
    const timeUntilReset = tomorrow.getTime() - now.getTime();

    return NextResponse.json({
      missions: userMissions.dailyMissions,
      timeUntilReset,
      availableMissions: DAILY_MISSIONS
    });

  } catch (error) {
    console.error("Error obteniendo misiones:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
} 