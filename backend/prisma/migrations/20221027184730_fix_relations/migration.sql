/*
  Warnings:

  - Added the required column `dependencyId` to the `Dependency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dependency" ADD COLUMN     "dependencyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Dependency" ADD CONSTRAINT "Dependency_dependencyId_fkey" FOREIGN KEY ("dependencyId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
