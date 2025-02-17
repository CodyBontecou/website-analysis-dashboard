// app/api/save-url/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// Type for the request body
interface SaveUrlRequest {
    url: string
}

// Type for database entry
interface UrlEntry {
    id: number
    url: string
    created_at: Date
}

export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const body: SaveUrlRequest = await request.json()

        // Validate the URL
        if (!body.url) {
            return NextResponse.json(
                { error: 'URL is required' },
                { status: 400 }
            )
        }

        try {
            new URL(body.url) // Will throw if URL is invalid
        } catch {
            return NextResponse.json(
                { error: 'Invalid URL format' },
                { status: 400 }
            )
        }

        // Save URL to database using the query helper
        const result = await query<UrlEntry>(
            `INSERT INTO urls (url, created_at)
       VALUES ($1, NOW())
       RETURNING id, url, created_at;`,
            [body.url]
        )

        const savedUrl = result.rows[0]

        return NextResponse.json({
            success: true,
            data: savedUrl,
        })
    } catch (error) {
        console.error('Error saving URL:', error)

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {
    try {
        // Get URL parameter from the request
        const searchParams = request.nextUrl.searchParams
        const urlParam = searchParams.get('url')

        if (!urlParam) {
            return NextResponse.json(
                { error: 'URL parameter is required' },
                { status: 400 }
            )
        }

        // Query the database using the query helper
        const result = await query<UrlEntry>(
            `SELECT id, url, created_at
       FROM urls
       WHERE url = $1
       ORDER BY created_at DESC
       LIMIT 1;`,
            [urlParam]
        )

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: 'URL not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            data: result.rows[0],
        })
    } catch (error) {
        console.error('Error retrieving URL:', error)

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
