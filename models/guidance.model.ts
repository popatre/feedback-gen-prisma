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

    if (!validTypes.includes(type))
        return Promise.reject({
            status: 400,
            msg: "Bad type",
        });

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
        if (error instanceof Error) {
            if ("code" in error && error.code === "P2003") {
                return Promise.reject({ status: 404, msg: "ID not found" });
            } else {
                return Promise.reject({ status: 400, msg: "Bad Post request" });
            }
        }
    }
};
