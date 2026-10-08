import Link from 'next/link'
import { MessageSquare, Sparkles, ArrowRight, Bot } from 'lucide-react'

const features = [
  'Tư vấn dịch vụ phù hợp với nhu cầu',
  'Báo giá sơ bộ ngay lập tức',
  'Hỗ trợ 24/7, không cần chờ đợi',
  'Đặt lịch tư vấn trực tiếp',
]

export default function ChatCTA() {
  return (
    <section
      style={{
        padding: '100px 0',
        background: 'var(--bg-surface)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          {/* Left: Text Content */}
          <div>
            <div className="section-tag">
              <Bot size={14} />
              AI Powered
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: '20px', lineHeight: 1.2 }}>
              Hỏi AI Để Được{' '}
              <span className="gradient-text">Tư Vấn Miễn Phí</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '17px', lineHeight: 1.7, marginBottom: '32px' }}>
              AI của tôi được đào tạo để hiểu dịch vụ và giải đáp mọi câu hỏi về dự án,
              ngân sách và quy trình làm việc.
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px' }}>
              {features.map((feature) => (
                <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: 'var(--text-secondary)' }}>
                  <Sparkles size={16} style={{ color: '#6366f1', flexShrink: 0 }} />
                  {feature}
                </li>
              ))}
            </ul>

            <Link href="/chat" className="btn-primary" style={{ fontSize: '16px', padding: '14px 32px' }}>
              <MessageSquare size={20} />
              Bắt Đầu Chat Ngay
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Right: Chat Preview */}
          <div
            className="glass-card"
            style={{
              padding: '24px',
              maxWidth: '420px',
              margin: '0 auto',
            }}
          >
            {/* Chat Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--border)',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Bot size={20} color="white" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '15px' }}>BizAI Assistant</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#10b981' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }} />
                  Đang hoạt động
                </div>
              </div>
            </div>

            {/* Sample Messages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              <div className="chat-bubble-ai">
                👋 Xin chào! Tôi có thể giúp gì cho bạn? Bạn đang cần xây dựng website, app hay dịch vụ nào khác?
              </div>
              <div className="chat-bubble-user">
                Tôi muốn xây dựng website bán hàng, ngân sách khoảng 10 triệu. Có làm được không?
              </div>
              <div className="chat-bubble-ai">
                Hoàn toàn có thể! 🎉 Với 10 triệu, tôi có thể xây dựng website bán hàng đầy đủ với:
                <br />• Giao diện đẹp, responsive
                <br />• Giỏ hàng + thanh toán online
                <br />• Admin quản lý sản phẩm
                <br /><br />
                Bạn muốn tư vấn thêm không? 😊
              </div>

              {/* Typing indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Bot size={14} color="white" />
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '12px 16px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '18px 18px 18px 4px',
                  }}
                >
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            </div>

            {/* Input preview */}
            <div
              style={{
                display: 'flex',
                gap: '10px',
                padding: '12px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '12px',
                border: '1px solid var(--border)',
              }}
            >
              <div style={{ flex: 1, fontSize: '14px', color: 'var(--text-muted)' }}>
                Nhập câu hỏi của bạn...
              </div>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ArrowRight size={14} color="white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
