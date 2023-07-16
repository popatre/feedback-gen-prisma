import { NextResponse } from "next/server";

export async function GET() {
    const feedback = {
        ticketDescription: "Ticket 12 - Error Handling",
        mustData: [
            {
                guidance:
                    "See an appropriate error if going to a non-existent path (404)",
                www: "Good 404 for a path that doesnt exist",
                ebi: "Please add some handling of 404 for a path that doesnt exist",
            },
            {
                guidance:
                    "See an appropriate error if going to a path for a non-existent article (404)",
                www: "Good handling of a 404 for an article that doesnt exist",
                ebi: "Please add some handling of 404 for an article that doesnt exist",
            },
            {
                guidance:
                    "See an appropriate error if going to a path for a non-existent topic (404)",
                www: "Please handle a 404 for an topic that doesnt exist",
                ebi: "handling of 404 for an topic that doesnt exist",
            },
            {
                guidance:
                    "Invalid values for any other parametrics or queries the app accepts are handled (400)",
                www: "Nice 400 for your parametrics/queries that don't exist",
                ebi: "Please handle - 400 for your parametrics/queries that don't exist",
            },
        ],
        shouldData: [],
        couldData: [],
    };

    return NextResponse.json({ feedback });
}
