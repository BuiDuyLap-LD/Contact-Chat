'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Inbox, MessageSquare, Users, Sparkles, ArrowUpRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface StatCardProps {
  title: string
  value: string | number
  change: string
  icon: any
  color: string
}

function StatCard({ title, value, change, icon: Icon, color }: StatCardProps) {
  return (
    <div className="admin-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>{title}</div>
          <div style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'Syne, sans-serif' }}>{value}</div>
        </div>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: `${color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={20} style={{ color }} />
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span>↑</span> {change}
      </div>
    </div>
  )
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalInquiries: 8,
    newInquiries: 3,
    totalChatSessions: 24,
    aiResponses: 96,
  })

  const [recentInquiries, setRecentInquiries] = useState<any[]>([
    {
      id: '1',
      name: 'Trần Minh Khang',
      email: 'khang.tran@startup.vn',
      phone: '0988 123 456',
      service: 'Web Application & SaaS',
      budget: '25.000.000đ',
      created_at: 'Hôm nay, 08:30',
      status: 'new',
    },
    {
      id: '2',
      name: 'Lê Hoàng Yến',
      email: 'yen.le@beautyco.com',
      phone: '0912 888 999',
      service: 'Landing Page & Web Doanh Nghiệp',
      budget: '< 10.000.000đ',
      created_at: 'Hôm qua, 16:45',
      status: 'read',
    },
    {
      id: '3',
      name: 'Vũ Đức Nam',
      email: 'nam.vu@logistics.vn',
      phone: '0903 555 777',
      service: 'Giải Pháp AI & Chatbot',
      budget: '15.000.000đ',
      created_at: '2 ngày trước',
      status: 'replied',
    },
  ])

  useEffect(() => {
    // Tải dữ liệu thật từ Supabase nếu đã có credentials
    const fetchDb = async () => {
      try {
        const supabase = createClient()
        const { data: inqs } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(5)
        if (inqs && inqs.length > 0) {
          setRecentInquiries(inqs)
          setStats((prev) => ({ ...prev, totalInquiries: inqs.length }))
        }
      } catch {
        // Sử dụng dữ liệu preview mẫu
      }
    }
    fetchDb()
  }, [])

  return (
    <div>
      {/* Top Banner */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>Chào Mừng Đến Với Bảng Điều Khiển</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Theo dõi các lượt tương tác của khách hàng, phản hồi form và hoạt động của trợ lý AI.
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '36px',
        }}
      >
        <StatCard title="Tổng Liên Hệ Nhận Được" value={stats.totalInquiries} change="+3 khách hàng mới" icon={Inbox} color="#6366f1" />
        <StatCard title="Chờ Xử Lý" value={stats.newInquiries} change="Ưu tiên phản hồi trong ngày" icon={Users} color="#f59e0b" />
        <StatCard title="Phiên Trò Chuyện AI" value={stats.totalChatSessions} change="+12 phiên trong tuần" icon={MessageSquare} color="#a855f7" />
        <StatCard title="Trạng Thái AI Model" value="Hoạt Động" change="Gemini 1.5 Flash (Sẵn sàng)" icon={Sparkles} color="#10b981" />
      </div>

      {/* Recent Inquiries Table */}
      <div className="admin-card" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 700 }}>Yêu Cầu Tư Vấn Gần Đây</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Khách hàng tiềm năng đã điền biểu mẫu liên hệ</p>
          </div>
          <Link href="/inquiries" className="btn-admin" style={{ fontSize: '13px', padding: '8px 14px' }}>
            Xem Tất Cả Liên Hệ
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 14px', fontWeight: 600, fontSize: '13px' }}>Khách Hàng</th>
                <th style={{ padding: '12px 14px', fontWeight: 600, fontSize: '13px' }}>Email / SĐT</th>
                <th style={{ padding: '12px 14px', fontWeight: 600, fontSize: '13px' }}>Nhu Cầu & Ngân Sách</th>
                <th style={{ padding: '12px 14px', fontWeight: 600, fontSize: '13px' }}>Thời Gian</th>
                <th style={{ padding: '12px 14px', fontWeight: 600, fontSize: '13px' }}>Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              {recentInquiries.map((inq) => (
                <tr key={inq.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '14px', fontWeight: 600 }}>{inq.name}</td>
                  <td style={{ padding: '14px', color: 'var(--text-secondary)' }}>
                    <div>{inq.email}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{inq.phone || 'Chưa cung cấp'}</div>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <div style={{ color: '#818cf8', fontWeight: 500 }}>{inq.service || 'Tư vấn chung'}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Ngân sách: {inq.budget || 'Thoả thuận'}</div>
                  </td>
                  <td style={{ padding: '14px', color: 'var(--text-muted)', fontSize: '13px' }}>{inq.created_at}</td>
                  <td style={{ padding: '14px' }}>
                    <span className={`admin-badge badge-${inq.status || 'new'}`}>
                      {inq.status === 'new' ? 'Mới' : inq.status === 'read' ? 'Đã xem' : 'Đã phản hồi'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Setup Guide Checklist */}
      <div className="admin-card">
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle size={18} style={{ color: '#10b981' }} />
          Các Bước Hoàn Tất Triển Khai Miễn Phí
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', fontSize: '13px' }}>
          <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
            <strong>1. Supabase Database:</strong> Tạo project miễn phí trên Supabase, dán file <code>supabase/schema.sql</code> vào SQL Editor để khởi tạo bảng.
          </div>
          <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
            <strong>2. Google Gemini API:</strong> Lấy API key miễn phí tại <code>aistudio.google.com</code> rồi điền vào biến môi trường <code>GEMINI_API_KEY</code>.
          </div>
          <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
            <strong>3. GitHub & Vercel:</strong> Đẩy code lên GitHub repository riêng và liên kết với Vercel để hệ thống tự động build & deploy toàn cầu.
          </div>
        </div>
      </div>

    </div>
  )
}
