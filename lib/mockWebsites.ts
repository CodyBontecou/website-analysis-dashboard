export const websites = [
    {
        id: 1,
        metadata: {
            url: 'https://example.com',
            timestamp: '2023-05-01T12:00:00Z',
        },
        rawData: {
            url: 'https://example.com',
            mobileLighthouseSummary: {
                performance: 40,
                accessibility: 92,
                seo: 77,
                bestPractices: 61,
                issues: [
                    'Redirects HTTP traffic to HTTPS',
                    'First Contentful Paint',
                    'Largest Contentful Paint',
                    'First Meaningful Paint',
                    'Speed Index',
                ],
            },
            desktopLighthouseSummary: {
                performance: 96,
                accessibility: 92,
                seo: 77,
                bestPractices: 59,
                issues: [
                    'Redirects HTTP traffic to HTTPS',
                    'Largest Contentful Paint',
                ],
            },
        },
        analysis: {
            business_type: 'E-commerce',
            layout_score: 0.75,
            color_score: 0.8,
            typography_score: 0.85,
            clarity_score: 0.9,
            layout_feedback:
                'Good use of space, consider improving mobile layout',
            color_feedback: 'Color scheme is cohesive, could use more contrast',
            typography_feedback:
                'Font choices are appropriate, consider larger sizes for headings',
            clarity_feedback:
                'Clear messaging, call-to-actions could be more prominent',
            top_5_suggestions: [
                'Improve mobile layout',
                'Increase color contrast',
                'Enlarge heading sizes',
                'Make call-to-actions more prominent',
                'Optimize images for faster loading',
            ],
            overall_score: 0.82,
        },
    },
    {
        id: 2,
        metadata: {
            url: 'https://sample.org',
            timestamp: '2023-05-02T14:30:00Z',
        },
        rawData: {
            url: 'https://example.com',
            mobileLighthouseSummary: {
                performance: 40,
                accessibility: 92,
                seo: 77,
                bestPractices: 61,
                issues: [
                    'Redirects HTTP traffic to HTTPS',
                    'First Contentful Paint',
                    'Largest Contentful Paint',
                    'First Meaningful Paint',
                    'Speed Index',
                ],
            },
            desktopLighthouseSummary: {
                performance: 96,
                accessibility: 92,
                seo: 77,
                bestPractices: 59,
                issues: [
                    'Redirects HTTP traffic to HTTPS',
                    'Largest Contentful Paint',
                ],
            },
        },
        analysis: {
            business_type: 'Blog',
            layout_score: 8,
            color_score: 7.5,
            typography_score: 9,
            clarity_score: 8.5,
            layout_feedback:
                'Good content structure, sidebar could be improved',
            color_feedback: 'Consider a more vibrant color palette',
            typography_feedback: 'Excellent font choices and readability',
            clarity_feedback:
                'Clear categorization, search function could be more prominent',
            top_5_suggestions: [
                'Improve sidebar layout',
                'Implement a more vibrant color palette',
                'Make search function more prominent',
                'Add more whitespace between sections',
                'Implement lazy loading for images',
            ],
            overall_score: 7.8,
        },
    },
]
