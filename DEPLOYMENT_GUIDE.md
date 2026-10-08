# 📖 HƯỚNG DẪN TRIỂN KHAI VÀ SỬ DỤNG DỰ ÁN (100% MIỄN PHÍ)

Hệ thống bao gồm 2 ứng dụng:
- **`web/`**: Website chính dành cho khách hàng truy cập, xem portfolio, tham khảo giá, trò chuyện với AI và gửi form liên hệ.
- **`admin/`**: Trang quản trị riêng biệt để bạn xem danh sách liên hệ của khách hàng, đọc lại lịch sử chat của AI và cấu hình Prompt.

---

## 🚀 1. Chạy thử nghiệm ngay trên máy tính của bạn (Localhost)

Mở 2 cửa sổ terminal riêng biệt:

### Terminal 1: Chạy Web chính (Port 3000)
```bash
cd web
npm run dev
```
👉 Mở trình duyệt truy cập: [http://localhost:3000](http://localhost:3000)

### Terminal 2: Chạy Admin Dashboard (Port 3001)
```bash
cd admin
npm run dev -- -p 3001
```
👉 Mở trình duyệt truy cập: [http://localhost:3001](http://localhost:3001)

---

## 🔑 2. Lấy Google Gemini API Key (Miễn phí)

1. Truy cập: [Google AI Studio](https://aistudio.google.com/)
2. Đăng nhập bằng tài khoản Google (Gmail)
3. Bấm vào nút **Get API key** ở thanh menu bên trái -> Chọn **Create API key**
4. Copy đoạn mã key nhận được và dán vào:
   - File `web/.env.local`:
     ```env
     GEMINI_API_KEY=AIzaSy... (dán key của bạn vào đây)
     ```

---

## 🗄️ 3. Khởi tạo Cơ sở dữ liệu Supabase (Miễn phí)

1. Truy cập: [https://supabase.com](https://supabase.com) và bấm **Start your project**
2. Tạo một Organization và chọn **New Project** (đặt tên dự án là `ChatAI`, chọn vùng Singapore gần VN nhất)
3. Khi project tạo xong:
   - Vào menu bên trái chọn **SQL Editor**
   - Bấm **New query**, mở file [`supabase/schema.sql`](file:///e:/KI1-2026/ChatAI/supabase/schema.sql) trong dự án này, copy toàn bộ nội dung và bấm nút **Run** (Chạy). Toàn bộ bảng, phân quyền bảo mật RLS và dữ liệu mẫu sẽ được tạo tự động.
4. Lấy API Keys:
   - Vào **Project Settings** -> **API**
   - Copy **Project URL** và **anon public key**
   - Dán vào cả 2 file `.env.local` ở thư mục `web` và `admin`:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
     ```

---

## 🐙 4. Đẩy mã nguồn lên GitHub

Mã nguồn đã được khởi tạo sẵn git và tạo commit đầu tiên. Bạn chỉ cần:
1. Đăng nhập [GitHub](https://github.com) -> Bấm **New repository** (đặt tên là `ChatAI`)
2. Tại máy tính của bạn, mở terminal ở thư mục `e:\KI1-2026\ChatAI` và chạy:
```bash
git remote add origin https://github.com/<tên-tài-khoản-github-của-bạn>/ChatAI.git
git branch -M main
git push -u origin main
```

---

## ☁️ 5. Deploy lên Vercel (Miễn phí 100%)

Vercel là nền tảng tối ưu nhất cho Next.js với gói Hobby miễn phí trọn đời và tự động cấp chứng chỉ SSL HTTPS.

### Deploy Website Khách Hàng:
1. Đăng nhập [Vercel](https://vercel.com) bằng tài khoản GitHub
2. Bấm **Add New...** -> **Project** -> Chọn repository `ChatAI`
3. Ở phần cấu hình:
   - **Root Directory**: Bấm Edit và chọn thư mục `web`
   - **Environment Variables**: Thêm 3 biến môi trường:
     - `GEMINI_API_KEY`: *(Key bạn lấy ở bước 2)*
     - `NEXT_PUBLIC_SUPABASE_URL`: *(Link Supabase)*
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: *(Key anon Supabase)*
4. Bấm nút **Deploy**. Sau ~1 phút, bạn sẽ có đường link công khai dạng `https://your-project.vercel.app`!

### Deploy Admin Dashboard:
1. Tương tự, trên Vercel bấm **Add New...** -> **Project** -> Chọn lại repository `ChatAI`
2. Đổi **Project Name** thành `chatai-admin`
3. **Root Directory**: Chọn thư mục `admin`
4. Cấu hình biến môi trường tương tự Supabase
5. Bấm **Deploy**. Bạn sẽ có link riêng dạng `https://chatai-admin.vercel.app` để quản lý.

---

## ✨ 6. Cấu trúc các trang người dùng & chức năng đã hoàn thiện

| Trang / Chức năng | Đường dẫn | Điểm nổi bật |
|---|---|---|
| **Trang chủ** | `/` | Hero hiệu ứng gradient orb, thống kê năng lực, xem nhanh dịch vụ, dự án và widget chat |
| **Về tôi** | `/about` | Câu chuyện thương hiệu, giá trị cốt lõi, hành trình phát triển từ 2021 đến kỷ nguyên AI |
| **Dịch vụ & Báo giá** | `/services` | 4 gói dịch vụ minh bạch chi phí (Web, SaaS, App, AI), cam kết bảo hành & bàn giao mã nguồn |
| **Danh mục dự án** | `/portfolio` | Bộ lọc danh mục (Web, App, AI), hiển thị mức chi phí và công nghệ từng dự án |
| **Hỏi đáp AI 24/7** | `/chat` | Tích hợp Google Gemini, gợi ý câu hỏi nhanh, hướng dẫn khách hàng để lại liên hệ |
| **Liên hệ & Đặt hàng** | `/contact` | Form tiếp nhận yêu cầu, chọn ngân sách dự kiến, lưu dữ liệu trực tiếp |
| **Admin Dashboard** | `admin/` | Thống kê số lượng lead, xem chi tiết từng khách hàng, đọc log trò chuyện của AI |
| **CMS & Huấn luyện AI**| `admin/settings` | Sửa System Prompt của AI, chọn model và tuỳ chỉnh thông tin hotline/email |
