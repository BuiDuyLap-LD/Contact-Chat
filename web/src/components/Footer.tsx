import Link from 'next/link'
import { Mail, Phone, Zap, ArrowUpRight, Globe, Share2 } from 'lucide-react'

const footerLinks = [
  {
    title: 'Trang',
    links: [
      { label: 'Trang Chủ', href: '/' },
      { label: 'Về Tôi', href: '/about' },
      { label: 'Dịch Vụ & Giá', href: '/services' },
      { label: 'Portfolio', href: '/portfolio' },
    ],
  },
  {
    title: 'Liên Kết',
    links: [
      { label: 'Liên Hệ', href: '/contact' },
      { label: 'Chat AI', href: '/chat' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
        paddingTop: '60px',
        paddingBottom: '32px',
      }}
    >
      <div className="section-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            marginBottom: '48px',
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                marginBottom: '16px',
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
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.7', maxWidth: '260px' }}>
              Giải pháp công nghệ hiện đại cho doanh nghiệp của bạn. AI Chat hỗ trợ 24/7.
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              {[
                { icon: Globe, href: '#', label: 'Website' },
                { icon: Share2, href: '#', label: 'Mạng xã hội' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(99, 102, 241, 0.1)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
                {group.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'color 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
              Liên Hệ
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="mailto:email@example.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.2s ease',
                }}
              >
                <Mail size={15} style={{ color: 'var(--primary)' }} />
                email@example.com
              </a>
              <a
                href="tel:+84xxxxxxxxx"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.2s ease',
                }}
              >
                <Phone size={15} style={{ color: 'var(--primary)' }} />
                +84 xxx xxx xxx
              </a>
            </div>

            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '20px',
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                color: 'white',
                borderRadius: '10px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'opacity 0.2s ease',
              }}
            >
              Liên Hệ Ngay
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--border)', marginBottom: '24px' }} />

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            © {year} BizAI Portfolio. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            Powered by Next.js + Supabase + Gemini AI
          </p>
        </div>
      </div>
    </footer>
  )
}
