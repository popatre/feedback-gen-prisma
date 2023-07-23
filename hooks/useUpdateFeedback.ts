import { trpc } from "@/utils/trpc";

export default function useUpdateFeedback() {
    const {
        data: feedback,
        isLoading,
        isSuccess,
        mutateAsync,
    } = trpc.feedback.patchFeedback.useMutation();

    const handleFeedbackUpdate = async (
        id: number,
        www: string,
        ebi: string
    ) => {
        await mutateAsync({ id, update: { www, ebi } });
    };

    return { feedback, handleFeedbackUpdate, isLoading, isSuccess };
}
