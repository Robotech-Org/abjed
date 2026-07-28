"use client";

import { useState } from "react";
import { KeyRound, Lock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Link, useRouter } from "@/src/i18n/routing";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import { getErrorMessage } from "@/lib/errors";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const resetSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string().min(1, "Please confirm your password.")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type Status = "idle" | "submitting" | "success" | "error";

export default function ResetPasswordForm({ token }: { token?: string }) {
  const router = useRouter();
  const t = useTranslations("ResetPassword");
  const tErrors = useTranslations("Errors");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});

  if (!token) {
    return (
      <div className="min-h-screen bg-[#FDF9F1] dark:bg-slate-950 font-sans text-[#2B4238] dark:text-slate-100 flex flex-col transition-colors duration-300">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-6 ">
          <div className="bg-white dark:bg-slate-900 rounded-[32px] p-4 max-w-sm w-full border border-neutral-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none text-center transition-colors">
            <div className="w-14 h-8 bg-red-50 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100 dark:border-red-800">
              <AlertCircle className="w-7 h-7 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#2B4238] dark:text-white mb-2">{t("missingLink")}</h2>
            <p className="text-sm text-neutral-500 dark:text-slate-400 leading-relaxed w-40 mx-auto">
              {t("missingLinkDesc")}
            </p>
            <Link href="/forgot-password" className="block w-full rounded-xl bg-[#2B4238] py-3.5 mt-4 text-sm font-bold text-white hover:bg-[#1E3028] transition-colors">
              {t("requestNew")}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = resetSchema.safeParse({ newPassword, confirmPassword });
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
      const res = await fetch("/api/auth/password-reset/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw Object.assign(new Error(data.error), { code: data.error });
      }
      
      setStatus("success");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
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

      <main id="main-content" className="flex-1 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4 lg:gap-10 px-6 pt-6 md:pt-12 pb-4 max-w-7xl mx-auto w-full">
        
        <div className="flex-1 max-w-lg lg:max-w-xl w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 text-neutral-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Lock className="w-3.5 h-3.5" />
            {t("securePortal")}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-[1.15] text-[#2B4238] dark:text-white">
            {t("createPassword")}
          </h1>
          
          <p className="text-[#4A5D54] dark:text-slate-400 text-[15px] md:text-[17px] leading-relaxed mb-4">
            {t("chooseStrong")}
          </p>
        </div>

        <div className="w-full max-w-[440px]">
          <div className="bg-white dark:bg-slate-900 rounded-[32px] p-4 md:p-6 border border-neutral-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none transition-colors">
            {status === "success" ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100 dark:border-green-800">
                  <CheckCircle2 className="w-7 h-7 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-[#2B4238] dark:text-white mb-2">{t("passwordReset")}</h3>
                <p className="text-sm text-neutral-600 dark:text-slate-400 leading-relaxed mb-6">
                  {t("redirecting")}
                </p>
                <Loader2 className="w-6 h-6 animate-spin text-[#2B4238] dark:text-white mx-auto" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="mb-2 text-center md:text-start">
                  <h2 className="text-2xl font-bold text-[#2B4238] dark:text-white mb-2">{t("newPassword")}</h2>
                  <p className="text-sm text-neutral-500 dark:text-slate-400">
                    {t("enterNew")}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2B4238] dark:text-slate-300 mb-2">
                    {t("passwordLabel")}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none">
                      <KeyRound className="h-4 w-4 text-neutral-400 dark:text-slate-500" />
                    </div>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        if (fieldErrors.newPassword) setFieldErrors({ ...fieldErrors, newPassword: undefined });
                      }}
                      placeholder={t("passwordPlaceholder")}
                      aria-invalid={!!fieldErrors.newPassword}
                      className={`block w-full ps-10 pe-3 py-3.5 rounded-xl bg-[#F4F4F4] dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 sm:text-sm transition-colors outline-none border text-black dark:text-white ${fieldErrors.newPassword ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-transparent focus:border-[#2B4238] dark:focus:border-slate-600 focus:ring-1 focus:ring-[#2B4238] dark:focus:ring-slate-600'}`}
                    />
                  </div>
                  {fieldErrors.newPassword && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.newPassword}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B4238] dark:text-slate-300 mb-2">
                    {t("confirmPasswordLabel")}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none">
                      <KeyRound className="h-4 w-4 text-neutral-400 dark:text-slate-500" />
                    </div>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (fieldErrors.confirmPassword) setFieldErrors({ ...fieldErrors, confirmPassword: undefined });
                      }}
                      placeholder={t("confirmPasswordPlaceholder")}
                      aria-invalid={!!fieldErrors.confirmPassword}
                      className={`block w-full ps-10 pe-3 py-3.5 rounded-xl bg-[#F4F4F4] dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 sm:text-sm transition-colors outline-none border text-black dark:text-white ${fieldErrors.confirmPassword ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-transparent focus:border-[#2B4238] dark:focus:border-slate-600 focus:ring-1 focus:ring-[#2B4238] dark:focus:ring-slate-600'}`}
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
                  {status === "submitting" ? t("saving") : t("resetButton")}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
