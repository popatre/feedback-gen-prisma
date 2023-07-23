import checkIfExists from "../../db/utils/checkIfExists";
import * as data from "../../db/data/index";
import seed from "../../db/seeds/seed";

beforeEach(() => seed(data));

describe("checkIfExists", () => {
    test("should return true when value exists", async () => {
        const isExisting = await checkIfExists(
            "User",
            "email",
            "test@gmail.com"
        );
        expect(isExisting).toBe(true);
    });
    test("should return false when value not found", async () => {
        const isExisting = await checkIfExists(
            "User",
            "email",
            "notAUser@gmail.com"
        );
        expect(isExisting).toBe(false);
    });
});
