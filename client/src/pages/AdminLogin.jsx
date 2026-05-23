import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api.js'

export default function AdminLogin() {
  const [form,   setForm]   = useState({ username: '', password: '' })
  const [status, setStatus] = useState('idle')
  const [error,  setError]  = useState('')
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading'); setError('')
    try {
      const { data } = await api.post('/api/admin/login', form)
      localStorage.setItem('admin_token', data.token)
      localStorage.setItem('admin_user',  data.username)
      nav('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      setStatus('idle')
    }
  }

  return (
    <div className="min-h-screen bg-cyber grid-bg flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md">

        {/* Terminal mock */}
        <div className="terminal-wrap mb-6">
          <div className="terminal-bar">
            <div className="t-dot bg-red-500" /><div className="t-dot bg-yellow-500" /><div className="t-dot bg-green-500" />
            <span className="font-mono text-xs text-white/28 ml-2">admin@portfolio:~$</span>
          </div>
          <div className="terminal-body text-xs space-y-1">
            <div className="neon-cyan">$ sudo access-control --panel admin</div>
            <div className="text-white/35">Authenticating secure channel…</div>
            <div className="neon-green">✓ Encryption: AES-256-GCM</div>
            <div className="neon-green">✓ JWT: Signed token auth</div>
            <div className="text-yellow-400">⚠ Enter credentials to proceed</div>
          </div>
        </div>

        {/* Login card */}
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <div className="font-display text-2xl neon-cyan mb-2">ADMIN ACCESS</div>
            <div className="font-mono text-xs text-white/28">Restricted zone · Credentials required</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="font-mono text-xs text-white/35 block mb-1.5">
                <span className="neon-cyan">›</span> USERNAME
              </label>
              <input type="text" value={form.username}
                onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                className="w-full bg-black/40 border border-white/10 rounded px-4 py-3 font-mono text-sm text-white placeholder-white/18 outline-none focus:border-cyan-400/55 transition-all"
                placeholder="admin" autoComplete="username"
                style={{ caretColor: '#00fff5' }} />
            </div>
            <div>
              <label className="font-mono text-xs text-white/35 block mb-1.5">
                <span className="neon-cyan">›</span> PASSWORD
              </label>
              <input type="password" value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                className="w-full bg-black/40 border border-white/10 rounded px-4 py-3 font-mono text-sm text-white placeholder-white/18 outline-none focus:border-cyan-400/55 transition-all"
                placeholder="••••••••" autoComplete="current-password"
                style={{ caretColor: '#00fff5' }} />
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                className="glass px-4 py-3 border border-red-500/28 rounded">
                <span className="font-mono text-xs text-red-400">⚠ {error}</span>
              </motion.div>
            )}

            <button type="submit" disabled={status === 'loading'}
              className="w-full btn-filled py-4 font-display text-sm tracking-widest">
              {status === 'loading' ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  AUTHENTICATING…
                </span>
              ) : 'ACCESS PANEL →'}
            </button>
          </form>

          
        </div>

        <div className="text-center mt-4">
          <a href="/" className="font-mono text-xs text-white/28 hover:neon-cyan transition-colors">
            ← BACK TO PORTFOLIO
          </a>
        </div>
      </motion.div>
    </div>
  )
}
