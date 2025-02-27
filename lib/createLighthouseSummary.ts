import { LighthouseData } from './runLighthouseAudit'

export interface LighthouseSummary {
    performance: number
    accessibility: number
    seo: number
    bestPractices: number
    issues: string[]
}

export function createLighthouseSummary(
    data: LighthouseData
): LighthouseSummary {
    const { categories, audits } = data

    return {
        performance: categories.performance.score * 100,
        accessibility: categories.accessibility.score * 100,
        seo: categories.seo.score * 100,
        bestPractices: categories['best-practices'].score * 100,
        issues: Object.values(audits)
            .filter(audit => audit.score !== 1)
            .map(audit => audit.title),
    }
}
