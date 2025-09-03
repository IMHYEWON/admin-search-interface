import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Search Interface',
  description: 'Admin search interface with autocomplete',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ConfigProvider locale={koKR}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  )
}
