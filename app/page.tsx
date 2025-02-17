import type { Metadata } from 'next'
import Dashboard from '@/components/Dashboard'
import { getData } from '@/lib/getData'

export const metadata: Metadata = {
    title: 'Website Analysis Dashboard',
    description: 'View and analyze website performance data',
}

export default async function Page() {
    const data = getData()
    return <Dashboard data={data} />
}
