import { postUser } from "../../models/user.model";
import checkIfExists from "./checkIfExists";

export default async function handleUser(email: string) {
    const doesExist = await checkIfExists("User", "email", email);
    if (doesExist) return;
    else {
        const user = await postUser(email);
        return user;
    }
}
