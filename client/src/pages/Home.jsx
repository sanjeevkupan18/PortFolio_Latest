import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-router-dom'
import heroImage from '../assets/profile.png'
import resumePdf from '../assets/Sanjeev_Resume (2).pdf'
import {
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiMysql,
  SiPython, SiJavascript, SiGit, SiTailwindcss, SiPostman,
} from 'react-icons/si'
import { TbPower } from 'react-icons/tb'
import { IoLogoTableau } from "react-icons/io5";


const TECH = [
  { Icon: SiReact,       color: '#61DAFB', label: 'React'    },
  { Icon: SiNodedotjs,   color: '#339933', label: 'Node'     },
  { Icon: SiExpress,     color: '#ffffff', label: 'Express'  },
  { Icon: SiMongodb,     color: '#47A248', label: 'MongoDB'  },
  { Icon: SiMysql,       color: '#4479A1', label: 'MySQL'    },
  { Icon: SiPython,      color: '#3776AB', label: 'Python'   },
  { Icon: SiJavascript,  color: '#F7DF1E', label: 'JS'       },
  { Icon: SiGit,         color: '#F05032', label: 'Git'      },
  { Icon: SiTailwindcss, color: '#06B6D4', label: 'Tailwind' },
  { Icon: IoLogoTableau, color: '#F2C811', label: 'Tableau' },
  { Icon: SiPostman,     color: '#FF6C37', label: 'Postman'  },
]

const FOLDERS = [
  { label: 'About',    icon: '👤', to: '/about',    color: '#00fff5' },
  { label: 'Skills',   icon: '⚔️', to: '/skills',   color: '#bf00ff' },
  { label: 'Projects', icon: '🚀', to: '/projects', color: '#00ff88' },
  { label: 'Contact',  icon: '📡', to: '/contact',  color: '#ff6b00' },
]

const STATS = [
  { label: 'Projects Built',  value: '15+' },
  { label: 'Technologies',    value: '20+' },
  { label: 'Lines of Code',   value: '50K+' },
  { label: 'Cups of Coffee',  value: '∞'   },
]

