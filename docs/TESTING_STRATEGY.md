# 🧪 Andes Runners - Comprehensive Testing Strategy

## 📋 **Testing Overview**

This document outlines the comprehensive testing strategy for the Andes Runners platform transformation, ensuring quality, reliability, and performance across all development phases.

---

## 🎯 **Testing Pyramid**

```
                    ┌─────────────────┐
                    │   E2E Tests     │ ← 10% (Critical User Journeys)
                    │   (Cypress)     │
                ┌───┴─────────────────┴───┐
                │   Integration Tests     │ ← 20% (API & Component Integration)
                │   (Jest + Supertest)    │
            ┌───┴─────────────────────────┴───┐
            │      Unit Tests                 │ ← 70% (Functions, Components, Utils)
            │   (Jest + Testing Library)      │
            └─────────────────────────────────┘
```

### **Testing Distribution Goals**
- **Unit Tests**: 70% - Fast, isolated, comprehensive coverage
- **Integration Tests**: 20% - API endpoints, component interactions
- **End-to-End Tests**: 10% - Critical user flows, business scenarios

---

## 🔧 **Testing Framework Setup**

### **Frontend Testing Stack**
```typescript
// Package.json dependencies
{
  "devDependencies": {
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/user-event": "^14.4.3",
    "jest": "^29.5.0",
    "jest-environment-jsdom": "^29.5.0",
    "cypress": "^12.17.0",
    "msw": "^1.2.2", // Mock Service Worker
    "vitest": "^0.32.0" // Alternative to Jest for Vite
  }
}

// Jest Configuration (jest.config.js)
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### **Backend Testing Stack**
```typescript
// Package.json dependencies
{
  "devDependencies": {
    "jest": "^29.5.0",
    "supertest": "^6.3.3",
    "@types/supertest": "^2.0.12",
    "ts-jest": "^29.1.0",
    "testcontainers": "^9.8.0", // Database testing
    "nock": "^13.3.1" // HTTP mocking
  }
}

// Jest Configuration for Backend
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    }
  }
};
```

---

## 🧪 **Unit Testing Strategy**

### **Frontend Component Testing**
```typescript
// Example: TrainingPlanCard Component Test
import { render, screen, fireEvent } from '@testing-library/react';
import { TrainingPlanCard } from '@/components/TrainingPlanCard';
import { mockTrainingPlan } from '@/tests/mocks';

describe('TrainingPlanCard', () => {
  const mockOnClick = jest.fn();
  
  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders training plan information correctly', () => {
    render(
      <TrainingPlanCard 
        plan={mockTrainingPlan} 
        language="en" 
        onClick={mockOnClick} 
      />
    );
    
    expect(screen.getByText(mockTrainingPlan.title.en)).toBeInTheDocument();
    expect(screen.getByText(mockTrainingPlan.description.en)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    render(
      <TrainingPlanCard 
        plan={mockTrainingPlan} 
        language="en" 
        onClick={mockOnClick} 
      />
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledWith(mockTrainingPlan);
  });

  it('displays content in Spanish when language is es', () => {
    render(
      <TrainingPlanCard 
        plan={mockTrainingPlan} 
        language="es" 
        onClick={mockOnClick} 
      />
    );
    
    expect(screen.getByText(mockTrainingPlan.title.es)).toBeInTheDocument();
    expect(screen.getByText(mockTrainingPlan.description.es)).toBeInTheDocument();
  });
});
```

### **Backend API Testing**
```typescript
// Example: User Authentication API Test
import request from 'supertest';
import { app } from '@/app';
import { createTestUser, cleanupDatabase } from '@/tests/helpers';

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    await cleanupDatabase();
  });

  it('should login with valid credentials', async () => {
    const testUser = await createTestUser({
      email: 'test@example.com',
      password: 'password123'
    });

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      })
      .expect(200);

    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user.email).toBe('test@example.com');
  });

  it('should reject invalid credentials', async () => {
    await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword'
      })
      .expect(401);
  });

  it('should validate required fields', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({})
      .expect(400);

    expect(response.body.errors).toContain('Email is required');
    expect(response.body.errors).toContain('Password is required');
  });
});
```

### **Utility Function Testing**
```typescript
// Example: Analytics Utility Test
import { analytics } from '@/utils/analytics';

// Mock gtag
const mockGtag = jest.fn();
Object.defineProperty(window, 'gtag', {
  value: mockGtag,
  writable: true
});

