import { TicketRef } from "@/app/[block]/page";
import useDeleteTicket from "@/hooks/useDeleteTicket";
import ModalFormWrapper from "@/wrappers/ModalFormWrapper";
import React, {
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useEffect,
} from "react";

type Props = {
    closeModal: () => void;
    ticketIdRef: MutableRefObject<TicketRef | null>;
    handleDeletedTicketRender: (ticketId: string) => void;
    setIsDeleting: Dispatch<SetStateAction<boolean>>;
};

export default function DeleteTicketForm({
    closeModal,
    ticketIdRef,
    handleDeletedTicketRender,
    setIsDeleting,
}: Props) {
    const { isDeleted, deleteTicket, isLoading, isError } = useDeleteTicket();

    useEffect(() => {
        if (isDeleted && ticketIdRef.current) {
            handleDeletedTicketRender(ticketIdRef.current.ticketId);
            closeModal();
            setIsDeleting(false);
        }
    }, [isDeleted]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (ticketIdRef.current) {
            deleteTicket(ticketIdRef.current.ticketId);
        }
    };

    const closeModalAndResetState = () => {
        closeModal();
        setIsDeleting(false);
    };

    if (isError) return <p>Something Went Wrong</p>;
    return (
        <ModalFormWrapper
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            closeModal={closeModalAndResetState}
            title="Are you sure you want to delete this ticket?"
            confirmButtonLabel="Confirm"
        >
            <p></p>
        </ModalFormWrapper>
    );
}
