'use client'

import { useState } from 'react'
import { Bot, User, Clock, MessageSquare, Search } from 'lucide-react'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  time: string
}

interface ChatSession {
  id: string
  token: string
  startedAt: string
  messagesCount: number
  summary: string
  messages: ChatMessage[]
}

const mockSessions: ChatSession[] = [
  {
    id: '1',
    token: 'sess_9fa812',
    startedAt: '08/10/2026, 09:12',
    messagesCount: 4,
    summary: 'Hỏi về báo giá website thương mại điện tử tích hợp cổng thanh toán',
    messages: [
      { role: 'user', content: 'Tôi muốn làm website bán hàng quần áo, có thanh toán MoMo và VNPay thì giá khoảng bao nhiêu?', time: '09:12' },
      { role: 'assistant', content: 'Chào bạn! Với website bán hàng đầy đủ giỏ hàng, quản lý đơn hàng và tích hợp cổng thanh toán tự động (MoMo, VNPay), chi phí thuộc gói Web Application/SaaS dao động từ 15.000.000đ - 25.000.000đ tuỳ theo độ phức tạp của giao diện.', time: '09:12' },
      { role: 'user', content: 'Thời gian làm trong bao lâu vậy bạn?', time: '09:13' },
      { role: 'assistant', content: 'Thời gian hoàn thiện và bàn giao chạy thử thường từ 15 đến 20 ngày làm việc. Bạn có thể để lại thông tin tại trang /contact để chúng tôi gửi bản demo giao diện mẫu nhé!', time: '09:13' },
    ],
  },
  {
    id: '2',
    token: 'sess_3bc194',
    startedAt: '08/10/2026, 07:45',
    messagesCount: 2,
    summary: 'Hỏi về giải pháp tích hợp AI Chatbot cho phòng khám nha khoa',
    messages: [
      { role: 'user', content: 'Bên bạn có làm AI bot tư vấn và đặt lịch khám tự động trên web không?', time: '07:45' },
      { role: 'assistant', content: 'Có bạn nhé! Gói Giải pháp AI & Chatbot của chúng tôi có giá từ 8.000.000đ, được huấn luyện theo tài liệu bảng giá và dịch vụ của phòng khám, tự động lấy thông tin khách và đặt lịch 24/7.', time: '07:45' },
    ],
  },
]

export default function ChatsLogPage() {
  const [sessions, setSessions] = useState<ChatSession[]>(mockSessions)
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(mockSessions[0])
  const [search, setSearch] = useState('')

  const filtered = sessions.filter(
    (s) =>
      s.summary.toLowerCase().includes(search.toLowerCase()) ||
      s.token.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>Lịch Sử Trò Chuyện Của AI</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Xem lại toàn bộ hội thoại giữa khách truy cập và trợ lý AI để nắm bắt xu hướng nhu cầu của khách hàng.
        </p>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', maxWidth: '450px', marginBottom: '24px' }}>
        <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Tìm kiếm nội dung trao đổi hoặc mã phiên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 14px 12px 40px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            color: '#f8fafc',
            fontSize: '14px',
            outline: 'none',
          }}
        />
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(380px, 1.4fr)', gap: '24px' }}>
        
        {/* Left: Sessions List */}
        <div className="admin-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map((s) => {
            const isSelected = selectedSession?.id === s.id
            return (
              <div
                key={s.id}
                onClick={() => setSelectedSession(s)}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                  border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '13px', color: '#818cf8' }}>{s.token}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.messagesCount} tin nhắn</span>
                </div>
                <div style={{ fontSize: '13px', color: '#f8fafc', fontWeight: 500, marginBottom: '6px' }}>{s.summary}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> {s.startedAt}
                </div>
              </div>
            )
          })}
        </div>

        {/* Right: Messages Stream */}
        {selectedSession ? (
          <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', height: '600px' }}>
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '14px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Chi Tiết Phiên: {selectedSession.token}</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Bắt đầu: {selectedSession.startedAt}</p>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '6px' }}>
              {selectedSession.messages.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: m.role === 'user' ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #6366f1, #a855f7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {m.role === 'user' ? <User size={15} /> : <Bot size={15} color="white" />}
                  </div>

                  <div>
                    <div
                      style={{
                        padding: '12px 16px',
                        borderRadius: '14px',
                        background: m.role === 'user' ? 'rgba(99,102,241,0.2)' : 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        fontSize: '13px',
                        lineHeight: 1.6,
                        color: '#f8fafc',
                      }}
                    >
                      {m.content}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', textAlign: m.role === 'user' ? 'right' : 'left' }}>
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="admin-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Chọn một phiên hội thoại để xem nội dung
          </div>
        )}

      </div>
    </div>
  )
}
