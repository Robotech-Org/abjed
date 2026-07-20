import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#F5F0E6] py-10 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-400 rounded-sm flex items-center justify-center font-bold text-white text-xs">
                ab
              </div>
              <span className="font-bold tracking-tight text-[#2B4238]">ABJAD Kids</span>
            </div>
            <div className="text-xs text-[#8A9D94]">
              © 2024 Abjad Kids LLC. All rights reserved.
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium text-[#4A5D54]">
            <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-black transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-black transition-colors">Parent Guide</Link>
            <Link href="#" className="hover:text-black transition-colors">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer