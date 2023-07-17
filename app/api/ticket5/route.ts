import { NextResponse } from "next/server";

export async function GET() {
    const feedback = {
        ticketDescription: "Ticket 5 - View individual article",
        mustData: [
            {
                guidance:
                    "Can view a single article (no comments necessary at this stage)",
                www: "Good the article being rendered",
                ebi: "Please render the relevant article from the api",
            },
            {
                guidance:
                    "Must be able to navigate to an article page by the URL using the article id",
                www: "Excellent that I can get to the single article via the url - means it can be shared with someone",
                ebi: "I should be able to navigate to the article via the url e.g. article/1 and get the correct data",
            },
            {
                guidance:
                    "Article is fetched from the api and not just from the articles list in state. This could lead to stale data and should be accounted for",
                www: "Nice to see the params being used to fetch the article data",
                ebi: "Need to use the article id to fetch the data when someone navigates to the page",
            },
            {
                guidance:
                    "Pages should still render on refresh. Should not be reliant on following a certain link",
                www: "Good that it still works after a refresh and doesnt rely on state from a link",
                ebi: "At the moment, the page doesnt work if I refresh it, once on it",
            },
            {
                guidance:
                    "isLoading pattern is followed with visual feedback to inform user",
                www: "Excellent see some loading feedback to let us know something is happening",
                ebi: "We need some loading feedback for a better UX - let the user know that something is happening/data is being requested",
            },
            {
                guidance:
                    "There should be links to each of these articles from all articles or articles by topic",
                www: "Excellent UX to click the article to then navigate to the article data",
                ebi: "We need a link to the single article data from the full list of articles - ideally, i'd click the article in the list and it would navigate to the single article",
            },
        ],
        shouldData: [
            {
                guidance:
                    "URL should show article id in the format of /articles/:article_id",
                www: "The URL is well thought out and gives a nice flow from the previous articles page",
                ebi: "Might be nicer to have the url as /articles/:article_id",
            },
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
                www: "Nice layout so far.",
                ebi: "I'd make sure this matches your designs/layout",
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
