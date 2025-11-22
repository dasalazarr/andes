# Gemini Project Overview: Andes Runners

## Project Overview

This is a web application for "Andes Runners," a service that provides personalized training plans for runners. The application is built with **React**, **TypeScript**, and **Vite**, and styled with **Tailwind CSS**. It supports both English and Spanish languages. A key feature is a simplified onboarding process that integrates with WhatsApp to improve user conversion.

The target audience includes two main profiles:
*   **The Sedentary Dreamer:** Someone who has never run seriously but dreams of completing a race.
*   **The Occasional Athlete:** A casual runner who wants to tackle a new challenge like a marathon.

The core value proposition is to provide a transformative experience, focusing on the user's personal journey and achievement, rather than just the technology behind the app. The goal is to be a motivational and supportive coach, helping users overcome their fears and achieve their goals.

## Building and Running

### Development

To run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To build the application for production:

```bash
npm run build
```

This command builds both the English and Spanish versions of the site. The output is generated in the `dist` directory, with the Spanish version in `dist/es`.

### Testing

To run the test suite:

```bash
npm test
```

Tests are written with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

## Development Conventions

*   **Languages**: The application is fully localized in English and Spanish. Content is managed in `src/data/content.tsx`.
*   **Styling**: The project uses Tailwind CSS for styling. Configuration is in `tailwind.config.js`.
*   **Onboarding**: A simplified onboarding flow using WhatsApp is implemented in `public/js/andes-simplified-onboarding.js`. This is a key feature of the application.
*   **Deployment**: The project is deployed on Netlify. The configuration is in `netlify.toml`.

### Content and Copywriting

The content strategy is centered on the user's motivations, ambitions, and fears. The tone should be friendly, encouraging, and human, like a personal coach.

*   **Focus on Benefits:** Emphasize the transformative benefits of the training, such as preventing injuries, gaining confidence, and achieving personal goals.
*   **Address Fears:** Directly address common fears and mental barriers, such as the belief that one is not "a runner."
*   **Social Proof:** Incorporate testimonials and success stories to build trust and inspire new users.
*   **Clear Calls to Action:** Use value-oriented calls to action that clearly communicate the benefit to the user.