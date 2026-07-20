"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function SuccessPage() {
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
     
      //window.location.href = "/";
      router.push("/");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isVerifying, router]);

  // Calculate progress bar width percentage
  const progressPercentage = ((5 - timeLeft) / 5) * 100;

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#FDF9F1] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#2B4238]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF9F1] font-sans text-[#2B4238] flex flex-col items-center justify-between">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-[32px] p-10 md:p-14 max-w-xl w-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center flex flex-col items-center border border-neutral-100">
          
          <div className="w-16 h-16 bg-[#2B4238] rounded-full flex items-center justify-center mb-6 shadow-md border-4 border-white outline outline-1 outline-neutral-100 ring-4 ring-[#E8F0EA]">
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </div>
          
          <h1 className="text-3xl font-extrabold text-[#2B4238] mb-3 tracking-tight">
            Payment Successful!
          </h1>
          
          <p className="text-neutral-500 text-[15px] max-w-[320px] mx-auto leading-relaxed mb-10">
            Your account is upgraded. We are redirecting you back to the ABJAD Kids app...
          </p>

          <div className="w-full bg-[#F4F1EA] rounded-2xl p-5 mb-6 text-left">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-[#2B4238]">Opening your app</span>
              <span className="text-xs font-bold text-[#2B4238]">{timeLeft}s</span>
            </div>
            <div className="h-3 w-full bg-white rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#2B4238] rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <button 
            onClick={() => router.push("/")}
            className="w-full py-4 bg-[#2B4238] text-white font-bold rounded-xl hover:bg-[#1E3028] transition-colors shadow-sm"
          >
            Return to Game Now
          </button>
          
          <p className="text-[11px] text-neutral-400 mt-4">
            (Click here if you are not automatically redirected in {timeLeft} seconds)
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full pb-8 pt-4 text-xs text-neutral-400 font-medium flex items-center justify-center gap-6">
        <Link href="#" className="hover:text-neutral-600">Contact Support</Link>
        <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
        <Link href="#" className="hover:text-neutral-600">Open in Browser</Link>
        <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
        <Link href="#" className="hover:text-neutral-600">Privacy Policy</Link>
      </footer>
    </div>
  );
}
