import { selectAllBlocks, selectSingleBlock } from "@/models/block.model";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const blockRouter = router({
    getAllBlocks: publicProcedure.query(() => selectAllBlocks()),
    getBlockById: publicProcedure
        .input(z.string())
        .query(({ input }) => selectSingleBlock(input)),
});

export type BlockRouter = typeof blockRouter;
