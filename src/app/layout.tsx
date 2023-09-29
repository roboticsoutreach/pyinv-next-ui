import NextAuthProvider from "@/components/NextAuthProvider";
import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SRO Inventory",
    description: "An asset tracking system for SRO",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <NextAuthProvider>
                <body className={inter.className}>{children}</body>
            </NextAuthProvider>
        </html>
    );
}

