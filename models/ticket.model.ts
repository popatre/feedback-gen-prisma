import { Ticket, Block } from "@prisma/client";
import prisma from "../db/connection";

export const selectTicketByIdWithEmail = async (
    ticketId: string,
    userEmail: string
) => {
    const ticket = await prisma.ticket.findUnique({
        where: {
            ticket_id: ticketId,
        },
        include: {
            guidance: {
                include: {
                    feedback: {
                        where: {
                            user_email: userEmail,
                        },
                    },
                },
            },
        },
    });

    return ticket;
};
