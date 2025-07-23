// Add this to your Railway backend (e.g., in routes/onboarding.js or app.js)

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

// Optional: Analytics endpoint for tracking
app.post('/onboarding/analytics', (req, res) => {
  try {
    const { event, intent, language, timestamp } = req.body;
    
    // Log analytics event
    console.log(`Analytics: ${event} - ${intent} (${language}) - ${timestamp}`);
    
    // Here you could send to your analytics service
    // analytics.track(event, { intent, language, timestamp });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ success: false });
  }
});

module.exports = { 
  // Export functions if needed for testing
  generateWhatsAppLink: (intent, language = 'es') => {
    const WHATSAPP_NUMBER = '593987644414';
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
    
    const message = messages[intent]?.[language] || messages[intent].es;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }
};
