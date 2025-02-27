import puppeteer, { Browser } from 'puppeteer'

export async function launchBrowser(): Promise<Browser> {
    try {
        return await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--window-size=1920,1080',
            ],
            defaultViewport: {
                width: 1920,
                height: 1080,
            },
            timeout: 30000,
        })
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error occurred'
        throw new Error(`Failed to launch browser: ${errorMessage}`)
    }
}