const BLOG_POST = {
  title: 'The Power of Being Multi-Domain: Web Developer + Data Analyst',
  intro: [
    'In today’s fast-evolving tech industry, being skilled in just one domain is no longer the only path to success. While specialization still holds value, there is a growing demand for professionals who can bridge multiple domains and bring a more holistic approach to problem-solving.',
    'One such powerful combination is being both a Web Developer and a Data Analyst.',
  ],
  sections: [
    {
      title: 'Why Multi-Domain Skills Matter',
      paragraphs: [
        'Technology is no longer siloed. Modern products are built at the intersection of multiple disciplines: development, data, design, and user experience. Companies are actively looking for individuals who can connect these dots.',
        'Having expertise in both web development and data analytics allows you to:',
      ],
      bullets: [
        'Build applications',
        'Understand user behavior',
        'Make data-driven improvements',
      ],
      outro: 'This makes you not just a developer, but a problem solver with business impact.',
    },
    {
      title: 'The Perfect Combination',
      subsections: [
        {
          title: '1. Building Smarter Applications',
          paragraphs: [
            'As a web developer, you can create full-stack applications. As a data analyst, you can:',
          ],
          bullets: [
            'Track user interactions',
            'Analyze engagement',
            'Optimize features',
          ],
          outro: 'Result: Applications that are not just functional, but intelligent and optimized.',
        },
        {
          title: '2. Data-Driven Decision Making',
          paragraphs: [
            'Most developers build features based on assumptions. But when you understand data:',
          ],
          bullets: [
            'You validate ideas with real insights',
            'You improve UI/UX using analytics',
            'You make better product decisions',
          ],
          outro: 'This gives you a huge edge in product-based companies.',
        },
        {
          title: '3. End-to-End Ownership',
          paragraphs: [
            'Companies value developers who can handle more than just coding.',
            'With dual skills, you can:',
          ],
          bullets: [
            'Build the backend and frontend',
            'Analyze database trends',
            'Create dashboards for stakeholders',
          ],
          outro: 'You become a one-person powerhouse.',
        },
        {
          title: '4. Better Career Opportunities',
          paragraphs: [
            'Multi-domain professionals often:',
          ],
          bullets: [
            'Get shortlisted faster',
            'Fit into multiple roles',
            'Have higher growth potential',
          ],
          noteTitle: 'Roles you can target',
          noteItems: [
            'Full Stack Developer',
            'Data Analyst',
            'Data-driven Product Engineer',
            'Business Intelligence Developer',
          ],
        },
        {
          title: '5. Strong Freelancing Advantage',
          paragraphs: [
            'Freelancers with combined skills can:',
          ],
          bullets: [
            'Build websites',
            'Integrate analytics',
            'Deliver insights to clients',
          ],
          outro: 'This increases your value per project and earning potential.',
        },
      ],
    },
    {
      title: 'Industry Trends Supporting Multi-Skilling',
      paragraphs: [
        'The industry is shifting towards:',
      ],
      bullets: [
        'Data-centric applications',
        'AI-powered platforms',
        'User behavior analytics',
      ],
      noteTitle: 'Companies want people who can',
      noteItems: [
        'Build systems',
        'Understand data',
        'Improve performance',
      ],
      outro: 'Multi-domain developers fit perfectly into this demand.',
    },
    {
      title: 'Real-World Example',
      paragraphs: [
        'Imagine building an e-commerce website:',
      ],
      bullets: [
        'As a developer: You build the platform',
        'As an analyst: You track which products users click',
        'As an analyst: You find where users drop off',
        'As an analyst: You uncover what drives conversions',
      ],
      outro: 'You don’t just build the product, you continuously improve it.',
    },
    {
      title: 'Challenges of Multi-Domain Learning',
      paragraphs: [
        'It’s not always easy. Some challenges include:',
      ],
      bullets: [
        'Managing time between domains',
        'Avoiding shallow knowledge',
        'Staying updated in both fields',
      ],
      noteTitle: 'Solution',
      noteItems: [
        'Focus on integration, not perfection',
        'Learn by building real projects',
        'Use one domain to support the other',
      ],
    },
    {
      title: 'How to Get Started',
      ordered: [
        'Master core web development (MERN stack)',
        'Learn data analytics tools: Python (Pandas, NumPy), SQL, and Power BI / Tableau',
        'Build projects that combine both: analytics dashboards, data-driven web apps, and visualization tools',
      ],
    },
    {
      title: 'Final Thoughts',
      paragraphs: [
        'Being a Web Developer + Data Analyst is not just a skill combination, it’s a career advantage.',
      ],
      bullets: [
        'Build systems',
        'Understand users',
        'Improve outcomes',
      ],
      outro: 'In a world driven by data and technology, this combination makes you more valuable, more versatile, and more future-ready.',
      quote: 'Don’t just build applications. Build intelligent systems powered by data.',
    },
  ],
}

const FOCUS_AREAS = [
  { label: 'DSA',            value: 18, color: '#00fff5' },
  { label: 'Development',    value: 28, color: '#ff6b00' },
  { label: 'Data Analytics', value: 16, color: '#bf00ff' },
  { label: 'GATE',           value: 14, color: '#00ff88' },
  { label: 'Academics',      value: 12, color: '#f7df1e' },
  { label: 'Exploring',      value: 12, color: '#61dafb' },
]

const HIRE_ME_POINTS = [
  {
    icon: '⚡',
    title: 'Fast Learner',
    desc: 'I adapt quickly to new tools, stacks, and workflows, then turn that learning into usable output fast.',
    color: '#00fff5',
  },
  {
    icon: '🧠',
    title: 'Problem Solver',
    desc: 'I like breaking complex problems into practical steps and shipping solutions that actually help users.',
    color: '#bf00ff',
  },
  {
    icon: '🚀',
    title: 'Full Stack + Data Combo',
    desc: 'I can build the product and also understand the data behind its usage, growth, and performance.',
    color: '#00ff88',
  },
  {
    icon: '📊',
    title: 'Data-driven Mindset',
    desc: 'I prefer informed decisions, measurable improvements, and product thinking grounded in real signals.',
    color: '#ff6b00',
  },
]

const PIE_SIZE = 220
const PIE_STROKE = 38
const PIE_RADIUS = (PIE_SIZE - PIE_STROKE) / 2
const PIE_CIRCUMFERENCE = 2 * Math.PI * PIE_RADIUS

