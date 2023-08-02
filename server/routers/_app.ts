import { publicProcedure, router } from "../trpc";
import { blockRouter } from "./block.router";
import { feedbackRouter } from "./feedback.router";
import { guidanceRouter } from "./guidance.router";
import { ticketRouter } from "./ticket.router";
import { userRouter } from "./user.router";

export const appRouter = router({
    block: blockRouter,
    ticket: ticketRouter,
    user: userRouter,
    feedback: feedbackRouter,
    guidance: guidanceRouter,
});

export type AppRouter = typeof appRouter;
