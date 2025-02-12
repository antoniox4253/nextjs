
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Coins, Gem, Target, Users, Trophy, ArrowUp, Crown, Settings, Building, Star, LogOut } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface GuildMember {
  id: string;
  name: string;
  rank: string;
  level: number;
  contribution: number;
  lastActive: string;
  joinDate: string;
  activityStatus: 'online' | 'offline' | 'away';
  lastActivityTime: string;
}

interface ClanRank {
  id: number;
  name: string;
  power: number;
  members: number;
  level: number;
}

interface ClanUpgrade {
  id: number;
  name: string;
  level: number;
  maxLevel: number;
  cost: number;
  timeToUpgrade: string;
  benefits: string[];
  progress: number;
}

interface GuildPanelProps {
  gold: number;
  wld: number;
  missions: any[];
  clanPower: number;
  clanUpgrades: any[];
  donateGold: (amount: number) => void;
  donateWld: (amount: number) => void;
  addMission: (mission: any) => void;
  addClanUpgrade: (upgrade: any) => void;
  expanded: string;
  onAccordionChange: (value: string) => void;
}

const GuildPanel: React.FC<GuildPanelProps> = ({
  gold,
  wld,
  missions,
  clanPower,
  clanUpgrades,
  donateGold,
  donateWld,
  addMission,
  addClanUpgrade,
  expanded,
  onAccordionChange
}) => {
  const { toast } = useToast();
  const [donationAmount, setDonationAmount] = useState<{ gold: string; wld: string }>({ gold: '', wld: '' });

  const members: GuildMember[] = [
    { 
      id: '1', 
      name: 'GuildMaster', 
      rank: 'Leader', 
      level: 85, 
      contribution: 15000, 
      lastActive: '2024-03-14', 
      joinDate: '2024-01-01',
      activityStatus: 'online',
      lastActivityTime: '2 min ago'
    },
    { 
      id: '2', 
      name: 'VeteranKnight', 
      rank: 'Officer', 
      level: 75, 
      contribution: 12000, 
      lastActive: '2024-03-14', 
      joinDate: '2024-01-05',
      activityStatus: 'away',
      lastActivityTime: '15 min ago'
    },
    { 
      id: '3', 
      name: 'EliteWarrior', 
      rank: 'Veteran', 
      level: 65, 
      contribution: 8000, 
      lastActive: '2024-03-13', 
      joinDate: '2024-01-10',
      activityStatus: 'offline',
      lastActivityTime: '3 hours ago'
    }
  ];

  const clanRankings: ClanRank[] = [
    { id: 1, name: "DragonSlayers", power: 150000, members: 50, level: 10 },
    { id: 2, name: "ImmortalKnights", power: 145000, members: 48, level: 9 },
    { id: 3, name: "PhoenixRising", power: 140000, members: 45, level: 9 }
  ];

  const upgrades: ClanUpgrade[] = [
    {
      id: 1,
      name: "Fortaleza del Clan",
      level: 5,
      maxLevel: 10,
      cost: 5000,
      timeToUpgrade: "8h",
      benefits: ["+5% HP para todos los miembros", "+3% Defensa", "+100 Almacenamiento de oro"],
      progress: 75
    },
    {
      id: 2,
      name: "Banco del Clan",
      level: 3,
      maxLevel: 10,
      cost: 3000,
      timeToUpgrade: "4h",
      benefits: ["+10% Producción de oro", "+5% Interés diario", "+200 Almacenamiento de oro"],
      progress: 45
    },
    {
      id: 3,
      name: "Academia de Guerra",
      level: 4,
      maxLevel: 10,
      cost: 4000,
      timeToUpgrade: "6h",
      benefits: ["+5% Daño", "+3% Velocidad de ataque", "+2% Experiencia"],
      progress: 60
    }
  ];

  const handleDonation = (type: 'gold' | 'wld') => {
    const amount = Number(donationAmount[type]);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error en la donación",
        description: "Por favor ingresa una cantidad válida",
        variant: "destructive"
      });
      return;
    }

    if (type === 'gold') {
      donateGold(amount);
    } else {
      donateWld(amount);
    }

    setDonationAmount(prev => ({ ...prev, [type]: '' }));
    toast({
      title: "Donación exitosa",
      description: `Has donado ${amount} ${type.toUpperCase()}`
    });
  };

  const handleUpgrade = (upgradeId: number) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade) return;

    if (upgrade.level >= upgrade.maxLevel) {
      toast({
        description: "Esta mejora ya está en su nivel máximo",
        variant: "destructive"
      });
      return;
    }

    if (gold < upgrade.cost) {
      toast({
        description: "No tienes suficiente oro para esta mejora",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Mejora iniciada",
      description: `${upgrade.name} se está mejorando. Tiempo restante: ${upgrade.timeToUpgrade}`
    });
  };

  const handleLeaveClan = () => {
    toast({
      title: "Confirmar Acción",
      description: "¿Estás seguro que deseas abandonar el clan?",
      action: (
        <Button 
          variant="destructive" 
          size="sm"
          onClick={() => {
            toast({
              description: "Has abandonado el clan exitosamente"
            });
          }}
        >
          Confirmar
        </Button>
      )
    });
  };

  return (
    <div className="space-y-6 pb-24">
      <Card className="bg-solo-dark/50 p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Coins className="text-yellow-500" />
            <span>Gold: {gold}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Gem className="text-blue-500" />
            <span>WLD: {wld}</span>
          </div>
          <div className="col-span-2 md:col-span-1 flex items-center space-x-2">
            <Trophy className="text-solo-magenta" />
            <span>Poder Total: {clanPower}</span>
          </div>
        </div>

        <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-solo-purple/20 scrollbar-track-solo-dark/10">
          <Accordion type="single" collapsible value={expanded} onValueChange={onAccordionChange}>
            <AccordionItem value="donations" className="border-solo-purple/20">
              <AccordionTrigger className="text-solo-cyber hover:no-underline">
                <div className="flex items-center gap-2">
                  <Coins />
                  Donaciones del Clan
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Cantidad de Gold"
                        value={donationAmount.gold}
                        onChange={(e) => setDonationAmount(prev => ({ ...prev, gold: e.target.value }))}
                        className="bg-solo-dark/30"
                      />
                      <Button 
                        onClick={() => handleDonation('gold')}
                        className="bg-yellow-500/20 hover:bg-yellow-500/30"
                      >
                        Donar Gold
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Cantidad de WLD"
                        value={donationAmount.wld}
                        onChange={(e) => setDonationAmount(prev => ({ ...prev, wld: e.target.value }))}
                        className="bg-solo-dark/30"
                      />
                      <Button 
                        onClick={() => handleDonation('wld')}
                        className="bg-blue-500/20 hover:bg-blue-500/30"
                      >
                        Donar WLD
                      </Button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="members" className="border-solo-purple/20">
              <AccordionTrigger className="text-solo-guild hover:no-underline">
                <div className="flex items-center gap-2">
                  <Users />
                  Miembros del Clan
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 p-4">
                  {members.map((member) => (
                    <Card key={member.id} className="p-4 bg-solo-dark/30">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center space-x-3">
                          {member.rank === 'Leader' && <Crown className="text-yellow-500" />}
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-solo-gray">Nivel {member.level} • {member.rank}</p>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-solo-cyber">Contribución: {member.contribution}</p>
                            <p className="text-xs text-solo-gray">Último acceso: {member.lastActive}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs ${
                            member.activityStatus === 'online' ? 'bg-green-500/20 text-green-500' :
                            member.activityStatus === 'away' ? 'bg-yellow-500/20 text-yellow-500' :
                            'bg-gray-500/20 text-gray-500'
                          }`}>
                            {member.activityStatus === 'online' ? 'En línea' :
                             member.activityStatus === 'away' ? 'Ausente' :
                             'Desconectado'}
                            <span className="ml-1 text-solo-gray">• {member.lastActivityTime}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="missions" className="border-solo-purple/20">
              <AccordionTrigger className="text-solo-guild hover:no-underline">
                <div className="flex items-center gap-2">
                  <Target />
                  Misiones del Clan
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 p-4">
                  {missions.length === 0 ? (
                    <p className="text-solo-gray">No hay misiones activas</p>
                  ) : (
                    missions.map((mission, index) => (
                      <Card key={index} className="p-4 bg-solo-dark/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Target className="text-solo-guild" />
                            <span>{mission.name}</span>
                          </div>
                          <span className="text-solo-gray">{mission.reward}</span>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rankings" className="border-solo-magenta/20">
              <AccordionTrigger className="text-solo-magenta hover:no-underline">
                <div className="flex items-center gap-2">
                  <Trophy />
                  Ranking de Clanes
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 p-4">
                  {clanRankings.map((clan, index) => (
                    <Card key={clan.id} className="p-4 bg-solo-dark/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 flex items-center justify-center">
                            {index === 0 && <Trophy className="text-yellow-500" />}
                            {index === 1 && <Star className="text-gray-400" />}
                            {index === 2 && <Star className="text-amber-700" />}
                          </div>
                          <div>
                            <p className="font-medium">{clan.name}</p>
                            <p className="text-sm text-solo-gray">Nivel {clan.level}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-solo-magenta">{clan.power.toLocaleString()} Poder</p>
                          <p className="text-sm text-solo-gray">{clan.members} miembros</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="upgrades" className="border-solo-neon/20">
              <AccordionTrigger className="text-solo-neon hover:no-underline">
                <div className="flex items-center gap-2">
                  <ArrowUp />
                  Mejoras del Clan
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 p-4">
                  {upgrades.map((upgrade) => (
                    <Card key={upgrade.id} className="p-4 bg-solo-dark/30">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-lg">{upgrade.name}</h3>
                            <p className="text-solo-neon text-sm">
                              Nivel {upgrade.level}/{upgrade.maxLevel}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-yellow-500">{upgrade.cost} Gold</p>
                            <p className="text-solo-gray text-sm">Tiempo: {upgrade.timeToUpgrade}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="h-2 bg-solo-dark rounded-full">
                            <div 
                              className="h-full bg-solo-neon rounded-full"
                              style={{ width: `${upgrade.progress}%` }}
                            />
                          </div>
                          <div className="text-sm space-y-1">
                            {upgrade.benefits.map((benefit, index) => (
                              <p key={index} className="text-solo-gray flex items-center gap-2">
                                <Star className="w-4 h-4 text-solo-neon" />
                                {benefit}
                              </p>
                            ))}
                          </div>
                        </div>

                        <Button 
                          onClick={() => handleUpgrade(upgrade.id)}
                          disabled={upgrade.level >= upgrade.maxLevel}
                          className={`w-full ${
                            upgrade.level >= upgrade.maxLevel 
                              ? 'bg-gray-500/20' 
                              : 'bg-solo-neon/20 hover:bg-solo-neon/30'
                          }`}
                        >
                          {upgrade.level >= upgrade.maxLevel 
                            ? 'Nivel Máximo' 
                            : `Mejorar (${upgrade.cost} Gold)`}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="settings" className="border-solo-gray/20">
              <AccordionTrigger className="text-solo-gray hover:no-underline">
                <div className="flex items-center gap-2">
                  <Settings />
                  Opciones del Clan
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 space-y-4">
                  <Button 
                    variant="destructive"
                    className="w-full"
                    onClick={handleLeaveClan}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Abandonar Clan
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Card>
    </div>
  );
};

export default GuildPanel;

