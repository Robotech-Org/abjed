"use client";

import { useState, useEffect } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "@/src/i18n/routing";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function OnboardingPage() {
  const router = useRouter();
  const tc = useTranslations("Common");
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [signupReason, setSignupReason] = useState("");

  useEffect(() => {
    async function checkProfile() {
      try {
        const res = await fetch("/api/auth/me/child-profile");
        if (res.ok) {
          router.replace("/pricing");
          return;
        }
      } catch (e) {
        // Ignore and show form
      }
      setIsLoading(false);
    }
    checkProfile();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName || !childAge || !signupReason) {
      toast.error("Please fill out all fields.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/me/child-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childName,
          childAge: parseInt(childAge, 10),
          signupReason
        })
      });
      
      if (!res.ok) throw new Error("Failed to save profile");
      router.replace("/pricing");
    } catch (e) {
      toast.error("Failed to save profile. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDF9F1] dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#2B4238] dark:text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF9F1] dark:bg-slate-950 font-sans text-[#2B4238] dark:text-slate-100 flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-12 max-w-lg mx-auto w-full">
        <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 md:p-10 w-full border border-neutral-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-[#2B4238] dark:text-white mb-3">Welcome to Abjed!</h2>
            <p className="text-neutral-500 dark:text-slate-400">
              Tell us a bit about your child so we can personalize their learning experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#2B4238] dark:text-slate-300 mb-2">
                Child's Name
              </label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Enter their first name"
                className="block w-full px-4 py-4 rounded-xl bg-[#F4F4F4] dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 sm:text-sm transition-colors outline-none border border-transparent focus:border-[#2B4238] dark:focus:border-slate-600 focus:ring-1 focus:ring-[#2B4238] dark:focus:ring-slate-600 text-black dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#2B4238] dark:text-slate-300 mb-2">
                Child's Age
              </label>
              <input
                type="number"
                min="1"
                max="18"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                placeholder="e.g. 5"
                className="block w-full px-4 py-4 rounded-xl bg-[#F4F4F4] dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 sm:text-sm transition-colors outline-none border border-transparent focus:border-[#2B4238] dark:focus:border-slate-600 focus:ring-1 focus:ring-[#2B4238] dark:focus:ring-slate-600 text-black dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#2B4238] dark:text-slate-300 mb-2">
                Primary Goal
              </label>
              <select
                value={signupReason}
                onChange={(e) => setSignupReason(e.target.value)}
                className="block w-full px-4 py-4 rounded-xl bg-[#F4F4F4] dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 sm:text-sm transition-colors outline-none border border-transparent focus:border-[#2B4238] dark:focus:border-slate-600 focus:ring-1 focus:ring-[#2B4238] dark:focus:ring-slate-600 text-black dark:text-white appearance-none"
                required
              >
                <option value="" disabled>Select a reason...</option>
                <option value="Learn Arabic from scratch">Learn Arabic from scratch</option>
                <option value="School practice & support">School practice & support</option>
                <option value="Cultural connection">Cultural connection</option>
                <option value="Fun and educational games">Fun and educational games</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#2B4238] hover:bg-[#1E3028] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B4238] transition-colors disabled:opacity-70 mt-4 gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Continue to Pricing
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
