import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        password: {
          label: "Password",
          type: "password",
        },
        email: {
          label: "email",
          type: "email",
          placeholder: "Peak & Flow",
        },
      },

      async authorize(credentials) {
        try {
          //   const res = await axios.post(
          //     `${BASE_URL}admins/login`,
          //     {
          //       password: credentials?.password,
          //       username: credentials?.username,
          //     },
          //     {
          //       headers: {
          //         "x-api-key": `Key ${API_KEY}`,
          //         "Content-Type": "application/json",
          //         Accept: "application/json",
          //       },
          //     }
          //   );
          if (credentials?.email === "ghaisani.nurani@gmail.com" && credentials?.password === "kenzie123") {
            return {
              id: "1",
              name: "Admin",
              email: "admin@gmail.com",
              role: "Admin",
              token: "token",
            };
          } else {
            throw new Error("CredentialsSignin");
          }

          //   return res.data; // Return the user data if successful
        } catch (err: any) {
          if (err.response?.status === 401) {
            throw new Error("CredentialsSignin"); // Specific error for client-side handling
          }
          throw new Error("An error occurred during authentication.");
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },
  callbacks: {
    async session({ session, token }) {
      //   session.user.accessToken = token.data.token;
      //   const decoded = decodeJwt(session.user.accessToken);
      //   session.user.decoded = decoded;
      //   session.user.username = decoded?.AdminRole;
      //   session.user.role = getRoleNameByID(session.user.username);
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) token.id = user.id;

      return { ...token, ...user };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
