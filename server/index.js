require('dotenv').config()
const express  = require('express')
const cors     = require('cors')
const mongoose = require('mongoose')
const Admin    = require('./models/Admin')

const app = express()

const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean)

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true)
      return
    }

    callback(new Error('Not allowed by CORS'))
  },
}))
app.use(express.json())

// Routes
app.use('/api/contact', require('./routes/contact'))
app.use('/api/admin',   require('./routes/admin'))

app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', message: 'Portfolio API running ⚡' })
)

// MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio'
const PORT = process.env.PORT || 5001

const defaultAdminUsername = process.env.ADMIN_USERNAME || (process.env.NODE_ENV !== 'production' ? 'admin' : '')
const defaultAdminPassword = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV !== 'production' ? 'admin123' : '')

async function ensureAdminSeed() {
  if (!defaultAdminUsername || !defaultAdminPassword) {
    console.warn('! Admin bootstrap skipped. Set ADMIN_USERNAME and ADMIN_PASSWORD to seed an admin account.')
    return
  }

  const existingAdmin = await Admin.findOne({ username: defaultAdminUsername })
  if (existingAdmin) {
    console.log(`✓ Admin account ready for "${defaultAdminUsername}"`)
    return
  }

  await Admin.create({
    username: defaultAdminUsername,
    password: defaultAdminPassword,
  })
  console.log(`✓ Admin account created for "${defaultAdminUsername}"`)
}

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('✓ MongoDB connected')
    await ensureAdminSeed()

    app.listen(PORT, () => {
      console.log(`✓ Server running → http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('✗ Server startup failed:', err.message)
    process.exit(1)
  }
}

startServer()
