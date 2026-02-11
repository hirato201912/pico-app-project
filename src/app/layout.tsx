import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "そろばん塾ピコ｜入塾説明会",
  description: "糸島学習塾YES そろばん塾ピコ 入塾説明会プレゼンテーション",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
