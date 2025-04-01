"use client";

import { useEffect } from 'react';

export default function ErudaProvider() {
  useEffect(() => {
    // Solo cargar en desarrollo y en el cliente
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      // Usar dynamic import para cargar Eruda
      import('eruda')
        .then(({ default: eruda }) => {
          // Verificar si ya está inicializado
          if (!window.__ERUDA_INITIALIZED) {
            eruda.init();
            window.__ERUDA_INITIALIZED = true;
          }
        })
        .catch((err) => {
          console.warn('⚠️ Error cargando Eruda:', err);
        });
    }
  }, []);

  return null;
}

// Agregar el tipo para la variable global
declare global {
  interface Window {
    __ERUDA_INITIALIZED?: boolean;
  }
}
