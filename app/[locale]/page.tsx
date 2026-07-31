import { Shield, CheckCircle2, Gamepad2, BarChart3, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Link } from "@/src/i18n/routing";
import Typewriter from "@/components/Typewriter";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("Home");
  return (
    <div className="min-h-screen bg-[#FDF9F1] dark:bg-slate-950 font-sans text-[#2B4238] dark:text-slate-100 flex flex-col transition-colors duration-300">
      <Navbar />

{/* <div className="ml-4 flex flex-col w-fit gap-2  rounded-2xl bg-green-950 p-4  hover:animate-none ">
  <p className="animate-pulse text-green-100 text-sm">for testing purpose.<br/> protected by middleware on production</p>
<Link className="text-green-100 hover:underline" href={"/pricing"}>Pricing page  ➡</Link>
<Link className="text-green-100 hover:underline" href={"/checkout"}>Checkout page ➡</Link>

</div> */}

      <main id="main-content" className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 pt-4 md:pt-12 pb-24">
        
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 mb-16 md:mb-24">
          
          {/* Right Column (Mobile First): Mascot Area */}
          <div className="w-full md:flex-1 md:order-last relative">
            <div className="relative bg-white dark:bg-slate-900 rounded-[32px] md:rounded-[40px] p-2 shadow-sm border border-neutral-100 dark:border-slate-800 transition-colors">
              <div className="bg-[#F0EBE1] dark:bg-slate-800 rounded-[24px] md:rounded-[32px] p-8 md:p-16 flex flex-col items-center justify-center text-center h-[280px] md:h-[400px] transition-colors">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-yellow-400 rounded-3xl flex items-center justify-center mb-4 md:mb-6 shadow-sm">
                  <Star className="w-10 h-10 md:w-12 md:h-12 text-yellow-600 fill-yellow-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#2B4238] dark:text-white mb-2 md:mb-4">{t("mascotTitle")}</h3>
                {/* <p className="text-neutral-500 dark:text-slate-400 max-w-[280px] md:max-w-sm leading-relaxed text-xs md:text-sm">
                  {t("mascotDesc")}
                </p> */}
              </div>
            </div>
          </div>

          {/* Left Column: Copy & CTAs */}
          <div className="w-full md:flex-1 max-w-xl md:order-first">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 md:bg-[#F3EFE6] md:dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 md:border-transparent text-neutral-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider mb-3 transition-colors">
              <Shield className="w-3.5 h-3.5" />
              {t("adFree")}
            </div>
            
            <h3 className="text-[32px] leading-[1.1] md:text-5xl lg:text-[44px] font-extrabold tracking-tight md:mb-4 text-[#2B4238] dark:text-white min-h-[110px] md:min-h-[150px] max-w-[420px] md:max-w-[500px]">
              <Typewriter text={t("heroTitle")} speed={90} />
            </h3>
            <p className="text-[#4A5D54] dark:text-slate-400 text-[15px] md:text-lg leading-relaxed mb-8 md:mb-10">
              {t("heroDesc")}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 ">
              <button className="w-full sm:w-auto flex justify-center items-center gap-2 px-8 py-4 bg-[#2B4238] dark:bg-green-600 text-white rounded-full font-bold hover:bg-[#1E3028] dark:hover:bg-green-500 transition-all shadow-sm hover:scale-[1.02]">
                {t("downloadApp")}
              </button>
              <div className="hidden sm:flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 rounded-full text-sm font-bold text-[#2B4238] dark:text-slate-200 border border-neutral-100 dark:border-slate-800 shadow-sm transition-colors">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {t("parentApproved")}
              </div>
            </div>
          </div>

        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-neutral-100 dark:border-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] dark:shadow-none transition-all hover:scale-[1.02]">
            <div className="w-12 h-12 bg-[#FDF9F1] dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
              <Gamepad2 className="w-6 h-6 text-[#2B4238] dark:text-green-400" strokeWidth={1.5} />
            </div>
            <h4 className="text-lg font-bold text-[#2B4238] dark:text-white mb-3">{t("feature1Title")}</h4>
            <p className="text-[#4A5D54] dark:text-slate-400 text-sm leading-relaxed">
              {t("feature1Desc")}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-neutral-100 dark:border-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] dark:shadow-none transition-all hover:scale-[1.02]">
            <div className="w-12 h-12 bg-[#FDF9F1] dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-[#2B4238] dark:text-green-400" strokeWidth={1.5} />
            </div>
            <h4 className="text-lg font-bold text-[#2B4238] dark:text-white mb-3">{t("feature2Title")}</h4>
            <p className="text-[#4A5D54] dark:text-slate-400 text-sm leading-relaxed">
              {t("feature2Desc")}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-neutral-100 dark:border-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] dark:shadow-none transition-all hover:scale-[1.02]">
            <div className="w-12 h-12 bg-[#FDF9F1] dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
              <BarChart3 className="w-6 h-6 text-[#2B4238] dark:text-green-400" strokeWidth={1.5} />
            </div>
            <h4 className="text-lg font-bold text-[#2B4238] dark:text-white mb-3">{t("feature3Title")}</h4>
            <p className="text-[#4A5D54] dark:text-slate-400 text-sm leading-relaxed">
              {t("feature3Desc")}
            </p>
          </div>
        </div>

      </main>

      <Footer/>
    </div>
  );
}
