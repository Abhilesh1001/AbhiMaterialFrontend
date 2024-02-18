import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'IRN : IRN Create / Update / View',
  description: 'Invoice Receipt Note',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <>{children}</>
  )
}