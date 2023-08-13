import useFormState from "@/hooks/useForm";
import useUpdateGuidance from "@/hooks/useUpdateGuidance";
import ModalFormWrapper from "@/wrappers/ModalFormWrapper";

import { MutableRefObject, useEffect } from "react";

type Props = {
    closeModal: () => void;
    currentGuidance: MutableRefObject<{ guidance: string; id: string } | null>;
    handleEditGuidance: (guidance: string, guidance_id: string) => void;
};

export default function EditGuidanceForm({
    closeModal,
    currentGuidance,
    handleEditGuidance,
}: Props) {
    const { guidance, handleGuidanceUpdate, isLoading, isSuccess, isError } =
        useUpdateGuidance();

    const { formState, handleChange, resetForm } = useFormState({
        guidance: currentGuidance.current?.guidance || "",
    });

    useEffect(() => {
        if (guidance && currentGuidance.current) {
            handleEditGuidance(guidance.guidance, currentGuidance.current.id);
            closeModal();
            resetForm();
        }
    }, [guidance]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentGuidance.current?.id) {
            await handleGuidanceUpdate(
                formState.guidance,
                currentGuidance.current.id
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
                <label className="font-semibold" htmlFor="guidance">
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
