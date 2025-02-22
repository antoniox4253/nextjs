"use client"; // ✅ Necesario para hooks en Next.js

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import MatchmakingPanel from "@/components/MatchmakingPanel";
import ParticleBackground from "@/components/ParticleBackground";
import ProtectedRoute from "@/components/ProtectedRoute"; // ✅ Protegemos la ruta

export default function DungeonGuild() {
  const router = useRouter();
  const { data: session, status } = useSession();

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


  // ✅ Función para manejar el emparejamiento de jugadores
  const handleMatchFound = (players: any[]) => {
    localStorage.setItem("matchedPlayers", JSON.stringify(players)); // Guardamos los jugadores en localStorage
    router.push("/dungeon/combat");
  };

  return (
    <ProtectedRoute> {/* ✅ Protegemos la ruta */}
      <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
        <ParticleBackground />
        <div className="container mx-auto py-12">
          <h1 className="text-4xl font-bold text-center mb-8">
            Mazmorra - Nivel 3 (Gremio)
          </h1>
          <MatchmakingPanel
            mode="guild"
            minPlayers={3}
            maxPlayers={5}
            onMatchFound={handleMatchFound}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
