import { captureScreenshot } from './captureScreenshot'
import { launchBrowser } from './launchBrowser'
import { LighthouseData, runLighthouseAudit } from './runLighthouseAudit'

interface AuditResult {
    html: string
    mobileLighthouseData: LighthouseData
    desktopLighthouseData: LighthouseData
    screenshotPath: string
}

export async function auditWebsite(url: string): Promise<AuditResult> {
    let browser = null
    try {
        // Validate URL
        const parsedUrl = new URL(url)
        if (!parsedUrl.protocol.startsWith('http')) {
            throw new Error('Invalid URL: Must start with http:// or https://')
        }

        browser = await launchBrowser()
        const page = await browser.newPage()

        // Set a reasonable timeout
        await page.setDefaultNavigationTimeout(30000)

        const port = Number(new URL(browser.wsEndpoint()).port)
        if (!port) {
            throw new Error('Failed to get valid port from browser')
        }

        // Navigate with error handling
        const response = await page.goto(url)
        if (!response) {
            throw new Error(`Failed to load ${url}`)
        }
        if (!response.ok()) {
            throw new Error(
                `Failed to load ${url}: ${response.status()} ${response.statusText()}`
            )
        }

        const html = await page.content()
        const screenshotPath = await captureScreenshot(page)

        // Run audits sequentially to avoid resource conflicts
        const mobileLighthouseData = await runLighthouseAudit(
            url,
            port,
            'mobile'
        )
        const desktopLighthouseData = await runLighthouseAudit(
            url,
            port,
            'desktop'
        )

        return {
            html,
            mobileLighthouseData,
            desktopLighthouseData,
            screenshotPath,
        }
    } catch (error) {
        // Enhance error message
        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error occurred'
        throw new Error(`Website audit failed: ${errorMessage}`)
    } finally {
        if (browser) {
            await browser.close().catch(console.error)
        }
    }
}
