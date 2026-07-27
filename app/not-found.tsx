"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import messagesEn from "../messages/en.json";
import messagesAr from "../messages/ar.json";
import messagesAm from "../messages/am.json";

const messageMap: Record<string, typeof messagesEn.NotFound> = {
  en: messagesEn.NotFound,
  ar: messagesAr.NotFound,
  am: messagesAm.NotFound,
};

function detectLocale(): string {
  if (typeof window === "undefined") return "en";
  const seg = window.location.pathname.split("/")[1];
  return messageMap[seg] ? seg : "en";
}

export default function NotFound() {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    setLocale(detectLocale());
  }, []);

  const t = messageMap[locale] ?? messageMap.en;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="relative z-10 max-w-3xl w-full">
        <div className="flex flex-col items-center">
          <div className="mt-4 sm:mt-6 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-md">
              {t.desc}
            </p>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 justify-center w-full sm:w-auto">
            <Link
              href={`/${locale}`}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow-lg hover:shadow-xl text-sm sm:text-base w-full sm:w-auto text-center"
            >
              {t.home}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
