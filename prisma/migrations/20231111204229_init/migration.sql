-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('ABDOMINAL', 'BICEPS', 'DELTOID', 'ERECTOR_SPINAE', 'LATISSIMUS_DORSI', 'PECTORAL', 'TRAPEZIUS', 'TRICEPS');

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "muscleGroup" "MuscleGroup" NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseLink" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "ExerciseLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExerciseLink" ADD CONSTRAINT "ExerciseLink_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
