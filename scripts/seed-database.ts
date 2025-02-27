import { PrismaClient } from '@prisma/client'
import { websites } from '../lib/mockWebsites'

const prisma = new PrismaClient()

async function main() {
    console.log('Starting database seeding...')

    for (const website of websites) {
        console.log(`Processing website: ${website.metadata.url}`)

        // Create or update the Website record
        const websiteRecord = await prisma.website.upsert({
            where: { url: website.metadata.url },
            update: {},
            create: {
                url: website.metadata.url,
            },
        })

        console.log(
            `Website record created/updated with ID: ${websiteRecord.id}`
        )

        // Create mobile lighthouse summary
        if (website.rawData.mobileLighthouseSummary) {
            const mobileSummary = await prisma.lighthouseSummary.create({
                data: {
                    websiteId: websiteRecord.id,
                    deviceType: 'MOBILE',
                    timestamp: new Date(website.metadata.timestamp),
                    performance:
                        website.rawData.mobileLighthouseSummary.performance,
                    accessibility:
                        website.rawData.mobileLighthouseSummary.accessibility,
                    seo: website.rawData.mobileLighthouseSummary.seo,
                    bestPractices:
                        website.rawData.mobileLighthouseSummary.bestPractices,
                    issues: {
                        create: website.rawData.mobileLighthouseSummary.issues.map(
                            issue => ({
                                description: issue,
                            })
                        ),
                    },
                },
            })
            console.log(
                `Mobile lighthouse summary created with ID: ${mobileSummary.id}`
            )
        }

        // Create desktop lighthouse summary
        if (website.rawData.desktopLighthouseSummary) {
            const desktopSummary = await prisma.lighthouseSummary.create({
                data: {
                    websiteId: websiteRecord.id,
                    deviceType: 'DESKTOP',
                    timestamp: new Date(website.metadata.timestamp),
                    performance:
                        website.rawData.desktopLighthouseSummary.performance,
                    accessibility:
                        website.rawData.desktopLighthouseSummary.accessibility,
                    seo: website.rawData.desktopLighthouseSummary.seo,
                    bestPractices:
                        website.rawData.desktopLighthouseSummary.bestPractices,
                    issues: {
                        create: website.rawData.desktopLighthouseSummary.issues.map(
                            issue => ({
                                description: issue,
                            })
                        ),
                    },
                },
            })
            console.log(
                `Desktop lighthouse summary created with ID: ${desktopSummary.id}`
            )
        }

        // Create website analysis
        if (website.analysis) {
            const analysis = await prisma.websiteAnalysis.create({
                data: {
                    websiteId: websiteRecord.id,
                    timestamp: new Date(website.metadata.timestamp),
                    businessType: website.analysis.business_type,
                    layoutScore:
                        typeof website.analysis.layout_score === 'number'
                            ? website.analysis.layout_score
                            : parseFloat(
                                  website.analysis.layout_score.toString()
                              ),
                    colorScore:
                        typeof website.analysis.color_score === 'number'
                            ? website.analysis.color_score
                            : parseFloat(
                                  website.analysis.color_score.toString()
                              ),
                    typographyScore:
                        typeof website.analysis.typography_score === 'number'
                            ? website.analysis.typography_score
                            : parseFloat(
                                  website.analysis.typography_score.toString()
                              ),
                    clarityScore:
                        typeof website.analysis.clarity_score === 'number'
                            ? website.analysis.clarity_score
                            : parseFloat(
                                  website.analysis.clarity_score.toString()
                              ),
                    layoutFeedback: website.analysis.layout_feedback,
                    colorFeedback: website.analysis.color_feedback,
                    typographyFeedback: website.analysis.typography_feedback,
                    clarityFeedback: website.analysis.clarity_feedback,
                    overallScore:
                        typeof website.analysis.overall_score === 'number'
                            ? website.analysis.overall_score
                            : parseFloat(
                                  website.analysis.overall_score.toString()
                              ),
                    suggestions: {
                        create: website.analysis.top_5_suggestions.map(
                            (suggestion, index) => ({
                                description: suggestion,
                                priority: index + 1,
                            })
                        ),
                    },
                },
            })
            console.log(`Website analysis created with ID: ${analysis.id}`)
        }

        console.log(`Finished processing website: ${website.metadata.url}`)
    }

    console.log('Database seeding completed successfully!')
}

main()
    .catch(e => {
        console.error('Error during database seeding:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
