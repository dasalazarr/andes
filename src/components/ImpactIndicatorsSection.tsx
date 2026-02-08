import React from "react";
import AnimatedSection from "./AnimatedSection";
import { useAnimatedCounter } from "../hooks/useAnimatedCounter";
import { ShieldCheck } from "lucide-react";

interface IndicatorStat {
  value: string;
  label: string;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  locale?: string;
}

interface IndicatorImage {
  src: string;
  alt: string;
}

interface ImpactIndicatorsSectionProps {
  preheading: string;
  title: string;
  highlight: string;
  pillars: string[];
  image: IndicatorImage;
  stats: IndicatorStat[];
}

const AnimatedStat: React.FC<{ stat: IndicatorStat }> = ({ stat }) => {
  // Extract numeric value and suffix (like "+")
  const valueStr = stat.value || '';
  const numericMatch = valueStr.match(/^(\d+(?:[,.]\d+)?)\s*(.*)$/);
  const numericValue = numericMatch ? parseFloat(numericMatch[1].replace(/[,.]/g, '')) : 0;
  const suffix = numericMatch ? numericMatch[2] : '';

  // Hide units for distance indicators
  const shouldHideUnit = ['mi', 'km'].includes(suffix.toLowerCase());

  const { formattedCount, ref } = useAnimatedCounter({
    target: numericValue,
    prefix: stat.prefix,
    suffix: '',
    decimals: stat.decimals,
    locale: stat.locale,
  });

  return (
    <div ref={ref} className="px-8 py-6 text-center md:py-8">
      <dt className="text-3xl font-semibold text-white md:text-4xl">
        {formattedCount}{shouldHideUnit ? '' : suffix}
      </dt>
      <dd className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
        {stat.label}
      </dd>
    </div>
  );
};
const ImpactIndicatorsSection: React.FC<ImpactIndicatorsSectionProps> = ({
  preheading,
  title,
  highlight,
  pillars,
  image,
  stats,
}) => {
  return (
    <AnimatedSection className="mx-auto max-w-6xl px-4">
      <section className="overflow-hidden">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.25fr)_1fr] md:items-center">
          <div className="glass-panel rounded-[28px] px-5 py-6 sm:px-7 sm:py-8 md:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#27e97c]/90 md:text-sm">
              {preheading}
            </span>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg">
              {highlight}
            </p>

            <ul className="mt-5 space-y-3">
              {pillars.map((pillar) => (
                <li key={pillar} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#27e97c]/15 text-[#27e97c]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-gray-200 sm:text-base">{pillar}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-full min-h-[260px] overflow-hidden rounded-[28px] border border-white/10">
            <img
              src={image.src}
              alt={image.alt}
              className="h-[300px] w-full object-cover sm:h-[350px]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-black/20 to-transparent" />
          </div>
        </div>
        <div className="glass-panel mt-6 overflow-hidden rounded-3xl">
          <dl className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-4 md:divide-x md:divide-y-0">
            {stats.map((stat) => (
              <AnimatedStat key={stat.label} stat={stat} />
            ))}
          </dl>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default ImpactIndicatorsSection;
