import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'
import { checkConnection } from './data/database.js'

const app = express()
const PORT = process.env.PORT || 3000
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

// credentials: true lets the frontend send and receive the session cookie;
// it requires an explicit origin rather than '*'.
app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/v1/auth', authRouter)

app.get('/v1', (req, res) => {
  res.json({ status: 'ok', version: 'v1' })
})

try {
  await checkConnection()
  console.log('Connected to PostgreSQL')
} catch (err) {
  console.error('Could not connect to PostgreSQL:', err.message)
  process.exit(1)
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
