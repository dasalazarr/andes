import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AmbassadorsPage from '@/components/AmbassadorsPage';
import { ambassadorsContent } from '@/data/content';
import { startOnboarding } from '@/lib/onboarding';

vi.mock('@/lib/onboarding', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/onboarding')>();
  return { ...actual, startOnboarding: vi.fn().mockResolvedValue(undefined) };
});

const renderAt = (path: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <AmbassadorsPage />
      </MemoryRouter>
    </HelmetProvider>,
  );

describe('AmbassadorsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Spanish content on /embajadores', () => {
    renderAt('/embajadores');
    const es = ambassadorsContent.es;

    expect(screen.getByText(es.hero.headlineLead)).toBeInTheDocument();
    expect(screen.getByText(es.whatIs.title)).toBeInTheDocument();
    expect(screen.getByText(es.benefits.title)).toBeInTheDocument();
    expect(screen.getByText(es.finalCta.title)).toBeInTheDocument();
    es.benefits.items.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it('renders Spanish content on /es/embajadores', () => {
    renderAt('/es/embajadores');
    expect(screen.getByText(ambassadorsContent.es.hero.headlineLead)).toBeInTheDocument();
  });

  it('starts ambassador onboarding when hero CTA is clicked', async () => {
    const user = userEvent.setup();
    renderAt('/embajadores');

    await user.click(screen.getByRole('button', { name: new RegExp(ambassadorsContent.es.hero.ctaText) }));

    expect(startOnboarding).toHaveBeenCalledWith({
      intent: 'ambassador',
      language: 'es',
      placement: 'ambassadors',
    });
  });

  it('has a CTA at the end of the page too', async () => {
    const user = userEvent.setup();
    renderAt('/embajadores');

    await user.click(screen.getByRole('button', { name: new RegExp(ambassadorsContent.es.finalCta.ctaText) }));

    expect(startOnboarding).toHaveBeenCalledTimes(1);
  });
});
