// lib/db.ts
import { Pool } from 'pg'

// Prevent multiple instances of Postgres client in development
declare global {
    var pg: Pool | undefined
}

const pool =
    globalThis.pg ||
    new Pool({
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT || '5432'),
        database: process.env.POSTGRES_DATABASE,
        ssl:
            process.env.NODE_ENV === 'production'
                ? { rejectUnauthorized: false }
                : false,
        max: 20, // Maximum number of clients in the pool
        idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
        connectionTimeoutMillis: 2000, // How long to wait for a connection
    })

if (process.env.NODE_ENV !== 'production') {
    globalThis.pg = pool
}

// Helper function to get pool connection
export async function getConnection() {
    const client = await pool.connect()
    return client
}

// Helper function to execute queries
export async function query<T>(text: string, params?: any[]) {
    const client = await pool.connect()
    try {
        return await client.query<T>(text, params)
    } finally {
        client.release()
    }
}

export default pool
