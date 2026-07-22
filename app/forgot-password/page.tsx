"use client";

import { useState } from "react";
import { Mail, Lock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import { getErrorMessage } from "@/lib/errors";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type Status = "idle" | "submitting" | "success" | "error";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string }>({});
  const [resetToken, setResetToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = forgotSchema.safeParse({ email });
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
    setResetToken(null);
    
    try {
      const res = await fetch("/api/auth/password-reset/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw Object.assign(new Error(data.error), { code: data.error });
      }
      
      if (data.resetToken) {
        setResetToken(data.resetToken);
      }
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      if (err.name === "SyntaxError") {
        setErrorMsg(getErrorMessage("network_error"));
      } else {
        setErrorMsg(getErrorMessage(err.code ?? err.message));
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF9F1] font-sans text-[#2B4238] flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-24 px-6 pt-6 md:pt-12 pb-24 max-w-7xl mx-auto w-full">
        
        {/* Left Column: Context & Info */}
        <div className="flex-1 max-w-lg lg:max-w-xl w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200 text-neutral-600 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Lock className="w-3.5 h-3.5" />
            PARENT ACCESS
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-[1.15] text-[#2B4238]">
            Reset your <br className="hidden md:block" />
            password
          </h1>
          
          <p className="text-[#4A5D54] text-[15px] md:text-[17px] leading-relaxed mb-8">
            Enter the email address associated with your parent account. If we find it in our system, we'll send you a secure link to create a new password.
          </p>
        </div>

        {/* Right Column: Card */}
        <div className="w-full max-w-[440px]">
          <div className="bg-white rounded-[32px] p-6 md:p-8 border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-2xl font-bold text-[#2B4238] mb-2">Forgot Password</h2>
              <p className="text-sm text-neutral-500">
                Let's get you back into your account.
              </p>
            </div>

            {status === "error" && (
              <div role="alert" className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{errorMsg}</p>
              </div>
            )}

            {status === "success" ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
                  <CheckCircle2 className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-[#2B4238] mb-2">Check your inbox</h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-8">
                  If that email is registered, we've sent a reset link.
                </p>

                {resetToken && (
                  <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-left">
                    <p className="text-xs font-bold text-yellow-800 uppercase tracking-wider mb-2">Dev Only (Non-Production)</p>
                    <p className="text-sm text-yellow-900 break-all mb-3">Reset Token: {resetToken}</p>
                    <Link 
                      href={`/reset-password?token=${resetToken}`}
                      className="inline-block px-4 py-2 bg-yellow-400 text-yellow-900 font-bold text-sm rounded-lg hover:bg-yellow-500 transition-colors"
                    >
                      Use Link Now
                    </Link>
                  </div>
                )}

                <Link href="/login" className="text-sm font-bold text-[#2B4238] hover:underline">
                  Return to login
                </Link>
              </div>
            ) : (
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

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#2B4238] hover:bg-[#1E3028] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B4238] transition-colors disabled:opacity-70 mt-4 items-center gap-2"
                >
                  {status === "submitting" && <Loader2 className="w-4 h-4 animate-spin" />}
                  {status === "submitting" ? "Sending..." : "Send Reset Link"}
                </button>

                <div className="mt-8 text-center pt-2">
                  <Link href="/login" className="text-sm font-bold text-[#2B4238] hover:underline">
                    Back to login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
