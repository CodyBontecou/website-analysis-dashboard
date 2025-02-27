// app/api/lighthouse/route.ts
// import { NextResponse } from 'next/server'
// import lighthouse, { RunnerResult } from 'lighthouse'
// import { launchBrowser } from '@/lib/launchBrowser'
// import { createLighthouseSummary } from '@/lib/createLighthouseSummary'
import { getData } from '@/lib/getData'

export async function POST(request: Request) {
    // let browser: any
    // try {
    //     const { url, device = 'mobile' } = await request.json()
    //     browser = await launchBrowser()
    //     await browser.newPage()
    //     const browserWSEndpoint = browser.wsEndpoint()
    //     const port = new URL(browserWSEndpoint).port
    //     const result: RunnerResult | undefined = await lighthouse(url, {
    //         port: parseInt(port),
    //         output: 'json',
    //         formFactor: device,
    //         screenEmulation:
    //             device === 'mobile'
    //                 ? {
    //                       mobile: true,
    //                       width: 412,
    //                       height: 823,
    //                       deviceScaleFactor: 1.75,
    //                   }
    //                 : {
    //                       mobile: false,
    //                       width: 1350,
    //                       height: 940,
    //                       deviceScaleFactor: 1,
    //                   },
    //         throttlingMethod: 'devtools',
    //         throttling: {
    //             cpuSlowdownMultiplier: device === 'mobile' ? 4 : 1,
    //             downloadThroughputKbps:
    //                 device === 'mobile' ? 1.6 * 1024 : 10 * 1024,
    //             uploadThroughputKbps: device === 'mobile' ? 750 : 10 * 1024,
    //             requestLatencyMs: device === 'mobile' ? 150 : 0,
    //         },
    //     })
    //     if (!result || !result.report) {
    //         throw new Error('Lighthouse audit failed to produce results')
    //     }
    //     // Type guard to ensure we're getting a single JSON report
    //     if (Array.isArray(result.report)) {
    //         throw new Error('Unexpected array format from Lighthouse report')
    //     }
    //     // const res = createLighthouseSummary(result.lhr)
    //     return NextResponse.json(res)
    // } catch (error) {
    //     return NextResponse.json({ error: error.message }, { status: 500 })
    // } finally {
    //     if (browser) await browser.close()
    // }

    const { url } = await request.json()
    const data = await getData(url)
    return data
}
