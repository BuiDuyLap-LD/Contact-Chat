'use client'

import { useState } from 'react'
import { Sparkles, Save, CheckCircle2, Shield, Globe } from 'lucide-react'

export default function AdminSettingsPage() {
  const [systemPrompt, setSystemPrompt] = useState(`Bạn là Trợ lý AI thông minh đại diện cho BizAI - chuyên gia giải pháp phần mềm & chuyển đổi số.

THÔNG TIN BÁO GIÁ TIÊU CHUẨN:
- Website Doanh Nghiệp / Landing Page: 5.000.000đ - 10.000.000đ
- Web Application & Hệ thống SaaS: 15.000.000đ - 35.000.000đ
- Mobile App iOS & Android: 20.000.000đ - 45.000.000đ
- Giải Pháp AI & Tự Động Hoá: 8.000.000đ - 25.000.000đ

QUY TẮC PHẢN HỒI:
1. Luôn trả lời lịch sự, súc tích và hỗ trợ tận tình bằng tiếng Việt.
2. Khi khách hỏi về báo giá, hãy cung cấp mức ngân sách dự kiến rõ ràng.
3. Khi khách có nhu cầu đặt hàng hoặc tư vấn chi tiết, dẫn dắt khách bấm sang trang /contact để điền thông tin nhận báo giá riêng.`)

  const [model, setModel] = useState('gemini-1.5-flash')
  const [temperature, setTemperature] = useState(0.7)
  const [siteName, setSiteName] = useState('BizAI Portfolio')
  const [contactEmail, setContactEmail] = useState('contact@bizai-consulting.com')
  const [contactPhone, setContactPhone] = useState('+84 (0) 912 345 678')
  const [savedSuccess, setSavedSuccess] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>Cấu Hình AI & Hệ Thống CMS</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Tùy chỉnh tính cách, tri thức của trợ lý AI và các thông tin liên hệ chính trên website của bạn.
        </p>
      </div>

      {savedSuccess && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 18px', borderRadius: '10px', background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', color: '#10b981', marginBottom: '24px', fontSize: '14px' }}>
          <CheckCircle2 size={18} /> Đã lưu cài đặt thành công! Dữ liệu mới đã được áp dụng.
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Section 1: AI Prompt Tuning */}
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Sparkles size={20} style={{ color: '#818cf8' }} />
            <h3 style={{ fontSize: '17px', fontWeight: 700 }}>Huấn Luyện Trợ Lý AI (System Prompt)</h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Toàn bộ thông tin bạn nhập ở đây sẽ là chỉ dẫn tư duy cho Gemini AI khi tương tác với khách hàng trên website.
          </p>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
              Nội dung System Prompt (Quy định vai trò, giá, dịch vụ):
            </label>
            <textarea
              rows={12}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              style={{
                width: '100%',
                padding: '14px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                color: '#f8fafc',
                fontSize: '13px',
                fontFamily: 'monospace',
                lineHeight: 1.6,
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
                Mô hình AI:
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  color: '#f8fafc',
                  fontSize: '13px',
                  outline: 'none',
                }}
              >
                <option value="gemini-1.5-flash">Google Gemini 1.5 Flash (Nhanh & Miễn phí)</option>
                <option value="gemini-1.5-pro">Google Gemini 1.5 Pro (Tư duy sâu)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
                Độ sáng tạo (Temperature: {temperature}):
              </label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                style={{ width: '100%', marginTop: '10px' }}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Website CMS Info */}
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Globe size={20} style={{ color: '#06b6d4' }} />
            <h3 style={{ fontSize: '17px', fontWeight: 700 }}>Thông Tin Hiển Thị Website</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                Tên thương hiệu / Website:
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  color: '#f8fafc',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                Email tiếp nhận liên hệ:
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  color: '#f8fafc',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                Hotline / Zalo liên hệ:
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  color: '#f8fafc',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div>
          <button type="submit" className="btn-admin" style={{ padding: '12px 28px', fontSize: '15px' }}>
            <Save size={18} /> Lưu Cập Nhật Cấu Hình
          </button>
        </div>

      </form>
    </div>
  )
}
