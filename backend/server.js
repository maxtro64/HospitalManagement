import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoutes.js'

// app config
const app = express()
const port = process.env.PORT || 4000

// middlewares
app.use(express.json())

// CORS configuration
const allowedOrigins = [
  'https://hospital-management-frontend.onrender.com',
  'https://hospital-management-admin.onrender.com',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000'
]

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS policy'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token']
}

app.use(cors(corsOptions))

// db connection
connectDb()
connectCloudinary()

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send('API WORKING')
})

app.listen(port, () => console.log('Server Started', port))
