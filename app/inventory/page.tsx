"use client"; // 👈 Necesario para permitir hooks en Next.js

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import ParticleBackground from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Gamepad, Dumbbell, Users, Compass, ShoppingBag, Swords } from "lucide-react";
import Inventory from "@/components/Inventory";
import ProtectedRoute from "@/components/ProtectedRoute"; // ✅ Protegemos la ruta
import FooterNav from "@/components/Footer"; // ✅ Footer centralizado

export default function InventoryPage() {
  const router = useRouter(); // ✅ Reemplazo de useNavigate()
  const { data: session, status } = useSession();

  // 🚀 Redirige al login si no está autenticado
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
    <div className="min-h-screen bg-solo-dark text-white relative overflow-hidden flex flex-col">
      <ParticleBackground className="absolute inset-0 z-0" />
      <div className="relative z-10 flex-grow">
        <header className="text-center py-8 px-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-solo-purple via-solo-blue to-solo-magenta bg-clip-text text-transparent">
            Inventario del Cazador
          </h1>
        </header>
        <main className="container mx-auto pb-12 px-4">
          <Inventory />
        </main>
      </div>

  {/* ✅ Footer reutilizable */}
        <FooterNav />
    </div>
    </ProtectedRoute>
  );
}
