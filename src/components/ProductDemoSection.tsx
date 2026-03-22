import React from "react";
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

const ProductDemoSection: React.FC<ProductDemoSectionProps> = ({
  sectionTitle,
  sectionSubtitle,
  messages,
}) => {
  return (
    <section id="product-demo" className="bg-black py-14 md:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <AnimatedSection className="mb-10 text-center md:mb-14">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {sectionTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-400 md:text-lg">
            {sectionSubtitle}
          </p>
        </AnimatedSection>

        <AnimatedSection className="mx-auto max-w-md">
          {/* Phone frame */}
          <div className="overflow-hidden rounded-[28px] border border-white/15 bg-[#0b141a] shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
            {/* WhatsApp header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-[#1f2c34] px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#27e97c] to-[#25d366]">
                <span className="text-sm font-bold text-black">A</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Andes Coach</p>
                <p className="text-[11px] text-[#27e97c]">online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-2 px-3 py-4 sm:px-4">
              {messages.map((message, index) => {
                const isCoach = message.from === "coach";
                return (
                  <div
                    key={index}
                    className={`flex ${isCoach ? "justify-start" : "justify-end"}`}
                    style={{
                      animationDelay: `${index * 0.3}s`,
                    }}
                  >
                    <div
                      className={`relative max-w-[85%] rounded-2xl px-3 py-2.5 text-[13px] leading-relaxed sm:text-sm ${
                        isCoach
                          ? "rounded-tl-md bg-[#1f2c34] text-gray-100"
                          : "rounded-tr-md bg-[#005c4b] text-white"
                      }`}
                    >
                      {/* Tail */}
                      <span
                        className={`absolute top-0 h-3 w-3 ${
                          isCoach
                            ? "-left-1.5 bg-[#1f2c34]"
                            : "-right-1.5 bg-[#005c4b]"
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
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ProductDemoSection;