const FOCUS_PIE_SEGMENTS = FOCUS_AREAS.reduce((acc, area) => {
  const offset = acc.length === 0
    ? 0
    : acc[acc.length - 1].offset + acc[acc.length - 1].value

  acc.push({
    ...area,
    offset,
    dash: (area.value / 100) * PIE_CIRCUMFERENCE,
  })

  return acc
}, [])

function BlogArticleContent() {
  return (
    <div className="space-y-8">
      {BLOG_POST.sections.map((section) => (
        <section key={section.title} className="rounded-3xl border border-white/6 bg-white/[0.02] p-5 sm:p-6">
          <h4 className="font-display text-2xl text-white mb-4">{section.title}</h4>

          {section.paragraphs?.map((para) => (
            <p key={para} className="font-body text-base leading-8 text-white/66 mb-4">
              {para}
            </p>
          ))}

          {section.bullets && (
            <ul className="space-y-2 mb-4">
              {section.bullets.map((item) => (
                <li key={item} className="font-body text-base text-white/72 flex gap-3 leading-8">
                  <span className="text-cyan-300 mt-0.5">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {section.ordered && (
            <ol className="space-y-3 mb-4">
              {section.ordered.map((item, index) => (
                <li key={item} className="font-body text-base text-white/72 flex gap-3 leading-8">
                  <span className="text-cyan-300">{index + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          )}

          {section.subsections && (
            <div className="space-y-6">
              {section.subsections.map((sub) => (
                <div key={sub.title} className="rounded-2xl border border-white/6 bg-black/20 p-5">
                  <h5 className="font-display text-xl text-white mb-3">{sub.title}</h5>

                  {sub.paragraphs?.map((para) => (
                    <p key={para} className="font-body text-base leading-8 text-white/66 mb-4">
                      {para}
                    </p>
                  ))}

                  {sub.bullets && (
                    <ul className="space-y-2 mb-4">
                      {sub.bullets.map((item) => (
                        <li key={item} className="font-body text-base text-white/72 flex gap-3 leading-8">
                          <span className="text-cyan-300 mt-0.5">›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {sub.noteTitle && (
                    <div className="rounded-2xl border border-cyan-400/16 bg-cyan-400/[0.06] p-4 mb-4">
                      <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-cyan-300/75 mb-2">
                        {sub.noteTitle}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {sub.noteItems.map((item) => (
                          <span key={item} className="badge badge-cyan">{item}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {sub.outro && (
                    <p className="font-body text-base leading-8 text-white/78">
                      <span className="text-cyan-300">→ </span>
                      {sub.outro}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {section.noteTitle && (
            <div className="rounded-2xl border border-purple-400/16 bg-purple-400/[0.06] p-4 mb-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-purple-300/75 mb-2">
                {section.noteTitle}
              </div>
              <div className="flex flex-wrap gap-2">
                {section.noteItems.map((item) => (
                  <span key={item} className="badge badge-purple">{item}</span>
                ))}
              </div>
            </div>
          )}

          {section.outro && (
            <p className="font-body text-base leading-8 text-white/78">
              <span className="text-cyan-300">→ </span>
              {section.outro}
            </p>
          )}

          {section.quote && (
            <blockquote className="mt-5 rounded-2xl border border-cyan-400/18 bg-cyan-400/[0.05] p-5">
              <p className="font-display text-xl text-white leading-relaxed">
                “{section.quote}”
              </p>
            </blockquote>
          )}
        </section>
      ))}
    </div>
  )
}

const HERO_OBJECTS = [
  { tech: TECH[0],  pos: 'left-0 top-8 md:-left-6', tilt: '-rotate-12', delay: 0.0 },
  { tech: TECH[2],  pos: 'right-1 top-10 md:-right-4', tilt: 'rotate-12', delay: 0.4 },
  { tech: TECH[4],  pos: '-left-1 bottom-20 md:-left-10', tilt: 'rotate-6', delay: 0.8 },
  { tech: TECH[5],  pos: 'right-0 bottom-16 md:-right-6', tilt: '-rotate-6', delay: 1.2 },
  { tech: TECH[8],  pos: 'left-14 -bottom-2 md:left-10', tilt: '-rotate-12', delay: 1.6 },
  { tech: TECH[10], pos: 'right-12 -bottom-4 md:right-8', tilt: 'rotate-12', delay: 2.0 },
]

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [hoveredFocus, setHoveredFocus] = useState(null)
  const [articleOpen, setArticleOpen] = useState(false)

  useEffect(() => {
    const h = (e) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])

  const px = (mouse.x / window.innerWidth  - 0.5) * 22
  const py = (mouse.y / window.innerHeight - 0.5) * 22

  return (
    <div className="min-h-screen bg-mesh grid-bg relative overflow-hidden pt-20">

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="min-h-screen px-6 py-10 md:py-16 relative z-10 flex items-center">
        <div className="max-w-7xl mx-auto w-full grid items-center gap-10 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75 }}
            className="hero-finder relative"
          >
            <div className="hero-finder__bar flex flex-wrap items-center justify-between gap-4 px-5 py-4 ">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/35">
                  Launch Folder
                </span>
              </div>
              <span className="font-mono text-[11px] text-cyan-200/45">
                /Users/sanjeev/Desktop/portfolio/hero
              </span>
            </div>

            <div className="grid lg:grid-cols-[minmax(0,1fr)_230px]">
              <div className="p-6 sm:p-8 lg:p-10">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 badge badge-cyan mb-8">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  AVAILABLE FOR OPPORTUNITIES
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}>
                  <p className="font-mono text-sm text-white/30 mb-3 tracking-widest">
                    <span className="neon-cyan">{'>'}</span> HELLO, WORLD
                  </p>
                  <h1 className="font-display font-black leading-[0.92] mb-5"
                    style={{ fontSize: 'clamp(42px,6vw,36px)' }}>
                    <span className="gradient-text">Sanjeev Kumar</span>
                    <br />
                    <span className="text-white">Pandit</span>
                  </h1>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                  className="min-h-[56px] flex items-center mb-6">
                  <span className="font-mono text-xl neon-cyan mr-3">{'>'}</span>
                  <TypeAnimation
                    sequence={[
                      'I am a Web Developer',    2000,
                      'I am a Data Analyst',     2000,
                      'I am a Vibe Coder',       2000,
                      'I am a Coding Enthusiast',2000,
                      'I Build Digital Products',2000,
                      'I am a Gate 26 Qualifier',2000,
                    ]}
                    wrapper="span"
                    speed={55}
                    className="font-mono text-lg md:text-xl text-white"
                    repeat={Infinity}
                  />
                </motion.div>

                <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.62 }}
                  className="max-w-2xl font-mono text-sm leading-7 text-white/52 mb-8">
                  Building full-stack web experiences, data-driven dashboards, and creative interfaces
                  with a developer mindset that cares about polish as much as performance.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                  className="flex gap-4 flex-wrap">
                  <Link to="/projects" className="btn-filled">VIEW WORK</Link>
                  <Link to="/contact" className="btn-outline">HIRE ME</Link>
                  <a href={resumePdf} download="Sanjeev_Kumar_Pandit_CV.pdf" className="btn-outline">
                    DOWNLOAD CV
                  </a>
                </motion.div>
              </div>

              <div className="border-t border-white/5 bg-black/20 p-6 sm:p-8 lg:border-l lg:border-t-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/25 mb-5">
                  System Overview
                </p>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                  {STATS.map((s, i) => (
                    <motion.div key={s.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.85 + i * 0.08 }}
                      className="rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-4">
                      <div className="font-display text-2xl neon-cyan font-bold">{s.value}</div>
                      <div className="font-mono text-[11px] leading-5 text-white/35 mt-1">{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(0,255,245,0.16),_transparent_58%)] blur-3xl" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-8 rounded-full border border-cyan-400/10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-16 rounded-full border border-fuchsia-400/10"
            />

            <motion.div
              style={{ transform: `translate(${px * 0.35}px, ${py * 0.35}px)` }}
              className="hero-portrait-shell relative z-10 p-5 sm:p-7"
            >
              <div className="rounded-[28px] border border-white/8 bg-slate-950/70 p-3">
                <div className="relative overflow-hidden rounded-[24px] border border-cyan-400/20 bg-[radial-gradient(circle_at_top,_rgba(0,255,245,0.12),_transparent_45%),linear-gradient(180deg,_rgba(3,9,18,0.7),_rgba(3,9,18,0.95))]">
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(2,11,20,0.28))]" />
                  <img
                    src={heroImage}
                    alt="Sanjeev Kumar portrait"
                    className="relative z-10 mx-auto aspect-[4/5] w-full max-w-[360px] object-cover object-center"
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/8 bg-black/25 px-4 py-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">Role</div>
                  <div className="font-display text-lg text-white mt-1">Full Stack + Data Analyst</div>
                </div>
                <div className="rounded-2xl border border-white/8 bg-black/25 px-4 py-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">Mode</div>
                  <div className="font-display text-lg neon-cyan mt-1">Build / Deploy</div>
                </div>
              </div>
            </motion.div>

            {HERO_OBJECTS.map(({ tech, pos, tilt, delay }) => (
              <motion.div
                key={tech.label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                transition={{ duration: 5.2, delay, repeat: Infinity, ease: 'easeInOut' }}
                className={`hero-tech-chip ${pos} ${tilt}`}
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/80 shadow-2xl backdrop-blur-md"
                  style={{ boxShadow: `0 12px 36px ${tech.color}20` }}
                >
                  <tech.Icon style={{ color: tech.color }} className="text-2xl" />
                </div>
                <span className="mt-2 block font-mono text-[10px] tracking-[0.22em] text-white/45">
                  {tech.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── macOS Desktop ────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }} className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-mono text-xs text-white/25 mb-2">// NAVIGATE WORKSPACE</p>
            <h2 className="section-head neon-cyan">DESKTOP</h2>
          </div>

          <div className="glass rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            {/* macOS bar */}
            <div className="bg-black/40 px-4 py-3 flex items-center gap-2 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 font-mono text-xs text-white/25">portfolio.app — Finder</span>
            </div>
            <div className="p-10 grid grid-cols-2 md:grid-cols-4 gap-10 justify-items-center">
              {FOLDERS.map((f, i) => (
                <motion.div key={f.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}>
                  <Link to={f.to} className="mac-folder flex flex-col items-center gap-2 group">
                    <div className="w-20 h-16 rounded-lg relative flex items-end justify-center pb-2 text-3xl"
                      style={{
                        background: `linear-gradient(135deg,${f.color}28,${f.color}0a)`,
                        border: `1px solid ${f.color}28`,
                        boxShadow: `0 0 20px ${f.color}18`,
                      }}>
                      {/* folder tab */}
                      <div className="absolute top-0 left-2 w-8 h-2 rounded-t-lg"
                        style={{ background: f.color, opacity: 0.55 }} />
                      {f.icon}
                    </div>
                    <span className="font-mono text-xs text-white/50 group-hover:text-white transition-colors">
                      {f.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 py-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-10">
            <p className="font-mono text-xs text-white/25 mb-2">// OPENED FROM BLOG FOLDER</p>
            <h2 className="section-head text-white">MY ARTICLE POST</h2>
          </div>

          <div className="glass rounded-[28px] overflow-hidden border border-white/8 shadow-2xl">
            <div className="bg-black/40 px-4 py-3 flex items-center justify-between gap-4 border-b border-white/5 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 font-mono text-xs text-white/30">insights.blog — Finder Preview</span>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-200/45">
                Read Only
              </span>
            </div>

            <div className="grid lg:grid-cols-[240px_minmax(0,1fr)]">
              <div className="border-b border-white/5 bg-black/20 p-6 lg:border-b-0 lg:border-r">
                <div className="w-full rounded-2xl border border-cyan-400/16 bg-[linear-gradient(160deg,rgba(0,255,245,0.14),rgba(0,255,245,0.03))] p-5">
                  <div className="mac-folder flex flex-col items-center gap-3">
                    <div className="w-24 h-20 rounded-xl relative flex items-end justify-center pb-3 text-4xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0,255,245,0.24), rgba(0,255,245,0.07))',
                        border: '1px solid rgba(0,255,245,0.24)',
                        boxShadow: '0 0 24px rgba(0,255,245,0.12)',
                      }}>
                      <div className="absolute top-0 left-3 w-10 h-2.5 rounded-t-lg bg-cyan-300/60" />
                      📝
                    </div>
                    <div className="font-mono text-xs uppercase tracking-[0.26em] text-cyan-300/70">blog-post</div>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/30 mb-2">Category</div>
                    <div className="font-display text-lg text-white">Career Insight</div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/30 mb-2">Focus</div>
                    <div className="font-mono text-xs text-white/60 leading-6">
                      Web Development
                      <br />
                      Data Analytics
                      <br />
                      Multi-Skilling
                    </div>
                  </div>
                </div>
              </div>

              <article className="p-6 sm:p-8 lg:p-10">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 badge badge-cyan mb-5">
                    <span className="w-2 h-2 rounded-full bg-cyan-300" />
                    TECH ESSAY
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl text-white leading-tight mb-5">
                    {BLOG_POST.title}
                  </h3>

                  <div className="space-y-4 mb-8">
                    {BLOG_POST.intro.map((para) => (
                      <p key={para} className="font-body text-base leading-8 text-white/68">
                        {para}
                      </p>
                    ))}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3 mb-8">
                    {[
                      'Build systems that learn from users',
                      'Use analytics to improve product decisions',
                      'Create stronger career and freelancing leverage',
                    ].map((point) => (
                      <div key={point} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300/75 mb-2">
                          Preview Insight
                        </div>
                        <p className="font-body text-sm leading-7 text-white/66">{point}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-3xl border border-dashed border-cyan-400/20 bg-cyan-400/[0.04] p-5">
                    <p className="font-body text-base leading-8 text-white/72 mb-4">
                      This article breaks down why combining web development with data analytics creates smarter products,
                      stronger ownership, and better long-term opportunities.
                    </p>
                    <button onClick={() => setArticleOpen(true)} className="btn-filled">
                      READ FULL ARTICLE
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Tech Stack banner ────────────────────────────────── */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-mono text-xs text-white/25 mb-2">// TECH STACK</p>
          <h2 className="section-head text-white mb-10">WEAPONS OF CHOICE</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {TECH.map((t, i) => (
              <motion.div key={t.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, type: 'spring', stiffness: 220 }}
                className="glass-card px-4 py-3 flex items-center gap-2 hover:scale-105 transition-transform">
                <t.Icon style={{ color: t.color }} className="text-lg" />
                <span className="font-mono text-xs text-white/65">{t.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 pb-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="max-w-6xl mx-auto rounded-[32px] border border-white/8 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,245,0.12),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(191,0,255,0.12),_transparent_28%),rgba(4,9,18,0.78)] p-8 shadow-2xl backdrop-blur-md"
        >
          <div className="mb-8 text-center lg:text-left">
            <p className="font-mono text-xs text-white/25 mb-2">// FOCUS DISTRIBUTION</p>
            <h2 className="section-head text-white mb-3">CURRENT ENERGY SPLIT</h2>
            <p className="max-w-2xl font-mono text-xs leading-6 text-white/42">
              A quick snapshot of where my learning and building time is going right now.
            </p>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)]">
            <div className="flex flex-col items-center">
              <div className="relative flex h-[280px] w-[280px] items-center justify-center rounded-full border border-white/10 bg-black/25 shadow-[0_0_40px_rgba(0,255,245,0.12)]">
                <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                  <div className="focus-map-chip min-w-40 rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-2 text-center shadow-xl backdrop-blur-md">
                    {hoveredFocus ? (
                      <>
                        <div className="font-mono text-[10px] uppercase tracking-[0.26em]" style={{ color: hoveredFocus.color }}>
                          {hoveredFocus.label}
                        </div>
                        <div className="font-display text-2xl text-white">{hoveredFocus.value}%</div>
                      </>
                    ) : (
                      <>
                        <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/35">
                          Hover Slices
                        </div>
                        <div className="font-display text-lg text-white/72">Focus Map</div>
                      </>
                    )}
                  </div>
                </div>

                <svg
                  viewBox={`0 0 ${PIE_SIZE} ${PIE_SIZE}`}
                  className="relative z-10 h-[220px] w-[220px] -rotate-90"
                  aria-label="Pie chart showing focus split across DSA, Development, Data Analytics, GATE, Academics, and Exploring"
                >
                  <circle
                    cx={PIE_SIZE / 2}
                    cy={PIE_SIZE / 2}
                    r={PIE_RADIUS}
                    fill="none"
                    stroke="rgba(255,255,255,0.07)"
                    strokeWidth={PIE_STROKE}
                  />
                  {FOCUS_PIE_SEGMENTS.map((area) => (
                    <circle
                      key={area.label}
                      cx={PIE_SIZE / 2}
                      cy={PIE_SIZE / 2}
                      r={PIE_RADIUS}
                      fill="none"
                      stroke={area.color}
                      strokeWidth={hoveredFocus?.label === area.label ? PIE_STROKE + 6 : PIE_STROKE}
                      strokeDasharray={`${area.dash} ${PIE_CIRCUMFERENCE - area.dash}`}
                      strokeDashoffset={-(area.offset / 100) * PIE_CIRCUMFERENCE}
                      strokeLinecap="butt"
                      className="cursor-pointer transition-all duration-200"
                      style={{ filter: `drop-shadow(0 0 10px ${area.color}66)` }}
                      onMouseEnter={() => setHoveredFocus(area)}
                      onMouseLeave={() => setHoveredFocus(null)}
                    />
                  ))}
                </svg>

                <div className="focus-map-core absolute z-0 h-[112px] w-[112px] rounded-full border border-white/10 bg-slate-950/90 shadow-inner" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {FOCUS_AREAS.map((area, i) => (
                <motion.div
                  key={area.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-2xl border border-white/8 bg-black/20 p-4"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full shadow-[0_0_12px_currentColor]"
                        style={{ background: area.color, color: area.color }}
                      />
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/62">
                        {area.label}
                      </span>
                    </div>
                    <span className="font-display text-xl" style={{ color: area.color }}>
                      {area.value}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/6">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${area.value}%`,
                        background: `linear-gradient(90deg, ${area.color}, ${area.color}aa)`,
                        boxShadow: `0 0 16px ${area.color}55`,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 pb-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-10">
            <p className="font-mono text-xs text-white/25 mb-2">// VALUE SNAPSHOT</p>
            <h2 className="section-head text-white mb-3">WHY HIRE ME?</h2>
            <p className="max-w-2xl mx-auto font-mono text-xs leading-6 text-white/40">
              A few strengths I bring when building products, collaborating with teams, and solving real problems.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {HIRE_ME_POINTS.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="glass-card p-6"
                style={{ borderColor: `${point.color}26` }}
              >
                <div
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
                  style={{
                    background: `linear-gradient(135deg, ${point.color}24, ${point.color}0c)`,
                    boxShadow: `0 0 24px ${point.color}18`,
                  }}
                >
                  {point.icon}
                </div>
                <h3 className="font-display text-lg text-white mb-3">{point.title}</h3>
                <p className="font-body text-sm leading-7 text-white/62">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {articleOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-md px-4 py-6"
            onClick={() => setArticleOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="glass mx-auto flex max-h-[calc(100vh-3rem)] max-w-5xl flex-col overflow-hidden rounded-[28px] border border-white/8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-black/40 px-4 py-3 flex items-center justify-between gap-4 border-b border-white/5 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 font-mono text-xs text-white/30">insights.blog — Full Article</span>
                </div>
                <button onClick={() => setArticleOpen(false)} className="font-mono text-xs text-white/40 hover:text-white transition-colors">
                  [× CLOSE]
                </button>
              </div>

              <article className="overflow-y-auto p-6 sm:p-8 lg:p-10">
                <div className="max-w-3xl mx-auto">
                  <div className="inline-flex items-center gap-2 badge badge-cyan mb-5">
                    <span className="w-2 h-2 rounded-full bg-cyan-300" />
                    TECH ESSAY
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl text-white leading-tight mb-5">
                    {BLOG_POST.title}
                  </h3>

                  <div className="space-y-4 mb-8">
                    {BLOG_POST.intro.map((para) => (
                      <p key={para} className="font-body text-base leading-8 text-white/68">
                        {para}
                      </p>
                    ))}
                  </div>

                  <BlogArticleContent />
                </div>
              </article>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter egg hint */}
      <p className="absolute bottom-10 left-4 font-mono text-xs text-white/8 select-none pointer-events-none">
        // try konami code ↑↑↓↓←→←→BA
      </p>
    </div>
  )
}
