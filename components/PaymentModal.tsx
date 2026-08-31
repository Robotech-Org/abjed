"use client";

import { useState, useRef } from "react";
import { Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { getErrorMessage } from "@/lib/errors";

type Status = "idle" | "submitting" | "failed";

export default function PaymentModal({ planId }: { planId: string }) {
  const t = useTranslations("Checkout");
  const tErrors = useTranslations("Errors");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const idempotencyKey = useRef("");

  function getSafeIdempotencyKey() {
    if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
      return window.crypto.randomUUID();
    }
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  async function handleSubmit() {
    setStatus("submitting");
    setError("");

    if(!idempotencyKey.current) {
      idempotencyKey.current = getSafeIdempotencyKey();
    }

    try { 
      const returnUrl = window.location.origin + "/success";
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId, 
          returnUrl,
          idempotencyKey: idempotencyKey.current,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw Object.assign(new Error(data.error), { code: data.error });
      }
      
      if (data.checkoutSession && data.checkoutSession.kind === "redirect") {
         window.location.href = data.checkoutSession.url;
      } else {
         throw new Error("unexpected_response");
      }
    } catch (err: any) {
      setError(getErrorMessage(err.code ?? err.message, tErrors));
      setStatus("failed");
    }
  }

  function retry() {
    idempotencyKey.current = getSafeIdempotencyKey(); // new logical attempt
    setError("");
    setStatus("idle");
  }

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-[32px] border border-neutral-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none p-6 md:p-8 transition-colors">
      {(status === "idle" || status === "submitting") && (
        <div className="animate-in fade-in duration-300">
          <div className="mb-8 text-center">
            <h3 className="text-xl font-extrabold text-[#2B4238] dark:text-white tracking-tight">Pay with Chapa</h3>
            <p className="text-sm text-neutral-500 dark:text-slate-400 mt-2 font-medium">You will be redirected to securely complete your payment.</p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={status === "submitting"}
            className="w-full rounded-xl bg-[#2B4238] py-4 text-sm font-bold text-white hover:bg-[#1E3028] transition-all duration-200 disabled:opacity-70 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("requestingPayment")}
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-green-400" />
                Pay with Chapa
              </>
            )}
          </button>
        </div>
      )}

      {status === "failed" && (
        <div role="alert" className="text-center py-6 animate-in fade-in duration-300">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-950/30 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-red-100 dark:border-red-900/50 shadow-sm">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" strokeWidth={2} />
          </div>
          <h3 className="text-xl font-extrabold text-[#2B4238] dark:text-white mb-2 tracking-tight">
            {t("paymentFailed")}
          </h3>
          <p className="text-sm text-neutral-500 dark:text-slate-400 mb-8 max-w-[280px] mx-auto leading-relaxed font-medium">
            {error}
          </p>
          <button
            onClick={retry}
            className="w-full rounded-xl bg-neutral-100 dark:bg-slate-800 py-4 text-sm font-bold text-[#2B4238] dark:text-white hover:bg-neutral-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            {t("tryAgain")}
          </button>
        </div>
      )}
    </div>
  );
}
