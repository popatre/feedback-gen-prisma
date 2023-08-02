import useFormState from "@/hooks/useForm";
import usePostGuidance from "@/hooks/usePostGuidance";
import usePostTicket from "@/hooks/usePostTicket";
import { Ticket } from "@/types/types";
import { useParams } from "next/navigation";
import { useEffect } from "react";

type Props = {
    closeModal: () => void;
    guidanceType: string;
};

export default function GuidanceForm({ closeModal, guidanceType }: Props) {
    const { ticket_id } = useParams();

    const { guidance, handleGuidancePost, isLoading, isSuccess } =
        usePostGuidance();

    const { formState, handleChange, resetForm } = useFormState({
        type: guidanceType,
        guidance: "",
    });

    useEffect(() => {
        if (guidance) {
            // handleNewTicket(guidance);
            closeModal();
            resetForm();
        }
    }, [guidance]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleGuidancePost(ticket_id, guidanceType, formState.guidance);
    };

    return (
        <form className="my-10 mx-10 w-[400px]" onSubmit={handleSubmit}>
            <h2 className="font-bold mb-10 text-lg">Create New Guidance</h2>
            <div className="flex flex-col">
                <label className="font-semibold" htmlFor="type">
                    Guidance Type
                </label>
                <input
                    name="type"
                    type="text"
                    disabled={true}
                    value={formState.type}
                    className="mb-5 border-2"
                ></input>
            </div>
            <div className="flex flex-col">
                <label className="font-semibold" htmlFor="description">
                    Guidance
                </label>
                <textarea
                    name="guidance"
                    className="mb-5 border-2"
                    onChange={handleChange}
                    value={formState.guidance}
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
