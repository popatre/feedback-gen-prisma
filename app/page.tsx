"use client";

import NavCard from "@/components/NavCard";

export default function Home() {
    return (
        <main className="pt-20 grid mx-20 gap-10 grid-cols-2">
            <NavCard url="/be" description="Back End" />
            <NavCard url="/fe" description="Front End" />
        </main>
    );
}
