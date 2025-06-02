import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UnderConstructionPlanCard from '@/components/UnderConstructionPlanCard';

// Mock para window.open
const mockOpen = vi.fn();
vi.stubGlobal('open', mockOpen);

describe('UnderConstructionPlanCard Component', () => {
  const defaultProps = {
    title: '16-Week Plan for Experienced Runners',
    description: 'Perfect for those who have completed at least one marathon.',
    duration: '16 weeks',
    difficulty: 'Intermediate' as const,
    pdfUrl: 'https://example.com/plan.pdf',
  };

  beforeEach(() => {
    mockOpen.mockClear();
  });

  it('renders with correct content and under construction overlay', () => {
    render(<UnderConstructionPlanCard {...defaultProps} />);
    
    // Verificar el contenido principal
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.duration)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.difficulty)).toBeInTheDocument();
    
    // Verificar los elementos del overlay
    expect(screen.getByText('COMING SOON')).toBeInTheDocument();
    expect(screen.getByText('This training plan is under development')).toBeInTheDocument();
    
    // Verificar que existe el botón de descarga
    expect(screen.getByText('Download PDF')).toBeInTheDocument();
  });

  it('applies the correct difficulty badge color', () => {
    render(<UnderConstructionPlanCard {...defaultProps} />);
    
    const badge = screen.getByText(defaultProps.difficulty);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-blue-100', 'text-blue-800');
  });

  it('applies different badge colors based on difficulty', () => {
    // Para dificultad Beginner
    const beginnerProps = {
      ...defaultProps,
      difficulty: 'Beginner' as const,
    };
    const { rerender } = render(<UnderConstructionPlanCard {...beginnerProps} />);
    
    let badge = screen.getByText('Beginner');
    expect(badge).toHaveClass('bg-green-100', 'text-green-800');
    
    // Para dificultad Advanced
    const advancedProps = {
      ...defaultProps,
      difficulty: 'Advanced' as const,
    };
    rerender(<UnderConstructionPlanCard {...advancedProps} />);
    
    badge = screen.getByText('Advanced');
    expect(badge).toHaveClass('bg-purple-100', 'text-purple-800');
  });

  it('opens PDF in new tab when download button is clicked', async () => {
    const user = userEvent.setup();
    render(<UnderConstructionPlanCard {...defaultProps} />);
    
    const downloadButton = screen.getByText('Download PDF');
    await user.click(downloadButton);
    
    expect(mockOpen).toHaveBeenCalledTimes(1);
    expect(mockOpen).toHaveBeenCalledWith(defaultProps.pdfUrl, '_blank');
  });

  it('renders animation dots for "under construction" indicator', () => {
    render(<UnderConstructionPlanCard {...defaultProps} />);
    
    // Buscar los puntos de animación (3 en total)
    const animationDots = document.querySelectorAll('.animate-bounce');
    expect(animationDots.length).toBe(3);
    
    // Verificar que tienen los estilos correctos
    animationDots.forEach((dot, index) => {
      expect(dot).toHaveClass('bg-yellow-600', 'rounded-full');
      expect(dot).toHaveStyle({ animationDelay: `${index * 0.15}s` });
    });
  });

  it('applies blur effect to the original content', () => {
    render(<UnderConstructionPlanCard {...defaultProps} />);
    
    // Verificar que existe un elemento con clase blur-[2px]
    const blurredContent = document.querySelector('.blur-\\[2px\\]');
    expect(blurredContent).toBeInTheDocument();
  });
});
