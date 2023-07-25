import handleUser from "../../db/utils/handleUser";
import * as data from "../../db/data/test-data/index";
import seed from "../../db/seeds/seed";
import checkIfExists from "../../db/utils/checkIfExists";

beforeEach(() => seed(data));

describe("handleUser", () => {
    test("should add new User", async () => {
        const email = "newuser@northcoders.com";
        const newUser = await handleUser(email);
        expect(newUser).toMatchObject({ email: "newuser@northcoders.com" });
        const isUserAdded = await checkIfExists("User", "email", email);
        expect(isUserAdded).toBe(true);
    });
    test("should return true is user already exists", async () => {
        const email = "test@gmail.com";
        const isExists = await handleUser(email);
        expect(isExists).toBe(true);
    });
});
