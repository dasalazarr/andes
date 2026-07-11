import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

interface ChatMessage {
  from: "coach" | "user";
  text: string;
}

interface ProductDemoSectionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  messages: ChatMessage[];
}

const COACH_TYPING_MS = 850;
const COACH_REVEAL_MS = 350;
const USER_REVEAL_MS = 450;

const ProductDemoSection: React.FC<ProductDemoSectionProps> = ({
  sectionTitle,
  sectionSubtitle,
  messages,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const chatRef = useRef<HTMLDivElement>(null);
  const [revealedCount, setRevealedCount] = useState(prefersReducedMotion ? messages.length : 0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(prefersReducedMotion);

  // Trigger the sequence once the chat enters the viewport.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const node = chatRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setHasStarted(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // Drive the reveal/typing sequence.
  useEffect(() => {
    if (prefersReducedMotion || !hasStarted) return;
    if (revealedCount >= messages.length) {
      setIsTyping(false);
      return;
    }
    const next = messages[revealedCount];
    let revealTimer: ReturnType<typeof setTimeout>;

    if (next.from === "coach") {
      setIsTyping(true);
      revealTimer = setTimeout(() => {
        setIsTyping(false);
        setRevealedCount((c) => c + 1);
      }, COACH_TYPING_MS);
    } else {
      setIsTyping(false);
      revealTimer = setTimeout(() => {
        setRevealedCount((c) => c + 1);
      }, USER_REVEAL_MS);
    }

    return () => clearTimeout(revealTimer);
  }, [hasStarted, revealedCount, messages, prefersReducedMotion]);

  const visibleMessages = messages.slice(0, revealedCount);
  const nextIsCoach =
    !prefersReducedMotion && isTyping && messages[revealedCount]?.from === "coach";

  return (
    <section id="product-demo" className="bg-surface py-14 md:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <AnimatedSection className="mb-10 text-center md:mb-14">
          <h2 className="text-3xl font-bold text-white md:text-4xl">{sectionTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-400 md:text-lg">{sectionSubtitle}</p>
        </AnimatedSection>

        <AnimatedSection className="mx-auto max-w-md">
          {/* Phone frame */}
          <div
            ref={chatRef}
            className="overflow-hidden rounded-[28px] border border-white/15 bg-[#0b141a] shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
          >
            {/* WhatsApp header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-[#1f2c34] px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand">
                <span className="text-sm font-bold text-black">A</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Andes Coach</p>
                <p className="text-[11px] text-brand">online</p>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex max-h-[420px] flex-col gap-2 overflow-y-auto px-3 py-4 sm:px-4"
              aria-live="polite"
              aria-atomic="false"
            >
              <AnimatePresence initial={false}>
                {visibleMessages.map((message, index) => {
                  const isCoach = message.from === "coach";
                  return (
                    <motion.div
                      key={index}
                      layout
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : COACH_REVEAL_MS / 1000,
                        ease: "easeOut",
                      }}
                      className={`flex ${isCoach ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`relative max-w-[85%] rounded-2xl px-3 py-2.5 text-[13px] leading-relaxed sm:text-sm ${
                          isCoach
                            ? "rounded-tl-md bg-[#1f2c34] text-gray-100"
                            : "rounded-tr-md bg-[#005c4b] text-white"
                        }`}
                      >
                        <span
                          className={`absolute top-0 h-3 w-3 ${
                            isCoach ? "-left-1.5 bg-[#1f2c34]" : "-right-1.5 bg-[#005c4b]"
                          }`}
                          style={{
                            clipPath: isCoach
                              ? "polygon(100% 0, 0 0, 100% 100%)"
                              : "polygon(0 0, 100% 0, 0 100%)",
                          }}
                          aria-hidden="true"
                        />
                        <p className="whitespace-pre-line">{message.text}</p>
                      </div>
                    </motion.div>
                  );
                })}

                {nextIsCoach ? (
                  <motion.div
                    key="typing-indicator"
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex justify-start"
                    aria-label="Andes Coach is typing"
                  >
                    <div className="relative rounded-2xl rounded-tl-md bg-[#1f2c34] px-3 py-3">
                      <span
                        className="absolute top-0 -left-1.5 h-3 w-3 bg-[#1f2c34]"
                        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                        aria-hidden="true"
                      />
                      <div className="flex items-center gap-1.5">
                        {[0, 1, 2].map((dot) => (
                          <motion.span
                            key={dot}
                            className="block h-1.5 w-1.5 rounded-full bg-white/60"
                            animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
                            transition={{
                              duration: 1.1,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: dot * 0.18,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ProductDemoSection;
