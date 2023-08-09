import React, { useContext } from "react";
import { UserContext } from "@/lib/context";

export default function useUserContext() {
    const userDetails = useContext(UserContext);

    if (!userDetails) {
        return {};
    }
    const { email, displayName, adminMode, setAdminMode } = userDetails;

    return { email, displayName, adminMode, setAdminMode };
}
