"use client";

import GuidanceGrid from "@/components/GuidanceGrid";
import useGetTicketById from "@/hooks/useGetTicketById";
import React from "react";
import Loading from "@/components/Loading";
import useUserContext from "@/hooks/useUserContext";

export default function TicketPage({
    params,
}: {
    params: { ticket_id: string };
}) {
    const { email } = useUserContext();
    const { isLoading, ticket } = useGetTicketById(params.ticket_id, email);
    if (!email) return <p>Must be logged in</p>;

    if (isLoading) return <Loading />;
    if (ticket == null)
        return (
            <p className="text-bold text-xl flex justify-center">
                Something went wrong :(
            </p>
        );

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
