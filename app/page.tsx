import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Globe, Zap, Shield, BarChart } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="border-b">
                <div className="flex h-16 items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-2">
                        <Globe className="h-6 w-6" />
                        <span className="text-xl font-bold">URLAnalyzer</span>
                    </div>
                    <nav className="hidden md:flex gap-6">
                        <Link
                            href="#features"
                            className="text-sm font-medium hover:underline underline-offset-4"
                        >
                            Features
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="text-sm font-medium hover:underline underline-offset-4"
                        >
                            How It Works
                        </Link>
                        <Link
                            href="#pricing"
                            className="text-sm font-medium hover:underline underline-offset-4"
                        >
                            Pricing
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-sm font-medium hover:underline underline-offset-4"
                        >
                            Log In
                        </Link>
                        <Button size="sm">Sign Up</Button>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                <section className="w-full py-16 md:py-28 lg:py-36 xl:py-48">
                    <div className="w-full px-4 md:px-8 max-w-5xl mx-auto">
                        <div className="flex flex-col items-center space-y-8 text-center">
                            <div className="space-y-4">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                                    Analyze any website in seconds
                                </h1>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                    Get instant insights, performance metrics,
                                    and SEO analysis for any URL
                                </p>
                            </div>
                            <div className="w-full max-w-sm space-y-2">
                                <form
                                    className="flex w-full max-w-lg flex-col gap-2 sm:flex-row"
                                    action="/analyze"
                                >
                                    <div className="flex-1">
                                        <div className="relative">
                                            <Input
                                                type="url"
                                                name="url"
                                                placeholder="Enter website URL"
                                                className="w-full pr-10"
                                                required
                                            />
                                            <Globe className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                        </div>
                                    </div>
                                    <Button type="submit" className="sm:w-auto">
                                        Analyze
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </form>
                                <p className="text-xs text-muted-foreground">
                                    Example: https://example.com
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="features"
                    className="w-full py-12 md:py-24 lg:py-32 bg-muted"
                >
                    <div className="w-full px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Powerful Analysis Tools
                                </h2>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                    Our platform provides comprehensive insights
                                    for any website
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                                <Zap className="h-12 w-12 text-primary" />
                                <h3 className="text-xl font-bold">
                                    Performance Metrics
                                </h3>
                                <p className="text-center text-muted-foreground">
                                    Analyze loading speed, resource usage, and
                                    core web vitals
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                                <Shield className="h-12 w-12 text-primary" />
                                <h3 className="text-xl font-bold">
                                    Security Scan
                                </h3>
                                <p className="text-center text-muted-foreground">
                                    Check for vulnerabilities, SSL issues, and
                                    security best practices
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                                <BarChart className="h-12 w-12 text-primary" />
                                <h3 className="text-xl font-bold">
                                    SEO Analysis
                                </h3>
                                <p className="text-center text-muted-foreground">
                                    Get insights on meta tags, headings,
                                    content, and ranking factors
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="how-it-works"
                    className="w-full py-12 md:py-24 lg:py-32"
                >
                    <div className="w-full px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    How It Works
                                </h2>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                    Three simple steps to get comprehensive
                                    website analysis
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
                            <div className="flex flex-col items-center space-y-2">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                                    1
                                </div>
                                <h3 className="text-xl font-bold">Enter URL</h3>
                                <p className="text-center text-muted-foreground">
                                    Paste any website URL into our analyzer tool
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                                    2
                                </div>
                                <h3 className="text-xl font-bold">
                                    Instant Analysis
                                </h3>
                                <p className="text-center text-muted-foreground">
                                    Our system scans the website and collects
                                    data
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                                    3
                                </div>
                                <h3 className="text-xl font-bold">
                                    Get Results
                                </h3>
                                <p className="text-center text-muted-foreground">
                                    Review detailed reports and actionable
                                    insights
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="border-t">
                <div className="w-full flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between md:py-12 px-4 md:px-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Globe className="h-6 w-6" />
                            <span className="text-xl font-bold">
                                URLAnalyzer
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} URLAnalyzer. All rights
                            reserved.
                        </p>
                    </div>
                    <nav className="flex gap-4 sm:gap-6">
                        <Link
                            href="#"
                            className="text-sm font-medium hover:underline underline-offset-4"
                        >
                            Terms
                        </Link>
                        <Link
                            href="#"
                            className="text-sm font-medium hover:underline underline-offset-4"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="#"
                            className="text-sm font-medium hover:underline underline-offset-4"
                        >
                            Contact
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    )
}
