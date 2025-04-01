import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    {
      id: "worldcoin",
      name: "Worldcoin",
      type: "oauth",
      wellKnown: "https://id.worldcoin.org/.well-known/openid-configuration",
      authorization: { params: { scope: "openid" } },
      clientId: process.env.WLD_CLIENT_ID,
      clientSecret: process.env.WLD_CLIENT_SECRET,
      idToken: true,
      checks: ["state", "nonce", "pkce"],
      profile(profile) {
        console.log("Perfil recibido de Worldcoin:", profile); // ✅ Imprime lo que devuelve Worldcoin
        return {
          id: profile.sub,
          name: profile.sub,
          verificationLevel:
            profile["https://id.worldcoin.org/v1"].verification_level,
        };
      },
    },
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.email,
          name: profile.email,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.name = session.user.email || session.user.name;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
