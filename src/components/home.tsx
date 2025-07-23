import React, { useState, lazy, Suspense, useEffect, useRef } from "react";
import { AnimatePresence } from 'framer-motion';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { initGA, trackArticleView, trackPlanDownload } from "../lib/analytics";
import { trackABTest, trackHeroCTR, trackSocialProofView, trackTestimonialView, trackTestimonialCTAClick } from "../lib/analytics";
import { useAndesOnboarding } from "../hooks/useAndesOnboarding";

gsap.registerPlugin(ScrollTrigger);

// Component Imports
import HeroSection from "./HeroSection";
import ArticleCard from "./ArticleCard";
import TrainingPlanCard from "./TrainingPlanCard";
import UnderConstructionPlanCard from "./UnderConstructionPlanCard";
import ArticleCarousel from "./ArticleCarousel";

// Lazy Loaded Components
// Critical components - load immediately
const BenefitsSection = lazy(() => import("./BenefitsSection"));
const PricingSection = lazy(() => import("./PricingSection"));

// Secondary components - lazy load
const PlanRequestForm = lazy(() => import("./PlanRequestForm"));
const GritSection = lazy(() => import("./grit/GritSection"));
const FAQSection = lazy(() => import("./FAQSection"));

// Modal components - load on demand
const GritStoryModal = lazy(() => import("./grit/GritStoryModal"));
const LeadMagnetModal = lazy(() => import("./LeadMagnetModal"));
const ArticleModal = lazy(() => import('./ArticleModal'));

// Non-critical components
const CityCommunitySection = lazy(() => import("./CityCommunitySection"));
const SeoManager = lazy(() => import("./SeoManager"));
import { trainingPlans, heroContent, benefitsContent, pricingContent, ctaContent, freePlansSectionContent, planRequestContent, articlesSectionContent, articlesContent, cityCommunityContent, gritStoriesContent, testimonialsContent } from "../data/content";
import AnimatedSection from "./ui/animated-section";
import type { Language, Article } from "../data/content";

