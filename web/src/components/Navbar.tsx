'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, MessageSquare, Zap } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Trang Chủ' },
  { href: '/about', label: 'Về Tôi' },
  { href: '/services', label: 'Dịch Vụ & Giá' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Liên Hệ' },
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
        background: scrolled
          ? 'rgba(8, 11, 20, 0.9)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(99, 102, 241, 0.15)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '72px',
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
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Zap size={18} color="white" />
          </div>
          <span
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: '20px',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            BizAI
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                color: pathname === link.href ? '#f1f5f9' : '#94a3b8',
                background: pathname === link.href ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                transition: 'all 0.2s ease',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            href="/chat"
            className="btn-primary hidden md:inline-flex"
            style={{ padding: '10px 20px', fontSize: '14px' }}
          >
            <MessageSquare size={16} />
            Chat AI
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '10px',
              color: '#f1f5f9',
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
            background: 'rgba(8, 11, 20, 0.98)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(99, 102, 241, 0.15)',
            padding: '16px 24px 24px',
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
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 500,
                textDecoration: 'none',
                color: pathname === link.href ? '#f1f5f9' : '#94a3b8',
                background: pathname === link.href ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                marginBottom: '4px',
                transition: 'all 0.2s ease',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/chat"
            onClick={() => setIsOpen(false)}
            className="btn-primary"
            style={{ marginTop: '12px', width: '100%', justifyContent: 'center' }}
          >
            <MessageSquare size={16} />
            Chat với AI
          </Link>
        </div>
      )}
    </header>
  )
}
