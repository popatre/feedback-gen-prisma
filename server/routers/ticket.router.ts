import { selectTicketByIdWithEmail } from "@/models/ticket.model";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const ticketRouter = router({
    getTicketById: publicProcedure
        .input(z.object({ id: z.string(), email: z.string() }))
        .query(({ input }) => selectTicketByIdWithEmail(input.id, input.email)),
});

export type TicketRouter = typeof ticketRouter;
