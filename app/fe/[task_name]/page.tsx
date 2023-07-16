import GuidanceGrid from "@/components/GuidanceGrid";
import React from "react";

export default async function Page({
    params,
}: {
    params: { task_name: string };
}) {
    const res = await fetch(`http://localhost:3000/api/${params.task_name}`, {
        next: { revalidate: 0 },
        method: "GET",
    });
    const parsed = await res.json();
    const { couldData, shouldData, mustData, ticketDescription } =
        parsed.feedback;
    return (
        <div>
            <h1 className="text-center font-bold text-2xl">
                {ticketDescription}
            </h1>
            <GuidanceGrid
                mustData={mustData}
                shouldData={shouldData}
                couldData={couldData}
            />
        </div>
    );
}
