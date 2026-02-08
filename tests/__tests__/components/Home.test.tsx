import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Home from "@/components/home";
import { startOnboarding } from "@/lib/onboarding";

vi.mock("@/hooks/useLanguageDetection", () => ({
  useLanguageDetection: () => ({ currentLanguage: "en" }),
}));

vi.mock("@/lib/onboarding", () => ({
  startOnboarding: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/components/PricingSection", () => ({
  default: () => <div data-testid="pricing-section">Mock Pricing</div>,
}));

vi.mock("@/components/BenefitsSection", () => ({
  default: () => <div data-testid="benefits-section">Mock Benefits</div>,
}));

vi.mock("@/components/ImpactIndicatorsSection", () => ({
  default: () => <div data-testid="safety-section">Mock Safety</div>,
}));

vi.mock("@/components/grit/GritSection", () => ({
  default: () => <div data-testid="grit-section">Mock Grit</div>,
}));

vi.mock("@/features/blog/components/BlogHighlights", () => ({
  default: () => <div data-testid="blog-section">Mock Blog</div>,
}));

vi.mock("@/components/FAQSection", () => ({
  default: () => <div data-testid="faq-section">Mock FAQ</div>,
}));

vi.mock("@/components/SeoManager", () => ({
  default: () => null,
}));

describe("Home Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
  });

  it("renders key sections", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect((await screen.findAllByRole("button", { name: "Start Free" })).length).toBeGreaterThan(0);
    expect(await screen.findByTestId("pricing-section")).toBeInTheDocument();
    expect(await screen.findByTestId("benefits-section")).toBeInTheDocument();
    expect(await screen.findByTestId("faq-section")).toBeInTheDocument();
  });

  it("starts free onboarding from hero CTA", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    await user.click(screen.getAllByRole("button", { name: "Start Free" })[0]);

    expect(startOnboarding).toHaveBeenCalledWith({
      intent: "free",
      language: "en",
      placement: "hero",
    });
  });
});
