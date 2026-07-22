"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, Smartphone, Phone, ShieldCheck } from "lucide-react";
import { getErrorMessage } from "@/lib/errors";

type Status =
  | "collecting-phone"
  | "submitting"
  | "polling"
  | "failed"
  | "timeout";

// Matches the backend's expected format: 09xxxxxxxx or 2519xxxxxxxx
const MOBILE_PATTERN = /^(09\d{8}|2519\d{8})$/;

export default function PaymentModal({ planId }: { planId: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("collecting-phone");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [error, setError] = useState("");
  const idempotencyKey = useRef(""); // initialized on submit

  function getSafeIdempotencyKey() {
    if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
      return window.crypto.randomUUID();
    }
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  function validateMobile() {
    if (!MOBILE_PATTERN.test(mobile)) {
      setMobileError("Enter a valid phone: 09XXXXXXXX or 2519XXXXXXXX");
      return false;
    }
    setMobileError("");
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateMobile()) return;

    setStatus("submitting");
    setError("");

    if(!idempotencyKey.current) {
      idempotencyKey.current = getSafeIdempotencyKey();
    }

    try { 
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId, 
          mobile, 
          idempotencyKey: idempotencyKey.current,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw Object.assign(new Error(data.error), { code: data.error });
      }
      pollForActive();
    } catch (err: any) {
      setError(getErrorMessage(err.code ?? err.message));
      setStatus("failed");
    }
  }

  async function pollForActive() {
    setStatus("polling");
    const maxAttempts = 24; // 24 * 5s = 2 minutes
    for (let i = 0; i < maxAttempts; i++) {
      await new Promise((r) => setTimeout(r, 5000));
      try {
        const res = await fetch("/api/subscriptions/me");
        const data = await res.json();
        const active = data.subscriptions?.some(
          (s: any) => s.status === "active"
        );
        if (active) {
          router.push("/success");
          return;
        }
      } catch {
        // Transient network blip while polling — keep trying, don't bail.
      }
    }
    setStatus("timeout");
  }

  function retry() {
    idempotencyKey.current = getSafeIdempotencyKey(); // new logical attempt
    setError("");
    setStatus("collecting-phone");
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
    <div className="w-1/2  bg-white rounded-[32px] border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8">
      {(status === "collecting-phone" || status === "submitting") && (
        <div className="animate-in fade-in duration-300">
          <div className="mb-8 text-center">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-blue-100 shadow-sm">
              <Smartphone className="w-7 h-7 text-blue-600" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-extrabold text-[#2B4238] tracking-tight">telebirr Payment</h3>
            <p className="text-sm text-neutral-500 mt-2 font-medium">Enter your mobile money number</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label
                htmlFor="mobile"
                className="block text-[13px] font-bold text-[#2B4238] uppercase tracking-wide mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-neutral-400" />
                </div>
                <input
                  id="mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                    if (mobileError) setMobileError("");
                  }}
                  placeholder="09XXXXXXXX"
                  aria-invalid={!!mobileError}
                  aria-describedby={mobileError ? "mobile-error" : undefined}
                  className={`block w-full pl-11 pr-4 text-gray-900 py-3.5 rounded-xl bg-[#F4F4F4] focus:bg-white text-sm font-medium outline-none transition-all duration-200 border ${
                    mobileError
                      ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                      : "border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  }`}
                />
              </div>
              {mobileError && (
                <p id="mobile-error" className="mt-2 text-xs font-semibold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {mobileError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-xl bg-[#2B4238] py-4 text-sm font-bold text-white hover:bg-[#1E3028] transition-all duration-200 disabled:opacity-70 shadow-sm hover:shadow-md flex items-center justify-center gap-2 mt-2"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Requesting payment...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  Pay with telebirr
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {status === "polling" && (
        <div className="text-center py-8 animate-in fade-in duration-300">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-50 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-blue-500 animate-pulse" strokeWidth={1.5} />
            </div>
          </div>
          <h3 className="text-xl font-extrabold text-[#2B4238] mb-2 tracking-tight">Check your phone</h3>
          <p className="text-sm text-neutral-500 leading-relaxed max-w-[260px] mx-auto font-medium">
            We've sent a secure payment prompt to your phone. Please enter your PIN to approve.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-widest bg-neutral-50 px-4 py-2 rounded-full">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Awaiting Confirmation
          </div>
        </div>
      )}

      {(status === "failed" || status === "timeout") && (
        <div role="alert" className="text-center py-6 animate-in fade-in duration-300">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-red-100 shadow-sm">
            <AlertCircle className="w-8 h-8 text-red-600" strokeWidth={2} />
          </div>
          <h3 className="text-xl font-extrabold text-[#2B4238] mb-2 tracking-tight">
            {status === "timeout" ? "Request Expired" : "Payment Failed"}
          </h3>
          <p className="text-sm text-neutral-500 mb-8 max-w-[280px] mx-auto leading-relaxed font-medium">
            {status === "timeout" 
              ? "You didn't approve the telebirr request in time. Please try again." 
              : error}
          </p>
          <button
            onClick={retry}
            className="w-full rounded-xl bg-neutral-100 py-4 text-sm font-bold text-[#2B4238] hover:bg-neutral-200 transition-colors shadow-sm"
          >
            Try again
          </button>
        </div>
      )}
    </div>
    </div>
  );
}