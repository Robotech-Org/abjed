import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  const t = useTranslations("Privacy");

  return (
    <div className="min-h-screen bg-[#FDF9F1] dark:bg-slate-950 font-sans flex flex-col transition-colors duration-300">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 md:py-20 mt-4 md:mt-10 mb-12">
        <div className="bg-white dark:bg-slate-900 rounded-[32px] p-6 md:p-10 lg:p-12 border border-neutral-200 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2B4238] dark:text-white mb-3">
            {t("title")}
          </h1>
          <p className="text-sm font-medium text-neutral-500 dark:text-slate-400 mb-10 pb-6 border-b border-neutral-100 dark:border-slate-800">
            {t("lastUpdated")}
          </p>

          <div className="space-y-10 text-[15px] md:text-base text-neutral-700 dark:text-slate-300 leading-relaxed">
            
            <div className="space-y-4">
              <p>{t("intro1")}</p>
              <p>{t("intro2")}</p>
            </div>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#2B4238] dark:text-white">{t("section1Title")}</h2>
              <p>{t("section1Content")}</p>
            </section>

            <section className="space-y-5">
              <h2 className="text-xl md:text-2xl font-bold text-[#2B4238] dark:text-white">{t("section2Title")}</h2>
              
              <p className="font-semibold text-[#2B4238] dark:text-white">{t("section2Subtitle1")}</p>
              <ul className="list-disc ps-6 space-y-2.5 text-neutral-600 dark:text-slate-400 marker:text-yellow-400">
                <li>{t("section2List1Item1")}</li>
                <li>{t("section2List1Item2")}</li>
                <li>{t("section2List1Item3")}</li>
                <li>{t("section2List1Item4")}</li>
              </ul>

              <p className="font-semibold text-[#2B4238] dark:text-white mt-8">{t("section2Subtitle2")}</p>
              <ul className="list-disc ps-6 space-y-2.5 text-neutral-600 dark:text-slate-400 marker:text-yellow-400">
                <li>{t("section2List2Item1")}</li>
              </ul>

              <p className="font-semibold text-[#2B4238] dark:text-white mt-8">{t("section2Subtitle3")}</p>
              <ul className="list-disc ps-6 space-y-2.5 text-neutral-600 dark:text-slate-400 marker:text-yellow-400">
                <li>{t("section2List3Item1")}</li>
                <li>{t("section2List3Item2")}</li>
                <li>{t("section2List3Item3")}</li>
                <li>{t("section2List3Item4")}</li>
                <li>{t("section2List3Item5")}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#2B4238] dark:text-white">{t("section3Title")}</h2>
              <p>{t("section3Intro")}</p>
              <ul className="list-disc ps-6 space-y-2.5 text-neutral-600 dark:text-slate-400 marker:text-yellow-400">
                <li>{t("section3List1Item1")}</li>
                <li>{t("section3List1Item2")}</li>
                <li>{t("section3List1Item3")}</li>
                <li>{t("section3List1Item4")}</li>
                <li>{t("section3List1Item5")}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#2B4238] dark:text-white">{t("section4Title")}</h2>
              <p>{t("section4Intro")}</p>
              <ul className="list-disc ps-6 space-y-2.5 text-neutral-600 dark:text-slate-400 marker:text-yellow-400">
                <li>{t("section4List1Item1")}</li>
                <li>{t("section4List1Item2")}</li>
              </ul>
              <p>{t("section4Outro")}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#2B4238] dark:text-white">{t("section5Title")}</h2>
              <p>{t("section5Content1")}</p>
              <p>{t("section5Content2")}</p>
              <p>{t("section5Content3")}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#2B4238] dark:text-white">{t("section6Title")}</h2>
              <p>{t("section6Content")}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#2B4238] dark:text-white">{t("section7Title")}</h2>
              <p>{t("section7Intro")}</p>
              <ul className="list-disc ps-6 space-y-2.5 text-neutral-600 dark:text-slate-400 marker:text-yellow-400">
                <li>{t("section7List1Item1")}</li>
                <li>{t("section7List1Item2")}</li>
                <li>{t("section7List1Item3")}</li>
              </ul>
              <p>{t("section7Outro")}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#2B4238] dark:text-white">{t("section8Title")}</h2>
              <p>{t("section8Content")}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#2B4238] dark:text-white">{t("section9Title")}</h2>
              <p>{t("section9Intro")}</p>
              <div className="mt-4 p-5 bg-[#FDF9F1] dark:bg-slate-800/50 rounded-xl border border-neutral-100 dark:border-slate-800 space-y-2">
                <p>{t("section9Email")}</p>
                <p>{t("section9Phone")}</p>
                <p>{t("section9Company")}</p>
              </div>
            </section>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
