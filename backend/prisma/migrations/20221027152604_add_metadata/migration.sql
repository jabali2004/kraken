-- CreateTable
CREATE TABLE "Metadata" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT,
    "applicationId" BIGINT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Metadata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;
