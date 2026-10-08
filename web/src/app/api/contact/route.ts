import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, service, budget, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Vui lòng điền đầy đủ Tên, Email và Nội dung yêu cầu' }, { status: 400 })
    }

    // Lưu vào Supabase nếu đã có credentials
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        const supabase = await createClient()
        const { error } = await supabase.from('inquiries').insert([
          {
            name,
            email,
            phone: phone || null,
            budget: budget || null,
            message: `[Dịch vụ quan tâm: ${service || 'Chung'}] ${message}`,
            status: 'new',
          },
        ])
        if (error) {
          console.warn('Supabase insert inquiry error:', error.message)
        }
      } catch (dbErr) {
        console.warn('Lỗi kết nối Supabase khi lưu inquiry:', dbErr)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Yêu cầu của bạn đã được tiếp nhận thành công! Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.',
    })
  } catch (error: any) {
    console.error('Contact API Error:', error)
    return NextResponse.json({ error: 'Không thể gửi form lúc này, xin vui lòng thử lại' }, { status: 500 })
  }
}
