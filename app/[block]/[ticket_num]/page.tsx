"use client";

import GuidanceGrid from "@/components/GuidanceGrid";
import useGetTicketById from "@/hooks/useGetTicketById";
import React, { useContext } from "react";
import { UserContext } from "@/lib/context";

export default function Page({
    params,
}: {
    params: { ticket_num: string; block: string };
}) {
    const { email } = useContext(UserContext) ?? { email: "" };
    if (!email) return <p>Must be logged in</p>;

    const ticketId = params.block.toUpperCase() + params.ticket_num;
    const { isLoading, ticket } = useGetTicketById(ticketId, email);

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
