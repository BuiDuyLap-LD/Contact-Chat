'use client'

import Link from 'next/link'
import { Zap, ArrowUpRight, MessageSquare, ShieldCheck, Clock } from 'lucide-react'

const footerLinks = [
  {
    title: 'Khám Phá',
    links: [
      { label: 'Trang Chủ', href: '/' },
      { label: 'Dịch Vụ & Báo Giá', href: '/services' },
      { label: 'Dự Án Đã Làm', href: '/portfolio' },
      { label: 'Về Tôi', href: '/about' },
    ],
  },
  {
    title: 'Hỗ Trợ & Tương Tác',
    links: [
      { label: 'Trợ Lý AI 24/7', href: '/chat' },
      { label: 'Gửi Yêu Cầu Dự Án', href: '/contact' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: 'rgba(5, 7, 14, 0.95)',
        borderTop: '1px solid rgba(99, 102, 241, 0.2)',
        paddingTop: '64px',
        paddingBottom: '36px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="section-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px',
            marginBottom: '48px',
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: '320px' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
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
                  boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)',
                }}
              >
                <Zap size={18} color="white" />
              </div>
              <span
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: '20px',
                  color: 'white',
                }}
              >
                BizAI<span style={{ color: '#06b6d4' }}>.</span>
              </span>
            </Link>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>
              Nền tảng kiến trúc giải pháp số & chuyển đổi công nghệ. Tối ưu thời gian đưa sản phẩm ra thị trường với chi phí minh bạch.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#10b981' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
              Trợ lý AI sẵn sàng tư vấn 24/7
            </div>
          </div>

          {/* Nav Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {group.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#c7d2fe')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Quick Consultation CTA */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Kết Nối & Tư Vấn
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
              Bạn có câu hỏi về ý tưởng kinh doanh hoặc cần ước tính chi phí sơ bộ? Hãy trò chuyện trực tiếp với Trợ lý AI hoặc gửi form yêu cầu.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link
                href="/chat"
                className="btn-primary"
                style={{ padding: '10px 18px', fontSize: '13px', justifyContent: 'center' }}
              >
                <MessageSquare size={15} />
                Mở Trợ Lý AI Chat
              </Link>
              <Link
                href="/contact"
                className="btn-secondary"
                style={{ padding: '10px 18px', fontSize: '13px', justifyContent: 'center' }}
              >
                Gửi Yêu Cầu Dự Án
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(99, 102, 241, 0.15)', marginBottom: '24px' }} />

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
            © {year} BizAI Platform. Toàn bộ mã nguồn bàn giao độc quyền.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} style={{ color: '#10b981' }} /> Cam kết bảo mật NDA
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} style={{ color: '#818cf8' }} /> Phản hồi trong 2 giờ
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
