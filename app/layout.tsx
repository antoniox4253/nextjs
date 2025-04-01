import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MiniKitProvider from "@/components/minikit-provider";
import dynamic from "next/dynamic";
import NextAuthProvider from "@/components/next-auth-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

// Cargar Eruda dinámicamente solo en desarrollo
const ErudaProvider = process.env.NODE_ENV === 'development'
  ? dynamic(() => import('@/components/Eruda/eruda-provider'), { ssr: false })
  : () => null;

export const metadata: Metadata = {
  title: "Realm Of Valor",
  description: "Wolf Dev",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#1a1f2c"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <LanguageProvider>
            <ClientLayout>
              <ErudaProvider />
              <MiniKitProvider>
                {children}
              </MiniKitProvider>
            </ClientLayout>
          </LanguageProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
