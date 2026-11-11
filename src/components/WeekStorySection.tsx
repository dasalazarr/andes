import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import AnimatedSection from "./AnimatedSection";
import WhatsAppChat from "./whatsapp/WhatsAppChat";
import { cn } from "@/lib/utils";
import { weekChatContent, type WeekDay } from "@/data/content";

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

const DayChat: React.FC<{ language: "es" | "en"; day: WeekDay; playing: boolean; className?: string }> = ({
  language,
  day,
  playing,
  className,
}) => {
  const ui = weekChatContent[language];
  return (
    <WhatsAppChat
      items={ui.chats[day.id]}
      playing={playing}
      name={ui.name}
      online={ui.online}
      typing={ui.typing}
      typeHere={ui.typeHere}
      today={day.day.toUpperCase()}
      className={className}
    />
  );
};

const DayStep: React.FC<{
  day: WeekDay;
  index: number;
  active: boolean;
  onActive: (index: number) => void;
  props: WeekStorySectionProps;
}> = ({ day, index, active, onActive, props }) => {
  const stepRef = useRef<HTMLLIElement>(null);
  // Desktop: el paso cuyo centro cruza la mitad del viewport gana el chat sticky
  const centered = useInView(stepRef, { margin: "-45% 0px -45% 0px" });
  // Móvil: cada tarjeta reproduce su propia conversación mientras se ve
  const mobileRef = useRef<HTMLDivElement>(null);
  const mobileVisible = useInView(mobileRef, { amount: 0.4 });

  useEffect(() => {
    if (centered) onActive(index);
  }, [centered, index, onActive]);

  return (
    <li
      ref={stepRef}
      id={`week-day-${day.id}`}
      className={cn(
        "scroll-mt-32 rounded-[28px] border p-5 transition-colors duration-500 sm:p-6 md:flex md:min-h-[55vh] md:flex-col md:justify-center md:border-transparent md:bg-transparent md:p-0",
        day.isClub ? "border-brand/40 bg-brand/[0.06]" : "border-white/10 bg-white/[0.02]",
      )}
    >
      <div className={cn("transition-opacity duration-500", active ? "md:opacity-100" : "md:opacity-50")}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-brand/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
            {day.day}
          </span>
          {day.isClub ? (
            <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-black">
              {props.clubBadge}
            </span>
          ) : (
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-400">{day.attribute}</span>
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
        <DayChat language={props.language} day={day} playing={mobileVisible} className="mx-auto h-[440px] max-w-[360px]" />
      </div>
    </li>
  );
};

const WeekStorySection: React.FC<WeekStorySectionProps> = (props) => {
  const { language, preheading, sectionTitle, sectionSubtitle, days } = props;
  const [active, setActive] = useState(0);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stickyVisible = useInView(stickyRef, { amount: 0.3 });
  const activeDay = days[active] ?? days[0];

  const goTo = (id: string) => {
    document.getElementById(`week-day-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="relative overflow-x-clip bg-surface py-16 md:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 right-[-8rem] h-96 w-96 rounded-full bg-brand-deep/30 blur-3xl" />
      <div className="container relative mx-auto max-w-6xl px-4">
        <AnimatedSection className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand sm:text-xs">{preheading}</p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-cream md:text-5xl">{sectionTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-400 md:text-lg">{sectionSubtitle}</p>
        </AnimatedSection>

        <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
          {/* Desktop: chat de WhatsApp sticky que sigue al paso activo */}
          <div className="hidden md:block">
            <div ref={stickyRef} className="sticky top-[14vh]">
              <div className="mx-auto max-w-[380px]">
                <DayChat
                  key={`${language}-${activeDay.id}`}
                  language={language}
                  day={activeDay}
                  playing={stickyVisible}
                  className="h-[min(560px,70vh)]"
                />
                {/* Progreso de la semana (navegable) */}
                <div className="mt-5 flex justify-center gap-1.5">
                  {days.map((day, index) => (
                    <button
                      key={day.id}
                      type="button"
                      onClick={() => goTo(day.id)}
                      aria-label={day.day}
                      aria-current={index === active ? "step" : undefined}
                      className="flex h-6 items-center px-0.5"
                    >
                      <span
                        className={cn(
                          "block h-1.5 rounded-full transition-all duration-500",
                          index === active ? "w-8 bg-brand" : "w-3 bg-white/20 hover:bg-white/40",
                          day.isClub && index !== active && "bg-brand/40",
                        )}
                      />
                    </button>
                  ))}
                </div>
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
