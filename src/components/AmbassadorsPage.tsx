import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaWhatsapp } from "react-icons/fa6";
import { Users, HeartHandshake, Megaphone, Star, Gift, Sparkles, Crown } from "lucide-react";
import { ambassadorsContent } from "@/data/content";
import { startOnboarding, type OnboardingLanguage } from "@/lib/onboarding";
import { analytics } from "@/utils/analytics";
import AnimatedSection from "./AnimatedSection";

const whatIsIcons = [Users, HeartHandshake, Megaphone];
const benefitIcons = [Crown, Star, Sparkles, Gift];

const AmbassadorsPage: React.FC = () => {
  const { pathname } = useLocation();
  const language: OnboardingLanguage = pathname.startsWith("/es") || pathname.startsWith("/embajadores") ? "es" : "en";
  const content = ambassadorsContent[language];
  const [isCtaLoading, setIsCtaLoading] = useState(false);

  const handleApply = async (placementLabel: string) => {
    if (isCtaLoading) return;
    setIsCtaLoading(true);

    analytics.trackCTAClick("primary", placementLabel, language);
    analytics.trackWhatsAppClick("cta", undefined, language);

    try {
      await startOnboarding({ intent: "ambassador", language, placement: "ambassadors" });
    } catch (error) {
      console.error("Ambassador onboarding failed:", error);
    } finally {
      setIsCtaLoading(false);
    }
  };

  const ctaButton = (text: string, placementLabel: string) => (
    <button
      type="button"
      onClick={() => handleApply(placementLabel)}
      disabled={isCtaLoading}
      className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#27e97c] px-8 py-3 text-sm font-semibold text-black shadow-[0_10px_24px_rgba(39,233,124,0.35)] transition hover:bg-[#1fc869] focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-70"
    >
      <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
      {isCtaLoading ? (language === "es" ? "Conectando con WhatsApp..." : "Connecting to WhatsApp...") : text}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>{content.seo.title}</title>
        <meta name="description" content={content.seo.description} />
        <meta property="og:title" content={content.seo.title} />
        <meta property="og:description" content={content.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://andesrc.com/embajadores" />
        <link rel="canonical" href="https://andesrc.com/embajadores" />
      </Helmet>

      <main className="mx-auto max-w-5xl px-6 pb-24">
        {/* Hero */}
        <AnimatedSection className="pt-10 text-center md:pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#27e97c]">{content.hero.preheading}</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            {content.hero.headlineLead} <span className="text-[#27e97c]">{content.hero.headlineAccent}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
            {content.hero.description}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            {ctaButton(content.hero.ctaText, "ambassadors_hero")}
            <p className="text-xs text-gray-400">{content.hero.ctaNote}</p>
          </div>
        </AnimatedSection>

        {/* Qué hace una embajadora */}
        <AnimatedSection className="mt-20 md:mt-28">
          <h2 className="text-center text-3xl font-bold md:text-4xl">{content.whatIs.title}</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {content.whatIs.items.map((item, index) => {
              const Icon = whatIsIcons[index] ?? Users;
              return (
                <article key={item.title} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 md:p-7">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#27e97c]/40 bg-[#27e97c]/15 text-[#27e97c]">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-300">{item.description}</p>
                </article>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Beneficios */}
        <AnimatedSection className="mt-20 md:mt-28">
          <h2 className="text-center text-3xl font-bold md:text-4xl">{content.benefits.title}</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {content.benefits.items.map((item, index) => {
              const Icon = benefitIcons[index] ?? Star;
              return (
                <article key={item.title} className="flex items-start gap-4 rounded-[24px] border border-white/10 bg-white/[0.03] p-6">
                  <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#27e97c]/15 text-[#27e97c]">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-300">{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Cómo funciona */}
        <AnimatedSection className="mt-20 md:mt-28">
          <h2 className="text-center text-3xl font-bold md:text-4xl">{content.howItWorks.title}</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {content.howItWorks.steps.map((step, index) => (
              <article key={step.title} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 text-center">
                <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#27e97c] text-sm font-bold text-black">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">{step.description}</p>
              </article>
            ))}
          </div>
        </AnimatedSection>

        {/* Fundadoras */}
        <AnimatedSection className="mt-20 md:mt-28">
          <div className="rounded-[28px] border border-[#27e97c]/30 bg-[#27e97c]/[0.06] p-8 text-center md:p-12">
            <h2 className="text-3xl font-bold md:text-4xl">{content.socialProof.title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-200">{content.socialProof.description}</p>
          </div>
        </AnimatedSection>

        {/* FAQ */}
        <AnimatedSection className="mt-20 md:mt-28">
          <h2 className="text-center text-3xl font-bold md:text-4xl">{content.faq.title}</h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {content.faq.items.map((item) => (
              <article key={item.question} className="rounded-[20px] border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-base font-semibold">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">{item.answer}</p>
              </article>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA final */}
        <AnimatedSection className="mt-20 text-center md:mt-28">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold md:text-4xl">{content.finalCta.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-gray-300">{content.finalCta.subtitle}</p>
          <div className="mt-8">{ctaButton(content.finalCta.ctaText, "ambassadors_footer")}</div>
        </AnimatedSection>
      </main>
    </div>
  );
};

export default AmbassadorsPage;
