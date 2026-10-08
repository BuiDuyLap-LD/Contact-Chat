import AdminSidebar from '@/components/AdminSidebar'

export const metadata = {
  title: 'Quản Trị Hệ Thống | BizAI Admin',
  description: 'Quản lý thông tin liên hệ, phản hồi khách hàng và cấu hình AI',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#05070e' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '36px 40px', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  )
}
