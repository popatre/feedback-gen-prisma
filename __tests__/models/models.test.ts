import * as data from "../../db/data/index";
import seed from "../../db/seeds/seed";
import client from "../../db/connection";
import { selectAllBlocks } from "../../models/block.model";

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
});
