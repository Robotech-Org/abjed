import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#F5F0E6] py-10 px-6 mt-auto dark:bg-slate-900 ">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left ">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              
              <span className="font-bold text-2xl tracking-tight dark:text-emerald-100 ">ABJAD Kids</span>
            </div>
            <div className="text-xs text-[#8A9D94] dark:text-slate-500">
              © 2026 Abjad Kids LLC. All rights reserved.
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium text-[#4A5D54] dark:text-slate-400">
            
            <Link href="#" className="hover:scale-105 transition-colors hover:text-black dark:hover:text-white">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer