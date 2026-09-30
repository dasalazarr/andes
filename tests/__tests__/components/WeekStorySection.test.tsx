import { describe, it, expect, vi, afterEach, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WeekStorySection from "@/components/WeekStorySection";
import { weekStoryContent } from "@/data/content";

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
    // jsdom no implementa reproducción de media
    window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
    window.HTMLMediaElement.prototype.pause = vi.fn();
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

  it("serves pre-rendered Remotion clips per language", () => {
    renderSection();

    const sources = Array.from(document.querySelectorAll("video source")).map((s) => s.getAttribute("src"));
    expect(sources).toContain("/videos/week/mon-es.mp4");
    expect(sources).toContain("/videos/week/thu-es.mp4");
  });

  it("reloads clips when the language resolves after mount", () => {
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
    const before = document.querySelector("video");
    rerender(<WeekStorySection language="es" {...props} />);

    expect(document.querySelector("video source")).toHaveAttribute("src", "/videos/week/mon-es.mp4");
    expect(document.querySelector("video")).not.toBe(before);
  });

  it("falls back to posters when the user prefers reduced motion", () => {
    reducedMotion.value = true;
    renderSection();

    expect(document.querySelector("video")).toBeNull();
    expect(screen.getAllByAltText(weekStoryContent.es.days[0].videoAlt)[0]).toHaveAttribute("src", "/videos/week/mon-es.jpg");
  });

  it("Thursday CTA starts onboarding", async () => {
    const user = userEvent.setup();
    const onJoinClick = renderSection();

    await user.click(screen.getByRole("button", { name: weekStoryContent.es.clubCta }));
    expect(onJoinClick).toHaveBeenCalledTimes(1);
  });
});
