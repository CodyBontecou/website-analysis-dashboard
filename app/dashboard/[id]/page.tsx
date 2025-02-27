import Dashboard from '@/components/Dashboard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import { formatWebsiteData } from '@/lib/formatDatabaseData'

// Create a new Prisma client instance
const prisma = new PrismaClient()

export default async function DashboardView({ params }) {
    const { id } = params // Access the dynamic route parameter

    // Query the database for the website and its related data
    const website = await prisma.website.findUnique({
        where: {
            id: parseInt(id),
        },
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

    if (!website) {
        return notFound()
    }

    // Format the data using our utility function
    const formattedData = formatWebsiteData(website)

    if (!formattedData) {
        return <div>Incomplete data for this website</div>
    }

    return (
        <>
            <Button asChild>
                <Link href="/">Back to Home</Link>
            </Button>
            <Dashboard data={formattedData} />
        </>
    )
}
