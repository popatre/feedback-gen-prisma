import { selectAllBlocks, selectSingleBlock } from "@/models/block.model";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const blockRouter = router({
    getAllBlocks: publicProcedure.query(() => selectAllBlocks()),
    getBlockById: publicProcedure.input(z.string()).query(async ({ input }) => {
        const block = await selectSingleBlock(input);
        if (!block) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Block not found",
            });
        } else {
            return block;
        }
    }),
});

export type BlockRouter = typeof blockRouter;
