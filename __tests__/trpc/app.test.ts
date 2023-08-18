import { appRouter } from "../../server/routers/_app";
//const caller = appRouter.createCaller({});

describe("blocks", () => {
    test("should get all blocks", async () => {
        const caller = appRouter.createCaller({});
        const blocks = await caller.block.getAllBlocks();
        expect(blocks).toBeInstanceOf(Array);
        expect(blocks).toHaveLength(2);
        blocks.forEach((block) => {
            expect(block).toMatchObject({
                block_name: expect.any(String),
            });
        });
    });
    test("should fetch single block data", async () => {
        const caller = appRouter.createCaller({});
        const block = await caller.block.getBlockById("fe");
        expect(block).toBeInstanceOf(Object);
        expect(block).toMatchObject({
            block_name: expect.any(String),
            tickets: expect.any(Array),
        });
        if (block) {
            expect(block.tickets).toHaveLength(3);
            block.tickets.forEach((ticket) => {
                expect(ticket).toMatchObject({
                    ticket_id: expect.any(String),
                    ticket_number: expect.any(Number),
                    block_name: "fe",
                    description: expect.any(String),
                });
            });
        }
    });
    xtest("should return null for non-existing block", async () => {
        const caller = appRouter.createCaller({});
        const nonExistingBlock = await caller.block.getBlockById(
            "non_existing_block_id"
        );

        expect(nonExistingBlock).toBeNull();
    });
});
