import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ClubSection from '@/components/ClubSection';
import { clubContent } from '@/data/content';

describe('ClubSection', () => {
  const onJoinClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderClub = (language: 'es' | 'en' = 'es') =>
    render(
      <MemoryRouter>
        <ClubSection language={language} onJoinClick={onJoinClick} />
      </MemoryRouter>,
    );

  it('renders the club value proposition in Spanish', () => {
    renderClub('es');
    const es = clubContent.es;

    expect(screen.getByText(es.title)).toBeInTheDocument();
    es.features.forEach((feature) => {
      expect(screen.getByText(feature.title)).toBeInTheDocument();
    });
    expect(screen.getByAltText(es.image.alt)).toBeInTheDocument();
  });

  it('fires onJoinClick from the WhatsApp CTA', async () => {
    const user = userEvent.setup();
    renderClub('es');

    await user.click(screen.getByRole('button', { name: new RegExp(clubContent.es.ctaText) }));
    expect(onJoinClick).toHaveBeenCalledTimes(1);
  });

  it('links to the ambassadors page in the right language', () => {
    renderClub('es');
    const link = screen.getByRole('link', { name: new RegExp('embajador', 'i') });
    expect(link).toHaveAttribute('href', '/es/embajadores');
  });
});
