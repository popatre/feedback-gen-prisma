import { trpc } from "@/utils/trpc";

export default function useDeleteGuidance() {
    const {
        data: isDeleted,
        isLoading,
        isSuccess,
        mutateAsync,
    } = trpc.guidance.deleteGuidance.useMutation();

    const handleDeleteGuidance = async (guidanceId: string) => {
        await mutateAsync(guidanceId);
    };

    return { isDeleted, handleDeleteGuidance, isLoading, isSuccess };
}
