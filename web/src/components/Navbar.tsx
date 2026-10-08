'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, MessageSquare, Zap, Shield, Sparkles } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Trang Chủ' },
  { href: '/services', label: 'Dịch Vụ & Báo Giá' },
  { href: '/portfolio', label: 'Dự Án' },
  { href: '/about', label: 'Về Tôi' },
  { href: '/contact', label: 'Gửi Yêu Cầu' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(5, 7, 14, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(99, 102, 241, 0.2)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 24px',
          height: '76px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
            }}
          >
            <Zap size={20} color="white" />
          </div>
          <span
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 900,
              fontSize: '22px',
              letterSpacing: '-0.5px',
              background: 'linear-gradient(135deg, #ffffff, #a5b4fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            BizAI<span style={{ color: '#06b6d4' }}>.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="hidden md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '8px 18px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                color: pathname === link.href ? '#ffffff' : '#94a3b8',
                background: pathname === link.href ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                border: pathname === link.href ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                transition: 'all 0.2s ease',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions: Admin & Chat CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Admin link */}
          <Link
            href="/admin"
            title="Truy cập bảng điều khiển quản trị"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            className="hidden sm:inline-flex"
          >
            <Shield size={14} style={{ color: '#a855f7' }} />
            Quản Trị
          </Link>

          <Link
            href="/chat"
            className="btn-primary hidden md:inline-flex"
            style={{ padding: '10px 22px', fontSize: '14px' }}
          >
            <Sparkles size={16} />
            Hỏi Đáp AI
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42px',
              height: '42px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: '12px',
              color: '#f8fafc',
              cursor: 'pointer',
            }}
            className="md:hidden"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          style={{
            background: 'rgba(5, 7, 14, 0.98)',
            backdropFilter: 'blur(25px)',
            borderTop: '1px solid rgba(99, 102, 241, 0.2)',
            padding: '20px 24px 28px',
          }}
          className="md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                display: 'block',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                color: pathname === link.href ? '#ffffff' : '#94a3b8',
                background: pathname === link.href ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                marginBottom: '6px',
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <Link
              href="/chat"
              onClick={() => setIsOpen(false)}
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <MessageSquare size={16} />
              Hỏi Đáp AI
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 16px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border)',
                color: 'white',
                textDecoration: 'none',
                fontSize: '13px',
              }}
            >
              <Shield size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
