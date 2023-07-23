import { trpc } from "@/utils/trpc";

export default function useBlocksQuery() {
    const { data: blocks, isLoading } = trpc.block.getAllBlocks.useQuery();
    return { blocks, isLoading };
}
