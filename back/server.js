import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/v1/auth', authRouter)

app.get('/v1', (req, res) => {
  res.json({ status: 'ok', version: 'v1' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
