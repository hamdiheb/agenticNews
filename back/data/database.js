import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
})

// An idle client can lose its connection (e.g. the database restarts);
// log it instead of letting the unhandled error crash the server.
pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error', err)
})

export const query = (text, params) => pool.query(text, params)

export async function checkConnection() {
  await pool.query('select 1')
}

export default pool
