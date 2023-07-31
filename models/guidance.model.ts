import { Guidance } from "@prisma/client";
import prisma from "../db/connection";
import { v4 as uuidv4 } from "uuid";

export const selectAllGuidance = async (): Promise<Guidance[]> => {
    const guidance = await prisma.guidance.findMany();
    return guidance;
};

export const insertGuidance = async (
    ticketId: string,
    guidanceData: { type: string; guidance: string }
) => {
    const validTypes = ["must", "should", "could"];
    const { guidance, type } = guidanceData;

    if (!validTypes.includes(type)) return null;

    try {
        const newGuidance = await prisma.guidance.create({
            data: {
                guidance_id: uuidv4(),
                ticket_id: ticketId,
                guidance: guidance,
                type: type,
            },
        });
        return newGuidance;
    } catch (error) {
        return null;
    }
};
