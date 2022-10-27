/*
  Warnings:

  - The primary key for the `Application` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Dependency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Metadata` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `applicationId` on table `Metadata` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Dependency" DROP CONSTRAINT "Dependency_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "Metadata" DROP CONSTRAINT "Metadata_applicationId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP CONSTRAINT "Application_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Application_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Application_id_seq";

-- AlterTable
ALTER TABLE "Dependency" DROP CONSTRAINT "Dependency_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "applicationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Dependency_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Dependency_id_seq";

-- AlterTable
ALTER TABLE "Metadata" DROP CONSTRAINT "Metadata_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "applicationId" SET NOT NULL,
ALTER COLUMN "applicationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Metadata_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Metadata_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Dependency" ADD CONSTRAINT "Dependency_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
