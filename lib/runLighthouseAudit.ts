import lighthouse, { RunnerResult, Flags } from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

export interface LighthouseData {
    categories: {
        performance: { score: number }
        accessibility: { score: number }
        seo: { score: number }
        'best-practices': { score: number }
    }
    audits: {
        [key: string]: {
            score: number
            title: string
        }
    }
}

export async function runLighthouseAudit(
    url: string,
    port: number,
    device: 'mobile' | 'desktop' = 'mobile'
): Promise<LighthouseData> {
    try {
        const config: Flags = {
            port,
            output: 'json',
            logLevel: 'error',
            maxWaitForLoad: 45 * 1000,
            formFactor: device,
            onlyCategories: [
                'performance',
                'accessibility',
                'best-practices',
                'seo',
            ],
            // Use 'provided' instead of 'simulate' to avoid trace engine issues
            throttlingMethod: 'provided',
            skipAudits: ['screenshot', 'full-page-screenshot'],
            ...(device === 'mobile' && {
                screenEmulation: {
                    mobile: true,
                    width: 412,
                    height: 823,
                    deviceScaleFactor: 1.75,
                    disabled: false,
                },
                emulatedUserAgent:
                    'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36',
            }),
            ...(device === 'desktop' && {
                screenEmulation: {
                    mobile: false,
                    width: 1350,
                    height: 940,
                    deviceScaleFactor: 1,
                    disabled: false,
                },
                emulatedUserAgent:
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
            }),
        }

        const result: RunnerResult | undefined = await lighthouse(url, {
            ...config,
            // Add these settings to avoid performance mark issues
            settings: {
                onlyCategories: config.onlyCategories,
                formFactor: config.formFactor,
                throttlingMethod: config.throttlingMethod,
                screenEmulation: config.screenEmulation,
                emulatedUserAgent: config.emulatedUserAgent,
                skipAudits: config.skipAudits,
            },
        })

        if (!result || !result.report) {
            throw new Error('Lighthouse audit failed to produce results')
        }

        if (Array.isArray(result.report)) {
            throw new Error('Unexpected array format from Lighthouse report')
        }

        const reportJson = JSON.parse(result.report)

        return {
            categories: {
                performance: reportJson.categories.performance,
                accessibility: reportJson.categories.accessibility,
                seo: reportJson.categories.seo,
                'best-practices': reportJson.categories['best-practices'],
            },
            audits: reportJson.audits,
        }
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error occurred'
        throw new Error(`Lighthouse audit failed: ${errorMessage}`)
    }
}
