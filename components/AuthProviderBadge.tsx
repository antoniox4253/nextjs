import { Shield, Mail } from "lucide-react";

type AuthProvider = 'worldcoin' | 'google';

interface AuthProviderBadgeProps {
  provider: AuthProvider;  // Ya no aceptamos undefined
}

export function AuthProviderBadge({ provider }: AuthProviderBadgeProps) {
  const badges = {
    worldcoin: {
      icon: <Shield className="w-3 h-3" />,
      text: "Worldcoin",
      className: "bg-green-500/10 text-green-500"
    },
    google: {
      icon: <Mail className="w-3 h-3" />,
      text: "Google",
      className: "bg-blue-500/10 text-blue-500"
    }
  };

  const badge = badges[provider];

  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${badge.className}`}>
      {badge.icon}
      <span>{badge.text}</span>
    </div>
  );
} 