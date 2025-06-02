import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TrainingPlanCard from '@/components/TrainingPlanCard';

// Mock para window.open
const mockOpen = vi.fn();
vi.stubGlobal('open', mockOpen);

describe('TrainingPlanCard Component', () => {
  beforeEach(() => {
    mockOpen.mockClear();
  });

  it('renders correctly with default props', () => {
    render(<TrainingPlanCard />);
    
    expect(screen.getByText('5K Training Plan')).toBeInTheDocument();
    expect(screen.getByText('Perfect for beginners looking to complete their first 5K race. Includes gradual build-up with walk/run intervals.')).toBeInTheDocument();
    expect(screen.getByText('8 weeks')).toBeInTheDocument();
    expect(screen.getByText('Beginner')).toBeInTheDocument();
    expect(screen.getByText('Download PDF')).toBeInTheDocument();
  });

  it('renders with custom props', () => {
    const customProps = {
      title: 'Marathon Training Plan',
      description: 'Advanced training for experienced runners',
      duration: '16 weeks',
      difficulty: 'Advanced' as 'Beginner' | 'Intermediate' | 'Advanced',
      pdfUrl: 'https://example.com/plan.pdf',
    };
    
    render(<TrainingPlanCard {...customProps} />);
    
    expect(screen.getByText('Marathon Training Plan')).toBeInTheDocument();
    expect(screen.getByText('Advanced training for experienced runners')).toBeInTheDocument();
    expect(screen.getByText('16 weeks')).toBeInTheDocument();
    expect(screen.getByText('Advanced')).toBeInTheDocument();
  });

  it('applies correct color class based on difficulty', () => {
    const beginnerProps = {
      difficulty: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    };
    
    const { rerender } = render(<TrainingPlanCard {...beginnerProps} />);
    const beginnerBadge = screen.getByText('Beginner');
    expect(beginnerBadge).toHaveClass('bg-green-100');
    expect(beginnerBadge).toHaveClass('text-green-800');
    
    rerender(<TrainingPlanCard difficulty="Intermediate" />);
    const intermediateBadge = screen.getByText('Intermediate');
    expect(intermediateBadge).toHaveClass('bg-blue-100');
    expect(intermediateBadge).toHaveClass('text-blue-800');
    
    rerender(<TrainingPlanCard difficulty="Advanced" />);
    const advancedBadge = screen.getByText('Advanced');
    expect(advancedBadge).toHaveClass('bg-purple-100');
    expect(advancedBadge).toHaveClass('text-purple-800');
  });

  it('opens PDF URL in a new tab when button is clicked', async () => {
    const pdfUrl = 'https://example.com/training-plan.pdf';
    const user = userEvent.setup();
    
    render(<TrainingPlanCard pdfUrl={pdfUrl} />);
    
    const downloadButton = screen.getByText('Download PDF');
    await user.click(downloadButton);
    
    expect(mockOpen).toHaveBeenCalledTimes(1);
    expect(mockOpen).toHaveBeenCalledWith(pdfUrl, '_blank');
  });
});
