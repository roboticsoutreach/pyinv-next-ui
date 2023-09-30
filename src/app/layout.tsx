import NextAuthProvider from "@/components/NextAuthProvider";
import { Metadata } from "next";
import { Container, CssBaseline } from "@mui/material";
import NavBar from "@/components/NavBar";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const metadata: Metadata = {
    title: "SRO Inventory",
    description: "An asset tracking system for SRO",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <NextAuthProvider>
                <body>
                    <CssBaseline />
                    <NavBar />

                    <Container sx={{ mt: 2 }}>{children}</Container>
                </body>
            </NextAuthProvider>
        </html>
    );
}

