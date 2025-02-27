import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WebsiteTable } from '@/components/website-table'
import { PrismaClient } from '@prisma/client'
import type { WebsiteAnalysis } from '@/types/WebsiteAnalysis'
import { formatWebsiteData } from '@/lib/formatDatabaseData'

// Create a new Prisma client instance
const prisma = new PrismaClient()

export default async function Home() {
    // Fetch websites from the database
    const websites = await prisma.website.findMany({
        include: {
            lighthouseSummaries: {
                include: {
                    issues: true,
                },
            },
            analyses: {
                include: {
                    suggestions: {
                        orderBy: {
                            priority: 'asc',
                        },
                    },
                },
                orderBy: {
                    timestamp: 'desc',
                },
                take: 1,
            },
        },
    })

    // Transform the database data to match the expected WebsiteAnalysis format
    const formattedWebsites: WebsiteAnalysis[] = websites
        .map(formatWebsiteData)
        .filter((website): website is WebsiteAnalysis => website !== null)

    return (
        <main className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">
                Website Analytics Dashboard
            </h1>
            <Card>
                <CardHeader>
                    <CardTitle>Analyzed Websites</CardTitle>
                </CardHeader>
                <CardContent>
                    <WebsiteTable websites={formattedWebsites} />
                </CardContent>
            </Card>
        </main>
    )
}
