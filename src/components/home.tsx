import React, { useState, lazy, Suspense, useEffect, useRef } from "react";
import { AnimatePresence } from 'framer-motion';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { initGA, trackArticleView, trackPlanDownload } from "../lib/analytics";
import { trackABTest, trackHeroCTR, trackSocialProofView } from "../lib/analytics";

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
import { trainingPlans, heroContent, benefitsContent, pricingContent, faqContent, ctaContent, freePlansSectionContent, planRequestContent, articlesSectionContent, articlesContent, cityCommunityContent, gritStoriesContent, testimonialsContent } from "../data/content";
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

  useEffect(() => {
    initGA();
    // Track A/B test view
    trackABTest(abVariant, language);
  }, [abVariant, language]);

  useEffect(() => {
    // Track social proof view when component mounts
    trackSocialProofView(language);
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



        <div className="fade-in-section">
          <Suspense fallback={<div className="text-center p-12">Cargando beneficios...</div>}>
            <BenefitsSection
              sectionTitle={benefitsContent[language].sectionTitle}
              sectionSubtitle={benefitsContent[language].sectionSubtitle}
              benefits={benefitsContent[language].benefits}
            />
          </Suspense>
        </div>

        {/* Testimonios Section */}
        <div className="fade-in-section py-16 md:py-24 bg-gradient-to-b from-black to-gray-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {testimonialsContent[language].sectionTitle}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonialsContent[language].testimonials.map((testimonial, index) => (
                <div key={index} className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 text-center transition-all duration-300 hover:border-[#25d366]/50 hover:bg-neutral-800/60">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#006b5b] to-[#25d366] flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{testimonial.author.charAt(0)}</span>
                  </div>
                  <blockquote className="text-gray-300 mb-4 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-[#25d366] font-semibold">{testimonial.author}</div>
                  <div className="text-gray-500 text-sm">{testimonial.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="fade-in-section">
          <Suspense fallback={<div className="text-center p-12">Cargando Historias de GRIT...</div>}>
            <GritSection ref={gritSectionRef} language={language} onStoryClick={openGritStoryModal} content={gritStoriesContent[language]} />
          </Suspense>
        </div>
        
        <div className="fade-in-section" ref={pricingSectionRef}>
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
        </div>

        <section id="training-plans" className="py-16 md:py-24 bg-gradient-to-b from-gray-950 to-black fade-in-section">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {freePlansSectionContent[language].title}
              </h2>
              <p className="text-lg md:text-xl text-gray-400">
                {freePlansSectionContent[language].sectionSubtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {trainingPlans.filter(plan => plan.id !== '5k-plan').map((plan) => {
                // For both card types, we'll pass the full i18n object and let the card component handle the language
                const cardProps = {
                  key: plan.id,
                  title: plan.title,
                  description: plan.description,
                  duration: plan.duration,
                  difficulty: plan.difficulty,
                  ...(!plan.isUnderConstruction && {
                    pdfUrl: plan.pdfUrl,
                    onDownloadClick: () => handlePlanClick(plan)
                  })
                };
                
                return plan.isUnderConstruction ? (
                  <UnderConstructionPlanCard {...cardProps} />
                ) : (
                  <TrainingPlanCard {...cardProps} />
                );
              })}
            </div>
          </div>
        </section>

        <section ref={planRequestFormRef} id="request-plan" className="py-16 md:py-24 bg-black fade-in-section">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {planRequestContent[language].title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              {planRequestContent[language].subtitle}
            </p>
            <Suspense fallback={<div className="text-center p-12">Cargando formulario...</div>}>
              <PlanRequestForm language={language} />
            </Suspense>
          </div>
        </section>


        <section id="articles" className="py-12 md:py-20 bg-black fade-in-section">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">{articlesSectionContent[language].title}</h2>
            <p className="text-center text-lg text-gray-400 max-w-3xl mx-auto mb-12">
              {articlesSectionContent[language].subtitle}
            </p>
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

      <div className="fade-in-section">
        <Suspense fallback={<div className="text-center p-12">Cargando ciudades...</div>}>
          <CityCommunitySection
            sectionTitle={cityCommunityContent[language].sectionTitle}
            sectionSubtitle={cityCommunityContent[language].sectionSubtitle}
            cities={cityCommunityContent[language].cities}
          />
        </Suspense>
      </div>

      <footer className="bg-black text-white py-8 text-center">
        <p>&copy; {new Date().getFullYear()} Andes Runners. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
