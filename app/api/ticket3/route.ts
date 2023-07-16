import { NextResponse } from "next/server";

export async function GET() {
    const feedback = {
        ticketDescription: "Ticket 3 - Planning",
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
                www: "Good that you've thought about the states in the component tree",
                ebi: "We be great for you to think about your states and where they will live",
            },
            {
                guidance: "Wireframes should be mobile first",
                www: "Nice mobile first designs! More user will view your app on a mobile, so excellent to think about their experience first",
                ebi: "Ideally, your designs should be mobile first. More user will view your app on a mobile, so excellent to think about their experience first. The mobile design will also be easier to make and you'll find a lot of the default css styling is what you want to achieve your design",
            },
            {
                guidance:
                    "Should not be over ambitious, if the design is overly complicated for the students ability then encourage them to simplify it as they can always add more features later",
                www: "Nice design that isn't overly ambitious",
                ebi: "There's quite a lot of functionality planned here. I'd narrow it down a bit and get the basic app working; you can always add fancier stuff in later if you get the basic app done",
            },
        ],
        couldData: [
            {
                guidance:
                    "could use any visual tool of their choice. Figma, Excalidraw, JS Paint, paper and pencil.",
                www: "You've used a design tool to make your plan",
                ebi: "Create a plan using excalidraw, figma, jsPaint or even paper and pencil",
            },
            {
                guidance:
                    "some thought on design prototyping. Colour, fonts etc.",
                www: "Nice that you've thought about the designs/colours/fonts before starting",
                ebi: "Optional: Could think about the designs/font/colours before starting",
            },
        ],
    };

    return NextResponse.json({ feedback });
}
