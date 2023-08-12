import { trpc } from "@/utils/trpc";

export default function useUpdateGuidance() {
    const {
        data: guidance,
        isLoading,
        isSuccess,
        mutateAsync,
        isError,
    } = trpc.guidance.patchGuidance.useMutation();

    const handleGuidanceUpdate = async (
        guidance: string,
        guidanceId: string
    ) => {
        await mutateAsync({
            guidanceId,
            guidanceData: { guidance },
        });
    };

    return { guidance, handleGuidanceUpdate, isLoading, isSuccess, isError };
}
