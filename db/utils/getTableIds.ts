import prisma from "../../db/connection";
import { PrismaClient } from "@prisma/client";

type PrismaTableNames = "Block" | "Feedback" | "Ticket" | "User" | "Guidance";

type QueryResult<T> = { [key: string]: T };

export default async function getTableIds(
    tableName: PrismaTableNames,
    id: string
): Promise<string[]> {
    try {
        const ids = (await prisma.$queryRawUnsafe(
            `SELECT ${id} FROM "${tableName}"`
        )) as QueryResult<string>[];

        const map = ids.map((element) => element[id]);

        return map;
    } catch (error) {
        return [];
    }
}
