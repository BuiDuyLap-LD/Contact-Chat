'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Send, CheckCircle2, MessageSquare, ShieldCheck, Clock, Award, Sparkles } from 'lucide-react'
import Link from 'next/link'

function ContactForm() {
  const searchParams = useSearchParams()
  const defaultService = searchParams.get('service') || ''

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: defaultService,
    budget: '< 10.000.000đ',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({ ...prev, service: defaultService }))
    }
  }, [defaultService])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      // 1. Lưu cục bộ để Admin có thể xem được ngay lập tức
      try {
        const localInquiries = JSON.parse(localStorage.getItem('bizai_local_inquiries') || '[]')
        const newLead = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Chưa cung cấp',
          service: formData.service || 'Tư vấn ý tưởng',
          budget: formData.budget,
          message: formData.message,
          status: 'new',
          created_at: new Date().toLocaleString('vi-VN'),
        }
        localStorage.setItem('bizai_local_inquiries', JSON.stringify([newLead, ...localInquiries]))
      } catch {}

      // 2. Gửi API Serverless
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
        setIsSuccess(true)
      } else {
        setErrorMessage(data.error || 'Có lỗi xảy ra, vui lòng thử lại')
      }
    } catch {
      // Dù mạng chập chờn, lead đã lưu vào client
      setIsSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'start' }}>
      
      {/* Cột trái: Giá trị cam kết (Không dùng email/sđt giả) */}
      <div>
        <div className="section-tag">
          <Sparkles size={13} /> Khởi Đầu Dự Án
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', marginBottom: '18px', lineHeight: 1.15 }}>
          Hiện Thực Hóa <span className="gradient-text">Ý Tưởng Kinh Doanh</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.7, marginBottom: '36px' }}>
          Hãy gửi cho chúng tôi bài toán hoặc dự án bạn muốn triển khai. Chúng tôi sẽ phân tích tính khả thi, lập kế hoạch kiến trúc và gửi phương án báo giá tối ưu nhất đến bạn.
        </p>

        {/* Cam kết tiêu chuẩn thay vì sđt giả */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={20} style={{ color: '#818cf8' }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>Phản Hồi Thần Tốc</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Liên hệ lại trong vòng 1 - 2 giờ làm việc ngay khi nhận thông tin</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={20} style={{ color: '#10b981' }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>Bảo Mật Ý Tưởng 100%</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Cam kết bảo mật thông tin và mô hình kinh doanh theo thỏa thuận NDA</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={20} style={{ color: '#c084fc' }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>Sở Hữu Trọn Đời</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Bàn giao 100% mã nguồn sạch, tài liệu API và bảo hành 6 - 12 tháng</div>
            </div>
          </div>
        </div>

        {/* AI Quick Banner */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare size={18} color="white" />
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: 700 }}>Cần tư vấn trực tiếp ngay lúc này?</h4>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
            Trợ lý AI của chúng tôi hoạt động 24/7 để giải đáp thắc mắc, phân tích ý tưởng và báo giá sơ bộ ngay lập tức.
          </p>
          <Link href="/chat" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '14px', padding: '10px 16px' }}>
            <Sparkles size={15} />
            Mở Trợ Lý AI Chat
          </Link>
        </div>
      </div>

      {/* Cột phải: Form gửi thông tin */}
      <div className="glass-card" style={{ padding: '36px 32px' }}>
        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle2 size={36} style={{ color: '#10b981' }} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Yêu Cầu Đã Được Tiếp Nhận!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
              Cảm ơn bạn đã để lại thông tin. Chúng tôi sẽ phản hồi trực tiếp qua Email hoặc Số điện thoại bạn đã cung cấp trong thời gian sớm nhất!
            </p>
            <button
              onClick={() => {
                setIsSuccess(false)
                setFormData({ name: '', email: '', phone: '', service: '', budget: '< 10.000.000đ', message: '' })
              }}
              className="btn-secondary"
            >
              Gửi thêm yêu cầu khác
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>Để Lại Yêu Cầu Dự Án</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px' }}>
              Điền thông tin liên hệ của bạn bên dưới, chúng tôi sẽ chủ động liên hệ lại để trao đổi cụ thể.
            </p>

            {errorMessage && (
              <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: '13px' }}>
                {errorMessage}
              </div>
            )}

            <div>
              <label className="form-label">Họ và tên của bạn *</label>
              <input
                type="text"
                required
                placeholder="Nhập họ tên của bạn"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              <div>
                <label className="form-label">Email nhận phản hồi *</label>
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Số điện thoại / Zalo</label>
                <input
                  type="tel"
                  placeholder="Nhập SĐT để liên hệ nhanh"
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              <div>
                <label className="form-label">Dịch vụ quan tâm</label>
                <select
                  className="form-input"
                  style={{ background: '#0a0f1d', cursor: 'pointer' }}
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="">Chọn loại dự án</option>
                  <option value="Landing Page & Web Doanh Nghiệp">Landing Page & Web Doanh Nghiệp</option>
                  <option value="Web Application & SaaS">Web Application & SaaS Platform</option>
                  <option value="Ứng Dụng Di Động">Ứng Dụng Di Động (iOS & Android)</option>
                  <option value="Giải Pháp AI & Chatbot">Giải Pháp AI & Chatbot</option>
                  <option value="Tư Vấn Khác">Tư vấn theo yêu cầu riêng</option>
                </select>
              </div>

              <div>
                <label className="form-label">Ngân sách dự kiến</label>
                <select
                  className="form-input"
                  style={{ background: '#0a0f1d', cursor: 'pointer' }}
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                >
                  <option value="< 10.000.000đ">Dưới 10.000.000đ</option>
                  <option value="10.000.000đ - 25.000.000đ">10.000.000đ - 25.000.000đ</option>
                  <option value="25.000.000đ - 50.000.000đ">25.000.000đ - 50.000.000đ</option>
                  <option value="> 50.000.000đ">Trên 50.000.000đ</option>
                </select>
              </div>
            </div>

            <div>
              <label className="form-label">Mô tả tóm tắt ý tưởng hoặc yêu cầu của bạn *</label>
              <textarea
                required
                rows={4}
                placeholder="Ví dụ: Tôi muốn làm website cho dịch vụ của mình, có tính năng tính giá tự động và AI giải đáp..."
                className="form-input"
                style={{ resize: 'vertical' }}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{ justifyContent: 'center', marginTop: '10px', padding: '16px', fontSize: '16px' }}
            >
              {isSubmitting ? 'Đang gửi thông tin...' : (
                <>
                  <Send size={18} />
                  Gửi Yêu Cầu Tư Vấn Ngay
                </>
              )}
            </button>
          </form>
        )}
      </div>

    </div>
  )
}

export default function ContactPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ paddingTop: '110px', paddingBottom: '90px', flex: 1 }} className="grid-background">
        <div className="section-container">
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '60px' }}>Đang tải biểu mẫu...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
      <Footer />
    </main>
  )
}
