// LANGUAGE DETECTION TEST - Run in browser console
console.log('🔍 LANGUAGE DETECTION TEST');
console.log('==========================');

// Test current page
console.log('\n📍 Current Page:');
console.log('URL:', window.location.href);
console.log('Pathname:', window.location.pathname);

// Test language detection logic
const detectedLanguage = window.location.pathname.startsWith('/es') ? 'es' : 'en';
console.log('Detected Language:', detectedLanguage);
console.log('Expected:', window.location.pathname.includes('/es') ? 'Spanish (es)' : 'English (en)');

// Test button states
console.log('\n🔘 Button State Test:');
const freeBtn = document.getElementById('start-free-btn');
const premiumBtn = document.getElementById('start-premium-btn');

if (freeBtn) {
    console.log('Free Button Text:', freeBtn.textContent?.trim());
    console.log('Free Button Language Attr:', freeBtn.getAttribute('data-language'));
}

if (premiumBtn) {
    console.log('Premium Button Text:', premiumBtn.textContent?.trim());
    console.log('Premium Button Language Attr:', premiumBtn.getAttribute('data-language'));
}

// Test translations object
console.log('\n📝 Testing UI Translations:');
const uiTranslations = {
    loading: {
        free: {
            es: '🔄 Preparando entrenamiento...',
            en: '🔄 Preparing training...'
        },
        premium: {
            es: '🔄 Activando Premium...',
            en: '🔄 Activating Premium...'
        }
    },
    success: {
        es: '✅ Redirigiendo a WhatsApp...',
        en: '✅ Redirecting to WhatsApp...'
    },
    error: {
        es: '🔄 Redirigiendo al formulario...',
        en: '🔄 Redirecting to form...'
    }
};

console.log('Free Loading Text (Spanish):', uiTranslations.loading.free.es);
console.log('Free Loading Text (English):', uiTranslations.loading.free.en);
console.log('Premium Loading Text (Spanish):', uiTranslations.loading.premium.es);
console.log('Premium Loading Text (English):', uiTranslations.loading.premium.en);
console.log('Success Text (Spanish):', uiTranslations.success.es);
console.log('Success Text (English):', uiTranslations.success.en);

// Test API call
window.testLanguageAPI = async function() {
    console.log('\n🌐 Testing API with Language Parameter:');
    
    const testData = {
        intent: 'free',
        language: detectedLanguage
    };
    
    console.log('Sending to API:', testData);
    
    try {
        const response = await fetch('https://v3-production-2670.up.railway.app/onboarding/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testData)
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ API Response:', data);
            
            if (data.whatsappLink) {
                const urlParams = new URLSearchParams(data.whatsappLink.split('?')[1]);
                const message = decodeURIComponent(urlParams.get('text'));
                console.log('📱 WhatsApp Message:', message);
                
                // Check if message is in correct language
                const isSpanish = message.includes('¡Hola!') || message.includes('entrenamiento');
                const isEnglish = message.includes('Hi!') || message.includes('training');
                
                console.log('Message Language Detection:');
                console.log('- Contains Spanish indicators:', isSpanish);
                console.log('- Contains English indicators:', isEnglish);
                console.log('- Expected language:', detectedLanguage);
                console.log('- Language match:', 
                    (detectedLanguage === 'es' && isSpanish) || 
                    (detectedLanguage === 'en' && isEnglish) ? '✅ CORRECT' : '❌ INCORRECT'
                );
            }
        } else {
            console.log('❌ API Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('❌ Network Error:', error.message);
    }
};

console.log('\n📋 Available Commands:');
console.log('- testLanguageAPI() - Test API with current language');

console.log('\n✅ Language test ready! Run testLanguageAPI() to test the backend.');
