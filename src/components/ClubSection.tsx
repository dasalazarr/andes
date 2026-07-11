import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa6";
import { Coffee, HeartHandshake, MessageCircle } from "lucide-react";
import AnimatedSection from "./ui/animated-section";
import { clubContent } from "@/data/content";

const featureIcons = [Coffee, HeartHandshake, MessageCircle];

interface ClubSectionProps {
  language: "es" | "en";
  onJoinClick: () => void | Promise<void>;
  isLoading?: boolean;
}

const ClubSection: React.FC<ClubSectionProps> = ({ language, onJoinClick, isLoading = false }) => {
  const content = clubContent[language];
  const ambassadorsPath = language === "es" ? "/es/embajadores" : "/embajadores";

  return (
    <div className="container mx-auto px-4">
      <AnimatedSection className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative order-2 md:order-1">
          <div className="overflow-hidden rounded-[32px]">
            <img
              src={content.image.src}
              alt={content.image.alt}
              className="h-full w-full object-cover"
              width={1100}
              height={733}
              loading="lazy"
            />
          </div>
          <div
            className="pointer-events-none absolute -bottom-6 -left-6 -z-10 h-40 w-40 rounded-full bg-brand-deep/40 blur-3xl"
            aria-hidden="true"
          ></div>
        </div>

        <div className="order-1 md:order-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand sm:text-xs">
            {content.preheading}
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-cream md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-300">{content.description}</p>

          <ul className="mt-7 space-y-4">
            {content.features.map((feature, index) => {
              const Icon = featureIcons[index] ?? Coffee;
              return (
                <li key={feature.title} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-cream">{feature.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-gray-400">{feature.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-col items-start gap-4">
            <button
              type="button"
              onClick={onJoinClick}
              disabled={isLoading}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-70"
            >
              <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
              {isLoading ? (language === "es" ? "Conectando..." : "Connecting...") : content.ctaText}
            </button>
            <Link
              to={ambassadorsPath}
              className="text-sm font-medium text-brand underline-offset-4 transition hover:underline"
            >
              {content.ambassadorLinkText}
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ClubSection;
