'use client'

import { useState } from 'react'
import { Inbox, Mail, Phone, Calendar, Check, MessageSquare, Trash2, Filter } from 'lucide-react'

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

const mockInquiries: Inquiry[] = [
  {
    id: '1',
    name: 'Trần Minh Khang',
    email: 'khang.tran@startup.vn',
    phone: '0988 123 456',
    service: 'Web Application & SaaS',
    budget: '25.000.000đ',
    message: 'Tôi có ý tưởng xây dựng nền tảng học trực tuyến kết hợp AI tự động tạo quiz trắc nghiệm. Cần tư vấn kiến trúc công nghệ và lộ trình MVP.',
    status: 'new',
    created_at: '08/10/2026, 08:30',
  },
  {
    id: '2',
    name: 'Lê Hoàng Yến',
    email: 'yen.le@beautyco.com',
    phone: '0912 888 999',
    service: 'Landing Page & Web Doanh Nghiệp',
    budget: '< 10.000.000đ',
    message: 'Bên mình muốn làm lại trang chủ giới thiệu mỹ phẩm, cần thiết kế sang trọng phong cách tối giản và tốc độ nhanh.',
    status: 'read',
    created_at: '07/10/2026, 16:45',
  },
  {
    id: '3',
    name: 'Vũ Đức Nam',
    email: 'nam.vu@logistics.vn',
    phone: '0903 555 777',
    service: 'Giải Pháp AI & Chatbot',
    budget: '15.000.000đ',
    message: 'Cần tích hợp Chatbot AI vào website hiện có để hỗ trợ khách tra cứu mã vận đơn và báo cước tự động.',
    status: 'replied',
    created_at: '06/10/2026, 11:20',
    notes: 'Đã gọi điện tư vấn lúc 14:00 ngày 06/10. Khách đang duyệt báo giá.',
  },
]

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries)
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(mockInquiries[0])
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all')

  const updateStatus = (id: string, newStatus: 'new' | 'read' | 'replied') => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    )
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => prev ? { ...prev, status: newStatus } : null)
    }
  }

  const filtered = inquiries.filter((inq) => {
    if (filter === 'all') return true
    return inq.status === filter
  })

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>Quản Lý Phản Hồi & Khách Hàng</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Xem chi tiết các yêu cầu tư vấn gửi từ biểu mẫu trên website và cập nhật tiến trình liên hệ.
        </p>
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
          {filtered.map((item) => {
            const isSelected = selectedInquiry?.id === item.id
            return (
              <div
                key={item.id}
                onClick={() => setSelectedInquiry(item)}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255, 255, 255, 0.02)',
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
                <div style={{ fontSize: '13px', color: '#818cf8', marginBottom: '6px' }}>{item.service}</div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.message}
                </p>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>{item.created_at}</div>
              </div>
            )
          })}
        </div>

        {/* Right: Detail View */}
        {selectedInquiry ? (
          <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800 }}>{selectedInquiry.name}</h2>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Gửi lúc: {selectedInquiry.created_at}</div>
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
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Email</div>
                <div style={{ fontWeight: 600, fontSize: '14px', marginTop: '4px' }}>
                  <a href={`mailto:${selectedInquiry.email}`} style={{ color: '#818cf8', textDecoration: 'none' }}>
                    {selectedInquiry.email}
                  </a>
                </div>
              </div>

              <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Số điện thoại</div>
                <div style={{ fontWeight: 600, fontSize: '14px', marginTop: '4px' }}>
                  <a href={`tel:${selectedInquiry.phone}`} style={{ color: '#10b981', textDecoration: 'none' }}>
                    {selectedInquiry.phone || 'Chưa cung cấp'}
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
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Mức ngân sách</div>
                <div style={{ fontWeight: 600, fontSize: '14px', marginTop: '4px', color: '#fbbf24' }}>
                  {selectedInquiry.budget}
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Nội dung yêu cầu từ khách:
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
                href={`mailto:${selectedInquiry.email}?subject=BizAI - Phản hồi yêu cầu tư vấn của bạn`}
                className="btn-admin"
              >
                <Mail size={16} /> Gửi Email Trực Tiếp Cho Khách
              </a>
              {selectedInquiry.phone && (
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
                  <MessageSquare size={16} /> Mở Nhắn Tin Zalo
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
