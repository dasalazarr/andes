import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaWhatsapp } from "react-icons/fa6";
import { MapPin, Footprints, MessageCircleHeart, Users, Check } from "lucide-react";
import { pamplonaContent } from "@/data/content";
import { startOnboarding, getTrackedSource, type OnboardingLanguage } from "@/lib/onboarding";
import { analytics } from "@/utils/analytics";
import AnimatedSection from "./AnimatedSection";

const valueIcons = [Footprints, MessageCircleHeart, Users];

const PamplonaPage: React.FC = () => {
  const { pathname } = useLocation();
  // La ciudad es ortogonal al idioma: /pamplona (en) · /es/pamplona (es).
  const language: OnboardingLanguage = pathname.startsWith("/es") ? "es" : "en";
  const content = pamplonaContent[language];
  const ambassadorsPath = language === "es" ? "/es/embajadores" : "/embajadores";
  const [isCtaLoading, setIsCtaLoading] = useState(false);

  const handleStart = async (placementLabel: string) => {
    if (isCtaLoading) return;
    setIsCtaLoading(true);

    analytics.trackCTAClick("primary", placementLabel, language);
    analytics.trackWhatsAppClick("cta", undefined, language);

    try {
      // Un QR de evento (?source=event:...) gana; si no, atribuimos a la ciudad.
      const source = getTrackedSource() ?? "city:pamplona";
      await startOnboarding({ intent: "free", language, placement: "hero", source });
    } catch (error) {
      console.error("Pamplona onboarding failed:", error);
    } finally {
      setIsCtaLoading(false);
    }
  };

  const ctaButton = (text: string, placementLabel: string) => (
    <button
      type="button"
      onClick={() => handleStart(placementLabel)}
      disabled={isCtaLoading}
      className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-whatsapp px-8 py-3 text-sm font-semibold text-black shadow-[0_10px_24px_rgba(52,211,153,0.35)] transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-70"
    >
      <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
      {isCtaLoading ? (language === "es" ? "Conectando con WhatsApp..." : "Connecting to WhatsApp...") : text}
    </button>
  );

  const heroImageAlt = language === "es" ? "Corredor al amanecer en Pamplona" : "Runner at sunrise in Pamplona";

  return (
    <div className="min-h-screen bg-surface text-white">
      <Helmet>
        <title>{content.seo.title}</title>
        <meta name="description" content={content.seo.description} />
        <meta property="og:title" content={content.seo.title} />
        <meta property="og:description" content={content.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://andesrc.com/pamplona" />
        <link rel="canonical" href={`https://andesrc.com${language === "es" ? "/es" : ""}/pamplona`} />
      </Helmet>

      {/* Hero: full-bleed photo with overlaid text, matching HeroSection.tsx's Ken Burns + scrim pattern */}
      <div className="relative min-h-[70vh] w-full overflow-hidden md:min-h-[85vh]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/club/hero.webp"
            alt={heroImageAlt}
            className="h-full w-full origin-center object-cover motion-safe:animate-ken-burns"
          />
          <div className="absolute inset-0 bg-surface/65" />
          {/* hero.webp es un amanecer brillante: oscurecimiento radial central para legibilidad del titular */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(9,13,12,0.6),transparent_72%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,107,91,0.3),transparent_55%)]" />
          <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-surface via-surface/85 to-transparent" />
        </div>

        <div className="absolute bottom-6 left-6 z-10">
          <div className="flex items-center gap-2 rounded-full glass-panel border-white/20 bg-neutral-900/60 px-4 py-2 backdrop-blur-md">
            <MapPin className="h-4 w-4 text-brand" />
            <span className="text-sm font-bold uppercase tracking-wide text-white">{content.hero.badge}</span>
          </div>
        </div>

        <div className="relative z-10 flex min-h-[70vh] items-center justify-center px-6 py-16 md:min-h-[85vh]">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">{content.hero.preheading}</p>
            <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-black leading-[1.05] text-white md:text-7xl">
              {content.hero.headlineLead} <span className="text-brand">{content.hero.headlineAccent}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-100 md:text-lg">
              {content.hero.description}
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              {ctaButton(content.hero.ctaText, "pamplona_hero")}
              <p className="text-xs text-gray-300">{content.hero.ctaNote}</p>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-16 sm:pt-20">
        {/* Stats */}
        <AnimatedSection>
          <div className="grid grid-cols-2 divide-y divide-white/10 rounded-[24px] border border-white/10 bg-white/[0.03] py-6 md:grid-cols-4 md:divide-x md:divide-y-0">
            {content.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 px-4 py-4 text-center">
                <span className="font-display text-4xl font-bold text-brand md:text-5xl">{stat.value}</span>
                <span className="text-xs text-gray-400 md:text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Valor casual-first */}
        <AnimatedSection className="mt-20 md:mt-28" stagger>
          <h2 className="text-center text-3xl font-bold md:text-4xl">{content.value.title}</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {content.value.items.map((item, index) => {
              const Icon = valueIcons[index] ?? Footprints;
              const isFeatured = index === 1;
              return (
                <article
                  key={item.title}
                  className={
                    isFeatured
                      ? "glass-card-premium rounded-[24px] p-6 md:p-7"
                      : "rounded-[24px] border border-white/10 bg-white/[0.03] p-6 md:p-7"
                  }
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand/40 bg-brand/15 text-brand">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-300">{item.description}</p>
                </article>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Cómo empiezas */}
        <AnimatedSection className="mt-20 md:mt-28">
          <h2 className="text-center text-3xl font-bold md:text-4xl">{content.howItWorks.title}</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {content.howItWorks.steps.map((step, index) => (
              <div key={step.title} className="flex items-start gap-4 rounded-[20px] border border-white/10 bg-white/[0.03] p-6">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand font-display text-sm font-semibold text-black">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* El club */}
        <AnimatedSection className="mt-20 md:mt-28">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
            <div className="overflow-hidden rounded-none">
              <img src="/images/club/quedada.webp" alt={content.club.imageAlt} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold md:text-4xl">{content.club.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-gray-300">{content.club.description}</p>
              <div className="mt-6">{ctaButton(content.hero.ctaText, "pamplona_club")}</div>
            </div>
          </div>
        </AnimatedSection>

        {/* Pricing EUR */}
        <AnimatedSection className="relative mt-20 overflow-hidden md:mt-28">
          <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-[-7rem] h-80 w-80 rounded-full bg-brand-deep/25 blur-3xl" />
          <div className="relative text-center">
            <h2 className="text-3xl font-bold md:text-4xl">{content.pricing.title}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-gray-300">{content.pricing.subtitle}</p>
          </div>
          <div className="relative mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-7">
              <h3 className="text-lg font-semibold">{content.pricing.freeTitle}</h3>
              <p className="mt-1 font-display text-4xl font-bold text-brand">€0</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">{content.pricing.freeDescription}</p>
            </article>
            <article className="glass-card-premium rounded-[24px] p-7">
              <h3 className="text-lg font-semibold">{content.pricing.premiumTitle}</h3>
              <p className="mt-1 font-display text-4xl font-bold text-brand">
                {content.pricing.premiumPrice}
                <span className="text-base font-normal text-gray-400">{content.pricing.premiumDetail}</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">{content.pricing.premiumDescription}</p>
            </article>
          </div>
          <p className="relative mt-5 flex items-center justify-center gap-2 text-center text-sm text-gray-400">
            <Check className="h-4 w-4 text-brand" aria-hidden="true" />
            {content.pricing.note}
          </p>
          <div className="relative mt-6 text-center">{ctaButton(content.pricing.ctaText, "pamplona_pricing")}</div>
        </AnimatedSection>

        {/* CTA a embajadores (audiencia distinta: liderar el club) */}
        <AnimatedSection className="mt-20 md:mt-28">
          <div className="flex flex-col items-center gap-3 rounded-[24px] border border-brand/25 bg-gradient-to-br from-brand-deep/25 via-surface-elevated to-surface-elevated p-8 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h3 className="text-xl font-semibold">{content.ambassadorCta.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-300">{content.ambassadorCta.description}</p>
            </div>
            <Link
              to={ambassadorsPath}
              className="shrink-0 text-sm font-semibold text-brand underline-offset-4 transition hover:underline"
            >
              {content.ambassadorCta.linkText}
            </Link>
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
        <AnimatedSection className="mt-20 text-center md:mt-32">
          <h2 className="mx-auto max-w-2xl text-4xl font-bold md:text-5xl">{content.finalCta.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-gray-300">{content.finalCta.subtitle}</p>
          <div className="mt-8 flex flex-col items-center gap-3">
            {ctaButton(content.finalCta.ctaText, "pamplona_footer")}
            <p className="text-xs text-gray-300">{content.finalCta.ctaNote}</p>
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
};

export default PamplonaPage;
