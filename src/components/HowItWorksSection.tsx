import React from "react";
import { MessageCircle, ClipboardList, Zap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const iconComponents: Record<string, React.ElementType> = {
  MessageCircle,
  ClipboardList,
  Zap,
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
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  sectionTitle,
  sectionSubtitle,
  steps,
}) => {
  return (
    <section id="how-it-works" className="bg-surface py-14 md:py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <AnimatedSection className="mb-10 text-center md:mb-14">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {sectionTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-400 md:text-lg">
            {sectionSubtitle}
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {/* Connector line (desktop only) */}
            <div
              className="pointer-events-none absolute left-0 right-0 top-14 hidden h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent md:block"
              aria-hidden="true"
            />

            {steps.map((step, index) => {
              const Icon = iconComponents[step.iconName] || MessageCircle;
              return (
                <article
                  key={step.title}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* Step number + icon */}
                  <div className="relative mb-5">
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-whatsapp text-xs font-bold text-black">
                      {index + 1}
                    </span>
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-brand/30 bg-brand/10 text-brand transition-all duration-300 group-hover:border-brand/60 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.15)]">
                      <Icon className="h-6 w-6" />
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400 md:text-base">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HowItWorksSection;
