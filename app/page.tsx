"use client";

import NavCard from "@/components/NavCard";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <NavCard url="/fe" description="Front End" />
        </main>
    );
}
