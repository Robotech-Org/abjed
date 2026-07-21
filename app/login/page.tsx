"use client";

import { useState } from "react";
import { Shield, Sparkles, Mail, KeyRound, ArrowRight, Lock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import { getErrorMessage } from "@/lib/errors";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required.")
});

type Status = "idle" | "submitting" | "error";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const errs: any = {};
      result.error.issues.forEach(err => {
        if (err.path[0]) errs[err.path[0]] = err.message;
      });
      setFieldErrors(errs);
      return;
    }
    
    setFieldErrors({});
    setStatus("submitting");
    setErrorMsg("");
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw Object.assign(new Error(data.error), { code: data.error });
      }
      
      // on success, redirect
      router.push("/pricing");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(getErrorMessage(err.code ?? err.message));
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF9F1] font-sans text-[#2B4238] flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col lg:flex-row items-center lg:items-start justify-center gap4 lg:gap-24 px-6 pt-6 md:pt-12 pb-24 max-w-7xl mx-auto w-full">
        
        {/* Left Column: Context & Info */}
        <div className="flex-1 max-w-lg lg:max-w-xl w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200 text-neutral-600 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Lock className="w-3.5 h-3.5" />
            PARENT ACCESS
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-[1.15] text-[#2B4238]">
            Log in first to view <br className="hidden md:block" />
            subscription <br className="hidden md:block" />
            pricing
          </h1>
          
          <p className="text-[#4A5D54] text-[15px] md:text-[17px] leading-relaxed mb-8">
            To meet app store rules and keep purchases safely in adult hands, we ask parents to log in before reviewing plans. It is a quick parent-only step that keeps the experience secure and family-friendly.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10 md:mb-12">
            <div className="inline-flex items-center w-fit gap-2 px-4 py-2 bg-white rounded-full border border-neutral-100 text-sm font-medium shadow-sm text-neutral-700">
              <CheckCircle2 className="w-4 h-4 text-neutral-500" />
              Safe parent-only step
            </div>
            <div className="inline-flex items-center w-fit gap-2 px-4 py-2 bg-white rounded-full border border-neutral-100 text-sm font-medium shadow-sm text-neutral-700">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Fast access to plans
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm flex items-start gap-4 mb-12 lg:mb-0">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <div className="text-blue-500 font-serif font-bold text-lg italic">i</div>
            </div>
            <div>
              <h4 className="font-bold text-[#2B4238] mb-1.5">Why this comes first</h4>
              <p className="text-sm text-neutral-500 leading-relaxed">
                After you log in, we will take you straight to the subscription options so you can choose the best family plan with confidence.
              </p>
            </div>
          </div>
        </div>
        {/* Right Column: Login Card */}
        <div className="w-full max-w-[550px]">
          <div className="bg-white rounded-[32px] p-6 md:p-8 border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-2xl font-bold text-[#2B4238] mb-2">Welcome back, parent</h2>
              <p className="text-sm text-neutral-500">
                Use your parent account to continue to subscription pricing.
              </p>
            </div>

            {status === "error" && (
              <div role="alert" className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{errorMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label className="block text-xs font-bold text-[#2B4238] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-neutral-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                    }}
                    placeholder="Enter your email"
                    aria-invalid={!!fieldErrors.email}
                    className={`block w-full pl-10 pr-3 py-3.5 rounded-xl bg-[#F4F4F4] focus:bg-white sm:text-sm transition-colors outline-none border ${fieldErrors.email ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-transparent focus:border-[#2B4238] focus:ring-1 focus:ring-[#2B4238]'}`}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2B4238] mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <KeyRound className="h-4 w-4 text-neutral-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: undefined });
                    }}
                    placeholder="Enter your password"
                    aria-invalid={!!fieldErrors.password}
                    className={`block w-full pl-10 pr-3 py-3.5 rounded-xl bg-[#F4F4F4] focus:bg-white sm:text-sm transition-colors outline-none border ${fieldErrors.password ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-transparent focus:border-[#2B4238] focus:ring-1 focus:ring-[#2B4238]'}`}
                  />
                </div>
                {fieldErrors.password && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center">
                  <input
                    id="trust-device"
                    type="checkbox"
                    className="h-4 w-4 text-[#2B4238] focus:ring-[#2B4238] border-neutral-300 rounded cursor-pointer"
                  />
                  <label htmlFor="trust-device" className="ml-2 block text-sm text-neutral-500 cursor-pointer">
                    Trust this device
                  </label>
                </div>
                <button type="button" className="text-sm font-bold text-[#2B4238] hover:underline">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#2B4238] hover:bg-[#1E3028] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B4238] transition-colors disabled:opacity-70 mt-4 items-center gap-2"
              >
                {status === "submitting" && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === "submitting" ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-neutral-100 pt-6">
              <p className="text-sm text-neutral-600">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-bold text-[#2B4238] hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile-style Footer */}
      <footer className="w-full bg-[#F3F6FF] px-6 py-12 flex flex-col items-center text-center mt-auto">
        <h3 className="font-bold text-lg text-[#2B4238] mb-3">ABJAD Kids</h3>
        <p className="text-[13px] text-neutral-500 mb-6 max-w-xs leading-relaxed">
          Designed to feel safe, simple, and parent-friendly.
        </p>
        <div className="flex gap-6 text-[13px] font-medium text-neutral-600 mb-6">
          <Link href="#" className="hover:text-black">Privacy Policy</Link>
          <Link href="#" className="hover:text-black">Contact Support</Link>
        </div>
        <p className="text-[11px] text-neutral-400">
          © 2026 ABJAD Kids. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
