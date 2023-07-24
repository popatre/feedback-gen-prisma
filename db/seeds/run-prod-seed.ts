import client from "../connection";
import * as data from "../data/prod-data/index";
import seed from "./prod-seed";

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
