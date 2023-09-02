import { Dispatch, SetStateAction } from "react";
import { User } from "firebase/auth";

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

export type Block = {
    tickets: Ticket[];
    block_name: string;
};

export type UserFirebase = User | null;

export interface UserContextData {
    adminMode: boolean;
    setAdminMode: Dispatch<SetStateAction<boolean>>;
    email: string;
    displayName: string;
}

export type TrpcErrorCodes = "BAD_REQUEST" | "NOT_FOUND";

export type GuidanceType = "must" | "should" | "could";
