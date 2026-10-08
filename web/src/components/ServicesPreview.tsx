'use client'

import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

const previewServices = [
  {
    name: 'Website Doanh Nghiệp',
    description: 'Thiết kế & phát triển website chuyên nghiệp, SEO-friendly, tốc độ cao.',
    price: 'Từ 5,000,000đ',
    features: ['Thiết kế responsive', 'SEO cơ bản', 'Admin panel', 'Hosting setup'],
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(99,102,241,0.05))',
  },
  {
    name: 'Ứng Dụng Web (SaaS)',
    description: 'Xây dựng ứng dụng web phức tạp với đầy đủ backend, database và API.',
    price: 'Từ 15,000,000đ',
    features: ['Full-stack development', 'Database design', 'API integration', 'Deployment'],
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(168,85,247,0.05))',
    featured: true,
  },
  {
    name: 'App Di Động',
    description: 'Phát triển ứng dụng iOS & Android với React Native hoặc Flutter.',
    price: 'Từ 20,000,000đ',
    features: ['Cross-platform', 'UI/UX design', 'App Store publish', '3 tháng bảo hành'],
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(6,182,212,0.05))',
  },
]

export default function ServicesPreview() {
  return (
    <section style={{ padding: '100px 0', background: 'var(--bg-surface)' }}>
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-tag" style={{ margin: '0 auto 16px' }}>
            ✦ Dịch Vụ
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: '16px' }}>
            Dịch Vụ & <span className="gradient-text">Bảng Giá</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '17px', maxWidth: '500px', margin: '0 auto' }}>
            Giải pháp công nghệ phù hợp với từng nhu cầu và ngân sách của bạn.
          </p>
        </div>

        {/* Services Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {previewServices.map((service) => (
            <div
              key={service.name}
              style={{
                background: service.featured ? service.gradient : 'var(--bg-card)',
                border: `1px solid ${service.featured ? service.color + '40' : 'var(--border)'}`,
                borderRadius: '20px',
                padding: '32px',
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = `0 20px 40px ${service.color}20`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {service.featured && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '4px 16px',
                    borderRadius: '100px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  ★ Phổ Biến Nhất
                </div>
              )}

              {/* Color Indicator */}
              <div
                style={{
                  width: '48px',
                  height: '4px',
                  borderRadius: '2px',
                  background: service.color,
                  marginBottom: '20px',
                }}
              />

              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>{service.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                {service.description}
              </p>

              <div
                style={{
                  fontSize: '24px',
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  color: service.color,
                  marginBottom: '24px',
                }}
              >
                {service.price}
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {service.features.map((feature) => (
                  <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: `${service.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Check size={12} style={{ color: service.color }} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link href="/services" className="btn-secondary">
            Xem Đầy Đủ Bảng Giá
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
