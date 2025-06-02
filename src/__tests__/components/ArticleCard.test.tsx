import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ArticleCard from '@/components/ArticleCard';

describe('ArticleCard Component', () => {
  it('renders correctly with default props', () => {
    // El componente ArticleCard tiene valores por defecto, pero TypeScript requiere que proporcionemos las props
    render(<ArticleCard 
      title="How to prepare for your first marathon"
      excerpt="Essential tips for beginners who want to complete their first 42km race successfully and without injuries."
      imageUrl="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80"
      readMoreUrl="#"
    />);
    
    expect(screen.getByText('How to prepare for your first marathon')).toBeInTheDocument();
    expect(screen.getByText('Essential tips for beginners who want to complete their first 42km race successfully and without injuries.')).toBeInTheDocument();
    expect(screen.getByText('May 15, 2023')).toBeInTheDocument();
    expect(screen.getByText('Andes Coach')).toBeInTheDocument();
    expect(screen.getByText('Read more')).toBeInTheDocument();
    
    // Verificar que la imagen existe y tiene la URL correcta
    const image = screen.getByAltText('How to prepare for your first marathon');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80');
  });

  it('renders with custom props', () => {
    const customProps = {
      title: 'Custom Article Title',
      excerpt: 'Custom article excerpt text',
      imageUrl: '/custom-image.jpg',
      readMoreUrl: '/articles/custom',
      date: 'June 1, 2025',
      author: 'John Doe',
    };
    
    render(<ArticleCard {...customProps} />);
    
    expect(screen.getByText('Custom Article Title')).toBeInTheDocument();
    expect(screen.getByText('Custom article excerpt text')).toBeInTheDocument();
    expect(screen.getByText('June 1, 2025')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    const image = screen.getByAltText('Custom Article Title');
    expect(image).toHaveAttribute('src', '/custom-image.jpg');
  });

  it('renders a link when no onClick handler is provided', () => {
    const customUrl = '/articles/test';
    render(<ArticleCard 
      title="Article Title"
      excerpt="Article excerpt"
      imageUrl="/image.jpg"
      readMoreUrl={customUrl} 
    />);
    
    const link = screen.getByText('Read more').closest('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', customUrl);
  });

  it('calls onClick handler when button is clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<ArticleCard 
      title="Article Title"
      excerpt="Article excerpt"
      imageUrl="/image.jpg"
      readMoreUrl="#"
      onClick={handleClick} 
    />);
    
    const button = screen.getByText('Read more').closest('button');
    expect(button).toBeInTheDocument();
    
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders a button instead of a link when onClick is provided', () => {
    const handleClick = vi.fn();
    render(<ArticleCard 
      title="Article Title"
      excerpt="Article excerpt"
      imageUrl="/image.jpg"
      readMoreUrl="#"
      onClick={handleClick} 
    />);
    
    // Verificar que hay un botón y no un enlace
    const button = screen.getByText('Read more').closest('button');
    expect(button).toBeInTheDocument();
    
    const link = screen.queryByRole('link', { name: /Read more/i });
    expect(link).not.toBeInTheDocument();
  });
});
