import React, { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa6";
import HeroSection from "./HeroSection";
import {
  heroContent,
  pricingContent,
  clubVoicesContent,
  faqContent,
  indicatorsContent,
  howItWorksContent,
  weekStoryContent,
  ctaContent,
} from "../data/content";
import AnimatedSection from "./ui/animated-section";
import { useLanguageDetection } from "../hooks/useLanguageDetection";
import { analytics, initializeAnalytics, trackABTest, trackSocialProofView, trackTestimonialView } from "../utils/analytics";
import { startOnboarding, type OnboardingIntent, type OnboardingPlacement } from "../lib/onboarding";

const ClubSection = lazy(() => import("./ClubSection"));
const PricingSection = lazy(() => import("./PricingSection"));
const ImpactIndicatorsSection = lazy(() => import("./ImpactIndicatorsSection"));
const HowItWorksSection = lazy(() => import("./HowItWorksSection"));
const WeekStorySection = lazy(() => import("./WeekStorySection"));
const FAQSection = lazy(() => import("./FAQSection"));
const SeoManager = lazy(() => import("./SeoManager"));

const Home = () => {
  const { currentLanguage: language } = useLanguageDetection();
  const location = useLocation();
  const [abVariant] = useState<"A" | "B">(() => (Math.random() > 0.5 ? "B" : "A"));
  const [activeVoiceIndex, setActiveVoiceIndex] = useState(0);
  const [activeCta, setActiveCta] = useState<string | null>(null);

  useEffect(() => {
    if (language) {
      initializeAnalytics(language);
    }
  }, [language]);

  // Header links from other pages arrive as /#section — resolve the hash after App's scroll reset.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
    return () => clearTimeout(timer);
  }, [location.hash]);

  useEffect(() => {
    trackABTest(abVariant, language);
    trackSocialProofView(language);
    trackTestimonialView(language);
  }, [abVariant, language]);

  // Centralized CTA orchestration:
  // 1) analytics attribution by placement
  // 2) onboarding API call
  // 3) fallback route if external endpoint fails
  const handleOnboardingStart = async (intent: OnboardingIntent, placement: OnboardingPlacement, source?: string) => {
    if (activeCta) return;

    const ctaType = intent === "free" ? "primary" : "secondary";
    setActiveCta(`${placement}-${intent}`);

    analytics.trackCTAClick(ctaType, `${placement}_cta`, language);
    analytics.trackWhatsAppClick("cta", undefined, language);

    try {
      await startOnboarding(source ? { intent, language, placement, source } : { intent, language, placement });
    } catch (error) {
      console.error("Onboarding failed, using fallback:", error);
      window.location.href = `/start?flow=${intent}&language=${language}`;
    } finally {
      setActiveCta(null);
    }
  };

  const isLoading = (intent: OnboardingIntent, placement: OnboardingPlacement) => activeCta === `${placement}-${intent}`;

  const scrollToClub = () => {
    document.getElementById("club")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <main className="flex-grow pb-24 md:pb-0">
        <SeoManager lang={language} />

        {/* 1. Hero — Problem + solution + CTA */}
        <section id="hero">
          <HeroSection
            preheading={heroContent[language].preheading}
            headline={heroContent[language].headline}
            description={heroContent[language].description}
            ctaPrimaryText={heroContent[language].ctaPrimaryText}
            ctaSecondaryText={heroContent[language].ctaSecondaryText}
            limitNotice={heroContent[language].limitNotice}
            keyBenefits={heroContent[language].keyBenefits}
            onPrimaryClick={() => handleOnboardingStart("free", "hero")}
            onSecondaryClick={scrollToClub}
            imageSrc={heroContent[language].imageSrc}
            language={language}
            abVariant={abVariant}
          />
        </section>

        {/* 2. Tu primera semana — atributos vividos día a día; el jueves (club) es el clímax */}
        <section id="week">
          <Suspense fallback={<div className="p-12 text-center">…</div>}>
            <WeekStorySection
              language={language}
              preheading={weekStoryContent[language].preheading}
              sectionTitle={weekStoryContent[language].sectionTitle}
              sectionSubtitle={weekStoryContent[language].sectionSubtitle}
              clubBadge={weekStoryContent[language].clubBadge}
              clubCta={weekStoryContent[language].clubCta}
              days={weekStoryContent[language].days}
              onJoinClick={() => handleOnboardingStart("free", "week_story")}
              isLoading={isLoading("free", "week_story")}
            />
          </Suspense>
        </section>

        {/* 3. Club — los primeros de Pamplona (comunidad como motor de crecimiento) */}
        <section id="club" className="section-separator relative bg-surface py-16 md:py-24">
          <Suspense fallback={<div className="p-12 text-center">…</div>}>
            <ClubSection
              language={language}
              onJoinClick={() => handleOnboardingStart("free", "mid")}
              onCityRequestClick={() => handleOnboardingStart("free", "city_request", "city-request")}
              isLoading={isLoading("free", "mid") || isLoading("free", "city_request")}
            />
          </Suspense>
        </section>

        {/* 4. How It Works — 3 easy steps */}
        <section id="how-it-works">
          <Suspense fallback={<div className="p-12 text-center">…</div>}>
            <HowItWorksSection
              sectionTitle={howItWorksContent[language].sectionTitle}
              sectionSubtitle={howItWorksContent[language].sectionSubtitle}
              steps={howItWorksContent[language].steps}
            />
          </Suspense>
        </section>

        {/* 5. Stats — cifras de la oferta */}
        <section className="relative bg-surface pb-16 md:pb-24">
          <Suspense fallback={null}>
            <ImpactIndicatorsSection stats={indicatorsContent[language].stats} />
          </Suspense>
        </section>

        {/* 6. Voces del club — solo frases reales con consentimiento; oculto mientras no haya */}
        {clubVoicesContent[language].voices.length > 0 ? (
          <section id="reviews" className="section-separator relative bg-surface py-16 md:py-24">
            <div className="container mx-auto px-4">
              <AnimatedSection className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand sm:text-xs">
                  {clubVoicesContent[language].preheading}
                </p>
                <h2 className="mt-3 font-display text-3xl font-medium text-cream md:text-4xl">{clubVoicesContent[language].sectionTitle}</h2>
              </AnimatedSection>
              <AnimatedSection>
                {(() => {
                  const voices = clubVoicesContent[language].voices;
                  const voice = voices[Math.min(activeVoiceIndex, voices.length - 1)];
                  return (
                    <figure className="glass-card-premium relative mx-auto max-w-4xl overflow-hidden rounded-[24px] px-6 py-8 text-center md:px-8 md:py-10">
                      {voice.photo ? (
                        <img
                          src={voice.photo}
                          alt={voice.author}
                          className="mx-auto mb-5 h-16 w-16 rounded-full object-cover ring-2 ring-brand/40"
                          loading="lazy"
                          width={64}
                          height={64}
                        />
                      ) : null}
                      <blockquote className="font-display text-lg font-medium leading-snug text-cream md:text-2xl lg:text-3xl">
                        “{voice.quote}”
                      </blockquote>
                      <figcaption className="mt-5">
                        <span className="block text-base font-semibold text-cream md:text-lg">{voice.author}</span>
                        <span className="block text-sm text-gray-400">{voice.detail}</span>
                      </figcaption>
                      {voices.length > 1 ? (
                        <div className="mt-7 flex justify-center gap-2.5" role="tablist" aria-label={clubVoicesContent[language].sectionTitle}>
                          {voices.map((v, index) => (
                            <button
                              key={v.author}
                              type="button"
                              role="tab"
                              aria-selected={index === activeVoiceIndex}
                              aria-label={v.author}
                              onClick={() => setActiveVoiceIndex(index)}
                              className={`h-3 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                                index === activeVoiceIndex ? "w-7 bg-brand" : "w-3 bg-white/20 hover:bg-white/40"
                              }`}
                            />
                          ))}
                        </div>
                      ) : null}
                    </figure>
                  );
                })()}
              </AnimatedSection>
            </div>
          </section>
        ) : null}

        {/* 7. Pricing */}
        <section id="pricing" className="section-separator relative overflow-hidden bg-surface py-16 text-gray-100 md:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute -top-32 right-[-7rem] h-96 w-96 rounded-full bg-brand-deep/30 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute bottom-[-5rem] left-[-6rem] h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
          <div className="container mx-auto px-4">
            <Suspense fallback={<div className="p-12 text-center">Cargando planes...</div>}>
              <PricingSection
                sectionTitle={pricingContent[language].sectionTitle}
                sectionSubtitle={pricingContent[language].sectionSubtitle}
                limitNote={pricingContent[language].limitNote}
                comparisonRows={pricingContent[language].comparisonRows}
                plans={pricingContent[language].plans}
                onPlanClick={(intent) => handleOnboardingStart(intent, "pricing")}
                language={language}
              />
            </Suspense>
          </div>
        </section>

        {/* 8. FAQ — Real objections from Carlos */}
        <section>
          <Suspense fallback={<div className="p-12 text-center">Cargando FAQ...</div>}>
            <FAQSection
              sectionTitle={faqContent[language].sectionTitle}
              sectionSubtitle={faqContent[language].sectionSubtitle}
              faqs={faqContent[language].faqs}
              language={language}
            />
          </Suspense>
        </section>

        {/* 9. Footer CTA — "Empieza ahora, es gratis" */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0">
            <img
              src="/images/background.png"
              alt={language === "es" ? "Pista de atletismo iluminada de noche" : "Night track ready for runners"}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface/85 via-surface/75 to-surface/85" />
          </div>
          <div className="relative">
            <div className="container mx-auto px-4">
              <AnimatedSection className="glass-card-premium mx-auto max-w-3xl rounded-[28px] px-6 py-8 text-center text-cream md:px-10 md:py-10">
                <h2 className="font-display text-3xl font-medium leading-tight md:text-4xl">
                  {ctaContent[language].title}
                </h2>
                <p className="mt-3 text-sm text-gray-300 md:text-base">
                  {ctaContent[language].subtitle}
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleOnboardingStart("free", "footer")}
                    disabled={Boolean(activeCta)}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-3 text-sm font-semibold text-black shadow-[0_10px_28px_rgba(37,211,102,0.25)] transition hover:brightness-110"
                  >
                    <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
                    <span>
                      {isLoading("free", "footer")
                        ? language === "es"
                          ? "Conectando..."
                          : "Connecting..."
                        : ctaContent[language].buttonText}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOnboardingStart("premium", "footer")}
                    disabled={Boolean(activeCta)}
                    className="text-sm font-medium text-white/70 underline-offset-4 transition hover:text-brand hover:underline disabled:opacity-60"
                  >
                    {isLoading("premium", "footer")
                      ? language === "es"
                        ? "Conectando..."
                        : "Connecting..."
                      : ctaContent[language].secondaryLinkText}
                  </button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
