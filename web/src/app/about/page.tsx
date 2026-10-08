import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { CheckCircle2, Award, Terminal, Rocket, HeartHandshake, ArrowRight, MessageSquare } from 'lucide-react'

const values = [
  {
    icon: Rocket,
    title: 'Tốc Độ & Chất Lượng',
    desc: 'Ưu tiên giải pháp tinh gọn, thời gian đưa sản phẩm ra thị trường (Time-to-market) nhanh nhất nhưng vẫn đảm bảo độ chịu tải cao.',
  },
  {
    icon: Terminal,
    title: 'Làm Chủ Mã Nguồn',
    desc: 'Bàn giao 100% full source code, kiến trúc sạch (clean architecture), tài liệu hướng dẫn tường minh, không ràng buộc vendor-lockin.',
  },
  {
    icon: HeartHandshake,
    title: 'Đồng Hành Lâu Dài',
    desc: 'Không dừng lại ở việc bàn giao code, chúng tôi cùng bạn phân tích tính khả thi mô hình kinh doanh và tối ưu chuyển đổi.',
  },
]

const milestones = [
  { year: '2021', title: 'Khởi đầu Freelance & Open Source', desc: 'Xây dựng các dự án mã nguồn mở và phát triển các hệ thống web cho doanh nghiệp SME.' },
  { year: '2023', title: 'Mở rộng Giải pháp SaaS & Cloud', desc: 'Chuyển dịch sang kiến trúc Serverless, Next.js, Supabase giúp giảm 80% chi phí vận hành cho khách hàng.' },
  { year: '2024 - Nay', title: 'Tích hợp Trí tuệ Nhân tạo (AI)', desc: 'Tiên phong đưa các mô hình AI thế hệ mới (Gemini, LLMs) vào tự động hoá quy trình và chăm sóc khách hàng 24/7.' },
]

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ paddingTop: '100px', paddingBottom: '90px', flex: 1 }} className="grid-background">
        <div className="section-container">
          
          {/* Header */}
          <div style={{ maxWidth: '800px', margin: '0 auto 60px', textAlign: 'center' }}>
            <div className="section-tag" style={{ margin: '0 auto 16px' }}>
              ✦ Câu Chuyện Của Tôi
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: '20px' }}>
              Người Đồng Hành Cùng <span className="gradient-text">Ý Tưởng Số</span> Của Bạn
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '17px', lineHeight: 1.8 }}>
              Tôi là một Full-stack Engineer & Solution Architect với đam mê biến những bài toán kinh doanh phức tạp thành những ứng dụng công nghệ trực quan, mượt mà và sinh lời hiệu quả.
            </p>
          </div>

          {/* Core Values */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '80px',
            }}
          >
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.title} className="glass-card" style={{ padding: '32px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'rgba(99,102,241,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <Icon size={24} style={{ color: '#818cf8' }} />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>{v.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              )
            })}
          </div>

          {/* Timeline */}
          <div className="glass-card" style={{ padding: '48px 36px', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '28px', textAlign: 'center', marginBottom: '40px' }}>
              Hành Trình <span className="gradient-text">Phát Triển</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '700px', margin: '0 auto' }}>
              {milestones.map((m) => (
                <div key={m.year} style={{ display: 'flex', gap: '24px' }}>
                  <div
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 800,
                      fontSize: '20px',
                      color: '#818cf8',
                      minWidth: '80px',
                      paddingTop: '2px',
                    }}
                  >
                    {m.year}
                  </div>
                  <div style={{ borderLeft: '2px solid rgba(99,102,241,0.3)', paddingLeft: '24px' }}>
                    <h4 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '6px' }}>{m.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div
            style={{
              textAlign: 'center',
              padding: '60px 24px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))',
              border: '1px solid var(--border)',
            }}
          >
            <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>Sẵn sàng hiện thực hoá dự án tiếp theo?</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '540px', margin: '0 auto 32px' }}>
              Trao đổi ngay với trợ lý AI hoặc liên hệ trực tiếp để có giải pháp kỹ thuật tối ưu nhất.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-primary">
                Gửi Yêu Cầu Dự Án
                <ArrowRight size={16} />
              </Link>
              <Link href="/chat" className="btn-secondary">
                <MessageSquare size={16} />
                Chat Hỏi Đáp Với AI
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
