import prisma from "../connection";

export default async function checkIfExists(
    table: string,
    column: string,
    value: string
) {
    const results: [] = await prisma.$queryRawUnsafe(
        `SELECT * FROM "${table}" WHERE ${column} = '${value}'`
    );

    return results.length > 0;
}
