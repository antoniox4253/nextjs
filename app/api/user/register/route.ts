import { connectToDB } from "@/utils/db";
import Auth from "@/app/api/models/Auth";
import User from "@/app/api/models/User";
import Character from "@/app/api/models/Character";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("🎮 Iniciando registro de usuario...");
    await connectToDB();
    const { hashworld, nickname, characterClass, referral } = await req.json();

    // Validar datos requeridos
    if (!hashworld || !nickname || !characterClass) {
      return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
    }

    // Verificar que el usuario esté autenticado pero no registrado
    const authUser = await Auth.findOne({ hashworld });
    console.log("🔍 Auth encontrado:", authUser);

    if (!authUser) {
      return NextResponse.json({ 
        error: "Usuario no autenticado" 
      }, { status: 401 });
    }

    // Verificar si ya existe el usuario
    const existingUser = await User.findOne({ hashworld });
    if (existingUser) {
      return NextResponse.json({ error: "Usuario ya registrado" }, { status: 400 });
    }

    // Verificar si el nickname ya existe
    const existingNickname = await User.findOne({ nickname });
    if (existingNickname) {
      return NextResponse.json({ error: "Nickname ya existe" }, { status: 400 });
    }

    // Verificar código de referido si se proporcionó
    let referralUser = null;
    if (referral) {
      referralUser = await User.findOne({ nickname: referral });
      if (!referralUser) {
        return NextResponse.json({ error: "Código de referido no válido" }, { status: 400 });
      }
    }

    // Determinar oro inicial según provider
    const initialGold = authUser.authProvider === 'worldcoin' ? 100 : 60;

    console.log("✨ Creando nuevo usuario con provider:", authUser.authProvider);

    // Crear usuario
    const user = await User.create({
      hashworld,
      nickname,
      authProvider: authUser.authProvider,
      referral: referral || "",
      gold: initialGold
    });

    // Si hay referido, incrementar su contador
    if (referralUser) {
      await User.findByIdAndUpdate(
        referralUser._id,
        { $inc: { referredCount: 1 } }
      );
    }

    console.log("👤 Usuario creado:", user);

    // Crear personaje inicial
    const character = await Character.create({
      userId: user._id,
      userNickname: user.nickname,
      class: characterClass,
      level: 1,
      active: true,
      stats: {
        fuerza: 10,
        defensa: 10,
        maxHP: 100,
        currentHP: 100,
        maxMana: 50,
        currentMana: 50,
        critico: 5,
        velocidad: 10
      },
      progression: {
        xp: 0,
        maxXp: 1000,
        bonusXp: 0,
      },
      energy: {
        current: 20,
        max: 20,
        lastRecovery: new Date(),
      }
    });

    // Actualizar usuario con el personaje creado
    user.characters.push(character._id);
    await user.save();

    // Marcar como registrado en Auth
    authUser.isRegistered = true;
    await authUser.save();

    return NextResponse.json({
      success: true,
      user,
      character
    });

  } catch (error) {
    console.error("❌ Error en registro:", error);
    return NextResponse.json({ 
      error: "Error interno del servidor",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 