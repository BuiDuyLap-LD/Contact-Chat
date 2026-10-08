import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const DEFAULT_SYSTEM_PROMPT = `Bạn là Trợ lý AI cao cấp đại diện cho BizAI - Chuyên gia kiến trúc giải pháp phần mềm, chuyển đổi số và phát triển web/app.
Phong cách: Chuyên nghiệp, nhạy bén, am hiểu sâu về công nghệ và định giá kinh doanh, nói tiếng Việt chuẩn mực.

CÁC GÓI GIẢI PHÁP & BẢNG GIÁ MINH BẠCH:
1. Landing Page & Web Doanh Nghiệp: Từ 5.000.000đ - 10.000.000đ (Triển khai 5 - 7 ngày, tối ưu SEO, tốc độ cao).
2. Web Application & Nền Tảng SaaS: Từ 15.000.000đ - 35.000.000đ (Triển khai 15 - 25 ngày, Full-stack, Database Supabase/Postgres, phân quyền, thanh toán tự động).
3. Mobile App (iOS & Android): Từ 20.000.000đ - 45.000.000đ (Đa nền tảng Flutter/React Native, push notification).
4. Giải Pháp Trí Tuệ Nhân Tạo (AI Chatbot/Tự Động Hóa): Từ 8.000.000đ - 25.000.000đ.

QUY TRÌNH TỪ Ý TƯỞNG ĐẾN SẢN PHẨM:
- Bước 1: Tiếp nhận ý tưởng & Phân tích tính khả thi mô hình kinh doanh.
- Bước 2: Thiết kế giao diện UI/UX trực quan & thống nhất kiến trúc hệ thống.
- Bước 3: Lập trình theo giai đoạn (Sprints), khách hàng được test trực tiếp trên môi trường staging.
- Bước 4: Kiểm thử bảo mật, tối ưu tốc độ và triển khai lên hạ tầng Cloud (Vercel/AWS).
- Bước 5: Bàn giao toàn bộ 100% mã nguồn, tài liệu hướng dẫn và bảo hành kỹ thuật tối thiểu 6-12 tháng.

HƯỚNG DẪN TƯ VẤN:
- Luôn trả lời trọng tâm, giải thích dễ hiểu, mang tính xây dựng cao.
- Khuyến khích khách hàng bấm vào mục [Liên hệ](/contact) hoặc [Báo giá](/services) để nhận đề xuất chính thức.`

