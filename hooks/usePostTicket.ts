import { trpc } from "@/utils/trpc";

export default function usePostTicket(blockName: string) {
    const {
        data: ticket,
        isLoading,
        isSuccess,
        isError,
        error,
        mutateAsync,
    } = trpc.ticket.postTicketByBlockName.useMutation();

    const handleTicketPost = async (
        ticketNumber: number,
        description: string
    ) => {
        await mutateAsync({ blockName, ticketNumber, description });
    };

    return { ticket, handleTicketPost, isLoading, isSuccess, isError, error };
}
