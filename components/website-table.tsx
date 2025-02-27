import Link from 'next/link'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

interface LighthouseMetrics {
    performance: number
    accessibility: number
    seo: number
}

interface WebsiteAnalysis {
    metadata: {
        url: string
        timestamp: string
    }
    rawData: {
        url: string
        mobileLighthouseSummary: LighthouseMetrics
        desktopLighthouseSummary: LighthouseMetrics
    }
    analysis: {
        business_type: string
        layout_score: number
        color_score: number
        typography_score: number
        clarity_score: number
        layout_feedback: string
        color_feedback: string
        typography_feedback: string
        clarity_feedback: string
        top_5_suggestions: string[]
        overall_score: number
    }
    id: number | string
}

interface WebsiteTableProps {
    websites: WebsiteAnalysis[]
}

function calculateAverageLighthouseScore(metrics: LighthouseMetrics): number {
    return (metrics.performance + metrics.accessibility + metrics.seo) / 3
}

export function WebsiteTable({ websites }: WebsiteTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Website</TableHead>
                    <TableHead>Business Type</TableHead>
                    <TableHead>Overall Score</TableHead>
                    <TableHead>Mobile Lighthouse</TableHead>
                    <TableHead>Desktop Lighthouse</TableHead>
                    <TableHead>Last Updated</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {websites.map(website => {
                    const href = `/dashboard/${encodeURIComponent(website.id)}`
                    return (
                        <TableRow
                            key={website.metadata.url}
                            className="cursor-pointer hover:bg-muted"
                        >
                            <TableCell>
                                <Link href={href} className="block w-full">
                                    {website.metadata.url}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={href} className="block w-full">
                                    {website.analysis.business_type}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={href} className="block w-full">
                                    {website.analysis.overall_score.toFixed(2)}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={href} className="block w-full">
                                    {calculateAverageLighthouseScore(
                                        website.rawData.mobileLighthouseSummary
                                    ).toFixed(2)}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={href} className="block w-full">
                                    {calculateAverageLighthouseScore(
                                        website.rawData.desktopLighthouseSummary
                                    ).toFixed(2)}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={href} className="block w-full">
                                    {new Date(
                                        website.metadata.timestamp
                                    ).toLocaleDateString()}
                                </Link>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}
