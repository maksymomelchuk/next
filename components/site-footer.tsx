import React from "react"

const Footer: React.FC = () => {
  return (
    <footer>
      <p className="text-center py-4 bg-accent text-white text-sm">
        &copy; {`${new Date().getFullYear()}`}, made with by NGA
      </p>
    </footer>
  )
}
export default Footer
