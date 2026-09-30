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

vi.mock("@/components/WeekStorySection", () => ({
  default: () => <div data-testid="week-story-section">Mock Week Story</div>,
}));

vi.mock("@/components/HowItWorksSection", () => ({
  default: () => <div data-testid="how-it-works-section">Mock How It Works</div>,
}));

vi.mock("@/components/PricingSection", () => ({
  default: () => <div data-testid="pricing-section">Mock Pricing</div>,
}));

vi.mock("@/components/ImpactIndicatorsSection", () => ({
  default: () => <div data-testid="safety-section">Mock Safety</div>,
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

  it("renders key sections in correct conversion order", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    // Hero CTA should be visible
    expect((await screen.findAllByRole("button", { name: /Start Free/i })).length).toBeGreaterThan(0);

    expect(await screen.findByTestId("week-story-section")).toBeInTheDocument();
    expect(await screen.findByTestId("how-it-works-section")).toBeInTheDocument();
    expect(await screen.findByTestId("safety-section")).toBeInTheDocument();
    expect(await screen.findByTestId("pricing-section")).toBeInTheDocument();
    expect(await screen.findByTestId("faq-section")).toBeInTheDocument();
  });

  it("starts free onboarding from hero CTA", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    await user.click(screen.getAllByRole("button", { name: /Start Free/i })[0]);

    expect(startOnboarding).toHaveBeenCalledWith({
      intent: "free",
      language: "en",
      placement: "hero",
    });
  });

  it("does not render club voices while there are no real quotes", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    await screen.findByTestId("week-story-section");
    expect(screen.queryByText(/Voices from the club/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Beta tester/i)).not.toBeInTheDocument();
  });

  it("tags city requests from the club section", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    await user.click(await screen.findByRole("button", { name: /Ask for Andes in your city/i }));

    expect(startOnboarding).toHaveBeenCalledWith({
      intent: "free",
      language: "en",
      placement: "city_request",
      source: "city-request",
    });
  });
});
