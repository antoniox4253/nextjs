"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(); // Redirige al login si no está autenticado
    }
  }, [status]);

  if (status === "loading") {
    return <p className="text-center text-white">Cargando...</p>;
  }

  return session ? <>{children}</> : null;
}
