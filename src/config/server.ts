import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
