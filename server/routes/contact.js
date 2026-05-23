const express = require('express')
const router  = express.Router()
const Message = require('../models/Message')

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body
    if (!name || !email || !message)
      return res.status(400).json({ message: 'All fields required' })
    const doc = await Message.create({ name, email, message })
    res.status(201).json({ success: true, message: 'Message saved!', id: doc._id })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

module.exports = router
