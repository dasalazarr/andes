import React, { useState, lazy, Suspense, useEffect, useRef } from "react";
import { AnimatePresence } from 'framer-motion';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { initGA, trackArticleView, trackPlanDownload } from "../lib/analytics";

gsap.registerPlugin(ScrollTrigger);

// Component Imports
import HeroSection from "./HeroSection";
import ArticleCard from "./ArticleCard";
import TrainingPlanCard from "./TrainingPlanCard";
import UnderConstructionPlanCard from "./UnderConstructionPlanCard";
import ArticleCarousel from "./ArticleCarousel";

// Lazy Loaded Components
const PlanRequestForm = lazy(() => import("./PlanRequestForm"));
const GritSection = lazy(() => import("./grit/GritSection"));
const GritStoryModal = lazy(() => import("./grit/GritStoryModal"));
const LeadMagnetModal = lazy(() => import("./LeadMagnetModal"));
const BenefitsSection = lazy(() => import("./BenefitsSection"));
const PricingSection = lazy(() => import("./PricingSection"));
const FAQSection = lazy(() => import("./FAQSection"));
const CityCommunitySection = lazy(() => import("./CityCommunitySection"));
const SeoManager = lazy(() => import("./SeoManager"));
const ArticleModal = lazy(() => import('./ArticleModal'));
const ChatDemo = lazy(() => import("./ChatDemo"));

import { trainingPlans, heroContent, benefitsContent, pricingContent, faqContent, ctaContent, freePlansSectionContent, communityContent, planRequestContent, articlesSectionContent, articlesContent, cityCommunityContent, gritStoriesContent } from "../data/content";
import type { Language, Article } from "../data/content";

const Home = () => {
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const path = window.location.pathname;
  const language = path.startsWith('/es') ? 'es' : 'en';
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [leadMagnetModalOpen, setLeadMagnetModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ title: string; pdfUrl: string } | null>(null);
  const [selectedGritStory, setSelectedGritStory] = useState<any | null>(null);

  const communityRef = useRef<HTMLDivElement>(null);
  const gritSectionRef = useRef<HTMLDivElement>(null);
  const planRequestFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGA();
  }, []);



  const scrollToRequestPlan = () => planRequestFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToCommunity = () => communityRef.current?.scrollIntoView({ behavior: 'smooth' });

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
    if (plan.isLeadMagnet) {
      setSelectedPlan(plan);
      setLeadMagnetModalOpen(true);
      trackPlanDownload(plan.title);
    } else if (plan.pdfUrl && !plan.isUnderConstruction) {
      window.open(plan.pdfUrl, '_blank');
      trackPlanDownload(plan.title);
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
          onPrimaryClick={scrollToRequestPlan}
          onSecondaryClick={scrollToCommunity}
          videoSrc={heroContent[language].videoSrc}
        />

        <div className="fade-in-section">
          <Suspense fallback={<div className="text-center p-12">Cargando demo...</div>}>
            <ChatDemo language={language} />
          </Suspense>
        </div>

        <div className="fade-in-section">
          <Suspense fallback={<div className="text-center p-12">Cargando beneficios...</div>}>
            <BenefitsSection
              sectionTitle={benefitsContent[language].sectionTitle}
              sectionSubtitle={benefitsContent[language].sectionSubtitle}
              benefits={benefitsContent[language].benefits}
            />
          </Suspense>
        </div>

        <div className="fade-in-section">
          <Suspense fallback={<div className="text-center p-12">Cargando Historias de GRIT...</div>}>
            <GritSection ref={gritSectionRef} language={language} onStoryClick={openGritStoryModal} content={gritStoriesContent[language]} />
          </Suspense>
        </div>
        
        <div className="fade-in-section">
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
              {trainingPlans.filter(plan => plan.id !== '5k-plan').map((plan) =>
                plan.isUnderConstruction ? (
                  <UnderConstructionPlanCard
                    key={plan.id}
                    title={plan.title}
                    description={plan.description}
                    duration={plan.duration}
                    difficulty={plan.difficulty}
                  />
                ) : (
                  <TrainingPlanCard
                    key={plan.id}
                    title={plan.title}
                    description={plan.description}
                    duration={plan.duration}
                    difficulty={plan.difficulty}
                    pdfUrl={plan.pdfUrl}
                    onDownloadClick={() => handlePlanClick(plan)}
                  />
                )
              )}
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

        <section id="community" ref={communityRef} className="py-12 md:py-20 bg-white fade-in-section">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'en' ? 'Join Our Community' : 'Únete a Nuestra Comunidad'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              {language === 'en' 
                ? 'Connect with other runners, share experiences, and receive support.'
                : 'Conecta con otros corredores, comparte experiencias y recibe apoyo.'}
            </p>
            <Button onClick={() => window.open('https://chat.whatsapp.com/Bzhqdte40aNB5LA1ViFqDl', '_blank')} size="lg">
              {language === 'en' ? 'Join WhatsApp Group' : 'Unirse al Grupo de WhatsApp'} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        <div className="fade-in-section">
          <Suspense fallback={<div className="text-center p-12">Cargando preguntas frecuentes...</div>}>
            <FAQSection
              sectionTitle={faqContent[language].sectionTitle}
              sectionSubtitle={faqContent[language].sectionSubtitle}
              faqs={faqContent[language].faqs}
            />
          </Suspense>
        </div>


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
