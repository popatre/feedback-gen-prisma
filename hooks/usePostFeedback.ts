import { trpc } from "@/utils/trpc";

export default function usePostFeedback() {
    const {
        data: feedback,
        isLoading,
        isSuccess,
        mutateAsync,
    } = trpc.feedback.postFeedback.useMutation();

    const handleFeedbackPost = async (
        guidanceId: string,
        email: string,
        www: string,
        ebi: string
    ) => {
        await mutateAsync({ guidanceId, email, feedback: { www, ebi } });
    };

    return { feedback, handleFeedbackPost, isLoading, isSuccess };
}
