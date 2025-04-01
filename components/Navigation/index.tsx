"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Navigation.module.css";
import { Home, Sword, Trophy, MessageCircle } from "lucide-react";

const menuItems = [
  {
    label: "Home",
    href: "/dashboard",
    icon: Home
  },
  {
    label: "Arena",
    href: "/arena",
    icon: Sword
  },
  {
    label: "Rankings",
    href: "/rankings",
    icon: Trophy
  },
  {
    label: "Chat",
    href: "/chat",
    icon: MessageCircle
  }
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.container}>
      <ul className="grid grid-cols-4 gap-2">
        {menuItems.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className={styles.menuItem}>
              <item.icon className="w-4 h-4" />
              <span className="text-xs">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation; 