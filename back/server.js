import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'
import { checkConnection } from './data/database.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

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
