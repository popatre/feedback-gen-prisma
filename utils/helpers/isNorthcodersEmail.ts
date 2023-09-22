export const isNorthcodersEmail = (email: string | null) => {
    if (email) {
        return email.endsWith("@northcoders.com");
    }
    return false;
};
