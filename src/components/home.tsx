import React, { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import HeroSection from "./HeroSection";
import { initGA, trackABTest, trackSocialProofView, trackTestimonialView } from "../lib/analytics";
import {
  heroContent,
  benefitsContent,
  pricingContent,
  testimonialsContent,
  faqContent,
  indicatorsContent,
  howItWorksContent,
  productDemoContent,
  ctaContent,
} from "../data/content";
import AnimatedSection from "./ui/animated-section";
import { useLanguageDetection } from "../hooks/useLanguageDetection";
import { analytics, initializeAnalytics } from "../utils/analytics";
import { startOnboarding, type OnboardingIntent, type OnboardingPlacement } from "../lib/onboarding";

const BenefitsSection = lazy(() => import("./BenefitsSection"));
const ClubSection = lazy(() => import("./ClubSection"));
const PricingSection = lazy(() => import("./PricingSection"));
const ImpactIndicatorsSection = lazy(() => import("./ImpactIndicatorsSection"));
const HowItWorksSection = lazy(() => import("./HowItWorksSection"));
const ProductDemoSection = lazy(() => import("./ProductDemoSection"));
const FAQSection = lazy(() => import("./FAQSection"));
const SeoManager = lazy(() => import("./SeoManager"));

const Home = () => {
  const { currentLanguage: language } = useLanguageDetection();
  const location = useLocation();
  const [abVariant] = useState<"A" | "B">(() => (Math.random() > 0.5 ? "B" : "A"));
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
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

        {/* 2. Product Demo — "Así se ve una conversación con tu coach" */}
        <section id="product-demo">
          <Suspense fallback={<div className="p-12 text-center">Cargando demo...</div>}>
            <ProductDemoSection
              sectionTitle={productDemoContent[language].sectionTitle}
              sectionSubtitle={productDemoContent[language].sectionSubtitle}
              messages={productDemoContent[language].messages}
            />
          </Suspense>
        </section>

        {/* 3. Club — la experiencia física (pivote Pamplona) */}
        <section id="club" className="section-separator relative bg-surface py-16 md:py-24">
          <Suspense fallback={<div className="p-12 text-center">Cargando club...</div>}>
            <ClubSection
              language={language}
              onJoinClick={() => handleOnboardingStart("free", "mid")}
              isLoading={isLoading("free", "mid")}
            />
          </Suspense>
        </section>

        {/* 4. How It Works — 3 easy steps */}
        <section id="how-it-works">
          <Suspense fallback={<div className="p-12 text-center">Cargando pasos...</div>}>
            <HowItWorksSection
              sectionTitle={howItWorksContent[language].sectionTitle}
              sectionSubtitle={howItWorksContent[language].sectionSubtitle}
              steps={howItWorksContent[language].steps}
            />
          </Suspense>
        </section>

        {/* 4. Benefits — Each benefit with concrete proof */}
        <section id="benefits" className="bg-surface py-16 text-gray-200 md:py-24">
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

        {/* 5. Impact Indicators — Safety & sustainable progress */}
        <section className="section-separator relative bg-surface py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Suspense fallback={<div className="p-12 text-center">Cargando seguridad...</div>}>
              <ImpactIndicatorsSection
                preheading={indicatorsContent[language].preheading}
                title={indicatorsContent[language].title}
                highlight={indicatorsContent[language].highlight}
                pillars={indicatorsContent[language].pillars}
                image={indicatorsContent[language].image}
                stats={indicatorsContent[language].stats}
                statsDisclaimer={indicatorsContent[language].statsDisclaimer}
              />
            </Suspense>
          </div>
        </section>

        {/* 6. Testimonials — Social proof (labeled as beta) */}
        <section id="reviews" className="section-separator relative bg-surface py-16 md:py-24">
          <div className="container mx-auto px-4">
            <AnimatedSection className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
              <h2 className="mb-3 font-display text-3xl font-medium text-cream md:text-4xl">{testimonialsContent[language].sectionTitle}</h2>
              <p className="text-sm text-gray-400 md:text-lg">
                {testimonialsContent[language].sectionDisclaimer}
              </p>
            </AnimatedSection>
            <AnimatedSection>
              {testimonialsContent[language].testimonials.length > 0 && (
                <div className="glass-card-premium group relative mx-auto max-w-4xl overflow-hidden rounded-[24px] px-6 py-8 text-center md:px-8 md:py-10">
                  <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 -translate-y-1/2 select-none text-white/5 transition-transform duration-500 group-hover:scale-110">
                    <Quote size={180} fill="currentColor" />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-5 flex justify-center gap-1 text-lg text-brand md:text-xl" aria-hidden>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <span key={idx}>★</span>
                      ))}
                    </div>
                    <blockquote className="font-display text-lg font-medium leading-snug text-cream md:text-2xl lg:text-3xl">
                      "{testimonialsContent[language].testimonials[activeTestimonialIndex].quote}"
                    </blockquote>
                    <div className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-brand md:text-sm">
                      {testimonialsContent[language].testimonials[activeTestimonialIndex].result}
                    </div>
                    <div className="mt-3 text-base font-semibold text-cream md:text-lg">
                      {testimonialsContent[language].testimonials[activeTestimonialIndex].author}
                    </div>
                    <div className="text-sm text-gray-400">
                      {testimonialsContent[language].testimonials[activeTestimonialIndex].detail}
                    </div>
                    <div className="mt-7 flex justify-center gap-2.5 md:mt-8" role="tablist" aria-label={language === "es" ? "Testimonios" : "Testimonials"}>
                      {testimonialsContent[language].testimonials.map((testimonial, index) => (
                        <button
                          key={testimonial.author}
                          type="button"
                          role="tab"
                          aria-selected={index === activeTestimonialIndex}
                          onClick={() => setActiveTestimonialIndex(index)}
                          className={`h-3 w-3 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
                            index === activeTestimonialIndex ? "w-7 bg-brand" : "bg-white/20 hover:bg-white/40"
                          }`}
                          aria-label={`${language === "es" ? "Testimonio" : "Testimonial"} ${index + 1} ${language === "es" ? "de" : "of"} ${testimonialsContent[language].testimonials.length}: ${testimonial.author}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </AnimatedSection>
          </div>
        </section>

        {/* 7. Pricing — Moved after demonstrating value */}
        <section id="pricing" className="section-separator bg-surface py-16 text-gray-100 md:py-24">
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

      <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
        <div className="glass-card-premium rounded-2xl border border-white/15 p-3 shadow-[0_12px_35px_rgba(0,0,0,0.45)]">
          <button
            type="button"
            onClick={() => handleOnboardingStart("free", "sticky")}
            disabled={Boolean(activeCta)}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3 text-sm font-semibold text-black"
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
