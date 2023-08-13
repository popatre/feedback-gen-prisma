import { trpc } from "@/utils/trpc";

export default function useDeleteGuidance() {
    const {
        data: isDeleted,
        isLoading,
        isSuccess,
        isError,
        mutateAsync,
    } = trpc.guidance.deleteGuidance.useMutation();

    const handleDeleteGuidance = async (guidanceId: string) => {
        const isDeleted = await mutateAsync(guidanceId);
        return isDeleted;
    };

    return { isDeleted, handleDeleteGuidance, isLoading, isSuccess, isError };
}
