import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Rocket, Zap, Check } from "lucide-react";
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
  description: string;
  features: (string | { text: string; tooltip: string })[];
  ctaText: string;
  ctaDisclaimer?: string;
  buttonVariant?: "primary" | "secondary";
}

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
  const sectionRef = useRef<HTMLElement>(null);

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
      </AnimatedSection>

      <AnimatedSection className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-6">
        {plans.map((plan) => {
          const IconComponent = iconComponents[plan.iconName];
          const isPremium = plan.buttonVariant === "primary";
          const intent = isPremium ? "premium" : "free";
          const isLoading = buttonStates[intent] === "loading";

          return (
            <article
              key={plan.name}
              className={`rounded-[28px] border p-5 backdrop-blur-xl md:p-7 ${
                isPremium
                  ? "glass-card-premium border-[#27e97c]/30 shadow-[0_0_30px_rgba(39,233,124,0.16)]"
                  : "glass-panel border-white/15"
              }`}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${isPremium ? "bg-[#27e97c]/15 text-[#27e97c]" : "bg-white/10 text-white/80"}`}>
                  {isPremium ? "Premium" : language === "es" ? "Free" : "Free"}
                </span>
                {IconComponent ? (
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full border ${isPremium ? "border-[#27e97c]/40 bg-[#27e97c]/15 text-[#27e97c]" : "border-white/20 bg-white/10 text-white/90"}`}>
                    <IconComponent className="h-5 w-5" />
                  </span>
                ) : null}
              </div>

              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                {plan.priceDetail ? <span className="text-sm text-gray-300">{plan.priceDetail}</span> : null}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-200">{plan.description}</p>

              <ul className="mt-5 space-y-2">
                {plan.features.map((feature) => {
                  const text = typeof feature === "string" ? feature : feature.text;
                  return (
                    <li key={text} className="flex items-start gap-2 text-sm text-gray-200">
                      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#27e97c]/15 text-[#27e97c]">
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
                    ? "bg-[#27e97c] text-black shadow-[0_10px_24px_rgba(39,233,124,0.35)] hover:bg-[#1fc869]"
                    : "border border-white/20 bg-white/10 text-white hover:border-[#27e97c]/50 hover:text-[#27e97c]"
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
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#27e97c] md:px-6">
                Premium
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
