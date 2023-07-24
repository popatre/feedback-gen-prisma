/*
  Warnings:

  - The primary key for the `Guidance` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_guidance_id_fkey";

-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "guidance_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Guidance" DROP CONSTRAINT "Guidance_pkey",
ALTER COLUMN "guidance_id" DROP DEFAULT,
ALTER COLUMN "guidance_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Guidance_pkey" PRIMARY KEY ("guidance_id");
DROP SEQUENCE "Guidance_guidance_id_seq";

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_guidance_id_fkey" FOREIGN KEY ("guidance_id") REFERENCES "Guidance"("guidance_id") ON DELETE RESTRICT ON UPDATE CASCADE;
