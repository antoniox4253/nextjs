"use client";

import ParticleBackground from "@/components/ParticleBackground";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-solo-dark to-solo-dark/95 text-white relative overflow-x-hidden">
      <ParticleBackground className="absolute inset-0 z-0" />
      
      {/* Contenedor principal con scroll */}
      <div className="relative z-10 max-w-md mx-auto min-h-screen border-x border-solo-purple/10 bg-solo-dark/50 backdrop-blur-sm overflow-y-auto pb-24">
        {/* Contenido con padding */}
        <div className="px-4 py-6">
          {children}
        </div>
      </div>

      {/* Menú fijo en la parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-md mx-auto bg-solo-dark/90 backdrop-blur-md border-t border-solo-purple/20">
          <nav className="flex justify-around p-2">
            {/* Tus items del menú */}
          </nav>
        </div>
      </div>
    </div>
  );
} 