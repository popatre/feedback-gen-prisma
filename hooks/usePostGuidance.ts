import { GuidanceType } from "@/types/types";
import { trpc } from "@/utils/trpc";

export default function usePostGuidance() {
    const {
        data: guidance,
        isLoading,
        isSuccess,
        mutateAsync,
    } = trpc.guidance.postGuidance.useMutation();

    const handleGuidancePost = async (
        ticketId: string,
        type: GuidanceType,
        guidance: string
    ) => {
        await mutateAsync({ ticketId, guidanceData: { type, guidance } });
    };

    return { guidance, handleGuidancePost, isLoading, isSuccess };
}
