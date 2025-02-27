-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('MOBILE', 'DESKTOP');

-- CreateTable
CREATE TABLE "Website" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LighthouseSummary" (
    "id" SERIAL NOT NULL,
    "websiteId" INTEGER NOT NULL,
    "deviceType" "DeviceType" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "performance" INTEGER NOT NULL,
    "accessibility" INTEGER NOT NULL,
    "seo" INTEGER NOT NULL,
    "bestPractices" INTEGER NOT NULL,

    CONSTRAINT "LighthouseSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "lighthouseSummaryId" INTEGER,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebsiteAnalysis" (
    "id" SERIAL NOT NULL,
    "websiteId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "businessType" TEXT NOT NULL,
    "layoutScore" DOUBLE PRECISION NOT NULL,
    "colorScore" DOUBLE PRECISION NOT NULL,
    "typographyScore" DOUBLE PRECISION NOT NULL,
    "clarityScore" DOUBLE PRECISION NOT NULL,
    "layoutFeedback" TEXT NOT NULL,
    "colorFeedback" TEXT NOT NULL,
    "typographyFeedback" TEXT NOT NULL,
    "clarityFeedback" TEXT NOT NULL,
    "overallScore" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WebsiteAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suggestion" (
    "id" SERIAL NOT NULL,
    "websiteAnalysisId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,

    CONSTRAINT "Suggestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Website_url_key" ON "Website"("url");

-- CreateIndex
CREATE INDEX "LighthouseSummary_websiteId_deviceType_idx" ON "LighthouseSummary"("websiteId", "deviceType");

-- AddForeignKey
ALTER TABLE "LighthouseSummary" ADD CONSTRAINT "LighthouseSummary_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_lighthouseSummaryId_fkey" FOREIGN KEY ("lighthouseSummaryId") REFERENCES "LighthouseSummary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteAnalysis" ADD CONSTRAINT "WebsiteAnalysis_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion_websiteAnalysisId_fkey" FOREIGN KEY ("websiteAnalysisId") REFERENCES "WebsiteAnalysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
