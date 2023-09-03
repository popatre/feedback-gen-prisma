import { trpc } from "@/utils/trpc";

export default function useDeleteTicket() {
    const {
        data: isDeleted,
        isLoading,
        isSuccess,
        isError,
        error,
        mutateAsync,
    } = trpc.ticket.deleteTicket.useMutation();

    const deleteTicket = async (ticketId: string) => {
        const isDeleted = await mutateAsync(ticketId);
        return isDeleted;
    };

    return { isDeleted, deleteTicket, isLoading, isSuccess, isError, error };
}
