'use client'

import '@/styles/globals.css'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import AuthContextProvider from '@/api/auth/AuthContextProvider'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { SideNav } from '@/components/Sidenav'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/theme-provider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      retry: 1,
    },
  },
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [showMenu, setShowMenu] = useState(false)

  const pathname = usePathname().split('/').splice(1)

  const pathnameToShow =
    pathname.length > 1
      ? `${pathname[0].toUpperCase()} ${pathname[1]}`
      : pathname.join('').toUpperCase()

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
                  <title>{`${pathnameToShow || 'Main'} page`}</title>
                  <Header toggleMenu={toggleMenu} showMenu={showMenu} />
                  <SideNav showMenu={showMenu} toggleMenu={toggleMenu} />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              </AuthContextProvider>
              <Toaster />
              <TailwindIndicator />
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </QueryClientProvider>
        </body>
      </html>
    </>
  )
}
