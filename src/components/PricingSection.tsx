import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Rocket, Zap, Check, ShieldCheck, Star } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { analytics } from "@/utils/analytics";

const iconComponents: { [key: string]: React.ElementType } = {
  Rocket,
  Zap,
};

interface Plan {
  name: string;
  iconName: string;
  price: string;
  priceDetail: string;
  annualPrice?: string;
  annualPriceDetail?: string;
  savingsPercentage?: string;
  description: string;
  features: (string | { text: string; tooltip: string })[];
  ctaText: string;
  ctaDisclaimer?: string;
  guarantee?: string;
  popularBadge?: string;
  buttonVariant?: "primary" | "secondary";
}

type BillingCycle = "monthly" | "annual";

interface ComparisonRow {
  feature: string;
  free: string;
  premium: string;
}

interface PricingSectionProps {
  sectionTitle: string;
  sectionSubtitle?: string;
  limitNote: string;
  comparisonRows: ComparisonRow[];
  plans: Plan[];
  onPlanClick?: (intent: "free" | "premium", placement: "pricing") => void | Promise<void>;
  language?: "en" | "es";
}

const PricingSection: React.FC<PricingSectionProps> = ({
  sectionTitle,
  sectionSubtitle,
  limitNote,
  comparisonRows,
  plans,
  onPlanClick,
  language: propLanguage,
}) => {
  const location = useLocation();
  const language = propLanguage || (location.pathname.startsWith("/es") ? "es" : "en");
  const [buttonStates, setButtonStates] = useState<{ free: "idle" | "loading"; premium: "idle" | "loading" }>({
    free: "idle",
    premium: "idle",
  });
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const sectionRef = useRef<HTMLElement>(null);

  const hasAnnualOption = plans.some((p) => p.annualPrice);

  const handleBillingToggle = (next: BillingCycle) => {
    if (next === billingCycle) return;
    setBillingCycle(next);
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "pricing_billing_toggle", {
        cycle: next,
        language,
        page_location: window.location.href,
      });
    }
  };

  const labels = {
    monthly: language === "es" ? "Mensual" : "Monthly",
    annual: language === "es" ? "Anual" : "Annual",
    billingAriaLabel: language === "es" ? "Ciclo de facturación" : "Billing cycle",
  };

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    if (typeof window === "undefined" || typeof window.IntersectionObserver === "undefined") {
      analytics.trackPricingView(language);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            analytics.trackPricingView(language);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [language]);

  const onStart = async (intent: "free" | "premium") => {
    setButtonStates((prev) => ({ ...prev, [intent]: "loading" }));

    try {
      if (onPlanClick) {
        await Promise.resolve(onPlanClick(intent, "pricing"));
      }
    } finally {
      setButtonStates((prev) => ({ ...prev, [intent]: "idle" }));
    }
  };

  return (
    <section ref={sectionRef}>
      <AnimatedSection className="text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">{sectionTitle}</h2>
        {sectionSubtitle ? <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-300 md:text-lg">{sectionSubtitle}</p> : null}
        <p className="mx-auto mt-4 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-medium text-white/85 md:text-sm">
          {limitNote}
        </p>

        {hasAnnualOption ? (
          <div className="mt-6 flex justify-center">
            <div
              role="group"
              aria-label={labels.billingAriaLabel}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1"
            >
              <button
                type="button"
                onClick={() => handleBillingToggle("monthly")}
                aria-pressed={billingCycle === "monthly"}
                className={`min-h-[36px] rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                  billingCycle === "monthly"
                    ? "bg-white text-black shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {labels.monthly}
              </button>
              <button
                type="button"
                onClick={() => handleBillingToggle("annual")}
                aria-pressed={billingCycle === "annual"}
                className={`inline-flex min-h-[36px] items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                  billingCycle === "annual"
                    ? "bg-whatsapp text-black shadow-[0_4px_12px_rgba(52,211,153,0.4)]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {labels.annual}
                {plans.find((p) => p.savingsPercentage)?.savingsPercentage ? (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      billingCycle === "annual" ? "bg-surface/15 text-black" : "bg-brand/20 text-brand"
                    }`}
                  >
                    {plans.find((p) => p.savingsPercentage)?.savingsPercentage}
                  </span>
                ) : null}
              </button>
            </div>
          </div>
        ) : null}
      </AnimatedSection>

      <AnimatedSection className="mt-6 grid grid-cols-1 items-stretch gap-4 md:mt-8 md:grid-cols-2 md:gap-6">
        {plans.map((plan) => {
          const IconComponent = iconComponents[plan.iconName];
          const isPremium = plan.buttonVariant === "primary";
          const intent = isPremium ? "premium" : "free";
          const isLoading = buttonStates[intent] === "loading";
          const showAnnual = billingCycle === "annual" && Boolean(plan.annualPrice);
          const displayPrice = showAnnual && plan.annualPrice ? plan.annualPrice : plan.price;
          const displayDetail = showAnnual && plan.annualPriceDetail ? plan.annualPriceDetail : plan.priceDetail;

          return (
            <article
              key={plan.name}
              className={`relative rounded-[28px] border p-5 backdrop-blur-xl transition-transform duration-200 md:p-7 ${
                isPremium
                  ? "glass-card-premium border-emerald-500/40 shadow-[0_0_60px_-15px_rgba(34,197,94,0.5)] md:scale-[1.02]"
                  : "glass-panel border-white/15"
              }`}
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${isPremium ? "bg-brand/15 text-brand" : "bg-white/10 text-white/80"}`}>
                    {isPremium ? "Pro" : language === "es" ? "Free" : "Free"}
                  </span>
                  {isPremium && plan.popularBadge ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-whatsapp px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-black">
                      <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                      {plan.popularBadge}
                    </span>
                  ) : null}
                </div>
                {IconComponent ? (
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full border ${isPremium ? "border-brand/40 bg-brand/15 text-brand" : "border-white/20 bg-white/10 text-white/90"}`}>
                    <IconComponent className="h-5 w-5" />
                  </span>
                ) : null}
              </div>

              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-4xl font-black text-white">{displayPrice}</span>
                {displayDetail ? <span className="text-sm text-gray-300">{displayDetail}</span> : null}
                {showAnnual && plan.savingsPercentage ? (
                  <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">
                    {plan.savingsPercentage}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-200">{plan.description}</p>

              <ul className="mt-5 space-y-2">
                {plan.features.map((feature) => {
                  const text = typeof feature === "string" ? feature : feature.text;
                  return (
                    <li key={text} className="flex items-start gap-2 text-sm text-gray-200">
                      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand/15 text-brand">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{text}</span>
                    </li>
                  );
                })}
              </ul>

              <button
                id={isPremium ? "start-premium-btn" : "start-free-btn"}
                type="button"
                data-intent={intent}
                data-language={language}
                className={`mt-6 min-h-[48px] w-full rounded-full px-6 py-3 text-sm font-semibold transition ${
                  isPremium
                    ? "bg-whatsapp text-black shadow-[0_10px_24px_rgba(52,211,153,0.35)] hover:brightness-110"
                    : "border border-white/20 bg-white/10 text-white hover:border-brand/50 hover:text-brand"
                }`}
                onClick={() => onStart(intent)}
                disabled={isLoading}
              >
                {isLoading
                  ? language === "es"
                    ? "Conectando con WhatsApp..."
                    : "Connecting to WhatsApp..."
                  : plan.ctaText}
              </button>

              {plan.ctaDisclaimer ? <p className="mt-3 text-center text-xs text-gray-400">{plan.ctaDisclaimer}</p> : null}

              {plan.guarantee ? (
                <p className="mt-2 flex items-start justify-center gap-1.5 text-center text-xs text-brand/90">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                  <span>{plan.guarantee}</span>
                </p>
              ) : null}
            </article>
          );
        })}
      </AnimatedSection>

      <AnimatedSection className="mt-6 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] md:mt-8">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-gray-300 md:px-6">
                {language === "es" ? "Comparativa" : "Comparison"}
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-gray-300 md:px-6">
                {language === "es" ? "Free" : "Free"}
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand md:px-6">
                Pro
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.feature} className="border-b border-white/5 last:border-b-0">
                <td className="px-4 py-3 text-sm text-gray-100 md:px-6">{row.feature}</td>
                <td className="px-4 py-3 text-sm text-gray-300 md:px-6">{row.free}</td>
                <td className="px-4 py-3 text-sm font-medium text-white md:px-6">{row.premium}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </AnimatedSection>

      <p className="mt-4 text-center text-sm text-gray-300">
        {language === "es" ? "Si no pagas, Andes sigue funcionando en modo Free/Lite." : "If you do not pay, Andes keeps working in Free/Lite mode."}
      </p>
    </section>
  );
};

export default PricingSection;
