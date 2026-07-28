"use client";

import { useState, useEffect, useTransition } from "react";
import { Link, usePathname, useRouter } from "@/src/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, GraduationCap, Ticket, Settings, LogOut, Globe } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const t = useTranslations("Navbar");

  function onLanguageChange(newLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  }

  useEffect(() => {
    const loggedIn = document.cookie.includes("isLoggedIn=true");
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      fetch("/api/auth/me")
        .then(async (res) => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then((data) => {
          if (data.user) setUser(data.user);
        })
        .catch(() => {
          fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
          setIsLoggedIn(false);
          setUser(null);
        });
    }
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleLogout() {
    setIsLogoutModalOpen(false);
    
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      // Ignore
    }
    document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsLoggedIn(false);
    router.push("/login");
  }

  return (
    <>
      {/* Floating Navbar Container */}
      <div className={`sticky top-4 z-50 px-4 transition-all duration-300 ${
        scrolled ? 'top-2' : 'top-4'
      }`}>
        <nav className={`
          flex items-center justify-between 
          px-4 sm:px-6 py-3 sm:py-4 
          max-w-7xl mx-auto w-full 
          rounded-2xl sm:rounded-3xl
          transition-all duration-300
          ${scrolled 
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl shadow-lg shadow-black/5 border border-white/20 dark:border-slate-800/50' 
            : 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-md shadow-black/5 border border-white/30 dark:border-slate-800/30'
          }
        `}>
          {/* Logo */}
          <div className="flex items-center gap-2">
            {/* <Image 
              src="/ab.svg" 
              alt="ABJAD Kids"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            /> */}
            <Link className="font-bold text-lg tracking-tight text-[#2B4238] dark:text-white" href={"/"}>
              ABJAD Kids
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link 
              href="/" 
              className={`relative px-1 py-1 transition-colors ${
                pathname === '/' 
                  ? 'text-[#2B4238] dark:text-white font-bold' 
                  : 'text-[#4A5D54] dark:text-slate-300 hover:text-[#2B4238] dark:hover:text-white'
              }`}
            >
              {t("home")}
              {pathname === '/' && (
                <span className="absolute -bottom-1 start-0 w-full h-0.5 bg-yellow-400 rounded-full"></span>
              )}
            </Link>
            <Link 
              href="/pricing" 
              className={`relative px-1 py-1 transition-colors ${
                pathname === '/pricing' 
                  ? 'text-[#2B4238] dark:text-white font-bold' 
                  : 'text-[#4A5D54] dark:text-slate-300 hover:text-[#2B4238] dark:hover:text-white'
              }`}
            >
              {t("subscription")}
              {pathname === '/pricing' && (
                <span className="absolute -bottom-1 start-0 w-full h-0.5 bg-yellow-400 rounded-full"></span>
              )}
            </Link>
            
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-2 py-1 text-[#4A5D54] dark:text-slate-300 hover:text-[#2B4238] dark:hover:text-white transition-colors">
                <Globe className="w-4 h-4" />
                <span className="uppercase text-xs font-bold">{locale}</span>
              </button>
              <div className="absolute end-0 top-full mt-2 w-32 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-neutral-100 dark:border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="p-2 flex flex-col">
                  <button onClick={() => onLanguageChange('en')} disabled={isPending} className="text-start px-3 py-2 text-sm text-neutral-600 dark:text-slate-300 hover:bg-neutral-50 dark:hover:bg-slate-800 rounded-lg">English</button>
                  <button onClick={() => onLanguageChange('ar')} disabled={isPending} className="text-start px-3 py-2 text-sm text-neutral-600 dark:text-slate-300 hover:bg-neutral-50 dark:hover:bg-slate-800 rounded-lg">العربية</button>
                  <button onClick={() => onLanguageChange('am')} disabled={isPending} className="text-start px-3 py-2 text-sm text-neutral-600 dark:text-slate-300 hover:bg-neutral-50 dark:hover:bg-slate-800 rounded-lg">አማርኛ</button>
                </div>
              </div>
            </div>

            <ThemeToggle />
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-1.5 py-1.5 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 rounded-full transition-all border border-neutral-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                    {user?.email?.[0]?.toUpperCase() || 'P'}
                  </div>
                </button>
                
                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                    <div className="absolute end-0 mt-3 w-64 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-800/50 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-4 border-b border-neutral-100/50 dark:border-slate-800/50 bg-neutral-50/50 dark:bg-slate-800/30">
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">{t("signedInAs")}</p>
                        <p className="text-sm font-bold text-[#2B4238] dark:text-white truncate">{user?.email || t("loading")}</p>
                      </div>
                      <div className="p-2">
                        <button 
                          onClick={() => { setIsDropdownOpen(false); setIsLogoutModalOpen(true); }}
                          className="w-full flex items-center gap-3 px-3 py-3 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors text-start"
                        >
                          <LogOut className="w-4 h-4" />
                          {t("logout")}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link 
                href="/login" 
                className="px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-md hover:shadow-lg font-bold hover:scale-105 active:scale-95"
              >
                {t("parentPortal")}
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden p-2 -me-2 text-[#2B4238] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer Menu - Also Glassmorphism */}
      <div 
        className={`fixed top-0 end-0 h-full w-[85%] max-w-[320px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl z-50 transition-transform duration-300 ease-in-out md:hidden flex flex-col shadow-2xl ${
          isOpen ? "translate-x-0" : (locale === "ar" ? "-translate-x-full" : "translate-x-full")
        }`}
      >
        <div className="flex justify-end p-6">
          <button onClick={() => setIsOpen(false)} className="text-neutral-500 dark:text-slate-400 hover:text-black dark:hover:text-white p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col items-center px-6 pb-8 border-b border-neutral-100/50 dark:border-slate-800/50">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full mb-4 border-2 border-white dark:border-slate-700 shadow-lg flex items-center justify-center text-white font-bold text-2xl">
            {isLoggedIn ? (user?.email?.[0]?.toUpperCase() || 'P') : 'L'}
          </div>
          <h2 className="text-xl font-bold text-[#2B4238] dark:text-white mb-1">
            {isLoggedIn ? t("welcomeBack") : t("hiLearner")}
          </h2>
          <p className="text-sm text-neutral-500 dark:text-slate-400 truncate w-full text-center">
            {isLoggedIn ? (user?.email || t("loading")) : t("readyForFun")}
          </p>
        </div>

        <div className="flex-1 px-4 py-6 space-y-2">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${
              pathname === '/' 
                ? 'bg-yellow-400/20 text-yellow-700 dark:text-yellow-400' 
                : 'text-[#4A5D54] dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            {t("home")}
          </Link>
          <Link 
            href="/pricing" 
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${
              pathname === '/pricing' 
                ? 'bg-yellow-400/20 text-yellow-700 dark:text-yellow-400' 
                : 'text-[#4A5D54] dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <Ticket className="w-5 h-5" />
            {t("subscription")}
          </Link>
          <Link 
            href="/login" 
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${
              pathname === '/login' 
                ? 'bg-yellow-400/20 text-yellow-700 dark:text-yellow-400' 
                : 'text-[#4A5D54] dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <Settings className="w-5 h-5" />
            {t("parentPortal")}
          </Link>
          {isLoggedIn && (
            <button 
              onClick={() => { setIsOpen(false); setIsLogoutModalOpen(true); }}
              className="flex w-full items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <LogOut className="w-5 h-5" />
              {t("logout")}
            </button>
          )}
          <div className="pt-4 mt-2 border-t border-neutral-100/50 dark:border-slate-800/50 space-y-4">
            <div className="flex flex-col gap-2 px-4">
              <span className="text-sm font-bold text-[#2B4238] dark:text-slate-300">Language</span>
              <div className="flex gap-2">
                <button onClick={() => onLanguageChange('en')} disabled={isPending} className={`flex-1 py-2 text-xs font-bold rounded-lg border ${locale === 'en' ? 'bg-yellow-400 text-yellow-900 border-yellow-400' : 'border-neutral-200 dark:border-slate-700 hover:bg-neutral-50 dark:hover:bg-slate-800'}`}>EN</button>
                <button onClick={() => onLanguageChange('ar')} disabled={isPending} className={`flex-1 py-2 text-xs font-bold rounded-lg border ${locale === 'ar' ? 'bg-yellow-400 text-yellow-900 border-yellow-400' : 'border-neutral-200 dark:border-slate-700 hover:bg-neutral-50 dark:hover:bg-slate-800'}`}>AR</button>
                <button onClick={() => onLanguageChange('am')} disabled={isPending} className={`flex-1 py-2 text-xs font-bold rounded-lg border ${locale === 'am' ? 'bg-yellow-400 text-yellow-900 border-yellow-400' : 'border-neutral-200 dark:border-slate-700 hover:bg-neutral-50 dark:hover:bg-slate-800'}`}>AM</button>
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-2 border-t border-neutral-100/50 dark:border-slate-800/50 pt-4">
              <span className="text-sm font-bold text-[#2B4238] dark:text-slate-300">{t("appearance")}</span>
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="p-6 flex justify-center border-t border-neutral-100/50 dark:border-slate-800/50 bg-neutral-50/50 dark:bg-slate-800/30 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-400 rounded-md flex items-center justify-center font-bold text-white text-xs shadow-sm">
              ab
            </div>
            <span className="font-bold text-sm tracking-tight text-[#2B4238] dark:text-white">ABJAD Kids</span>
          </div>
        </div>
      </div>

      {/* Custom Logout Confirmation Modal - Also Glassmorphism */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsLogoutModalOpen(false)}
          />
          <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200 border border-white/20 dark:border-slate-800/50">
            <div className="w-12 h-12 bg-red-50/80 dark:bg-red-950/30 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
              <LogOut className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-[#2B4238] dark:text-white mb-2 text-center md:text-start">
              {t("readyToLeave")}
            </h3>
            <p className="text-[#4A5D54] dark:text-slate-400 text-sm mb-8 text-center md:text-start leading-relaxed">
              {t("logoutConfirm")}
            </p>
            <div className="flex flex-col-reverse md:flex-row gap-3">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="w-full px-4 py-3 text-sm font-bold text-[#4A5D54] dark:text-slate-300 bg-[#F4F4F4]/80 dark:bg-slate-800/80 hover:bg-[#E5E5E5] dark:hover:bg-slate-700 rounded-xl transition-colors backdrop-blur-sm"
              >
                {t("cancel")}
              </button>
              <button 
                onClick={handleLogout}
                className="w-full px-4 py-3 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-lg hover:shadow-xl"
              >
                {t("logout")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}