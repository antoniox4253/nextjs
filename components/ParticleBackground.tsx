"use client";

import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  className?: string;
}

export default function ParticleBackground({ className }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      length: number;
      trail: Array<{ x: number; y: number }>;
      opacity: number;
    }> = [];

    const colors = [
      'rgba(155, 135, 245, 0.8)', // solo-purple
      'rgba(14, 165, 233, 0.8)',  // solo-blue
      'rgba(217, 70, 239, 0.8)',  // solo-magenta
      'rgba(0, 240, 255, 0.8)',   // solo-cyber
      'rgba(0, 255, 157, 0.8)'    // solo-neon
    ];

    const createParticle = () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        length: Math.random() * 30 + 20,
        trail: [],
        opacity: Math.random() * 0.5 + 0.5
      };
    };

    const initParticles = () => {
      for (let i = 0; i < 70; i++) {
        particles.push(createParticle());
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(26, 31, 44, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > particle.length) {
          particle.trail.shift();
        }

        if (particle.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
          
          for (let i = 1; i < particle.trail.length; i++) {
            const point = particle.trail[i];
            ctx.lineTo(point.x, point.y);
          }

          ctx.strokeStyle = particle.color;
          ctx.lineWidth = particle.size;
          ctx.lineCap = 'round';
          ctx.stroke();

          // Añadir brillo
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = 10;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        if (
          particle.x < -100 ||
          particle.x > canvas.width + 100 ||
          particle.y < -100 ||
          particle.y > canvas.height + 100
        ) {
          const newParticle = createParticle();
          particle.x = newParticle.x;
          particle.y = newParticle.y;
          particle.speedX = newParticle.speedX;
          particle.speedY = newParticle.speedY;
          particle.trail = [];
        }
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 bg-gradient-to-br from-solo-dark via-black to-solo-dark ${className}`}
      style={{ opacity: 0.9 }}
    />
  );
}