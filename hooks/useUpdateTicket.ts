import { trpc } from "@/utils/trpc";

export default function useUpdateTicket() {
    const {
        data: ticket,
        isLoading,
        isSuccess,
        mutateAsync,
        isError,
    } = trpc.ticket.patchTicket.useMutation();

    const updateTicket = async (
        ticketNumber: number,
        ticketId: string,
        description: string
    ) => {
        await mutateAsync({
            ticketNumber,
            ticketId,
            description,
        });
    };

    return { ticket, updateTicket, isLoading, isSuccess, isError };
}
