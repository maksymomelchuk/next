import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer>
      <p className="bg-accent dark:bg-background py-4 text-center text-sm text-white">
        &copy; {`${new Date().getFullYear()}`}, made with by NGA
      </p>
    </footer>
  )
}
