'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ExternalLink, ArrowRight, Sparkles, Code2, Layers, Cpu } from 'lucide-react'

const projectsData = [
  {
    id: 1,
    title: 'SaaS E-Commerce AI Recommender',
    category: 'web-ai',
    description: 'Nền tảng thương mại điện tử tích hợp thuật toán gợi ý sản phẩm tự động hoá và trợ lý ảo giải đáp khi mua sắm.',
    budget: '25.000.000đ',
    tags: ['Next.js 14', 'Supabase', 'Gemini API', 'Tailwind CSS'],
    icon: '🛒',
    gradient: 'linear-gradient(135deg, #6366f1, #a855f7)',
  },
  {
    id: 2,
    title: 'Hệ Thống Quản Lý Đào Tạo & Khoá Học Online',
    category: 'web',
    description: 'Hệ thống LMS đầy đủ tính năng video streaming, làm bài thi trắc nghiệm, cấp chứng chỉ và cổng thanh toán tự động.',
    budget: '18.000.000đ',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    icon: '🎓',
    gradient: 'linear-gradient(135deg, #06b6d4, #6366f1)',
  },
  {
    id: 3,
    title: 'Chatbot Tự Động Tư Vấn Khách Sạn & Đặt Phòng',
    category: 'ai',
    description: 'Trợ lý ảo đa ngôn ngữ giúp khách du lịch tra cứu phòng trống, bảng giá và tự động chuyển tiếp booking về Telegram.',
    budget: '9.000.000đ',
    tags: ['Gemini 1.5 Flash', 'FastAPI', 'Supabase Realtime'],
    icon: '🏨',
    gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
  },
  {
    id: 4,
    title: 'App Đặt Lịch Dịch Vụ Spa & Làm Đẹp',
    category: 'mobile',
    description: 'Ứng dụng di động iOS/Android cho chuỗi spa với tính năng nhắc hẹn qua Push Notification và tích điểm thành viên.',
    budget: '22.000.000đ',
    tags: ['React Native', 'Firebase', 'Node.js'],
    icon: '✨',
    gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
  },
  {
    id: 5,
    title: 'Landing Page Bất Động Sản Cao Cấp Tối Ưu Tốc Độ',
    category: 'web',
    description: 'Trang giới thiệu dự án căn hộ với hiệu ứng 3D trực quan, đạt điểm 99/100 Google PageSpeed và chuẩn SEO toàn diện.',
    budget: '6.500.000đ',
    tags: ['Next.js', 'Three.js', 'Framer Motion'],
    icon: '🏢',
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
  },
  {
    id: 6,
    title: 'Hệ Thống CRM & Chăm Sóc Khách Hàng Tự Động',
    category: 'web-ai',
    description: 'Phần mềm quản lý quan hệ khách hàng kết hợp phân tích cảm xúc phản hồi (Sentiment Analysis) và phân loại lead.',
    budget: '20.000.000đ',
    tags: ['Next.js App Router', 'PostgreSQL', 'AI Analysis'],
    icon: '📊',
    gradient: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
  },
]

const categories = [
  { key: 'all', label: 'Tất Cả Dự Án' },
  { key: 'web', label: 'Web Doanh Nghiệp & SaaS' },
  { key: 'ai', label: 'Giải Pháp AI' },
  { key: 'mobile', label: 'App Di Động' },
]

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'web') return p.category === 'web' || p.category === 'web-ai'
    if (activeFilter === 'ai') return p.category === 'ai' || p.category === 'web-ai'
    if (activeFilter === 'mobile') return p.category === 'mobile'
    return true
  })

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ paddingTop: '100px', paddingBottom: '90px', flex: 1 }} className="grid-background">
        <div className="section-container">
          
          {/* Header */}
          <div style={{ maxWidth: '750px', margin: '0 auto 50px', textAlign: 'center' }}>
            <div className="section-tag" style={{ margin: '0 auto 16px' }}>
              ✦ Danh Mục Dự Án
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: '18px' }}>
              Ý Tưởng Đã <span className="gradient-text">Hiện Thực Hoá</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '17px', lineHeight: 1.7 }}>
              Khám phá các sản phẩm và hệ thống thực tế chúng tôi đã xây dựng. Mỗi dự án đều đi kèm chi phí và thời gian triển khai tham khảo.
            </p>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '48px' }}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activeFilter === cat.key ? '1px solid var(--primary)' : '1px solid var(--border)',
                  background: activeFilter === cat.key ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  color: activeFilter === cat.key ? '#f1f5f9' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Project Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
              marginBottom: '60px',
            }}
          >
            {filteredProjects.map((project) => (
              <div key={project.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                
                {/* Banner Header */}
                <div
                  style={{
                    height: '180px',
                    background: project.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '56px',
                    position: 'relative',
                  }}
                >
                  {project.icon}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '16px',
                      background: 'rgba(0,0,0,0.6)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 12px',
                      borderRadius: '100px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'white',
                    }}
                  >
                    Chi phí: {project.budget}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '10px' }}>{project.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                    {project.description}
                  </p>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  <Link
                    href={`/contact?service=${encodeURIComponent(project.title)}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 16px',
                      background: 'rgba(99, 102, 241, 0.1)',
                      border: '1px solid rgba(99, 102, 241, 0.2)',
                      borderRadius: '10px',
                      color: '#818cf8',
                      fontSize: '13px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>Làm dự án tương tự</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>
              Bạn có một ý tưởng độc đáo chưa có trong danh sách?
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '600px', margin: '0 auto 24px' }}>
              Hãy trao đổi với trợ lý AI hoặc liên hệ chúng tôi để cùng lên bản thiết kế kiến trúc và giải pháp tối ưu nhất.
            </p>
            <Link href="/contact" className="btn-primary">
              Tư Vấn Ý Tưởng Mới Ngay
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
