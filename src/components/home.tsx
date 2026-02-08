import React, { lazy, Suspense, useEffect, useState } from "react";
import { ArrowRight, Quote } from "lucide-react";
import HeroSection from "./HeroSection";
import { initGA, trackABTest, trackSocialProofView, trackTestimonialView } from "../lib/analytics";
import {
  heroContent,
  benefitsContent,
  pricingContent,
  gritStoriesContent,
  testimonialsContent,
  faqContent,
  indicatorsContent,
} from "../data/content";
import AnimatedSection from "./ui/animated-section";
import { useLanguageDetection } from "../hooks/useLanguageDetection";
import { analytics, initializeAnalytics } from "../utils/analytics";
import { startOnboarding, type OnboardingIntent, type OnboardingPlacement } from "../lib/onboarding";

const BenefitsSection = lazy(() => import("./BenefitsSection"));
const PricingSection = lazy(() => import("./PricingSection"));
const ImpactIndicatorsSection = lazy(() => import("./ImpactIndicatorsSection"));
const GritSection = lazy(() => import("./grit/GritSection"));
const BlogHighlights = lazy(() => import("../features/blog/components/BlogHighlights"));
const FAQSection = lazy(() => import("./FAQSection"));
const SeoManager = lazy(() => import("./SeoManager"));

