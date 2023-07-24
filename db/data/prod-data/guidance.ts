import { v4 as uuidv4 } from "uuid";

export const guidanceData = [
    {
        guidance_id: uuidv4(),
        ticket_id: "FE1",
        type: "must",
        guidance: "Must include this for ticket 1 in frontend",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE1",
        type: "must",
        guidance: "This Must also be included this for ticket 1 in frontend",
    },
];
