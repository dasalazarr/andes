import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import AnimatedSection from "./AnimatedSection";
import { cn } from "@/lib/utils";
import type { WeekDay } from "@/data/content";

interface WeekStorySectionProps {
  language: "es" | "en";
  preheading: string;
  sectionTitle: string;
  sectionSubtitle: string;
  clubBadge: string;
  clubCta: string;
  days: WeekDay[];
  onJoinClick: () => void | Promise<void>;
  isLoading?: boolean;
}

const videoBase = (id: string, language: "es" | "en") => `/videos/week/${id}-${language}`;

// Clip pre-renderizado en Remotion (andes-launch-video → npm run render:landing).
// Solo se reproduce mientras `playing`; con reduced-motion se queda en el poster.
const DayVideo: React.FC<{
  id: string;
  language: "es" | "en";
  alt: string;
  playing: boolean;
  className?: string;
}> = ({ id, language, alt, playing, className }) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const base = videoBase(id, language);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    try {
      if (playing) {
        void video.play()?.catch(() => undefined);
      } else {
        video.pause();
      }
    } catch {
      // jsdom / navegadores sin soporte de media: nos quedamos con el poster
    }
  }, [playing, base]);

  if (prefersReducedMotion) {
    return <img src={`${base}.jpg`} alt={alt} className={className} loading="lazy" width={720} height={900} />;
  }

  return (
    <video
      // key: <video> no recarga al cambiar <source>; el idioma puede resolverse después del montaje
      key={base}
      ref={ref}
      className={className}
      poster={`${base}.jpg`}
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt}
      width={720}
      height={900}
    >
      <source src={`${base}.mp4`} type="video/mp4" />
    </video>
  );
};

const frameClass = "aspect-[4/5] w-full rounded-[28px] border border-white/10 bg-surface object-cover shadow-[0_25px_60px_rgba(0,0,0,0.5)]";

const DayStep: React.FC<{
  day: WeekDay;
  index: number;
  active: boolean;
  onActive: (index: number) => void;
  props: WeekStorySectionProps;
}> = ({ day, index, active, onActive, props }) => {
  const stepRef = useRef<HTMLLIElement>(null);
  // Desktop: el paso cuyo centro cruza la mitad del viewport gana el video sticky
  const centered = useInView(stepRef, { margin: "-45% 0px -45% 0px" });
  // Móvil: cada tarjeta reproduce su propio clip mientras se ve
  const mobileRef = useRef<HTMLDivElement>(null);
  const mobileVisible = useInView(mobileRef, { amount: 0.5 });

  useEffect(() => {
    if (centered) onActive(index);
  }, [centered, index, onActive]);

  return (
    <li
      ref={stepRef}
      className={cn(
        "rounded-[28px] border p-5 transition-colors duration-500 sm:p-6 md:flex md:min-h-[70vh] md:flex-col md:justify-center md:border-transparent md:bg-transparent md:p-0",
        day.isClub ? "border-brand/40 bg-brand/[0.06]" : "border-white/10 bg-white/[0.02]",
      )}
    >
      <div className={cn("transition-opacity duration-500", active ? "md:opacity-100" : "md:opacity-35")}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-brand/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
            {day.day}
          </span>
          {day.isClub ? (
            <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-black">
              {props.clubBadge}
            </span>
          ) : (
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">{day.attribute}</span>
          )}
        </div>
        <h3 className={cn("mt-4 font-display font-medium leading-tight text-cream", day.isClub ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl")}>
          {day.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-300 md:text-base">{day.body}</p>

        {day.isClub ? (
          <button
            type="button"
            onClick={props.onJoinClick}
            disabled={props.isLoading}
            className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-70"
          >
            <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
            {props.isLoading ? (props.language === "es" ? "Conectando..." : "Connecting...") : props.clubCta}
          </button>
        ) : null}
      </div>

      <div ref={mobileRef} className="mt-5 md:hidden">
        <DayVideo id={day.id} language={props.language} alt={day.videoAlt} playing={mobileVisible} className={frameClass} />
      </div>
    </li>
  );
};

const WeekStorySection: React.FC<WeekStorySectionProps> = (props) => {
  const { language, preheading, sectionTitle, sectionSubtitle, days } = props;
  const [active, setActive] = useState(0);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stickyVisible = useInView(stickyRef, { amount: 0.3 });

  return (
    <div className="relative overflow-x-clip bg-surface py-16 md:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 right-[-8rem] h-96 w-96 rounded-full bg-brand-deep/30 blur-3xl" />
      <div className="container relative mx-auto max-w-6xl px-4">
        <AnimatedSection className="mx-auto mb-10 max-w-2xl text-center md:mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand sm:text-xs">{preheading}</p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-cream md:text-5xl">{sectionTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-400 md:text-lg">{sectionSubtitle}</p>
        </AnimatedSection>

        <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
          {/* Desktop: video sticky que sigue al paso activo */}
          <div className="hidden md:block">
            <div ref={stickyRef} className="sticky top-[12vh]">
              <div className="relative mx-auto max-w-[440px]">
                {days.map((day, index) => (
                  <div
                    key={day.id}
                    className={cn(
                      "transition-opacity duration-500",
                      index === 0 ? "relative" : "absolute inset-0",
                      index === active ? "opacity-100" : "pointer-events-none opacity-0",
                    )}
                    aria-hidden={index !== active}
                  >
                    <DayVideo
                      id={day.id}
                      language={language}
                      alt={day.videoAlt}
                      playing={stickyVisible && index === active}
                      className={frameClass}
                    />
                  </div>
                ))}
                {/* Progreso de la semana */}
                <ol className="mt-5 flex justify-center gap-2" aria-hidden="true">
                  {days.map((day, index) => (
                    <li
                      key={day.id}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-500",
                        index === active ? "w-8 bg-brand" : "w-3 bg-white/20",
                        day.isClub && index !== active && "bg-brand/40",
                      )}
                    />
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <ol className="space-y-5 md:space-y-0">
            {days.map((day, index) => (
              <DayStep key={day.id} day={day} index={index} active={index === active} onActive={setActive} props={props} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default WeekStorySection;
