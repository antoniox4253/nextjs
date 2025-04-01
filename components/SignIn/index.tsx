"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, UserPlus } from "lucide-react";

const useUserData = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);

  const reloadUserData = useCallback(async () => {
    if (!session?.user?.name) return;

    try {
      const [userDataRes, userStatsRes] = await Promise.all([
        fetch(`/api/user/data?hashworld=${session.user.name}`),
        fetch(`/api/user/stats?hashworld=${session.user.name}`)
      ]);

      const [userData, userStats] = await Promise.all([
        userDataRes.json(),
        userStatsRes.json()
      ]);

      setUserData({ ...userData, ...userStats });
    } catch (error) {
      console.error('Error recargando datos:', error);
    }
  }, [session]);

  useEffect(() => {
    reloadUserData();
  }, [reloadUserData]);

  return { userData, reloadUserData };
};

export default function SignIn() {
  const { userData, reloadUserData } = useUserData();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (!session?.user?.name) return;

      try {
        // Determinar el provider basado en la presencia de email
        const provider = session.user.email ? 'google' : 'worldcoin';
        
        const authResponse = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            hashworld: session.user.name,
            provider 
          }),
        });

        if (!authResponse.ok) {
          throw new Error("Error en verificación de auth");
        }

        // Luego verificamos el estado del registro
        const response = await fetch("/api/user/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hashworld: session.user.name }),
        });

        if (!response.ok) {
          throw new Error("Error en verificación de usuario");
        }

        const data = await response.json();
        setIsRegistered(data.isRegistered);
        setLoading(false);

      } catch (error) {
        console.error("Error:", error);
        setIsRegistered(null);
        setLoading(false);
      }
    };

    if (session) {
      verifyUser();
    } else {
      setLoading(false);
    }
  }, [session]);

  // 🚀 Espera a que la API responda antes de redirigir
  useEffect(() => {
    if (isRegistered === true) {
      console.log("➡️ Redirigiendo a Dashboard...");
      router.replace("/dashboard");
    } else if (isRegistered === false) {
      console.log("➡️ Redirigiendo a Registro...");
      router.replace("/register");
    }
  }, [isRegistered, router]);

  // Pantalla de carga que cubre todo
  if (status === "loading" || loading) {
    return (
      <div className="fixed inset-0 bg-solo-dark flex items-center justify-center z-50">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-solo-purple border-t-transparent rounded-full mb-4 mx-auto"></div>
          <p className="text-white text-xl font-semibold">🔄 Loading session and database...</p>
          <p className="text-gray-400 text-sm mt-2">Please wait a moment...</p>
        </div>
      </div>
    );
  }

  // Usar reloadUserData después de operaciones que modifiquen datos
  const handleCreateCharacter = async () => {
    // ... código de creación
    await reloadUserData();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {session ? (
        <>
          {isRegistered === false && (
            <Button
              onClick={() => router.replace("/register")}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-lg shadow-md transition-all"
            >
              <UserPlus className="w-5 h-5" />
              Completar Registro
            </Button>
          )}
          <Button
            onClick={async () => {
              if (session?.user?.name) {
                await fetch("/api/logout", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ userId: session.user.name }),
                });
              }
              signOut({ callbackUrl: "/" });
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold text-lg shadow-md transition-all"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </Button>
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => signIn("worldcoin", { callbackUrl: "/dashboard" })}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold text-lg shadow-md transition-all"
          >
            <LogIn className="w-5 h-5" />
            Iniciar con Worldcoin
          </Button>
          
          <Button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg shadow-md transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Iniciar con Google
          </Button>
        </div>
      )}
    </div>
  );
}
