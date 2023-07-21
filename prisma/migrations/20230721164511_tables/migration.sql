-- CreateTable
CREATE TABLE "Block" (
    "block_id" INTEGER NOT NULL,
    "block_name" TEXT NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("block_id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "ticket_id" TEXT NOT NULL,
    "ticket_number" INTEGER NOT NULL,
    "block_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticket_id")
);

-- CreateTable
CREATE TABLE "Guidance" (
    "guidance_id" INTEGER NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "guidance" TEXT NOT NULL,

    CONSTRAINT "Guidance_pkey" PRIMARY KEY ("guidance_id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "feedback_id" INTEGER NOT NULL,
    "www" TEXT NOT NULL,
    "ebi" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "guidance_id" INTEGER NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("feedback_id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_block_id_fkey" FOREIGN KEY ("block_id") REFERENCES "Block"("block_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guidance" ADD CONSTRAINT "Guidance_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("ticket_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_guidance_id_fkey" FOREIGN KEY ("guidance_id") REFERENCES "Guidance"("guidance_id") ON DELETE RESTRICT ON UPDATE CASCADE;
