'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface NavItem {
  id: string
  label: string
}

interface RefData {
  title: string
  desc: string
  navItems: NavItem[]
  sections: Record<string, string>
}

function SectionContent({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    el.querySelectorAll<HTMLElement>('.entry-body').forEach(body => {
      const entry = body.closest('.entry')
      body.style.display = entry?.classList.contains('open') ? 'block' : 'none'
    })

    const heads = el.querySelectorAll<HTMLElement>('.entry-head')
    const handlers: Array<[HTMLElement, () => void]> = []
    heads.forEach(head => {
      const handler = () => {
        const entry = head.closest('.entry')
        if (!entry) return
        const isOpen = entry.classList.contains('open')
        const body = entry.querySelector<HTMLElement>('.entry-body')
        if (isOpen) {
          entry.classList.remove('open')
          if (body) body.style.display = 'none'
        } else {
          entry.classList.add('open')
          if (body) body.style.display = 'block'
        }
      }
      head.addEventListener('click', handler)
      handlers.push([head, handler])
    })

    return () => {
      handlers.forEach(([head, handler]) => head.removeEventListener('click', handler))
    }
  }, [html])

  return (
    <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
  )
}

export default function RefPage() {
  const params = useParams()
  const router = useRouter()
  const lib = params.lib as string

  const [data, setData] = useState<RefData | null>(null)
  const [activeTab, setActiveTab] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`/data/${lib}.json`)
      .then(r => {
        if (!r.ok) { router.push('/'); return null }
        return r.json()
      })
      .then((d: RefData | null) => {
        if (!d) return
        setData(d)
        setActiveTab(d.navItems[0]?.id ?? '')
        setLoading(false)
      })
      .catch(() => router.push('/'))
  }, [lib, router])

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: 'var(--bg)', color: 'var(--text3)',
        fontFamily: 'var(--sans)', fontSize: 13
      }}>
        로딩 중…
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="ref-layout">
      <button
        className="mobile-nav-toggle"
        onClick={() => setMobileNavOpen(v => !v)}
        aria-label="메뉴"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
        <span>{data.navItems.find(n => n.id === activeTab)?.label ?? ''}</span>
      </button>

      <aside className={`ref-sidebar ${mobileNavOpen ? 'open' : ''}`}>
        <div className="sidebar-back">
          <Link href="/" className="back-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            홈
          </Link>
        </div>
        <div className="sidebar-title">{data.title}</div>
        <nav>
          {data.navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'on' : ''}`}
              onClick={() => { setActiveTab(item.id); setMobileNavOpen(false) }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {mobileNavOpen && (
        <div className="mobile-overlay" onClick={() => setMobileNavOpen(false)} />
      )}

      <main className="ref-main">
        <div className="page-header">
          <h1>{data.title}</h1>
          {data.desc && <p>{data.desc}</p>}
        </div>

        {data.navItems.map(item => (
          <div key={item.id} style={{ display: activeTab === item.id ? 'block' : 'none' }}>
            <SectionContent html={data.sections[item.id] ?? ''} />
          </div>
        ))}
      </main>
    </div>
  )
}
