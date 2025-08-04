import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ArticleCarousel from '@/components/ArticleCarousel';

// Mock para Element.scrollBy
const mockScrollBy = vi.fn();
Element.prototype.scrollBy = mockScrollBy;

describe('ArticleCarousel Component', () => {
  beforeEach(() => {
    mockScrollBy.mockClear();
    
    // Mock para clientWidth
    Object.defineProperty(Element.prototype, 'clientWidth', {
      configurable: true,
      value: 1000,
    });
  });

  it('renders children correctly', () => {
    render(
      <ArticleCarousel language="en">
        <div data-testid="test-item-1">Item 1</div>
        <div data-testid="test-item-2">Item 2</div>
        <div data-testid="test-item-3">Item 3</div>
      </ArticleCarousel>
    );
    
    expect(screen.getByTestId('test-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('test-item-2')).toBeInTheDocument();
    expect(screen.getByTestId('test-item-3')).toBeInTheDocument();
  });

  it('has navigation buttons', () => {
    render(
      <ArticleCarousel language="en">
        <div>Test Content</div>
      </ArticleCarousel>
    );
    
    // Verificar que existen los botones de navegación por sus SVG
    const leftButtonSVG = document.querySelector('.lucide-chevron-left');
    const rightButtonSVG = document.querySelector('.lucide-chevron-right');
    
    expect(leftButtonSVG).toBeInTheDocument();
    expect(rightButtonSVG).toBeInTheDocument();
  });

  it('scrolls left when left button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <ArticleCarousel language="en">
        <div>Test Content</div>
      </ArticleCarousel>
    );
    
    // Encontrar el botón por su contenido SVG
    const leftButton = document.querySelector('.lucide-chevron-left').closest('button');
    await user.click(leftButton);
    
    // Verificar que se llama a scrollBy con el valor correcto
    expect(mockScrollBy).toHaveBeenCalledWith({
      left: -800, // 80% del ancho (1000 * 0.8)
      behavior: 'smooth'
    });
  });

  it('scrolls right when right button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <ArticleCarousel language="en">
        <div>Test Content</div>
      </ArticleCarousel>
    );
    
    // Encontrar el botón por su contenido SVG
    const rightButton = document.querySelector('.lucide-chevron-right').closest('button');
    await user.click(rightButton);
    
    // Verificar que se llama a scrollBy con el valor correcto
    expect(mockScrollBy).toHaveBeenCalledWith({
      left: 800, // 80% del ancho (1000 * 0.8)
      behavior: 'smooth'
    });
  });
});