describe('Analytics Utility', () => {
  beforeEach(() => {
    mockGtag.mockClear();
  });

  it('should track CTA clicks correctly', () => {
    analytics.trackCTAClick('primary', 'hero_section', 'en');
    
    expect(mockGtag).toHaveBeenCalledWith('event', 'cta_click', {
      event_category: 'conversion',
      cta_type: 'primary',
      cta_location: 'hero_section',
      language: 'en',
      page_location: expect.any(String)
    });
  });

  it('should handle missing gtag gracefully', () => {
    delete (window as any).gtag;
    
    expect(() => {
      analytics.trackCTAClick('primary', 'hero_section', 'en');
    }).not.toThrow();
  });
});
```

---

## 🔗 **Integration Testing Strategy**

### **API Integration Tests**
```typescript
// Example: E-commerce Integration Test
import { TestContainer } from 'testcontainers';
import { Client } from 'pg';
import request from 'supertest';
import { app } from '@/app';

describe('E-commerce Integration', () => {
  let container: TestContainer;
  let client: Client;

  beforeAll(async () => {
    // Start test database container
    container = await new TestContainer('postgres:15')
      .withEnvironment({ POSTGRES_DB: 'test', POSTGRES_PASSWORD: 'test' })
      .withExposedPorts(5432)
      .start();

    // Connect to test database
    client = new Client({
      host: container.getHost(),
      port: container.getMappedPort(5432),
      database: 'test',
      username: 'postgres',
      password: 'test'
    });
    
    await client.connect();
  });

  afterAll(async () => {
    await client.end();
    await container.stop();
  });

  it('should complete full purchase flow', async () => {
    // 1. Create user
    const userResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'buyer@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe'
      });

    const { token } = userResponse.body;

    // 2. Add item to cart
    await request(app)
      .post('/api/cart/add')
      .set('Authorization', `Bearer ${token}`)
      .send({
        productId: 'training-plan-5k',
        quantity: 1
      })
      .expect(200);

    // 3. Create order
    const orderResponse = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        shippingAddress: {
          street: '123 Main St',
          city: 'Anytown',
          country: 'US',
          postalCode: '12345'
        },
        paymentMethod: 'stripe'
      })
      .expect(201);

    expect(orderResponse.body).toHaveProperty('orderId');
    expect(orderResponse.body.status).toBe('pending');
  });
});
```

### **Component Integration Tests**
```typescript
// Example: Form Integration Test
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MultiStepPlanForm } from '@/components/MultiStepPlanForm';
import { server } from '@/tests/mocks/server';

