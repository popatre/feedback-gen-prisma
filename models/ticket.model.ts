import { Ticket, Block } from "@prisma/client";
import prisma from "../db/connection";

export const selectTicketById = async (ticketId: string) => {
    const ticket = await prisma.ticket.findUnique({
        where: {
            ticket_id: ticketId,
        },
        include: {
            guidance: true,
        },
    });
    return ticket;
};
