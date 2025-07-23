// ============================================================================
// ANDES SIMPLIFIED ONBOARDING - RAILWAY BACKEND IMPLEMENTATION
// ============================================================================
// Add this code to your Railway backend (app.js, server.js, or routes file)
// This creates the complete /onboarding/start endpoint system

// Simplified onboarding endpoint - Direct to WhatsApp
app.post('/onboarding/start', async (req, res) => {
  try {
    const { intent, language = 'es' } = req.body;
    const timestamp = new Date().toISOString();
    const userIP = req.ip || req.connection.remoteAddress;
    
    // Enhanced logging for analytics
    console.log(`[${timestamp}] Simplified onboarding request:`, {
      intent,
      language,
      userIP,
      userAgent: req.get('User-Agent')
    });
    
    // Validate input
    if (!intent || !['free', 'premium'].includes(intent)) {
      console.log(`[${timestamp}] Invalid intent: ${intent}`);
      return res.status(400).json({
        success: false,
        error: language === 'es' 
          ? 'Intención inválida. Debe ser "free" o "premium"'
          : 'Invalid intent. Must be "free" or "premium"',
        code: 'INVALID_INTENT'
      });
    }

    // WhatsApp configuration
    const WHATSAPP_NUMBER = '593987644414';
    
    // Pre-filled messages with enhanced content
    const messages = {
      free: {
        es: 'Hola! Quiero comenzar mi entrenamiento gratuito de running con Andes 🏃‍♂️\n\nEstoy listo para comenzar mi preparación para maratón con el plan gratuito.',
        en: 'Hi! I want to start my free running training with Andes 🏃‍♂️\n\nI\'m ready to begin my marathon preparation with the free plan.'
      },
      premium: {
        es: 'Hola! Quiero comenzar con Andes Premium ($9.99/mes) para mi entrenamiento de running 🏃‍♂️💎\n\nEstoy interesado en el plan premium con coaching personalizado.',
        en: 'Hi! I want to start with Andes Premium ($9.99/month) for my running training 🏃‍♂️💎\n\nI\'m interested in the premium plan with personalized coaching.'
      }
    };

    // Get message for intent and language
    const message = messages[intent]?.[language] || messages[intent].es;
    
    // Generate WhatsApp link
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    // Success logging
    console.log(`[${timestamp}] WhatsApp link generated successfully:`, {
      intent,
      language,
      linkLength: whatsappLink.length,
      messagePreview: message.substring(0, 50) + '...'
    });
    
    // Return success response
    const response = {
      success: true,
      whatsappLink,
      intent,
      language,
      message: language === 'es' 
        ? 'Redirigiendo a WhatsApp...' 
        : 'Redirecting to WhatsApp...',
      timestamp,
      whatsappNumber: WHATSAPP_NUMBER
    };
    
    res.json(response);

  } catch (error) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] Error in simplified onboarding:`, {
      error: error.message,
      stack: error.stack,
      body: req.body
    });
    
    res.status(500).json({
      success: false,
      error: 'Server error. Please try again later.',
      code: 'INTERNAL_ERROR',
      timestamp
    });
  }
});

// Health check endpoint with detailed status
app.get('/onboarding/health', (req, res) => {
  const timestamp = new Date().toISOString();
  
  res.json({
    status: 'healthy',
    service: 'andes-simplified-onboarding',
    version: '1.0.0',
    timestamp,
    whatsappNumber: '+593987644414',
    supportedIntents: ['free', 'premium'],
    supportedLanguages: ['es', 'en'],
    endpoints: {
      start: '/onboarding/start',
      health: '/onboarding/health',
      analytics: '/onboarding/analytics'
    },
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Analytics endpoint for tracking user interactions
app.post('/onboarding/analytics', (req, res) => {
  try {
    const { event, intent, language, timestamp, metadata } = req.body;
    const serverTimestamp = new Date().toISOString();
    
    // Enhanced analytics logging
    console.log(`[ANALYTICS] ${serverTimestamp}:`, {
      event,
      intent,
      language,
      clientTimestamp: timestamp,
      serverTimestamp,
      userIP: req.ip,
      userAgent: req.get('User-Agent'),
      metadata
    });
    
    // Here you can integrate with your analytics service
    // Example: Google Analytics, Mixpanel, Amplitude, etc.
    // await analyticsService.track(event, { intent, language, ...metadata });
    
    res.json({ 
      success: true, 
      recorded: serverTimestamp,
      event 
    });
    
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Analytics recording failed' 
    });
  }
});

// CORS middleware for frontend integration (if needed)
app.use('/onboarding/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Error handling middleware
app.use('/onboarding/*', (error, req, res, next) => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] Onboarding error:`, error);
  
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    code: 'SYSTEM_ERROR',
    timestamp
  });
});

// ============================================================================
// DEPLOYMENT VERIFICATION COMMANDS
// ============================================================================

// After deployment, verify with these commands:

// Test free flow:
// curl -X POST https://v3-production-2670.up.railway.app/onboarding/start \
//   -H "Content-Type: application/json" \
//   -d '{"intent": "free", "language": "es"}'

// Test premium flow:
// curl -X POST https://v3-production-2670.up.railway.app/onboarding/start \
//   -H "Content-Type: application/json" \
//   -d '{"intent": "premium", "language": "en"}'

// Test health check:
// curl https://v3-production-2670.up.railway.app/onboarding/health

// Test analytics:
// curl -X POST https://v3-production-2670.up.railway.app/onboarding/analytics \
//   -H "Content-Type: application/json" \
//   -d '{"event": "test", "intent": "free", "language": "es", "timestamp": "2024-01-23T10:00:00Z"}'
