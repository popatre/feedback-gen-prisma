"use client";

import Login from "@/components/Login";
import NavCard from "@/components/NavCard";
import { UserContext } from "@/lib/context";
import { useContext } from "react";

export default function Home() {
    const user = useContext(UserContext) ?? { email: null };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <NavCard url="/fe" description="Front End" />
        </main>
    );
}
