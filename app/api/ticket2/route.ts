import { NextResponse } from "next/server";

export async function GET() {
    const feedback = {
        ticketDescription: "Ticket 3 - Planning",
        mustData: [
            {
                guidance: "Must follow the steps in L2C - ticket 2.",
                www: "You've done the CORS stuff 👍",
                ebi: "Enable cors on the backend following the instructions in L2C",
            },
        ],
        shouldData: [],
        couldData: [],
    };

    return NextResponse.json({ feedback });
}
