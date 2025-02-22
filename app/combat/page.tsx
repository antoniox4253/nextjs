"use client"; // ✅ Necesario para usar hooks en Next.js

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import ParticleBackground from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gamepad, Dumbbell, Users, Compass, ShoppingBag, Swords } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute"; // ✅ Protección de ruta
import FooterNav from "@/components/Footer"; // ✅ Footer centralizado

export default function Combat() {
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
  

  return (
    <ProtectedRoute> {/* ✅ Protegemos la ruta */}
      <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
        <ParticleBackground />
        <div className="container mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-solo-purple via-solo-blue to-solo-magenta bg-clip-text text-transparent">
            Sistema de Combate
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PVE Section */}
            <Card className="bg-solo-dark/80 border-solo-neon/30 p-6 hover:border-solo-neon transition-colors">
              <h2 className="text-2xl font-bold text-solo-neon mb-4">PVE</h2>
              <p className="text-solo-gray mb-4">
                Enfréntate a desafiantes enemigos controlados por la IA. Completa misiones, 
                obtén recompensas y mejora tu equipo mientras exploras diferentes mazmorras 
                y territorios.
              </p>
              <ul className="list-disc list-inside text-solo-gray space-y-2 mb-4">
                <li>Mazmorras con diferentes niveles de dificultad</li>
                <li>Jefes especiales con recompensas únicas</li>
                <li>Misiones diarias y semanales</li>
                <li>Progresión de personaje y equipo</li>
              </ul>
              <Button 
                className="w-full bg-solo-purple hover:bg-solo-purple/80"
                onClick={() => router.push('/dungeon')}
              >
                Explorar PVE
              </Button>
            </Card>

            {/* PVP Section */}
            <Card className="bg-solo-dark/80 border-solo-cyber/30 p-6 hover:border-solo-cyber transition-colors">
              <h2 className="text-2xl font-bold text-solo-cyber mb-4">PVP</h2>
              <p className="text-solo-gray mb-4">
                Demuestra tu valía en intensos combates contra otros jugadores. 
                Compite en diferentes modos de juego, sube en el ranking y 
                obtén recompensas exclusivas.
              </p>
              <ul className="list-disc list-inside text-solo-gray space-y-2 mb-4">
                <li>Combates 1vs1 y por equipos</li>
                <li>Sistema de ranking competitivo</li>
                <li>Torneos especiales con premios</li>
                <li>Ligas y temporadas</li>
              </ul>
              <Button 
                className="w-full bg-solo-cyber hover:bg-solo-cyber/80"
                disabled
              >
                Próximamente
              </Button>
            </Card>
          </div>
        </div>

       {/* ✅ Footer reutilizable */}
               <FooterNav />
      </div>
    </ProtectedRoute>
  );
}
