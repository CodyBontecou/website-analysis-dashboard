import { generateLLMPayload } from './generateLLMPayload'
import { getChatGPTCritique } from './getChatGPTCritique'
import { LighthouseSummary } from './createLighthouseSummary'
import { saveLighthouseData } from './saveLighthouseData'

interface WebsiteAnalysis {
    metadata: {
        url: string
        timestamp: string
    }
    rawData: {
        url: string
        mobileLighthouseSummary: LighthouseSummary
        desktopLighthouseSummary: LighthouseSummary
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

export async function generateAndAnalyzeReport(url: string) {
    try {
        // Generate payload
        const payload = await generateLLMPayload(url)

        // Get ChatGPT analysis
        const critique = await getChatGPTCritique(payload)

        // Save full report
        const finalReport: WebsiteAnalysis = {
            metadata: {
                url: payload.url,
                timestamp: new Date().toISOString(),
            },
            rawData: payload,
            analysis: critique,
        }

        await saveLighthouseData(finalReport)
        return finalReport
    } catch (error) {
        console.error('Analysis failed:', error)
    }
}
