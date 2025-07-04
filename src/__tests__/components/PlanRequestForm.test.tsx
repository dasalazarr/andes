import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PlanRequestForm from '@/components/PlanRequestForm';

// Mock para window.scrollTo
const mockScrollTo = vi.fn();
vi.stubGlobal('scrollTo', mockScrollTo);

describe('PlanRequestForm Component', () => {
  beforeEach(() => {
    mockScrollTo.mockClear();
  });

  it('renders correctly with default Google Form URL', () => {
    render(<PlanRequestForm language="en" />);
    
    // Verificar que el iframe existe y tiene la URL correcta
    const iframe = screen.getByTitle('Personalized plan request form');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      'https://docs.google.com/forms/d/e/1FAIpQLScdqR-Gg53vh4sbkCWT58CMDkL7Ihzb952pIM8n5WfUePVWng/viewform?embedded=true'
    );
  });

  it('renders with default form URL', () => {
    render(<PlanRequestForm language="en" />);
    
    const iframe = screen.getByTitle('Personalized plan request form');
    expect(iframe).toHaveAttribute('src', 'https://docs.google.com/forms/d/e/1FAIpQLScdqR-Gg53vh4sbkCWT58CMDkL7Ihzb952pIM8n5WfUePVWng/viewform?embedded=true');
  });

  it('displays privacy information text', () => {
    render(<PlanRequestForm language="en" />);
    
    const privacyText = screen.getByText(/By submitting this form, you agree that we may use your data/);
    expect(privacyText).toBeInTheDocument();
  });

  it("muestra el botón de envío del formulario", async () => {
    render(<PlanRequestForm language="en" />);
    
    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeInTheDocument();
  });
});
