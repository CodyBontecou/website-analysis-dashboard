// import { WebsiteAnalysis } from '@/types/WebsiteAnalysis'
// import { generateAndAnalyzeReport } from './generateAndAnalyzeReport'

// export async function getData(
//     url: string
// ): Promise<WebsiteAnalysis | undefined> {
//     const report = await generateAndAnalyzeReport(url)
//     return report
// }

import { WebsiteAnalysis } from '@/types/WebsiteAnalysis'
import path from 'path'
import fs from 'fs/promises'

export async function getData(
    url: string
): Promise<WebsiteAnalysis | undefined> {
    try {
        const filePath = path.join(process.cwd(), 'full-report.json')
        const jsonData = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(jsonData)
    } catch (error) {
        console.error('Error reading full-report.json:', error)
        return undefined
    }
}
