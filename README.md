# 🚀 BizAI Portfolio — Business Portfolio & AI Chat Platform

A modern business portfolio website with integrated AI Chat, built with Next.js, Supabase, and Google Gemini API.

## 📁 Project Structure

```
ChatAI/
├── web/          # 🌐 User-facing website
└── admin/        # 🔧 Admin dashboard
```

## 🛠️ Tech Stack

- **Frontend & Backend:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL)
- **AI:** Google Gemini API
- **Styling:** Tailwind CSS + Framer Motion
- **Deployment:** Vercel
- **Email:** Resend

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd ChatAI
```

### 2. Setup web app
```bash
cd web
cp .env.example .env.local
npm install
npm run dev
```

### 3. Setup admin app
```bash
cd ../admin
cp .env.example .env.local
npm install
npm run dev
```

## 🔑 Environment Variables

### web/.env.local
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
RESEND_API_KEY=your_resend_api_key
```

### admin/.env.local
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXTAUTH_SECRET=your_nextauth_secret
```

## 📚 Documentation

- [Supabase Setup Guide](https://supabase.com/docs)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Vercel Deployment](https://vercel.com/docs)
