"use client";

import Loading from "@/components/Loading";
import NavCard from "@/components/NavCard";
import useSingleBlockQuery from "@/hooks/useSingleBlockQuery";
import React from "react";

type Ticket = { url: string; description: string };

type Props = { params: { block: string } };

export default function Page({ params }: Props) {
    const { isLoading, block, isError, error } = useSingleBlockQuery(
        params.block
    );

    if (isLoading) return <Loading />;
    if (error?.data?.httpStatus === 404)
        return (
            <p className="text-bold text-xl flex justify-center">
                {error?.data.httpStatus} - {error.message}
            </p>
        );

    return (
        block && (
            <section className="grid-flow-row nav__grid  pb-20">
                {block.tickets.map(
                    ({ ticket_id, description, block_name, ticket_number }) => {
                        return (
                            <NavCard
                                key={ticket_id}
                                description={description}
                                url={`/${block_name}/${ticket_number}`}
                            />
                        );
                    }
                )}
            </section>
        )
    );
}
