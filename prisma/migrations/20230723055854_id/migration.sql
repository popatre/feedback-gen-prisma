/*
  Warnings:

  - A unique constraint covering the columns `[ticket_id]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ticket_ticket_id_key" ON "Ticket"("ticket_id");
