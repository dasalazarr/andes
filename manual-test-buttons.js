// Manual test script for debugging buttons
// Run this in the browser console on your landing page

console.log('🔍 Manual Button Debug Test');
console.log('==========================');

// Check if buttons exist
const freeBtn = document.getElementById('start-free-btn');
const premiumBtn = document.getElementById('start-premium-btn');

console.log('Free button found:', !!freeBtn);
console.log('Premium button found:', !!premiumBtn);

if (freeBtn) {
    console.log('Free button details:', {
        id: freeBtn.id,
        className: freeBtn.className,
        textContent: freeBtn.textContent?.trim(),
        dataset: freeBtn.dataset,
        disabled: freeBtn.disabled
    });
}

if (premiumBtn) {
    console.log('Premium button details:', {
        id: premiumBtn.id,
        className: premiumBtn.className,
        textContent: premiumBtn.textContent?.trim(),
        dataset: premiumBtn.dataset,
        disabled: premiumBtn.disabled
    });
}

// Check all buttons with andes-onboarding-btn class
const allOnboardingButtons = document.querySelectorAll('.andes-onboarding-btn');
console.log(`Found ${allOnboardingButtons.length} buttons with .andes-onboarding-btn class`);

allOnboardingButtons.forEach((btn, index) => {
    console.log(`Button ${index}:`, {
        id: btn.id,
        className: btn.className,
        textContent: btn.textContent?.trim(),
        dataset: btn.dataset
    });
});

// Test API call manually
async function testPremiumAPI() {
    console.log('🧪 Testing Premium API manually...');
    
    try {
        const response = await fetch('https://v3-production-2670.up.railway.app/onboarding/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ intent: 'premium', language: 'es' })
        });

        const data = await response.json();
        console.log('✅ Premium API Response:', data);
        
        if (data.success && data.whatsappLink) {
            console.log('✅ Premium WhatsApp link generated successfully');
            console.log('Link:', data.whatsappLink);
        } else {
            console.error('❌ Premium API failed:', data.error);
        }
    } catch (error) {
        console.error('❌ Premium API error:', error);
    }
}

// Test clicking premium button manually
function testPremiumButtonClick() {
    console.log('🧪 Testing Premium Button Click manually...');
    
    if (premiumBtn) {
        console.log('Clicking premium button...');
        premiumBtn.click();
    } else {
        console.error('❌ Premium button not found!');
    }
}

// Add manual event listener to premium button
function addManualEventListener() {
    console.log('🔧 Adding manual event listener to premium button...');
    
    if (premiumBtn) {
        premiumBtn.addEventListener('click', (e) => {
            console.log('🟡 Premium button clicked via manual listener!');
            e.preventDefault();
            testPremiumAPI();
        });
        console.log('✅ Manual event listener added to premium button');
    } else {
        console.error('❌ Premium button not found for manual listener!');
    }
}

// Export functions for manual testing
window.testPremiumAPI = testPremiumAPI;
window.testPremiumButtonClick = testPremiumButtonClick;
window.addManualEventListener = addManualEventListener;

console.log('');
console.log('Available test functions:');
console.log('- testPremiumAPI() - Test the API directly');
console.log('- testPremiumButtonClick() - Simulate button click');
console.log('- addManualEventListener() - Add manual event listener');
console.log('');

// Run initial tests
testPremiumAPI();
