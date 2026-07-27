"use client";

import { useState } from "react";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import { getErrorMessage } from "@/lib/errors";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type Status = "idle" | "submitting" | "success" | "error";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string }>({});
  const [resetToken, setResetToken] = useState<string | null>(null);
  const t = useTranslations("ForgotPassword");
  const tErrors = useTranslations("Errors");

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
        toast.error(getErrorMessage("network_error", tErrors));
      } else {
        toast.error(getErrorMessage(err.code ?? err.message, tErrors));
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF9F1] dark:bg-slate-950 font-sans text-[#2B4238] dark:text-slate-100 flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-24 px-6 pt-6 md:pt-12 pb-24 max-w-7xl mx-auto w-full">
        
        {/* Left Column: Context & Info */}
        <div className="flex-1 max-w-lg lg:max-w-xl w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 text-neutral-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Mail className="w-3.5 h-3.5" />
            {t("parentAccess")}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-[1.15] text-[#2B4238] dark:text-white">
            {t("resetPasswordTitle")}
          </h1>
          
          <p className="text-[#4A5D54] dark:text-slate-400 text-[15px] md:text-[17px] leading-relaxed">
            {t("resetPasswordDesc")}
          </p>
        </div>

        {/* Right Column: Card */}
        <div className="w-full max-w-[440px]">
          <div className="bg-white dark:bg-slate-900 rounded-[32px] p-6 md:p-8 border border-neutral-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
            <div className="mb-8 text-center md:text-start">
              <h2 className="text-2xl font-bold text-[#2B4238] dark:text-white mb-2">{t("forgotPassword")}</h2>
              <p className="text-sm text-neutral-500 dark:text-slate-400">
                {t("getBackIn")}
              </p>
            </div>

            {status === "success" ? (
              <div className="text-center py-4">
                <div className="mb-8 text-center">
                  <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#2B4238] dark:text-white mb-2">{t("checkInbox")}</h2>
                  <p className="text-sm text-neutral-500 dark:text-slate-400">
                    {t("ifRegistered")}
                  </p>
                </div>

                {resetToken && (
                  <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-start">
                    <p className="text-xs font-bold text-yellow-800 uppercase tracking-wider mb-2">{t("devOnly")}</p>
                    <p className="text-sm text-yellow-900 break-all mb-3">{t("resetToken")}: {resetToken}</p>
                    <Link 
                      href={`/reset-password?token=${resetToken}`}
                      className="inline-block px-4 py-2 bg-yellow-400 text-yellow-900 font-bold text-sm rounded-lg hover:bg-yellow-500 transition-colors"
                    >
                      {t("useLinkNow")}
                    </Link>
                  </div>
                )}

                <Link
                  href="/login"
                  className="w-full flex justify-center py-4 px-4 border border-neutral-200 dark:border-slate-700 rounded-xl shadow-sm text-sm font-bold text-[#2B4238] dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-neutral-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B4238] transition-colors"
                >
                  {t("returnToLogin")}
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-[#2B4238] dark:text-slate-300 mb-2">
                    {t("emailLabel")}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none">
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
                      placeholder={t("emailPlaceholder")}
                      aria-invalid={!!fieldErrors.email}
                      className={`block w-full ps-10 pe-3 py-3.5 rounded-xl bg-[#F4F4F4] dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 sm:text-sm transition-colors outline-none border text-black dark:text-white ${fieldErrors.email ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-transparent focus:border-[#2B4238] dark:focus:border-slate-600 focus:ring-1 focus:ring-[#2B4238] dark:focus:ring-slate-600'}`}
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
                  {status === "submitting" ? t("sending") : t("sendLink")}
                </button>

                <div className="mt-8 text-center border-t border-neutral-100 dark:border-slate-800 pt-6">
                  <Link href="/login" className="inline-flex items-center gap-2 text-sm font-bold text-[#4A5D54] dark:text-slate-400 hover:text-[#2B4238] dark:hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    {t("backToLogin")}
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
