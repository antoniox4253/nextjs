import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingScreen = () => {
  const navigate = useNavigate();
  const [dots, setDots] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);

    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(dotsInterval);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-solo-dark flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 50 }, (_, i) => (
          <div 
            key={i} 
            className="absolute text-solo-cyber font-mono text-sm md:text-base"
            style={{
              left: `${(i / 50) * 100}%`,
              animation: `matrix-fall ${Math.random() * 3 + 2}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
              width: '20px',
              textAlign: 'center'
            }}
          >
            {Array.from({ length: 35 }, () => (
              String.fromCharCode(Math.random() > 0.5 ? 48 + Math.floor(Math.random() * 2) : 12354 + Math.floor(Math.random() * 50))
            )).join('\n')}
          </div>
        ))}
      </div>
      
      <div className="relative z-10 flex flex-col items-center space-y-4 bg-solo-dark/50 p-8 rounded-lg backdrop-blur-sm">
        <div className="text-2xl text-solo-neon font-mono animate-pulse">
          Creando personaje{dots}
        </div>
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-solo-cyber animate-[loading_5s_linear]" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;