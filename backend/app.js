import express from 'express'
import userRoutes from './src/routes/user.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://192.168.110.180:5173', 'https://edu-gamix.vercel.app'],
    credentials: true // Allows cookies/auth headers
  })
)
app.use(express.json())
app.use('/user', userRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
