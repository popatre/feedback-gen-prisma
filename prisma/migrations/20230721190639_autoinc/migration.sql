-- AlterTable
CREATE SEQUENCE feedback_feedback_id_seq;
ALTER TABLE "Feedback" ALTER COLUMN "feedback_id" SET DEFAULT nextval('feedback_feedback_id_seq');
ALTER SEQUENCE feedback_feedback_id_seq OWNED BY "Feedback"."feedback_id";
