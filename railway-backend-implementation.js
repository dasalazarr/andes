// ============================================================================
// ADD THIS CODE TO YOUR RAILWAY BACKEND
// ============================================================================
// Add this to your existing Railway backend file (app.js, server.js, or routes file)
// Place it alongside your existing /onboarding/premium and /onboarding/free endpoints

// Simplified onboarding endpoint - Direct to WhatsApp
app.post('/onboarding/start', async (req, res) => {
  try {
    const { intent, language = 'es' } = req.body;
    
    // Validate input
    if (!intent || !['free', 'premium'].includes(intent)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid intent. Must be "free" or "premium"'
      });
    }

    // WhatsApp configuration
    const WHATSAPP_NUMBER = '593987644414'; // Your WhatsApp number
    
    // Pre-filled messages
    const messages = {
      free: {
        es: 'Hola! Quiero comenzar mi entrenamiento gratuito de running con Andes 🏃‍♂️',
        en: 'Hi! I want to start my free running training with Andes 🏃‍♂️'
      },
      premium: {
        es: 'Hola! Quiero comenzar con Andes Premium ($9.99/mes) para mi entrenamiento de running 🏃‍♂️💎',
        en: 'Hi! I want to start with Andes Premium ($9.99/month) for my running training 🏃‍♂️💎'
      }
    };

    // Get message for intent and language
    const message = messages[intent]?.[language] || messages[intent].es;
    
    // Generate WhatsApp link
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    // Log for analytics (optional)
    console.log(`Simplified onboarding: ${intent} (${language}) - ${new Date().toISOString()}`);
    
    // Return success response
    res.json({
      success: true,
      whatsappLink,
      intent,
      language,
      message: language === 'es' 
        ? 'Redirigiendo a WhatsApp...' 
        : 'Redirecting to WhatsApp...'
    });

  } catch (error) {
    console.error('Error in simplified onboarding:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Please try again later.'
    });
  }
});

// Health check endpoint
app.get('/onboarding/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'simplified-onboarding',
    timestamp: new Date().toISOString(),
    whatsappNumber: 'configured',
    supportedIntents: ['free', 'premium'],
    supportedLanguages: ['es', 'en']
  });
});

// ============================================================================
// TESTING COMMANDS
// ============================================================================

// After deploying, test with these curl commands:

// Test free flow:
// curl -X POST https://v3-production-2670.up.railway.app/onboarding/start \
//   -H "Content-Type: application/json" \
//   -d '{"intent": "free", "language": "es"}'

// Test premium flow:
// curl -X POST https://v3-production-2670.up.railway.app/onboarding/start \
//   -H "Content-Type: application/json" \
//   -d '{"intent": "premium", "language": "es"}'

// Test health check:
// curl https://v3-production-2670.up.railway.app/onboarding/health

// ============================================================================
// EXPECTED RESPONSES
// ============================================================================

// Free flow response:
// {
//   "success": true,
//   "whatsappLink": "https://wa.me/593987644414?text=Hola!%20Quiero%20comenzar%20mi%20entrenamiento%20gratuito%20de%20running%20con%20Andes%20🏃‍♂️",
//   "intent": "free",
//   "language": "es",
//   "message": "Redirigiendo a WhatsApp..."
// }

// Premium flow response:
// {
//   "success": true,
//   "whatsappLink": "https://wa.me/593987644414?text=Hola!%20Quiero%20comenzar%20con%20Andes%20Premium%20($9.99/mes)%20para%20mi%20entrenamiento%20de%20running%20🏃‍♂️💎",
//   "intent": "premium",
//   "language": "es",
//   "message": "Redirigiendo a WhatsApp..."
// }
