'use client'

import type {
    LighthouseMetrics,
    WebsiteAnalysis,
} from '@/types/WebsiteAnalysis'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Legend, Tooltip } from 'recharts'
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
} from 'recharts'

interface DashboardProps {
    data: WebsiteAnalysis
}

export default function Dashboard({ data }: DashboardProps) {
    const { metadata, rawData, analysis } = data

    console.log('data: ', data)

    const d = [
        {
            subject: 'Layout',
            value: analysis.layout_score,
            fullMark: 10,
        },
        {
            subject: 'Color',
            value: analysis.color_score,
            fullMark: 10,
        },
        {
            subject: 'Typography',
            value: analysis.typography_score,
            fullMark: 10,
        },
        {
            subject: 'Clarity',
            value: analysis.clarity_score,
            fullMark: 10,
        },
    ]

    return (
        <div className="container mx-auto p-4 space-y-4">
            <h1 className="text-3xl font-bold">Website Analysis Dashboard</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Metadata</CardTitle>
                    <CardDescription>
                        Basic information about the analyzed website
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        <strong>URL:</strong> {metadata.url}
                    </p>
                    <p>
                        <strong>Timestamp:</strong>{' '}
                        {new Date(metadata.timestamp).toLocaleString()}
                    </p>
                    <p>
                        <strong>Business Type:</strong> {analysis.business_type}
                    </p>
                </CardContent>
            </Card>

            <Tabs defaultValue="mobile">
                <TabsList>
                    <TabsTrigger value="mobile">Mobile</TabsTrigger>
                    <TabsTrigger value="desktop">Desktop</TabsTrigger>
                </TabsList>
                <TabsContent value="mobile">
                    <LighthouseScores
                        scores={rawData.mobileLighthouseSummary}
                    />
                </TabsContent>
                <TabsContent value="desktop">
                    <LighthouseScores
                        scores={rawData.desktopLighthouseSummary}
                    />
                </TabsContent>
            </Tabs>

            <Card>
                <CardHeader>
                    <CardTitle>Analysis Scores</CardTitle>
                    <CardDescription>
                        Breakdown of various aspects of the website
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                    <RadarChart
                        cx={300}
                        cy={250}
                        outerRadius={200}
                        width={600}
                        height={500}
                        data={d}
                    >
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 10]} />
                        <Radar
                            name="Analysis Score"
                            dataKey="value"
                            stroke="#2563eb"
                            fill="#2563eb"
                            fillOpacity={0.4}
                        />
                        <Tooltip />
                        <Legend />
                    </RadarChart>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Feedback</CardTitle>
                    <CardDescription>
                        Detailed feedback on various aspects
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p>
                        <strong>Layout:</strong> {analysis.layout_feedback}
                    </p>
                    <p>
                        <strong>Color:</strong> {analysis.color_feedback}
                    </p>
                    <p>
                        <strong>Typography:</strong>{' '}
                        {analysis.typography_feedback}
                    </p>
                    <p>
                        <strong>Clarity:</strong> {analysis.clarity_feedback}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Top 5 Suggestions</CardTitle>
                    <CardDescription>Key areas for improvement</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5">
                        {analysis.top_5_suggestions &&
                            analysis.top_5_suggestions.map(
                                (suggestion, index) => (
                                    <li key={index}>{suggestion}</li>
                                )
                            )}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Overall Score</CardTitle>
                    <CardDescription>
                        The website's overall performance score
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2">
                        <Progress
                            value={analysis.overall_score * 10}
                            className="w-full"
                        />
                        <span className="text-2xl font-bold">
                            {analysis.overall_score.toFixed(1)}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function LighthouseScores({ scores }: { scores: LighthouseMetrics }) {
    const metrics = {
        performance: scores.performance,
        accessibility: scores.accessibility,
        'best practices': scores['bestPractices'],
        seo: scores.seo,
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Lighthouse Scores</CardTitle>
                <CardDescription>
                    Performance metrics from Lighthouse
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(metrics).map(([key, value]) => (
                            <div
                                key={key}
                                className="flex flex-col items-center"
                            >
                                <Badge variant="outline" className="mb-2">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </Badge>
                                <Progress value={value} className="w-full" />
                                <span className="mt-1">{value}%</span>
                            </div>
                        ))}
                    </div>

                    {scores.issues.length > 0 && (
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="issues">
                                <AccordionTrigger className="text-sm font-medium">
                                    Issues Found ({scores.issues.length})
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {scores.issues.map((issue, index) => (
                                            <li
                                                key={index}
                                                className="text-sm text-gray-600"
                                            >
                                                {issue}
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
