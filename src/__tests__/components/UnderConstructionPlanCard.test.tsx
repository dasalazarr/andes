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
    expect(screen.getByText('Próximamente')).toBeInTheDocument();
    expect(screen.getByText('Este plan de entrenamiento está en desarrollo.')).toBeInTheDocument();

    // Verificar que existe el botón de descarga
    expect(screen.getByText('Descargar Plan')).toBeInTheDocument();
  });

  it('opens PDF in new tab when download button is clicked', async () => {
    const user = userEvent.setup();
    render(<UnderConstructionPlanCard {...defaultProps} />);
    
    const downloadButton = screen.getByText('Descargar Plan');
    await user.click(downloadButton);
    
    expect(mockOpen).toHaveBeenCalledTimes(1);
    expect(mockOpen).toHaveBeenCalledWith(defaultProps.pdfUrl, '_blank');
  });

  it('applies blur effect to the original content', () => {
    render(<UnderConstructionPlanCard {...defaultProps} />);

    // Verificar que existe un elemento con clase blur-[2px]
    const blurredContent = document.querySelector('.blur-sm');
    expect(blurredContent).toBeInTheDocument();
  });
});
