import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api.js'

const fmt = (d) => new Date(d).toLocaleString()

export default function AdminDashboard() {
  const [messages, setMessages] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState('')
  const [selected, setSelected] = useState(null)
  const [reply,    setReply]    = useState('')
  const [filter,   setFilter]   = useState('all')
  const [pwdForm,  setPwdForm]  = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [pwdStatus,  setPwdStatus]  = useState('idle')
  const [pwdError,   setPwdError]   = useState('')
  const [pwdSuccess, setPwdSuccess] = useState('')
  const nav = useNavigate()

  const token    = localStorage.getItem('admin_token')
  const username = localStorage.getItem('admin_user')
  const headers  = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    if (!token) { nav('/admin/login'); return }
    fetchAll()
  }, [])

  const fetchAll = async () => {
    try {
      const { data } = await api.get('/api/admin/msg', { headers })
      setMessages(data)
    } catch {
      setError('Session expired. Redirecting…')
      setTimeout(() => nav('/admin/login'), 2000)
    } finally {
      setLoading(false)
    }
  }

  const deleteMsg = async (id) => {
    await api.delete(`/api/admin/msg/${id}`, { headers })
    setMessages(p => p.filter(m => m._id !== id))
    if (selected?._id === id) setSelected(null)
  }

  const toggleRead = async (msg) => {
    const { data } = await api.patch(`/api/admin/msg/${msg._id}/read`, { read: !msg.read }, { headers })
    setMessages(p => p.map(m => m._id === msg._id ? data : m))
    if (selected?._id === msg._id) setSelected(data)
  }

  const saveReply = async () => {
    const { data } = await api.patch(`/api/admin/msg/${selected._id}/reply`, { replyDraft: reply }, { headers })
    setMessages(p => p.map(m => m._id === selected._id ? data : m))
    setSelected(data)
  }

  const selectMsg = (msg) => {
    setSelected(msg); setReply(msg.replyDraft || '')
    if (!msg.read) toggleRead(msg)
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    nav('/admin/login')
  }

  const openGmailReply = (msg) => {
    const params = new URLSearchParams({
      view: 'cm',
      fs: '1',
      to: msg.email,
      su: `Reply to ${msg.name} from portfolio`,
    })

    window.open(`https://mail.google.com/mail/?${params.toString()}`, '_blank', 'noopener,noreferrer')
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setPwdError('')
    setPwdSuccess('')

    if (!pwdForm.currentPassword || !pwdForm.newPassword || !pwdForm.confirmPassword) {
      setPwdError('Fill in all password fields')
      return
    }

    if (pwdForm.newPassword.length < 8) {
      setPwdError('New password must be at least 8 characters')
      return
    }

    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      setPwdError('New password and confirm password must match')
      return
    }

    setPwdStatus('loading')
    try {
      const { data } = await api.patch('/api/admin/password', pwdForm, { headers })
      setPwdSuccess(data.message || 'Password updated successfully')
      setPwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setPwdError(err.response?.data?.message || 'Password update failed')
    } finally {
      setPwdStatus('idle')
    }
  }

  const filtered = messages.filter(m =>
    filter === 'all' ? true : filter === 'unread' ? !m.read : m.read
  )
  const unread = messages.filter(m => !m.read).length

  if (loading) return (
    <div className="min-h-screen bg-cyber flex items-center justify-center">
      <div className="font-mono text-sm neon-cyan animate-pulse">Loading dashboard…</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-cyber grid-bg flex flex-col">

      {/* Top bar */}
      <div className="glass-dark border-b border-white/5 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="font-display text-sm neon-cyan">ADMIN PANEL</div>
          {unread > 0 && <span className="badge badge-cyan">{unread} UNREAD</span>}
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-white/30">👤 {username}</span>
          <button onClick={logout} className="btn-outline text-xs py-2 px-4">LOGOUT</button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <div className="w-80 border-r border-white/5 flex flex-col flex-shrink-0">
          {/* Filter tabs */}
          <div className="p-3 border-b border-white/5 flex gap-1">
            {['all','unread','read'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`flex-1 py-1.5 rounded font-mono text-xs transition-all ${filter === f ? 'bg-cyan-400/15 text-cyan-400' : 'text-white/28 hover:text-white'}`}>
                {f.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="font-mono text-xs text-white/18 px-4 py-2">{filtered.length} messages</div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {error && <div className="p-4 text-red-400 text-xs font-mono">{error}</div>}
            {filtered.length === 0 && (
              <div className="p-8 text-center font-mono text-xs text-white/18">No messages</div>
            )}
            {filtered.map(msg => (
              <div key={msg._id} onClick={() => selectMsg(msg)}
                className={`p-4 border-b border-white/5 cursor-pointer transition-all hover:bg-white/[0.02] ${selected?._id === msg._id ? 'bg-cyan-400/[0.04] border-l-2 border-l-cyan-400' : ''}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {!msg.read && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />}
                      <span className="font-mono text-sm text-white truncate font-semibold">{msg.name}</span>
                    </div>
                    <div className="font-mono text-xs text-white/35 truncate mt-0.5">{msg.email}</div>
                    <div className="font-mono text-xs text-white/25 truncate mt-1">{msg.message}</div>
                  </div>
                  <div className="font-mono text-xs text-white/18 text-right flex-shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail pane */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 pb-0">
            <div className="glass-card p-6">
              <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
                <div>
                  <div className="font-mono text-xs neon-cyan mb-2">// SECURITY</div>
                  <h2 className="font-display text-lg text-white">Change Admin Password</h2>
                  <p className="font-mono text-xs text-white/25 mt-1">
                    Update your admin credentials without leaving the dashboard.
                  </p>
                </div>
                <div className="font-mono text-xs text-white/20">
                  Signed in as {username}
                </div>
              </div>

              <form onSubmit={handlePasswordChange} className="grid grid-cols-1 xl:grid-cols-3 gap-4" noValidate>
                <div>
                  <label className="font-mono text-xs text-white/35 block mb-1.5">CURRENT PASSWORD</label>
                  <input
                    type="password"
                    value={pwdForm.currentPassword}
                    onChange={e => setPwdForm(p => ({ ...p, currentPassword: e.target.value }))}
                    className="w-full bg-black/40 border border-white/10 rounded px-4 py-3 font-mono text-sm text-white placeholder-white/18 outline-none focus:border-cyan-400/55 transition-all"
                    placeholder="Current password"
                    autoComplete="current-password"
                    style={{ caretColor: '#00fff5' }}
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-white/35 block mb-1.5">NEW PASSWORD</label>
                  <input
                    type="password"
                    value={pwdForm.newPassword}
                    onChange={e => setPwdForm(p => ({ ...p, newPassword: e.target.value }))}
                    className="w-full bg-black/40 border border-white/10 rounded px-4 py-3 font-mono text-sm text-white placeholder-white/18 outline-none focus:border-cyan-400/55 transition-all"
                    placeholder="Minimum 8 characters"
                    autoComplete="new-password"
                    style={{ caretColor: '#00fff5' }}
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-white/35 block mb-1.5">CONFIRM PASSWORD</label>
                  <input
                    type="password"
                    value={pwdForm.confirmPassword}
                    onChange={e => setPwdForm(p => ({ ...p, confirmPassword: e.target.value }))}
                    className="w-full bg-black/40 border border-white/10 rounded px-4 py-3 font-mono text-sm text-white placeholder-white/18 outline-none focus:border-cyan-400/55 transition-all"
                    placeholder="Repeat new password"
                    autoComplete="new-password"
                    style={{ caretColor: '#00fff5' }}
                  />
                </div>

                {(pwdError || pwdSuccess) && (
                  <div className={`xl:col-span-3 rounded border px-4 py-3 font-mono text-xs ${
                    pwdError
                      ? 'border-red-500/30 text-red-400'
                      : 'border-emerald-500/30 text-emerald-400'
                  }`}>
                    {pwdError || pwdSuccess}
                  </div>
                )}

                <div className="xl:col-span-3 flex justify-end">
                  <button
                    type="submit"
                    disabled={pwdStatus === 'loading'}
                    className="btn-filled text-xs py-3 px-5 min-w-52"
                  >
                    {pwdStatus === 'loading' ? 'UPDATING PASSWORD…' : 'UPDATE PASSWORD'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div key={selected._id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }} className="p-8">

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-display text-xl text-white mb-1">{selected.name}</h2>
                    <a href={`mailto:${selected.email}`} className="font-mono text-sm neon-cyan hover:underline">
                      {selected.email}
                    </a>
                    <div className="font-mono text-xs text-white/25 mt-1">{fmt(selected.createdAt)}</div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => openGmailReply(selected)}
                      className="btn-filled text-xs py-2 px-3">
                      ↗ REPLY IN GMAIL
                    </button>
                    <button onClick={() => toggleRead(selected)}
                      className={`btn-outline text-xs py-2 px-3 ${selected.read ? 'border-yellow-400/35 text-yellow-400' : ''}`}>
                      {selected.read ? '◑ MARK UNREAD' : '✓ MARK READ'}
                    </button>
                    <button onClick={() => deleteMsg(selected._id)}
                      className="font-mono text-xs px-3 py-2 border border-red-500/35 text-red-400 hover:bg-red-500/08 rounded transition-all">
                      🗑 DELETE
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="glass-card p-6 mb-6">
                  <div className="font-mono text-xs text-white/28 mb-3">// MESSAGE CONTENT</div>
                  <p className="font-mono text-sm text-white/75 leading-relaxed whitespace-pre-wrap">
                    {selected.message}
                  </p>
                </div>

                {/* Reply draft */}
                <div className="glass-card p-6">
                  <div className="font-mono text-xs neon-purple mb-3">// REPLY DRAFT (stored, not sent)</div>
                  <textarea value={reply} onChange={e => setReply(e.target.value)} rows={5}
                    className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 font-mono text-sm text-white placeholder-white/18 outline-none focus:border-purple-400/55 transition-all resize-none"
                    placeholder="Write a draft reply… (stored only, not sent)"
                    style={{ caretColor: '#bf00ff' }} />
                  <div className="flex justify-end gap-3 mt-3">
                    <button onClick={() => setReply('')}
                      className="font-mono text-xs text-white/28 hover:text-white transition-colors px-3 py-2">
                      CLEAR
                    </button>
                    <button onClick={saveReply} className="btn-filled text-xs py-2 px-5">SAVE DRAFT</button>
                  </div>
                </div>

              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">📬</div>
                  <div className="font-display text-lg text-white/18">Select a message</div>
                  <div className="font-mono text-xs text-white/12 mt-2">{messages.length} total</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}
