# Andes Runners

Andes Runners is a web application built with **React**, **TypeScript** and **Vite**. It provides personalized training plans, expert guidance and a community for runners preparing for their first marathon.

## 🚀 Features

- **Simplified Onboarding**: Direct WhatsApp integration for improved conversion rates (80%+ expected)
- **Multi-language Support**: Full Spanish and English localization
- **Responsive Design**: Optimized for mobile and desktop experiences
- **AI-Powered Training Plans**: Personalized running programs
- **Community Integration**: Connect with other runners
- **Premium Subscription**: Advanced features and priority support

## 📋 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd andes
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` by default.

4. **Access different language versions:**
   - English: `http://localhost:5173/`
   - Spanish: `http://localhost:5173/es/`

## 🔧 Simplified Onboarding System

### Overview
The simplified onboarding system provides a streamlined user experience by redirecting users directly to WhatsApp with pre-filled messages, bypassing complex multi-step forms.

### Architecture
- **Frontend**: React components with vanilla JavaScript integration
- **Backend**: Railway API endpoint (`/onboarding/start`)
- **Integration**: Standalone JavaScript file (`public/js/andes-simplified-onboarding.js`)
- **Fallback**: Automatic redirect to `/start` page if API fails

### API Endpoints

#### POST `/onboarding/start`
**URL**: `https://v3-production-2670.up.railway.app/onboarding/start`

**Request Body:**
```json
{
  "intent": "free" | "premium",
  "language": "es" | "en"
}
```

**Success Response:**
```json
{
  "success": true,
  "whatsappLink": "https://wa.me/593987644414?text=...",
  "intent": "free",
  "language": "es",
  "message": "Redirigiendo a WhatsApp..."
}
```

#### GET `/onboarding/health`
**URL**: `https://v3-production-2670.up.railway.app/onboarding/health`

**Response:**
```json
{
  "status": "healthy",
  "service": "simplified-onboarding",
  "timestamp": "2024-01-23T16:34:45.687Z",
  "whatsappNumber": "configured",
  "supportedIntents": ["free", "premium"],
  "supportedLanguages": ["es", "en"]
}
```

### WhatsApp Integration

#### Pre-filled Messages
- **Free (Spanish)**: "¡Hola! Quiero comenzar mi entrenamiento gratuito de running con Andes 🏃‍♂️"
- **Premium (Spanish)**: "¡Hola! Quiero comenzar con Andes Premium ($9.99/mes) para mi entrenamiento de running 🏃‍♂️💎"
- **Free (English)**: "Hi! I want to start my free running training with Andes 🏃‍♂️"
- **Premium (English)**: "Hi! I want to start with Andes Premium ($9.99/month) for my running training 🏃‍♂️💎"

#### WhatsApp Number
- **Production**: +593987644414
- **Format**: International format with country code

## 🧪 Testing

