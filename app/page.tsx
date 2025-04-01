"use client";

import SignIn from "@/components/SignIn"; // ✅ Importamos el componente
import ParticleBackground from "@/components/ParticleBackground";
import { Shield, Heart, Skull, UserPlus, Target, Wand2, Sword, Users, Trophy, Globe2, LogIn } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import React from "react";
import { useState, useEffect } from "react";

const characterImages = [
  { src: "/images/classes/guerrero.png", alt: "Warrior", border: "border-solo-energy" },
  { src: "/images/classes/espadachin.png", alt: "Swordsman", border: "border-solo-purple" },
  { src: "/images/classes/curador.png", alt: "Healer", border: "border-solo-guild" },
  { src: "/images/classes/asesino.png", alt: "Assassin", border: "border-solo-magenta" },
  { src: "/images/classes/arquero.png", alt: "Archer", border: "border-solo-neon" },
  { src: "/images/classes/mago.png", alt: "Mage", border: "border-solo-cyber" }
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 2) % characterImages.length);
    }, 3000); // ⏳ Cambia las imágenes cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-solo-dark to-solo-dark/95 text-white relative overflow-hidden font-sans">
      <ParticleBackground className="absolute inset-0 z-0" />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-solo-purple via-solo-cyber to-solo-neon bg-clip-text text-transparent">
              Realm of Valor
            </h1>
            <p className="text-lg md:text-xl text-solo-gray">
              Your adventure begins here
            </p>
          </div>

          <Tabs defaultValue="home" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-solo-dark/50 backdrop-blur-sm">
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="join">Join</TabsTrigger>
            </TabsList>

            <TabsContent value="home">
              <Card className="p-6 bg-solo-dark/50 border-solo-purple/30">
                <div className="flex flex-col gap-8">
                  {/* Título centrado */}
                  <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-solo-purple to-solo-cyber bg-clip-text text-transparent">
                      Welcome to Realm of Valor
                    </h2>
                  </div>

                  {/* Descripción e imagen en dos columnas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Columna de descripción */}
                    <div className="prose prose-invert">
                      <p className="text-solo-gray text-base md:text-lg leading-relaxed">
                        A blockchain-powered RPG where warriors, archers, mages, and assassins battle for supremacy.
                        Equip NFTs, upgrade skills, and earn rewards in a world full of treasures and magic.
                      </p>
                    </div>

                    {/* Columna de imagen */}
                    <div className="flex items-center justify-center">
                      <div className="relative w-48 h-48 md:w-64 md:h-64">
                        {characterImages.slice(currentIndex, currentIndex + 2).map((character, index) => (
                          <div 
                            key={index} 
                            className={`absolute inset-0 flex flex-col items-center transition-opacity duration-1000 ease-in-out ${
                              index === 0 ? "opacity-100 scale-100" : "opacity-0 scale-90"
                            }`}
                          >
                            <img 
                              src={character.src} 
                              alt={character.alt} 
                              className={`w-full h-full object-cover rounded-lg border-4 ${character.border} transition-transform duration-500 hover:scale-105 shadow-xl`}
                            />
                            <p className="text-sm text-solo-gray mt-2">{character.alt}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Choose Your Path en una sola columna */}
                  <div className="bg-solo-dark/40 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-solo-cyber flex items-center gap-2 mb-4">
                      <Sword className="w-4 h-4" />
                      Choose Your Path:
                    </h3>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-solo-gray">
                      {/* Primera fila */}
                      <li className="flex items-center gap-2 p-2 hover:bg-solo-dark/40 rounded-lg transition-all group">
                        <div className="p-1.5 bg-solo-dark/50 rounded-lg group-hover:bg-solo-energy/10">
                          <Sword className="w-4 h-4 text-solo-energy" />
                        </div>
                        <span className="text-solo-gray group-hover:text-white transition-colors">
                          Warrior - Tank & Melee Combat
                        </span>
                      </li>
                      <li className="flex items-center gap-2 p-2 hover:bg-solo-dark/40 rounded-lg transition-all group">
                        <div className="p-1.5 bg-solo-dark/50 rounded-lg group-hover:bg-solo-purple/10">
                          <Shield className="w-4 h-4 text-solo-purple" />
                        </div>
                        <span className="text-solo-gray group-hover:text-white transition-colors">
                          Swordsman - Agile & Precision
                        </span>
                      </li>
                      <li className="flex items-center gap-2 p-2 hover:bg-solo-dark/40 rounded-lg transition-all group">
                        <div className="p-1.5 bg-solo-dark/50 rounded-lg group-hover:bg-solo-guild/10">
                          <Heart className="w-4 h-4 text-solo-guild" />
                        </div>
                        <span className="text-solo-gray group-hover:text-white transition-colors">
                          Healer - Support & Recovery
                        </span>
                      </li>

                      {/* Segunda fila */}
                      <li className="flex items-center gap-2 p-2 hover:bg-solo-dark/40 rounded-lg transition-all group">
                        <div className="p-1.5 bg-solo-dark/50 rounded-lg group-hover:bg-solo-magenta/10">
                          <Skull className="w-4 h-4 text-solo-magenta" />
                        </div>
                        <span className="text-solo-gray group-hover:text-white transition-colors">
                          Assassin - Stealth & Lethal
                        </span>
                      </li>
                      <li className="flex items-center gap-2 p-2 hover:bg-solo-dark/40 rounded-lg transition-all group">
                        <div className="p-1.5 bg-solo-dark/50 rounded-lg group-hover:bg-solo-neon/10">
                          <Target className="w-4 h-4 text-solo-neon" />
                        </div>
                        <span className="text-solo-gray group-hover:text-white transition-colors">
                          Archer - Ranged Attacks
                        </span>
                      </li>
                      <li className="flex items-center gap-2 p-2 hover:bg-solo-dark/40 rounded-lg transition-all group">
                        <div className="p-1.5 bg-solo-dark/50 rounded-lg group-hover:bg-solo-cyber/10">
                          <Wand2 className="w-4 h-4 text-solo-cyber" />
                        </div>
                        <span className="text-solo-gray group-hover:text-white transition-colors">
                          Mage - Elemental Mastery
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="features">
              <Card className="p-6 bg-solo-dark/50 border-solo-cyber/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* 🔥 Primera columna - Características principales */}
                  <div className="space-y-6">
                    <Feature 
                      icon={<Sword />} 
                      title="Epic Battles" 
                      description="Engage in intense real-time battles, defeat legendary foes, and claim glory." 
                    />
                    <Feature 
                      icon={<Trophy />} 
                      title="Ranking System" 
                      description="Climb the ranks, earn exclusive rewards, and prove yourself as a top warrior." 
                    />
                    <Feature 
                      icon={<Users />} 
                      title="Multiplayer Mode" 
                      description="Join forces with friends or challenge other players in team-based combat." 
                    />
                  </div>

                  {/* 🔥 Segunda columna - Características adicionales */}
                  <div className="space-y-6">
                    <Feature 
                      icon={<Shield />} 
                      title="Unique Equipment" 
                      description="Craft legendary weapons, enchant powerful armor, and customize your playstyle." 
                    />
                    <Feature 
                      icon={<Globe2 />} 
                      title="Open World" 
                      description="Explore vast lands filled with mysteries, treasures, and hidden dungeons." 
                    />
                    <Feature 
                      icon={<UserPlus />} 
                      title="Clans" 
                      description="Create or join clans, participate in guild wars, and build your empire together." 
                    />
                  </div>
                  
                </div>               
              </Card>
            </TabsContent>

            <TabsContent value="join">
              <Card className="p-6 bg-solo-dark/50 border-solo-neon/30">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold text-solo-neon">Join the Adventure!</h2>
                  <p className="text-solo-gray">Start your journey now</p>

                  {/* ✅ SignIn estilizado como botón */}
                  <div className="flex justify-center">
                    <SignIn />
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

/* 🔥 Feature con descripción mejorada */
const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex flex-col items-center md:items-start space-y-3 p-4 bg-solo-dark/30 rounded-lg backdrop-blur-sm hover:bg-solo-dark/40 transition-all">
    <div className="text-solo-cyber">{icon}</div>
    <span className="font-medium text-lg">{title}</span>
    <p className="text-sm text-solo-gray text-center md:text-left">{description}</p>
  </div>
);

/* 🎮 Botón de inicio de sesión estilizado */
const StyledSignIn = () => (
  <Button
    variant="ghost"
    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-solo-purple hover:bg-solo-purple/80 transition-all text-white text-lg font-bold shadow-md"
    onClick={() => SignIn()}
  >
    <LogIn className="w-5 h-5" /> Join Now
  </Button>
);
