'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Inbox, Mail, Phone, Calendar, Check, MessageSquare, Trash2, Filter, RefreshCw } from 'lucide-react'

interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  service: string
  budget: string
  message: string
  status: 'new' | 'read' | 'replied'
  created_at: string
  notes?: string
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all')
  const [isLoading, setIsLoading] = useState(false)

  const loadData = async () => {
    setIsLoading(true)
    let list: Inquiry[] = []

    // 1. Lấy từ Supabase nếu có
    try {
      const supabase = createClient()
      const { data: dbData } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })
      if (dbData && dbData.length > 0) {
        list = dbData.map((d: any) => ({
          id: d.id,
          name: d.name,
          email: d.email,
          phone: d.phone || 'Chưa cung cấp',
          service: d.message?.startsWith('[Dịch vụ quan tâm:') ? d.message.split(']')[0].replace('[Dịch vụ quan tâm:', '').trim() : 'Tư vấn dự án',
          budget: d.budget || 'Thoả thuận',
          message: d.message?.includes(']') ? d.message.split(']').slice(1).join(']').trim() : d.message,
          status: d.status || 'new',
          created_at: new Date(d.created_at).toLocaleString('vi-VN'),
        }))
      }
    } catch {}

    // 2. Kết hợp với LocalStorage (nếu có khách mới gửi ở máy)
    try {
      const local = JSON.parse(localStorage.getItem('bizai_local_inquiries') || '[]')
      if (local && local.length > 0) {
        // Gộp tránh trùng id
        const existingIds = new Set(list.map((i) => i.id))
        const newLocal = local.filter((l: any) => !existingIds.has(l.id))
        list = [...newLocal, ...list]
      }
    } catch {}

    // 3. Nếu chưa có gì, tạo một số mục mẫu để admin kiểm tra giao diện
    if (list.length === 0) {
      list = [
        {
          id: 'demo-1',
          name: 'Khách Hàng Trải Nghiệm Mẫu',
          email: 'khachhang@doanhnghiep.vn',
          phone: '0988 123 456',
          service: 'Web Application & SaaS',
          budget: '25.000.000đ',
          message: 'Tôi đang có ý tưởng kinh doanh muốn làm MVP nền tảng web kết hợp chatbot AI tư vấn tự động.',
          status: 'new',
          created_at: 'Vừa xong',
        },
      ]
    }

    setInquiries(list)
    setSelectedInquiry(list[0] || null)
    setIsLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const updateStatus = async (id: string, newStatus: 'new' | 'read' | 'replied') => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    )
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null))
    }

    // Cập nhật Supabase nếu có
    try {
      const supabase = createClient()
      await supabase.from('inquiries').update({ status: newStatus }).eq('id', id)
    } catch {}

    // Cập nhật LocalStorage
    try {
      const local = JSON.parse(localStorage.getItem('bizai_local_inquiries') || '[]')
      const updated = local.map((l: any) => (l.id === id ? { ...l, status: newStatus } : l))
      localStorage.setItem('bizai_local_inquiries', JSON.stringify(updated))
    } catch {}
  }

  const filtered = inquiries.filter((inq) => {
    if (filter === 'all') return true
    return inq.status === filter
  })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>Quản Lý Phản Hồi & Khách Hàng</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Theo dõi tất cả yêu cầu tư vấn gửi từ biểu mẫu trên trang web khách hàng.
          </p>
        </div>
        <button
          onClick={loadData}
          disabled={isLoading}
          className="btn-admin"
          style={{ fontSize: '13px', padding: '8px 16px' }}
        >
          <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
          Làm mới danh sách
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {(['all', 'new', 'read', 'replied'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              border: filter === tab ? '1px solid var(--primary)' : '1px solid var(--border)',
              background: filter === tab ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-surface)',
              color: filter === tab ? '#f8fafc' : 'var(--text-secondary)',
            }}
          >
            {tab === 'all' && `Tất cả (${inquiries.length})`}
            {tab === 'new' && `Mới (${inquiries.filter((i) => i.status === 'new').length})`}
            {tab === 'read' && `Đang xử lý (${inquiries.filter((i) => i.status === 'read').length})`}
            {tab === 'replied' && `Đã phản hồi (${inquiries.filter((i) => i.status === 'replied').length})`}
          </button>
        ))}
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(360px, 1.4fr)', gap: '24px' }}>
        
        {/* Left: List */}
        <div className="admin-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', fontSize: '14px' }}>
              Chưa có yêu cầu nào trong mục này.
            </div>
          ) : (
            filtered.map((item) => {
              const isSelected = selectedInquiry?.id === item.id
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedInquiry(item)}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ fontWeight: 700, fontSize: '15px' }}>{item.name}</div>
                    <span className={`admin-badge badge-${item.status}`}>
                      {item.status === 'new' ? 'Mới' : item.status === 'read' ? 'Đã xem' : 'Đã phản hồi'}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#a5b4fc', marginBottom: '6px' }}>{item.service}</div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.message}
                  </p>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>{item.created_at}</div>
                </div>
              )
            })
          )}
        </div>

        {/* Right: Detail View */}
        {selectedInquiry ? (
          <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800 }}>{selectedInquiry.name}</h2>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Thời gian: {selectedInquiry.created_at}</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => updateStatus(selectedInquiry.id, 'read')}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    background: 'rgba(99, 102, 241, 0.15)',
                    border: '1px solid var(--primary)',
                    color: '#818cf8',
                    cursor: 'pointer',
                  }}
                >
                  Đánh dấu Đã xem
                </button>
                <button
                  onClick={() => updateStatus(selectedInquiry.id, 'replied')}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid #10b981',
                    color: '#10b981',
                    cursor: 'pointer',
                  }}
                >
                  Đã phản hồi
                </button>
              </div>
            </div>

            {/* Contact details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Email của khách</div>
                <div style={{ fontWeight: 600, fontSize: '14px', marginTop: '4px' }}>
                  <a href={`mailto:${selectedInquiry.email}`} style={{ color: '#818cf8', textDecoration: 'none' }}>
                    {selectedInquiry.email}
                  </a>
                </div>
              </div>

              <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Số điện thoại / Zalo</div>
                <div style={{ fontWeight: 600, fontSize: '14px', marginTop: '4px' }}>
                  <a href={`tel:${selectedInquiry.phone}`} style={{ color: '#10b981', textDecoration: 'none' }}>
                    {selectedInquiry.phone}
                  </a>
                </div>
              </div>

              <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Dịch vụ quan tâm</div>
                <div style={{ fontWeight: 600, fontSize: '14px', marginTop: '4px', color: '#c084fc' }}>
                  {selectedInquiry.service}
                </div>
              </div>

              <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Ngân sách dự kiến</div>
                <div style={{ fontWeight: 600, fontSize: '14px', marginTop: '4px', color: '#fbbf24' }}>
                  {selectedInquiry.budget}
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Chi tiết yêu cầu của khách:
              </div>
              <div
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border)',
                  fontSize: '14px',
                  lineHeight: 1.6,
                }}
              >
                {selectedInquiry.message}
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '12px', paddingTop: '10px' }}>
              <a
                href={`mailto:${selectedInquiry.email}?subject=BizAI - Trao đổi yêu cầu dự án`}
                className="btn-admin"
              >
                <Mail size={16} /> Gửi Email Cho Khách
              </a>
              {selectedInquiry.phone && selectedInquiry.phone !== 'Chưa cung cấp' && (
                <a
                  href={`https://zalo.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    background: 'rgba(6,182,212,0.15)',
                    border: '1px solid rgba(6,182,212,0.3)',
                    color: '#22d3ee',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <MessageSquare size={16} /> Nhắn Tin Zalo
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="admin-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Chọn một yêu cầu bên trái để xem chi tiết
          </div>
        )}

      </div>
    </div>
  )
}
