import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const DEFAULT_SYSTEM_PROMPT = `Bạn là Trợ lý AI thông minh đại diện cho Doanh nghiệp / Chuyên gia phát triển giải pháp số (BizAI).
Nhiệm vụ chính của bạn:
1. Giới thiệu năng lực, giải pháp công nghệ, thiết kế website, phần mềm và ứng dụng di động.
2. Dẫn dắt người dùng hiểu rõ về giá trị dịch vụ, tính minh bạch về chi phí.
3. Khi khách hàng hỏi về báo giá:
   - Website Doanh Nghiệp / Landing Page: từ 5.000.000đ - 10.000.000đ (thời gian 5 - 10 ngày).
   - Web App / Hệ thống SaaS / Nền tảng bán hàng: từ 15.000.000đ - 35.000.000đ.
   - Mobile App (iOS & Android): từ 20.000.000đ trở lên.
   - Tích hợp AI / Chatbot / Tự động hoá quy trình: từ 8.000.000đ.
4. Luôn giữ thái độ lịch sự, chuyên nghiệp, súc tích và hỗ trợ tận tâm.
5. Khi người dùng có nhu cầu đặt hàng hoặc cần báo giá chính xác theo yêu cầu riêng, hãy khuyến khích họ để lại thông tin tại trang /contact hoặc gửi email/SĐT để chuyên gia liên hệ trực tiếp.`

export async function POST(req: Request) {
  try {
    const { messages, sessionToken } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Dữ liệu tin nhắn không hợp lệ' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    const lastUserMessage = messages[messages.length - 1]?.content || ''

    // 1. Thử truy vấn system prompt cấu hình từ Supabase (nếu có)
    let systemInstruction = DEFAULT_SYSTEM_PROMPT
    let supabase = null
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        supabase = await createClient()
        const { data: config } = await supabase
          .from('ai_config')
          .select('system_prompt')
          .eq('is_active', true)
          .maybeSingle()
        if (config?.system_prompt) {
          systemInstruction = config.system_prompt
        }
      }
    } catch {
      // Fallback dùng DEFAULT_SYSTEM_PROMPT
    }

    let replyText = ''

    // 2. Gọi Google Gemini API nếu có key, nếu không dùng phản hồi thông minh mặc định (để dev/test offline không bị crash)
    if (apiKey && apiKey !== 'your_gemini_api_key') {
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: systemInstruction,
      })

      // Convert history
      const contents = messages.slice(-8).map((m: { role: string; content: string }) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }))

      const result = await model.generateContent({ contents })
      replyText = result.response.text()
    } else {
      // Mock response hỗ trợ demo khi chưa cấu hình API key
      const lowerMsg = lastUserMessage.toLowerCase()
      if (lowerMsg.includes('giá') || lowerMsg.includes('chi phí') || lowerMsg.includes('báo giá')) {
        replyText = `Chào bạn! Bảng giá dịch vụ tiêu biểu của chúng tôi:\n\n• Website Doanh nghiệp / Landing Page: Từ 5.000.000đ\n• Web App quản lý / SaaS: Từ 15.000.000đ\n• Ứng dụng di động (iOS/Android): Từ 20.000.000đ\n• Tích hợp Trí tuệ nhân tạo (AI Chat/Bot): Từ 8.000.000đ\n\nBạn có thể vào trang [Dịch vụ & Giá](/services) để xem chi tiết hoặc qua trang [Liên hệ](/contact) để nhận báo giá chi tiết cho yêu cầu của bạn nhé!`
      } else if (lowerMsg.includes('liên hệ') || lowerMsg.includes('gặp') || lowerMsg.includes('tư vấn')) {
        replyText = `Bạn có thể bấm vào trang [Liên hệ](/contact) để điền form yêu cầu, hoặc để lại số điện thoại/email ngay tại đây. Chúng tôi sẽ liên hệ lại trong vòng 1-2 giờ làm việc để tư vấn miễn phí!`
      } else {
        replyText = `Xin chào! Tôi là trợ lý AI của BizAI. Tôi có thể giúp bạn tìm hiểu về các giải pháp thiết kế website, lập trình phần mềm, tích hợp AI và tham khảo bảng giá dự án. Bạn đang có ý tưởng kinh doanh hay dự án nào cần triển khai không?`
      }
    }

    // 3. Tự động lưu hội thoại vào Supabase nếu cấu hình sẵn
    if (supabase && sessionToken) {
      try {
        let { data: session } = await supabase
          .from('chat_sessions')
          .select('id')
          .eq('session_token', sessionToken)
          .maybeSingle()

        if (!session) {
          const { data: newSession } = await supabase
            .from('chat_sessions')
            .insert({ session_token: sessionToken })
            .select('id')
            .single()
          session = newSession
        }

        if (session) {
          await supabase.from('chat_messages').insert([
            { session_id: session.id, role: 'user', content: lastUserMessage },
            { session_id: session.id, role: 'assistant', content: replyText },
          ])
        }
      } catch (dbErr) {
        console.warn('Lỗi lưu lịch sử chat vào Supabase (không ảnh hưởng trả lời):', dbErr)
      }
    }

    return NextResponse.json({ reply: replyText })
  } catch (error: any) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: error?.message || 'Có lỗi xảy ra khi xử lý phản hồi AI' },
      { status: 500 }
    )
  }
}
