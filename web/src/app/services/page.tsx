import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Check, ArrowRight, MessageSquare, ShieldCheck, Zap, Code, Smartphone, BrainCircuit } from 'lucide-react'

const servicePackages = [
  {
    id: 'starter',
    icon: Zap,
    name: 'Landing Page & Web Doanh Nghiệp',
    tagline: 'Phù hợp quảng bá thương hiệu, cá nhân hoặc chiến dịch sản phẩm',
    price: '5.000.000đ',
    duration: '5 - 7 ngày',
    features: [
      'Giao diện UI/UX độc quyền, hiện đại',
      'Tối ưu hiển thị Mobile, Tablet & Desktop',
      'Chuẩn SEO Google & tốc độ tải trang cực nhanh',
      'Tích hợp form nhận thông tin khách hàng',
      'Miễn phí SSL & kết nối tên miền',
      'Bảo hành & hỗ trợ kỹ thuật 6 tháng',
    ],
    isPopular: false,
    color: '#6366f1',
  },
  {
    id: 'pro',
    icon: Code,
    name: 'Web Application & SaaS Platform',
    tagline: 'Dành cho các ý tưởng kinh doanh phần mềm hoặc quản lý nội bộ',
    price: '15.000.000đ',
    duration: '15 - 25 ngày',
    features: [
      'Bao gồm toàn bộ tính năng gói cơ bản',
      'Hệ thống Frontend & Backend hoàn chỉnh',
      'Cơ sở dữ liệu Supabase / PostgreSQL',
      'Hệ thống tài khoản phân quyền User / Admin',
      'Cổng thanh toán tự động (VNPay, MoMo, Stripe)',
      'Bàn giao 100% Full Source Code & Tài liệu API',
      'Bảo hành & nâng cấp tính năng 1 năm',
    ],
    isPopular: true,
    color: '#a855f7',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    name: 'Ứng Dụng Di Động (iOS & Android)',
    tagline: 'Xây dựng app native đa nền tảng tối ưu trải nghiệm người dùng',
    price: '22.000.000đ',
    duration: '25 - 40 ngày',
    features: [
      'Ứng dụng chạy mượt trên cả iPhone & Android',
      'Đồng bộ dữ liệu thời gian thực (Real-time)',
      'Tính năng Push Notifications thông báo đẩy',
      'Hỗ trợ xuất bản lên App Store & Google Play',
      'Tích hợp Camera, Bản đồ, Định vị GPS',
      'Tối ưu hiệu năng và bảo mật chuẩn quốc tế',
    ],
    isPopular: false,
    color: '#06b6d4',
  },
  {
    id: 'ai-custom',
    icon: BrainCircuit,
    name: 'Giải Pháp AI & Chatbot Thông Minh',
    tagline: 'Tự động hoá tư vấn, trích xuất dữ liệu và gia tăng chuyển đổi',
    price: '8.000.000đ',
    duration: '7 - 14 ngày',
    features: [
      'Tích hợp Gemini / GPT API vào hệ thống của bạn',
      'Đào tạo AI học theo dữ liệu & tài liệu riêng của doanh nghiệp',
      'Chatbot tự động tư vấn và báo giá 24/7',
      'Admin quản lý và theo dõi hội thoại khách hàng',
      'Tiết kiệm đến 70% chi phí nhân sự chăm sóc khách hàng',
    ],
    isPopular: false,
    color: '#10b981',
  },
]

export default function ServicesPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ paddingTop: '100px', paddingBottom: '80px', flex: 1 }} className="grid-background">
        <div className="section-container">
          
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px' }}>
            <div className="section-tag" style={{ margin: '0 auto 16px' }}>
              ✦ Bảng Giá Minh Bạch
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: '20px' }}>
              Giải Pháp Số & <span className="gradient-text">Chi Phí Tối Ưu</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '17px', lineHeight: 1.7 }}>
              Chúng tôi cam kết chất lượng chuẩn công nghệ, tiến độ bàn giao chính xác, không phát sinh chi phí ẩn và bàn giao toàn bộ mã nguồn sở hữu trọn đời.
            </p>
          </div>

          {/* Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '60px',
            }}
          >
            {servicePackages.map((pkg) => {
              const Icon = pkg.icon
              return (
                <div
                  key={pkg.id}
                  className="glass-card"
                  style={{
                    padding: '36px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    borderColor: pkg.isPopular ? pkg.color : undefined,
                  }}
                >
                  {pkg.isPopular && (
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
                      }}
                    >
                      ★ Được Chọn Nhiều Nhất
                    </div>
                  )}

                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: `${pkg.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <Icon size={24} style={{ color: pkg.color }} />
                  </div>

                  <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>{pkg.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5, marginBottom: '20px', minHeight: '40px' }}>
                    {pkg.tagline}
                  </p>

                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Khởi điểm từ</span>
                    <div style={{ fontSize: '30px', fontWeight: 800, fontFamily: 'Syne, sans-serif', color: pkg.color }}>
                      {pkg.price}
                    </div>
                  </div>

                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '28px' }}>
                    ⏱ Thời gian triển khai: <strong>{pkg.duration}</strong>
                  </div>

                  <div style={{ height: '1px', background: 'var(--border)', marginBottom: '24px' }} />

                  <div style={{ flex: 1, marginBottom: '32px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>
                      Đặc quyền bao gồm:
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {pkg.features.map((feat) => (
                        <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                          <Check size={16} style={{ color: pkg.color, flexShrink: 0, marginTop: '2px' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/contact?service=${encodeURIComponent(pkg.name)}`}
                    className={pkg.isPopular ? 'btn-primary' : 'btn-secondary'}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Đăng Ký Tư Vấn Gói Này
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Guarantees */}
          <div
            className="glass-card"
            style={{
              padding: '36px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
              textAlign: 'center',
            }}
          >
            <div>
              <ShieldCheck size={32} style={{ color: '#10b981', margin: '0 auto 12px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Cam Kết Bảo Mật</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Bảo mật 100% ý tưởng và dữ liệu kinh doanh bằng thoả thuận NDA.</p>
            </div>
            <div>
              <Zap size={32} style={{ color: '#6366f1', margin: '0 auto 12px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Tiến Độ Chuẩn Xác</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Bàn giao từng giai đoạn với báo cáo rõ ràng để bạn kiểm duyệt liên tục.</p>
            </div>
            <div>
              <MessageSquare size={32} style={{ color: '#a855f7', margin: '0 auto 12px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Hỗ Trợ Nhanh Chóng</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Hỗ trợ sửa lỗi và bảo trì miễn phí tối thiểu 6 tháng sau khi bàn giao.</p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
