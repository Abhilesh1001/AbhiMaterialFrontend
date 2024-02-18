import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Purchase : Purchase Request/Purchase Order',
  description: 'Create Purchase Order Purchase Request',
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