// "use client";

import NavCard from "@/components/NavCard";

export default function Home() {
    return (
        <main className="pt-20 grid  gap-10 grid-cols-2 max-w-7xl w-10/12 ml-auto mr-auto">
            <NavCard url="/fe" description="Front End" />
        </main>
    );
}
