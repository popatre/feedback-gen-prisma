import useFormState from "@/hooks/useForm";
import useUpdateTicket from "@/hooks/useUpdateTicket";
import ModalFormWrapper from "@/wrappers/ModalFormWrapper";

import { MutableRefObject, useEffect } from "react";

type Props = {
    closeModal: () => void;
    currentTicket: MutableRefObject<{
        ticketId: string;
        ticketNumber: number;
        description: string;
    } | null>;
    // handleEditTicketRender: (guidance: string, guidance_id: string) => void;
};

export default function EditTicketForm({
    closeModal,
    currentTicket,
}: //handleEditTicketRender
Props) {
    const { ticket, updateTicket, isLoading, isSuccess, isError } =
        useUpdateTicket();

    const { formState, handleChange, resetForm } = useFormState({
        ticketNumber: currentTicket.current?.ticketNumber || "",
        description: currentTicket.current?.description || "",
    });

    useEffect(() => {
        if (ticket && currentTicket.current) {
            // handleEditGuidance(guidance.guidance, currentGuidance.current.id);
            closeModal();
            resetForm();
        }
    }, [ticket]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (currentTicket.current?.ticketId) {
            await updateTicket(
                +formState.ticketNumber,
                currentTicket.current.ticketId,
                formState.description
            );
        }
    };
    if (isError) return <p>Something went wrong</p>;
    return (
        <ModalFormWrapper
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            closeModal={closeModal}
            title="Edit Guidance"
            confirmButtonLabel="Add Ticket"
        >
            <div className="flex flex-col">
                <label className="font-semibold" htmlFor="ticketNumber">
                    Ticket Number
                </label>
                <input
                    name="ticketNumber"
                    type="number"
                    required
                    onChange={handleChange}
                    value={formState.ticketNumber}
                    className="mb-5 border-2"
                ></input>
                <label className="font-semibold" htmlFor="guidance">
                    Ticket Description
                </label>
                <textarea
                    name="description"
                    className="mb-5 border-2"
                    onChange={handleChange}
                    value={formState.description}
                    rows={4}
                    required
                ></textarea>
            </div>
        </ModalFormWrapper>
    );
}
