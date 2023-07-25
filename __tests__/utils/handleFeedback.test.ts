import { handleFeedback } from "../../db/utils/handleFeedback";
import * as data from "../../db/data/test-data/index";
import seed from "../../db/seeds/seed";
import getTableIds from "../../db/utils/getTableIds";

beforeEach(() => seed(data));

describe("handleFeedback", () => {
    test("should post new feedback if user hasnt added feedback previous", async () => {
        const email = "test3@gmail.com";
        const feedback = { www: "im new www", ebi: "im new ebi" };
        const guidanceId = "10";

        const newPost = await handleFeedback(feedback, guidanceId, email);
        expect(newPost).toMatchObject({
            guidance_id: "10",
            user_email: "test3@gmail.com",
            www: "im new www",
            ebi: "im new ebi",
            feedback_id: expect.any(Number),
        });
    });
    test("should patch feedback when previous feedback present", async () => {
        const email = "test@gmail.com";
        const feedback = {
            www: "im new www from patch",
            ebi: "im new ebi from patch",
        };
        const guidanceId = "1";
        const feedbackIds = await getTableIds("Feedback", "feedback_id");
        const feedbackId = +feedbackIds[0];

        const feedbackPatch = await handleFeedback(
            feedback,
            guidanceId,
            email,
            feedbackId
        );
        console.log(feedbackPatch, "****");
        expect(feedbackPatch).toMatchObject({
            guidance_id: "1",
            user_email: "test@gmail.com",
            www: "im new www from patch",
            ebi: "im new ebi from patch",
            feedback_id: feedbackId,
        });
    });
});
