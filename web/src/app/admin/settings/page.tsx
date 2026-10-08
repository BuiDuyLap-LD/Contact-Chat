'use client'

import { useState, useEffect } from 'react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { Sparkles, Save, CheckCircle2, Shield, Globe, Database, AlertCircle, RefreshCw } from 'lucide-react'

export default function WebAdminSettingsPage() {
  const [systemPrompt, setSystemPrompt] = useState(`Bạn là Trợ lý AI cao cấp đại diện cho BizAI - Chuyên gia giải pháp phần mềm & chuyển đổi số.

THÔNG TIN BÁO GIÁ TIÊU CHUẨN:
- Website Doanh Nghiệp / Landing Page: 5.000.000đ - 10.000.000đ (5 - 7 ngày)
- Web Application & Hệ thống SaaS: 15.000.000đ - 35.000.000đ (15 - 25 ngày)
- Mobile App iOS & Android: 20.000.000đ - 45.000.000đ (25 - 40 ngày)
- Giải Pháp AI & Tự Động Hoá: 8.000.000đ - 25.000.000đ

QUY TẮC TƯ VẤN:
1. Luôn trả lời lịch sự, thông minh, súc tích và giải thích rõ ràng bằng tiếng Việt.
2. Khi khách hỏi về báo giá, cung cấp mức ngân sách dự kiến và giải thích phạm vi công việc.
3. Khi khách có nhu cầu triển khai, hướng dẫn khách gửi yêu cầu tại trang /contact để nhận đề xuất chính thức.`)

  const [model, setModel] = useState('gemini-1.5-flash')
  const [temperature, setTemperature] = useState(0.7)
  const [siteName, setSiteName] = useState('BizAI Platform')
  const [isSaving, setIsSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [hasSupabase, setHasSupabase] = useState(false)

  useEffect(() => {
    setHasSupabase(isSupabaseConfigured())

    // 1. Tải prompt từ LocalStorage nếu có
    const localPrompt = localStorage.getItem('bizai_custom_ai_prompt')
    if (localPrompt) setSystemPrompt(localPrompt)

    // 2. Tải prompt từ Supabase nếu có
    const fetchDb = async () => {
      if (isSupabaseConfigured()) {
        try {
          const supabase = createClient()
          const { data } = await supabase.from('ai_config').select('*').eq('is_active', true).maybeSingle()
          if (data?.system_prompt) {
            setSystemPrompt(data.system_prompt)
            if (data.model) setModel(data.model)
          }
        } catch (err) {
          console.warn('Lỗi load config từ Supabase:', err)
        }
      }
    }
    fetchDb()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // 1. Lưu vào LocalStorage của Web để API và Client đọc ngay lập tức
    localStorage.setItem('bizai_custom_ai_prompt', systemPrompt)
    localStorage.setItem('bizai_ai_model', model)

    // 2. Lưu vào Supabase nếu đã kết nối
    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient()
        // Upsert ai_config
        const { data: existing } = await supabase.from('ai_config').select('id').limit(1).maybeSingle()
        if (existing) {
          await supabase.from('ai_config').update({
            system_prompt: systemPrompt,
            model: model,
            temperature: temperature,
            updated_at: new Date().toISOString(),
          }).eq('id', existing.id)
        } else {
          await supabase.from('ai_config').insert({
            system_prompt: systemPrompt,
            model: model,
            temperature: temperature,
            is_active: true,
          })
        }
      } catch (err) {
        console.warn('Lỗi lưu Supabase:', err)
      }
    }

    setIsSaving(false)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 4000)
  }

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>Cấu Hình AI & Cập Nhật Nội Dung</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Tất cả thay đổi tại đây sẽ được cập nhật trực tiếp vào Trợ lý AI và hệ thống của trang web.
        </p>
      </div>

      {savedSuccess && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 20px', borderRadius: '14px', background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', color: '#10b981', marginBottom: '24px', fontSize: '14px', fontWeight: 600 }}>
          <CheckCircle2 size={20} /> Đã cập nhật thành công! Trợ lý AI đã học theo hướng dẫn mới của bạn.
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Section 1: AI Prompt Tuning */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Sparkles size={22} style={{ color: '#a855f7' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Huấn Luyện Trợ Lý AI (System Prompt)</h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
            Bạn có thể thay đổi tên của bạn, các gói dịch vụ, giá tiền hoặc cách xưng hô tại đây. AI sẽ dùng chính những thông tin này để tư vấn cho khách hàng.
          </p>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px', color: '#a5b4fc' }}>
              Chỉ Dẫn Tư Duy (System Instructions):
            </label>
            <textarea
              rows={12}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                background: 'rgba(5, 7, 14, 0.8)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
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
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-secondary)' }}>
                Mô hình AI:
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: '#0a0f1d',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  color: '#f8fafc',
                  fontSize: '13px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="gemini-1.5-flash">Google Gemini 1.5 Flash (Tối ưu tốc độ)</option>
                <option value="gemini-2.0-flash">Google Gemini 2.0 Flash (Mới nhất)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-secondary)' }}>
                Độ nhạy bén (Temperature: {temperature}):
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

        {/* Section 2: Database Status */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Database size={22} style={{ color: '#06b6d4' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Trạng Thái Đồng Bộ Cơ Sở Dữ Liệu</h3>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
            {hasSupabase
              ? '✅ Hệ thống đã kết nối với Supabase PostgreSQL. Mọi cập nhật sẽ được lưu trực tiếp vào cơ sở dữ liệu đám mây.'
              : '⚠️ Chưa phát hiện biến môi trường Supabase hợp lệ trên Vercel. Hiện tại dữ liệu đang được lưu trữ trong bộ nhớ LocalStorage. Bạn có thể vào Vercel ➔ Settings ➔ Environment Variables để bổ sung.'}
          </p>

          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', fontSize: '13px', fontFamily: 'monospace' }}>
            <div>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Đã cấu hình' : 'Chưa có'}</div>
            <div style={{ marginTop: '6px' }}>NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Đã cấu hình' : 'Chưa có'}</div>
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={isSaving}
            className="btn-primary"
            style={{ padding: '14px 32px', fontSize: '15px' }}
          >
            <Save size={18} />
            {isSaving ? 'Đang Lưu...' : 'Lưu Thay Đổi Ngay Lập Tức'}
          </button>
        </div>

      </form>
    </div>
  )
}
