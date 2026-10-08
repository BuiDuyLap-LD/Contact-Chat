'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react'
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
      setErrorMessage('Không thể kết nối đến máy chủ, xin vui lòng kiểm tra lại mạng')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'start' }}>
      
      {/* Cột trái: Thông tin liên hệ */}
      <div>
        <div className="section-tag">✦ Kết Nối Ngay</div>
        <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', marginBottom: '18px' }}>
          Hãy Nói Về <span className="gradient-text">Ý Tưởng Của Bạn</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.7, marginBottom: '36px' }}>
          Bạn cần tư vấn giải pháp, nhận báo giá chi tiết hay giải đáp câu hỏi kỹ thuật? Hãy điền biểu mẫu hoặc trò chuyện trực tiếp qua AI Chat để nhận câu trả lời tức thì.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mail size={20} style={{ color: '#818cf8' }} />
            </div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Email liên hệ</div>
              <div style={{ fontWeight: 600, fontSize: '15px' }}>contact@bizai-consulting.com</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(168,85,247,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={20} style={{ color: '#c084fc' }} />
            </div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Hotline / Zalo</div>
              <div style={{ fontWeight: 600, fontSize: '15px' }}>+84 (0) 912 345 678</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(6,182,212,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={20} style={{ color: '#22d3ee' }} />
            </div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Thời gian phản hồi</div>
              <div style={{ fontWeight: 600, fontSize: '15px' }}>Trong vòng 1 - 2 giờ làm việc</div>
            </div>
          </div>
        </div>

        {/* AI Quick Banner */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare size={18} color="white" />
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: 700 }}>Cần phản hồi ngay lập tức?</h4>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
            Trợ lý AI của chúng tôi hoạt động 24/7 để giải đáp thắc mắc và ước tính chi phí sơ bộ cho bạn.
          </p>
          <Link href="/chat" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '14px', padding: '10px 16px' }}>
            Mở Trợ Lý AI Chat
          </Link>
        </div>
      </div>

      {/* Cột phải: Form gửi thông tin */}
      <div className="glass-card" style={{ padding: '36px 32px' }}>
        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <CheckCircle2 size={64} style={{ color: '#10b981', margin: '0 auto 20px' }} />
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Yêu Cầu Đã Được Tiếp Nhận!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
              Cảm ơn bạn đã quan tâm. Chúng tôi đã nhận được thông tin và sẽ chủ động liên hệ lại sớm nhất có thể.
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
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>Để Lại Thông Tin Dự Án</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px' }}>
              Chúng tôi sẽ gửi đề xuất giải pháp chi tiết và phương án triển khai tối ưu nhất cho bạn.
            </p>

            {errorMessage && (
              <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: '13px' }}>
                {errorMessage}
              </div>
            )}

            <div>
              <label className="form-label">Họ và tên *</label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Nguyễn Văn A"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              <div>
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Số điện thoại / Zalo</label>
                <input
                  type="tel"
                  placeholder="0912 345 678"
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
                  style={{ background: '#111827', cursor: 'pointer' }}
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="">Chọn dịch vụ</option>
                  <option value="Landing Page & Web Doanh Nghiệp">Landing Page & Web Doanh Nghiệp</option>
                  <option value="Web Application & SaaS">Web Application & SaaS Platform</option>
                  <option value="Ứng Dụng Di Động">Ứng Dụng Di Động (iOS & Android)</option>
                  <option value="Giải Pháp AI & Chatbot">Giải Pháp AI & Chatbot</option>
                  <option value="Khác">Tư vấn theo yêu cầu riêng</option>
                </select>
              </div>

              <div>
                <label className="form-label">Ngân sách dự kiến</label>
                <select
                  className="form-input"
                  style={{ background: '#111827', cursor: 'pointer' }}
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
              <label className="form-label">Mô tả ý tưởng hoặc yêu cầu của bạn *</label>
              <textarea
                required
                rows={4}
                placeholder="Ví dụ: Tôi muốn xây dựng web bán khoá học trực tuyến có thanh toán tự động và AI chấm điểm bài thi..."
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
              style={{ justifyContent: 'center', marginTop: '10px', padding: '14px' }}
            >
              {isSubmitting ? 'Đang gửi thông tin...' : (
                <>
                  <Send size={18} />
                  Gửi Yêu Cầu Tư Vấn Miễn Phí
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
