-- ============================================
-- Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- CONTENT (CMS)
CREATE TABLE IF NOT EXISTS public.content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(section, key)
);

-- SERVICES
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

-- PROJECTS / PORTFOLIO
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

-- CHAT SESSIONS
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

-- CHAT MESSAGES
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INQUIRIES (Contact Form)
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

-- AI CONFIG
CREATE TABLE IF NOT EXISTS public.ai_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  system_prompt TEXT NOT NULL,
  model TEXT DEFAULT 'gemini-1.5-flash',
  temperature FLOAT DEFAULT 0.7,
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SITE SETTINGS
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS)
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Drop old policies if exists
DROP POLICY IF EXISTS "Public read content" ON public.content;
DROP POLICY IF EXISTS "Public read services" ON public.services;
DROP POLICY IF EXISTS "Public read projects" ON public.projects;
DROP POLICY IF EXISTS "Public read ai_config" ON public.ai_config;
DROP POLICY IF EXISTS "Public read site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Insert chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Insert chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Read own chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Insert inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Public read inquiries" ON public.inquiries;

-- Public read for content, services, projects
CREATE POLICY "Public read content" ON public.content FOR SELECT USING (true);
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read ai_config" ON public.ai_config FOR SELECT USING (is_active = true);
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);

-- Allow public insert & read for demo/admin
CREATE POLICY "Insert chat sessions" ON public.chat_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read chat sessions" ON public.chat_sessions FOR SELECT USING (true);
CREATE POLICY "Insert chat messages" ON public.chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Read own chat messages" ON public.chat_messages FOR SELECT USING (true);
CREATE POLICY "Insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read inquiries" ON public.inquiries FOR SELECT USING (true);
CREATE POLICY "Public update inquiries" ON public.inquiries FOR UPDATE USING (true);

-- SEED DEFAULT AI CONFIG
INSERT INTO public.ai_config (system_prompt, model, temperature) VALUES (
  'Bạn là trợ lý AI thông minh đại diện cho BizAI - chuyên gia giải pháp phần mềm, website và chuyển đổi số.
Nhiệm vụ: Tư vấn rõ ràng về quy trình, báo giá các gói dịch vụ (Web từ 5tr, Web App SaaS từ 15tr, Mobile App từ 20tr, AI từ 8tr) và hướng dẫn khách hàng gửi yêu cầu tại trang liên hệ.',
  'gemini-1.5-flash',
  0.7
) ON CONFLICT DO NOTHING;
