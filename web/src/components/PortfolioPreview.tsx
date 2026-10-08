import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

const previewProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'Nền tảng mua sắm trực tuyến với hệ thống quản lý đơn hàng, thanh toán và phân tích dữ liệu.',
    tags: ['Next.js', 'Supabase', 'Stripe', 'TypeScript'],
    imageColor: 'linear-gradient(135deg, #6366f1, #a855f7)',
    icon: '🛒',
  },
  {
    title: 'Healthcare Dashboard',
    description: 'Dashboard quản lý bệnh viện với lịch hẹn, hồ sơ bệnh nhân và báo cáo thống kê realtime.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Charts'],
    imageColor: 'linear-gradient(135deg, #06b6d4, #6366f1)',
    icon: '🏥',
  },
  {
    title: 'AI Content Generator',
    description: 'Ứng dụng tạo nội dung tự động bằng AI, hỗ trợ đa ngôn ngữ và xuất bản lên nhiều nền tảng.',
    tags: ['Python', 'FastAPI', 'Gemini AI', 'React'],
    imageColor: 'linear-gradient(135deg, #a855f7, #ec4899)',
    icon: '🤖',
  },
]

export default function PortfolioPreview() {
  return (
    <section style={{ padding: '100px 0' }}>
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-tag" style={{ margin: '0 auto 16px' }}>
            ✦ Portfolio
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: '16px' }}>
            Dự Án <span className="gradient-text">Nổi Bật</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '17px', maxWidth: '500px', margin: '0 auto' }}>
            Một số dự án tiêu biểu tôi đã thực hiện cho khách hàng.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {previewProjects.map((project) => (
            <div
              key={project.title}
              className="glass-card"
              style={{ overflow: 'hidden' }}
            >
              {/* Project Image */}
              <div
                style={{
                  height: '180px',
                  background: project.imageColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '64px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {project.icon}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.1)',
                  }}
                />
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{project.title}</h3>
                  <ExternalLink size={16} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: '2px' }} />
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link href="/portfolio" className="btn-secondary">
            Xem Tất Cả Dự Án
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
