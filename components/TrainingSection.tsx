
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Dumbbell, Swords, Brain, Wind, Timer, BatteryMedium } from 'lucide-react';

interface TrainingOption {
  id: string;
  name: string;
  description: string;
  duration: string;
  energyCost: number;
  icon: React.ReactNode;
  benefits: string[];
  category: 'physical' | 'magical';
}

const trainingOptions: TrainingOption[] = [
  {
    id: '1',
    name: 'Physical Training',
    description: 'Improve strength and endurance',
    duration: '2h',
    energyCost: 20,
    icon: <Dumbbell className="w-8 h-8" />,
    benefits: ['Strength +5', 'Endurance +3'],
    category: 'physical'
  },
  {
    id: '2',
    name: 'Combat Practice',
    description: 'Enhance fighting skills',
    duration: '3h',
    energyCost: 30,
    icon: <Swords className="w-8 h-8" />,
    benefits: ['Agility +4', 'Precision +3'],
    category: 'physical'
  },
  {
    id: '3',
    name: 'Meditation',
    description: 'Increase magical power',
    duration: '1h',
    energyCost: 15,
    icon: <Brain className="w-8 h-8" />,
    benefits: ['Mana +5', 'Focus +3'],
    category: 'magical'
  },
  {
    id: '4',
    name: 'Speed Training',
    description: 'Improve speed and reflexes',
    duration: '2h',
    energyCost: 25,
    icon: <Wind className="w-8 h-8" />,
    benefits: ['Speed +4', 'Reflexes +3'],
    category: 'physical'
  }
];

interface TrainingSectionProps {
  category: 'physical' | 'magical';
}

const TrainingSection: React.FC<TrainingSectionProps> = ({ category }) => {
  const { toast } = useToast();

  const filteredOptions = trainingOptions.filter(option => option.category === category);

  const handleStartTraining = (option: TrainingOption) => {
    toast({
      title: "Training Started",
      description: `You've started ${option.name}. Duration: ${option.duration}`,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 animate-fade-in pb-20">
      {filteredOptions.map((option) => (
        <Card 
          key={option.id}
          className="group bg-solo-dark/80 border-solo-neon/30 hover:border-solo-neon relative overflow-hidden transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-solo-neon/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="p-4 relative">
            <div className="flex items-start gap-4">
              <div className="text-solo-neon group-hover:animate-pulse-glow">
                {option.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white group-hover:text-solo-neon transition-colors">
                  {option.name}
                </h3>
                <p className="text-sm text-solo-gray mt-1">{option.description}</p>
                
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Timer className="w-4 h-4 text-solo-cyber" />
                    <span className="text-solo-gray">Duration: {option.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BatteryMedium className="w-4 h-4 text-solo-energy" />
                    <span className="text-solo-gray">Energy: {option.energyCost}</span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {option.benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="text-xs bg-solo-dark/50 text-solo-neon px-2 py-1 rounded-md border border-solo-neon/20"
                    >
                      {benefit}
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleStartTraining(option)}
                  className="mt-3 w-full bg-solo-neon hover:bg-solo-neon/80 text-black font-semibold transition-colors"
                >
                  Start Training
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TrainingSection;
