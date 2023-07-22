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
                block_id: expect.any(Number),
                block_name: expect.any(String),
            });
        });
    });
    test("should single block data", async () => {
        const block = await selectSingleBlock("fe");
        expect(block).toBeInstanceOf(Object);
        expect(block).toMatchObject({
            block_id: expect.any(Number),
            block_name: expect.any(String),
            tickets: expect.any(Array),
        });
        if (block) {
            expect(block.tickets).toHaveLength(3);
            block.tickets.forEach((ticket) => {
                expect(ticket).toMatchObject({
                    ticket_id: expect.any(String),
                    ticket_number: expect.any(Number),
                    block_id: expect.any(Number),
                    description: expect.any(String),
                });
            });
        }
    });
});
