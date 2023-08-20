-- DropForeignKey
ALTER TABLE "Guidance" DROP CONSTRAINT "Guidance_ticket_id_fkey";

-- AddForeignKey
ALTER TABLE "Guidance" ADD CONSTRAINT "Guidance_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("ticket_id") ON DELETE CASCADE ON UPDATE CASCADE;
