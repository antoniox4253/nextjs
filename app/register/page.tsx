"use client"; // ✅ Necesario para hooks en Next.js

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ParticleBackground from "@/components/ParticleBackground";
import { useToast } from "@/hooks/use-toast";
import { Shield, Sword, Target, Heart, Wand2, Skull } from "lucide-react";
import { Card } from "@/components/ui/card";
import classNames from "classnames";
import SignIn from "@/components/SignIn"; // ✅ Importamos SignIn (Sign Out incluido)
import ProtectedRoute from "@/components/ProtectedRoute"; // ✅ Protección de ruta

type CharacterClass = "guerrero" | "espadachin" | "arquero" | "curador" | "mago" | "asesino";

const classes = [
  { name: "guerrero", icon: Shield, description: "Tanque poderoso en combate cuerpo a cuerpo", color: "solo-energy", image: "/images/guerrero.png" },
  { name: "espadachin", icon: Sword, description: "Atacante ágil con gran destreza", color: "solo-purple", image: "/images/espadachin.png" },
  { name: "arquero", icon: Target, description: "Experto en ataques a distancia", color: "solo-neon", image: "/images/arquero.png" },
  { name: "curador", icon: Heart, description: "Soporte y sanador del equipo", color: "solo-guild", image: "/images/curador.png" },
  { name: "mago", icon: Wand2, description: "Maestro de las artes mágicas", color: "solo-cyber", image: "/images/mago.png" },
  { name: "asesino", icon: Skull, description: "Rápido y letal en sigilo", color: "solo-magenta", image: "/images/asesino.png" }
];

export default function Register() {
  const [selectedClass, setSelectedClass] = useState<CharacterClass | null>(null);
  const [nickname, setNickname] = useState("");
  const [referral, setReferral] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { data: session, status } = useSession();

  // 🚀 Redirige al login si no está autenticado después de 5 segundos
  useEffect(() => {
    if (status === "unauthenticated") {
      setTimeout(() => {
        signIn();
      }, 5000);
    }
  }, [status]);

  // 🛑 Mostrar un mensaje si está verificando la sesión o si está no autenticado
  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-solo-dark text-black">
        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
          <p className="text-xl font-bold">🔄 Iniciando sesión...</p>
          {status === "unauthenticated" && (
            <p className="text-md text-gray-600 mt-2">Serás redirigido al login en 5 segundos...</p>
          )}
        </div>
      </div>
    );
  }

  // ✅ Verificación de sesión (Usamos `session.user.name` como ID único)
  const userId = session?.user?.name;
  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-solo-dark text-black">
        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
          <p className="text-xl font-bold">🚨 No estás autenticado.</p>
          <p className="text-gray-700">Inicia sesión para continuar.</p>
        </div>
      </div>
    );
  }

  // ✅ Función para manejar el envío del formulario y guardar el personaje en la BD
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedClass || !nickname.trim()) {
      toast({ title: "Error", description: "Selecciona una clase y un nickname.", variant: "destructive" });
      return;
    }

    const payload = { 
      nickname, 
      referral, 
      class: selectedClass, 
      userId, // ✅ Usamos `session.user.name` como ID único
    };

  
  };

  return (
    <ProtectedRoute> {/* ✅ Protección de ruta aplicada */}
      <div className="min-h-screen bg-solo-dark text-white relative overflow-x-hidden">
        <ParticleBackground className="z-0" />

        <div className="relative z-10 container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-solo-purple via-solo-blue to-solo-magenta bg-clip-text text-transparent">
            Elige tu Clase
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Input type="text" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
            <Input type="text" placeholder="Código de referido (opcional)" value={referral} onChange={(e) => setReferral(e.target.value)} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map(({ name, icon: Icon, description, color, image }) => (
                <Card
                  key={name}
                  className={classNames("p-6 cursor-pointer border-2 transition-all duration-300 hover:scale-105 flex flex-col items-center", {
                    "border-solo-energy": name === "guerrero",
                    "border-solo-purple": name === "espadachin",
                    "border-solo-neon": name === "arquero",
                    "border-solo-guild": name === "curador",
                    "border-solo-cyber": name === "mago",
                    "border-solo-magenta": name === "asesino",
                    "ring-2 ring-offset-2": selectedClass === name
                  })}
                  onClick={() => setSelectedClass(name as CharacterClass)}
                >
                  <Icon className={`w-10 h-10 text-${color}`} />
                  <h3 className="text-xl capitalize mt-2">{name}</h3>
                  <p className="text-sm text-gray-400 text-center">{description}</p>
                  <img src={image} alt={name} className="w-32 h-32 object-contain mt-2" />
                </Card>
              ))}
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-solo-purple/20 hover:bg-solo-purple/30">
              {loading ? "Creando personaje..." : "Registrar"}
            </Button>

            <div className="flex justify-center mt-8">
              <SignIn /> {/* ✅ Se usa para cerrar sesión también */}
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
