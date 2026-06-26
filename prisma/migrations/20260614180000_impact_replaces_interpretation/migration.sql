-- Replace `interpretation` with `impact` on Film.
ALTER TABLE "Film" DROP COLUMN "interpretation";
ALTER TABLE "Film" ADD COLUMN "impact" TEXT;
