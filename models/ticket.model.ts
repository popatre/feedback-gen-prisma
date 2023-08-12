import prisma from "../db/connection";
import { v4 as uuidv4 } from "uuid";

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

export const insertTicket = async (
    blockName: string,
    ticketNumber: number,
    description: string
) => {
    const newTicket = await prisma.ticket.create({
        data: {
            ticket_id: uuidv4(),
            block_name: blockName,
            ticket_number: ticketNumber,
            description: description,
        },
    });
    return newTicket;
};

export const updateTicket = () => {};
export const deleteTicket = () => {};
