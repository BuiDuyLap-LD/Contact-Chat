'use client'

import { useState, useEffect } from 'react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { Bot, User, Clock, MessageSquare, Search, RefreshCw } from 'lucide-react'

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

export default function WebAdminChatsPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null)
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const loadChats = async () => {
    setIsLoading(true)
    let list: ChatSession[] = []

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient()
        const { data: dbSessions } = await supabase.from('chat_sessions').select('*').order('created_at', { ascending: false }).limit(20)
        if (dbSessions && dbSessions.length > 0) {
          for (const s of dbSessions) {
            const { data: msgs } = await supabase.from('chat_messages').select('*').eq('session_id', s.id).order('created_at', { ascending: true })
            const mappedMsgs: ChatMessage[] = (msgs || []).map((m: any) => ({
              role: m.role,
              content: m.content,
              time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }))

            list.push({
              id: s.id,
              token: s.session_token || 'Phiên vô danh',
              startedAt: new Date(s.created_at).toLocaleString('vi-VN'),
              messagesCount: mappedMsgs.length,
              summary: mappedMsgs[0]?.content || 'Khách bắt đầu cuộc trò chuyện',
              messages: mappedMsgs,
            })
          }
        }
      } catch (err) {
        console.warn('Lỗi đọc chat Supabase:', err)
      }
    }

    if (list.length === 0) {
      list = [
        {
          id: 'sample-1',
          token: 'Khách_01',
          startedAt: 'Hôm nay',
          messagesCount: 2,
          summary: 'Hỏi về quy trình từ ý tưởng đến sản phẩm hoàn thiện',
          messages: [
            { role: 'user', content: 'Quy trình từ ý tưởng đến sản phẩm hoàn thiện thế nào?', time: '10:35' },
            { role: 'assistant', content: 'Quy trình gồm 5 giai đoạn: Khảo sát & Định hình (1-2 ngày) -> Thiết kế UI/UX -> Lập trình theo Sprints -> Kiểm thử & Deploy Cloud -> Bàn giao 100% full source code và bảo hành 6-12 tháng.', time: '10:35' },
          ],
        },
      ]
    }

    setSessions(list)
    setSelectedSession(list[0] || null)
    setIsLoading(false)
  }

  useEffect(() => {
    loadChats()
  }, [])

  const filtered = sessions.filter(
    (s) =>
      s.summary.toLowerCase().includes(search.toLowerCase()) ||
      s.token.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>Lịch Sử Trò Chuyện Của AI</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Xem lại các cuộc trò chuyện của khách truy cập trên trang web để nắm bắt nhu cầu thực tế.
          </p>
        </div>
        <button onClick={loadChats} disabled={isLoading} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
          <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
          Làm Mới
        </button>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', maxWidth: '450px', marginBottom: '24px' }}>
        <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Tìm kiếm nội dung hội thoại..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input"
          style={{ paddingLeft: '44px' }}
        />
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(380px, 1.4fr)', gap: '24px' }}>
        {/* Left: Sessions List */}
        <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map((s) => {
            const isSelected = selectedSession?.id === s.id
            return (
              <div
                key={s.id}
                onClick={() => setSelectedSession(s)}
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
                  <span style={{ fontWeight: 800, fontSize: '14px', color: '#a5b4fc' }}>{s.token}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.messagesCount} tin nhắn</span>
                </div>
                <div style={{ fontSize: '13px', color: '#f8fafc', fontWeight: 600, marginBottom: '6px' }}>{s.summary}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> {s.startedAt}
                </div>
              </div>
            )
          })}
        </div>

        {/* Right: Messages Stream */}
        {selectedSession ? (
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '600px' }}>
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '14px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 800 }}>Phiên: {selectedSession.token}</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Thời gian: {selectedSession.startedAt}</p>
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
                      borderRadius: '10px',
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
                        background: m.role === 'user' ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'rgba(255,255,255,0.05)',
                        border: m.role === 'user' ? 'none' : '1px solid var(--border)',
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
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Chọn một phiên hội thoại để xem nội dung
          </div>
        )}
      </div>
    </div>
  )
}
