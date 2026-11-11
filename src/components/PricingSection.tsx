import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  BellRing,
  Brain,
  CalendarCheck,
  Check,
  ChevronDown,
  Flag,
  Footprints,
  Gift,
  HeartPulse,
  Infinity as InfinityIcon,
  Medal,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { analytics } from "@/utils/analytics";

const featureIcons: Record<string, React.ElementType> = {
  BellRing,
  Brain,
  CalendarCheck,
  Check,
  Flag,
  Footprints,
  Gift,
  HeartPulse,
  Infinity: InfinityIcon,
  Medal,
  MessageCircle,
};

// "€9,99" → { currency: "€", amount: "9,99" }; "Gratis"/"Free" → €0
const splitPrice = (price: string) => {
  const match = price.match(/^([^\d\s]*)\s*([\d.,]+)$/);
  return match ? { currency: match[1] || "€", amount: match[2] } : { currency: "€", amount: "0" };
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
  headline?: string;
  tagline?: string;
  features: (string | { text: string; tooltip?: string; icon?: string })[];
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
  const [compareOpen, setCompareOpen] = useState(false);
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

      <AnimatedSection className="mt-6 grid grid-cols-1 items-stretch gap-4 md:mt-8 md:grid-cols-2 md:gap-5">
        {plans.map((plan) => {
          const isPremium = plan.buttonVariant === "primary";
          const intent = isPremium ? "premium" : "free";
          const isLoading = buttonStates[intent] === "loading";
          const showAnnual = billingCycle === "annual" && Boolean(plan.annualPrice);
          const displayPrice = showAnnual && plan.annualPrice ? plan.annualPrice : plan.price;
          const displayDetail = showAnnual && plan.annualPriceDetail ? plan.annualPriceDetail : plan.priceDetail;
          const { currency, amount } = splitPrice(displayPrice);
          const struck = showAnnual ? splitPrice(plan.price).amount : null;
          const perMonth = displayDetail || (language === "es" ? "/mes" : "/month");

          return (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-[28px] border p-6 md:p-8 ${
                isPremium
                  ? "border-brand/40 bg-gradient-to-br from-brand-deep/45 via-surface-elevated to-surface-elevated shadow-[0_0_60px_-20px_rgba(52,211,153,0.45)]"
                  : "border-white/15 bg-white/[0.03]"
              }`}
            >
              {/* Eyebrow + badge */}
              <div className="flex min-h-[32px] items-center justify-between gap-3">
                <span className="text-base font-semibold text-white">{isPremium ? "Pro" : "Free"}</span>
                {isPremium && plan.popularBadge ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">
                    <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                    {plan.popularBadge}
                  </span>
                ) : null}
              </div>

              {/* Titular + subtítulo */}
              <h3 className="mt-4 text-2xl font-semibold text-white md:text-[28px]">{plan.headline ?? plan.name}</h3>
              <p className="mt-1.5 text-[15px] text-gray-300">{plan.tagline ?? plan.description}</p>

              {/* CTA arriba */}
              <button
                id={isPremium ? "start-premium-btn" : "start-free-btn"}
                type="button"
                data-intent={intent}
                data-language={language}
                className={`mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-70 ${
                  isPremium
                    ? "bg-whatsapp text-black shadow-[0_10px_24px_rgba(52,211,153,0.3)] hover:brightness-110"
                    : "border border-white/25 text-white hover:border-white/50 hover:bg-white/[0.04]"
                }`}
                onClick={() => onStart(intent)}
                disabled={isLoading}
              >
                {isPremium && !isLoading ? <Sparkles className="h-4 w-4" aria-hidden="true" /> : null}
                {isLoading
                  ? language === "es"
                    ? "Conectando con WhatsApp..."
                    : "Connecting to WhatsApp..."
                  : plan.ctaText}
              </button>

              {/* Precio */}
              <div className="mt-6 flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-white" aria-live="polite">
                {struck ? (
                  <span className="mr-1 text-2xl text-gray-500 line-through decoration-1">
                    <sup className="text-xs">{currency}</sup>
                    {struck}
                  </span>
                ) : null}
                <span className="text-4xl font-semibold tracking-tight">
                  <sup className="mr-0.5 align-super text-base font-normal text-gray-300">{currency}</sup>
                  {amount}
                </span>
                <span className="text-sm text-gray-400">{perMonth}</span>
                {showAnnual && plan.savingsPercentage ? (
                  <span className="ml-1 rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">
                    {plan.savingsPercentage}
                  </span>
                ) : null}
              </div>

              {/* Funciones con icono propio */}
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => {
                  const text = typeof feature === "string" ? feature : feature.text;
                  const iconName = typeof feature === "string" ? undefined : feature.icon;
                  const Icon = (iconName && featureIcons[iconName]) || Check;
                  return (
                    <li key={text} className="flex items-start gap-3 text-[15px] text-gray-200">
                      <Icon className={`mt-0.5 h-[18px] w-[18px] flex-shrink-0 ${isPremium ? "text-brand" : "text-gray-400"}`} aria-hidden="true" />
                      <span>{text}</span>
                    </li>
                  );
                })}
              </ul>

              {/* Letra pequeña al pie */}
              <div className="mt-auto space-y-1 pt-8 text-xs leading-relaxed text-gray-400">
                {plan.ctaDisclaimer ? <p>{plan.ctaDisclaimer}</p> : null}
                {plan.guarantee ? (
                  <p className="flex items-start gap-1.5 text-brand/90">
                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                    <span>{plan.guarantee}</span>
                  </p>
                ) : null}
              </div>
            </article>
          );
        })}
      </AnimatedSection>

      <p className="mt-5 text-center text-sm text-gray-400">
        {language === "es" ? "Si no pagas, Andes sigue funcionando en modo Free/Lite." : "If you do not pay, Andes keeps working in Free/Lite mode."}
      </p>

      <Collapsible open={compareOpen} onOpenChange={setCompareOpen} className="mt-4">
        <div className="text-center">
          <CollapsibleTrigger className="inline-flex items-center gap-1 text-sm font-medium text-white underline decoration-dotted underline-offset-4 hover:text-brand">
            {compareOpen
              ? language === "es" ? "Ocultar comparativa" : "Hide comparison"
              : language === "es" ? "Ver comparativa completa" : "See full comparison"}
            <ChevronDown className={`h-4 w-4 transition-transform ${compareOpen ? "rotate-180" : ""}`} aria-hidden="true" />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-5 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03]">
          <table className="w-full table-fixed border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-gray-300 md:px-6">
                  {language === "es" ? "Comparativa" : "Comparison"}
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-gray-300 md:px-6">Free</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand md:px-6">Pro</th>
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
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
};

export default PricingSection;
