import express, { Application } from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import AllRoutes from './routes/router'
import swaggerUi from 'swagger-ui-express'
import swaggerConfig from './swaggerConfig'
import cookieParser from 'cookie-parser'
import global_error_handler from './app/middlewares/globalErrorHandler'
import WebSocket, { WebSocketServer } from 'ws'
const wss = new WebSocketServer({ port: 8080 })
const prisma = new PrismaClient()
const app: Application = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))
// Routes
app.use('/api/v1/', AllRoutes)

// Global error
app.use(global_error_handler)

// Store connected users and their socket connections
const activeUsers: Map<number, WebSocket> = new Map()

wss.on('connection', ws => {
  let userId: number

  ws.on('message', async message => {
    const parsedMessage = JSON.parse(message.toString())

    if (parsedMessage.type === 'USER_ACTIVE') {
      userId = parsedMessage.userId
      activeUsers.set(userId, ws)

      // Update Prisma to set user as active
      await prisma.user.update({
        where: { id: userId },
        data: { isActive: true },
      })
    }

    if (parsedMessage.type === 'USER_INACTIVE') {
      userId = parsedMessage.userId
      activeUsers.delete(userId)

      // Update Prisma to set user as inactive
      await prisma.user.update({
        where: { id: userId },
        data: { isActive: false },
      })
    }

    // Broadcast active users to all connected clients
    const activeUserIds = Array.from(activeUsers.keys())
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'ACTIVE_USERS', activeUserIds }))
      }
    })
  })

  ws.on('close', async () => {
    if (userId) {
      activeUsers.delete(userId)
      await prisma.user.update({
        where: { id: userId },
        data: { isActive: false },
      })
    }
  })
})

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
