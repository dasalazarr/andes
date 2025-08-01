// Simple script to create placeholder testimonial images
// This would normally be done with actual photos, but for demo purposes we'll create placeholders

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create testimonials directory if it doesn't exist
const testimonialsDir = path.join(__dirname, '../public/images/testimonials');
if (!fs.existsSync(testimonialsDir)) {
  fs.mkdirSync(testimonialsDir, { recursive: true });
}

// Create placeholder files (these would be replaced with actual WebP images)
const testimonialImages = [
  'ana-perez.webp',
  'carlos-lopez.webp',
  'sofia-gomez.webp',
  'miguel-torres.webp',
  'laura-martinez.webp'
];

// Create empty placeholder files
testimonialImages.forEach(filename => {
  const filePath = path.join(testimonialsDir, filename);
  if (!fs.existsSync(filePath)) {
    // Create a small placeholder file
    fs.writeFileSync(filePath, '');
    console.log(`Created placeholder: ${filename}`);
  }
});

console.log('Testimonial image placeholders created!');
console.log('Note: Replace these with actual optimized WebP images < 100KB each');
