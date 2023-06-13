"use client"

import "@/styles/globals.css"
import { useState } from "react"
import AuthContextProvider from "@/api/auth/AuthContextProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Sidenav } from "@/components/Sidenav/Sidenav"
import Footer from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
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
            "bg-background min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <AuthContextProvider>
                <div className="relative flex min-h-screen flex-col">
                  <SiteHeader toggleMenu={toggleMenu} showMenu={showMenu} />
                  <Sidenav showMenu={showMenu} toggleMenu={toggleMenu} />
                  <div className="flex-1">{children}</div>
                  <Footer />
                </div>
              </AuthContextProvider>
              <TailwindIndicator />
            </ThemeProvider>
          </QueryClientProvider>
        </body>
      </html>
    </>
  )
}
