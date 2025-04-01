import 'next-auth';

declare module 'next-auth' {
  interface User {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    provider?: 'worldcoin' | 'google' | null;
    authProvider?: 'worldcoin' | 'google' | null;
  }

  interface Session {
    user: User;
    userStats?: {
      gold: number;
      wld: number;
      referredCount: number;
    };
  }
} 