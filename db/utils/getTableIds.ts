import prisma from "../../db/connection";
import { PrismaClient } from "@prisma/client";

type PrismaTableNames = "Block" | "Feedback" | "Ticket" | "User" | "Guidance";

export default async function createRefObj(
    tableName: PrismaTableNames,
    id: string
): Promise<[]> {
    try {
        const ids = (await prisma.$queryRawUnsafe(
            `SELECT ${id} FROM "${tableName}"`
        )) as [];
        return ids;
    } catch (error) {
        return [];
    }
}
