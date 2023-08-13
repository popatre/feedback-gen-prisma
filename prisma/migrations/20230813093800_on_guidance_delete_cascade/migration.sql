-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_guidance_id_fkey";

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_guidance_id_fkey" FOREIGN KEY ("guidance_id") REFERENCES "Guidance"("guidance_id") ON DELETE CASCADE ON UPDATE CASCADE;
