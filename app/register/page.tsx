"use client"; // 👈 Necesario para permitir hooks en Next.js

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ParticleBackground from "@/components/ParticleBackground";
import axios from "@/utils/axiosConfig";
import { useToast } from "@/hooks/use-toast";
import { Shield, Sword, Target, Heart, Wand2, Skull } from "lucide-react";
import { Card } from "@/components/ui/card";
import classNames from "classnames";
import ProtectedRoute from "@/components/ProtectedRoute"; // ✅ Importamos la protección

type CharacterClass = "guerrero" | "espadachin" | "arquero" | "healer" | "mago" | "asesino";

const classes = [
  { name: "guerrero", icon: Shield, description: "Tanque poderoso en combate cuerpo a cuerpo", color: "solo-energy", image: "/images/guerrero.png" },
  { name: "espadachin", icon: Sword, description: "Atacante ágil con gran destreza", color: "solo-purple", image: "/images/espadachin.png" },
  { name: "arquero", icon: Target, description: "Experto en ataques a distancia", color: "solo-neon", image: "/images/arquero.png" },
  { name: "healer", icon: Heart, description: "Soporte y sanador del equipo", color: "solo-guild", image: "/images/healer.png" },
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
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedClass || !nickname.trim()) {
      toast({ title: "Error", description: "Selecciona una clase y un nickname.", variant: "destructive" });
      return;
    }

    if (!session?.user?.id) {
      toast({ title: "Error", description: "No estás autenticado.", variant: "destructive" });
      return;
    }

    const payload = { 
      nickname, 
      referral, 
      class: selectedClass, 
      userId: session.user.id
    };

    try {
      setLoading(true);
      const response = await axios.post("/api/register", payload);
      toast({ title: "Éxito", description: response.data.message });

      setTimeout(() => router.push("/dashboard"), 3000);
    } catch (error: any) {
      toast({ title: "Error", description: error.response?.data.error || "Error inesperado.", variant: "destructive" });
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute> {/* ✅ Aplicamos protección */}
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
                  className={classNames("p-6 cursor-pointer border-2 transition-all duration-300 hover:scale-105", {
                    "border-solo-energy": name === "guerrero",
                    "border-solo-purple": name === "espadachin",
                    "border-solo-neon": name === "arquero",
                    "border-solo-guild": name === "healer",
                    "border-solo-cyber": name === "mago",
                    "border-solo-magenta": name === "asesino",
                    "ring-2 ring-offset-2": selectedClass === name
                  })}
                  onClick={() => setSelectedClass(name)}
                >
                  <Icon className={`w-8 h-8 text-${color}`} />
                  <h3 className="text-xl capitalize">{name}</h3>
                  <p className="text-sm text-gray-400">{description}</p>
                  <img src={image} alt={name} className="w-full h-auto mt-2" />
                </Card>
              ))}
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-solo-purple/20 hover:bg-solo-purple/30">
              {loading ? "Creando personaje..." : "Registrar"}
            </Button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
