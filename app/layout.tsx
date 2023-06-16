'use client'

import '@/styles/globals.css'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import AuthContextProvider from '@/api/auth/AuthContextProvider'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { SideNav } from '@/components/SideNav'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/theme-provider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      retry: 3,
    },
  },
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            'bg-background min-h-screen font-sans antialiased',
            fontSans.variable
          )}
        >
          <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <AuthContextProvider>
                <div className="relative flex min-h-screen flex-col">
                  <Header toggleMenu={toggleMenu} showMenu={showMenu} />
                  <SideNav showMenu={showMenu} toggleMenu={toggleMenu} />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              </AuthContextProvider>
              <TailwindIndicator />
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </QueryClientProvider>
        </body>
      </html>
    </>
  )
}
