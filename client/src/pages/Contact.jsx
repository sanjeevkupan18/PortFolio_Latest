import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../lib/api.js'

const SOCIALS = [
  {
    label: "GitHub",
    handle: "@sanjeevkupan18",
    url: "https://github.com/sanjeevkupan18",
    icon: "🐙",
    color: "#fff",
  },
  {
    label: "LinkedIn",
    handle: "/in/sanjeevkupan18",
    url: "https://www.linkedin.com/in/sanjeevkupan18/",
    icon: "💼",
    color: "#0077b5",
  },
  {
    label: "Twitter",
    handle: "@sanjeevkupan18",
    url: "https://x.com/Sanjeevkupan18",
    icon: "🐦",
    color: "#1da1f2",
  },
  {
    label: "Email",
    handle: "sanjeevkupan18@gmail.com",
    url: "mailto:sanjeevkupan18@gmail.com",
    icon: "📧",
    color: "#00fff5",
  },
];

const INFO = [
  { icon:'📍', label:'Location',      value:'India'                },
  { icon:'⚡', label:'Response Time', value:'Within 24 hours'      },
  { icon:'💼', label:'Open To',       value:'Freelance & Internships'},
  { icon:'🌏', label:'Availability',  value:'Remote / On-site'     },
]

function SuccessScreen({ onReset }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center glass-card rounded-2xl z-10">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 280 }}
        className="text-6xl mb-4">✅</motion.div>
      <h3 className="font-display text-xl neon-cyan mb-2">MESSAGE SENT!</h3>
      <p className="font-mono text-sm text-white/45 mb-6 text-center px-6">
        Message saved. I&apos;ll respond within 24 hours.
      </p>
      <div className="flex gap-3 mb-6">
        {[0,1,2].map(i => (
          <motion.div key={i} animate={{ y: [0,-10,0] }}
            transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
            className="w-2 h-2 rounded-full bg-cyan-400" />
        ))}
      </div>
      <button onClick={onReset} className="btn-outline text-xs">SEND ANOTHER</button>
    </motion.div>
  )
}

export default function Contact() {
  const [form,   setForm]   = useState({ name:'', email:'', message:'' })
  const [status, setStatus] = useState('idle')   // idle | loading | success | error
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim())                              e.name    = 'Name required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))e.email   = 'Valid email required'
    if (form.message.trim().length < 10)                e.message = 'Min 10 characters'
    return e
  }

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(p => ({ ...p, [e.target.name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('loading')
    try {
      await api.post('/api/contact', form)
      setStatus('success')
      setForm({ name:'', email:'', message:'' })
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-mesh grid-bg pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16">
          <p className="font-mono text-xs text-white/25 mb-2">// ESTABLISH CONNECTION</p>
          <h1 className="section-head gradient-text mb-2">CONTACT</h1>
          <p className="font-mono text-sm text-white/35">Available for freelance, internships &amp; collaborations</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Left: info */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }} className="space-y-5">

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-sm neon-green font-bold">AVAILABLE FOR HIRE</span>
              </div>
              <p className="font-mono text-sm text-white/55 leading-relaxed">
                Looking for exciting opportunities to collaborate on innovative web projects
                and data analytics solutions.
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="font-mono text-xs neon-cyan mb-4">// QUICK INFO</div>
              <div className="space-y-4">
                {INFO.map(it => (
                  <div key={it.label} className="flex items-center gap-3">
                    <span className="text-xl">{it.icon}</span>
                    <div>
                      <div className="font-mono text-xs text-white/28">{it.label}</div>
                      <div className="font-mono text-sm text-white">{it.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="font-mono text-xs neon-purple mb-4">// CONNECT</div>
              <div className="space-y-3">
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 group hover:pl-2 transition-all">
                    <span className="text-xl">{s.icon}</span>
                    <div className="flex-1">
                      <div className="font-mono text-xs text-white/28">{s.label}</div>
                      <div className="font-mono text-sm text-white/65 group-hover:text-cyan-400 transition-colors">
                        {s.handle}
                      </div>
                    </div>
                    <span className="text-white/18 group-hover:text-cyan-400 transition-colors">→</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}>
            <div className="glass-card p-8 relative">
              <div className="font-mono text-xs neon-green mb-6">// SEND MESSAGE</div>

              <AnimatePresence>
                {status === 'success' && <SuccessScreen onReset={() => setStatus('idle')} />}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label className="font-mono text-xs text-white/35 block mb-1.5">
                    <span className="neon-cyan">›</span> NAME
                  </label>
                  <input name="name" value={form.name} onChange={handleChange}
                    className={`w-full bg-black/30 border rounded px-4 py-3 font-mono text-sm text-white placeholder-white/18 outline-none transition-all focus:border-cyan-400/55 ${errors.name ? 'border-red-500' : 'border-white/10'}`}
                    placeholder="Your name" style={{ caretColor: '#00fff5' }} />
                  {errors.name && <p className="font-mono text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="font-mono text-xs text-white/35 block mb-1.5">
                    <span className="neon-cyan">›</span> EMAIL
                  </label>
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    className={`w-full bg-black/30 border rounded px-4 py-3 font-mono text-sm text-white placeholder-white/18 outline-none transition-all focus:border-cyan-400/55 ${errors.email ? 'border-red-500' : 'border-white/10'}`}
                    placeholder="your@email.com" style={{ caretColor: '#00fff5' }} />
                  {errors.email && <p className="font-mono text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="font-mono text-xs text-white/35 block mb-1.5">
                    <span className="neon-cyan">›</span> MESSAGE
                  </label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5}
                    className={`w-full bg-black/30 border rounded px-4 py-3 font-mono text-sm text-white placeholder-white/18 outline-none transition-all focus:border-cyan-400/55 resize-none ${errors.message ? 'border-red-500' : 'border-white/10'}`}
                    placeholder="Tell me about your project or opportunity…"
                    style={{ caretColor: '#00fff5' }} />
                  {errors.message && <p className="font-mono text-xs text-red-400 mt-1">{errors.message}</p>}
                  <div className="font-mono text-xs text-white/18 text-right mt-1">
                    {form.message.length}/500
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" disabled={status === 'loading'}
                  className={`w-full py-4 font-display text-sm tracking-widest transition-all ${status === 'loading' ? 'btn-outline opacity-60 cursor-not-allowed' : 'btn-filled'}`}>
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      TRANSMITTING...
                    </span>
                  ) : 'SEND MESSAGE ⚡'}
                </button>

                {status === 'error' && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="font-mono text-xs text-red-400 text-center">
                    Failed to send. Please try again.
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </div>

        {/* Location */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 glass-card p-6 text-center">
          <div className="font-mono text-xs text-white/25 mb-4">// LOCATION</div>
          <div className="w-full h-36 rounded-lg flex items-center justify-center"
            style={{ background:'rgba(0,255,245,.02)', border:'1px solid rgba(0,255,245,.08)' }}>
            <div>
              <div className="text-3xl mb-2">🌏</div>
              <div className="font-mono text-sm text-white/35">India — Remote worldwide</div>
              <div className="font-mono text-xs text-white/18 mt-1">IST (UTC +5:30)</div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
