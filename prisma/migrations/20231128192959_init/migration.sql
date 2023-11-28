-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('ABDOMINAL', 'BICEPS', 'DELTOID', 'ERECTOR_SPINAE', 'LATISSIMUS_DORSI', 'PECTORAL', 'TRAPEZIUS', 'TRICEPS');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'BINARY', 'PREFER_NOT_SPECIFY');

-- CreateEnum
CREATE TYPE "TrainingType" AS ENUM ('STRENGTH', 'CARDIO', 'FUNCTIONAL', 'FLEXIBILITY', 'ENDURANCE', 'SPORTSSPECIFIC', 'AGILITY', 'BODYWEIGHT');

-- CreateTable
CREATE TABLE "ExerciseLink" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "ExerciseLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "muscleGroup" "MuscleGroup" NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInfo" (
    "id" SERIAL NOT NULL,
    "firebaseUid" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "phone" TEXT NOT NULL,
    "pushNotification" BOOLEAN NOT NULL,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Routine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userInfoId" INTEGER,

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrowthRecord" (
    "id" SERIAL NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "userInfoId" INTEGER NOT NULL,

    CONSTRAINT "GrowthRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingPreference" (
    "id" SERIAL NOT NULL,
    "type" "TrainingType" NOT NULL,
    "time" INTEGER NOT NULL,
    "intensity" TEXT NOT NULL,
    "userInfoId" INTEGER NOT NULL,

    CONSTRAINT "TrainingPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_firebaseUid_key" ON "UserInfo"("firebaseUid");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingPreference_userInfoId_key" ON "TrainingPreference"("userInfoId");

-- AddForeignKey
ALTER TABLE "ExerciseLink" ADD CONSTRAINT "ExerciseLink_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("firebaseUid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrowthRecord" ADD CONSTRAINT "GrowthRecord_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("firebaseUid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPreference" ADD CONSTRAINT "TrainingPreference_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("firebaseUid") ON DELETE RESTRICT ON UPDATE CASCADE;
