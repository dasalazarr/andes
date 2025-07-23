# 🧪 Andes Simplified Onboarding - End-to-End Testing Guide

## 🎯 Testing Overview

This guide covers comprehensive testing of the complete simplified onboarding system from landing page to WhatsApp integration.

## 📋 Pre-Testing Checklist

### Backend Verification
- [ ] Railway backend deployed with new `/onboarding/start` endpoint
- [ ] Health check endpoint responding: `GET /onboarding/health`
- [ ] WhatsApp number +593987644414 is active and monitored
- [ ] Analytics endpoint functional: `POST /onboarding/analytics`

### Frontend Verification
- [ ] React components updated with new button IDs
- [ ] JavaScript integration script added to HTML
- [ ] Netlify deployment completed successfully
- [ ] Both English and Spanish versions deployed

## 🔧 Backend API Testing

### 1. Health Check Test
```bash
curl https://v3-production-2670.up.railway.app/onboarding/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "service": "andes-simplified-onboarding",
  "version": "1.0.0",
  "timestamp": "2024-01-23T...",
  "whatsappNumber": "+593987644414",
  "supportedIntents": ["free", "premium"],
  "supportedLanguages": ["es", "en"]
}
```

### 2. Free Flow Test (Spanish)
```bash
curl -X POST https://v3-production-2670.up.railway.app/onboarding/start \
  -H "Content-Type: application/json" \
  -d '{"intent": "free", "language": "es"}'
```

**Expected Response:**
```json
{
  "success": true,
  "whatsappLink": "https://wa.me/593987644414?text=Hola!%20Quiero%20comenzar...",
  "intent": "free",
  "language": "es",
  "message": "Redirigiendo a WhatsApp...",
  "timestamp": "2024-01-23T...",
  "whatsappNumber": "593987644414"
}
```

### 3. Premium Flow Test (English)
```bash
curl -X POST https://v3-production-2670.up.railway.app/onboarding/start \
  -H "Content-Type: application/json" \
  -d '{"intent": "premium", "language": "en"}'
```

### 4. Error Handling Test
```bash
curl -X POST https://v3-production-2670.up.railway.app/onboarding/start \
  -H "Content-Type: application/json" \
  -d '{"intent": "invalid", "language": "es"}'
```

**Expected Response:**
```json
{
  "success": false,
  "error": "Intención inválida. Debe ser \"free\" o \"premium\"",
  "code": "INVALID_INTENT"
}
```

## 🌐 Frontend Integration Testing

### 1. Landing Page Button Verification

#### Spanish Version (https://andesrc.com/es/)
- [ ] Navigate to Spanish landing page
- [ ] Verify "Comenzar Gratis" button has `id="start-free-btn"`
- [ ] Verify "Comenzar Premium" button has `id="start-premium-btn"`
- [ ] Check browser console for initialization messages

#### English Version (https://andesrc.com/)
- [ ] Navigate to English landing page
- [ ] Verify "Start Free" button has `id="start-free-btn"`
- [ ] Verify "Start Premium" button has `id="start-premium-btn"`
- [ ] Check browser console for initialization messages

### 2. JavaScript Console Verification

Open browser DevTools and look for these messages:
```
[Andes Onboarding] Initializing Andes Simplified Onboarding System
[Andes Onboarding] Free button initialized
[Andes Onboarding] Premium button initialized
[Andes Onboarding] System health check: HEALTHY
[Andes Onboarding] Andes Simplified Onboarding System loaded
```

## 🚀 Complete User Journey Testing

### Test Case 1: Free Flow Success (Spanish)
1. **Setup**: Navigate to `https://andesrc.com/es/`
2. **Action**: Click "Comenzar Gratis" button
3. **Expected Behavior**:
   - Button shows "🔄 Preparando entrenamiento gratuito..."
   - Button becomes disabled and shows loading state
   - After ~1.5 seconds: "✅ Redirigiendo a WhatsApp..."
   - Redirects to WhatsApp with pre-filled message
4. **WhatsApp Message Should Contain**:
   ```
   Hola! Quiero comenzar mi entrenamiento gratuito de running con Andes 🏃‍♂️
   
   Estoy listo para comenzar mi preparación para maratón con el plan gratuito.
   ```

### Test Case 2: Premium Flow Success (English)
1. **Setup**: Navigate to `https://andesrc.com/`
2. **Action**: Click "Start Premium" button
3. **Expected Behavior**:
   - Button shows "🔄 Activating Andes Premium..."
   - Button becomes disabled and shows loading state
   - After ~1.5 seconds: "✅ Redirecting to WhatsApp..."
   - Redirects to WhatsApp with pre-filled message
