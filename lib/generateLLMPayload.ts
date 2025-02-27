import { readFile } from 'fs/promises'
import { auditWebsite } from './auditWebsite'
import {
    createLighthouseSummary,
    LighthouseSummary,
} from './createLighthouseSummary'

export interface LLMPayload {
    url: string
    mobileLighthouseSummary: LighthouseSummary
    desktopLighthouseSummary: LighthouseSummary
    screenshot: {
        base64: string
    }
}

export async function generateLLMPayload(url: string): Promise<LLMPayload> {
    // Get lighthouse and screenshot data
    const { mobileLighthouseData, desktopLighthouseData, screenshotPath } =
        await auditWebsite(url)

    debugger

    // Read and encode screenshot
    const screenshotBase64 = await readFile(screenshotPath, {
        encoding: 'base64',
    })

    debugger

    return {
        url,
        mobileLighthouseSummary: createLighthouseSummary(mobileLighthouseData),
        desktopLighthouseSummary: createLighthouseSummary(
            desktopLighthouseData
        ),
        screenshot: {
            base64: `data:image/png;base64,${screenshotBase64}`,
        },
    }
}
