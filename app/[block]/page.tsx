"use client";

import Loading from "@/components/Loading";
import NavCard from "@/components/NavCard";
import TicketAdder from "@/components/TicketAdder";
import useSingleBlockQuery from "@/hooks/useSingleBlockQuery";
import { Ticket } from "@/types/types";
import React, { useEffect, useState } from "react";

type Props = { params: { block: string } };

export default function Page({ params }: Props) {
    const {
        isLoading,
        block: blockData,
        isError,
        error,
    } = useSingleBlockQuery(params.block);
    const [block, setBlock] = useState<
        | {
              tickets: Ticket[];
              block_name: string;
          }
        | undefined
    >(blockData);

    useEffect(() => {
        setBlock(blockData);
    }, [blockData]);

    if (isLoading) return <Loading />;

    if (error?.data?.httpStatus === 404)
        return (
            <p className="text-bold text-xl flex justify-center">
                {error?.data.httpStatus} - {error.message}
            </p>
        );

    return (
        block && (
            <section className="grid-flow-row nav__grid pb-20">
                {block.tickets.map(
                    ({ ticket_id, description, block_name, ticket_number }) => {
                        return (
                            <NavCard
                                key={ticket_id}
                                description={description}
                                url={`/${block_name}/${ticket_id}`}
                            />
                        );
                    }
                )}

                <TicketAdder
                    text="Add New Ticket +"
                    block={params.block}
                    setBlock={setBlock}
                />
            </section>
        )
    );
}
