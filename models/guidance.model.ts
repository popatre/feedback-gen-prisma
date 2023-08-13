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

    if (!validTypes.includes(type.toLowerCase()))
        return Promise.reject({ status: 400, msg: "Bad type" });

    try {
        const newGuidance = await prisma.guidance.create({
            data: {
                guidance_id: uuidv4(),
                ticket_id: ticketId,
                guidance: guidance,
                type: type.toLowerCase(),
            },
            include: {
                feedback: true,
            },
        });
        return newGuidance;
    } catch (error) {
        return null;
    }
};

export const updateGuidance = async (
    guidanceId: string,
    guidanceUpdate: { guidance: string }
) => {
    try {
        const updatedGuidance = await prisma.guidance.update({
            where: {
                guidance_id: guidanceId,
            },
            data: {
                ...guidanceUpdate,
            },
        });
        return updatedGuidance;
    } catch (error: any) {
        if (error.meta) {
            const prismaCodes: { [key: string]: number } = {
                P2025: 404,
            } as const;
            const code: string = error.code;
            return Promise.reject({
                status: prismaCodes[code],
                msg: error.meta.cause,
            });
        } else {
            return Promise.reject({ status: 400, msg: "bad request" });
        }
    }
};

export const deleteGuidance = async (guidanceId: string) => {
    try {
        await prisma.guidance.delete({
            where: {
                guidance_id: guidanceId,
            },
        });
        return true;
    } catch (error) {
        return null;
    }
};
