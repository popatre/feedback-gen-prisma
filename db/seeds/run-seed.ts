import client from "../connection";
import * as data from "../data/test-data/index";
import seed from "./seed";

async function runSeed() {
    try {
        await seed(data);
        await client.$disconnect();
    } catch (error) {
        console.error(error, "****");
        await client.$disconnect();
    }
}

runSeed();
