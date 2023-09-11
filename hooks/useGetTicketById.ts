import { trpc } from "@/utils/trpc";

export default function useGetTicketById(
    ticketId: string,
    userEmail: string | undefined
) {
    userEmail ||= "";

    const { data: ticket, isLoading } = trpc.ticket.getTicketById.useQuery({
        id: ticketId,
        email: userEmail,
    });
    return { ticket, isLoading };
}
