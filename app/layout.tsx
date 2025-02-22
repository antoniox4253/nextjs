import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MiniKitProvider from "@/components/minikit-provider";
import dynamic from "next/dynamic";
import NextAuthProvider from "@/components/next-auth-provider";
import { LanguageProvider } from "@/contexts/LanguageContext"; // ✅ Importar el proveedor de idioma

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Realm Of Valor",
  description: "Wolf Dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ErudaProvider = dynamic(
    () => import("../components/Eruda").then((c) => c.ErudaProvider),
    {
      ssr: false,
    }
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <LanguageProvider>  {/* ✅ Ahora el contexto está disponible en toda la app */}
            <ErudaProvider>
              <MiniKitProvider>
                {children}
              </MiniKitProvider>
            </ErudaProvider>
          </LanguageProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
