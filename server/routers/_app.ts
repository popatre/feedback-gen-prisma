import { publicProcedure, router } from "../trpc";
import { blockRouter } from "./block.router";
import { feedbackRouter } from "./feedback.router";
import { ticketRouter } from "./ticket.router";
import { userRouter } from "./user.router";

export const appRouter = router({
    block: blockRouter,
    ticket: ticketRouter,
    user: userRouter,
    feedback: feedbackRouter,
});

export type AppRouter = typeof appRouter;
