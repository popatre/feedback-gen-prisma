import { trpc } from "@/utils/trpc";

export function useSingleBlockQuery(blockId: string) {
    const {
        data: block,
        isLoading,
        isError,
        error,
    } = trpc.block.getBlockById.useQuery(blockId);
    return { block, isLoading, isError, error };
}
