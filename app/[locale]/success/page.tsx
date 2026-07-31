"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, CheckCircle, ArrowRight } from "lucide-react";
import { Link, useRouter } from "@/src/i18n/routing";
import Navbar from "@/components/Navbar";
import { useTranslations } from "next-intl";

export default function SuccessPage() {
  const t = useTranslations("Success");
  const tc = useTranslations("Common");
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(5);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    async function verify() {
      try {
        const res = await fetch("/api/subscriptions/me");
        if (!res.ok) throw new Error();
        const data = await res.json();
        const hasActive = data.subscriptions?.some((s: any) => s.status === "active");
        
        if (!hasActive) {
          router.push("/pricing");
          return;
        }
        
        setIsVerifying(false);
      } catch {
        router.push("/pricing");
      }
    }
    
    verify();
  }, [router]);

  useEffect(() => {
    if (isVerifying) return;

    if (timeLeft <= 0) {
      router.push("/");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isVerifying, router]);

  const progressPercentage = ((5 - timeLeft) / 5) * 100;

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#FDF9F1] dark:bg-slate-950 flex items-center justify-center transition-colors">
        <Loader2 className="w-8 h-8 animate-spin text-[#2B4238] dark:text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF9F1] dark:bg-slate-950 font-sans text-[#2B4238] dark:text-slate-100 flex flex-col items-center justify-between transition-colors">
      <Navbar />

      <main id="main-content" className="flex-1 w-full flex items-center justify-center px-4 py-12">
        <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 md:p-12 text-center max-w-lg mx-auto border border-neutral-200 dark:border-slate-800 shadow-sm transition-colors mt-8">
          
          <div className="w-20 h-20 bg-green-50 dark:bg-green-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle className="w-10 h-10 text-green-500" strokeWidth={2.5} />
          </div>
          
          <h1 className="text-3xl font-extrabold text-[#2B4238] dark:text-white mb-4 tracking-tight">
            {t("paymentSuccess")}
          </h1>
          
          <p className="text-neutral-600 dark:text-slate-400 leading-relaxed mb-10 max-w-sm mx-auto">
            {t("successDesc")}
          </p>

          <div className="w-full bg-[#F4F1EA] dark:bg-slate-800 rounded-2xl p-5 mb-6 text-start transition-colors">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-[#2B4238] dark:text-slate-300">{t("openingApp")}</span>
              <span className="text-xs font-bold text-[#2B4238] dark:text-slate-300">{timeLeft}s</span>
            </div>
            <div className="h-3 w-full bg-white dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#2B4238] dark:bg-green-500 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <button 
            onClick={() => router.push("/")}
            className="w-full py-4 bg-[#2B4238] dark:bg-green-600 text-white font-bold rounded-xl hover:bg-[#1E3028] dark:hover:bg-green-500 transition-colors shadow-sm"
          >
            {t("returnToGame")}
          </button>
          
          <p className="text-[11px] text-neutral-400 dark:text-slate-500 mt-4">
            {t("autoRedirect", { timeLeft })}
          </p>
        </div>
      </main>

    
    </div>
  );
}
