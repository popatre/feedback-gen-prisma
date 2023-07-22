import prisma from "../db/connection";

export const selectAllBlocks = async () => {
    const blocks = await prisma.block.findMany();
    return blocks;
};
