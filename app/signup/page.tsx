"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Shield, Sparkles, Mail, KeyRound, Lock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import { getErrorMessage } from "@/lib/errors";
import { toast } from "sonner";

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string().min(1, "Please confirm your password.")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type Status = "idle" | "submitting" | "error";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
  const [googleLoading, setGoogleLoading] = useState(false);
  const googleBtnRef = useRef<HTMLDivElement>(null);

  const handleGoogleCredential = useCallback(async (credential: string) => {
    setGoogleLoading(true);
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: credential }),
      });
      const data = await res.json();
      if (!res.ok) throw Object.assign(new Error(data.error), { code: data.error });
      router.replace("/pricing");
    } catch (err: any) {
      toast.error(getErrorMessage(err.code ?? err.message));
    } finally {
      setGoogleLoading(false);
    }
  }, []);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    const onLoad = () => {
      if (!window.google || !googleBtnRef.current) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: ({ credential }: { credential: string }) => handleGoogleCredential(credential),
      });
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "outline",
        size: "large",
        width: googleBtnRef.current.offsetWidth,
        text: "continue_with",
      });
    };

    if (window.google) { onLoad(); return; }
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.onload = onLoad;
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
    return () => { document.head.removeChild(s); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = signupSchema.safeParse({ email, password, confirmPassword });
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
    
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw Object.assign(new Error(data.error), { code: data.error });
      }
      
      // on success, redirect via hard navigation to ensure cookies are sent to middleware
