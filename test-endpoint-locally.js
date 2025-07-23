// ============================================================================
// TEMPORARY LOCAL TEST SERVER
// ============================================================================
// Use this to test the frontend integration before deploying to Railway
// Run with: node test-endpoint-locally.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Simplified onboarding endpoint - Direct to WhatsApp
app.post('/onboarding/start', async (req, res) => {
  try {
    const { intent, language = 'es' } = req.body;
    
    console.log('Received request:', { intent, language });
    
    // Validate input
    if (!intent || !['free', 'premium'].includes(intent)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid intent. Must be "free" or "premium"'
      });
    }

    // WhatsApp configuration
    const WHATSAPP_NUMBER = '593987644414';
    
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
    
    console.log('Generated WhatsApp link:', whatsappLink);
    
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
    service: 'simplified-onboarding-test',
    timestamp: new Date().toISOString(),
    whatsappNumber: 'configured',
    supportedIntents: ['free', 'premium'],
    supportedLanguages: ['es', 'en']
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Test server running on http://localhost:${PORT}`);
  console.log('');
  console.log('Test endpoints:');
  console.log(`POST http://localhost:${PORT}/onboarding/start`);
  console.log(`GET  http://localhost:${PORT}/onboarding/health`);
  console.log('');
  console.log('Test with curl:');
  console.log(`curl -X POST http://localhost:${PORT}/onboarding/start -H "Content-Type: application/json" -d '{"intent": "free", "language": "es"}'`);
});

// ============================================================================
// USAGE INSTRUCTIONS
// ============================================================================
// 1. Save this file as test-endpoint-locally.js
// 2. Install dependencies: npm install express cors
// 3. Run: node test-endpoint-locally.js
// 4. Update your frontend to use http://localhost:3001 instead of Railway URL
// 5. Test the integration
// 6. Once working, deploy the real endpoint to Railway
