import { NextResponse } from "next/server";

export async function GET() {
    const feedback = {
        mustData: [
            {
                guidance:
                    "All planned pages must be in wireframe and there should be a clear flow between them",
                www: "Nice wireframe with a nice clear flow between them",
                ebi: "We need a wireframe with a clear flow between the components",
            },
            {
                guidance: "App must be divided into sensible components",
                www: "Nicely split into individual components",
                ebi: "Could you split these into smaller components?",
            },
            {
                guidance: "Component trees should be in place",
                www: "Excellent component tree!",
                ebi: "Please add a component tree with how your components/state links up",
            },
            {
                guidance:
                    "Distinction between API endpoints for accessing data and page routes - make sure they aren't getting confused between the two in their plan",
                www: "Good planning of your routes here - they make sense for a user of the website",
                ebi: "Please add what routes/urls your app will have - this will be what someone sees in the url, it doesnt need to match the api route you'll use to get the data",
            },
        ],
        shouldData: [
            {
                guidance:
                    " Consideration of state (the key states needed and levels, i.e. articles/topics), can always be added to later but good to see them thinking about it as early as possible",
                www: "nice one",
                ebi: "rubbish stuff",
            },
            {
                guidance: "Wireframes should be mobile first",
                www: "nice one",
                ebi: "rubbish stuff",
            },
            {
                guidance:
                    "Should not be over ambitious, if the design is overly complicated for the students ability then encourage them to simplify it as they can always add more features later",
                www: "nice one",
                ebi: "rubbish stuff",
            },
        ],
        couldData: [
            {
                guidance:
                    "could use any visual tool of their choice. Figma, Excalidraw, JS Paint, paper and pencil.",
                www: "nice one",
                ebi: "rubbish stuffffff",
            },
            {
                guidance:
                    "some thought on design prototyping. Colour, fonts etc.",
                www: "nice one",
                ebi: "rubbish stuffffff",
            },
        ],
    };

    return NextResponse.json({ feedback });
}
