"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
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
  const idempotencyKey = useRef(crypto.randomUUID()); // one key per attempt

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
    idempotencyKey.current = crypto.randomUUID(); // new logical attempt
    setError("");
    setStatus("collecting-phone");
  }

  return (
    <div className="w-full bg-white rounded-[32px] border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8">
      {(status === "collecting-phone" || status === "submitting") && (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-neutral-700 mb-1.5"
            >
              Phone number
            </label>
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
              className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors focus:ring-2 ${
                mobileError
                  ? "border-red-400 focus:ring-red-200"
                  : "border-neutral-300 focus:ring-neutral-200"
              }`}
            />
            {mobileError && (
              <p id="mobile-error" className="mt-1.5 text-xs text-red-600">
                {mobileError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-xl bg-[#2B4238] py-4 text-sm font-bold text-white hover:bg-[#1E3028] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === "submitting" && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            {status === "submitting" ? "Starting payment..." : "Pay with telebirr"}
          </button>
        </form>
      )}

      {status === "polling" && (
        <div className="text-center py-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-neutral-400" />
          <p className="text-sm font-medium text-neutral-900 mb-1">
            Check your phone
          </p>
          <p className="text-sm text-neutral-500">
            Approve the telebirr payment request. This can take up to 2 minutes.
          </p>
        </div>
      )}

      {(status === "failed" || status === "timeout") && (
        <div role="alert" className="text-center py-4">
          <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-600" />
          <p className="text-sm font-medium text-neutral-900 mb-1">
            {status === "timeout"
              ? "Still waiting for confirmation"
              : "Payment failed"}
          </p>
          <p className="text-sm text-neutral-500 mb-4">
            {status === "timeout" ? "You can try again." : error}
          </p>
          <button
            onClick={retry}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}