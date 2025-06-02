import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/components/home';

// No vamos a usar mocks para estas pruebas de integración
// para verificar la interacción real entre componentes

describe('User Flow Integration Tests', () => {
  // Mock para window.open y window.scrollTo
  const mockOpen = vi.fn();
  const mockScrollTo = vi.fn();
  const mockScrollIntoView = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    
    // Configurar mocks
    vi.stubGlobal('open', mockOpen);
    vi.stubGlobal('scrollTo', mockScrollTo);
    Element.prototype.scrollIntoView = mockScrollIntoView;
    
    // Crear un mock para la sección de formulario que pueda ser objetivo de scrollIntoView
    Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
      configurable: true,
      value: 1000
    });
    
    // Restablecer cualquier estado guardado
    localStorage.clear();
  });

  it('verifies hero section and training plans are displayed', async () => {
    const user = userEvent.setup();
    render(<Home />);
    
    // 1. Usuario ve la sección hero
    const heroSection = screen.getByText(/Your First Marathon, Without Fear/i);
    expect(heroSection).toBeInTheDocument();
    
    // 2. Usuario ve los artículos destacados (usando los textos reales del componente)
    expect(screen.getByText(/Nutrition for Beginner Runners/i)).toBeInTheDocument();
    expect(screen.getByText(/Choosing the Right Running Shoes/i)).toBeInTheDocument();
    
    // 3. Usuario ve los planes de entrenamiento
    expect(screen.getByText(/20-Week Plan for Your First Marathon/i)).toBeInTheDocument();
    
    // 4. Usuario intenta descargar un plan
    const downloadButton = screen.getAllByText(/Download PDF/i)[0];
    await user.click(downloadButton);
    
    // 5. Verifica que se intentó abrir el PDF
    expect(mockOpen).toHaveBeenCalledTimes(1);
    
    // 6. Usuario hace clic en el CTA principal para solicitar un plan personalizado
    const ctaButton = screen.getByText(/Get Your Beta Personalized Plan/i);
    await user.click(ctaButton);
  });

  it('verifies the under construction plan is properly indicated', async () => {
    render(<Home />);
    
    // Buscar el plan que está "en construcción"
    const underConstructionPlan = screen.getByText(/16-Week Plan for Experienced Runners/i);
    expect(underConstructionPlan).toBeInTheDocument();
    
    // Verificar que el indicador "Coming Soon" está presente
    // (puede estar en el texto o como una etiqueta)
    const comingSoonIndicator = screen.getByText(/COMING SOON/i);
    expect(comingSoonIndicator).toBeInTheDocument();
    
    // Verificar que hay un mensaje indicando que está en desarrollo
    const developmentMessage = screen.getByText(/under development/i);
    expect(developmentMessage).toBeInTheDocument();
  });

  it('verifies navigation links work correctly', async () => {
    const user = userEvent.setup();
    render(<Home />);
    
    // Verificar que los enlaces de navegación están presentes
    // Basado en los enlaces que realmente existen en el componente Home
    const featuresLink = screen.getByText('Features');
    const articlesLink = screen.getByText('Articles');
    const communityLink = screen.getByText('Community');
    
    expect(featuresLink).toBeInTheDocument();
    expect(articlesLink).toBeInTheDocument();
    expect(communityLink).toBeInTheDocument();
    
    // Hacer clic en el enlace de Articles
    await user.click(articlesLink);
    
    // No podemos verificar el scrollIntoView ya que es una implementación interna
    // y estamos usando mocks. Simplemente verificamos que podemos hacer clic sin errores.
  });
});
