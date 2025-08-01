// BACKEND IMPLEMENTATION FOR ANDES ONBOARDING API
// This should be deployed to Railway at: https://v3-production-2670.up.railway.app

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// WhatsApp configuration
const WHATSAPP_CONFIG = {
  phoneNumber: '+1234567890', // Replace with actual WhatsApp Business number
  baseUrl: 'https://wa.me'
};

// Bilingual message templates - Updated for marathon focus
const MESSAGE_TEMPLATES = {
  free: {
    es: 'Hola Andes 👋, quiero mi plan para correr mi primera maratón.',
    en: 'Hi Andes 👋, I\'d like my plan to run my first marathon.'
  },
  premium: {
    es: 'Hola Andes 👋, quiero mi plan para correr mi primera maratón.',
    en: 'Hi Andes 👋, I\'d like my plan to run my first marathon.'
  }
};

// Helper function to generate WhatsApp link
function generateWhatsAppLink(phoneNumber, message) {
  const encodedMessage = encodeURIComponent(message);
  return `${WHATSAPP_CONFIG.baseUrl}/${phoneNumber}?text=${encodedMessage}`;
}

// Helper function to validate language
function validateLanguage(language) {
  return ['es', 'en'].includes(language) ? language : 'en';
}

// Helper function to validate intent
function validateIntent(intent) {
  return ['free', 'premium'].includes(intent) ? intent : 'free';
}

// Main onboarding endpoint
app.post('/onboarding/start', async (req, res) => {
  try {
    console.log('📥 Onboarding request received:', req.body);
    
    // Extract and validate parameters
    const { intent: rawIntent, language: rawLanguage } = req.body;
    const intent = validateIntent(rawIntent);
    const language = validateLanguage(rawLanguage);
    
    console.log('✅ Validated parameters:', { intent, language });
    
    // Get the appropriate message template
    const message = MESSAGE_TEMPLATES[intent][language];
    
    if (!message) {
      console.error('❌ Message template not found:', { intent, language });
      return res.status(400).json({
        success: false,
        error: 'Invalid intent or language combination'
      });
    }
    
    // Generate WhatsApp link
    const whatsappLink = generateWhatsAppLink(WHATSAPP_CONFIG.phoneNumber, message);
    
    console.log('🔗 Generated WhatsApp link:', whatsappLink);
    console.log('💬 Message content:', message);
    
    // Return successful response
    const response = {
      success: true,
      intent,
      language,
      message,
      whatsappLink,
      whatsappNumber: WHATSAPP_CONFIG.phoneNumber,
      timestamp: new Date().toISOString()
    };
    
    console.log('📤 Sending response:', response);
    res.json(response);
    
  } catch (error) {
    console.error('💥 Onboarding error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'An error occurred while processing your request'
    });
  }
});

// Health check endpoint
app.get('/onboarding/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'andes-onboarding-api',
    version: '1.0.0'
  });
});

// Test endpoint to verify message templates
app.get('/onboarding/test-messages', (req, res) => {
  const testResults = {};
  
  // Test all combinations
  ['free', 'premium'].forEach(intent => {
    testResults[intent] = {};
    ['es', 'en'].forEach(language => {
      const message = MESSAGE_TEMPLATES[intent][language];
      const whatsappLink = generateWhatsAppLink(WHATSAPP_CONFIG.phoneNumber, message);
      
      testResults[intent][language] = {
        message,
        whatsappLink,
        messageLength: message.length,
        encodedLength: encodeURIComponent(message).length
      };
    });
  });
  
  res.json({
    success: true,
    templates: MESSAGE_TEMPLATES,
    testResults,
    phoneNumber: WHATSAPP_CONFIG.phoneNumber
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('🚨 Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: 'An unexpected error occurred'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    message: `The endpoint ${req.method} ${req.path} was not found`
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Andes Onboarding API running on port ${PORT}`);
  console.log(`📱 WhatsApp number: ${WHATSAPP_CONFIG.phoneNumber}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/onboarding/health`);
  console.log(`🧪 Test messages: http://localhost:${PORT}/onboarding/test-messages`);
});

module.exports = app;
