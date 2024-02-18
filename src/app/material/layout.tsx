import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Material : Material create /Update /Change',
  description: 'Po Material create Delete Update',
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