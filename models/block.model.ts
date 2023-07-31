import { Block } from "@prisma/client";
import prisma from "../db/connection";

export const selectAllBlocks = async (): Promise<Block[]> => {
    const blocks = await prisma.block.findMany();
    return blocks;
};

export const selectSingleBlock = async (blockName: string) => {
    const block = await prisma.block.findUnique({
        where: {
            block_name: blockName,
        },
        include: {
            tickets: {
                orderBy: {
                    ticket_number: "asc",
                },
            },
        },
    });

    return block;
};
