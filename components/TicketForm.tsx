import useFormState from "@/hooks/useForm";
import usePostTicket from "@/hooks/usePostTicket";
import { Ticket } from "@/types/types";
import { useEffect } from "react";

type Props = {
    closeModal: () => void;
    block: string;
    handleNewTicket: (ticket: Ticket) => void;
};

export default function TicketForm({
    closeModal,
    block,
    handleNewTicket,
}: Props) {
    const { ticket, isLoading, handleTicketPost } = usePostTicket(block);
    const { formState, handleChange, resetForm } = useFormState({
        ticketNumber: 0,
        description: "",
    });

    useEffect(() => {
        if (ticket) {
            handleNewTicket(ticket);
            closeModal();
            resetForm();
        }
    }, [ticket]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleTicketPost(+formState.ticketNumber, formState.description);
    };

    return (
        <form className="my-10 mx-10 w-[400px]" onSubmit={handleSubmit}>
            <h2 className="font-bold mb-10 text-lg">Create New Ticket</h2>
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
            </div>
            <div className="flex flex-col">
                <label className="font-semibold" htmlFor="description">
                    Description
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
            <div className="form-btns flex justify-around">
                <button
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 text-xs text-white font-bold py-3 px-4 rounded my-1"
                >
                    {isLoading ? `Working on it...` : `Add Ticket`}
                </button>
                {!isLoading && (
                    <button
                        className="bg-rose-600 hover:bg-rose-700 text-xs text-white font-bold py-3 px-4 rounded my-1 mx-5"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
