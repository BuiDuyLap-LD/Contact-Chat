import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BizAI Portfolio — Giải Pháp Công Nghệ Cho Doanh Nghiệp",
    template: "%s | BizAI Portfolio",
  },
  description:
    "Chuyên gia phát triển phần mềm, website và ứng dụng di động. Tư vấn miễn phí qua AI Chat 24/7. Xem portfolio và bảng giá dịch vụ.",
  keywords: ["portfolio", "freelancer", "web development", "AI", "software"],
  openGraph: {
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
