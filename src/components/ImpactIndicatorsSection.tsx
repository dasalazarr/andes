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

interface ImpactIndicatorsSectionProps {
  stats: IndicatorStat[];
}

const AnimatedStat: React.FC<{ stat: IndicatorStat }> = ({ stat }) => {
  // Extract numeric value and suffix (like "+" or a unit word), preserving spacing
  const valueStr = stat.value || '';
  const numericMatch = valueStr.match(/^(\d+(?:[,.]\d+)?)(\s*)(.*)$/);
  const numericValue = numericMatch ? parseFloat(numericMatch[1].replace(/[,.]/g, '')) : 0;
  const suffix = numericMatch ? numericMatch[2] + numericMatch[3] : '';

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
    <div ref={ref} className="px-4 py-6 text-center md:px-8 md:py-8">
      <dt className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
        {formattedCount}{shouldHideUnit ? '' : suffix}
      </dt>
      <dd className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-gray-400 sm:text-sm">
        {stat.label}
      </dd>
    </div>
  );
};
// Fila de cifras bajo "Tu primera semana". La narrativa de prevención vive en el miércoles de WeekStorySection.
const ImpactIndicatorsSection: React.FC<ImpactIndicatorsSectionProps> = ({ stats }) => {
  return (
    <AnimatedSection className="mx-auto max-w-6xl px-4">
      <div className="glass-panel overflow-hidden rounded-3xl">
        <dl className="grid grid-cols-2 divide-white/10 md:grid-cols-4 md:divide-x">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} stat={stat} />
          ))}
        </dl>
      </div>
    </AnimatedSection>
  );
};

export default ImpactIndicatorsSection;
