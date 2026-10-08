# Supabase Database Schema
# Run this in your Supabase SQL Editor

# ============================================
# CONTENT (CMS)
# ============================================
CREATE TABLE IF NOT EXISTS public.content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(section, key)
);

# ============================================
# SERVICES
# ============================================
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price_min INTEGER DEFAULT 0,
  price_max INTEGER DEFAULT 0,
  currency TEXT DEFAULT 'VND',
  features JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

# ============================================
# PROJECTS / PORTFOLIO
# ============================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  project_url TEXT,
  github_url TEXT,
  price_range TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

# ============================================
# CHAT SESSIONS
# ============================================
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token TEXT UNIQUE NOT NULL,
  user_name TEXT,
  user_email TEXT,
  user_ip TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_active_at TIMESTAMPTZ DEFAULT NOW()
);

# ============================================
# CHAT MESSAGES
# ============================================
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

# ============================================
# INQUIRIES (Contact Form)
# ============================================
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_id UUID REFERENCES public.services(id),
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

# ============================================
# AI CONFIG
# ============================================
CREATE TABLE IF NOT EXISTS public.ai_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  system_prompt TEXT NOT NULL,
  model TEXT DEFAULT 'gemini-2.0-flash',
  temperature FLOAT DEFAULT 0.7,
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

# ============================================
# SITE SETTINGS
# ============================================
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

# ============================================
# ROW LEVEL SECURITY (RLS)
# ============================================
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

# Public read for content, services, projects
CREATE POLICY "Public read content" ON public.content FOR SELECT USING (true);
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read ai_config" ON public.ai_config FOR SELECT USING (is_active = true);
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);

# Anyone can insert chat sessions/messages and inquiries
CREATE POLICY "Insert chat sessions" ON public.chat_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Insert chat messages" ON public.chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Read own chat messages" ON public.chat_messages FOR SELECT USING (true);
CREATE POLICY "Insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);

# ============================================
# SEED DEFAULT AI CONFIG
# ============================================
INSERT INTO public.ai_config (system_prompt, model, temperature) VALUES (
  'Bạn là trợ lý AI của [Tên của bạn], một chuyên gia về [lĩnh vực của bạn].

THÔNG TIN VỀ CHỦ SỞ HỮU:
- Tên: [Tên của bạn]
- Chuyên môn: [Mô tả chuyên môn]
- Kinh nghiệm: [Số năm kinh nghiệm]
- Liên hệ: [Email/Phone]

DỊCH VỤ VÀ GIÁ:
- [Dịch vụ 1]: [Giá]
- [Dịch vụ 2]: [Giá]
- [Dịch vụ 3]: [Giá]

HƯỚNG DẪN:
1. Luôn trả lời bằng tiếng Việt một cách thân thiện và chuyên nghiệp
2. Khi người dùng hỏi về giá, đưa ra bảng giá cụ thể
3. Khi người dùng muốn liên hệ, hướng dẫn họ đến trang /contact
4. Không bịa đặt thông tin, chỉ trả lời những gì bạn biết
5. Cuối mỗi câu trả lời quan trọng, gợi ý người dùng liên hệ để được tư vấn',
  'gemini-2.0-flash',
  0.7
);

# ============================================
# SEED DEFAULT SITE SETTINGS
# ============================================
INSERT INTO public.site_settings (key, value) VALUES
  ('site_name', 'BizAI Portfolio'),
  ('site_tagline', 'Giải pháp công nghệ cho doanh nghiệp của bạn'),
  ('owner_name', 'Tên của bạn'),
  ('owner_email', 'email@example.com'),
  ('owner_phone', '+84 xxx xxx xxx'),
  ('facebook_url', ''),
  ('linkedin_url', ''),
  ('github_url', '');
