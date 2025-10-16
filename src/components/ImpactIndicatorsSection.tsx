import React from "react";
import AnimatedSection from "./AnimatedSection";
import { useAnimatedCounter } from "../hooks/useAnimatedCounter";

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
  image,
  stats,
}) => {
  return (
    <AnimatedSection className="mx-auto max-w-6xl px-4">
      <section className="overflow-hidden">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.25fr)_1fr] md:items-center mb-20">
          <div className="px-8 py-10 md:px-12">
            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#27e97c]/80">
              {preheading}
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">
              {title}
            </h2>
            <p className="mt-5 text-lg text-gray-300 md:text-xl">
              {highlight}
            </p>
          </div>
          <div className="relative h-full min-h-[260px] overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              className="h-[350px] w-full object-cover md:rounded-[16px]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" />
          </div>
        </div>
        <div>
          <dl className="grid grid-cols-1 divide-y divide-black/10 md:grid-cols-4 md:divide-x md:divide-y-0">
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
