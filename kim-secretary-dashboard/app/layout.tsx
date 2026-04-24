import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '김비서 대시보드',
  description: '전사 매출, 프로젝트, 일정, 회의를 한곳에서 관리하는 통합 비즈니스 대시보드',
  metadataBase: new URL('https://example.com'),
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: '김비서',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-500">
        {children}
      </body>
    </html>
  )
}
