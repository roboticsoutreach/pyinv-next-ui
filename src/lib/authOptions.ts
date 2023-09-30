import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authTokenCreate } from "./api";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    const authResponse = await authTokenCreate(credentials);

                    if (authResponse) {
                        return {
                            id: authResponse.username,
                            username: authResponse.username,
                        };
                    } else return null;
                } catch (error) {
                    console.log(error);
                    return null;
                }
            },
        }),
    ],
};

