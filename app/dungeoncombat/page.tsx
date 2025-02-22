"use client"; // ✅ Necesario para usar hooks en Next.js

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import CombatInterface from "@/components/CombatInterface";
import { useToast } from "@/hooks/use-toast";
import ProtectedRoute from "@/components/ProtectedRoute"; // ✅ Protección de ruta

// ✅ Jugador por defecto (si no hay datos en localStorage)
const defaultPlayers = [
  {
    id: "p1",
    name: "Player 1",
    level: 1,
    stats: {
      hp: 100,
      maxHp: 100,
      power: 20,
      defense: 10,
      mana: 50,
      maxMana: 50
    },
    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

export default function DungeonCombat() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [players, setPlayers] = useState(defaultPlayers);

  // ✅ Carga los jugadores desde `localStorage`
  useEffect(() => {
    const storedPlayers = localStorage.getItem("matchedPlayers");
    if (storedPlayers) {
      try {
        const parsedPlayers = JSON.parse(storedPlayers);
        if (Array.isArray(parsedPlayers) && parsedPlayers.length > 0) {
          setPlayers(parsedPlayers);
        }
      } catch (error) {
        console.error("Error al leer jugadores emparejados:", error);
      }
    } else {
      router.push("/dungeon"); // 🚀 Si no hay jugadores, redirige a la selección de mazmorra
    }
  }, []);

// 🚀 Redirige al login si no está autenticado después de 5 segundos
useEffect(() => {
  if (status === "unauthenticated") {
    setTimeout(() => {
      signIn();
    }, 5000); // ⏳ Espera 5 segundos antes de redirigir
  }
}, [status]);

// 🛑 Muestra un mensaje si está verificando la sesión o si está no autenticado (antes de redirigir)
if (status === "loading" || status === "unauthenticated") {
  return (
    <div className="min-h-screen flex items-center justify-center bg-solo-dark text-black">
      <div className="p-6 bg-white rounded-lg shadow-lg text-center">
        <p className="text-xl font-bold">🔄 Login please...</p>
        {status === "unauthenticated" && (
          <p className="text-md text-gray-600 mt-2">You will be redirected to login in 5 seconds...</p>
        )}
      </div>
    </div>
  );
}


  // ✅ Función que maneja el final del combate
  const handleCombatEnd = (winner: any) => {
    toast({
      title: "¡Combate finalizado!",
      description: `${winner.name} es el vencedor! 🎉`,
    });
    setTimeout(() => router.push("/dungeon"), 3000); // 🚀 Redirige a la mazmorra después de 3s
  };

  return (
    <ProtectedRoute> {/* ✅ Protegemos la ruta */}
      <CombatInterface players={players} onCombatEnd={handleCombatEnd} />
    </ProtectedRoute>
  );
}
