import { connectToDB } from "@/utils/db";
import User from "@/app/api/models/User";
import Character from "@/app/api/models/Character";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const hashworld = req.nextUrl.searchParams.get("hashworld");
    const nickname = req.nextUrl.searchParams.get("nickname");

    if (!hashworld && !nickname) {
      return NextResponse.json({ error: "Se requiere hashworld o nickname" }, { status: 400 });
    }

    let character;
    if (nickname) {
      character = await Character.findOne({ 
        userNickname: nickname,
        active: true
      }).select('class level stats progression energy userNickname slotTraining');
    } else {
      const user = await User.findOne({ hashworld });
      if (!user) {
        return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
      }
      character = await Character.findOne({ 
        userId: user._id,
        active: true
      }).select('class level stats progression energy userNickname slotTraining');
    }

    if (!character) {
      return NextResponse.json({ error: "No hay personaje activo" }, { status: 404 });
    }

    return NextResponse.json({
      _id: character._id,
      userId: character.userId,
      userNickname: character.userNickname,
      class: character.class,
      level: character.level,
      slotTraining: character.slotTraining || 1,
      stats: character.stats,
      progression: character.progression,
      energy: character.energy,
      active: character.active,
      createdAt: character.createdAt
    });
  } catch (error) {
    console.error("Error obteniendo personaje activo:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
} 