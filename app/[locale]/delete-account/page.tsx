import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DeleteAccountPage() {
  const t = useTranslations("DeleteAccount");

  return (
    <div className="min-h-screen bg-[#FDF9F1] dark:bg-slate-950 font-sans flex flex-col transition-colors duration-300">
      <Navbar />

      <main id="main-content" className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 md:py-20 mt-4 md:mt-10 mb-12">
        <div className="bg-white dark:bg-slate-900 rounded-[32px] p-6 md:p-10 lg:p-12 border border-neutral-200 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2B4238] dark:text-white mb-8 pb-6 border-b border-neutral-100 dark:border-slate-800">
            {t("title")}
          </h1>

          <div className="space-y-10 text-[15px] md:text-base text-neutral-700 dark:text-slate-300 leading-relaxed">
            
            <p className="text-lg text-[#2B4238] dark:text-slate-200 font-medium">
              {t("intro")}
            </p>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#2B4238] dark:text-white">{t("section1Title")}</h2>
              <p>{t("section1Content")}</p>
              <ul className="list-disc ps-6 space-y-2.5 text-neutral-600 dark:text-slate-400 marker:text-yellow-400">
                <li>{t("section1List1Item1")}</li>
                <li>{t("section1List1Item2")}</li>
              </ul>
              <p className="font-semibold text-[#2B4238] dark:text-white mt-4">{t("section1Outro")}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#2B4238] dark:text-white">{t("section2Title")}</h2>
              <p>{t("section2Content")}</p>
              <ul className="list-disc ps-6 space-y-2.5 text-neutral-600 dark:text-slate-400 marker:text-yellow-400">
                <li>{t("section2List1Item1")}</li>
                <li>{t("section2List1Item2")}</li>
                <li>{t("section2List1Item3")}</li>
                <li>{t("section2List1Item4")}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#2B4238] dark:text-white">{t("section3Title")}</h2>
              <p>{t("section3Content")}</p>
              <ul className="list-disc ps-6 space-y-2.5 text-neutral-600 dark:text-slate-400 marker:text-yellow-400">
                <li>{t("section3List1Item1")}</li>
              </ul>
              <p className="mt-4">{t("section3Outro")}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#2B4238] dark:text-white">{t("section4Title")}</h2>
              <p>{t("section4Content")}</p>
            </section>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
