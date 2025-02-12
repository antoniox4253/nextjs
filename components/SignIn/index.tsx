"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export const SignIn = () => {
  const { data: session } = useSession();
  if (session) {
    console.log("Session data:", session); // 🔍 Ver qué datos tiene la sesión
    return (
      <>
        Signed in as {session?.user?.name?.slice(0, 10)} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  } else {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }
};
