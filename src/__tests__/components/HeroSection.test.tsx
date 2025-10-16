import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeroSection from '@/components/HeroSection';

describe('HeroSection Component', () => {
  const defaultProps = {
    preheading: 'Always-on smart coaching',
    headline: {
      lead: 'Your first marathon starts here',
      accent: 'injury-free',
    },
    description:
      'Andes adapts every workout in real time so you stay confident from your first run to the finish line.',
    ctaPrimaryText: 'Get started',
    keyBenefits: '100% personalized plans • Instant feedback • Daily motivation',
    onPrimaryClick: vi.fn(),
    videoSrc: '/videos/hero-video',
    language: 'en' as const,
  };

  it('renders correctly with default props', () => {
    render(<HeroSection {...defaultProps} />);

    // Verificar que los textos predeterminados estén presentes
    expect(screen.getByText('Always-on smart coaching')).toBeInTheDocument();
    expect(screen.getByText('Your first marathon starts here')).toBeInTheDocument();
    expect(screen.getByText('injury-free')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Andes adapts every workout in real time so you stay confident from your first run to the finish line.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Get started')).toBeInTheDocument();
  });

  it('renders with custom props', () => {
    const customProps = {
      ...defaultProps,
      preheading: 'Custom Preheading',
      headline: {
        lead: 'Custom Lead',
        accent: 'Custom Accent',
        trailing: 'and beyond',
      },
      description: 'Custom Description',
      ctaPrimaryText: 'Custom CTA',
    };

    render(<HeroSection {...customProps} />);

    expect(screen.getByText('Custom Preheading')).toBeInTheDocument();
    expect(screen.getByText('Custom Lead')).toBeInTheDocument();
    expect(screen.getByText('Custom Accent')).toBeInTheDocument();
    expect(screen.getByText('and beyond')).toBeInTheDocument();
    expect(screen.getByText('Custom Description')).toBeInTheDocument();
    expect(screen.getByText('Custom CTA')).toBeInTheDocument();
  });

  it('calls the onPrimaryClick handler when primary button is clicked', async () => {
    const onPrimaryClick = vi.fn();
    const user = userEvent.setup();

    const testProps = {
      ...defaultProps,
      onPrimaryClick,
    };

    render(<HeroSection {...testProps} />);

    const primaryButton = screen.getByRole('button', { name: 'Start on WhatsApp' });
    await user.click(primaryButton);

    expect(onPrimaryClick).toHaveBeenCalledTimes(1);
  });
});
