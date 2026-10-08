'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, MessageSquare, Code2, Sparkles, Star, TrendingUp, Users, Zap } from 'lucide-react'

const stats = [
  { label: 'Dự Án Hoàn Thành', value: '50+', icon: TrendingUp },
  { label: 'Khách Hàng Hài Lòng', value: '30+', icon: Users },
  { label: 'Năm Kinh Nghiệm', value: '5+', icon: Star },
  { label: 'Rating Trung Bình', value: '4.9★', icon: Sparkles },
]

const technologies = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL',
  'Supabase', 'AWS', 'Docker', 'Figma', 'Flutter', 'AI/ML',
]

export default function HeroSection() {
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current) return
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 30
      const y = (clientY / window.innerHeight - 0.5) * 30
      orbRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
      }}
      className="grid-background"
    >
      {/* Animated orb background */}
      <div
        ref={orbRef}
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.08) 40%, transparent 70%)',
          pointerEvents: 'none',
          transition: 'transform 0.1s ease-out',
          zIndex: 0,
        }}
      />

      {/* Secondary glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="section-container" style={{ position: 'relative', zIndex: 1, padding: '60px 24px' }}>
        {/* Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '100px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#818cf8',
            }}
          >
            <Sparkles size={14} />
            AI-Powered Business Portfolio
            <Sparkles size={14} />
          </div>
        </div>

        {/* Main Heading */}
        <h1
          style={{
            textAlign: 'center',
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '24px',
            letterSpacing: '-1px',
          }}
        >
          Biến Ý Tưởng Của Bạn{' '}
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 4s ease infinite',
            }}
          >
            Thành Hiện Thực
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            textAlign: 'center',
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}
        >
          Chuyên gia phát triển phần mềm & tư vấn kỹ thuật số. Tôi giúp doanh nghiệp xây dựng
          sản phẩm công nghệ hiện đại, tối ưu và đột phá.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '80px',
          }}
        >
          <Link href="/services" className="btn-primary" style={{ fontSize: '16px', padding: '14px 32px' }}>
            Xem Dịch Vụ & Giá
            <ArrowRight size={18} />
          </Link>
          <Link href="/chat" className="btn-secondary" style={{ fontSize: '16px', padding: '14px 32px' }}>
            <MessageSquare size={18} />
            Chat với AI
          </Link>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px',
            marginBottom: '60px',
          }}
        >
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="glass-card"
              style={{
                padding: '24px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(99, 102, 241, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                }}
              >
                <Icon size={20} style={{ color: '#818cf8' }} />
              </div>
              <div
                style={{
                  fontSize: '28px',
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '6px',
                }}
              >
                {value}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Tech Stack Marquee */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Công Nghệ Sử Dụng
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {technologies.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0.5,
        }}
      >
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Cuộn xuống</span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--primary), transparent)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