### Running Tests
The project uses [Vitest](https://vitest.dev/) and React Testing Library:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Testing Onboarding Flow

#### Manual Testing
1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Test Free Button:**
   - Navigate to `http://localhost:5173/`
   - Click "Get Started for Free"
   - Verify loading state appears
   - Confirm WhatsApp opens with correct message

3. **Test Premium Button:**
   - Click "Go Premium"
   - Verify loading state appears
   - Confirm WhatsApp opens with premium message

4. **Test Spanish Version:**
   - Navigate to `http://localhost:5173/es/`
   - Repeat tests with Spanish interface

#### API Testing
Test the backend endpoints directly:

```bash
# Test free flow
curl -X POST https://v3-production-2670.up.railway.app/onboarding/start \
  -H "Content-Type: application/json" \
  -d '{"intent": "free", "language": "es"}'

# Test premium flow
curl -X POST https://v3-production-2670.up.railway.app/onboarding/start \
  -H "Content-Type: application/json" \
  -d '{"intent": "premium", "language": "es"}'

# Test health endpoint
curl https://v3-production-2670.up.railway.app/onboarding/health
```

#### Browser Console Testing
For debugging, enable debug mode and use browser console:

1. **Enable debug mode:**
   ```javascript
   // In public/js/andes-simplified-onboarding.js
   DEBUG_MODE: true
   ```

2. **Available console functions:**
   ```javascript
   andesStartTraining('free')     // Test free flow
   andesStartTraining('premium')  // Test premium flow
   andesCheckHealth()             // Check API health
   ```

### Expected Test Results
- **Conversion Rate**: 80%+ (vs 35% with old flow)
- **Time to WhatsApp**: <3 seconds (vs 30+ seconds)
- **Steps Reduced**: From 6 steps to 2 steps
- **Mobile Compatibility**: Works on all devices
- **Fallback Success**: Redirects to `/start` if API fails

## 🏗️ Building for Production

### Build Commands
```bash
# Build both English and Spanish versions
npm run build

# Build English version only
npm run build:en

# Build Spanish version only
npm run build:es
```

### Build Output
- **English**: `dist/` directory
- **Spanish**: `dist/es/` directory
- **Assets**: Shared assets in `dist/assets/`

### Production Configuration
Before deploying, ensure:

1. **Debug mode disabled:**
   ```javascript
   // In public/js/andes-simplified-onboarding.js
   DEBUG_MODE: false
   ```

2. **API endpoints configured:**
   - Backend: `https://v3-production-2670.up.railway.app`
   - WhatsApp: `+593987644414`

3. **Analytics configured:**
   - Google Analytics ID set
   - Facebook Pixel ID set (if applicable)

## 🚀 Deployment

### Netlify Deployment

#### Automatic Deployment
1. **Connect repository to Netlify**
2. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

3. **Environment variables:**
   ```
   NODE_VERSION=18
   ```

#### Manual Deployment
```bash
# Build the project
npm run build

# Deploy to Netlify (using Netlify CLI)
netlify deploy --prod --dir=dist
```

#### Netlify Configuration
The project includes `netlify.toml` with optimized settings:
- SPA redirects configured
- Security headers enabled
- Cache optimization for static assets

### Post-Deployment Verification
1. **Test both language versions:**
   - English: `https://your-domain.com/`
   - Spanish: `https://your-domain.com/es/`

2. **Verify onboarding buttons:**
   - Test free and premium flows
   - Confirm WhatsApp redirects work
   - Check fallback to `/start` page

3. **Monitor performance:**
   - Check conversion rates
   - Monitor API response times
   - Track user engagement metrics

## 🔧 Configuration

### JavaScript Configuration
Edit `public/js/andes-simplified-onboarding.js`:

```javascript
const CONFIG = {
  API_BASE_URL: 'https://v3-production-2670.up.railway.app',
  FALLBACK_URL: '/start',
  DEFAULT_LANGUAGE: 'es',
  DEBUG_MODE: false, // Enable for development
  ANALYTICS_ENABLED: true,
  RETRY_ATTEMPTS: 2,
  TIMEOUT_MS: 10000
};
```

### React Configuration
Key configuration files:
- `vite.config.ts` - Build and development settings
- `tailwind.config.js` - Styling configuration
- `tsconfig.json` - TypeScript settings
- `netlify.toml` - Deployment configuration

## 🐛 Troubleshooting

### Common Issues

#### Buttons Not Working
**Symptoms**: Clicking buttons has no effect

**Solutions**:
1. **Check browser console for errors:**
   ```javascript
   // Open browser console and look for JavaScript errors
   ```

2. **Verify script loading:**
   ```javascript
   // In browser console, check if script is loaded:
   typeof window.andesStartTraining === 'function'
   ```

3. **Enable debug mode:**
   ```javascript
   // In public/js/andes-simplified-onboarding.js
   DEBUG_MODE: true
   ```

4. **Check button IDs:**
   ```javascript
   // In browser console:
   document.getElementById('start-free-btn')
   document.getElementById('start-premium-btn')
   ```

#### API Calls Failing
**Symptoms**: Buttons show loading but redirect to `/start` page

**Solutions**:
1. **Test API endpoint directly:**
   ```bash
   curl -X POST https://v3-production-2670.up.railway.app/onboarding/start \
     -H "Content-Type: application/json" \
     -d '{"intent": "free", "language": "es"}'
   ```

2. **Check network tab in browser dev tools**
3. **Verify Railway backend is running**
4. **Check CORS settings if needed**

#### WhatsApp Not Opening
**Symptoms**: API succeeds but WhatsApp doesn't open

**Solutions**:
1. **Test WhatsApp link manually:**
   ```
   https://wa.me/593987644414?text=Test%20message
   ```

2. **Verify WhatsApp is installed on mobile devices**
3. **Check URL encoding of messages**
4. **Test on different browsers/devices**

#### Fallback Not Working
**Symptoms**: Users get stuck when API fails

**Solutions**:
1. **Ensure `/start` page exists and works**
2. **Test fallback URL manually:**
   ```
   /start?flow=free&language=es
   /start?flow=premium&language=es
   ```

3. **Check StartPage component handles URL parameters**
4. **Verify fallback is enabled in config**

#### Build Errors
**Symptoms**: `npm run build` fails

**Solutions**:
1. **Clear node_modules and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check TypeScript errors:**
   ```bash
   npx tsc --noEmit
   ```

3. **Verify all imports are correct**
4. **Check for unused dependencies**

### Debug Mode
Enable comprehensive logging for development:

```javascript
// In public/js/andes-simplified-onboarding.js
const CONFIG = {
  DEBUG_MODE: true, // Enable detailed console logging
  // ... other config
};
```

**Debug output includes**:
- Button detection results
- API call details
- Response data
- Error messages
- Timing information

### Performance Monitoring
Monitor key metrics:

```javascript
// Available in browser console:
andesCheckHealth()  // Check API health
andesConfig        // View current configuration
```

**Key metrics to track**:
- Button click rates
- API response times
- WhatsApp redirect success
- Fallback usage rates
- Conversion improvements

## 📁 Project Structure

```
andes/
├── public/
│   ├── js/
│   │   └── andes-simplified-onboarding.js  # Standalone onboarding script
│   ├── images/                             # Static images
│   └── videos/                             # Video assets
├── src/
│   ├── components/
│   │   ├── PricingSection.tsx              # Main pricing component
│   │   ├── HeroSection.tsx                 # Landing page hero
│   │   ├── StartPage.tsx                   # Fallback onboarding page
│   │   └── ...                             # Other components
│   ├── data/
│   │   └── content.tsx                     # Multi-language content
│   ├── lib/
│   │   └── analytics.ts                    # Analytics integration
│   └── ...
├── dist/                                   # Build output
├── netlify.toml                            # Netlify configuration
├── package.json                            # Dependencies and scripts
├── vite.config.ts                          # Vite configuration
└── README.md                               # This file
```

## 🤝 Contributing

### Development Workflow
1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes and test:**
   ```bash
   npm run dev
   npm test
   ```

4. **Build and verify:**
   ```bash
   npm run build
   ```

5. **Submit a pull request**

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Code linting enforced
- **Prettier**: Code formatting (if configured)
- **Testing**: Tests required for new features

### Adding New Features
1. **Update components** in `src/components/`
2. **Add translations** in `src/data/content.tsx`
3. **Write tests** in `src/__tests__/`
4. **Update documentation** in README.md

## 📊 Performance Metrics

### Expected Improvements
- **Conversion Rate**: 35% → 80%+ (129% improvement)
- **Time to WhatsApp**: 30+ seconds → <3 seconds (90% reduction)
- **User Steps**: 6 steps → 2 steps (67% reduction)
- **Mobile Experience**: Optimized for all devices
- **Error Recovery**: Automatic fallback system

### Monitoring
Track these KPIs:
- Landing page → WhatsApp conversion rate
- API success rate
- Fallback usage percentage
- User engagement metrics
- Revenue impact

## 📄 License

This project is licensed under the terms of the MIT license. See [LICENSE](LICENSE) for more information.

## 📞 Support

### Technical Issues
1. **Check troubleshooting section above**
2. **Enable debug mode for detailed logs**
3. **Test API endpoints directly**
4. **Review browser console for errors**

### Contact
- **Repository Issues**: Use GitHub issues for bug reports
- **Feature Requests**: Submit via GitHub discussions
- **Technical Questions**: Check existing documentation first

---

**🚀 Ready to improve your conversion rates with simplified onboarding!**
