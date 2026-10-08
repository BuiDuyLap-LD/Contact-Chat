'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, MessageSquare, Inbox, Settings, ExternalLink, Zap } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Tổng Quan', icon: LayoutDashboard },
  { href: '/inquiries', label: 'Khách Hàng & Liên Hệ', icon: Inbox },
  { href: '/chats', label: 'Lịch Sử Chat AI', icon: MessageSquare },
  { href: '/settings', label: 'Cấu Hình AI & CMS', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside
      style={{
        width: '260px',
        background: '#0a0f1d',
        borderRight: '1px solid var(--border)',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px', marginBottom: '32px' }}>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)',
          }}
        >
          <Zap size={18} color="white" />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '17px', color: '#f8fafc' }}>BizAI Admin</div>
          <div style={{ fontSize: '11px', color: '#10b981' }}>Hệ Thống Trực Tuyến</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                color: isActive ? '#f8fafc' : 'var(--text-secondary)',
                background: isActive ? 'rgba(99, 102, 241, 0.18)' : 'transparent',
                border: isActive ? '1px solid rgba(99, 102, 241, 0.35)' : '1px solid transparent',
                transition: 'all 0.2s ease',
              }}
            >
              <Icon size={18} style={{ color: isActive ? '#a5b4fc' : 'var(--text-muted)' }} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Quick link to Web */}
      <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
        <a
          href="https://contact-chat.vercel.app/"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 14px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          <span>Mở Website Khách Hàng</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </aside>
  )
}
