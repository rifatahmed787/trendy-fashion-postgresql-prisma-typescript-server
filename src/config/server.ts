import express from 'express'
import cors from 'cors'
import { authRoutes } from '../routes/authRoutes'

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(authRoutes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
