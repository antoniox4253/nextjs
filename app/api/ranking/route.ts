import { connectToDB } from "@/utils/db";
import Character from "@/app/api/models/Character";
import WeeklyRanking from "@/app/api/models/WeeklyRanking";
import { NextRequest, NextResponse } from "next/server";

// Función para obtener número de semana actual
const getCurrentWeek = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24 * 7));
};

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const type = req.nextUrl.searchParams.get("type");
    const characterClass = req.nextUrl.searchParams.get("class");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10");

    switch (type) {
      case "general":
        // Ranking general por experiencia total
        const generalRanking = await Character.aggregate([
          {
            $group: {
              _id: "$userId",
              totalXP: { $sum: "$progression.xp" },
              character: { $first: "$$ROOT" }
            }
          },
          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "_id",
              as: "user"
            }
          },
          { $sort: { totalXP: -1 } },
          { $limit: limit }
        ]);

        return NextResponse.json(generalRanking);

      case "class":
        // Ranking por clase
        if (!characterClass) {
          return NextResponse.json({ error: "Clase no especificada" }, { status: 400 });
        }

        // Validar que la clase sea válida
        const validClasses = ["guerrero", "mago", "arquero", "curador", "asesino", "espadachin"];
        if (!validClasses.includes(characterClass)) {
          return NextResponse.json({ error: "Clase no válida" }, { status: 400 });
        }

        const classRanking = await Character.aggregate([
          { 
            $match: { 
              class: characterClass 
            }
          },
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "user"
            }
          },
          {
            $project: {
              _id: 1,
              class: 1,
              level: 1,
              progression: 1,
              user: { $arrayElemAt: ["$user", 0] }
            }
          },
          { 
            $sort: { 
              "progression.xp": -1 
            } 
          },
          { 
            $limit: limit 
          }
        ]);

        // Formatear la respuesta para que coincida con la interfaz esperada
        const formattedClassRanking = classRanking.map(char => ({
          _id: char._id,
          character: [{
            _id: char._id,
            class: char.class,
            level: char.level,
            progression: {
              xp: char.progression.xp || 0
            }
          }],
          user: [char.user],
          progression: {
            xp: char.progression.xp || 0
          }
        }));

        return NextResponse.json(formattedClassRanking);

      case "weekly":
        // Ranking semanal
        const currentWeek = getCurrentWeek();
        const currentYear = new Date().getFullYear();

        const weeklyRanking = await WeeklyRanking.aggregate([
          {
            $match: {
              weekNumber: currentWeek,
              year: currentYear
            }
          },
          {
            $lookup: {
              from: "characters",
              localField: "characterId",
              foreignField: "_id",
              as: "character"
            }
          },
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "user"
            }
          },
          { $sort: { experience: -1 } },
          { $limit: limit }
        ]);

        return NextResponse.json(weeklyRanking);

      default:
        return NextResponse.json({ error: "Tipo de ranking no válido" }, { status: 400 });
    }

  } catch (error) {
    console.error("Error obteniendo ranking:", error);
    return NextResponse.json({ 
      error: "Error interno del servidor",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 