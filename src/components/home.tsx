import React, { useState, lazy, Suspense, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/button";
import { initGA, trackPlanDownload } from "../lib/analytics";
import { trackABTest, trackHeroCTR, trackSocialProofView, trackTestimonialView, trackTestimonialCTAClick } from "../lib/analytics";

gsap.registerPlugin(ScrollTrigger);

// Component Imports
import HeroSection from "./HeroSection";
import TrainingPlanCard from "./TrainingPlanCard";
import UnderConstructionPlanCard from "./UnderConstructionPlanCard";

// Lazy Loaded Components
// Critical components - load immediately
const BenefitsSection = lazy(() => import("./BenefitsSection"));
const PricingSection = lazy(() => import("./PricingSection"));
const ImpactIndicatorsSection = lazy(() => import("./ImpactIndicatorsSection"));

// Secondary components - lazy load
const PlanRequestForm = lazy(() => import("./PlanRequestForm"));
const GritSection = lazy(() => import("./grit/GritSection"));
const BlogHighlights = lazy(() => import("../features/blog/components/BlogHighlights"));
const FAQSection = lazy(() => import("./FAQSection"));

// Modal components - load on demand
const GritStoryModal = lazy(() => import("./grit/GritStoryModal"));
const LeadMagnetModal = lazy(() => import("./LeadMagnetModal"));

// Non-critical components
const CityCommunitySection = lazy(() => import("./CityCommunitySection"));
const SeoManager = lazy(() => import("./SeoManager"));
import { trainingPlans, heroContent, benefitsContent, pricingContent, ctaContent, freePlansSectionContent, planRequestContent, cityCommunityContent, gritStoriesContent, testimonialsContent, howItWorksContent, liveDemoContent, leadMagnetContent, faqContent, indicatorsContent } from "../data/content";
import AnimatedSection from "./ui/animated-section";
import type { Language } from "../data/content";
import { useLanguageDetection } from "../hooks/useLanguageDetection";
import { analytics, initializeAnalytics } from "../utils/analytics";

const Home = () => {
  const { currentLanguage: language } = useLanguageDetection();

  // Initialize analytics when language is detected
  useEffect(() => {
    if (language) {
      initializeAnalytics(language);
    }
  }, [language]);
  // Lógica para A/B testing - alternar entre variantes
  const [abVariant] = useState<'A' | 'B'>(() => {
    // Simular A/B testing - en producción usar analytics
    return Math.random() > 0.5 ? 'B' : 'A';
  });
  const [leadMagnetModalOpen, setLeadMagnetModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ title: string; pdfUrl: string } | null>(null);
  const [selectedGritStory, setSelectedGritStory] = useState<any | null>(null);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  const gritSectionRef = useRef<HTMLDivElement>(null);
  const pricingSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGA();
    // Track A/B test view
    trackABTest(abVariant, language);
    setActiveTestimonialIndex(0);
  }, [abVariant, language]);

  useEffect(() => {
    // Track social proof view when component mounts
    trackSocialProofView(language);
  }, [language]);

  useEffect(() => {
    // Track testimonial section view when component mounts
    trackTestimonialView(language);
  }, [language]);


  const scrollToPricing = () => {
    trackHeroCTR(abVariant, language, 'primary');
    analytics.trackCTAClick('primary', 'hero_section', language);
    pricingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openGritStoryModal = (story: any) => {
    setSelectedGritStory(story);
  };

  const closeGritStoryModal = () => {
    setSelectedGritStory(null);
  };

  const handlePlanClick = (plan: any) => {
    const planTitle = typeof plan.title === 'string' ? plan.title : plan.title[language];

    // Track plan selection
    analytics.trackPlanSelection('free', planTitle, language);

    if (plan.isLeadMagnet) {
      setSelectedPlan(plan);
      setLeadMagnetModalOpen(true);
      trackPlanDownload(planTitle);
    } else if (plan.pdfUrl && !plan.isUnderConstruction) {
      window.open(plan.pdfUrl, '_blank');
      trackPlanDownload(planTitle);
      analytics.trackPDFDownload(planTitle, language);
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <main className="flex-grow">
        <SeoManager lang={language} />
        <section id="hero">
          <HeroSection
            preheading={heroContent[language].preheading}
            headline={heroContent[language].headline}
            description={heroContent[language].description}
            ctaPrimaryText={heroContent[language].ctaPrimaryText}
            keyBenefits={heroContent[language].keyBenefits}
            onPrimaryClick={scrollToPricing}
            videoSrc={heroContent[language].videoSrc}
            language={language}
            abVariant={abVariant}
          />
        </section>

        <section id="benefits" className="relative py-8 md:py-20 lg:py-24 bg-black text-gray-200">
          <div className="container mx-auto px-4 relative z-0">
            <AnimatedSection>
              <Suspense fallback={<div className="text-center p-12">Cargando beneficios...</div>}>
                <BenefitsSection
                  sectionTitle={benefitsContent[language].sectionTitle}
                  sectionSubtitle={benefitsContent[language].sectionSubtitle}
                  benefits={benefitsContent[language].benefits}
                />
              </Suspense>
            </AnimatedSection>
          </div>
        </section>

        <section className="relative py-12 md:py-20 lg:py-24 bg-black section-separator">
          <div className="container mx-auto px-4">
            <Suspense fallback={<div className="text-center p-12">Cargando indicadores...</div>}>
              <ImpactIndicatorsSection
                preheading={indicatorsContent[language].preheading}
                title={indicatorsContent[language].title}
                highlight={indicatorsContent[language].highlight}
                image={indicatorsContent[language].image}
                stats={indicatorsContent[language].stats}
              />
            </Suspense>
          </div>
        </section>

        {/* Testimonios Section */}
        <section id="reviews" className="relative py-12 md:py-20 lg:py-24 bg-black section-separator">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-10 md:mb-14 lg:mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-white">
                {testimonialsContent[language].sectionTitle}
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-400">
                {language === 'es'
                  ? 'Descubre cómo Andes ha transformado las vidas de corredores como tú'
                  : 'Discover how Andes has transformed the lives of runners like you'
                }
              </p>
            </AnimatedSection>
            <AnimatedSection>
              {testimonialsContent[language].testimonials.length > 0 && (
                <div className="mx-auto max-w-4xl rounded-2xl md:rounded-[24px] border border-white/10 bg-neutral-900/70 px-6 md:px-8 py-10 md:py-12 text-center shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
                  <div className="flex justify-center gap-1 text-[#f5c451] text-lg md:text-xl mb-5 md:mb-6" aria-hidden>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span key={idx}>★</span>
                    ))}
                  </div>
                  <blockquote className="text-xl md:text-2xl lg:text-3xl font-semibold leading-snug text-white">
                    "{testimonialsContent[language].testimonials[activeTestimonialIndex].quote}"
                  </blockquote>
                  <div className="mt-5 md:mt-6 text-xs md:text-sm uppercase tracking-[0.25em] md:tracking-[0.3em] text-[#25d366]/80">
                    {testimonialsContent[language].testimonials[activeTestimonialIndex].result}
                  </div>
                  <div className="mt-3 md:mt-4 text-white font-semibold text-base md:text-lg">
                    {testimonialsContent[language].testimonials[activeTestimonialIndex].author}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {testimonialsContent[language].testimonials[activeTestimonialIndex].detail}
                  </div>
                  <div className="mt-8 md:mt-10 flex justify-center gap-3 md:gap-4 flex-wrap">
                    {testimonialsContent[language].testimonials.map((testimonial, index) => (
                      <button
                        key={testimonial.author}
                        type="button"
                        onClick={() => setActiveTestimonialIndex(index)}
                        className={`relative h-12 w-12 md:h-14 md:w-14 rounded-full border transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25d366] ${index === activeTestimonialIndex
                          ? 'border-[#25d366] shadow-[0_0_25px_rgba(37,211,102,0.35)]'
                          : 'border-white/10 hover:border-[#25d366]/60'
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
                          <span className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#006b5b] to-[#25d366] text-white font-bold text-sm md:text-base">
                            {testimonial.author.charAt(0)}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </AnimatedSection>
          </div>
        </section>

        <section>
          <Suspense fallback={<div className="text-center p-12">Cargando Historias de GRIT...</div>}>
            <GritSection ref={gritSectionRef} language={language} onStoryClick={openGritStoryModal} content={gritStoriesContent[language]} />
          </Suspense>
        </section>

        {/* Aprende y Mejora (destacados del blog) */}
        <section className="py-8 md:py-14 lg:py-16 bg-black">
          <Suspense fallback={<div className="text-center p-12">Cargando blog...</div>}>
            <BlogHighlights lang={language} limit={4} />
          </Suspense>
        </section>

        <section id="pricing" ref={pricingSectionRef} className="py-12 md:py-20 lg:py-24 bg-black text-gray-100 section-separator">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <Suspense fallback={<div className="text-center p-12">Cargando planes de precios...</div>}>
                <PricingSection
                  sectionTitle={pricingContent[language].sectionTitle}
                  sectionSubtitle={pricingContent[language].sectionSubtitle}
                  onGetFreePlanClick={scrollToPricing}
                  plans={pricingContent[language].plans.map((plan, index) => ({
                    ...plan,
                    onCtaClick: index === 0
                      ? undefined
                      : () => {
                        if (index === 1) {
                          const gritSection = document.getElementById('grit-stories');
                          if (gritSection) {
                            gritSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }
                  }))}
                />
              </Suspense>
            </AnimatedSection>
          </div>
        </section>

        <AnimatePresence>
          {selectedGritStory && (
            <Suspense fallback={<div>Cargando historia...</div>}>
              <GritStoryModal
                onClose={closeGritStoryModal}
                story={selectedGritStory}
              />
            </Suspense>
          )}
        </AnimatePresence>

        {selectedPlan && (
          <Suspense fallback={<div>Cargando...</div>}>
            <LeadMagnetModal
              isOpen={leadMagnetModalOpen}
              onClose={() => setLeadMagnetModalOpen(false)}
              planTitle={selectedPlan.title}
              pdfUrl={selectedPlan.pdfUrl}
            />
          </Suspense>
        )}
      </main>

      <section>
        <Suspense fallback={<div className="text-center p-12">Cargando ciudades...</div>}>
          <CityCommunitySection
            sectionTitle={cityCommunityContent[language].sectionTitle}
            sectionSubtitle={cityCommunityContent[language].sectionSubtitle}
            cities={cityCommunityContent[language].cities}
            language={language}
          />
        </Suspense>
      </section>

      <section>
        <Suspense fallback={<div className="text-center p-12">Cargando preguntas...</div>}>
          <FAQSection
            sectionTitle={faqContent[language].sectionTitle}
            sectionSubtitle={faqContent[language].sectionSubtitle}
            faqs={faqContent[language].faqs}
            language={language}
          />
        </Suspense>
      </section>

      <section className="relative overflow-hidden py-20 md:py-32 lg:py-48">
        <div className="absolute inset-0">
          <img
            src="/images/background.png"
            alt={language === 'es' ? 'Pista de atletismo iluminada de noche' : 'Night track ready for runners'}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/50 to-black/50" />
        </div>
        <div className="relative">
          <div className="container mx-auto px-4">
            <AnimatedSection className="mx-auto max-w-3xl text-center text-white">
              <h2 className="mt-4 md:mt-6 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {language === 'es' ? '¿Listo para lograr tus metas?' : 'Ready to Achieve Your Goals?'}
              </h2>
              <div className="mt-6 md:mt-8 flex justify-center">
                <Link
                  to={language === 'es' ? '/es/start' : '/start'}
                  className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-7 md:px-8 py-3 text-sm md:text-base font-semibold text-black shadow-[0_18px_35px_rgba(37,211,102,0.35)] transition hover:bg-[#1fc869] min-h-[48px]"
                >
                  {language === 'es' ? 'Comienza ahora' : 'Start now'}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Global footer is rendered in App.tsx */}

      {/* Global footer is rendered in App.tsx */}
    </div>
  );
};

export default Home;
