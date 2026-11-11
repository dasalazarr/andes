import React from "react";
import { CalendarCheck, ListChecks, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import AnimatedSection from "./AnimatedSection";

const iconComponents: Record<string, React.ElementType> = {
  WhatsApp: FaWhatsapp,
  ListChecks,
  CalendarCheck,
  MessageCircle,
};

interface Step {
  iconName: string;
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  steps: Step[];
  language?: "es" | "en";
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ sectionTitle, sectionSubtitle, steps, language = "es" }) => {
  const stepLabel = language === "en" ? "Step" : "Paso";

  return (
    <section id="how-it-works" className="bg-surface py-14 md:py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <AnimatedSection className="mb-10 text-center md:mb-14">
          <h2 className="text-3xl font-bold text-white md:text-4xl">{sectionTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-400 md:text-lg">{sectionSubtitle}</p>
        </AnimatedSection>

        <AnimatedSection>
          <ol className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8">
            {steps.map((step, index) => {
              const Icon = iconComponents[step.iconName] || MessageCircle;
              const isLast = index === steps.length - 1;
              return (
                <li key={step.title} className="group relative flex flex-col items-center text-center">
                  {/* Conector punteado entre iconos (desktop), sin atravesarlos */}
                  {!isLast ? (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-[calc(50%+44px)] right-[calc(-50%+44px)] top-7 hidden border-t border-dashed border-brand/30 md:block"
                    />
                  ) : null}

                  <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 text-brand ring-1 ring-brand/25 transition-all duration-300 group-hover:bg-brand/20 group-hover:ring-brand/50 group-hover:shadow-[0_0_24px_rgba(52,211,153,0.2)]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>

                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                    {stepLabel} {index + 1}
                  </p>
                  <h3 className="mt-1.5 text-lg font-bold text-white md:text-xl">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-400 md:text-base">{step.description}</p>
                </li>
              );
            })}
          </ol>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HowItWorksSection;
