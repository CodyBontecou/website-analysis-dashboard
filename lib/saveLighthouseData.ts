import { PrismaClient } from '@prisma/client'
import { WebsiteAnalysis } from '@/types/WebsiteAnalysis'

export async function saveLighthouseData(data: WebsiteAnalysis) {
    const prisma = new PrismaClient()

    try {
        // Create unique sets of issues
        const allIssues = new Set([
            ...data.rawData.mobileLighthouseSummary.issues,
            ...data.rawData.desktopLighthouseSummary.issues,
        ])

        return await prisma.$transaction(async tx => {
            // First, find all existing issues
            const existingIssues = await tx.lighthouseIssue.findMany({
                where: {
                    description: {
                        in: Array.from(allIssues),
                    },
                },
            })

            // Determine which issues need to be created
            const existingDescriptions = new Set(
                existingIssues.map(issue => issue.description)
            )
            const newIssues = Array.from(allIssues).filter(
                issue => !existingDescriptions.has(issue)
            )

            // Create any new issues
            if (newIssues.length > 0) {
                await tx.lighthouseIssue.createMany({
                    data: newIssues.map(description => ({ description })),
                    skipDuplicates: true,
                })
            }

            // Get all issues (both existing and newly created)
            const allIssueRecords = await tx.lighthouseIssue.findMany({
                where: {
                    description: {
                        in: Array.from(allIssues),
                    },
                },
            })

            // Create issue lookup map
            const issueMap = new Map(
                allIssueRecords.map(issue => [issue.description, issue])
            )

            // Create the lighthouse report
            const report = await tx.lighthouseReport.create({
                data: {
                    url: data.metadata.url,
                    timestamp: new Date(data.metadata.timestamp),

                    // Mobile scores
                    mobilePerformance:
                        data.rawData.mobileLighthouseSummary.performance,
                    mobileAccessibility:
                        data.rawData.mobileLighthouseSummary.accessibility,
                    mobileSeo: data.rawData.mobileLighthouseSummary.seo,
                    mobileBestPractices:
                        data.rawData.mobileLighthouseSummary.bestPractices,

                    // Desktop scores
                    desktopPerformance:
                        data.rawData.desktopLighthouseSummary.performance,
                    desktopAccessibility:
                        data.rawData.desktopLighthouseSummary.accessibility,
                    desktopSeo: data.rawData.desktopLighthouseSummary.seo,
                    desktopBestPractices:
                        data.rawData.desktopLighthouseSummary.bestPractices,

                    // Connect issues
                    mobileIssues: {
                        connect:
                            data.rawData.mobileLighthouseSummary.issues.map(
                                issue => ({
                                    id: issueMap.get(issue)!.id,
                                })
                            ),
                    },
                    desktopIssues: {
                        connect:
                            data.rawData.desktopLighthouseSummary.issues.map(
                                issue => ({
                                    id: issueMap.get(issue)!.id,
                                })
                            ),
                    },
                },
            })

            return report
        })
    } catch (error) {
        console.error('Error saving lighthouse data:', error)
        throw error
    }
}
