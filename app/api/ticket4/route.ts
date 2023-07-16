import { NextResponse } from "next/server";

export async function GET() {
    const feedback = {
        ticketDescription: "Ticket 4 - View all articles",
        mustData: [
            {
                guidance: "A list of all articles must be viewable",
                www: "Good list of all the article being rendered",
                ebi: "Please render all the article from the api",
            },
            {
                guidance:
                    "If this list is not on the homepage, a link must be present to go to the relevant page",
                www: "Nice UX having a link to all the articles",
                ebi: "For a better UX/UI, could you please add a link to all the articles from the home page",
            },
            {
                guidance:
                    "isLoading pattern is followed with visual feedback to inform user",
                www: "Lovely seeing the loading indicator to let us know something is happening",
                ebi: "Please add some loading feedback/state to let us know that something is happening, its just a slow server/Internet connection",
            },
        ],
        shouldData: [
            {
                guidance:
                    "Requests to api should be handled separately in a utils file using axios i.e. getArticles",
                www: "Good to see the axios requests extracted into their own folder - nice and reusable",
                ebi: "Would be good to see the axios requests extracted into their own folder - make them more reusable/maintainable",
            },
            {
                guidance: "Considerations for responsive design should be made",
                www: "Some nice responsiveness in your designs - keep it up! 👍",
                ebi: "Would be good for this to be a little more responsive - will make it easier further down the line if you start thinking about it now",
            },
            {
                guidance: "Basic layout design implemented",
                www: "Nice layout to far.",
                ebi: "I'd make sure this matches your designs/layout",
            },
            {
                guidance:
                    "make sure the data is presented in an interesting way",
                www: "Nice presentation of the data in a more interesting way",
                ebi: "Would be good for this data to be presented in a bit more of an exciting way. Can look at this website for ideas: https://www.refactoringui.com/previews/labels-are-a-last-resort",
            },
            {
                guidance: "timestamp is formatted to human readable format",
                www: "Timestamp is readable",
                ebi: "Would be better to have the timestamp formatted in a bit more of a human readable way, than the default",
            },
            {
                guidance: "loading component extracted for reusability",
                www: "Excellent work extracting the loading into its own component - make its nice and re-useable",
                ebi: "Might be nice to have the loading component extracted into its own component that you can then just reuse when you need a loading component",
            },
        ],
        couldData: [
            {
                guidance:
                    "Components are fully styled with considerations for accessibility",
                www: "Nicely design components and even thoughts for accessibility as well! Excellent! 👏",
                ebi: "Optional: Could think about accessibility in your components",
            },
            {
                guidance:
                    "Make sure the data is presented in an interesting way",
                www: "Nice presentation of the data in a more interesting way",
                ebi: "Optional: Would be good for this data to be presented in a bit more of an exciting way. Can look at this website for ideas: https://www.refactoringui.com/previews/labels-are-a-last-resort",
            },
            {
                guidance: "UI responds to API timeout errors - advanced!",
                www: "Excellent thinking about API timeout errors!",
                ebi: "Optional: For an extra challenge, could think about handling API timeout errors",
            },
        ],
    };

    return NextResponse.json({ feedback });
}
