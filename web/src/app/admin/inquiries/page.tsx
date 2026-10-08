'use client'

import { useState, useEffect } from 'react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { Inbox, Mail, Phone, Calendar, Check, MessageSquare, Trash2, RefreshCw } from 'lucide-react'

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
}

export default function WebAdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all')
  const [isLoading, setIsLoading] = useState(false)

  const loadData = async () => {
    setIsLoading(true)
    let list: Inquiry[] = []

    // 1. Đọc từ Supabase
    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient()
        const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })
        if (data && data.length > 0) {
          list = data.map((d: any) => ({
            id: d.id,
            name: d.name,
            email: d.email,
            phone: d.phone || 'Chưa cung cấp',
            service: d.message?.includes(']') ? d.message.split(']')[0].replace('[Dịch vụ quan tâm:', '').trim() : 'Tư vấn dự án',
            budget: d.budget || 'Thoả thuận',
            message: d.message?.includes(']') ? d.message.split(']').slice(1).join(']').trim() : d.message,
            status: d.status || 'new',
            created_at: new Date(d.created_at).toLocaleString('vi-VN'),
          }))
        }
      } catch (err) {
        console.warn('Supabase query error:', err)
      }
    }

    // 2. Đọc từ LocalStorage (chia sẻ trong cùng web)
    try {
      const local = JSON.parse(localStorage.getItem('bizai_local_inquiries') || '[]')
      if (local && local.length > 0) {
        const existingIds = new Set(list.map((i) => i.id))
        const unmerged = local.filter((l: any) => !existingIds.has(l.id))
        list = [...unmerged, ...list]
      }
    } catch {}

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

    // Update Supabase
    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient()
        await supabase.from('inquiries').update({ status: newStatus }).eq('id', id)
      } catch {}
    }

    // Update LocalStorage
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
          <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>Quản Lý Phản Hồi & Khách Hàng</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Toàn bộ thông tin khách hàng gửi từ biểu mẫu <strong>/contact</strong> được tiếp nhận trực tiếp tại đây.
          </p>
        </div>
        <button
          onClick={loadData}
          disabled={isLoading}
          className="btn-secondary"
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
          Làm Mới
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {(['all', 'new', 'read', 'replied'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              padding: '8px 18px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              border: filter === tab ? '1px solid var(--primary)' : '1px solid var(--border)',
              background: filter === tab ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.03)',
              color: filter === tab ? '#ffffff' : 'var(--text-secondary)',
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
        <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              Chưa có yêu cầu nào trong danh sách.
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
                    borderRadius: '14px',
                    background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected ? '1px solid #a855f7' : '1px solid var(--border)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ fontWeight: 800, fontSize: '15px' }}>{item.name}</div>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: 700,
                        background: item.status === 'new' ? 'rgba(16,185,129,0.2)' : 'rgba(99,102,241,0.2)',
                        color: item.status === 'new' ? '#10b981' : '#818cf8',
                        border: `1px solid ${item.status === 'new' ? '#10b981' : 'var(--primary)'}`,
                      }}
                    >
                      {item.status === 'new' ? 'Mới' : item.status === 'read' ? 'Đã xem' : 'Đã phản hồi'}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#a5b4fc', marginBottom: '6px', fontWeight: 600 }}>{item.service}</div>
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
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 800 }}>{selectedInquiry.name}</h2>
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
                  Đã xem
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
              <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Email của khách</div>
                <div style={{ fontWeight: 700, fontSize: '14px', marginTop: '4px' }}>
                  <a href={`mailto:${selectedInquiry.email}`} style={{ color: '#818cf8', textDecoration: 'none' }}>
                    {selectedInquiry.email}
                  </a>
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Số điện thoại / Zalo</div>
                <div style={{ fontWeight: 700, fontSize: '14px', marginTop: '4px' }}>
                  <a href={`tel:${selectedInquiry.phone}`} style={{ color: '#10b981', textDecoration: 'none' }}>
                    {selectedInquiry.phone}
                  </a>
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Dịch vụ quan tâm</div>
                <div style={{ fontWeight: 700, fontSize: '14px', marginTop: '4px', color: '#c084fc' }}>
                  {selectedInquiry.service}
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Ngân sách dự kiến</div>
                <div style={{ fontWeight: 700, fontSize: '14px', marginTop: '4px', color: '#fbbf24' }}>
                  {selectedInquiry.budget}
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Nội dung yêu cầu từ khách:
              </div>
              <div
                style={{
                  padding: '18px',
                  borderRadius: '14px',
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
                href={`mailto:${selectedInquiry.email}?subject=BizAI - Phản hồi yêu cầu tư vấn của bạn`}
                className="btn-primary"
                style={{ fontSize: '14px' }}
              >
                <Mail size={16} /> Gửi Email Trực Tiếp
              </a>
              {selectedInquiry.phone && selectedInquiry.phone !== 'Chưa cung cấp' && (
                <a
                  href={`https://zalo.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ fontSize: '14px' }}
                >
                  <MessageSquare size={16} /> Mở Nhắn Tin Zalo
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Chọn một yêu cầu bên trái để xem chi tiết
          </div>
        )}

      </div>
    </div>
  )
}
