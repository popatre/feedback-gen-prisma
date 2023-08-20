import { TRPCError } from "@trpc/server";
import {
    deleteTicket,
    insertTicket,
    selectTicketByIdWithEmail,
    updateTicket,
} from "../../models/ticket.model";
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
    patchTicket: publicProcedure
        .input(
            z.object({
                ticketId: z.string(),
                ticketNumber: z.number(),
                description: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const response = await updateTicket(input.ticketId, {
                ticket_number: input.ticketNumber,
                description: input.description,
            });
            if (!response) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "ticket not found",
                });
            } else {
                return response;
            }
        }),
    deleteTicket: publicProcedure
        .input(z.string())
        .mutation(async ({ input }) => {
            const isDeleted = await deleteTicket(input);

            if (!isDeleted) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "ticket not found",
                });
            }
            return isDeleted;
        }),
});

export type TicketRouter = typeof ticketRouter;
