"use client";

import NavCard from "@/components/NavCard";
import useSingleBlockQuery from "@/hooks/useSingleBlockQuery";
import React from "react";

type Ticket = { url: string; description: string };
type Tickets = Ticket[];

type Props = { params: { block: string } };

export default function Page({ params }: Props) {
    const { isLoading, block } = useSingleBlockQuery(params.block);

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
