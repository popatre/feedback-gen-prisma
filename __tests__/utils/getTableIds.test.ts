import getTableIds from "../../db/utils/getTableIds";
import * as data from "../../db/data/test-data/index";
import seed from "../../db/seeds/seed";

beforeEach(() => seed(data));

describe("getTableIds", () => {
    test("should return ids for selected table", async () => {
        const tableIds = await getTableIds("Ticket", "ticket_id");
        expect(tableIds).toBeInstanceOf(Array);
        expect(tableIds).toHaveLength(5);
    });
    test("should handle non valid columns", async () => {
        const tableIds = await getTableIds("Ticket", "not_column");
        expect(tableIds).toBeInstanceOf(Array);
        expect(tableIds).toHaveLength(0);
    });
});
