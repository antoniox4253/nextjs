import { connectToDB } from "@/utils/db";
import User from "@/app/api/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const hashworld = req.nextUrl.searchParams.get("hashworld");

    if (!hashworld) {
      return NextResponse.json({ error: "Falta hashworld" }, { status: 400 });
    }

    const user = await User.findOne({ hashworld })
      .select('gold wld referredCount');

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({
      gold: user.gold,
      wld: user.wld,
      referredCount: user.referredCount
    });

  } catch (error) {
    console.error("Error obteniendo estadísticas:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
} 