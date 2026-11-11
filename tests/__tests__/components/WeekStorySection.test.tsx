import { describe, it, expect, vi, afterEach, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WeekStorySection from "@/components/WeekStorySection";
import { weekChatContent, weekStoryContent } from "@/data/content";

const reducedMotion = vi.hoisted(() => ({ value: false }));

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: () => reducedMotion.value };
});

const renderSection = (onJoinClick = vi.fn()) => {
  const content = weekStoryContent.es;
  render(
    <WeekStorySection
      language="es"
      preheading={content.preheading}
      sectionTitle={content.sectionTitle}
      sectionSubtitle={content.sectionSubtitle}
      clubBadge={content.clubBadge}
      clubCta={content.clubCta}
      days={content.days}
      onJoinClick={onJoinClick}
    />,
  );
  return onJoinClick;
};

describe("WeekStorySection", () => {
  beforeAll(() => {
    // jsdom no implementa scrollIntoView
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    reducedMotion.value = false;
  });

  it("renders the five days of the first week, with Thursday as the club climax", () => {
    renderSection();

    expect(screen.getByRole("heading", { level: 2, name: weekStoryContent.es.sectionTitle })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(5);
    expect(screen.getByText(weekStoryContent.es.clubBadge)).toBeInTheDocument();
  });

  it("renders a live WhatsApp chat instead of video clips", () => {
    reducedMotion.value = true;
    renderSection();

    expect(document.querySelector("video")).toBeNull();
    const firstUserMsg = weekChatContent.es.chats.mon[0];
    expect(firstUserMsg.kind).toBe("msg");
    if (firstUserMsg.kind === "msg") {
      expect(screen.getAllByText(firstUserMsg.text).length).toBeGreaterThan(0);
    }
  });

  it("switches chat language when the language resolves after mount", () => {
    reducedMotion.value = true;
    const content = weekStoryContent.en;
    const props = {
      preheading: content.preheading,
      sectionTitle: content.sectionTitle,
      sectionSubtitle: content.sectionSubtitle,
      clubBadge: content.clubBadge,
      clubCta: content.clubCta,
      days: content.days,
      onJoinClick: vi.fn(),
    };
    const { rerender } = render(<WeekStorySection language="en" {...props} />);
    expect(screen.getAllByText(weekChatContent.en.online).length).toBeGreaterThan(0);
    rerender(<WeekStorySection language="es" {...props} />);
    expect(screen.getAllByText(weekChatContent.es.online).length).toBeGreaterThan(0);
  });

  it("lets users jump between days from the progress dots", () => {
    renderSection();
    expect(screen.getByRole("button", { name: weekStoryContent.es.days[3].day })).toBeInTheDocument();
  });

  it("Thursday CTA starts onboarding", async () => {
    const user = userEvent.setup();
    const onJoinClick = renderSection();

    await user.click(screen.getByRole("button", { name: weekStoryContent.es.clubCta }));
    expect(onJoinClick).toHaveBeenCalledTimes(1);
  });
});