describe('MultiStepPlanForm Integration', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should complete full form submission flow', async () => {
    render(<MultiStepPlanForm language="en" />);

    // Step 1: Goal Selection
    fireEvent.click(screen.getByLabelText('5K Training Plan'));
    fireEvent.change(screen.getByLabelText('Target Date'), {
      target: { value: '2024-06-01' }
    });
    fireEvent.click(screen.getByText('Next'));

    // Step 2: Contact Information
    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText('WhatsApp'), {
      target: { value: '+1234567890' }
    });
    fireEvent.click(screen.getByLabelText(/I agree to/));

    // Submit form
    fireEvent.click(screen.getByText('Submit'));

    // Verify success
    await waitFor(() => {
      expect(screen.getByText('Thank you!')).toBeInTheDocument();
    });
  });
});
```

---

## 🌐 **End-to-End Testing Strategy**

### **Cypress E2E Tests**
```typescript
// cypress/e2e/user-journey.cy.ts
describe('Complete User Journey', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should complete signup to first training session', () => {
    // 1. Landing page interaction
    cy.get('[data-testid="hero-cta-primary"]').click();
    
    // 2. Plan selection
    cy.get('[data-testid="plan-5k"]').click();
    cy.get('[data-testid="plan-download-btn"]').click();

    // 3. Lead magnet form
    cy.get('[data-testid="lead-form"]').should('be.visible');
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('input[name="whatsapp"]').type('+1234567890');
    cy.get('input[type="checkbox"]').check();
    cy.get('button[type="submit"]').click();

    // 4. Verify success
    cy.get('[data-testid="success-message"]').should('contain', 'Thank you');
    cy.get('[data-testid="whatsapp-redirect"]').should('be.visible');

    // 5. WhatsApp redirect
    cy.get('[data-testid="whatsapp-redirect"]').click();
    cy.url().should('include', 'wa.me');
  });

  it('should handle language switching correctly', () => {
    // Start in English
    cy.get('[data-testid="hero-title"]').should('contain', 'Crush your first marathon');
    
    // Switch to Spanish
    cy.visit('/es/');
    cy.get('[data-testid="hero-title"]').should('contain', 'Conquista tu primera maratón');
    
    // Verify all content is in Spanish
    cy.get('[data-testid="hero-cta-primary"]').should('contain', 'Empieza gratis');
    cy.get('[data-testid="benefits-title"]').should('contain', '¿Por Qué Elegir Andes?');
  });
});
```

### **Performance Testing**
```typescript
// cypress/e2e/performance.cy.ts
describe('Performance Tests', () => {
  it('should meet Core Web Vitals thresholds', () => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        // Mock performance observer
        win.performance.mark = cy.stub();
        win.performance.measure = cy.stub();
      }
    });

    // Test Largest Contentful Paint (LCP)
    cy.window().then((win) => {
      cy.wrap(win.performance.getEntriesByType('largest-contentful-paint'))
        .should('have.length.greaterThan', 0)
        .then((entries) => {
          const lcp = entries[entries.length - 1].startTime;
          expect(lcp).to.be.lessThan(2500); // 2.5s threshold
        });
    });

    // Test First Input Delay (FID) simulation
    cy.get('[data-testid="hero-cta-primary"]').click();
    cy.window().then((win) => {
      // Verify interaction responsiveness
      expect(win.performance.now()).to.be.lessThan(100); // 100ms threshold
    });
  });

  it('should load all critical resources quickly', () => {
    cy.intercept('GET', '/videos/video2.mp4').as('heroVideo');
    cy.intercept('GET', '/api/content/hero').as('heroContent');

    cy.visit('/');

    // Verify critical resources load within thresholds
    cy.wait('@heroVideo').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
    });

    cy.wait('@heroContent').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
      expect(interception.response?.duration).to.be.lessThan(500);
    });
  });
});
```

---

## 🔒 **Security Testing Strategy**

### **Authentication Security Tests**
```typescript
// tests/security/auth.test.ts
describe('Authentication Security', () => {
  it('should prevent SQL injection in login', async () => {
    const maliciousPayload = {
      email: "admin@example.com'; DROP TABLE users; --",
      password: 'password'
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(maliciousPayload)
      .expect(400);

    expect(response.body.error).toContain('Invalid email format');
  });

  it('should prevent brute force attacks', async () => {
    const attempts = Array(6).fill(null).map(() => 
      request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        })
    );

    const responses = await Promise.all(attempts);
    
    // First 5 attempts should return 401
    responses.slice(0, 5).forEach(response => {
      expect(response.status).toBe(401);
    });

    // 6th attempt should be rate limited
    expect(responses[5].status).toBe(429);
    expect(responses[5].body.error).toContain('Too many attempts');
  });

  it('should validate JWT tokens properly', async () => {
    const invalidToken = 'invalid.jwt.token';

    await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${invalidToken}`)
      .expect(401);
  });
});
```

### **Data Validation Tests**
```typescript
// tests/security/validation.test.ts
describe('Input Validation Security', () => {
  it('should sanitize XSS attempts in user input', async () => {
    const xssPayload = {
      name: '<script>alert("XSS")</script>',
      email: 'test@example.com',
      message: '<img src="x" onerror="alert(1)">'
    };

    const response = await request(app)
      .post('/api/contact')
      .send(xssPayload)
      .expect(400);

    expect(response.body.errors).toContain('Invalid characters in name');
    expect(response.body.errors).toContain('Invalid characters in message');
  });

  it('should prevent file upload vulnerabilities', async () => {
    const maliciousFile = Buffer.from('<?php system($_GET["cmd"]); ?>');

    await request(app)
      .post('/api/upload/avatar')
      .attach('file', maliciousFile, 'malicious.php')
      .expect(400);
  });
});
```

---

## 📊 **Testing Metrics & Reporting**

### **Coverage Requirements**
```typescript
// Coverage thresholds by component type
const coverageThresholds = {
  components: {
    statements: 85,
    branches: 80,
    functions: 85,
    lines: 85
  },
  utils: {
    statements: 95,
    branches: 90,
    functions: 95,
    lines: 95
  },
  api: {
    statements: 90,
    branches: 85,
    functions: 90,
    lines: 90
  },
  critical: {
    statements: 100,
    branches: 100,
    functions: 100,
    lines: 100
  }
};
```

### **Automated Testing Pipeline**
```yaml
# .github/workflows/test.yml
name: Test Suite
on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:coverage
      
  integration-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:integration
      
  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: cypress-io/github-action@v5
        with:
          build: npm run build
          start: npm run preview
          wait-on: 'http://localhost:4173'
```

---

*This comprehensive testing strategy ensures high-quality, reliable, and secure delivery of the Andes Runners platform across all development phases.*
