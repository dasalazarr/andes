import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Camera, CheckCheck, Mic, Paperclip, Phone, Smile, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WeekChatItem } from "@/data/content";

// Paleta real de WhatsApp (modo oscuro)
const WA = {
  header: "#202C33",
  bg: "#0B141A",
  out: "#005C4B",
  in: "#202C33",
  meta: "rgba(233,237,239,0.6)",
  tick: "#53BDEB",
  text: "#E9EDEF",
  input: "#2A3942",
};

// Patrón "doodle" sutil del fondo de WhatsApp (SVG inline, sin peticiones extra)
const doodle = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120' fill='none' stroke='#fff' stroke-width='1.4' stroke-linecap='round'><circle cx='18' cy='20' r='6'/><path d='M50 14l8 8m0-8l-8 8'/><path d='M88 12c6 0 10 4 10 10'/><rect x='12' y='58' width='14' height='10' rx='3'/><path d='M56 60c4-6 12-6 16 0'/><circle cx='96' cy='64' r='3'/><path d='M20 100l6-8 6 8'/><path d='M58 98h14'/><path d='M90 96c0 6 8 6 8 0'/></svg>`,
)}")`;

const Tail: React.FC<{ out: boolean }> = ({ out }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 8 13"
    width="8"
    height="13"
    className={cn("absolute top-0", out ? "-right-[7px]" : "-left-[7px] -scale-x-100")}
    style={{ color: out ? WA.out : WA.in }}
  >
    <path fill="currentColor" d="M0 0h8L1.5 8.5C.6 9.6 0 10.5 0 11.5V0z" />
  </svg>
);

const Meta: React.FC<{ time: string; out: boolean }> = ({ time, out }) => (
  <span className="float-right ml-2 mt-1.5 inline-flex translate-y-0.5 items-center gap-0.5 text-[11px] leading-none" style={{ color: WA.meta }}>
    {time}
    {out ? <CheckCheck className="h-3.5 w-3.5" style={{ color: WA.tick }} aria-label="leído" /> : null}
  </span>
);

// Formato nativo de WhatsApp: *negrita* y saltos de línea
const formatWa = (text: string) =>
  text.split(/(\*[^*\n]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
      <strong key={i} className="font-semibold">{part.slice(1, -1)}</strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );

const Bubble: React.FC<{ item: WeekChatItem; first: boolean }> = ({ item, first }) => {
  const out = item.from === "user";
  const isImage = item.kind === "image";
  return (
    <div className={cn("flex", out ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "relative max-w-[85%] whitespace-pre-line text-[14.5px] leading-[1.35] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]",
          isImage ? "w-[75%] p-1" : "px-2.5 pb-1.5 pt-1.5",
          first ? (out ? "rounded-lg rounded-tr-none" : "rounded-lg rounded-tl-none") : "rounded-lg",
        )}
        style={{ background: out ? WA.out : WA.in, color: WA.text }}
      >
        {first ? <Tail out={out} /> : null}
        {item.kind === "image" ? (
          <>
            <img src={item.image} alt={item.imageAlt} loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover" width={320} height={240} />
            <div className="px-1.5 pb-0.5 pt-1.5">
              <span>{formatWa(item.caption)}</span>
              <Meta time={item.time} out={out} />
            </div>
          </>
        ) : (
          <>
            <span>{formatWa(item.text)}</span>
            <Meta time={item.time} out={out} />
          </>
        )}
      </div>
    </div>
  );
};

const TypingDots: React.FC = () => (
  <div className="flex justify-start" aria-hidden="true">
    <div className="relative flex gap-1 rounded-lg rounded-tl-none px-3 py-3" style={{ background: WA.in }}>
      <Tail out={false} />
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-white/60"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  </div>
);

export interface WhatsAppChatProps {
  items: WeekChatItem[];
  /** Reproduce la conversación por pasos mientras true */
  playing: boolean;
  name: string;
  online: string;
  typing: string;
  typeHere: string;
  today: string;
  className?: string;
}

const STEP_MS = 1100;

const WhatsAppChat: React.FC<WhatsAppChatProps> = ({ items, playing, name, online, typing, typeHere, today, className }) => {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? items.length : 0);

  // Reinicia la conversación cuando cambia el día o vuelve a entrar en pantalla
  useEffect(() => {
    if (reduce) {
      setShown(items.length);
      return;
    }
    if (!playing) return;
    setShown(0);
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setShown(n);
      if (n >= items.length) window.clearInterval(id);
    }, STEP_MS);
    // Primer mensaje casi inmediato
    const first = window.setTimeout(() => setShown((s) => Math.max(s, 1)), 250);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(first);
    };
  }, [items, playing, reduce]);

  const next = items[shown];
  const coachTyping = !reduce && playing && shown > 0 && next?.from === "coach";

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-[32px] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.55)] ring-4 ring-black/40",
        className,
      )}
      style={{ background: WA.bg }}
    >
      {/* Cabecera */}
      <div className="flex items-center gap-3 px-3 py-2.5" style={{ background: WA.header }}>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface ring-1 ring-white/10">
          <img src="/path2.svg" alt="" className="h-4 w-auto" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-medium" style={{ color: WA.text }}>{name}</p>
          <p className="text-[12px]" style={{ color: WA.meta }} aria-live="polite">
            {coachTyping ? typing : online}
          </p>
        </div>
        <div className="flex items-center gap-4 pr-1" style={{ color: WA.meta }} aria-hidden="true">
          <Video className="h-5 w-5" />
          <Phone className="h-[18px] w-[18px]" />
        </div>
      </div>

      {/* Conversación */}
      <div className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: doodle }} aria-hidden="true" />
        <div className="relative flex h-full flex-col justify-end gap-1.5 px-3.5 py-3">
          <div className="mb-1 flex justify-center">
            <span className="rounded-md px-2.5 py-1 text-[11px] font-medium" style={{ background: WA.header, color: WA.meta }}>
              {today}
            </span>
          </div>
          <AnimatePresence initial={false}>
            {items.slice(0, shown).map((item, i) => {
              const prev = items[i - 1];
              const first = !prev || prev.from !== item.from;
              return (
                <motion.div
                  key={i}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className={first && i > 0 ? "mt-1" : undefined}
                >
                  <Bubble item={item} first={first} />
                </motion.div>
              );
            })}
          </AnimatePresence>
          {coachTyping ? <TypingDots /> : null}
        </div>
      </div>

      {/* Barra de entrada (decorativa) */}
      <div className="flex items-center gap-2 px-2 py-2" aria-hidden="true">
        <div className="flex flex-1 items-center gap-3 rounded-full px-3 py-2" style={{ background: WA.input, color: WA.meta }}>
          <Smile className="h-5 w-5" />
          <span className="flex-1 text-[14px]">{typeHere}</span>
          <Paperclip className="h-[18px] w-[18px]" />
          <Camera className="h-[18px] w-[18px]" />
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00A884] text-[#111B21]">
          <Mic className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
};

export default WhatsAppChat;