function generateSmartFallbackReply(userMessage: string): string {
  const msg = userMessage.toLowerCase()

  if (msg.includes('quy trình') || msg.includes('bước') || msg.includes('làm thế nào') || msg.includes('triển khai')) {
    return `Quy trình từ ý tưởng đến sản phẩm hoàn thiện gồm 5 giai đoạn chuyên nghiệp:\n\n` +
      `1️⃣ **Khảo sát & Định hình (1 - 2 ngày):** Phân tích bài toán kinh doanh, tư vấn lựa chọn tech-stack tối ưu chi phí và xác định các tính năng cốt lõi (MVP).\n` +
      `2️⃣ **Thiết kế UI/UX & Kiến trúc (3 - 5 ngày):** Dựng bản mẫu giao diện trực quan, luồng người dùng và thiết kế cơ sở dữ liệu.\n` +
      `3️⃣ **Lập trình theo Sprints:** Phát triển Frontend & Backend song song. Bạn được theo dõi sản phẩm thực tế qua đường link xem trước liên tục.\n` +
      `4️⃣ **Kiểm thử & Triển khai:** Tối ưu tốc độ tải trang, kiểm tra bảo mật và deploy tự động lên hạ tầng Cloud toàn cầu (Vercel, Supabase).\n` +
      `5️⃣ **Bàn giao trọn gói:** Chuyển giao 100% bản quyền mã nguồn, hướng dẫn vận hành và bảo hành kỹ thuật 6 - 12 tháng.\n\n` +
      `Bạn có thể để lại thông tin tại trang **[Liên Hệ](/contact)** để chúng tôi lập kế hoạch chi tiết cho ý tưởng của bạn nhé!`
  }

  if (msg.includes('giá') || msg.includes('chi phí') || msg.includes('báo giá') || msg.includes('bao nhiêu')) {
    return `Bảng giá các giải pháp công nghệ tiêu chuẩn của chúng tôi:\n\n` +
      `• **Landing Page / Web Doanh Nghiệp:** Từ 5.000.000đ (thời gian 5 - 7 ngày)\n` +
      `• **Web Application & Hệ thống SaaS:** Từ 15.000.000đ (thời gian 15 - 25 ngày)\n` +
      `• **Ứng Dụng Di Động (iOS & Android):** Từ 20.000.000đ (thời gian 25 - 40 ngày)\n` +
      `• **Tích Hợp AI & Chatbot Thông Minh:** Từ 8.000.000đ (thời gian 7 - 14 ngày)\n\n` +
      `Tất cả các gói đều **bàn giao 100% Full Source Code**, không phí bản quyền hàng tháng. Bạn có thể xem bảng so sánh tính năng tại trang **[Dịch Vụ & Giá](/services)**!`
  }

  if (msg.includes('công nghệ') || msg.includes('tech') || msg.includes('ngôn ngữ') || msg.includes('framework')) {
    return `Hệ thống của chúng tôi được xây dựng trên nền tảng công nghệ hiện đại hàng đầu thế giới hiện nay:\n\n` +
      `• **Frontend:** Next.js 14/15, React, TypeScript, Tailwind CSS, Framer Motion (cực kỳ nhanh và chuẩn SEO).\n` +
      `• **Backend & Database:** Serverless API, Supabase (PostgreSQL), Realtime sync, Redis cache.\n` +
      `• **AI & Tự động hoá:** Google Gemini API, OpenAI, LangChain.\n` +
      `• **Hạ tầng Cloud:** Vercel Edge Network, AWS, Docker.\n\n` +
      `Nhờ kiến trúc Serverless, hệ thống vận hành với chi phí máy chủ $0 hoặc rất thấp khi bắt đầu!`
  }

  if (msg.includes('bảo hành') || msg.includes('hỗ trợ') || msg.includes('bảo trì')) {
    return `Chính sách cam kết của chúng tôi:\n\n` +
      `🛡️ **Bảo hành miễn phí 6 - 12 tháng** cho mọi lỗi phát sinh.\n` +
      `🚀 **Bàn giao 100% mã nguồn** và quyền kiểm soát tài nguyên đám mây.\n` +
      `🤝 **Hỗ trợ nâng cấp tính năng** với chi phí ưu đãi cho đối tác lâu năm.\n\n` +
      `Chúng tôi ký hợp đồng rõ ràng và thoả thuận bảo mật NDA cho mọi dự án.`
  }

  if (msg.includes('liên hệ') || msg.includes('tư vấn') || msg.includes('gặp') || msg.includes('trao đổi')) {
    return `Chúng tôi rất sẵn lòng đồng hành cùng bạn! Bạn có thể gửi yêu cầu trực tiếp qua biểu mẫu tại trang **[Liên Hệ](/contact)**. Chúng tôi sẽ phân tích ý tưởng và liên hệ lại trong vòng 1 - 2 giờ làm việc!`
  }

  return `Chào bạn! Tôi là Trợ lý AI của BizAI. Tôi có thể hỗ trợ bạn tìm hiểu năng lực công nghệ, tham khảo bảng giá dịch vụ (Web từ 5tr, SaaS từ 15tr, App từ 20tr, AI từ 8tr) hoặc quy trình triển khai ý tưởng từ A đến Z.\n\nBạn đang có ý tưởng kinh doanh cụ thể nào muốn triển khai không?`
}

export async function POST(req: Request) {
  try {
    const { messages, sessionToken } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Dữ liệu tin nhắn không hợp lệ' }, { status: 400 })
    }

    const lastUserMessage = messages[messages.length - 1]?.content || ''
    const apiKey = process.env.GEMINI_API_KEY
    let replyText = ''

    // 1. Thử gọi Google Gemini API
    if (apiKey && apiKey.trim() !== '' && apiKey !== 'your_gemini_api_key' && apiKey !== 'demo') {
      try {
        const genAI = new GoogleGenerativeAI(apiKey.trim())
        // Thử model mới nhất trước, nếu lỗi sẽ tự động fallback
        const modelNames = ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-2.0-flash']
        let generated = false

        for (const mName of modelNames) {
          try {
            const model = genAI.getGenerativeModel({
              model: mName,
              systemInstruction: DEFAULT_SYSTEM_PROMPT,
            })

            const historyContents = messages.slice(-8).map((m: { role: string; content: string }) => ({
              role: m.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: m.content }],
            }))

            const result = await model.generateContent({ contents: historyContents })
            const text = result.response.text()
            if (text && text.trim().length > 0) {
              replyText = text
              generated = true
              break
            }
          } catch (modelErr: any) {
            console.warn(`Thử model ${mName} không thành công:`, modelErr?.message)
          }
        }

        if (!generated) {
          replyText = generateSmartFallbackReply(lastUserMessage)
        }
      } catch (geminiError: any) {
        console.warn('Lỗi gọi Gemini API, chuyển sang Engine Heuristic AI:', geminiError?.message)
        replyText = generateSmartFallbackReply(lastUserMessage)
      }
    } else {
      // Dùng Engine Heuristic AI nếu chưa có API key
      replyText = generateSmartFallbackReply(lastUserMessage)
    }

    // 2. Tự động lưu hội thoại vào Supabase nếu đã kết nối
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && sessionToken) {
        const supabase = await createClient()
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
      }
    } catch (dbErr) {
      // Supabase lỗi không chặn luồng trả lời
    }

    return NextResponse.json({ reply: replyText })
  } catch (error: any) {
    console.error('Chat API Error:', error)
    // Luôn luôn trả lời thông minh thay vì crash 500
    return NextResponse.json({
      reply: generateSmartFallbackReply('tư vấn'),
    })
  }
}
