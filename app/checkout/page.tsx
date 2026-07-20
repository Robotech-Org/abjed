import { Check, ArrowLeft, Shield, Lock, CreditCard } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PaymentModal from "@/components/PaymentModal";
import Footer from "@/components/Footer";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan: planId } = await searchParams;

  if (!planId) {
    return (
      <div className="min-h-screen bg-[#FDF9F1] flex flex-col font-sans text-[#2B4238]">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">No plan selected</h2>
          <p className="text-neutral-600 mb-8">Please select a plan to continue with your checkout.</p>
          <Link href="/pricing" className="px-6 py-3 bg-[#2B4238] text-white font-bold rounded-xl hover:bg-[#1E3028] transition-colors">
            View Subscription Plans
          </Link>
        </main>
      </div>
    );
  }

  // Fetch plans from backend to get the plan details
  let plans: any[] = [];
  try {
    const res = await fetch(`${process.env.ABJAD_API_BASE_URL}/plans`, { cache: 'no-store' });
    if (res.ok) {
      plans = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch plans for checkout:", error);
  }

  const selectedPlan = plans.find((p: any) => p.id === planId);

  // Fallback data if backend is unreachable or plan not found
  const planName = selectedPlan?.name || "Premium Subscription";
  const planPrice = selectedPlan ? `${selectedPlan.priceEtbSantim / 100} Birr` : "— Birr";
  const planInterval = selectedPlan?.name === "Super Learner" ? "Yearly" : (selectedPlan?.name === "Ultimate Learner" ? "Lifetime" : "Monthly");

  return (
    <div className="min-h-screen bg-[#FDF9F1] font-sans text-[#2B4238] flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8 md:py-16">
        <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-[#2B4238] transition-colors mb-8 md:mb-12">
          <ArrowLeft className="w-4 h-4" />
          Back to plans
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Order Summary */}
          <div className="flex-1 w-full max-w-xl">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#2B4238]">
              Complete your <br />purchase
            </h1>
            
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-200 shadow-sm mb-8">
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">Order Summary</div>
              
              <div className="flex justify-between items-start mb-6 pb-6 border-b border-neutral-100">
                <div>
                  <h3 className="text-xl font-bold text-[#2B4238] mb-1">{planName}</h3>
                  <p className="text-sm text-neutral-500 font-medium">{planInterval} access</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-[#2B4238]">{planPrice}</div>
                </div>
              </div>

              <div className="space-y-4 mb-2">
                <h4 className="text-xs font-bold text-[#2B4238] uppercase tracking-wider mb-4">What's included</h4>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0" strokeWidth={2.5} />
                  <span className="text-sm font-medium text-neutral-700">100% ad-free, secure environment</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0" strokeWidth={2.5} />
                  <span className="text-sm font-medium text-neutral-700">Unlimited access to learning quests</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0" strokeWidth={2.5} />
                  <span className="text-sm font-medium text-neutral-700">Detailed parent progress reports</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-center bg-[#F4F1EA] p-5 rounded-2xl border border-[#EBE5D9]">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <Shield className="w-5 h-5 text-[#2B4238]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#2B4238] mb-0.5">Secure Transaction</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">Your payment is encrypted and securely processed by telebirr. Cancel anytime from your parent portal.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Payment Details */}
          <div className="w-full lg:w-[440px] shrink-0 lg:pt-4">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#2B4238] flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Details
              </h2>
              <div className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-green-600" />
                <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Secure</span>
              </div>
            </div>
            
            {/* The actual payment logic component */}
            <PaymentModal planId={planId} />

            <div className="mt-8 text-center px-4">
              <p className="text-xs text-neutral-500 leading-relaxed">
                By completing this purchase, you agree to ABJAD Kids's <a href="#" className="underline hover:text-[#2B4238]">Terms of Service</a> and <a href="#" className="underline hover:text-[#2B4238]">Privacy Policy</a>.
              </p>
            </div>
          </div>
          
        </div>
      </main>
      
      <Footer/>
    </div>
  );
}