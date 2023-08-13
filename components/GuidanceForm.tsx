import useFormState from "@/hooks/useForm";
import usePostGuidance from "@/hooks/usePostGuidance";
import { Guidance } from "@/types/types";
import ModalFormWrapper from "@/wrappers/ModalFormWrapper";

import { useParams } from "next/navigation";
import { useEffect } from "react";

type Props = {
    closeModal: () => void;
    guidanceType: string;
    handleNewGuidance: (guidance: Guidance) => void;
};

export default function GuidanceForm({
    closeModal,
    guidanceType,
    handleNewGuidance,
}: Props) {
    const { ticket_id } = useParams();

    const { guidance, handleGuidancePost, isLoading, isSuccess } =
        usePostGuidance();

    const { formState, handleChange, resetForm } = useFormState({
        type: guidanceType,
        guidance: "",
    });

    useEffect(() => {
        if (guidance) {
            handleNewGuidance(guidance);
            closeModal();
            resetForm();
        }
    }, [guidance]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleGuidancePost(ticket_id, guidanceType, formState.guidance);
    };

    return (
        <ModalFormWrapper
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            closeModal={closeModal}
            title="Add New Guidance"
            confirmButtonLabel="Add Ticket"
        >
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
        </ModalFormWrapper>
    );
}
