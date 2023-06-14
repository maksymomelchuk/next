import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/assets/img/Logo-NGA-White.png'

export const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image alt="logo" src={logo} className="w-16" />
    </Link>
  )
}
