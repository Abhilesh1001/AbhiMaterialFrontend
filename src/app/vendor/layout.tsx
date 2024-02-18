import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Vendor : Vendor Creation / Update / View',
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