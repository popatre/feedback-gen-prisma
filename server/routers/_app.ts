import { publicProcedure, router } from "../trpc";
import { blockRouter } from "./block.router";
import { ticketRouter } from "./ticket.router";

export const appRouter = router({
    block: blockRouter,
    ticket: ticketRouter,
});

export type AppRouter = typeof appRouter;
