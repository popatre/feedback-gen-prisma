"use client";

import Button from "@/components/Button";
import Loading from "@/components/Loading";
import NavCard from "@/components/NavCard";
import TicketAdder from "@/components/TicketAdder";
import useDeleteTicket from "@/hooks/useDeleteTicket";
import useSingleBlockQuery from "@/hooks/useSingleBlockQuery";
import useUserContext from "@/hooks/useUserContext";
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
    const {
        deleteTicket,
        isLoading: isDeleteLoading,
        isError: isDeleteError,
    } = useDeleteTicket();

    const [block, setBlock] = useState<
        | {
              tickets: Ticket[];
              block_name: string;
          }
        | undefined
    >(blockData);

    const { adminMode } = useUserContext();

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
            <section className="nav__grid pb-20">
                {block.tickets.map(
                    ({ ticket_id, description, block_name, ticket_number }) => {
                        return (
                            <section className="nav__grid__item mb-10">
                                <NavCard
                                    key={ticket_id}
                                    description={description}
                                    url={`/${block_name}/${ticket_id}`}
                                />
                                {adminMode && (
                                    <div className="flex justify-between">
                                        <Button
                                            label="edit"
                                            className="bg-green-600 hover:bg-green-700 text-xs text-white font-bold py-3 px-4 rounded my-1"
                                            handleClick={() => {}}
                                        />
                                        <Button
                                            label="Del"
                                            className="bg-rose-600 hover:bg-rose-700 text-xs text-white font-bold py-3 px-4 rounded my-1 mx-5"
                                            handleClick={() =>
                                                deleteTicket(ticket_id)
                                            }
                                        />
                                    </div>
                                )}
                            </section>
                        );
                    }
                )}

                {adminMode && (
                    <TicketAdder
                        text="Add New Ticket +"
                        block={params.block}
                        setBlock={setBlock}
                    />
                )}
            </section>
        )
    );
}
