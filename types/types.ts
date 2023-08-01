export type Feedback = {
    feedback_id: number;
    www: string;
    ebi: string;
    user_email: string;
    guidance_id: string;
};

export type Guidance = {
    guidance_id: string;
    guidance: string;
    feedback: Feedback[];
};

export type Ticket = {
    ticket_id: string;
    ticket_number: number;
    block_name: string;
    description: string;
};
