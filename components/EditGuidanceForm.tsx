import useFormState from "@/hooks/useForm";
import usePostGuidance from "@/hooks/usePostGuidance";
import useUpdateGuidance from "@/hooks/useUpdateGuidance";
import { Guidance } from "@/types/types";
import ModalFormWrapper from "@/wrappers/ModalFormWrapper";

import { MutableRefObject, useEffect } from "react";

type Props = {
    closeModal: () => void;
    currentGuidance: MutableRefObject<{ guidance: string; id: string } | null>;
    handleNewGuidance: (guidance: Guidance) => void;
};

export default function EditGuidanceForm({
    closeModal,
    currentGuidance,
    handleNewGuidance,
}: Props) {
    const { guidance, handleGuidanceUpdate, isLoading, isSuccess } =
        useUpdateGuidance();

    const { formState, handleChange, resetForm } = useFormState({
        guidance: currentGuidance.current?.guidance || "",
    });

    useEffect(() => {
        if (guidance) {
            // handleNewGuidance(guidance);
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

    return (
        <ModalFormWrapper
            handleSubmit={handleSubmit}
            isLoading={false}
            closeModal={closeModal}
            title="Edit Guidance"
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