const Home = () => {
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const path = window.location.pathname;
  const language = path.startsWith('/es') ? 'es' : 'en';
  // Lógica para A/B testing - alternar entre variantes
  const [abVariant] = useState<'A' | 'B'>(() => {
    // Simular A/B testing - en producción usar analytics
    return Math.random() > 0.5 ? 'B' : 'A';
  });
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [leadMagnetModalOpen, setLeadMagnetModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ title: string; pdfUrl: string } | null>(null);
  const [selectedGritStory, setSelectedGritStory] = useState<any | null>(null);

  const communityRef = useRef<HTMLDivElement>(null);
  const gritSectionRef = useRef<HTMLDivElement>(null);
  const planRequestFormRef = useRef<HTMLDivElement>(null);
  const pricingSectionRef = useRef<HTMLDivElement>(null);

  // Initialize Andes Onboarding
  useAndesOnboarding();

  useEffect(() => {
    initGA();
    // Track A/B test view
    trackABTest(abVariant, language);
  }, [abVariant, language]);

  useEffect(() => {
    // Track social proof view when component mounts
    trackSocialProofView(language);
  }, [language]);

  useEffect(() => {
    // Track testimonial section view when component mounts
    trackTestimonialView(language);
  }, [language]);


  const scrollToRequestPlan = () => planRequestFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToPricing = () => {
    trackHeroCTR(abVariant, language, 'primary');
    pricingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToCommunity = () => {
    trackHeroCTR(abVariant, language, 'secondary');
    communityRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const closeArticleModal = () => {
    setActiveArticle(null);
    setIsArticleModalOpen(false);
  };

  const openGritStoryModal = (story: any) => {
    setSelectedGritStory(story);
  };

  const closeGritStoryModal = () => {
    setSelectedGritStory(null);
  };

  const handlePlanClick = (plan: any) => {
    const language = window.location.pathname.startsWith('/es') ? 'es' : 'en';
    const planTitle = typeof plan.title === 'string' ? plan.title : plan.title[language];
    
    if (plan.isLeadMagnet) {
      setSelectedPlan(plan);
      setLeadMagnetModalOpen(true);
      trackPlanDownload(planTitle);
    } else if (plan.pdfUrl && !plan.isUnderConstruction) {
      window.open(plan.pdfUrl, '_blank');
      trackPlanDownload(planTitle);
    }
  };

  const handleOpenArticleModal = (article: Article) => {
    setActiveArticle(article);
    trackArticleView(article.title[language]);
    setIsArticleModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow">
        <Suspense fallback={null}>
          <ArticleModal
            isOpen={isArticleModalOpen}
            onClose={closeArticleModal}
            article={activeArticle}
            language={language}
          />
        </Suspense>
        <SeoManager lang={language} />
        <HeroSection
          title={heroContent[language].title}
          subtitle={heroContent[language].subtitle}
          ctaPrimaryText={heroContent[language].ctaPrimaryText}
          ctaSecondaryText={heroContent[language].ctaSecondaryText}
          onPrimaryClick={scrollToPricing}
          onSecondaryClick={scrollToCommunity}
          videoSrc={heroContent[language].videoSrc}
          language={language}
          abVariant={abVariant}
        />



        <section id="benefits" className="py-16 md:py-24 bg-black text-gray-200">
          <div className="container mx-auto px-4">
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

        {/* Testimonios Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-black via-gray-950 to-black">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {testimonialsContent[language].sectionTitle}
              </h2>
              <p className="text-lg md:text-xl text-gray-400">
                {language === 'es' 
                  ? 'Descubre cómo Andes ha transformado las vidas de corredores como tú'
                  : 'Discover how Andes has transformed the lives of runners like you'
                }
              </p>
            </AnimatedSection>
            <AnimatedSection stagger>
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {testimonialsContent[language].testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-8 text-center transition-all duration-300 hover:border-[#25d366]/50 hover:bg-neutral-800/60 hover:shadow-[0_0_20px_rgba(37,211,102,0.1)] group">
                      {/* Avatar con gradiente mejorado */}
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#006b5b] to-[#25d366] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-xl">{testimonial.author.charAt(0)}</span>
                      </div>
                      {/* Quote con comillas decorativas */}
                      <div className="relative mb-6">
                        <svg className="w-8 h-8 text-[#25d366]/30 absolute -top-2 -left-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                        <blockquote className="text-gray-300 italic leading-relaxed text-lg relative z-10">
                          {testimonial.quote}
                        </blockquote>
                      </div>
                      {/* Autor y detalles */}
                      <div className="border-t border-neutral-700 pt-4">
                        <div className="text-[#25d366] font-semibold text-lg mb-1">{testimonial.author}</div>
                        <div className="text-gray-500 text-sm">{testimonial.detail}</div>
                      </div>
                      {/* Estrellas de rating */}
                      <div className="flex justify-center mt-4">
                        <span className="text-[#25d366] text-lg">★★★★★</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            
            {/* CTA adicional */}
            <AnimatedSection className="text-center mt-12">
              <p className="text-gray-400 mb-6">
                {language === 'es' 
                  ? '¿Listo para escribir tu propia historia de éxito?'
                  : 'Ready to write your own success story?'
                }
              </p>
              <button 
                onClick={() => {
                  trackTestimonialCTAClick(language, 'journey');
                  scrollToPricing();
                }}
                className="inline-flex items-center px-8 py-3 text-[#25d366] border border-[#25d366] rounded-lg hover:bg-[#25d366] hover:text-black transition-colors duration-200 font-medium"
              >
                {language === 'es' ? 'Comenzar mi viaje' : 'Start my journey'}
              </button>
            </AnimatedSection>
          </div>
        </section>

        <section>
          <Suspense fallback={<div className="text-center p-12">Cargando Historias de GRIT...</div>}>
            <GritSection ref={gritSectionRef} language={language} onStoryClick={openGritStoryModal} content={gritStoriesContent[language]} />
          </Suspense>
        </section>
        
        <section ref={pricingSectionRef}>
          <section ref={pricingSectionRef} className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-950 text-gray-100">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <Suspense fallback={<div className="text-center p-12">Cargando planes de precios...</div>}>
                <PricingSection
                  sectionTitle={pricingContent[language].sectionTitle}
                  sectionSubtitle={pricingContent[language].sectionSubtitle}
                  onGetFreePlanClick={scrollToRequestPlan}
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
        </section>

        <section id="training-plans" className="py-16 md:py-24 bg-gradient-to-b from-gray-950 to-black">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {freePlansSectionContent[language].title}
              </h2>
              <p className="text-lg md:text-xl text-gray-400">
                {freePlansSectionContent[language].sectionSubtitle}
              </p>
            </AnimatedSection>
            <AnimatedSection stagger>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {trainingPlans.filter(plan => plan.id !== '5k-plan').map((plan) => {
                  // Common props for both card types
                  const commonProps = {
                    title: plan.title,
                    description: plan.description,
                    duration: plan.duration,
                    difficulty: plan.difficulty
                  };
                  
                  return plan.isUnderConstruction ? (
                    <UnderConstructionPlanCard 
                      key={plan.id}
                      {...commonProps} 
                    />
                  ) : (
                    <TrainingPlanCard 
                      key={plan.id}
                      {...commonProps}
                      pdfUrl={plan.pdfUrl}
                      onDownloadClick={() => handlePlanClick(plan)}
                    />
                  );
                })}
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section ref={planRequestFormRef} id="request-plan" className="py-16 md:py-24 bg-black">
          <div className="container mx-auto px-4 text-center">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {planRequestContent[language].title}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
                {planRequestContent[language].subtitle}
              </p>
            </AnimatedSection>
            <Suspense fallback={<div className="text-center p-12">Cargando formulario...</div>}>
              <PlanRequestForm language={language} />
            </Suspense>
          </div>
        </section>


        <section id="articles" className="py-12 md:py-20 bg-black">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">{articlesSectionContent[language].title}</h2>
              <p className="text-center text-lg text-gray-400 max-w-3xl mx-auto mb-12">
                {articlesSectionContent[language].subtitle}
              </p>
            </AnimatedSection>
            <ArticleCarousel language={language}>
              {articlesContent.map((articleItem) => (
                <ArticleCard
                  key={articleItem.id}
                  language={language}
                  article={articleItem}
                  onClick={handleOpenArticleModal}
                />
              ))}
            </ArticleCarousel>
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
          />
        </Suspense>
      </section>

      <footer className="bg-black text-white py-8 text-center">
        <p>&copy; {new Date().getFullYear()} Andes Runners. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
