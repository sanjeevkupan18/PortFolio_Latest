const express = require('express')
const router  = express.Router()
const jwt     = require('jsonwebtoken')
const Message = require('../models/Message')
const Admin   = require('../models/Admin')
const auth    = require('../middleware/auth')

const JWT_SECRET = process.env.JWT_SECRET || 'portfolio_secret_key_change_me'

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const admin = await Admin.findOne({ username })
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' })

    const valid = await admin.comparePassword(password)
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    )
    res.json({ token, username: admin.username })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// PATCH /api/admin/password — change admin password
router.patch('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'All password fields are required' })
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'New password must be at least 8 characters' })
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New password and confirm password must match' })
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ message: 'New password must be different from current password' })
    }

    const admin = await Admin.findById(req.admin.id)
    if (!admin) return res.status(404).json({ message: 'Admin not found' })

    const valid = await admin.comparePassword(currentPassword)
    if (!valid) return res.status(401).json({ message: 'Current password is incorrect' })

    admin.password = newPassword
    await admin.save()

    res.json({ success: true, message: 'Password updated successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// GET /api/admin/msg  — all messages (newest first)
router.get('/msg', auth, async (req, res) => {
  try {
    const msgs = await Message.find().sort({ createdAt: -1 })
    res.json(msgs)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// DELETE /api/admin/msg/:id
router.delete('/msg/:id', auth, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// PATCH /api/admin/msg/:id/read  — toggle read status
router.patch('/msg/:id/read', auth, async (req, res) => {
  try {
    const doc = await Message.findByIdAndUpdate(
      req.params.id, { read: req.body.read }, { new: true }
    )
    res.json(doc)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// PATCH /api/admin/msg/:id/reply  — save reply draft
router.patch('/msg/:id/reply', auth, async (req, res) => {
  try {
    const doc = await Message.findByIdAndUpdate(
      req.params.id, { replyDraft: req.body.replyDraft }, { new: true }
    )
    res.json(doc)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
