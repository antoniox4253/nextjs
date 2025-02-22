"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Gamepad, Dumbbell, Users, Compass, ShoppingBag, Swords } from "lucide-react";

export default function FooterNav() {
  const router = useRouter();
  const { t } = useLanguage(); // 🔹 Traducción activada

  const navLinks = [
    { href: "/dashboard", label: t("home"), icon: <Gamepad className="w-5 h-5 text-solo-purple" /> },
    { href: "/training", label: t("training"), icon: <Dumbbell className="w-5 h-5 text-solo-blue" /> },
    { href: "/guild", label: t("guild"), icon: <Users className="w-5 h-5 text-solo-guild" /> },
    { href: "/combat", label: t("combat"), icon: <Swords className="w-5 h-5 text-solo-energy" /> },
    { href: "/inventory", label: t("inventory"), icon: <Compass className="w-5 h-5 text-solo-cyber" /> },
    { href: "/market", label: t("market"), icon: <ShoppingBag className="w-5 h-5 text-solo-neon" /> }
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-solo-dark/95 to-solo-dark/80 backdrop-blur-sm py-4 md:py-6 border-t border-solo-purple/20">
      <div className="container mx-auto px-2 md:px-4">
        <nav className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-4 max-w-4xl mx-auto">
          {navLinks.map((link, index) => (
            <Button
              key={index}
              onClick={() => router.push(link.href)}
              variant="ghost"
              className="flex flex-col items-center justify-center gap-1 h-auto py-2 hover:bg-solo-purple/20 transition-all duration-300 group"
            >
              {link.icon}
              <span className="text-[10px] md:text-sm font-medium text-solo-gray group-hover:text-white transition-colors">
                {link.label}
              </span>
            </Button>
          ))}
        </nav>
      </div>
    </footer>
  );
}
