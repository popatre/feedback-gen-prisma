import { selectAllBlocks } from "@/models/block.model";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const blockRouter = router({
    getAllBlocks: publicProcedure.query(() => selectAllBlocks()),
});

export type BlockRouter = typeof blockRouter;
