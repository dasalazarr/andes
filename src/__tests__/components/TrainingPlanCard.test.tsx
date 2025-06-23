import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TrainingPlanCard from '@/components/TrainingPlanCard';

// Mock para window.open
const mockOpen = vi.fn();
vi.stubGlobal('open', mockOpen);

describe('TrainingPlanCard Component', () => {
  const baseProps = {
    title: 'Test Plan',
    description: 'A test description for the plan.',
    duration: '10 weeks',
    pdfUrl: '/plans/test-plan.pdf',
  };

  beforeEach(() => {
    mockOpen.mockClear();
  });

  it('renders correctly with given props', () => {
    const props = {
      title: '5K Training Plan',
      description: 'Perfect for beginners looking to complete their first 5K race. Includes gradual build-up with walk/run intervals.',
      duration: '8 weeks',
      difficulty: 'Beginner' as const,
      pdfUrl: '/plans/5k-plan.pdf',
    };
    render(<TrainingPlanCard {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
    expect(screen.getByText(props.duration)).toBeInTheDocument();
    expect(screen.getByText(props.difficulty)).toBeInTheDocument();
    expect(screen.getByText('Download PDF')).toBeInTheDocument();
  });

  it('renders with custom props', () => {
    const customProps = {
      title: 'Marathon Training Plan',
      description: 'Advanced training for experienced runners',
      duration: '16 weeks',
      difficulty: 'Advanced' as const,
      pdfUrl: 'https://example.com/plan.pdf',
    };

    render(<TrainingPlanCard {...customProps} />);

    expect(screen.getByText('Marathon Training Plan')).toBeInTheDocument();
    expect(screen.getByText('Advanced training for experienced runners')).toBeInTheDocument();
    expect(screen.getByText('16 weeks')).toBeInTheDocument();
    expect(screen.getByText('Advanced')).toBeInTheDocument();
  });

  it('applies correct color class based on difficulty', () => {
    const { rerender } = render(<TrainingPlanCard {...baseProps} difficulty="Beginner" />);
    const beginnerBadge = screen.getByText('Beginner');
    expect(beginnerBadge).toHaveClass('bg-green-100', 'text-green-800');

    rerender(<TrainingPlanCard {...baseProps} difficulty="Intermediate" />);
    const intermediateBadge = screen.getByText('Intermediate');
    expect(intermediateBadge).toHaveClass('bg-blue-100', 'text-blue-800');

    rerender(<TrainingPlanCard {...baseProps} difficulty="Advanced" />);
    const advancedBadge = screen.getByText('Advanced');
    expect(advancedBadge).toHaveClass('bg-purple-100', 'text-purple-800');
  });

  it('opens PDF URL in a new tab when button is clicked', async () => {
    const user = userEvent.setup();
    const props = {
      ...baseProps,
      difficulty: 'Beginner' as const,
      pdfUrl: 'https://example.com/training-plan.pdf',
    };

    render(<TrainingPlanCard {...props} />);

    const downloadButton = screen.getByText('Download PDF');
    await user.click(downloadButton);

    expect(mockOpen).toHaveBeenCalledTimes(1);
    expect(mockOpen).toHaveBeenCalledWith(props.pdfUrl, '_blank');
  });
});
