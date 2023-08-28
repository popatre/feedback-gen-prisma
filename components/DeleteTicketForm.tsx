import useDeleteTicket from "@/hooks/useDeleteTicket";
import ModalFormWrapper from "@/wrappers/ModalFormWrapper";
import React, { MutableRefObject, useEffect } from "react";

type Props = {
    closeModal: () => void;
    ticketIdRef: MutableRefObject<string | null>;
    handleDeletedTicketRender: (ticketId: string) => void;
};

export default function DeleteTicketForm({
    closeModal,
    ticketIdRef,
    handleDeletedTicketRender,
}: Props) {
    const { isDeleted, deleteTicket, isLoading, isError } = useDeleteTicket();

    useEffect(() => {
        if (isDeleted && ticketIdRef.current) {
            handleDeletedTicketRender(ticketIdRef.current);
            closeModal();
        }
    }, [isDeleted]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (ticketIdRef.current) {
            deleteTicket(ticketIdRef.current);
        }
    };
    if (isError) return <p>Something Went Wrong</p>;
    return (
        <ModalFormWrapper
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            closeModal={closeModal}
            title="Are you sure you want to delete this ticket?"
            confirmButtonLabel="Confirm"
        >
            <p></p>
        </ModalFormWrapper>
    );
}
