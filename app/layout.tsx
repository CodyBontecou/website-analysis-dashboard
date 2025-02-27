import type React from 'react'
import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Website Analysis Dashboard',
    description: 'View and analyze website performance data',
    // themeColor: [
    //   { media: "(prefers-color-scheme: light)", color: "white" },
    //   { media: "(prefers-color-scheme: dark)", color: "black" },
    // ],
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
    generator: 'v0.dev',
}

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-background antialiased">
                <main className="flex-1">{children}</main>
            </body>
        </html>
    )
}

import './globals.css'
