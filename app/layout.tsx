import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { TrpcProvider } from "../utils/trpc-providers";
import AuthContextProvider from "@/wrappers/AuthProvider";

const roboto = Roboto({
    weight: ["500", "700"],
    subsets: ["latin"],
    variable: "--font-roboto",
});

export const metadata: Metadata = {
    title: "Project Guidance",
    description: "Checklist and feedback generator",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body id="root" className={`${roboto.variable} roboto.className`}>
                <TrpcProvider>
                    <AuthContextProvider>{children}</AuthContextProvider>
                </TrpcProvider>
            </body>
        </html>
    );
}
