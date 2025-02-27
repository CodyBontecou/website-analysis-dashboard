import type {
    Website,
    LighthouseSummary,
    WebsiteAnalysis as PrismaWebsiteAnalysis,
} from '@prisma/client'
import type { WebsiteAnalysis } from '@/types/WebsiteAnalysis'

type WebsiteWithRelations = Website & {
    lighthouseSummaries: (LighthouseSummary & {
        issues: { description: string }[]
    })[]
    analyses: (PrismaWebsiteAnalysis & {
        suggestions: { description: string; priority: number }[]
    })[]
}

/**
 * Formats database website data to match the WebsiteAnalysis interface
 * used by the frontend components
 */
export function formatWebsiteData(
    website: WebsiteWithRelations
): WebsiteAnalysis | null {
    // Check if the website has all required data
    if (
        !website.analyses.length ||
        !website.lighthouseSummaries.some(
            summary => summary.deviceType === 'MOBILE'
        ) ||
        !website.lighthouseSummaries.some(
            summary => summary.deviceType === 'DESKTOP'
        )
    ) {
        return null
    }

    const latestAnalysis = website.analyses[0]
    const mobileLighthouseSummary = website.lighthouseSummaries.find(
        summary => summary.deviceType === 'MOBILE'
    )
    const desktopLighthouseSummary = website.lighthouseSummaries.find(
        summary => summary.deviceType === 'DESKTOP'
    )

    // This should never happen due to our check above, but TypeScript needs this
    if (!mobileLighthouseSummary || !desktopLighthouseSummary) {
        return null
    }

    return {
        id: website.id,
        metadata: {
            url: website.url,
            timestamp: latestAnalysis.timestamp.toISOString(),
        },
        rawData: {
            url: website.url,
            mobileLighthouseSummary: {
                performance: mobileLighthouseSummary.performance,
                accessibility: mobileLighthouseSummary.accessibility,
                seo: mobileLighthouseSummary.seo,
                bestPractices: mobileLighthouseSummary.bestPractices,
                issues: mobileLighthouseSummary.issues.map(
                    issue => issue.description
                ),
            },
            desktopLighthouseSummary: {
                performance: desktopLighthouseSummary.performance,
                accessibility: desktopLighthouseSummary.accessibility,
                seo: desktopLighthouseSummary.seo,
                bestPractices: desktopLighthouseSummary.bestPractices,
                issues: desktopLighthouseSummary.issues.map(
                    issue => issue.description
                ),
            },
        },
        analysis: {
            business_type: latestAnalysis.businessType,
            layout_score: latestAnalysis.layoutScore,
            color_score: latestAnalysis.colorScore,
            typography_score: latestAnalysis.typographyScore,
            clarity_score: latestAnalysis.clarityScore,
            layout_feedback: latestAnalysis.layoutFeedback,
            color_feedback: latestAnalysis.colorFeedback,
            typography_feedback: latestAnalysis.typographyFeedback,
            clarity_feedback: latestAnalysis.clarityFeedback,
            top_5_suggestions: latestAnalysis.suggestions
                .slice(0, 5)
                .map(suggestion => suggestion.description),
            overall_score: latestAnalysis.overallScore,
        },
    }
}
