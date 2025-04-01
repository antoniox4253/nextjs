import { connectToDB } from "@/utils/db";
import User from "@/app/api/models/User";
import Character from "@/app/api/models/Character";
import { NextRequest, NextResponse } from "next/server";
import Transaction from "@/app/api/models/Transaction";

const NEW_CHARACTER_COST = 5;

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const { hashworld, characterClass, cost } = await req.json();

    // Verificar usuario y WLD
    const user = await User.findOne({ hashworld });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // Verificar límite de personajes
    const characterCount = await Character.countDocuments({ userId: user._id });
    if (characterCount >= 3) {
      return NextResponse.json({ error: "Límite de personajes alcanzado" }, { status: 400 });
    }

    // Verificar WLD suficiente
    if (user.wld < NEW_CHARACTER_COST) {
      return NextResponse.json({ error: "WLD insuficiente" }, { status: 400 });
    }

    // Crear personaje
    const character = await Character.create({
      userId: user._id,
      userNickname: user.nickname,
      class: characterClass,
      level: 1,
      active: false,
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

    // Descontar WLD y actualizar usuario
    user.wld -= NEW_CHARACTER_COST;
    user.characters.push(character._id);
    await user.save();

    // Registrar la transacción con el balance final
    await Transaction.create({
      userId: user._id,
      type: 'CHARACTER_CREATION',
      amount: NEW_CHARACTER_COST,
      description: `Creación de personaje ${characterClass}`,
      timestamp: new Date(),
      balanceAfter: user.wld,
      metadata: {
        characterId: character._id,
        characterClass: characterClass
      }
    });

    return NextResponse.json({
      success: true,
      character,
      newWldBalance: user.wld
    });

  } catch (error) {
    console.error("Error creando personaje:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
} 