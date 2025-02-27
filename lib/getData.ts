import { WebsiteAnalysis } from '@/types/WebsiteAnalysis'
import { generateAndAnalyzeReport } from './generateAndAnalyzeReport'

export async function getData(
    url: string
): Promise<WebsiteAnalysis | undefined> {
    const report = await generateAndAnalyzeReport(url)
    return report
}
