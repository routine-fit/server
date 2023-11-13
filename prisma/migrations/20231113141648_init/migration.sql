-- DropForeignKey
ALTER TABLE "ExerciseLink" DROP CONSTRAINT "ExerciseLink_exerciseId_fkey";

-- AddForeignKey
ALTER TABLE "ExerciseLink" ADD CONSTRAINT "ExerciseLink_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
