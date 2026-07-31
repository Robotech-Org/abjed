"use client";

import React from "react";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-[#F5F0E6] py-10 px-6 mt-auto dark:bg-slate-900 border-t border-[#E8E0D4] dark:border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-start">
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-2xl tracking-tight text-[#2D3E35] dark:text-emerald-100">
              {t("brand")}
            </span>
          </div>
          <div className="text-xs text-[#8A9D94] dark:text-slate-500">
            {t("copyright")}
          </div>
          <p className="text-xs text-[#8A9D94] dark:text-slate-500 max-w-xs">
            {t("description")}
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <h3 className="text-sm font-semibold text-[#2D3E35] dark:text-slate-300 tracking-wider uppercase mb-1 border-b-2 border-emerald-500/30 pb-1">
            {t("contactSupport")}
          </h3>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2 text-sm font-medium text-[#4A5D54] dark:text-slate-400">
            <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full shadow-sm">
              <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-[#2D3E35] dark:text-slate-300">abjedkids@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full shadow-sm">
              <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-[#2D3E35] dark:text-slate-300">+251 914 516 363</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
