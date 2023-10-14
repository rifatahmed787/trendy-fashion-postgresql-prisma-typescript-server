import express, { Application } from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import AllRoutes from './routes/index'
import swaggerUi from 'swagger-ui-express'
import swaggerConfig from './swaggerConfig'

const prisma = new PrismaClient()
const app: Application = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))
// Routes
app.use('/api/v1/', AllRoutes)

// Start the server
async function main() {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
}

main()

// Graceful shutdown
process.on('SIGINT', () => {
  prisma.$disconnect()
  process.exit(0)
})
