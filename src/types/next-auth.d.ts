import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    access_token: string;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
  }
}
