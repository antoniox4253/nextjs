"use client"; // 👈 Necesario para permitir hooks en Next.js

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ParticleBackground from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Store, Users2, Gavel, Search, Filter,
  Timer, ArrowUpDown, DollarSign, Dumbbell,
  Clock, Trash2, Plus, AlertCircle, CheckCircle2,
  Users, Tag, Swords
} from "lucide-react";

export default function Market() {
  const router = useRouter(); // ✅ Reemplazo de useNavigate()
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateOffer = () => {
    toast({
      title: "Oferta creada exitosamente",
      description: "Tu item ha sido puesto en venta en el mercado.",
    });
  };

  const handleCreateAuction = () => {
    toast({
      title: "Subasta creada exitosamente",
      description: "Tu item ha sido puesto en subasta.",
    });
  };

  const handleCancelListing = () => {
    toast({
      title: "Listado cancelado",
      description: "El item ha sido removido del mercado.",
    });
  };

  const handleBid = () => {
    toast({
      title: "Oferta realizada",
      description: "Tu oferta ha sido registrada exitosamente.",
    });
  };

  return (
    <div className="min-h-screen bg-solo-dark text-white">
      <ParticleBackground className="fixed inset-0" />
      
      <div className="relative z-10">
        <header className="sticky top-0 bg-solo-dark/95 backdrop-blur-sm border-b border-solo-purple/20 px-4 py-3">
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-solo-purple via-solo-blue to-solo-magenta bg-clip-text text-transparent">
            Mercado
          </h1>
        </header>

        <main className="p-4">
          <Tabs defaultValue="npc" className="w-full">
            <TabsList className="w-full grid grid-cols-3 gap-1 bg-solo-dark/90 border border-solo-purple/30 rounded-lg p-1 mb-4">
              <TabsTrigger value="npc" className="data-[state=active]:bg-solo-purple/20 data-[state=active]:text-white">
                <Store className="w-4 h-4 mr-2" />
                <span>NPC</span>
              </TabsTrigger>
              <TabsTrigger value="players" className="data-[state=active]:bg-solo-blue/20 data-[state=active]:text-white">
                <Users2 className="w-4 h-4 mr-2" />
                <span>Mercado</span>
              </TabsTrigger>
              <TabsTrigger value="auctions" className="data-[state=active]:bg-solo-magenta/20 data-[state=active]:text-white">
                <Gavel className="w-4 h-4 mr-2" />
                <span>Subastas</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-solo-gray w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-solo-dark/90 border-solo-purple/30 text-white placeholder:text-solo-gray"
                />
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-12rem)]">
              <TabsContent value="npc" className="mt-0">
                <div className="grid grid-cols-1 gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="bg-solo-dark/60 border-solo-purple/30 p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-solo-dark/80 rounded-lg border border-solo-purple/30 flex items-center justify-center flex-shrink-0">
                          <img src="/placeholder.svg" alt="Item" className="w-10 h-10" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-medium text-white truncate">Poción de Poder {i + 1}</h3>
                              <p className="text-sm text-solo-gray mt-1">Aumenta el poder de ataque por 30 minutos</p>
                            </div>
                            <Badge className="bg-solo-purple/20 text-solo-purple text-xs">Común</Badge>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center text-solo-energy">
                              <DollarSign className="w-4 h-4 mr-1" />
                              <span>500</span>
                            </div>
                            <Button size="sm" className="bg-solo-purple/20 hover:bg-solo-purple/30">
                              Comprar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </main>

        {/* ✅ Footer con navegación */}
        <footer className="fixed bottom-0 left-0 right-0 bg-solo-dark/95 backdrop-blur-sm border-t border-solo-purple/20 p-2">
          <div className="flex justify-around max-w-md mx-auto">
            <Button onClick={() => router.push('/dashboard')} variant="ghost" size="sm">
              <Store className="w-5 h-5 text-solo-purple" />
              <span className="text-xs">Inicio</span>
            </Button>
            <Button onClick={() => router.push('/training')} variant="ghost" size="sm">
              <Dumbbell className="w-5 h-5 text-solo-blue" />
              <span className="text-xs">Training</span>
            </Button>
            <Button onClick={() => router.push('/guild')} variant="ghost" size="sm">
              <Users className="w-5 h-5 text-solo-magenta" />
              <span className="text-xs">Guild</span>
            </Button>
            <Button onClick={() => router.push('/inventory')} variant="ghost" size="sm">
              <AlertCircle className="w-5 h-5 text-solo-blue" />
              <span className="text-xs">Inventario</span>
            </Button>
            <Button onClick={() => router.push('/combat')} variant="ghost" size="sm">
              <Swords className="w-5 h-5 text-solo-energy" />
              <span className="text-xs">Combat</span>
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
