"use client";

import Button from "@/components/Button";
import DeleteTicketForm from "@/components/DeleteTicketForm";
import Loading from "@/components/Loading";
import NavCard from "@/components/NavCard";
import TicketAdder from "@/components/TicketAdder";
import useModal from "@/hooks/useModal";
import useSingleBlockQuery from "@/hooks/useSingleBlockQuery";
import useUserContext from "@/hooks/useUserContext";
import { Block, Ticket } from "@/types/types";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";

type Props = { params: { block: string } };

export default function Page({ params }: Props) {
    const {
        isLoading,
        block: blockData,
        isError,
        error,
    } = useSingleBlockQuery(params.block);

    const { modalIsOpen, closeModal, openModal, customStyles } = useModal();
    const ticketIdRef = useRef<string | null>(null);
    const { adminMode } = useUserContext();

    const [block, setBlock] = useState<Block | undefined>(blockData);

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

    const handleDeletedTicketRender = (ticketId: string) => {
        if (block && block.tickets.length) {
            setBlock((prevBlock) => {
                const filteredTickets = prevBlock!.tickets.filter((ticket) => {
                    return ticket.ticket_id !== ticketId;
                });
                return {
                    block_name: prevBlock!.block_name,
                    tickets: [...filteredTickets],
                };
            });
        }
    };

    return (
        block && (
            <section className="nav__grid pb-20">
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Delete confirmation"
                    ariaHideApp={false}
                >
                    <DeleteTicketForm
                        closeModal={closeModal}
                        ticketIdRef={ticketIdRef}
                        handleDeletedTicketRender={handleDeletedTicketRender}
                    />
                </Modal>
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
                                            handleClick={() => {
                                                ticketIdRef.current = ticket_id;
                                                openModal();
                                            }}
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
