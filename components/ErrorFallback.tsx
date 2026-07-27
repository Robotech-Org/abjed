"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorFallback({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("ErrorBoundary");

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {t("title")}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          {t("desc")}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition text-sm"
        >
          <RefreshCw className="h-4 w-4" />
          {t("retry")}
        </button>
      </div>
    </div>
  );
}
