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
    {
        guidance_id: uuidv4(),
        ticket_id: "FE6",
        type: "must",
        guidance:
            "User must be able to view a list of comments for each article",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE6",
        type: "must",
        guidance: "Comments should be viewable for a given article",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE6",
        type: "must",
        guidance:
            "Components should not be too large. Consider dedicated components for rendering comments to avoid a Single Article component becoming bloated",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE6",
        type: "must",
        guidance:
            "isLoading pattern is followed with visual feedback to inform user",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE6",
        type: "should",
        guidance: "UI consideration for articles with no comments.",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE6",
        type: "should",
        guidance:
            "Requests to api should be handled separately in a utils file using axios i.e. getArticles",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE6",
        type: "should",
        guidance: "Considerations for responsive design should be made",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE6",
        type: "should",
        guidance: "Basic layout design implemented",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE6",
        type: "should",
        guidance: "timestamp is formatted to human readable format",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE6",
        type: "should",
        guidance: "loading component extracted for reusability",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE6",
        type: "could",
        guidance:
            "Components are fully styled with considerations for accessibility",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE6",
        type: "could",
        guidance: "Make sure the data is presented in an interesting way",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE6",
        type: "could",
        guidance: "UI responds to API timeout errors - advanced!",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE7",
        type: "must",
        guidance:
            "UI is updated with vote++ clearly to show the user has voted.",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE7",
        type: "must",
        guidance: "Total number of votes is incremented when vote submitted",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE7",
        type: "must",
        guidance: "Votes must be persistent between refreshes",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE7",
        type: "must",
        guidance: "User is notified if patch request fails",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE7",
        type: "should",
        guidance:
            "Changes to the number of displayed votes should be handled optimistically",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE7",
        type: "should",
        guidance:
            "The number of votes should not be re-fetched from the api to handle multiple users",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE7",
        type: "should",
        guidance:
            "Requests to api should be handled separately in a utils file using axios i.e. getArticles",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE7",
        type: "should",
        guidance: "Considerations for responsive design should be made",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE7",
        type: "should",
        guidance: "Basic layout design implemented",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE7",
        type: "could",
        guidance: "Users can down vote as well as up vote",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE7",
        type: "could",
        guidance:
            "Users should only be able to vote once in either direction (does not have to persist between refreshes)",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE7",
        type: "could",
        guidance:
            "Components are fully styled with considerations for accessibility",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE7",
        type: "could",
        guidance: "UI responds to API timeout errors - advanced!",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE8",
        type: "must",
        guidance: "Posting functionality should work and be persistent",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE8",
        type: "must",
        guidance:
            "Forms must be controlled (both value and handleChange set for inputs)",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE8",
        type: "must",
        guidance:
            "Basic validation must be included. e.g. blank comments cannot be posted",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE8",
        type: "must",
        guidance:
            "Comments are posted as a hard coded user or - if implemented - the current logged in user",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE8",
        type: "must",
        guidance:
            "If comment post is done optimistically, appropriate error handling to remove comment and alert user if it fails",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE8",
        type: "must",
        guidance:
            "If comment is posted on successful POST to BE, isLoading pattern, form is disabled, user is alerted if it fails",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE8",
        type: "must",
        guidance:
            "on success, regardless of the rendering decision, comment should not be re-fetched from the api. Update state locally.",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE8",
        type: "should",
        guidance: "Forms that stay on the page should be reset after posting",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE8",
        type: "should",
        guidance:
            "Text input for comment should be multi-line i.e. textarea over input",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE8",
        type: "should",
        guidance:
            "Requests to api should be handled separately in a utils file using axios i.e. getArticles",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE8",
        type: "should",
        guidance: "Considerations for responsive design should be made",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE8",
        type: "should",
        guidance: "Basic layout design implemented",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE8",
        type: "should",
        guidance: "loading component extracted for reusability",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE8",
        type: "could",
        guidance:
            "if users can log out, users are not able to post a comment if not logged in",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE8",
        type: "could",
        guidance:
            "Components are fully styled with considerations for accessibility",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE8",
        type: "could",
        guidance: "UI responds to API timeout errors - advanced!",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE9",
        type: "must",
        guidance:
            "There are some UI elements to navigate to each topics page (links / dropdown etc.)",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE9",
        type: "must",
        guidance: "Each topics pages updates the URL eg. /topics/football",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE9",
        type: "must",
        guidance: "Only displays articles by the current topic",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE9",
        type: "must",
        guidance:
            "navigating to a page fetches the data afresh and not pass down a filter version of state",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE9",
        type: "must",
        guidance:
            "useEffect dependencies must be correct and avoid infinite loops",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE9",
        type: "should",
        guidance:
            "If the UI between all topics and articles by topic is consistent they should re-use the same component (optional as it might not be the case from their plan)",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE9",
        type: "should",
        guidance: "Articles list component should be re-used - Same as above?",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE9",
        type: "should",
        guidance:
            "Requests to api should be handled separately in a utils file using axios i.e. getArticles",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE9",
        type: "should",
        guidance: "Considerations for responsive design should be made",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE9",
        type: "should",
        guidance: "Basic layout design implemented",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE9",
        type: "could",
        guidance:
            "Components are fully styled with considerations for accessibility",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE9",
        type: "could",
        guidance: "UI responds to API timeout errors - advanced!",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE10",
        type: "must",
        guidance: "Clear UI to enable user to sort article list",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE10",
        type: "must",
        guidance:
            "User is able to sort articles by date/votes/comment count and order by ascending/descending",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE10",
        type: "must",
        guidance:
            "Default sorting values are in place (to date descending unless otherwise specified in plan)",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE10",
        type: "must",
        guidance: "Sorting works for both all articles and articles by topic",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE10",
        type: "must",
        guidance: "Form inputs are controlled",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE10",
        type: "should",
        guidance:
            " should amend api request with updated queries (not do a .sort())",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE10",
        type: "should",
        guidance:
            "Requests to api should be handled separately in a utils file using axios i.e. getArticles",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE10",
        type: "should",
        guidance: "Considerations for responsive design should be made",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE10",
        type: "should",
        guidance: "Basic layout design implemented",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE10",
        type: "could",
        guidance:
            "useSearchParams to use queries rather than state to manage the sort options",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE10",
        type: "could",
        guidance:
            "Components are fully styled with considerations for accessibility",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE10",
        type: "could",
        guidance: "UI responds to API timeout errors - advanced!",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE11",
        type: "must",
        guidance:
            "The current logged in user can delete their own comments (logged in user can be hardcoded)",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE11",
        type: "must",
        guidance: "UI should be updated accordingly once a comment is deleted",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE11",
        type: "must",
        guidance:
            " Comments should not be re-fetched from the api to account for other users",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE11",
        type: "must",
        guidance:
            "if comment is optimistically deleted, appropriate error handling and UI updates are shown for success and failure states",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE11",
        type: "must",
        guidance: "User must not be able to delete other users comments",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE11",
        type: "should",
        guidance:
            "Delete button should not be rendered for users who aren't logged in",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE11",
        type: "should",
        guidance:
            "User should not be able to click the delete button more than once per comment",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE11",
        type: "should",
        guidance: "Considerations for responsive design should be made",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE11",
        type: "should",
        guidance: "Basic layout design implemented",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE11",
        type: "could",
        guidance:
            "Components are fully styled with considerations for accessibility",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE11",
        type: "could",
        guidance: "UI responds to API timeout errors - advanced!",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE12",
        type: "must",
        guidance:
            "See an appropriate error if going to a non-existent path (404)",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE12",
        type: "must",
        guidance:
            "See an appropriate error if going to a path for a non-existent article (404)",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE12",
        type: "must",
        guidance:
            "See an appropriate error if going to a path for a non-existent topic (404)",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE12",
        type: "must",
        guidance:
            "Invalid values for any other parametrics or queries the app accepts are handled (400)",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE13",
        type: "must",
        guidance: "The app is deployed on netlify with a working link",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE13",
        type: "must",
        guidance:
            "Refreshing the app on sub routes has no errors, guide to fixing them - guide to fix here - https://ridbay.medium.com/react-routing-and-netlify-redirects-fd1f00eeee95",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE13",
        type: "must",
        guidance:
            "Production deployments are used. Url should be of the form https://students-app-name.netlify.app/ and not https://1234abcd12acde000111cdef--students-app-name.netlify.app. This is a preview url generated by netlify deploy. Use netlify deploy --prod to resolve",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE14",
        type: "must",
        guidance: "Link to the deployed version of the app",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE14",
        type: "must",
        guidance: "Link to the back end repo",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE14",
        type: "must",
        guidance: "Link to hosted api",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE14",
        type: "must",
        guidance:
            "Provides general info about the app and a description of what the project is",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE14",
        type: "must",
        guidance: "Should tell user how to navigate the app",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE14",
        type: "must",
        guidance: "Instructs user on how to run the project locally",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE14",
        type: "should",
        guidance:
            "Should have some styling considerations, should be clear to read and have relevant headings",
    },
    {
        guidance_id: uuidv4(),
        ticket_id: "FE14",
        type: "should",
        guidance:
            "Specifies the minimum version of Node required to run the project locally",
    },
];
