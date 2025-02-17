export interface WebsiteAnalysis {
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
}

export interface LighthouseMetrics {
    performance: number
    accessibility: number
    bestPractices: number
    seo: number
    issues: string[]
}
