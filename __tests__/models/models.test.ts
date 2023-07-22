import * as data from "../../db/data/index";
import seed from "../../db/seeds/seed";
import client from "../../db/connection";
import { selectAllBlocks, selectSingleBlock } from "../../models/block.model";

beforeEach(() => seed(data));
afterAll(() => client.$disconnect());

describe("blocks", () => {
    test("should get all blocks", async () => {
        const blocks = await selectAllBlocks();
        expect(blocks).toBeInstanceOf(Array);
        blocks.forEach((block) => {
            expect(block).toMatchObject({
                block_name: expect.any(String),
            });
        });
    });
    test("should fetch single block data", async () => {
        const block = await selectSingleBlock("fe");
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
    test("should return null for non-existing block", async () => {
        const nonExistingBlock = await selectSingleBlock(
            "non_existing_block_id"
        );
        expect(nonExistingBlock).toBeNull();
    });
});
