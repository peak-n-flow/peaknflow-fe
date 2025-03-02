import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { API_KEY, BASE_URL } from "./env";

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
          const res = await axios.post(
            `${BASE_URL}auth/login`,
            {
              password: credentials?.password,
              email: credentials?.email,
            },
            {
              headers: {
                "x-api-key": `Key ${API_KEY}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );
          if (res.status === 200) {
            return res.data.payload;
          } else {
            throw new Error("CredentialsSignin");
          }
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
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },
  callbacks: {
    async session({ session, token }) {
      console.log("session", token);
      session.user.access_token = token.access_token;
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
