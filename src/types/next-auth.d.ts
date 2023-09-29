import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        username: string;
    }

    interface JWT {
        access: string;
        refresh: string;
    }
}

