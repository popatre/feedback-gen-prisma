"use client";

import Button from "@/components/Button";
import DeleteTicketForm from "@/components/DeleteTicketForm";
import EditTicketForm from "@/components/EditTicketForm";
import Loading from "@/components/Loading";
import NavCard from "@/components/NavCard";
import TicketAdder from "@/components/TicketAdder";
import useModal from "@/hooks/useModal";
import { useSingleBlockQuery } from "@/hooks/useSingleBlockQuery";
import useUserContext from "@/hooks/useUserContext";
import { Block, Ticket } from "@/types/types";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";

export type TicketRef = {
    ticketId: string;
    ticketNumber: number;
    description: string;
};
type Props = { params: { block: string } };

export default function Page({ params }: Props) {
    const {
        isLoading,
        block: blockData,
        isError,
        error,
    } = useSingleBlockQuery(params.block);

    const { modalIsOpen, closeModal, openModal, customStyles } = useModal();
    const ticketRef = useRef<TicketRef | null>(null);
    const { adminMode } = useUserContext();

    const [block, setBlock] = useState<Block | undefined>(blockData);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        setBlock(blockData);
    }, [blockData]);

    if (isLoading) return <Loading />;

    if (error?.data?.httpStatus === 404)
        return (
            <h2 className="text-bold text-xl flex justify-center">
                {error?.data.httpStatus} - {error.message}
            </h2>
        );

    const handleDeletedTicketRender = (ticketId: string) => {
        if (block && block.tickets.length) {
            setBlock((prevBlock) => {
                return {
                    block_name: prevBlock!.block_name,
                    tickets: prevBlock!.tickets.filter((ticket) => {
                        return ticket.ticket_id !== ticketId;
                    }),
                };
            });
        }
    };

    const handleEditTicketRender = (
        ticketId: string,
        ticketNumber: number,
        description: string
    ) => {
        if (block && block.tickets.length) {
            setBlock((prevBlock) => {
                return {
                    block_name: prevBlock!.block_name,
                    tickets: prevBlock!.tickets.map((ticket) => {
                        if (ticket.ticket_id === ticketId) {
                            return {
                                ...ticket,
                                ticket_id: ticketId,
                                ticket_number: ticketNumber,
                                description,
                            };
                        } else {
                            return ticket;
                        }
                    }),
                };
            });
        }
    };

    if (process.env.NODE_ENV !== "test") {
        Modal.setAppElement("#root");
    }

    return (
        block && (
            <ul className="nav__grid pb-20">
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Delete confirmation"
                    // ariaHideApp={false}
                >
                    {isDeleting && (
                        <DeleteTicketForm
                            closeModal={closeModal}
                            ticketIdRef={ticketRef}
                            handleDeletedTicketRender={
                                handleDeletedTicketRender
                            }
                        />
                    )}
                    <EditTicketForm
                        closeModal={closeModal}
                        currentTicket={ticketRef}
                        handleEditTicketRender={handleEditTicketRender}
                    />
                </Modal>
                {block.tickets.map(
                    ({ ticket_id, description, block_name, ticket_number }) => {
                        return (
                            <li
                                role="listitem"
                                className="nav__grid__item mb-10"
                                key={ticket_id}
                            >
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
                                            handleClick={() => {
                                                openModal();
                                                ticketRef.current = {
                                                    ticketId: ticket_id,
                                                    ticketNumber: ticket_number,
                                                    description: description,
                                                };
                                            }}
                                        />
                                        <Button
                                            label="Del"
                                            className="bg-rose-600 hover:bg-rose-700 text-xs text-white font-bold py-3 px-4 rounded my-1 mx-5"
                                            handleClick={() => {
                                                ticketRef.current = {
                                                    ticketId: ticket_id,
                                                    ticketNumber: ticket_number,
                                                    description: description,
                                                };
                                                setIsDeleting(true);
                                                openModal();
                                            }}
                                        />
                                    </div>
                                )}
                            </li>
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
            </ul>
        )
    );
}
