import {
    BlockSingleTicketType,
    BlockTicketsType,
    SingleBlockType,
} from "@/server/routers/types/block.types";

// export const createSingleBlockData = (): SingleBlockType => {
//     return {
//         tickets: {
//             ticket_id: "1",
//             ticket_number: 2,
//             block_name: "be",
//             description: "desc",
//         },
//     };
// };

export const createTicketData = (
    blockName: string,
    override?: Partial<BlockSingleTicketType>
): BlockSingleTicketType => {
    return {
        ticket_id: "1",
        ticket_number: 1,
        block_name: blockName,
        description: "desc",
        ...override,
    };
};

export const createBlockTicketsData = (blockName: string): BlockTicketsType => {
    return [
        createTicketData(blockName),
        createTicketData(blockName, {
            ticket_id: "2",
            ticket_number: 2,
        }),
        createTicketData(blockName, {
            ticket_id: "3",
            ticket_number: 3,
        }),
    ];
};
