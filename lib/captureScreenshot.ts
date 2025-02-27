import { Page } from 'puppeteer'

export async function captureScreenshot(page: Page): Promise<string> {
    const screenshotPath = `${process.cwd()}/screenshot.png`
    await page.screenshot({ path: screenshotPath, fullPage: true })
    return screenshotPath
}
