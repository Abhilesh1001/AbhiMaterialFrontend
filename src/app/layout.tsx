import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import AppProvider from '@/redux/Providers'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Procurement Management : Share Holder Fund',
  description: 'Procurement Managemanet System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider >
          <Navbar />
          <div className='relative lg:top-6 top-2'>
        {children}
          </div>
        <Footer />
        </AppProvider>
        </body>
    </html>
  )
}