import type { Metadata } from 'next'
import './globals.css'
import AdminSidebar from '@/components/AdminSidebar'

export const metadata: Metadata = {
  title: 'BizAI Admin Dashboard — Quản Trị Hệ Thống',
  description: 'Bảng điều khiển quản lý phản hồi khách hàng, lịch sử chat AI và cấu hình',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <AdminSidebar />
          <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
