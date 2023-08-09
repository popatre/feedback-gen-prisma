import { createContext } from "react";
import { UserContextData } from "@/types/types";

export const UserContext = createContext<UserContextData | null>(null);
