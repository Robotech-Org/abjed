import { Check, X, Shield, Lock } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function PricingPage() {
  // Fetch plans from backend
  let plans: any[] = [];
  try {
    const res = await fetch(`${process.env.ABJAD_API_BASE_URL}/plans`, { cache: 'no-store' });
    if (res.ok) {
      plans = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch plans:", error);
  }

  // Find plans by name
  const explorerPlan = plans.find((p: any) => p.name === "Explorer");
  const superPlan = plans.find((p: any) => p.name === "Super Learner");
  const ultimatePlan = plans.find((p: any) => p.name === "Ultimate Learner");

  return (
    <div className="min-h-screen bg-[#FDF9F1] font-sans text-[#2B4238]">
      <Navbar />

      <main className="flex flex-col items-center px-6 pt-6 md:pt-12 pb-24 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 max-w-2xl px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider mb-6">
            <Lock className="w-3 h-3" />
            UNLOCK 100% AD-FREE LEARNING
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 md:mb-6 text-[#2B4238] leading-[1.15]">
            Give your child <br />
            the <span className="underline decoration-4 underline-offset-4 decoration-[#2B4238]">ultimate learning</span> <br className="hidden md:block" />
            adventure
          </h1>
          <p className="text-[#4A5D54] text-sm md:text-lg leading-relaxed max-w-[300px] md:max-w-none mx-auto">
            Interactive daily lessons, playful quests, and adaptive skill-building for ages 3 to 10. Start today and cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full mb-16 md:mb-24 items-start">
          {/* Basic Plan */}
          <div className={`bg-white rounded-[32px] p-6 md:p-8 border border-neutral-200 transition-transform duration-200 hover:scale-[1.02] shadow-sm md:mt-8 ${!explorerPlan ? 'opacity-50' : ''}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Explorer</h3>
              <span className="text-xs font-semibold px-2.5 py-1 bg-[#F0EBE1] rounded-full text-neutral-600">Monthly</span>
            </div>
            <div className="mb-4">
              <span className="text-4xl font-extrabold">{explorerPlan ? explorerPlan.priceEtbSantim / 100 : "—"} Birr</span>
              <span className="text-neutral-500 text-sm font-medium"> / month</span>
            </div>
            <p className="text-sm text-neutral-600 mb-6 md:mb-8 md:h-10 leading-relaxed">
              Access base daily activities and weekly learning quests.
            </p>
            <ul className="space-y-4 mb-8 text-sm text-[#2B4238] font-medium">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#2B4238] shrink-0" strokeWidth={2.5} />
                <span>3 daily learning quests</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#2B4238] shrink-0" strokeWidth={2.5} />
                <span>Introductory math & reading</span>
              </li>
              <li className="flex items-start gap-3 text-neutral-300">
                <X className="w-5 h-5 shrink-0" strokeWidth={2.5} />
                <span>Ad-free play session</span>
              </li>
              <li className="flex items-start gap-3 text-neutral-300">
                <X className="w-5 h-5 shrink-0" strokeWidth={2.5} />
                <span>Guaranteed progress reports</span>
              </li>
            </ul>
            {explorerPlan ? (
              <Link href={`/checkout?plan=${explorerPlan.id}`} className="block w-full py-4 px-4 bg-[#F0EBE1] hover:bg-[#E0D8C8] text-center text-[#2B4238] font-bold rounded-xl transition-colors">
                Get Started Free
              </Link>
            ) : (
              <button disabled className="block w-full py-4 px-4 bg-neutral-100 text-center text-neutral-400 font-bold rounded-xl cursor-not-allowed">
                Coming Soon
              </button>
            )}
          </div>

          {/* Pro Plan (Highlighted) */}
          <div className={`bg-white rounded-[32px] border-2 border-blue-400 shadow-xl transition-transform duration-200 hover:scale-[1.02] relative overflow-hidden ${!superPlan ? 'opacity-50' : ''}`}>
            <div className="bg-blue-400 text-white text-center text-xs font-bold py-2.5 uppercase tracking-wider">
              ⭐ MOST POPULAR CHOICE
            </div>
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-blue-900">Super Learner</h3>
                <span className="text-xs font-semibold px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full">Yearly</span>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-extrabold">{superPlan ? superPlan.priceEtbSantim / 100 : "—"} Birr</span>
                <span className="text-neutral-500 text-sm font-medium"> / year</span>
              </div>
              <p className="text-sm text-neutral-600 mb-6 md:mb-8 md:h-10 leading-relaxed">
                Complete curriculum access with customized learning paths & zero distractions.
              </p>
              <ul className="space-y-4 mb-8 text-sm text-[#2B4238] font-medium">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-blue-600" strokeWidth={3} />
                  </div>
                  <span>Unlimited learning quests</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-blue-600" strokeWidth={3} />
                  </div>
                  <span>100% Safe & Ad-free environment</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-blue-600" strokeWidth={3} />
                  </div>
                  <span>Personalized practice sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-blue-600" strokeWidth={3} />
                  </div>
                  <span>Weekly parent progress reports</span>
                </li>
              </ul>
              {superPlan ? (
                <Link href={`/checkout?plan=${superPlan.id}`} className="block w-full py-4 px-4 bg-[#2B4238] hover:bg-[#1E3028] text-white text-center font-bold rounded-xl transition-colors">
                  Start 1-Week Free Trial
                </Link>
              ) : (
                <button disabled className="block w-full py-4 px-4 bg-neutral-100 text-center text-neutral-400 font-bold rounded-xl cursor-not-allowed">
                  Coming Soon
                </button>
              )}
            </div>
          </div>

          {/* Lifetime Plan */}
          <div className={`bg-white rounded-[32px] p-6 md:p-8 border border-neutral-200 transition-transform duration-200 hover:scale-[1.02] shadow-sm md:mt-8 relative overflow-hidden ${!ultimatePlan ? 'opacity-50' : ''}`}>
            <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-400 rounded-bl-3xl flex items-end justify-start p-3">
              <span className="text-yellow-900 text-xs font-bold rotate-45 transform translate-x-2 -translate-y-1">⭐</span>
            </div>
            <div className="flex justify-between items-center mb-4 pr-12">
              <h3 className="font-bold text-lg">Ultimate Learner</h3>
              <span className="text-xs font-semibold px-2.5 py-1 bg-yellow-100 text-yellow-800 rounded-full">Lifetime</span>
            </div>
            <div className="mb-4">
              <span className="text-4xl font-extrabold">{ultimatePlan ? ultimatePlan.priceEtbSantim / 100 : "—"} Birr</span>
            </div>
            <p className="text-sm text-neutral-600 mb-6 md:mb-8 md:h-10 leading-relaxed">
              Bring the whole family! Up to 4 sibling accounts with auto-sync profiles.
            </p>
            <ul className="space-y-4 mb-8 text-sm text-[#2B4238] font-medium">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-yellow-500 shrink-0" strokeWidth={2.5} />
                <span>Up to 4 child profiles</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-yellow-500 shrink-0" strokeWidth={2.5} />
                <span>Everything in Super Learner</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-yellow-500 shrink-0" strokeWidth={2.5} />
                <span>Offline access (up to 20 tracks)</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-yellow-500 shrink-0" strokeWidth={2.5} />
                <span>Shared family leader board</span>
              </li>
            </ul>
            {ultimatePlan ? (
              <Link href={`/checkout?plan=${ultimatePlan.id}`} className="block w-full py-4 px-4 bg-[#2B4238] hover:bg-[#1E3028] text-white text-center font-bold rounded-xl transition-colors">
                Get Family Plan
              </Link>
            ) : (
              <button disabled className="block w-full py-4 px-4 bg-neutral-100 text-center text-neutral-400 font-bold rounded-xl cursor-not-allowed">
                Coming Soon
              </button>
            )}
          </div>
        </div>

        {/* Trust Section */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-200 shadow-sm max-w-4xl w-full mb-16 md:mb-24 flex flex-col md:flex-row gap-6 md:gap-8 items-center text-center md:text-left">
          <div className="bg-[#FDF9F1] p-6 rounded-[24px] flex flex-col items-center justify-center min-w-[160px] shrink-0 w-full md:w-auto">
            <Shield className="w-10 h-10 text-[#2B4238] mb-3" strokeWidth={1.5} />
            <div className="font-bold text-[#2B4238]">100% Safe</div>
            <div className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">COPPA Compliant</div>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-3 text-[#2B4238]">Designed with Parents in Mind</h3>
            <p className="text-neutral-600 text-sm leading-relaxed mb-6">
              We believe screen time should be active, delightful, and completely secure. There are absolutely no third-party advertisements, in-app purchases, or external links accessible without a parent passcode check.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="px-3 py-1.5 bg-[#FDF9F1] text-[#2B4238] text-xs font-semibold rounded-md border border-[#EBE5D9]">
                No sneaky billing
              </span>
              <span className="px-3 py-1.5 bg-[#FDF9F1] text-[#2B4238] text-xs font-semibold rounded-md border border-[#EBE5D9]">
                Cancel anytime
              </span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl w-full mb-8">
          <h2 className="text-2xl font-bold text-center text-[#2B4238] mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
              <h4 className="font-bold text-[#2B4238] mb-2">Can I switch plans or cancel at any time?</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">Yes! You can upgrade, downgrade, or cancel your subscription directly from your Parent Portal with no cancellation fees.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
              <h4 className="font-bold text-[#2B4238] mb-2">Are there any hidden in-app purchases?</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">Never. Once you subscribe to any of our plans, your children have absolute, unhindered access to all content, and you won't get hit with sneaky charges.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}