import { insertTicket, selectTicketByIdWithEmail } from "@/models/ticket.model";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const ticketRouter = router({
    getTicketById: publicProcedure
        .input(z.object({ id: z.string(), email: z.string() }))
        .query(({ input }) => selectTicketByIdWithEmail(input.id, input.email)),
    postTicketByBlockName: publicProcedure
        .input(
            z.object({
                blockName: z.string(),
                ticketNumber: z.number(),
                description: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const newTicket = await insertTicket(
                input.blockName,
                input.ticketNumber,
                input.description
            );
            return newTicket;
        }),
});

export type TicketRouter = typeof ticketRouter;
