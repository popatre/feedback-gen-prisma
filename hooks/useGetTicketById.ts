import { trpc } from "@/utils/trpc";

export default function useGetTicketById(ticketId: string, userEmail: string) {
    const { data: ticket, isLoading } = trpc.ticket.getTicketById.useQuery({
        id: ticketId,
        email: userEmail,
    });
    return { ticket, isLoading };
}
