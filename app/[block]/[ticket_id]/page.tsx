"use client";

import GuidanceGrid from "@/components/GuidanceGrid";
import useGetTicketById from "@/hooks/useGetTicketById";
import React, { useContext } from "react";
import { UserContext } from "@/lib/context";
import Loading from "@/components/Loading";

export default function Page({
    params,
}: {
    params: { ticket_id: string; block: string };
}) {
    const { email } = useContext(UserContext) ?? { email: "" };

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
