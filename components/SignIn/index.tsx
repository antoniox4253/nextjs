"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, UserPlus } from "lucide-react";

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (!session?.user?.name) return;

      console.log("🔍 Verificando usuario en la base de datos...");

      try {
        const response = await fetch("/api/user/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: session.user.name }),
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data || typeof data.isRegistered === "undefined") {
          throw new Error("Respuesta inválida de la API.");
        }

        console.log("✅ Usuario verificado:", data);
        setIsRegistered(data.isRegistered);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error al conectar con la API:", error);
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

  // 🕐 Mostrar mensaje mientras carga la sesión o verifica la BD
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>🔄 Verificando sesión y base de datos...</p>
      </div>
    );
  }

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
              await fetch("/api/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: session.user.name }),
              });
              signOut({ callbackUrl: "/" });
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold text-lg shadow-md transition-all"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </Button>
        </>
      ) : (
        <Button
          onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold text-lg shadow-md transition-all"
        >
          <LogIn className="w-5 h-5" />
          Iniciar Sesión
        </Button>
      )}
    </div>
  );
}
