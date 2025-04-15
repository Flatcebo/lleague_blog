import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import NoticeBar from "@/components/NoticeBar";
import BottomNavBar from "@/components/BottomNavBar";
import BaseLayout from "@/components/BaseLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "블로그",
  description: "블로그 입니다.",
  keywords: "블로그, 공연, 음악, 일상생활, IT, IT정보",
  openGraph: {
    title: "블로그",
    description: "블로그 입니다.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
