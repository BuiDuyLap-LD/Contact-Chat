'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Bot, Sparkles, User, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'assistant',
      content: 'Xin chào! Bạn cần tư vấn báo giá website hay định hình ý tưởng kinh doanh? Tôi có thể hỗ trợ bạn ngay tại đây! ⚡',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await res.json()
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), role: 'assistant', content: data.reply },
        ])
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Bạn có thể để lại thông tin tại trang [Liên Hệ](/contact) để chuyên gia tư vấn trực tiếp nhé!',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ position: 'fixed', bottom: '28px', right: '28px', zIndex: 999 }}>
      {/* Chat Popup Box */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '70px',
            right: '0',
            width: '360px',
            maxWidth: 'calc(100vw - 36px)',
            height: '480px',
            background: 'rgba(10, 15, 29, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(99, 102, 241, 0.25)',
            overflow: 'hidden',
            animation: 'fadeInUp 0.3s ease-out',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '14px 18px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))',
              borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Bot size={18} color="white" />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700 }}>Trợ Lý BizAI</div>
                <div style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                  Đang trực tuyến
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link
                href="/chat"
                title="Mở toàn màn hình"
                style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
              >
                <ExternalLink size={16} />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '10px 14px',
                  borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: m.role === 'user' ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'rgba(255, 255, 255, 0.05)',
                  border: m.role === 'user' ? 'none' : '1px solid rgba(99, 102, 241, 0.2)',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {m.content}
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', gap: '4px', padding: '10px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '14px', alignSelf: 'flex-start' }}>
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            style={{
              padding: '12px',
              borderTop: '1px solid rgba(99, 102, 241, 0.2)',
              display: 'flex',
              gap: '8px',
              background: 'rgba(5, 7, 14, 0.8)',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hỏi về báo giá, quy trình..."
              style={{
                flex: 1,
                padding: '10px 14px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: '10px',
                color: 'white',
                fontSize: '13px',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                border: 'none',
                borderRadius: '10px',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                opacity: input.trim() ? 1 : 0.5,
              }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          border: '2px solid rgba(255, 255, 255, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 8px 30px rgba(99, 102, 241, 0.6), 0 0 20px rgba(168, 85, 247, 0.4)',
          transition: 'all 0.3s ease',
        }}
        className="pulse-badge"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  )
}
