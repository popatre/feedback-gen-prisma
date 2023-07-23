import { trpc } from "@/utils/trpc";

export default function useSingleBlockQuery(blockId: string) {
    const { data: block, isLoading } =
        trpc.block.getBlockById.useQuery(blockId);
    return { block, isLoading };
}