4. **WhatsApp Message Should Contain**:
   ```
   Hi! I want to start with Andes Premium ($9.99/month) for my running training 🏃‍♂️💎
   
   I'm interested in the premium plan with personalized coaching.
   ```

### Test Case 3: Fallback Scenario
1. **Setup**: Temporarily break the API (change URL in script)
2. **Action**: Click any button
3. **Expected Behavior**:
   - Button shows loading state
   - After retry attempts: "🔄 Redirigiendo al formulario..."
   - Redirects to `/start?flow=free` or `/start?flow=premium`
   - Original `/start` page should work normally

### Test Case 4: Network Timeout
1. **Setup**: Slow down network in DevTools (Slow 3G)
2. **Action**: Click any button
3. **Expected Behavior**:
   - Button shows loading state
   - After timeout: Falls back to `/start` page
   - Analytics event "onboarding_error" recorded

## 📱 Mobile Testing

### iOS Safari
- [ ] Test on iPhone (Safari)
- [ ] Verify WhatsApp app opens correctly
- [ ] Check button touch targets are adequate
- [ ] Verify loading states display properly

### Android Chrome
- [ ] Test on Android device (Chrome)
- [ ] Verify WhatsApp app opens correctly
- [ ] Check responsive design
- [ ] Test fallback functionality

## 🔍 Analytics Verification

### Backend Analytics
Check Railway logs for these entries:
```
[2024-01-23T...] Simplified onboarding request: { intent: 'free', language: 'es', ... }
[ANALYTICS] 2024-01-23T...: { event: 'onboarding_start_clicked', intent: 'free', ... }
[2024-01-23T...] WhatsApp link generated successfully: { intent: 'free', ... }
```

### Google Analytics (if configured)
- [ ] Event: `onboarding_start_clicked`
- [ ] Event: `onboarding_redirect_success`
- [ ] Event: `onboarding_error` (for fallback scenarios)
- [ ] Event: `onboarding_fallback_used`

## 🚨 Error Scenarios Testing

### 1. Backend Down
- [ ] Stop Railway service temporarily
- [ ] Test button clicks → Should fallback to `/start`
- [ ] Verify error logging in console

### 2. Invalid Response
- [ ] Modify backend to return invalid JSON
- [ ] Test button clicks → Should retry then fallback
- [ ] Verify retry logic works (2 attempts)

### 3. WhatsApp Link Issues
- [ ] Test generated WhatsApp links manually
- [ ] Verify URL encoding is correct
- [ ] Check message formatting in WhatsApp

## 📊 Performance Testing

### Load Time Verification
- [ ] Page load time < 3 seconds
- [ ] JavaScript initialization < 500ms
- [ ] API response time < 2 seconds
- [ ] WhatsApp redirect < 1.5 seconds after success

### Concurrent Users
- [ ] Test multiple simultaneous button clicks
- [ ] Verify backend handles concurrent requests
- [ ] Check for race conditions

## ✅ Success Criteria

### Backend
- [ ] All API endpoints respond correctly
- [ ] Error handling works for all scenarios
- [ ] Analytics logging functional
- [ ] Performance within acceptable limits

### Frontend
- [ ] Buttons have correct IDs and event listeners
- [ ] Loading states display properly
- [ ] Language detection works correctly
- [ ] Fallback mechanism functional

### Integration
- [ ] Complete user journey works end-to-end
- [ ] WhatsApp integration successful
- [ ] Analytics tracking operational
- [ ] Mobile experience optimized

### Production
- [ ] Railway deployment stable
- [ ] Netlify deployment successful
- [ ] Both language versions functional
- [ ] Monitoring and logging active

## 🔧 Debugging Tools

### Browser DevTools
```javascript
// Check system status
andesCheckHealth()

// Manual trigger
andesStartTraining('free')

// View configuration
console.log(andesConfig)
```

### Railway Logs
```bash
# View real-time logs
railway logs --follow

# Filter onboarding logs
railway logs | grep "onboarding"
```

### Test Commands
```bash
# Quick health check
curl https://v3-production-2670.up.railway.app/onboarding/health

# Test both flows
curl -X POST https://v3-production-2670.up.railway.app/onboarding/start -H "Content-Type: application/json" -d '{"intent": "free", "language": "es"}'
curl -X POST https://v3-production-2670.up.railway.app/onboarding/start -H "Content-Type: application/json" -d '{"intent": "premium", "language": "en"}'
```

## 📞 Production Validation

### Final Checklist
- [ ] All tests pass in staging environment
- [ ] WhatsApp number +593987644414 is monitored
- [ ] Analytics dashboard configured
- [ ] Error alerting set up
- [ ] Performance monitoring active
- [ ] Rollback plan prepared

**Status**: Ready for production deployment ✅
