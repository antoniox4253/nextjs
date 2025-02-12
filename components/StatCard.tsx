import React from 'react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  label: string;
  value: string | number | React.ReactNode;
  icon?: React.ReactNode;
  color?: 'purple' | 'blue' | 'magenta' | 'cyber' | 'neon';
}

const StatCard = ({ label, value, icon, color = 'purple' }: StatCardProps) => {
  const colorClasses = {
    purple: 'text-solo-purple border-solo-purple/30 hover:border-solo-purple',
    blue: 'text-solo-blue border-solo-blue/30 hover:border-solo-blue',
    magenta: 'text-solo-magenta border-solo-magenta/30 hover:border-solo-magenta',
    cyber: 'text-solo-cyber border-solo-cyber/30 hover:border-solo-cyber',
    neon: 'text-solo-neon border-solo-neon/30 hover:border-solo-neon',
  };

  return (
    <Card 
      className={`
        bg-solo-dark/80 ${colorClasses[color]} backdrop-blur-sm p-4 
        hover:scale-105 transition-all duration-300 cursor-pointer 
        relative overflow-hidden group
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-current/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-current/20 to-transparent opacity-0 group-hover:opacity-100 blur animate-pulse-glow" />
      <div className="relative flex items-center gap-3">
        {icon && <div className="text-current">{icon}</div>}
        <div>
          <p className="text-solo-gray text-sm">{label}</p>
          <div className="text-current text-xl font-bold font-mono">{value}</div>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;