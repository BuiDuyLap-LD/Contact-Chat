import type { Metadata } from "next";
import "./globals.css";
import FloatingChatWidget from "@/components/FloatingChatWidget";

export const metadata: Metadata = {
  title: {
    default: "BizAI — Giải Pháp Kiến Trúc Phần Mềm & Trợ Lý AI 24/7",
    template: "%s | BizAI",
  },
  description:
    "Chuyên gia phát triển phần mềm, website cao cấp và ứng dụng di động. Tích hợp trợ lý AI tư vấn và báo giá tự động 24/7.",
  keywords: ["bizai", "web development", "saas", "ai consultant", "nextjs"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        {children}
        <FloatingChatWidget />
      </body>
    </html>
  );
}
