import { Guidance } from "@prisma/client";
import prisma from "../db/connection";

export const selectAllGuidance = async () => {
    const guidance = await prisma.guidance.findMany();
    return guidance;
};
