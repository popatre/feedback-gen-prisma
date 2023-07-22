import { publicProcedure, router } from "../trpc";
import { blockRouter } from "./block.router";

export const appRouter = router({
    block: blockRouter,
});

export type AppRouter = typeof appRouter;
