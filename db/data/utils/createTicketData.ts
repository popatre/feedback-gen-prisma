import {
    SingleFeedbackType,
    SingleTicketGuidanceType,
} from "@/server/routers/types/ticket.types";

export const createTicketGuidanceAndFeedback = (): SingleTicketGuidanceType => {
    return {
        block_name: "fe",
        description: "1. Im front end ticket 1",
        ticket_id: "FE1",
        ticket_number: 1,
        guidance: [
            {
                feedback: createGuidanceFeedback(1, "guidance1"),
                guidance_id: "guidance1",
                ticket_id: "FE1",
                type: "must",
                guidance: "Sample must 1",
            },
            {
                feedback: createGuidanceFeedback(2, "guidance2"),
                guidance_id: "guidance2",
                ticket_id: "FE1",
                type: "must",
                guidance: "Sample must 2",
            },
            {
                feedback: createGuidanceFeedback(4, "guidance4"),
                guidance_id: "guidance4",
                ticket_id: "FE1",
                type: "should",
                guidance: "Sample should 3",
            },
            {
                feedback: createGuidanceFeedback(3, "guidance3"),
                guidance_id: "guidance3",
                ticket_id: "FE1",
                type: "could",
                guidance: "Sample could 4",
            },
        ],
    };
};

export const createGuidanceFeedback = (
    id: number,
    guidanceId: string
): SingleFeedbackType => {
    return [
        {
            feedback_id: id,
            www: "this went well",
            ebi: "could have been better",
            user_email: "test@gmail.com",
            guidance_id: guidanceId,
        },
    ];
};
