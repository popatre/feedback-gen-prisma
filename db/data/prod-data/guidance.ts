import { v4 as uuidv4 } from "uuid";

export const guidanceData = [
    {
        guidance_id: uuidv4(),
        ticket_id: "FE1",
        type: "must",
        guidance:
            "Make sure the React app is in the root of the repo and not in a nested folder made by Vite, if they've done this by accident they can just drag the app files out and delete the nested folder",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE2",
        type: "must",
        guidance: "Must follow the steps in L2C - ticket 2.",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE3",
        type: "must",
        guidance:
            "All planned pages must be in wireframe and there should be a clear flow between them",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE3",
        type: "must",
        guidance: "App must be divided into sensible components",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE3",
        type: "must",
        guidance: "Component trees should be in place",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE3",
        type: "must",
        guidance:
            "Distinction between API endpoints for accessing data and page routes - make sure they aren't getting confused between the two in their plan",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE3",
        type: "should",
        guidance:
            "Consideration of state (the key states needed and levels, i.e. articles/topics), can always be added to later but good to see them thinking about it as early as possible",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE3",
        type: "should",
        guidance: "Wireframes should be mobile first",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE3",
        type: "should",
        guidance:
            "Should not be over ambitious, if the design is overly complicated for the student's ability then encourage them to simplify it as they can always add more features later",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE3",
        type: "could",
        guidance:
            "Could use any visual tool of their choice. Figma, Excalidraw, JS Paint, paper and pencil.",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE3",
        type: "could",
        guidance: "Some thought on design prototyping. Colour, fonts etc.",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE4",
        type: "must",
        guidance: "A list of all articles must be viewable",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE4",
        type: "must",
        guidance:
            "If this list is not on the homepage, a link must be present to go to the relevant page",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE4",
        type: "must",
        guidance:
            "isLoading pattern is followed with visual feedback to inform user",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE4",
        type: "should",
        guidance:
            "Requests to api should be handled separately in a utils file using axios i.e. getArticles",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE4",
        type: "should",
        guidance: "Considerations for responsive design should be made",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE4",
        type: "should",
        guidance: "Basic layout design implemented",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE4",
        type: "should",
        guidance: "make sure the data is presented in an interesting way",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE4",
        type: "should",
        guidance: "timestamp is formatted to human readable format",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE4",
        type: "should",
        guidance: "loading component extracted for reusability",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE4",
        type: "could",
        guidance:
            "Components are fully styled with considerations for accessibility",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE4",
        type: "could",
        guidance:
            "Pagination is optional at this stage and is ok to be added in later",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE4",
        type: "could",
        guidance: "UI responds to API timeout errors - advanced!",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE5",
        type: "must",
        guidance:
            "Can view a single article (no comments necessary at this stage)",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE5",
        type: "must",
        guidance:
            "Must be able to navigate to an article page by the URL using the article id",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE5",
        type: "must",
        guidance:
            "Article is fetched from the api and not just from the articles list in state. This could lead to stale data and should be accounted for",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE5",
        type: "must",
        guidance:
            "Pages should still render on refresh. Should not be reliant on following a certain link",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE5",
        type: "must",
        guidance:
            "isLoading pattern is followed with visual feedback to inform user",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE5",
        type: "must",
        guidance:
            "There should be links to each of these articles from all articles or articles by topic",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE5",
        type: "should",
        guidance:
            "URL should show article id in the format of /articles/:article_id",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE5",
        type: "should",
        guidance:
            "Requests to api should be handled separately in a utils file using axios i.e. getArticles",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE5",
        type: "should",
        guidance: "Considerations for responsive design should be made",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE5",
        type: "should",
        guidance: "Basic layout design implemented",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE5",
        type: "should",
        guidance: "timestamp is formatted to human readable format",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE5",
        type: "should",
        guidance: "loading component extracted for reusability",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE5",
        type: "could",
        guidance:
            "Components are fully styled with considerations for accessibility",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE5",
        type: "could",
        guidance: "Make sure the data is presented in an interesting way",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE5",
        type: "could",
        guidance: "UI responds to API timeout errors - advanced!",
    },
];
