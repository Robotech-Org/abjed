"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, GraduationCap, Ticket, Settings, LogOut } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Read the non-httpOnly UI cookie to determine state
    setIsLoggedIn(document.cookie.includes("isLoggedIn=true"));
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      // Ignore
    }
    // Remove UI cookie from client side to ensure immediate state update
    document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsLoggedIn(false);
    router.push("/login");
  }

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-md flex items-center justify-center font-bold text-white">
            <img src="/abjad.svg" alt="Abjad Kids Logo" className="w-full h-full object-contain" />
          </div>
          <Link className="font-bold text-lg tracking-tight text-[#2B4238]" href={"/"}>ABJAD Kids</Link>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium ">
          <Link href="/" className={`hover:text-black ${pathname === '/' ? 'font-bold text-[#2B4238]' : 'text-[#4A5D54]'}`}>
            Home
          </Link>
          <Link href="/pricing" className={`hover:text-black transition-colors ${pathname === '/pricing' ? 'font-bold text-[#2B4238]' : 'text-[#4A5D54]'}`}>
            Subscription
          </Link>
          <Link href="/login" className="px-5 py-2.5 bg-white border border-neutral-200 text-[#2B4238] rounded-full hover:bg-neutral-50 transition-colors shadow-sm font-bold hover:animate-pulse">
            Parent Portal
          </Link>
          {isLoggedIn && (
            <button onClick={handleLogout} className="text-[#4A5D54] hover:text-black transition-colors font-medium">
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden p-2 -mr-2 text-[#2B4238]"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6">
          <button onClick={() => setIsOpen(false)} className="text-neutral-500 hover:text-black">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col items-center px-6 pb-8 border-b border-neutral-100">
          <div className="w-16 h-16 bg-neutral-100 rounded-full mb-4 border-2 border-neutral-200 overflow-hidden">
            {/* Placeholder avatar similar to image */}
            <div className="w-full h-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl">L</div>
          </div>
          <h2 className="text-xl font-bold text-[#2B4238] mb-1">Hi, Learner!</h2>
          <p className="text-sm text-neutral-500">Ready for a fun day?</p>
        </div>

        <div className="flex-1 px-4 py-6 space-y-2">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-colors ${
              pathname === '/' ? 'bg-yellow-400 text-yellow-900' : 'text-[#4A5D54] hover:bg-neutral-50'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            Home
          </Link>
          <Link 
            href="/pricing" 
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-colors ${
              pathname === '/pricing' ? 'bg-yellow-400 text-yellow-900' : 'text-[#4A5D54] hover:bg-neutral-50'
            }`}
          >
            <Ticket className="w-5 h-5" />
            Subscription
          </Link>
          <Link 
            href="/login" 
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-colors ${
              pathname === '/login' ? 'bg-yellow-400 text-yellow-900' : 'text-[#4A5D54] hover:bg-neutral-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            Parent Portal
          </Link>
          {isLoggedIn && (
            <button 
              onClick={() => { setIsOpen(false); handleLogout(); }}
              className="flex w-full items-center gap-4 px-4 py-3 rounded-xl font-bold transition-colors text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          )}
        </div>

        <div className="p-6 flex justify-center border-t border-neutral-100 bg-neutral-50/50 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-400 rounded-md flex items-center justify-center font-bold text-white text-xs">
              ab
            </div>
            <span className="font-bold text-sm tracking-tight text-[#2B4238]">ABJAD Kids</span>
          </div>
        </div>
      </div>
    </>
  );
}
