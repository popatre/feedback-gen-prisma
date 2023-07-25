import { trpc } from "@/utils/trpc";

export default function useUpdateFeedback() {
    const {
        data: feedback,
        isLoading,
        isSuccess,
        mutateAsync,
        isError,
    } = trpc.feedback.processFeedback.useMutation();

    const handleFeedbackUpdate = async (
        email: string,
        www: string,
        ebi: string,
        guidanceId: string,
        feedbackId: number | null
    ) => {
        await mutateAsync({
            feedbackId,
            feedback: { www, ebi },
            email,
            guidanceId,
        });
    };

    return { feedback, handleFeedbackUpdate, isLoading, isSuccess, isError };
}
