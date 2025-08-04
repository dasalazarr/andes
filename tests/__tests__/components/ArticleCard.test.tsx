import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ArticleCard from '@/components/ArticleCard';
import { articlesContent } from '@/data/content'; // Import mock data

describe('ArticleCard Component', () => {
  it('renders correctly with default props', () => {
    const testArticle = articlesContent[0];
    const mockOnClick = vi.fn();
    render(<ArticleCard article={testArticle} language="en" onClick={mockOnClick} />);
    
    expect(screen.getByText(testArticle.title.en)).toBeInTheDocument();
    expect(screen.getByText(testArticle.excerpt.en)).toBeInTheDocument();
    expect(screen.getByText('May 15, 2023')).toBeInTheDocument();
    expect(screen.getByText('Andes Coach')).toBeInTheDocument();
    
    // Verificar que la imagen existe y tiene la URL correcta
    const image = screen.getByAltText(testArticle.title.en);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80');
  });

  it('renders with custom props', () => {
    const customArticle = {
      ...articlesContent[0], // Base article
      id: "custom-id",
      title: { en: "Custom Article Title EN", es: "Custom Article Title ES" },
      excerpt: { en: "Custom article excerpt text EN", es: "Custom article excerpt text ES" },
      imageUrl: "/custom-image.jpg",
      readMoreUrl: "#custom-url",
      date: "Custom Date",
      fullContent: { en: "Full content EN", es: "Contenido completo ES" },
      image: "/custom-image.jpg"
    };
    const mockOnClick = vi.fn();
    render(<ArticleCard article={customArticle} language="en" onClick={mockOnClick} />);
    
    expect(screen.getByText(customArticle.title.en)).toBeInTheDocument();
    expect(screen.getByText(customArticle.excerpt.en)).toBeInTheDocument();
    expect(screen.getByText(customArticle.date)).toBeInTheDocument();
    
    const image = screen.getByAltText(customArticle.title.en);
    expect(image).toHaveAttribute('src', '/custom-image.jpg');
  });

  it('calls onClick handler when card is clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    // For onClick test, ensure readMoreUrl is undefined or remove it from the test article
    const articleForOnClick = { ...articlesContent[0], id: "onclick-article", readMoreUrl: undefined };
    render(<ArticleCard article={articleForOnClick} language="en" onClick={handleClick} />);

    const card = screen.getByText(articleForOnClick.title.en);
    await user.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
