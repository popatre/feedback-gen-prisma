"use client";

import GuidanceGrid from "@/components/GuidanceGrid";
import useGetTicketById from "@/hooks/useGetTicketById";
import React from "react";

export default function Page({
    params,
}: {
    params: { ticket_num: string; block: string };
}) {
    const ticketId = params.block.toUpperCase() + params.ticket_num;

    const { isLoading, ticket } = useGetTicketById(ticketId, "test@gmail.com");

    if (isLoading) return <p>Loading...</p>;

    const mustData =
        ticket?.guidance.filter((criterion) => criterion.type === "must") || [];
    const shouldData =
        ticket?.guidance.filter((criterion) => criterion.type === "should") ||
        [];
    const couldData =
        ticket?.guidance.filter((criterion) => criterion.type === "could") ||
        [];

    return (
        ticket && (
            <div>
                <h1 className="text-center font-bold text-2xl page-title">
                    {ticket.description}
                </h1>
                <GuidanceGrid
                    mustData={mustData}
                    shouldData={shouldData}
                    couldData={couldData}
                />
            </div>
        )
    );
}
