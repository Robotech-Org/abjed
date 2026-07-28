import { Check, ArrowLeft, Shield, Lock, CreditCard } from "lucide-react";
import { Link } from "@/src/i18n/routing";
import Navbar from "@/components/Navbar";
import PaymentModal from "@/components/PaymentModal";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan: planId } = await searchParams;
  const t = await getTranslations("Checkout");
  const tc = await getTranslations("Common");

  if (!planId) {
    return (
      <div className="min-h-screen bg-[#FDF9F1] dark:bg-slate-950 flex flex-col font-sans text-[#2B4238] dark:text-slate-100 transition-colors">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">{t("noPlanSelected")}</h2>
          <p className="text-neutral-600 dark:text-slate-400 mb-8">{t("noPlanDesc")}</p>
          <Link href="/pricing" className="px-6 py-3 bg-[#2B4238] dark:bg-green-600 text-white font-bold rounded-xl hover:bg-[#1E3028] dark:hover:bg-green-500 transition-colors">
            {t("viewPlans")}
          </Link>
        </main>
      </div>
    );
  }

  let plans: any[] = [];
  try {
    const res = await fetch(`${process.env.ABJAD_API_BASE_URL}/plans`, { cache: 'no-store' });
    if (res.ok) {
      plans = await res.json();
    }
  } catch (error) {
  }

  const selectedPlan = plans.find((p: any) => p.id === planId);

  const planName = selectedPlan?.name || t("premiumFallback");
  const planPrice = selectedPlan ? `${selectedPlan.priceEtbSantim / 100} Birr` : "— Birr";
  const planInterval = selectedPlan?.name === "Super Learner" ? "Yearly" : (selectedPlan?.name === "Ultimate Learner" ? "Lifetime" : "Monthly");

  return (
    <div className="min-h-screen bg-[#FDF9F1] dark:bg-slate-950 font-sans text-[#2B4238] dark:text-slate-100 flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8 md:py-16">
        <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 dark:text-slate-400 hover:text-[#2B4238] dark:hover:text-white transition-colors mb-8 md:mb-12">
          <ArrowLeft className="w-4 h-4" />
          {t("backToPlans")}
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Order Summary */}
          <div className="flex-1 w-full max-w-xl">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#2B4238] dark:text-white">
              {t("completePurchase")}
            </h1>
            
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-neutral-200 dark:border-slate-800 shadow-sm mb-8 transition-colors">
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 dark:text-slate-400 mb-2">{t("orderSummary")}</div>
              
              <div className="flex justify-between items-start mb-6 pb-6 border-b border-neutral-100 dark:border-slate-800">
                <div>
                  <h3 className="text-xl font-bold text-[#2B4238] dark:text-white mb-1">{planName}</h3>
                  <p className="text-sm text-neutral-500 dark:text-slate-400 font-medium">{t("intervalAccess", { interval: planInterval })}</p>
                </div>
                <div className="text-end">
                  <div className="text-2xl font-extrabold text-[#2B4238] dark:text-white">{planPrice}</div>
                </div>
              </div>

              <div className="space-y-4 mb-2">
                <h4 className="text-xs font-bold text-[#2B4238] dark:text-slate-300 uppercase tracking-wider mb-4">{t("whatsIncluded")}</h4>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" strokeWidth={2.5} />
                  <span className="text-sm font-medium text-neutral-700 dark:text-slate-300">{t("checkoutF1")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" strokeWidth={2.5} />
                  <span className="text-sm font-medium text-neutral-700 dark:text-slate-300">{t("checkoutF2")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" strokeWidth={2.5} />
                  <span className="text-sm font-medium text-neutral-700 dark:text-slate-300">{t("checkoutF3")}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-center bg-[#F4F1EA] dark:bg-slate-800 p-5 rounded-2xl border border-[#EBE5D9] dark:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shrink-0 shadow-sm">
                <Shield className="w-5 h-5 text-[#2B4238] dark:text-green-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#2B4238] dark:text-white mb-0.5">{t("secureTransaction")}</h4>
                <p className="text-xs text-neutral-600 dark:text-slate-400 leading-relaxed">{t("secureTransactionDesc")}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Payment Details */}
          <div className="w-full lg:w-[440px] shrink-0 lg:pt-4">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#2B4238] dark:text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-neutral-500 dark:text-slate-400" />
                {t("paymentMethod")}
              </h2>
              <div className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                <span className="text-xs font-bold text-green-700 dark:text-green-500 uppercase tracking-wider">{tc("secure")}</span>
              </div>
            </div>
            
            <PaymentModal planId={planId} />

            <div className="mt-8 text-center px-4">
              <p className="text-xs text-neutral-500 leading-relaxed">
                {t("termsDisclaimerIntro")}{" "}
                <a href="#" className="underline hover:text-[#2B4238]">{t("termsOfService")}</a>
                {" "}{t("termsDisclaimerAnd")}{" "}
                <a href="#" className="underline hover:text-[#2B4238]">{t("privacyPolicy")}</a>.
              </p>
            </div>
          </div>
          
        </div>
      </main>
      
      <Footer/>
    </div>
  );
}