const Home = () => {
  const { currentLanguage: language } = useLanguageDetection();
  const [abVariant] = useState<"A" | "B">(() => (Math.random() > 0.5 ? "B" : "A"));
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [activeCta, setActiveCta] = useState<string | null>(null);

  useEffect(() => {
    if (language) {
      initializeAnalytics(language);
    }
  }, [language]);

  useEffect(() => {
    initGA();
    trackABTest(abVariant, language);
    trackSocialProofView(language);
    trackTestimonialView(language);
  }, [abVariant, language]);

  // Centralized CTA orchestration:
  // 1) analytics attribution by placement
  // 2) onboarding API call
  // 3) fallback route if external endpoint fails
  const handleOnboardingStart = async (intent: OnboardingIntent, placement: OnboardingPlacement) => {
    if (activeCta) return;

    const ctaType = intent === "free" ? "primary" : "secondary";
    setActiveCta(`${placement}-${intent}`);

    analytics.trackCTAClick(ctaType, `${placement}_cta`, language);
    analytics.trackWhatsAppClick("cta", undefined, language);

    try {
      await startOnboarding({ intent, language, placement });
    } catch (error) {
      console.error("Onboarding failed, using fallback:", error);
      window.location.href = `/start?flow=${intent}&language=${language}`;
    } finally {
      setActiveCta(null);
    }
  };

  const isLoading = (intent: OnboardingIntent, placement: OnboardingPlacement) => activeCta === `${placement}-${intent}`;

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <main className="flex-grow pb-24 md:pb-0">
        <SeoManager lang={language} />

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
            onSecondaryClick={() => handleOnboardingStart("premium", "hero")}
            videoSrc={heroContent[language].videoSrc}
            language={language}
            abVariant={abVariant}
          />
        </section>

        <section id="pricing" className="section-separator bg-black py-12 text-gray-100 md:py-16">
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

        <section id="benefits" className="bg-black py-10 text-gray-200 md:py-16">
          <div className="container relative z-0 mx-auto px-4">
            <Suspense fallback={<div className="p-12 text-center">Cargando transformación...</div>}>
              <BenefitsSection
                sectionTitle={benefitsContent[language].sectionTitle}
                sectionSubtitle={benefitsContent[language].sectionSubtitle}
                benefits={benefitsContent[language].benefits}
              />
            </Suspense>
          </div>
        </section>

        <section className="section-separator relative bg-black py-10 md:py-16">
          <div className="container mx-auto px-4">
            <Suspense fallback={<div className="p-12 text-center">Cargando seguridad...</div>}>
              <ImpactIndicatorsSection
                preheading={indicatorsContent[language].preheading}
                title={indicatorsContent[language].title}
                highlight={indicatorsContent[language].highlight}
                pillars={indicatorsContent[language].pillars}
                image={indicatorsContent[language].image}
                stats={indicatorsContent[language].stats}
              />
            </Suspense>
          </div>
        </section>

        <section className="bg-black py-8 md:py-12">
          <div className="container mx-auto px-4">
            <AnimatedSection className="glass-card-premium mx-auto max-w-4xl rounded-[28px] px-6 py-8 text-center md:px-10 md:py-10">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                {language === "es" ? "Termina tu primera carrera sin entrenar solo." : "Finish your first race without training alone."}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-300 md:text-base">
                {language === "es"
                  ? "Empieza por WhatsApp, recibe acompañamiento diario y llega a tu meta con progresión sostenible."
                  : "Start on WhatsApp, get daily support, and reach your goal with sustainable progression."}
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => handleOnboardingStart("free", "mid")}
                  disabled={Boolean(activeCta)}
                  className="min-h-[48px] rounded-full bg-[#27e97c] px-6 py-3 text-sm font-semibold text-black shadow-[0_14px_30px_rgba(39,233,124,0.3)] transition hover:bg-[#1fc869]"
                >
                  {isLoading("free", "mid")
                    ? language === "es"
                      ? "Conectando..."
                      : "Connecting..."
                    : language === "es"
                      ? "Empezar Gratis"
                      : "Start Free"}
                </button>
                <button
                  type="button"
                  onClick={() => handleOnboardingStart("premium", "mid")}
                  disabled={Boolean(activeCta)}
                  className="min-h-[48px] rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#27e97c]/50 hover:text-[#27e97c]"
                >
                  {isLoading("premium", "mid")
                    ? language === "es"
                      ? "Conectando..."
                      : "Connecting..."
                    : language === "es"
                      ? "Desbloquear Premium"
                      : "Unlock Premium"}
                </button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section id="reviews" className="section-separator relative bg-black py-12 md:py-16">
          <div className="container mx-auto px-4">
            <AnimatedSection className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
              <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">{testimonialsContent[language].sectionTitle}</h2>
              <p className="text-sm text-gray-400 md:text-lg">
                {language === "es"
                  ? "Personas reales que ya lograron transformar su relación con el running."
                  : "Real runners who already transformed their relationship with running."}
              </p>
            </AnimatedSection>
            <AnimatedSection>
              {testimonialsContent[language].testimonials.length > 0 && (
                <div className="glass-card-premium group relative mx-auto max-w-4xl overflow-hidden rounded-[24px] px-6 py-8 text-center md:px-8 md:py-10">
                  <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 -translate-y-1/2 select-none text-white/5 transition-transform duration-500 group-hover:scale-110">
                    <Quote size={180} fill="currentColor" />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-5 flex justify-center gap-1 text-lg text-[#27e97c] md:text-xl" aria-hidden>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <span key={idx} className="drop-shadow-[0_0_8px_rgba(39,233,124,0.4)]">★</span>
                      ))}
                    </div>
                    <blockquote className="text-lg font-bold leading-snug text-white md:text-2xl lg:text-3xl">
                      "{testimonialsContent[language].testimonials[activeTestimonialIndex].quote}"
                    </blockquote>
                    <div className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-[#27e97c] md:text-sm">
                      {testimonialsContent[language].testimonials[activeTestimonialIndex].result}
                    </div>
                    <div className="mt-3 text-base font-semibold text-white md:text-lg">
                      {testimonialsContent[language].testimonials[activeTestimonialIndex].author}
                    </div>
                    <div className="text-sm text-gray-400">
                      {testimonialsContent[language].testimonials[activeTestimonialIndex].detail}
                    </div>
                    <div className="mt-7 flex flex-wrap justify-center gap-3 md:mt-8">
                      {testimonialsContent[language].testimonials.map((testimonial, index) => (
                        <button
                          key={testimonial.author}
                          type="button"
                          onClick={() => setActiveTestimonialIndex(index)}
                          className={`relative h-12 w-12 rounded-full border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#27e97c] md:h-14 md:w-14 ${
                            index === activeTestimonialIndex
                              ? "scale-110 border-[#27e97c] shadow-[0_0_20px_rgba(39,233,124,0.45)]"
                              : "border-white/10 hover:border-[#27e97c]/60"
                          }`}
                          aria-label={`${testimonial.author} testimonial`}
                        >
                          {(testimonial as any).image ? (
                            <img
                              src={(testimonial as any).image}
                              alt={testimonial.author}
                              className="h-full w-full rounded-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#006b5b] to-[#25d366] text-sm font-bold text-white md:text-base">
                              {testimonial.author.charAt(0)}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </AnimatedSection>
          </div>
        </section>

        <section>
          <Suspense fallback={<div className="p-12 text-center">Cargando historias...</div>}>
            <GritSection language={language} content={gritStoriesContent[language]} />
          </Suspense>
        </section>

        <section id="articles" className="bg-black py-8 md:py-12">
          <Suspense fallback={<div className="p-12 text-center">Cargando blog...</div>}>
            <BlogHighlights lang={language} limit={4} />
          </Suspense>
        </section>

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

        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0">
            <img
              src="/images/background.png"
              alt={language === "es" ? "Pista de atletismo iluminada de noche" : "Night track ready for runners"}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/65 to-black/75" />
          </div>
          <div className="relative">
            <div className="container mx-auto px-4">
              <AnimatedSection className="glass-card-premium mx-auto max-w-3xl rounded-[28px] px-6 py-8 text-center text-white md:px-10 md:py-10">
                <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                  {language === "es" ? "¿Listo para empezar hoy?" : "Ready to start today?"}
                </h2>
                <p className="mt-3 text-sm text-gray-300 md:text-base">
                  {language === "es"
                    ? "Empieza gratis en WhatsApp. Cuando quieras acelerar, desbloqueas Premium."
                    : "Start free on WhatsApp. Upgrade to Premium when you want to accelerate."}
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => handleOnboardingStart("free", "footer")}
                    disabled={Boolean(activeCta)}
                    className="min-h-[48px] rounded-full bg-[#25d366] px-7 py-3 text-sm font-semibold text-black shadow-[0_18px_35px_rgba(37,211,102,0.35)] transition hover:bg-[#1fc869]"
                  >
                    {isLoading("free", "footer")
                      ? language === "es"
                        ? "Conectando..."
                        : "Connecting..."
                      : language === "es"
                        ? "Empezar Gratis"
                        : "Start Free"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOnboardingStart("premium", "footer")}
                    disabled={Boolean(activeCta)}
                    className="min-h-[48px] rounded-full border border-white/25 bg-white/10 px-7 py-3 text-sm font-semibold text-white transition hover:border-[#27e97c]/50 hover:text-[#27e97c]"
                  >
                    {isLoading("premium", "footer")
                      ? language === "es"
                        ? "Conectando..."
                        : "Connecting..."
                      : language === "es"
                        ? "Desbloquear Premium"
                        : "Unlock Premium"}
                  </button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
        <div className="glass-card-premium rounded-2xl border border-white/15 p-3 shadow-[0_12px_35px_rgba(0,0,0,0.45)]">
          <button
            type="button"
            onClick={() => handleOnboardingStart("free", "sticky")}
            disabled={Boolean(activeCta)}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#27e97c] px-4 py-3 text-sm font-semibold text-black"
          >
            {isLoading("free", "sticky")
              ? language === "es"
                ? "Conectando..."
                : "Connecting..."
              : language === "es"
                ? "Empezar Gratis"
                : "Start Free"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
