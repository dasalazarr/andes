import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeroSection from '@/components/HeroSection';

describe('HeroSection Component', () => {
  it('renders correctly with default props', () => {
    render(<HeroSection />);
    
    // Verificar que los textos predeterminados estén presentes
    expect(screen.getByText('Your First Marathon: AI-Powered Guide for Beginners')).toBeInTheDocument();
    expect(screen.getByText('Andes uses artificial intelligence to tailor and continually adapt your training plan, offering expert guidance and a supportive community to achieve your marathon goals.')).toBeInTheDocument();
    expect(screen.getByText('Get Your Beta Personalized Plan')).toBeInTheDocument();
  });

  it('renders with custom props', () => {
    const customProps = {
      title: 'Custom Title',
      subtitle: 'Custom Subtitle',
      ctaPrimaryText: 'Custom CTA',
    };
    
    render(<HeroSection {...customProps} />);
    
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Custom CTA')).toBeInTheDocument();
  });

  it('calls the onPrimaryClick handler when primary button is clicked', async () => {
    const onPrimaryClick = vi.fn();
    const user = userEvent.setup();
    
    render(<HeroSection onPrimaryClick={onPrimaryClick} />);
    
    const primaryButton = screen.getByText('Get Your Beta Personalized Plan');
    await user.click(primaryButton);
    
    expect(onPrimaryClick).toHaveBeenCalledTimes(1);
  });
});
