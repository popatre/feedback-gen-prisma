import handleUser from "../../db/utils/handleUser";
import * as data from "../../db/data/index";
import seed from "../../db/seeds/seed";
import checkIfExists from "../../db/utils/checkIfExists";

beforeEach(() => seed(data));

describe("handleUser", () => {
    test("should add newUser and blank feedback", async () => {
        const email = "jonathan.mcguire@northcoders.com";
        await handleUser(email);
        const isUserAdded = await checkIfExists("User", "email", email);
        expect(isUserAdded).toBe(true);
    });
});
