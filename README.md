# Andes Runners

Andes Runners is a web application built with **React**, **TypeScript** and **Vite**. It provides personalized training plans, expert guidance and a community for runners preparing for their first marathon.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` by default.

## Building for production

To create an optimized production build run:

```bash
npm run build
```

This command outputs the compiled site to the `dist` directory. Separate scripts are available to build only the English or Spanish version via `npm run build:en` and `npm run build:es`.

## Running tests

The project uses [Vitest](https://vitest.dev/) and React Testing Library. Execute all tests with:

```bash
npm test
```

Use `npm run test:watch` to run tests in watch mode or `npm run test:coverage` to generate coverage information.

## License

This project is licensed under the terms of the MIT license. See [LICENSE](LICENSE) for more information.