router.replace("/pricing")
    } catch (err: any) {
      setStatus("error");
      if (err.name === "SyntaxError") {
        toast.error(getErrorMessage("network_error"));
      } else {
        toast.error(getErrorMessage(err.code ?? err.message));
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF9F1] dark:bg-slate-950 font-sans text-[#2B4238] dark:text-slate-100 flex flex-col transition-colors duration-300">
      <Navbar />

      <main id="main-content" className="flex-1 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-24 px-6 pt-6 md:pt-12 pb-24 max-w-7xl mx-auto w-full">
        
        {/* Left Column: Context & Info */}
        <div className="flex-1 max-w-lg lg:max-w-xl w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 text-neutral-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Lock className="w-3.5 h-3.5" />
            PARENT ACCESS
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-[1.15] text-[#2B4238] dark:text-white">
            Create your <br className="hidden md:block" />
            parent account <br className="hidden md:block" />
            today
          </h1>
          
          <p className="text-[#4A5D54] dark:text-slate-400 text-[15px] md:text-[17px] leading-relaxed mb-8">
            Setting up a parent account takes just a few seconds. Once registered, you can review subscription options and manage your child's learning journey securely.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10 md:mb-12">
            <div className="inline-flex items-center w-fit gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-full border border-neutral-100 dark:border-slate-800 text-sm font-medium shadow-sm text-neutral-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-neutral-500 dark:text-slate-400" />
              Secure parent portal
            </div>
            <div className="inline-flex items-center w-fit gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-full border border-neutral-100 dark:border-slate-800 text-sm font-medium shadow-sm text-neutral-700 dark:text-slate-300">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Manage subscriptions
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-neutral-100 dark:border-slate-800 shadow-sm flex items-start gap-4 mb-12 lg:mb-0">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-bold text-[#2B4238] dark:text-white mb-1.5">Family privacy guaranteed</h4>
              <p className="text-sm text-neutral-500 dark:text-slate-400 leading-relaxed">
                We never sell your data, and we ensure the learning environment is 100% ad-free and COPPA compliant.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Signup Card */}
        <div className="w-full max-w-[440px]">
          <div className="bg-white dark:bg-slate-900 rounded-[32px] p-6 md:p-8 border border-neutral-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-2xl font-bold text-[#2B4238] dark:text-white mb-2">Get started</h2>
              <p className="text-sm text-neutral-500 dark:text-slate-400">
                Create a new parent account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-[#2B4238] dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-neutral-400 dark:text-slate-500" />
                  </div>
                  <input
                  id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                    }}
                    placeholder="Enter your email"
                    aria-invalid={!!fieldErrors.email}
                    className={`block w-full pl-10 pr-3 py-3.5 rounded-xl bg-[#F4F4F4] dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 sm:text-sm transition-colors outline-none border text-black dark:text-white ${fieldErrors.email ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-transparent focus:border-[#2B4238] dark:focus:border-slate-600 focus:ring-1 focus:ring-[#2B4238] dark:focus:ring-slate-600'}`}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-bold text-[#2B4238] dark:text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <KeyRound className="h-4 w-4 text-neutral-400 dark:text-slate-500" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: undefined });
                    }}
                    placeholder="Create a password"
                    aria-invalid={!!fieldErrors.password}
                    className={`block w-full pl-10 pr-3 py-3.5 rounded-xl bg-[#F4F4F4] dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 sm:text-sm transition-colors outline-none border text-black dark:text-white ${fieldErrors.password ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-transparent focus:border-[#2B4238] dark:focus:border-slate-600 focus:ring-1 focus:ring-[#2B4238] dark:focus:ring-slate-600'}`}
                  />
                </div>
                {fieldErrors.password && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-bold text-[#2B4238] dark:text-slate-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <KeyRound className="h-4 w-4 text-neutral-400 dark:text-slate-500" />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (fieldErrors.confirmPassword) setFieldErrors({ ...fieldErrors, confirmPassword: undefined });
                    }}
                    placeholder="Confirm your password"
                    aria-invalid={!!fieldErrors.confirmPassword}
                    className={`block w-full pl-10 pr-3 py-3.5 rounded-xl bg-[#F4F4F4] dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 sm:text-sm transition-colors outline-none border text-black dark:text-white ${fieldErrors.confirmPassword ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-transparent focus:border-[#2B4238] dark:focus:border-slate-600 focus:ring-1 focus:ring-[#2B4238] dark:focus:ring-slate-600'}`}
                  />
                  
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#2B4238] hover:bg-[#1E3028] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B4238] transition-colors disabled:opacity-70 mt-4 items-center gap-2"
              >
                {status === "submitting" && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === "submitting" ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-200 dark:border-slate-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white dark:bg-slate-900 text-neutral-400">or continue with</span>
                  </div>
                </div>
                <div ref={googleBtnRef} className="w-full flex justify-center" />
                {googleLoading && (
                  <div className="flex items-center justify-center gap-2 mt-3 text-sm text-neutral-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in with Google...
                  </div>
                )}
              </>
            )}

            <div className="mt-8 text-center border-t border-neutral-100 dark:border-slate-800 pt-6">
              <p className="text-sm text-neutral-600 dark:text-slate-400">
                Already have an account?{" "}
                <Link href="/login" className="font-bold text-[#2B4238] dark:text-green-500 hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile-style Footer */}
      <footer className="w-full bg-[#F3F6FF] dark:bg-slate-900 px-6 py-12 flex flex-col items-center text-center mt-auto border-t border-transparent dark:border-slate-800 transition-colors">
        <h3 className="font-bold text-lg text-[#2B4238] dark:text-white mb-3">ABJAD Kids</h3>
        <p className="text-[13px] text-neutral-500 dark:text-slate-400 mb-6 max-w-xs leading-relaxed">
          Designed to feel safe, simple, and parent-friendly.
        </p>
        <div className="flex gap-6 text-[13px] font-medium text-neutral-600 dark:text-slate-400 mb-6">
          <Link href="#" className="hover:text-black dark:hover:text-white">Privacy Policy</Link>
          <Link href="#" className="hover:text-black dark:hover:text-white">Contact Support</Link>
        </div>
        <p className="text-[11px] text-neutral-400 dark:text-slate-500">
          © 2026 ABJAD Kids. All rights reserved.
        </p>
      </footer>
    </div>
  );
}