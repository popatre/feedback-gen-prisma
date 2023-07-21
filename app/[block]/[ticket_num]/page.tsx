import GuidanceGrid from "@/components/GuidanceGrid";
import React from "react";

export default async function Page({
    params,
}: {
    params: { ticket_num: string; block: string };
}) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/feedback?block=${params.block}&ticket=${params.ticket_num}`,
        {
            next: { revalidate: 0 },
            method: "GET",
        }
    );

    if (res.status !== 200) {
        return <p>Something went wrong...</p>;
    }

    const parsed = await res.json();

    const { couldData, shouldData, mustData, ticketDescription } =
        parsed.feedback;
    return (
        <div>
            <h1 className="text-center font-bold text-2xl page-title">
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
