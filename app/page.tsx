import { Shield, CheckCircle2, Gamepad2, BarChart3, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Typewriter from "@/components/Typewriter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDF9F1] font-sans text-[#2B4238] flex flex-col">
      <Navbar />

<div className="ml-4 flex flex-col w-fit gap-2  rounded-2xl bg-green-950 p-4  hover:animate-none ">
  <p className="animate-pulse text-green-100 text-sm">for testing purpose.<br/> protected by middleware on production</p>
<Link className="text-green-100 hover:underline" href={"/pricing"}>Pricing page  ➡</Link>
<Link className="text-green-100 hover:underline" href={"/checkout"}>Checkout page ➡</Link>

</div>

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 pt-4 md:pt-12 pb-24">
        
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 mb-16 md:mb-24">
          
          {/* Right Column (Mobile First): Mascot Area */}
          <div className="w-full md:flex-1 md:order-last relative">
            <div className="relative bg-white rounded-[32px] md:rounded-[40px] p-2 shadow-sm border border-neutral-100">
              <div className="bg-[#F0EBE1] rounded-[24px] md:rounded-[32px] p-8 md:p-16 flex flex-col items-center justify-center text-center h-[280px] md:h-[400px]">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-yellow-400 rounded-3xl flex items-center justify-center mb-4 md:mb-6 shadow-sm">
                  <Star className="w-10 h-10 md:w-12 md:h-12 text-yellow-600 fill-yellow-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#2B4238] mb-2 md:mb-4">Your mascot space</h3>
                <p className="text-neutral-500 max-w-[280px] md:max-w-sm leading-relaxed text-xs md:text-sm">
                  A large welcoming area for the yellow ABJAD Kids mascot to sit beside the hero message and make the page feel instantly playful and familiar.
                </p>
              </div>
            </div>
          </div>

          {/* Left Column: Copy & CTAs */}
          <div className="w-full md:flex-1 max-w-xl md:order-first">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white md:bg-[#F3EFE6] border border-neutral-200 md:border-transparent text-neutral-600 text-[10px] font-bold uppercase tracking-wider mb-3">
              <Shield className="w-3.5 h-3.5" />
              AD-FREE AND SAFE FOR KIDS
            </div>
            
            <h3 className="text-[32px] leading-[1.1] md:text-5xl lg:text-[44px] font-extrabold tracking-tight mb-4 md:mb-6 text-[#2B4238] min-h-[110px] md:min-h-[150px] max-w-[320px] md:max-w-[500px]">
              <Typewriter text="Master the Arabic Alphabet through Play!" speed={60} />
            </h3>
            
            <p className="text-[#4A5D54] text-[15px] md:text-lg leading-relaxed mb-8 md:mb-10">
              ABJAD Kids helps children discover Arabic letters with joyful mini-games, kid-safe learning moments, and a parent-friendly experience built to support progress at every step.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 ">
              <button className="w-full sm:w-auto flex justify-center items-center gap-2 px-8 py-4 bg-[#2B4238] text-white rounded-full font-bold hover:bg-[#1E3028] transition-colors shadow-sm hover:scale-[1.02] hover:transition-transform ">
                Download the App
              </button>
              <div className="hidden sm:flex items-center gap-2 px-5 py-3 bg-white rounded-full text-sm font-bold text-[#2B4238] border border-neutral-100 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Parent-approved learning flow
              </div>
            </div>
          </div>

        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-shadow hover:scale-[1.02] hover:transition-transform">
            <div className="w-12 h-12 bg-[#FDF9F1] rounded-full flex items-center justify-center mb-6">
              <Gamepad2 className="w-6 h-6 text-[#2B4238]" strokeWidth={1.5} />
            </div>
            <h4 className="text-lg font-bold text-[#2B4238] mb-3">Interactive Mini-Games</h4>
            <p className="text-[#4A5D54] text-sm leading-relaxed">
              Children learn each Arabic letter through engaging games that make education feel like pure fun.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-shadow hover:scale-[1.02] hover:transition-transform">
            <div className="w-12 h-12 bg-[#FDF9F1] rounded-full flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-[#2B4238]" strokeWidth={1.5} />
            </div>
            <h4 className="text-lg font-bold text-[#2B4238] mb-3">100% Kid Safe (No Ads)</h4>
            <p className="text-[#4A5D54] text-sm leading-relaxed">
              Every lesson is ad-free, distraction-free, and locked behind our parent portal for maximum security.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-shadow hover:scale-[1.02] hover:transition-transform ">
            <div className="w-12 h-12 bg-[#FDF9F1] rounded-full flex items-center justify-center mb-6">
              <BarChart3 className="w-6 h-6 text-[#2B4238]" strokeWidth={1.5} />
            </div>
            <h4 className="text-lg font-bold text-[#2B4238] mb-3">Parent Progress Tracking</h4>
            <p className="text-[#4A5D54] text-sm leading-relaxed">
              Parents can monitor letter recognition and overall progress through simple, automated reports.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}
