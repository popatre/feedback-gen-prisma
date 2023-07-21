-- AlterTable
CREATE SEQUENCE guidance_guidance_id_seq;
ALTER TABLE "Guidance" ALTER COLUMN "guidance_id" SET DEFAULT nextval('guidance_guidance_id_seq');
ALTER SEQUENCE guidance_guidance_id_seq OWNED BY "Guidance"."guidance_id";
